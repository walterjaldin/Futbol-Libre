# 1.10 — Ecosistema ampliado: hallazgos de Jornada 8

**Fecha de análisis:** 14 de mayo de 2026 (actualizado 24 may 2026)  
**Investigador:** Walter Jaldín  
**Herramientas:** WebSearch, WebFetch, curl, dig, whois, Shodan InternetDB, HackerTarget Reverse IP  
**Metodología:** Investigación con acceso a Internet (browser + herramientas de red) + deobfuscación completa de scripts Adsterra

---

## Resumen ejecutivo

La Jornada 8 expande significativamente el ecosistema documentado, pasando de 17 dominios a más de 25. El hallazgo más crítico es la identificación de **TECHOFF SRV LIMITED (AS48090)** como proveedor de hosting bulletproof que alberga los servidores HLS del ecosistema, con política explícita de ignorar DMCA. Se descubren nuevos dominios de entrada (librefutbol.su), dominios de streaming relacionados (la12hd.com, la16hd.com, streamingtv339.com, fubohd.com) y se mapea el patrón `la*hd.com` como una familia de servidores de streaming vinculados.

---

## Nuevo dominio de entrada: librefutbol.su

### Hallazgo

`librefutbol.su` redirige (HTTP 301) directamente a `futbol-libre.su`:

```
GET https://librefutbol.su/ → HTTP 301 → https://futbol-libre.su/
Server: nginx
x-server-powered-by: Engintron
```

### Vinculación al operador

| Atributo | Valor |
|---|---|
| IP | 128.0.104.23 (mismo servidor que latamvidz1.com) |
| Registrador | **ARDIS-SU** (idéntico a futbol-libre.su, pelotalibretv.su) |
| Nameservers | a.p-dns.com / b.p-dns.org / c.p-dns.biz / d.p-dns.info |
| Stack | nginx + Engintron (idéntico al ecosistema) |
| Fecha registro | 17 de diciembre de 2022 |

El uso de ARDIS-SU como registrador confirma que librefutbol.su pertenece al mismo operador. La fecha de registro (diciembre 2022) lo hace contemporáneo con los dominios principales del ecosistema.

**Tranco ranking:** Top 500 (ScamAdviser reporta "mucho tráfico según Tranco 500"), indicando un volumen de visitas significativo a escala global.

---

## envivolibre.com — Dominio parqueado en la infraestructura del operador

### Hallazgo

```
DNS: 128.0.104.23 (misma IP que latamvidz1.com)
HTTP response: 200 OK (163 bytes)
Contenido: Meta-refresh a /cgi-sys/defaultwebpage.cgi
/cgi-sys/defaultwebpage.cgi: "Default Web Site Page" (página por defecto de cPanel)
```

### Análisis

`envivolibre.com` está registrado bajo el servidor principal del operador (128.0.104.23) pero solo muestra la **página por defecto de cPanel** — significa que el dominio fue registrado y apuntado al servidor, pero ningún sitio web ha sido configurado bajo él.

| Atributo | Valor |
|---|---|
| IP | 128.0.104.23 (Virtual Systems LLC) |
| Registrador | Dynadot LLC (diferente a ARDIS-SU) |
| Nameservers | NS1.DYNA-NS.NET / NS2.DYNA-NS.NET |
| Fecha creación | 2025-10-24 |
| Última actualización | 2026-01-28 |
| Estado | Dominio parqueado / en preparación |

**Implicación:** El nombre "envivolibre" combina "en vivo" + "libre" — probablemente un dominio preparado para una futura versión del sitio o una alternativa en español de "free". La diferencia de registrador (Dynadot vs ARDIS-SU) puede indicar que el dominio fue adquirido separadamente o que el operador usa múltiples registradores para distribuir el riesgo.

---

## Familia la*hd.com — Patrón de servidores de streaming

### Descubrimiento

El análisis del código de pelotalibretv.su reveló la14hd.com como backend de streaming. La investigación de la IP 91.218.49.105 (vía Shodan Reverse IP) reveló que la12hd.com también apunta a la misma IP, sugiriendo un patrón de numeración.

### Mapeo completo del patrón

| Dominio | IP | Proveedor | Comportamiento | Registrador |
|---|---|---|---|---|
| la10hd.com | 76.223.54.146 / 13.248.169.48 | AWS/CloudFront | HTTP 405 Method Not Allowed | NameCheap / Afternic NS |
| la12hd.com | 91.218.49.105 | Virtual Systems LLC | HTTP 301 → la14hd.com | Tucows |
| la14hd.com | 91.218.49.105 | Virtual Systems LLC | HTTP 200 OK (activo) | Tucows |
| la16hd.com | 172.67.169.224 / 104.21.95.80 | Cloudflare | HTTP 200 OK (activo) | Tucows |

