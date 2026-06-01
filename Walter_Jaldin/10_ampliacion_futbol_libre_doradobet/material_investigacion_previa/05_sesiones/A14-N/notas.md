# Notas — Sesión A14-N-R1

**Perfil:** Android 14, Sin protección DNS  
**Sesión:** R1 (primera repetición)  
**Fecha:** 14 de mayo de 2026  
**Hora inicio:** 00:22 UTC  
**Herramienta de captura:** mitmproxy 9.0.1 (modo proxy transparente, puerto 8082)  
**Emulador:** AVD A14_perfil_investigacion (Pixel 6, API 34, Google APIs arm64-v8a)  
**Proxy instalado:** 192.168.1.6:8082 (host Mac Air)  
**CA mitmproxy instalada:** /apex/com.android.conscrypt/cacerts/c8750f0d.0 (tmpfs overlay)

---

## Resumen de la sesión

La sesión experimental capturó el tráfico HTTP completo desde que el usuario Android accede a `futbollibretv.su` hasta que reproduce el canal ESPN-1. Se registraron **78 flujos HTTP** (84 requests relevantes, excluyendo tráfico interno de Chrome), contactando **19 dominios únicos** sin contar servicios internos de Google Chrome.

---

## Cadena de eventos observada

```
00:22:01  Chrome navega a https://futbollibretv.su/
00:22:01  → HTTP 301 → https://futbol-libre.su/  [REDIRECCIÓN SILENCIOSA]
00:22:02  Carga de futbol-libre.su/  [página principal]
00:22:03  Carga de scripts terceros: Luxon, jQuery, menu.js, smallscripts.js
00:22:04  ← GA4 tag: gtag/js?id=G-L0N11PVD63  [tracking inicia INMEDIATAMENTE]
00:22:04  ← Adsterra: acscdn.com/script/aclib.js  [script ofuscado 166KB]
00:22:04  ← Adsterra: acscdn.com/script/suv5.js   [segundo script Adsterra]
00:22:05  → usrpubtrk.com POST /ut/hb.php  [fingerprint del dispositivo enviado]
00:22:05  → adexchangerapid.com/suurl5.php?r=10652966  [ad auction]
00:22:06  → GA4 POST /g/collect  [visita reportada a Google Analytics]
00:22:30  Chrome navega a https://futbol-libre.su/espn-1/  [canal ESPN]
00:22:31  → latamvidz1.com/canal.php?stream=espn  [iframe stream cargado]
00:22:31  ← PHPSESSID=06bf2c09... sin HttpOnly, sin Secure, sin SameSite
00:22:32  → iaw5b.envivoslatam.org/hotflix/espn/index.m3u8?token=...&ip=181.115.172.46
00:22:32  ← HTTP 302 → qbk4f.envivoslatam.org/espn/index.m3u8
00:22:33  → qbk4f.envivoslatam.org:443/espn/index.m3u8  [manifest HLS cargado]
00:22:33  → qbk4f.envivoslatam.org:443/espn/tracks-v1a1/mono.m3u8  [playlist]
00:22:34  → qbk4f.envivoslatam.org:443/.../2026/05/14/00/25/27-06006.ts  [video]
00:22:35  ← Adsterra: acscdn.com/script/aclib.js  [SEGUNDA CARGA, desde iframe]
00:22:35  ← Adsterra: acscdn.com/script/suv5.js   [SEGUNDA CARGA, desde iframe]
00:22:36  → usrpubtrk.com POST  [segunda tanda de fingerprinting]
00:22:60  → usrpubtrk.com POST  [tracking continúa mientras ve el stream]
```

---

## Dominios contactados — clasificación completa

| Dominio | Requests | Clasificación | Riesgo |
|---|---|---|---|
| cdn.futbol-libre.su | 18 | CDN propio (BunnyCDN Miami) | Bajo |
| futbol-libre.su | 4 | Sitio objetivo | — |
| qbk4f.envivoslatam.org | 8 | HLS server (TECHOFF Bulletproof) | Medio |
| acscdn.com | 4 | Adsterra (publicidad agresiva) | **ALTO** |
| usrpubtrk.com | 4 | Tracking de comportamiento | **ALTO** |
| cdn.jsdelivr.net | 4 | CDN scripts (Clappr, SwarmCloud) | Medio |
| adexchangerapid.com | 3 | Adsterra ad exchange | **ALTO** |
| www.google-analytics.com | 2 | Google Analytics | Bajo |
| latamvidz1.com | 2 | Stream backend PHP | Medio |
| www.googletagmanager.com | 1 | Google Tag Manager | Bajo |
| futbollibretv.su | 1 | Dominio de entrada | — |
| code.jquery.com | 1 | jQuery CDN (sin SRI) | Medio |
| cdnjs.cloudflare.com | 1 | Luxon CDN | Bajo |
| ajax.googleapis.com | 1 | jQuery 1.7.1 (obsoleto) | Medio |
| iaw5b.envivoslatam.org | 1 | HLS server (TECHOFF) | Medio |
| accounts.google.com | 1 | Google Accounts | Bajo |

