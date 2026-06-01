# Notas — Sesión A14-D-R1

**Perfil:** Android 14, AdGuard DNS-over-TLS activo  
**Sesión:** R1 (primera repetición)  
**Fecha:** 14 de mayo de 2026  
**Hora inicio:** 00:54 UTC  
**Herramienta de captura:** mitmproxy 9.0.1 (modo proxy transparente, puerto 8083)  
**Emulador:** AVD A14_perfil_investigacion (Pixel 6, API 34, Google APIs arm64-v8a)  
**Proxy instalado:** 192.168.1.6:8083 (host Mac Air)  
**DNS activo:** Private DNS → `dns.adguard.com` (DNS-over-TLS, 94.140.14.14)  
**CA mitmproxy:** /apex/com.android.conscrypt/cacerts/c8750f0d.0 (tmpfs overlay)

---

## Resumen de la sesión

La sesión capturó **642 flujos HTTP** totales contactando **32 dominios únicos**. Al excluir el tráfico de fondo generado por el popunder (bol.1xbet.com + mc.yandex.ru), quedan **225 flujos relevantes en 24 dominios**. La protección AdGuard DNS no bloqueó ninguno de los dominios de riesgo identificados en A14-N-R1.

**Hallazgo principal:** AdGuard DNS-over-TLS (dns.adguard.com) **no ofrece protección** contra los dominios de tracking, fingerprinting y publicidad agresiva del ecosistema futbol-libre.su.

---

## Cadena de eventos observada

```
00:54:xx  Chrome navega a https://futbol-libre.su/
00:54:xx  → HTTP 301 → https://futbol-libre.su/  [misma URL, HTTPS]
00:54:xx  Carga de futbol-libre.su/ [página principal]
00:54:xx  ← GA4 tag: gtag/js?id=G-L0N11PVD63  [tracking inicia INMEDIATAMENTE]
00:54:xx  ← Adsterra: acscdn.com/script/aclib.js  [HTTP 200 — NO BLOQUEADO]
00:54:xx  ← Adsterra: acscdn.com/script/suv5.js   [HTTP 200 — NO BLOQUEADO]
00:54:xx  → usrpubtrk.com POST /ut/hb.php  [fingerprint dispositivo — HTTP 204]
00:54:xx  → adexchangerapid.com/suurl5.php?r=10652966  [subasta RTB — HTTP 200]
00:54:xx  Chrome navega a https://futbol-libre.su/espn-1/
00:54:xx  → latamvidz1.com/canal.php?stream=espn  [iframe stream]
00:54:xx  ← PHPSESSID=bdef27396917881428f0e994ec2a3545; path=/  [sin flags]
00:54:xx  ← latamvidz1.com/sw.js  [Service Worker — HTTP 200]
00:54:xx  → smjt9q.envivoslatam.org/hotflix/espn/index.m3u8?token=...&ip=181.115.172.46
00:54:xx  ← HTTP 302 → wf6kt.envivoslatam.org/espn/index.m3u8
00:54:xx  → wf6kt.envivoslatam.org/espn/index.m3u8  [manifest HLS — HTTP 200]
00:58:xx  [CLICK en video] → POPUNDER: bol.1xbet.com abierto en nueva pestaña
00:58:xx  ← 391 requests a bol.1xbet.com + mc.yandex.ru (Yandex Metrica)
00:58:xx  ← Cookie afiliado: refpa37630.com A_22811_v=0, A_22811_c=1
```

---

## Dominios contactados — clasificación completa