**Observaciones:**
- la10hd.com está en AWS (CloudFront) con nameservers de Afternic (marketplace de dominios GoDaddy) → posiblemente a la venta o de un operador diferente
- la12hd.com redirige a la14hd.com → alias del mismo servidor
- la14hd.com y la16hd.com están activos con contenido
- la16hd.com fue registrado en marzo de 2026 (muy reciente), usa Cloudflare

### la14hd.com — Análisis del player de stream

```
Endpoint: https://la14hd.com/vivo/canal.php?stream=espn
HLS URL: https://wp9xqedt.fubohd.com:443/espn/mono.m3u8?token=8ec83603...-1778716420
Adsterra ZoneId: 11225378 (DIFERENTE a futbol-libre.su = 10652966)
SwarmCloud P2P: SÍ (mismo que futbol-libre.su)
```

**ZoneId diferente = cuenta Adsterra diferente.** la14hd.com no comparte la cuenta Adsterra del operador principal. Esto sugiere que la14hd.com es un operador independiente o socio que también usa Adsterra y SwarmCloud.

---

## fubohd.com — Nuevo servidor HLS descubierto

### Identificación

`fubohd.com` es el servidor HLS (streaming) utilizado por `la14hd.com`:

```
Subdomain: wp9xqedt.fubohd.com
IP: 93.123.109.145
Proveedor: TECHOFF SRV LIMITED (ASN 48090)
Software: Streamer 24.03 (IDÉNTICO al software de envivoslatam.org)
PTR: (sin PTR)
```

**Respuesta a GET /:**
```
HTTP/2 302
Location: /admin/
Server: Streamer 24.03
```

El servidor redirige a `/admin/` — existe un panel de administración del servidor Streamer expuesto.

| Atributo | fubohd.com | envivoslatam.org |
|---|---|---|
| IP | 93.123.109.145 | 195.178.110.11 |
| Proveedor | TECHOFF SRV LIMITED | TECHOFF SRV LIMITED |
| Software | Streamer 24.03 | Streamer 24.03 |
| Puerto RTMP | (pendiente verificar) | 1935 |

**Ambos servidores HLS del ecosistema son del mismo proveedor y usan el mismo software.**

---

## TECHOFF SRV LIMITED — Proveedor de hosting bulletproof

### Identificación

TECHOFF SRV LIMITED opera el ASN 48090 y es el proveedor de los servidores HLS del ecosistema de streaming pirata.

### Datos del AS48090

| Campo | Valor |
|---|---|
| Organización | TECHOFF SRV LIMITED |
| ASN | AS48090 |
| Registro RIPE | 5 de septiembre de 2019 |
| País registro | Reino Unido (UK) |
| Operación | Países Bajos (Amsterdam) |
| Total IPs | **768 IPv4** (3 bloques /24) |
| Upstream único | AS57717 FiberXpress BV (Países Bajos) |
| Dominios hospedados | 102 dominios en 41 IPs (datos IPInfo) |

### Bloques IP de TECHOFF (AS48090)

| Bloque | IPs | Estado RPKI |
|---|---|---|
| 45.148.10.0/24 | 256 | — |
| 93.123.109.0/24 | 256 | Válido |
| 195.178.110.0/24 | 256 | Válido |

### Dominios identificados en infraestructura TECHOFF

| IP | Hostname | Función identificada |
|---|---|---|
| 93.123.109.9 | komur.uwucdn.sbs | CDN no identificada |
| 93.123.109.10 | cc324.streamingtv339.com | Servidor de streaming |
| 93.123.109.11 | chrz.envivoslatam.org | Servidor HLS (subdominio) |
| 93.123.109.12 | dtkb.envivoslatam.org | Servidor HLS (subdominio) |
| 93.123.109.145 | wp9xqedt.fubohd.com | Servidor HLS (fubohd.com) |
| 195.178.110.11 | (sin hostname) | envivoslatam.org principal |
| 195.178.110.100 | a5.kora-plus.dad | Streaming deportivo (árabe) |

**envivoslatam.org tiene al menos 3 IPs en TECHOFF** (93.123.109.11, 93.123.109.12, 195.178.110.11), mostrando redundancia horizontal.

### Clasificación como bulletproof hosting

TECHOFF SRV LIMITED está documentado como proveedor de hosting **bulletproof** mediante su servicio **dmzhost.co**:

