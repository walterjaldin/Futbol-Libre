# Notas — Sesión A11-N-R1

**Perfil:** Android 11, Sin protección DNS  
**Sesión:** R1 (primera repetición)  
**Fecha:** 14 de mayo de 2026  
**Hora inicio:** 21:08 UTC  
**Herramienta de captura:** mitmproxy 9.0.1 (modo proxy transparente, puerto 8082)  
**Emulador:** AVD A11_perfil_investigacion (Pixel 5, API 30, Google APIs arm64-v8a)  
**Proxy instalado:** 192.168.1.6:8082 (host Mac Air)  
**DNS activo:** ISP predeterminado (sin protección adicional)  
**Chrome versión:** 91.0.4472.114  
**Nota metodológica:** CA mitmproxy instalada con tmpfs overlay en /system/etc/security/cacerts/ + `--ignore-certificate-errors` en chrome-command-line (SELinux context `appdomain_tmpfs` impide lectura directa del cert en Chrome 91; flag requerido para captura)

---

## Resumen de la sesión

La sesión capturó **452 flujos HTTP** contactando **26 dominios únicos**. Todos los dominios de riesgo del ecosistema Adsterra-TECHOFF estuvieron presentes y activos. El popunder RTB generó 317 requests adicionales a bol.1xbet.com — comportamiento idéntico al observado en A14-D.

---

## Cadena de eventos observada

```
21:08:xx  Chrome navega a https://futbol-libre.su/
21:08:xx  Carga página principal [GA4, Adsterra, jQuery, CDN]
21:08:xx  ← acscdn.com/script/aclib.js   [HTTP 200 — 10 cargas totales]
21:08:xx  ← acscdn.com/script/suv5.js    [HTTP 200]
21:08:xx  → usrpubtrk.com POST /ut/hb.php [fingerprint Android 11 — HTTP 204]
21:08:xx  → adexchangerapid.com/suurl5.php?r=10652966 [subasta RTB — HTTP 200]
21:09:xx  Chrome navega a https://futbol-libre.su/espn-1/
21:09:xx  → latamvidz1.com/canal.php?stream=espn [iframe stream]
21:09:xx  ← PHPSESSID=dd2b9552111a581de3541fea74ef6078; path=/  [sin flags]
21:10:xx  → rci1w.envivoslatam.org/hotflix/espn/index.m3u8?token=...&ip=181.115.172.46
21:10:xx  ← HTTP 302 → xky9q.envivoslatam.org/espn/index.m3u8
21:10:xx  [CLICK en video] → POPUNDER: bol.1xbet.com abierto (317 requests)
21:10:xx  ← Cookie afiliado refpa37630.com [A_22811_v=0, A_22811_c=1]
```

---

## Dominios contactados — clasificación completa

| Dominio | Requests | Categoría | Riesgo |
|---|---|---|---|
| **bol.1xbet.com** | **317** | Popunder RTB — apuestas | CRÍTICO |
| xky9q.envivoslatam.org | 43 | HLS server (TECHOFF) | Medio |
| cdn.futbol-libre.su | 20 | CDN propio | Bajo |
| acscdn.com | 10 | Adsterra scripts | **ALTO** |
| usrpubtrk.com | 10 | Fingerprint dispositivo | **ALTO** |
| cdn.jsdelivr.net | 8 | Clappr + SwarmCloud | Bajo |
| adexchangerapid.com | 7 | Ad exchange RTB | **ALTO** |
| futbol-libre.su | 5 | Sitio objetivo | — |
| www.googletagmanager.com | 4 | GTM | Bajo |
| latamvidz1.com | 4 | Stream backend | Medio |
| www.google-analytics.com | 3 | Analytics | Bajo |
| code.jquery.com | 3 | jQuery CDN (sin SRI) | Medio |
| cdnjs.cloudflare.com | 3 | Luxon CDN | Bajo |
| v2ex.cdnsfree.com | 2 | CDN externo | — |
| refpa37630.com | 1 | Cookie afiliado 1xbet | Alto |
| smjt9q/ng0pr/rci1w.envivoslatam.org | 1 c/u | HLS redirect (TECHOFF) | Medio |

---

## Hallazgo clave: Fingerprint adaptativo según versión de Chrome

**Payload enviado por Chrome 91 (Android 11) a usrpubtrk.com:**
```json
{
  "clientHints": {
    "chmod": "sdk_gphone_arm64",
    "chp": "Android",
    "chpv": "11",
    "chuafv": "91.0.4472.114"
  },
  "isScrollable": 1,
  "totalClicks": 0,
  "sessionLength": 0,
  "visible": 1,
  "caught": 0
}
```

**Comparativa de Client Hints A11 vs A14:**

| Campo | Chrome 91 / Android 11 | Chrome 113 / Android 14 | Descripción |
|---|---|---|---|
| `chu` | ❌ Ausente | ✅ `"Google Chrome";v=113...` | Brand list completo |
| `chmob` | ❌ Ausente | ✅ `?1` | Indicador móvil |
| `chmod` | ✅ `sdk_gphone_arm64` | ✅ `sdk_gphone64_arm64` | Modelo dispositivo |
| `chp` | ✅ `Android` | ✅ `Android` | Plataforma |
| `chpv` | ✅ `11` | ✅ `14.0.0` | Versión OS |
| `chuafv` | ✅ `91.0.4472.114` | ✅ `113.0.5672.136` | Versión navegador |

Chrome 91 no implementa `Sec-CH-UA` completo ni `Sec-CH-UA-Mobile`. El script de usrpubtrk.com se adapta omitiendo los campos no disponibles. La combinación `Android 11 + sdk_gphone_arm64 + Chrome 91.0.4472.114` sigue siendo suficientemente específica para identificación cross-session.

**User-Agent capturado:**
```
Mozilla/5.0 (Linux; Android 11; sdk_gphone_arm64) AppleWebKit/537.36 
(KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36
```

---

## HLS — IP real expuesta en token

```
GET https://rci1w.envivoslatam.org/hotflix/espn/index.m3u8
  ?token=c95161db272387fb40d76e6ff08636080ef994f0-de-1778766036-1778712036
  &ip=181.115.172.46
← HTTP 302 → xky9q.envivoslatam.org/espn/index.m3u8
Server: Streamer 24.03
```

Token válido: **15 horas**. Subdomain HLS rotado: `rci1w` → `xky9q` (3er subdomain distinto observado en el estudio). IP del usuario visible para TECHOFF.

---

## PHPSESSID sin flags de seguridad (idéntico a todos los perfiles anteriores)

```
Set-Cookie: PHPSESSID=dd2b9552111a581de3541fea74ef6078; path=/
  HttpOnly: ❌  Secure: ❌  SameSite: ❌
```

---

## Archivos de evidencia

- `A11-N-R1_flows.mitm` — 452 flujos, 11 MB
