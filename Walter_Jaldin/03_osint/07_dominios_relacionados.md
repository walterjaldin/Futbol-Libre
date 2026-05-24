# 1.7 — Ecosistema de dominios relacionados

**Fecha de consulta:** 10 de mayo de 2026 (actualizado 24 may 2026)  
**Investigador:** Walter Jaldín  
**Herramientas:** dig, whois, curl, HackerTarget Reverse IP API, análisis de código fuente HTML

---

## Resumen ejecutivo

Esta sub-fase consolida y profundiza el ecosistema de dominios identificado en la sub-fase 1.5. Se confirman **12 dominios** vinculados al mismo operador o infraestructura, se añaden dos nuevos descubrimientos (`librepelota.su` y `latamvidz1.com`), y se documenta el estado operativo actual de cada dominio. El ecosistema ha experimentado cambios significativos desde la sub-fase 1.5 (27 abril - 4 mayo): pelotalibretv.su migró de IP, yourewatching.org aparece en una IP iraní, y doeemain.org retorna errores 500.

---

## Mapa completo del ecosistema (mayo 2026)

### Familia hispana

| Dominio | IP actual | Estado | Vínculos |
|---|---|---|---|
| **futbollibretv.su** | 128.0.104.23 / 138.226.244.112 / 185.254.197.23 | Activo (301 → futbol-libre.su) | Dominio de entrada |
| **futbol-libre.su** | 185.254.197.23 | Activo (200 OK, dominio canónico) | Destino final del 301 |

### Familia rioplatense

| Dominio | IP actual | Estado | Vínculos |
|---|---|---|---|
| **pelotalibretv.su** | 138.226.244.112 | Activo | Enlazado desde futbol-libre.su HTML |
| **librepelota.su** | Sin resolución A | En preparación (parked) | ARDIS-SU registrador, Cloudflare NS |

### Familia anglófona

| Dominio | IP actual | Estado | Vínculos |
|---|---|---|---|
| **yourewatching.org** | 213.176.3.63 (IR!) / 91.218.49.91 / Cloudflare | Posible downtime/migración | Resolución histórica a Virtual Systems |
| **orion.yourewatching1.org** | (no verificado) | Desconocido | Resolución histórica en VirusTotal |
| **orion.yourewatching2.org** | (no verificado) | Desconocido | Resolución histórica en VirusTotal |

### Plataforma matriz

| Dominio | IP actual | Estado | Vínculos |
|---|---|---|---|
| **doeemain.org** | Cloudflare | HTTP 500 (caído) | Subdominios es/pt en Cloudflare |
| **es.doeemain.org** | Cloudflare | HTTP 500 Error | Cloudflare cf-ray EZE (Argentina) |
| **pt.doeemain.org** | Cloudflare | (no verificado) | |

### Infraestructura técnica

| Dominio | IP actual | Estado | Función |
|---|---|---|---|---|
| **latamvidz1.com** | 128.0.104.23 | Activo (410 sin params) | Servidor de streams (PHP backend) |
| **cdn.futbol-libre.su** | BunnyCDN (Miami) | Activo (200 OK) | CDN de assets estáticos |
| **acscdn.com** | Cloudflare | Activo | CDN de scripts Adsterra (ver 06_analisis/scripts/) |
| **adexchangerapid.com** | Cloudflare | Activo | RTB ad exchange |
| **usrpubtrk.com** | Cloudflare | Activo | Fingerprinting |
| **wkbc42.com** | Sin DNS | Sin resolver | Tracking Adsterra (parked) |
| **wkbc21.com** | Sin DNS | Sin resolver | Tracking Adsterra (parked) |
| **quesid.com** | 104.21.3.211 / 172.67.131.52 | Activo (403, openresty) | Tracking/analytics Adsterra |

---

## Análisis de dominio por dominio

### 1. pelotalibretv.su

**Cambio detectado:** migró de 194.42.205.18 a **138.226.244.112** (ambas Virtual Systems LLC).

El dominio está **directamente enlazado** desde el HTML de futbol-libre.su:
```html
<a href="https://pelotalibretv.su/">
```

Esto confirma la relación operativa: los dos sitios se referencian mutuamente, distribuyendo tráfico entre mercados geográficos.

---

### 2. librepelota.su — Dominio en preparación

**Descubrimiento:** identificado vía reverse IP lookup en HackerTarget (IP 128.0.104.23).

**Análisis WHOIS:**
- Registrador: ARDIS-SU (idéntico a futbollibretv.su y futbol-libre.su)
- Name Servers: Cloudflare (pola/rex.ns.cloudflare.com) + DNS raíz ruso (.su)
- Titular: Private Person

**Sin resolución A activa** en el momento del análisis. El nombre combina "libre" (marca de futbol-libre) con "pelota" (marca rioplatense), sugiriendo un dominio de consolidación o redirección futura.

---

### 3. latamvidz1.com — Servidor de streams

**Descubrimiento:** identificado en el código fuente HTML de futbol-libre.su/espn-1/.

```php
// Endpoint del stream:
https://latamvidz1.com/canal.php?stream=espn
```

- **Registrador:** SOLLUTIUM LLC (relacionado con Virtual Systems LLC)
- **Misma IP** que futbollibretv.su: 128.0.104.23
- **Name Servers:** DNS10-14.VSYS.NAME y UNS13-14.VSYS.NAME (Virtual Systems NS)
- **Registro:** 28 enero 2026 (reciente — 3 meses antes de nuestro análisis)

La lógica del servidor: el parámetro `?stream=espn` selecciona el canal. Al consultar sin parámetros retorna HTTP 410 Gone, indicando que el servidor valida la presencia del parámetro.