- Política explícita de **ignorar solicitudes DMCA** (copyright takedown)
- Servidores offshore para evadir jurisdicción de copyright
- Tags en su AS: **BitTorrent, Tor, VPN**
- IP 195.178.110.160 (mismo bloque /24 que envivoslatam.org) reportada **117,660 veces en AbuseIPDB**
- Estructura corporativa con apariencia de legitimidad (virtual office UK) pero sin storefront público
- Asociada a PPTECHNOLOGY LIMITED (misma dirección registrada)

**Contexto para el estudio:** El uso de hosting bulletproof por parte del ecosistema de streaming es deliberado — garantiza que los servidores de video no puedan ser derribados por quejas de derechos de autor, incluso si ESPN, Fox Sports o DIRECTV presentan takedown notices.

---

## streamingtv339.com — Plataforma de streaming en TECHOFF

```
IP: 93.123.109.10 (TECHOFF SRV LIMITED)
Registrador: Tucows Domains Inc.
Nameservers: Njalla (1-YOU.NJALLA.NO, 2-CAN.NJALLA.IN, 3-GET.NJALLA.FO)
Fecha registro: 2026-03-16
```

**Njalla** es un servicio de privacidad de dominios que actúa como propietario formal del dominio en lugar del cliente, ofreciendo la máxima protección de identidad disponible. Su uso indica que el operador de streamingtv339.com quiere privacidad adicional más allá del simple WHOIS privado.

---

## kora-plus.dad — Streaming árabe en la misma infraestructura

```
IP: 195.178.110.100 (TECHOFF SRV LIMITED)
Hostname: a5.kora-plus.dad
```

"Kora" significa "pelota" en árabe. `kora-plus.dad` es un sitio de streaming deportivo árabe alojado en el mismo bloque IP que `envivoslatam.org`. Indica que TECHOFF SRV LIMITED sirve a múltiples ecosistemas de streaming pirata en diferentes idiomas/regiones.

---

## Dominios de tracking en librefutbol.su

El escaneo de URLScan para librefutbol.su reveló dominios de tracking no presentes en futbol-libre.su:

### gounodogaptofok.net

```
IP: (Cloudflare)
Registrador: URL Solutions, Inc.
Nameservers: Cloudflare
Fecha registro: 2024-10-10
Función: Script de publicidad/seguimiento (tag.min.js)
```

Nombre generado aleatoriamente (Random Domain Generation — típico de redes de anuncios y botnets). El script `tag.min.js` retorna 0 bytes desde nuestra IP (posible geofencing o bloqueo de crawlers).

### doanaudabu.net

```
IPs: 66.175.209.179, 96.126.111.165, 45.33.83.100, 45.79.167.180
Registrador: Dynadot Inc.
Nameservers: giantpanda.com
Fecha registro: 2026-03-26 (MUY RECIENTE)
Respuesta: HTTP 204 No Content (servidor OpenResty/nginx)
```

HTTP 204 es la respuesta estándar de un **servidor de tracking de píxeles** — recibe datos de telemetría y responde sin contenido. OpenResty (nginx + Lua) es común en sistemas de analytics de alto rendimiento.

### my.rtmark.net

```
IPs: Múltiples AWS (3.5.x.x)
Función: Red de afiliados/tracking legítima o semi-legítima
```

rtmark.net es conocida como plataforma de marketing de afiliados. Su presencia en librefutbol.su puede indicar programa de afiliados para monetización adicional.

---

## Deobfuscación de scripts Adsterra — infraestructura de publicidad descubierta

Entre el 21–24 de mayo de 2026 se deobfuscan y analizan **5 scripts** de `acscdn.com`. Se descubren nuevos dominios de tracking y se mapea la arquitectura completa de Adsterra.

### Scripts analizados

| Script | Tamaño | Strings | Función principal |
|---|---|---|---|
| aclib.js | 166,680 B | 1,556 | Popunder, interstitial, fingerprinting, RTB, Service Worker |
| suv5.js | 62,862 B | 687 | SmartURL v5 — motor de ejecución/rendering de overlays |
| banner.js | 26,834 B | 330 | Banner display ads |
| interstitial.js | 46,333 B | 487 | Full‑page interstitial overlays con RTB |
| at.js | 30,821 B | 359 | Auto‑tag / tracking de comportamiento de usuario |

### Dominios de tracking de Adsterra descubiertos

| Dominio | Propósito | Estado OSINT |
|---|---|---|
| **wkbc42.com** | Tracking de visitas (endpoints: /ad/visit.php, /al/visit.php, /ut/aft.php, /ut/aut.php) | Sin DNS activo (parked/desactivado) |
| **wkbc21.com** | Dominio alternativo de tracking (mismos endpoints inferidos) | Sin DNS activo (parked/desactivado) |
| **quesid.com** | Endpoint de analytics/tracking (openresty, 403) | Cloudflare, activo desde 2021 |