---

## Hallazgo 1: PHPSESSID sin flags de seguridad (CONFIRMADO)

```
SET-COOKIE por latamvidz1.com:
  PHPSESSID=06bf2c09da1aeb0cc0d84b449a60cdb7; path=/
  
  HttpOnly:  ❌ AUSENTE
  Secure:    ❌ AUSENTE  
  SameSite:  ❌ AUSENTE
```

**Riesgo real:** El PHPSESSID puede ser robado mediante:
- XSS en latamvidz1.com (sin HttpOnly → accesible desde JS)
- Transmisión en HTTP si hay downgrade de conexión (sin Secure)
- CSRF attacks (sin SameSite)

---

## Hallazgo 2: Fingerprinting completo del dispositivo — usrpubtrk.com

**6 requests POST enviados a usrpubtrk.com durante la sesión.**

Cada request contiene el JSON:
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

**Datos recopilados por usrpubtrk.com:**
- Marca y versión exacta del navegador
- Si el dispositivo es móvil (`?1` = sí)
- Modelo del dispositivo (`sdk_gphone64_arm64` = Pixel emulado)
- Sistema operativo y versión (`Android 14.0.0`)
- Versión exacta de Chrome (`113.0.5672.136`)
- Comportamiento: si el usuario scrollea, cuántos clicks hizo, duración de la sesión

**usrpubtrk.com no es un dominio del operador** — es un tercero de tracking externo que recibe todos estos datos sin que el usuario lo sepa.

---

## Hallazgo 3: IP real del usuario expuesta en token HLS

La URL completa del stream HLS capturada en mitmproxy:

```
https://iaw5b.envivoslatam.org/hotflix/espn/index.m3u8
  ?token=5c1c839002db66b15fb38b259441dc2b5a1eec01-0d-1778763323-1778709323
  &ip=181.115.172.46
```

**La dirección IP real del cliente (181.115.172.46) es visible:**
- Para el servidor Streamer 24.03 en TECHOFF SRV LIMITED
- En los logs del servidor HLS
- En el propio token embebido en la URL

El token tiene una validez de **15 horas** (1778709323 → 1778763323). Durante ese período, quien tenga el token puede acceder al stream desde la misma IP.

**El servidor TECHOFF SRV LIMITED conoce la IP real del usuario boliviano/latinoamericano** que accede al streaming.

---

## Hallazgo 4: Doble carga de Adsterra

**Adsterra se carga DOS veces por visita a un canal:**

1. Primera carga: desde `futbol-libre.su` (página principal)
   - `acscdn.com/script/aclib.js` ← script de popunder
   - `acscdn.com/script/suv5.js` ← script adicional
   
2. Segunda carga: desde `latamvidz1.com` (dentro del iframe del canal)
   - `acscdn.com/script/aclib.js` (segunda vez)
   - `acscdn.com/script/suv5.js` (segunda vez)

**El usuario recibe el script de publicidad agresiva CUATRO veces** (2 scripts × 2 cargas). Cada carga del `aclib.js` puede ejecutar el popunder independientemente.

---

## Hallazgo 5: suv5.js — segundo script de Adsterra (no documentado anteriormente)

Además del conocido `aclib.js`, se detectó un segundo script de Adsterra: `acscdn.com/script/suv5.js`.

Este script no había sido identificado en el análisis estático previo. Su función exacta requiere análisis dinámico (DevTools), pero su nombre `suv5` sugiere una variante del script de **"pop-under versión 5"**. Al ser cargado siempre junto con `aclib.js`, probablemente representa una segunda capa del sistema de publicidad agresiva.

---

## Hallazgo 6: adexchangerapid.com — ad auction en tiempo real

```
GET https://adexchangerapid.com/script/suurl5.php
  ?r=10652966                 ← Adsterra ZoneId del operador
  &chu=%22Google+Chrome%22;v=113,...  ← user agent
  &chmob=%3F1                 ← es móvil: sí
  &chmod=sdk_gphone64_arm64   ← modelo de dispositivo
  &chp=Android                ← plataforma
  &chpv=14.0.0                ← versión Android
```