**El nombre `latamvidz1` sugiere que es el primero de una serie** (latamvidz2, etc.), patrón de redundancia ya observado en yourewatching.org/1/2.

---

### 4. doeemain.org — Plataforma matriz en fallo

El dominio principal y el subdominio `es.doeemain.org` retornan **HTTP 500** (Internal Server Error) desde Cloudflare. El `cf-ray` del error es `EZE` (Buenos Aires, Argentina), lo que revela que la consulta fue ruteada por Cloudflare desde un PoP argentino.

**Estado:** la plataforma matriz está caída al momento del análisis. Esto puede ser temporal o indicar abandono del dominio. Las capturas de VirusTotal mostraban actividad hasta octubre-noviembre 2025.

---

### 5. yourewatching.org — Migración a IP iraní

La resolución DNS actual incluye **213.176.3.63**, perteneciente a:

```
netname: IR-IROST-19991208
country: IR
org-name: Iranian Research Organization for Science & Technology
```

La presencia de una IP iraní en la resolución es inusual. Hipótesis:
1. El operador añadió un servidor en Irán como punto de acceso adicional (jurisdicción fuera de DMCA/EU).
2. El dominio fue secuestrado o apuntado incorrectamente a esa IP.
3. Es un error de configuración DNS (registro A antiguo no limpiado).

La IP 91.218.49.91 (Virtual Systems LLC) sigue presente, lo que sugiere que el dominio aún está bajo control del operador pero con configuración DNS modificada.

---

## Google Analytics como vínculo cruzado

El ID `G-L0N11PVD63` presente en todas las páginas de futbol-libre.su puede usarse para identificar otros sitios del mismo operador mediante:
- **SpyOnWeb** (spyonweb.com)
- **BuiltWith** (builtwith.com)
- **SimilarWeb** correlaciones

Esta tarea queda **pendiente** para la siguiente jornada.

---

## Google Site Verification como vínculo de identidad

Los tokens de verificación de Google Search Console son únicos por dominio y propietario:

| Dominio | Token GSV |
|---|---|
| futbol-libre.su | `LegHK_GCzoXVbe65RBqWA90SJN7p791Oww8JVGabYrA` |
| futbollibretv.su | `rSdArONcC2FDZLl7WDw16516IV-nP_nvryYI5soxy70` |

El hecho de que **dos dominios distintos tengan verification tokens diferentes pero del mismo tipo** confirma que el operador tiene acceso a Google Search Console para ambos dominios, posiblemente desde la misma cuenta de Google. Esto es consistente con el correo `hassan.azmw@gmail.com` expuesto en el WHOIS de futbol-libre.su.

---

## Diagrama actualizado del ecosistema

```
OPERADOR (alias: hassan.azmw@gmail.com / joezm5a@proton.me)
│
├── REGISTRO (ARDIS-SU, TLD .su)
│   ├── futbollibretv.su  [entrada → redirige a futbol-libre.su]
│   ├── futbol-libre.su   [DOMINIO CANÓNICO]
│   ├── pelotalibretv.su  [mercado rioplatense]
│   └── librepelota.su    [en preparación]
│
├── INFRAESTRUCTURA (Virtual Systems LLC, Kyiv UA)
│   ├── 185.254.197.23  → futbol-libre.su + futbollibretv.su
│   ├── 128.0.104.23    → futbollibretv.su + latamvidz1.com
│   └── 138.226.244.112 → futbollibretv.su + pelotalibretv.su
│
├── BACKEND TÉCNICO
│   ├── latamvidz1.com  [servidor PHP de streams, 128.0.104.23]
│   └── cdn.futbol-libre.su [BunnyCDN Miami, assets estáticos]
│
├── PUBLICIDAD Y TRACKING (Adsterra)
│   ├── acscdn.com          [CDN scripts: aclib.js, suv5.js, banner.js, interstitial.js, at.js]
│   ├── adexchangerapid.com [RTB: url5.php, hb.php, visit.php, czcf.php]
│   ├── usrpubtrk.com       [fingerprinting Client Hints/WebGL/Canvas]
│   ├── wkbc42.com          [tracking — sin DNS activo]
│   ├── wkbc21.com          [tracking — sin DNS activo]
│   ├── quesid.com          [tracking — openresty, Cloudflare]
│   └── Google Analytics GA4: G-L0N11PVD63
│
└── DOMINIOS EXTERNOS (relación circunstancial por IP histórica)
    ├── doeemain.org     [caído, ex-plataforma matriz, Cloudflare]
    ├── yourewatching.org/.1/.2 [mercado anglófono, con IP iraní nueva]
    └── orion.* subdomains
```

---

## Hallazgos nuevos de esta sub-fase

1. **latamvidz1.com** es parte directa de la infraestructura del operador (misma IP, mismo proveedor de NS, mismo registrador relacionado).
2. **librepelota.su** es un dominio nuevo en preparación, con mismo registrador que los dominios principales.
3. **pelotalibretv.su** migró de IP (194.42.205.18 → 138.226.244.112), siempre dentro de Virtual Systems LLC.
4. **doeemain.org** está caído (HTTP 500), lo que puede indicar abandono o reconfiguración.
5. **yourewatching.org** tiene una IP iraní en su resolución, hallazgo anómalo que requiere seguimiento.
6. **GA4 ID G-L0N11PVD63** como nuevo vector de vinculación del operador pendiente de explorar.
7. **(Posterior) 6 scripts Adsterra deobfuscados** — aclib.js, suv5.js, banner.js, interstitial.js, at.js, sw.js. Se descubren wkbc42.com, wkbc21.com, quesid.com como dominios de tracking. Detalle en `06_analisis/scripts/`.

---