| Dominio | Requests | Clasificación | Riesgo | Bloqueado AdGuard |
|---|---|---|---|---|
| **bol.1xbet.com** | **391** | Popunder RTB — apuestas | CRÍTICO | ❌ NO |
| wf6kt.envivoslatam.org | 63 | HLS server (TECHOFF) | Medio | ❌ NO |
| pvtn5y.envivoslatam.org | 39 | HLS server (TECHOFF) | Medio | ❌ NO |
| cdn.futbol-libre.su | 18 | CDN propio (BunnyCDN) | Bajo | — |
| usrpubtrk.com | 11 | Fingerprint dispositivo | **ALTO** | ❌ NO |
| adexchangerapid.com | 9 | Ad exchange RTB | **ALTO** | ❌ NO |
| mc.yandex.ru | 8 | Yandex Metrica (desde 1xbet) | Alto | ❌ NO |
| futbol-libre.su | 5 | Sitio objetivo | — | — |
| acscdn.com | 4 | Adsterra scripts | **ALTO** | ❌ NO |
| latamvidz1.com | 4 | Stream backend PHP | Medio | ❌ NO |
| cdn.jsdelivr.net | 4 | Clappr + SwarmCloud | Bajo | — |
| www.google-analytics.com | 3 | Google Analytics | Bajo | ❌ NO |
| analytics.google.com | 3 | Google Analytics (v2) | Bajo | ❌ NO |
| refpa37630.com | 2 | Cookie afiliado 1xbet | Alto | ❌ NO |
| v2aka.traincdn.com | 2 | CDN 1xbet | — | — |
| v2l.cdnsfree.com | 2 | CDN externo | — | — |
| v2cn.cdnsfree.com | 2 | CDN externo | — | — |
| www.googletagmanager.com | 2 | Google Tag Manager | Bajo | — |
| smjt9q.envivoslatam.org | 1 | HLS redirect (TECHOFF) | Medio | ❌ NO |
| iaw5b.envivoslatam.org | 1 | HLS redirect (TECHOFF) | Medio | ❌ NO |
| stats.g.doubleclick.net | 1 | Google DoubleClick | Bajo | — |
| code.jquery.com | 1 | jQuery CDN (sin SRI) | Medio | — |
| cdnjs.cloudflare.com | 1 | Luxon CDN | Bajo | — |
| ajax.googleapis.com | 1 | jQuery 1.7.1 | Medio | — |

---

## Hallazgo 1: AdGuard DNS no bloquea ningún dominio de riesgo

**Dominios de riesgo del ecosistema Adsterra — todos presentes:**

| Dominio | A14-N (sin DNS) | A14-D (AdGuard DNS) | ¿Bloqueado? |
|---|---|---|---|
| usrpubtrk.com | ✅ 6 POST | ✅ 11 POST | ❌ NO BLOQUEADO |
| acscdn.com | ✅ 4 scripts | ✅ 4 scripts | ❌ NO BLOQUEADO |
| adexchangerapid.com | ✅ 3 requests | ✅ 9 requests | ❌ NO BLOQUEADO |
| latamvidz1.com | ✅ 2 requests | ✅ 4 requests | ❌ NO BLOQUEADO |
| envivoslatam.org | ✅ activo | ✅ activo | ❌ NO BLOQUEADO |

AdGuard DNS-over-TLS resuelve con éxito todos los dominios del ecosistema de tracking y publicidad. Los scripts de Adsterra se cargan completos (HTTP 200), los fingerprints se envían (HTTP 204), y las subastas RTB se ejecutan (HTTP 200).

---

## Hallazgo 2: Fingerprinting idéntico a A14-N

**11 requests POST a usrpubtrk.com durante la sesión (vs. 6 en A14-N):**

```json
{
  "clientHints": {
    "chu": "\"Google Chrome\";v=113, \"Chromium\";v=113, \"Not-A.Brand\";v=24",
    "chmob": "?1",
    "chmod": "sdk_gphone64_arm64",
    "chp": "Android",
    "chpv": "14.0.0",
    "chuafv": "113.0.5672.136"
  },
  "isScrollable": 1,
  "totalClicks": 0,
  "sessionLength": 61,
  "ippMissclicks": 0,
  "visible": 1
}
```

El perfil del dispositivo enviado es **idéntico** al de A14-N. AdGuard DNS no intercepta el contenido de las solicitudes HTTPS — solo puede bloquear por dominio. Como usrpubtrk.com no está en las listas de bloqueo de AdGuard DNS, el fingerprinting procede sin restricción.

---

## Hallazgo 3: IP real del usuario en token HLS

**URL capturada:**
```
GET https://smjt9q.envivoslatam.org/hotflix/espn/index.m3u8
  ?token=5861413ffdd76093b57d2420d4600a59066798be-18-1778765255-1778711255
  &ip=181.115.172.46
← HTTP 302 → wf6kt.envivoslatam.org/espn/index.m3u8
Server: Streamer 24.03
```

La IP real del usuario (181.115.172.46) sigue expuesta en el token HLS. Subdomain de TECHOFF ahora es `smjt9q` (distinto de `iaw5b` en A14-N) — evidencia de rotación de subdominios. Token válido: **15 horas**.