`adexchangerapid.com` recibe el perfil del dispositivo y el ZoneId para realizar una **subasta de anuncios en tiempo real (RTB — Real-Time Bidding)**. El URL_5 ("suurl") es probablemente "Smartlink URL 5", un tipo de anuncio de Adsterra que genera una URL de destino basada en el perfil del visitante.

**La respuesta JSON de adexchangerapid.com contiene la URL del popunder** que será abierta al primer clic del usuario.

---

## Hallazgo 7: sw.js — Service Worker en latamvidz1.com

```
GET https://latamvidz1.com/sw.js
  Referer: https://latamvidz1.com/canal.php?stream=espn
```

Se detectó la carga de un **Service Worker** (`sw.js`) desde latamvidz1.com. Los Service Workers:
- Se instalan en el navegador y persisten después de cerrar la página
- Pueden interceptar cualquier request HTTP del navegador al mismo dominio
- Pueden mostrar notificaciones push sin que la página esté abierta
- En sitios maliciosos: pueden ser usados para mostrar publicidad persistente

**Un Service Worker instalado por latamvidz1.com puede enviar notificaciones push al dispositivo Android del usuario incluso cuando el browser esté cerrado.**

---

## Hallazgo 8: GA4 tracking instantáneo

El tracking GA4 inicia antes de que el usuario interactúe:

```
POST https://www.google-analytics.com/g/collect
  ?v=2&tid=G-L0N11PVD63
  &gtm=45je65c0v9119778136za200zd9119778136
  &_p=1778718200065
  ...
```

El parámetro `gtm` contiene el container ID de Google Tag Manager. Esto confirma que el operador usa GTM para gestionar múltiples scripts de tracking (GA4, Adsterra, etc.).

---

## Flujo HLS completo reconstruido

```
Android Chrome
    │
    ├─ GET futbollibretv.su/  → 301 → futbol-libre.su/
    │
    ├─ GET futbol-libre.su/espn-1/  [página canal]
    │      └─ iframe src="latamvidz1.com/canal.php?stream=espn"
    │
    ├─ GET latamvidz1.com/canal.php?stream=espn
    │      ← SET-COOKIE: PHPSESSID (sin flags)
    │      └─ Clappr player con token HLS
    │
    ├─ GET iaw5b.envivoslatam.org/hotflix/espn/index.m3u8
    │         ?token=5c1c839...&ip=181.115.172.46  [IP del usuario]
    │      ← 302 → qbk4f.envivoslatam.org/espn/index.m3u8
    │
    ├─ GET qbk4f.envivoslatam.org/espn/index.m3u8  [manifest HLS]
    │      ← content-type: application/vnd.apple.mpegurl
    │      ← server: Streamer 24.03
    │
    ├─ GET qbk4f.envivoslatam.org/espn/tracks-v1a1/mono.m3u8  [playlist segmentos]
    │
    └─ GET qbk4f.envivoslatam.org/espn/tracks-v1a1/2026/05/14/00/25/27-06006.ts
           ← content-type: video/MP2T  [segmento de video real de ESPN]
```

---

## Resumen de riesgos confirmados experimentalmente

| # | Riesgo | Evidencia | OWASP | Severidad |
|---|---|---|---|---|
| R1 | PHPSESSID sin HttpOnly/Secure/SameSite | `SET-COOKIE` en latamvidz1.com capturado | A2 | ALTO |
| R2 | Fingerprint dispositivo enviado a usrpubtrk.com | 6 POST capturados con modelo+OS+browser | A4 | ALTO |
| R3 | IP real del usuario en URL del token HLS | `ip=181.115.172.46` en URL capturado | A4 | MEDIO |
| R4 | Doble carga de Adsterra (4 scripts por sesión) | aclib.js + suv5.js × 2 capturados | A3/A8 | CRÍTICO |
| R5 | Script suv5.js no documentado previamente | Capturado en tráfico real | A8 | ALTO |
| R6 | Service Worker instalado por latamvidz1.com | sw.js capturado | A4 | ALTO |
| R7 | ad exchange en RTB con perfil del dispositivo | adexchangerapid.com capturado | A4 | ALTO |
| R8 | TECHOFF SRV LIMITED conoce IP del usuario | Token HLS con IP expuesta | A5 | MEDIO |
| R9 | GA4 inicia tracking sin interacción | POST inmediato a google-analytics.com | — | INFO |
| R10 | Sin Subresource Integrity en ningún script | Todos los JS sin atributo `integrity` | A8 | CRÍTICO |

---

## Archivos de evidencia

- `A14-N-R1_flows.mitm` — flujos binarios mitmproxy (2.5 MB, 78 flows)
- `A14-N-R1_session_report.txt` — reporte legible de todos los requests (27 KB)

---
