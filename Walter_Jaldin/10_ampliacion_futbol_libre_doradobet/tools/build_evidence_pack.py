from __future__ import annotations

import csv
import json
import re
import subprocess
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
EXT = ROOT / "evidencias" / "extended"
PACK = ROOT / "evidencias" / "publicable"
PACK.mkdir(parents=True, exist_ok=True)


SENSITIVE_PATTERNS = [
    (re.compile(r"([?&]token=[REDACTED_TOKEN]&\s\"']+", re.I), r"\1[REDACTED_TOKEN]"),
    (re.compile(r"([?&]ip=)\d{1,3}(?:\.\d{1,3}){3}", re.I), r"\1[REDACTED_IP]"),
    (re.compile(r"([?&]userId=)[^&\s\"']+", re.I), r"\1[REDACTED_USER_ID]"),
    (re.compile(r"([?&]user_id=)[^&\s\"']+", re.I), r"\1[REDACTED_USER_ID]"),
    (re.compile(r"([?&]uid=)[^&\s\"']+", re.I), r"\1[REDACTED_UID]"),
    (re.compile(r"([?&]dsp_uuid=)[^&\s\"']+", re.I), r"\1[REDACTED_UUID]"),
    (re.compile(r"([?&]bsw_uuid=)[^&\s\"']+", re.I), r"\1[REDACTED_UUID]"),
    (re.compile(r"([?&]bsw_uid=)[^&\s\"']+", re.I), r"\1[REDACTED_UID]"),
    (re.compile(r"([?&]CriteoUserId=)[^&\s\"']+", re.I), r"\1[REDACTED_USER_ID]"),
    (re.compile(r"([?&]google_gid=)[^&\s\"']+", re.I), r"\1[REDACTED_GOOGLE_ID]"),
    (re.compile(r"([?&]google_hm=)[^&\s\"']+", re.I), r"\1[REDACTED_GOOGLE_HASH]"),
    (re.compile(r"([?&]taboola_hm=)[^&\s\"']+", re.I), r"\1[REDACTED_HASH]"),
    (re.compile(r"([?&](?:put|ppcid|rid)=)[^&\s\"']+", re.I), r"\1[REDACTED]"),
    (re.compile(r"([?&]installId=)[^&\s\"']+", re.I), r"\1[REDACTED_INSTALL_ID]"),
    (re.compile(r"([?&]cid=)[^&\s\"']+", re.I), r"\1[REDACTED_CID]"),
    (re.compile(r"([?&]_p=)[^&\s\"']+", re.I), r"\1[REDACTED]"),
    (re.compile(r"([?&]sid=)[^&\s\"']+", re.I), r"\1[REDACTED]"),
    (re.compile(r"\b\d{1,3}(?:\.\d{1,3}){3}\b"), "[REDACTED_IP]"),
]


def redact_string(value: str) -> str:
    out = value
    for pattern, repl in SENSITIVE_PATTERNS:
        out = pattern.sub(repl, out)
    return out


def redact(obj):
    if isinstance(obj, dict):
        clean = {}
        for key, value in obj.items():
            if key.lower() in {"value", "sessionid", "expires", "size"} and "cookie" in str(key).lower():
                clean[key] = "[REDACTED]"
            elif key.lower() in {"cookies"}:
                clean[key] = "[REDACTED_COOKIES]"
            elif key.lower() in {"chromeprofile"}:
                clean[key] = "[LOCAL_PATH_REDACTED]"
            else:
                clean[key] = redact(value)
        return clean
    if isinstance(obj, list):
        return [redact(x) for x in obj]
    if isinstance(obj, str):
        return redact_string(obj)
    return obj


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def all_domains(result):
    domains = set(result.get("pageEvents", {}).get("domains", []))
    for iframe in result.get("iframeEvents", []):
        domains.update(iframe.get("events", {}).get("domains", []))
    return sorted(d for d in domains if d)


def all_popups(result):
    popups = list(result.get("pageEvents", {}).get("popups", []))
    for iframe in result.get("iframeEvents", []):
        popups.extend(iframe.get("events", {}).get("popups", []))
    return popups


def all_downloads(result):
    downloads = list(result.get("pageEvents", {}).get("downloads", []))
    for iframe in result.get("iframeEvents", []):
        downloads.extend(iframe.get("events", {}).get("downloads", []))
    return downloads


def all_requests(result):
    requests = list(result.get("pageEvents", {}).get("requests", []))
    for iframe in result.get("iframeEvents", []):
        requests.extend(iframe.get("events", {}).get("requests", []))
    return requests