---

## Hallazgo 4: PHPSESSID sin flags (idéntico a A14-N)

```
Set-Cookie: PHPSESSID=bdef27396917881428f0e994ec2a3545; path=/
  HttpOnly:  ❌ AUSENTE
  Secure:    ❌ AUSENTE
  SameSite:  ❌ AUSENTE
```

---

## Hallazgo 5: Popunder RTB → bol.1xbet.com (NUEVO — más grave que A14-N)

Al primer toque sobre el video player, el popunder Adsterra abrió `bol.1xbet.com` en una nueva pestaña. Este es el destino de la subasta RTB — un sitio de apuestas deportivas online. La pestaña generó **391 requests adicionales** incluyendo:

- Yandex Metrica analytics (mc.yandex.ru) — perfil adicional del dispositivo
- Cloudflare challenge/bot detection
- APIs de 1xbet: `/analytics-module-api/`, `/bff-api/`, `/banner-api/`
- Cookie de afiliado: `refpa37630.com` → `A_22811_v=0; A_22811_c=1`

**Cookie de afiliado de 1xbet:**
```
refpa37630.com: A_22811_v=0; expires=Fri, 15 May 2026 00:58:16 GMT
                A_22811_c=1; expires=Fri, 15 May 2026 00:58:16 GMT
```

El código `A_22811` es el ID de afiliado del operador de futbol-libre.su en la red de 1xbet. Cada usuario que hace clic genera una conversión rastreada para ese afiliado.

**Yandex Metrica en 1xbet:**
```
GET https://mc.yandex.ru/watch/22934032?wmode=7&page-url=https://bol.1xbet.com → 302
Cookie bh (Yandex): EkEiR29vZ2xlIENocm9tZSI7dj0iMTEzIi...
  [Base64 decode: "Google Chrome";v="113", "Chromium";v="113" — fingerprint del mismo dispositivo]
```

Yandex Metrica recibe un fingerprint del dispositivo **desde bol.1xbet.com**, creando un segundo perfil de tracking del mismo usuario boliviano, esta vez en servidores de Yandex.

---

## Hallazgo 6: Service Worker — latamvidz1.com

```
GET https://latamvidz1.com/sw.js → HTTP 200
GET https://latamvidz1.com/sw.js → HTTP 304 (segunda carga)
```

Idéntico a A14-N. El Service Worker se instaló con éxito.

---

## Comparativa de riesgos A14-N vs A14-D

| Riesgo | A14-N | A14-D (AdGuard DNS) | Cambio |
|---|---|---|---|
| Fingerprint usrpubtrk.com | ✅ 6 POST | ✅ 11 POST | ❌ PEOR (más requests) |
| Adsterra cargado (scripts) | ✅ 4 scripts | ✅ 4 scripts | = SIN CAMBIO |
| IP en HLS token | ✅ Expuesta | ✅ Expuesta | = SIN CAMBIO |
| PHPSESSID inseguro | ✅ Emitida | ✅ Emitida | = SIN CAMBIO |
| Service Worker | ✅ Instalado | ✅ Instalado | = SIN CAMBIO |
| Popunder activado | ✅ (destino: RTB) | ✅ → **bol.1xbet.com** | ❌ PEOR (más tráfico) |
| GA4 tracking | ✅ Activo | ✅ Activo | = SIN CAMBIO |
| Yandex Metrica | ❌ Ausente | ✅ mc.yandex.ru (via 1xbet) | **NUEVO RIESGO** |
| Cookie afiliado 1xbet | ❌ Ausente | ✅ refpa37630.com | **NUEVO RIESGO** |
| Subdomain TECHOFF | qbk4f/iaw5b | smjt9q/wf6kt | Rotación observada |

**Conclusión: AdGuard DNS no ofrece ninguna reducción de riesgo para el ecosistema de futbol-libre.su.** La protección DNS solo funciona si los dominios están en las listas de bloqueo del resolver. usrpubtrk.com, acscdn.com y adexchangerapid.com no están en las listas estándar de AdGuard DNS.

---

## Archivos de evidencia

- `flows_A14D.mitm` — 642 flujos, 13 MB (en /tmp/burp_A14D_R1/)
- Análisis Python ejecutado en sesión

---