### Infraestructura Adsterra inferida

```
acscdn.com (Cloudflare)
├── aclib.js         → Configuración, detección, fingerprinting → usrpubtrk.com
├── suv5.js          → Ejecución de overlays (popunder, interstitial)
├── banner.js        → Banners display
├── interstitial.js  → Overlay full‑page con RTB
└── at.js            → Auto‑tag / tracking → wkbc42.com, wkbc21.com, quesid.com

adexchangerapid.com (Cloudflare)
├── url5.php         → Endpoint RTB para solicitudes de anuncios
├── hb.php           → Header bidding
├── visit.php        → Registro de visitas
└── czcf.php         → Control de frecuencia / capping

usrpubtrk.com (Cloudflare)
└── Endpoint de fingerprinting (Client Hints, WebGL, Canvas)
```

---

Búsquedas web identificaron dos artículos académicamente relevantes sobre riesgos:

### ciberprisma.org (2024)

Documenta el uso de **RAT (Remote Access Trojans)** como amenaza principal:
- Popups de falsa "actualización de navegador" como vector de descarga
- Capas de redirección sobre el reproductor de video (links ocultos)
- Activación silenciosa de ejecutables en segundo plano
- Robo de credenciales bancarias y vaciamiento de cuentas

### cronista.com

Documenta impacto financiero directo:
- "Saqueamiento de cuenta bancaria en segundos"
- Préstamos fraudulentos en nombre de la víctima
- Transferencias no autorizadas inmediatas post-compromiso

**Relevancia:** Estos artículos corroboran que el vector de riesgo documentado técnicamente (popunder Adsterra, scripts sin SRI, ausencia de CSP) tiene consecuencias financieras documentadas en usuarios latinoamericanos.

---

## Diagrama del ecosistema ampliado (Jornada 8, actualizado 24 may 2026)

```
ECOSISTEMA FUTBOL LIBRE (operador: hassan.azmw@gmail.com)
│
├── DOMINIOS DE ENTRADA (todos registrados en ARDIS-SU)
│   ├── futbollibretv.su → 301 → futbol-libre.su
│   ├── librefutbol.su   → 301 → futbol-libre.su  [NUEVO]
│   └── futbol-libre.su  [CANÓNICO]
│
├── SITIO HERMANO RIOPLATENSE
│   └── pelotalibretv.su (WordPress 6.9.4, SOLLUTIUM)
│
├── DOMINIO PREPARADO
│   ├── librepelota.su   (ARDIS-SU, sin contenido activo)
│   └── envivolibre.com  (Dynadot, cPanel default page, 128.0.104.23)
│
├── INFRAESTRUCTURA PRINCIPAL (Virtual Systems LLC, UA)
│   ├── 185.254.197.23 — futbol-libre.su (17 CVEs, OpenSSH 8.7)
│   ├── 128.0.104.23   — latamvidz1.com, librefutbol.su, envivolibre.com
│   ├── 138.226.244.112— pelotalibretv.su (SOLLUTIUM)
│   └── 91.218.49.105  — la14hd.com, la12hd.com (PTR: dedicated.vsys.host)
│
├── SERVIDORES HLS — TECHOFF SRV LIMITED (AS48090, bulletproof)
│   ├── 195.178.110.11    — envivoslatam.org (futbol-libre.su stream)
│   ├── 93.123.109.11/12  — subdominos envivoslatam.org
│   └── 93.123.109.145    — fubohd.com (la14hd.com stream)
│
├── PUBLICIDAD (Adsterra)
│   ├── ZoneId 10652966 (futbol-libre.su + pelotalibretv.su)
│   ├── acscdn.com     (CDN scripts: aclib.js, suv5.js, banner.js, interstitial.js, at.js)
│   ├── adexchangerapid.com (RTB: url5.php, hb.php, visit.php, czcf.php)
│   ├── usrpubtrk.com  (fingerprinting: Client Hints, WebGL, Canvas)
│   ├── wkbc42.com     (tracking — sin DNS)
│   ├── wkbc21.com     (tracking — sin DNS)
│   └── quesid.com     (tracking/analytics — openresty, Cloudflare)
│
└── ECOSISTEMA RELACIONADO (operadores distintos, infraestructura compartida)
    ├── la14hd.com → fubohd.com (HLS) / Adsterra ZoneId 11225378
    ├── la12hd.com → 301 → la14hd.com
    ├── la16hd.com (Cloudflare, Tucows, mar 2026)
    ├── streamingtv339.com (TECHOFF, Njalla NS, mar 2026)
    └── kora-plus.dad (TECHOFF, streaming árabe)
```

---