def write_redacted_jsons():
    rows = []
    domain_rows = []
    interesting_rows = []
    for path in sorted(EXT.glob("*/probe-result.json")):
        result = load_json(path)
        scenario = result.get("scenario") or path.parent.name
        redacted = redact(result)
        out_path = PACK / f"{scenario}.redacted.json"
        out_path.write_text(json.dumps(redacted, ensure_ascii=False, indent=2), encoding="utf-8")

        domains = all_domains(result)
        popups = all_popups(result)
        downloads = all_downloads(result)
        local_storage = result.get("state", {}).get("localStorage", {}) or {}

        rows.append({
            "scenario": scenario,
            "final_url": result.get("state", {}).get("url", ""),
            "domains_count": len(domains),
            "popups": len(popups),
            "downloads": len(downloads),
            "local_storage_keys": len(local_storage),
            "screenshot_before": str(path.parent / "before.png"),
            "screenshot_after": str(path.parent / "after.png"),
            "redacted_json": str(out_path),
        })

        for domain in domains:
            domain_rows.append({"scenario": scenario, "domain": domain})

        for req in all_requests(result):
            url = req.get("url", "")
            if re.search(r"acscdn|adexchangerapid|usrpubtrk|envivoslatam|meshify|fpjs|fingerprint|chaturbate|xlviiirdr|kumulos|optimove|push|bit\.ly|criteo|adform|adnxs|bidswitch|rubicon|mgid|sportradar", url, re.I):
                interesting_rows.append({
                    "scenario": scenario,
                    "type": req.get("type", ""),
                    "method": req.get("method", ""),
                    "domain": urlparse(url).hostname or "",
                    "url_redacted": redact_string(url),
                })

    with (PACK / "scenario_summary.csv").open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)

    with (PACK / "domains_by_scenario.csv").open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["scenario", "domain"])
        writer.writeheader()
        writer.writerows(domain_rows)

    with (PACK / "interesting_requests.csv").open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["scenario", "type", "method", "domain", "url_redacted"])
        writer.writeheader()
        writer.writerows(interesting_rows)

    return rows, domain_rows, interesting_rows


def shell(cmd: list[str], timeout=20) -> str:
    try:
        return subprocess.check_output(cmd, cwd=ROOT, stderr=subprocess.STDOUT, timeout=timeout, text=True)
    except subprocess.CalledProcessError as e:
        return e.output
    except subprocess.TimeoutExpired:
        return "TIMEOUT"


def scan_clones():
    domains = [
        "doradobet.com",
        "doradobet.online",
        "dorado-bet.org",
        "doradobet.org.pe",
        "dorado-bet.pe",
        "doradobet-peru.org",
        "doradobetapp.com",
        "doradobet.bet",
        "doradobet.pe",
        "doradobet-review.com",
    ]
    rows = []
    for domain in domains:
        ips = shell(["dig", "+short", domain, "A"], timeout=8).strip().replace("\n", " | ")
        headers = shell(["curl", "-sS", "-I", "-L", "--max-redirs", "3", "--connect-timeout", "5", "--max-time", "15", f"https://{domain}/"], timeout=18)
        status = ""
        server = ""
        final_location = ""
        powered = ""
        for line in headers.splitlines():
            if line.startswith("HTTP/"):
                status = line.strip()
            lower = line.lower()
            if lower.startswith("server:"):
                server = line.split(":", 1)[1].strip()
            if lower.startswith("location:"):
                final_location = line.split(":", 1)[1].strip()
            if lower.startswith("x-powered-by:"):
                powered = line.split(":", 1)[1].strip()
        body = shell(["curl", "-sS", "-L", "--max-redirs", "3", "--connect-timeout", "5", "--max-time", "15", f"https://{domain}/"], timeout=18)
        title_match = re.search(r"<title[^>]*>(.*?)</title>", body, re.I | re.S)
        title = re.sub(r"\s+", " ", title_match.group(1)).strip() if title_match else ""
        wordpress = "wp-content" in body or "wp-json" in body
        rows.append({
            "domain": domain,
            "a_records": ips,
            "status": status,
            "server": server,
            "x_powered_by": powered,
            "location": final_location,
            "title": title[:160],
            "wordpress_detected": wordpress,
        })
    with (PACK / "doradobet_clone_scan.csv").open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)
    return rows


def build_markdown(scenario_rows, interesting_rows, clone_rows):
    md = ["# Anexo de evidencias publicables", ""]
    md.append("## Resumen por escenario")
    md.append("")
    md.append("| Escenario | Dominios | Popups | Descargas | localStorage |")
    md.append("|---|---:|---:|---:|---:|")
    for row in scenario_rows:
        md.append(f"| {row['scenario']} | {row['domains_count']} | {row['popups']} | {row['downloads']} | {row['local_storage_keys']} |")
    md.append("")

    md.append("## Solicitudes relevantes")
    md.append("")
    md.append("| Escenario | Tipo | Dominio | URL redactada |")
    md.append("|---|---|---|---|")
    for row in interesting_rows[:120]:
        md.append(f"| {row['scenario']} | {row['type']} | {row['domain']} | `{row['url_redacted'][:180]}` |")
    md.append("")

    md.append("## Dominios parecidos a DoradoBet")
    md.append("")
    md.append("| Dominio | Estado | Servidor | X-Powered-By | WordPress | Título |")
    md.append("|---|---|---|---|---:|---|")
    for row in clone_rows:
        md.append(f"| {row['domain']} | {row['status']} | {row['server']} | {row['x_powered_by']} | {row['wordpress_detected']} | {row['title']} |")
    md.append("")

    md.append("## Archivos generados")
    md.append("")
    md.extend([
        "- `scenario_summary.csv`: resumen numérico por escenario.",
        "- `domains_by_scenario.csv`: dominios contactados por escenario.",
        "- `interesting_requests.csv`: solicitudes relevantes con tokens/IP redactados.",
        "- `*.redacted.json`: copias publicables de cada prueba.",
        "- `doradobet_clone_scan.csv`: escaneo pasivo de dominios similares.",
    ])
    (PACK / "ANEXO_EVIDENCIAS.md").write_text("\n".join(md), encoding="utf-8")


def main():
    scenario_rows, _, interesting_rows = write_redacted_jsons()
    clone_rows = scan_clones()
    build_markdown(scenario_rows, interesting_rows, clone_rows)
    print(PACK)


if __name__ == "__main__":
    main()
