# 1.4 + Reconocimiento Activo — Infraestructura, Headers HTTP y Análisis del Sitio

**Fecha de ejecución:** 10 de mayo de 2026  
**Investigador:** Walter Jaldín  
**Herramientas:** curl, dig, nc (netcat), openssl, grep, Wayback Machine CDX API

---

## Resumen ejecutivo

El reconocimiento activo ejecutado desde consola reveló hallazgos críticos no documentados en las fases pasivas previas. El más importante: **futbollibretv.su ahora redirige permanentemente (HTTP 301) a futbol-libre.su**, confirmando que el dominio paralelo se ha convertido en el dominio canónico de operación. Se descubrieron **dos nuevas IPs** en el registro A de futbollibretv.su, un **nuevo dominio del ecosistema** (`librepelota.su`), un **servidor de streams separado** (`latamvidz1.com`) en la misma infraestructura, y la **red de publicidad Adsterra** con un script JavaScript altamente ofuscado que se ejecuta en todas las páginas del sitio.

---

## 1. Redirección HTTP 301: cambio de dominio canónico

### Hallazgo

```
GET https://futbollibretv.su/
→ HTTP/2 301 Moved Permanently
→ Location: https://futbol-libre.su/
```

**futbollibretv.su ya no es el dominio principal de cara al usuario.** Desde el punto de vista técnico, el operador ha designado `futbol-libre.su` como la URL canónica. Esto tiene implicaciones importantes:

1. El tráfico de usuarios llega a futbollibretv.su (dominio con menos detecciones en VirusTotal: 1/91) pero es inmediatamente redirigido a futbol-libre.su (3/91 detecciones, ya bloqueado por Forcepoint ThreatSeeker).
2. El usuario final siempre accede desde futbol-libre.su, pero la URL de entrada puede ser futbollibretv.su, lo que confunde a los motores de detección que analizan solo el dominio de entrada.
3. El `meta name="robots" content="follow, index"` en el HTML final confirma que el operador quiere que buscadores indexen futbol-libre.su.

---

## 2. Nuevas IPs en futbollibretv.su (DNS multi-A)

### Resolución DNS actual (10 mayo 2026)

```
futbollibretv.su  →  128.0.104.23     (Virtual Systems LLC, VSYS-UA)
                      138.226.244.112  (Virtual Systems LLC, VSYS-UA-COLO12)
                      185.254.197.23   (Virtual Systems LLC, YURTEH-AS)
```

La documentación anterior (sub-fase 1.2, 27 abril) registraba únicamente `185.254.197.23`. La expansión a **3 IPs del mismo proveedor** sugiere que el operador está distribuyendo la carga del dominio de entrada entre múltiples servidores del mismo VPS provider, probablemente para:
- Mayor resiliencia ante bloqueos por IP
- Distribución de carga cuando el tráfico aumenta (eventos deportivos)
- Mayor dificultad para bloqueo masivo (hay que bloquear 3 IPs en lugar de 1)

### Comparación de resolución DNS del ecosistema

| Dominio | IP(s) actual(es) | Cambio respecto a jornada anterior |
|---|---|---|
| futbollibretv.su | 128.0.104.23 / 138.226.244.112 / 185.254.197.23 | **+2 IPs nuevas** |
| futbol-libre.su | 185.254.197.23 | Sin cambio |
| pelotalibretv.su | 138.226.244.112 | **Cambio** (era 194.42.205.18) |
| latamvidz1.com | 128.0.104.23 | Nuevo dominio identificado |
| librepelota.su | (sin resolución) | Nuevo dominio descubierto |
| doeemain.org | 172.67.73.163 / Cloudflare | En Cloudflare |
| yourewatching.org | 213.176.3.63 (IR) / 91.218.49.91 | IP iraní nueva |

---

## 3. Stack tecnológico del servidor

### Headers HTTP del servidor final (futbol-libre.su)

```http
HTTP/2 200
server: nginx
x-server-powered-by: Engintron
x-nginx-upstream-cache-status: HIT
x-xss-protection: 1; mode=block
x-content-type-options: nosniff
```

| Componente | Identificado | Implicación |
|---|---|---|
| Servidor web | nginx | Proxy reverso Engintron |
| Panel de control | Engintron + cPanel | Stack cPanel estándar |
| Cache de contenido | nginx upstream cache (`HIT`/`EXPIRED`) | El HTML se cachea en nginx |
| TLS | TLSv1.3, AEAD-AES256-GCM-SHA384 | Configuración moderna |
| HTTP versión | HTTP/2 | Soporte h2 |

### Certificado TLS

| Campo | futbollibretv.su | futbol-libre.su |
|---|---|---|
| Issuer | Let's Encrypt R12 | Let's Encrypt |
| Subject | CN=futbollibretv.su | (verificar) |
| SAN | futbollibretv.su, www.futbollibretv.su | |
| Válido desde | 13 abr 2026 (cert A) / 10 mar 2026 (cert B) | |
| Válido hasta | 12 jul 2026 / 08 jun 2026 | |

**Nota:** Se detectaron 2 certificados distintos dependiendo de qué IP resuelve la conexión (el servidor multihomed responde con certs diferentes según el server). Ambos son de Let's Encrypt, certificados gratuitos automatizados.

---

## 4. Análisis de headers de seguridad

### Resultado del análisis

| Header de Seguridad | Estado | Riesgo |
|---|---|---|
| `Strict-Transport-Security` | **AUSENTE** | Riesgo: posible downgrade HTTPS→HTTP |
| `Content-Security-Policy` | **AUSENTE** | Riesgo: XSS sin restricciones de fuentes |
| `X-Frame-Options` | **AUSENTE** | Riesgo: clickjacking |
| `Referrer-Policy` | **AUSENTE** | Riesgo: fuga de URLs en referrers |
| `Permissions-Policy` | **AUSENTE** | Sin restricciones de APIs del navegador |
| `X-XSS-Protection` | Presente (valor: `1; mode=block`) | Protección básica XSS heredada |
| `X-Content-Type-Options` | Presente (`nosniff`) | Previene MIME sniffing |
| `Cache-Control` | **AUSENTE** | Sin control de cacheo en cliente |
| `Set-Cookie` | **AUSENTE** (servidor) | Sin cookies de sesión propias |

**Conclusión:** el sitio implementa solo 2 de los 9 headers de seguridad recomendados. La ausencia de CSP es particularmente crítica dado que el sitio carga scripts de terceros (Adsterra, Google, jQuery CDN) sin ninguna política de restricción. Esto crea el contexto perfecto para que el malvertising opere sin limitaciones.

---

## 5. robots.txt y sitemap

### robots.txt

```
User-agent: *
Disallow:

Sitemap: https://futbol-libre.su/sitemap.xml
```

**Sin restricciones para crawlers**: el operador permite que buscadores indexen todo el sitio. La presencia del sitemap confirma una operación SEO activa.

### Sitemap (9 URLs)

```
https://futbol-libre.su/              (última modificación: 28 abr 2026)
https://futbol-libre.su/espn-1/       (27 abr 2026)
https://futbol-libre.su/directv-sports/ (27 abr 2026)
https://futbol-libre.su/tyc-sports/   (27 abr 2026)
https://futbol-libre.su/win-sports-premium/ (27 abr 2026)
https://futbol-libre.su/tudn/          (27 abr 2026)
https://futbol-libre.su/tnt-sports/
https://futbol-libre.su/fox-sports/
https://futbol-libre.su/espn-premium/
```

**Canales de deportes disponibles:** ESPN-1, ESPN Premium, DIRECTV Sports, TyC Sports, WIN Sports+, TUDN, TNT Sports, FOX Sports — todos son canales deportivos de pago en Latinoamérica.

---

## 6. Arquitectura de publicidad: Adsterra / acscdn.com

### Identificación de la red

El script `//acscdn.com/script/aclib.js` es el **CDN oficial de Adsterra**, una de las redes de publicidad más grandes para sitios pirata, conocida por:
- **Popunder ads**: abrir nuevas pestañas o ventanas detrás del navegador
- **Redireccionamientos forzados**: llevar al usuario a sitios de terceros sin interacción
- **Publicidad de alto riesgo**: anuncios de casinos, sitios adult, scam de premios

### Configuración detectada en el sitio

```javascript
<script id="aclib" type="text/javascript" src="//acscdn.com/script/aclib.js"></script>
<script type="text/javascript">
    aclib.runPop({
        zoneId: '10652966',
    });
</script>
```

| Parámetro | Valor | Significado |
|---|---|---|
| Red | Adsterra | Red de publicidad popunder |
| ZoneId | `10652966` | ID único del publisher en Adsterra |
| Tipo de ad | `runPop()` | Popunder/popunder ads |
| Ubicación | Todas las páginas del sitio | Home + cada canal |

### Características del script aclib.js

El script descargado desde acscdn.com tiene las siguientes características técnicas alarmantes:
- **Tamaño:** 166,931 bytes (~163 KB) — script muy grande para un simple loader de ads
- **Almacenamiento:** Google Cloud Storage (`MULTI_REGIONAL`)
- **Ofuscación:** **altamente ofuscado** usando patrón de hex-string (`_0x2d73`, `_0x37f67b`, etc.), técnica utilizada para evadir detección de antivirus y herramientas de análisis estático
- **CORS:** `access-control-allow-origin: *` — puede ser llamado desde cualquier dominio
- **Cache:** 30 días (`max-age=2592000`)

**La ofuscación de aclib.js es una señal de alarma directa**: scripts legítimos de redes publicitarias normales no requieren ofuscación. La ofuscación en este contexto sirve para esconder la cadena completa de redirecciones que el script puede ejecutar, haciendo imposible el análisis estático.

---

## 7. Arquitectura de streaming: latamvidz1.com

### Descubrimiento

Al analizar la página `/espn-1/`, se identificó que el contenido de video se sirve mediante un iframe externo:

```html
<iframe allowfullscreen="true" 
        scrolling="no" 
        src="https://latamvidz1.com/canal.php?stream=espn"
        allow="encrypted-media"
        width="100%" height="100%"
        frameborder="0"
        id="embedIframe"
        loading="lazy">
</iframe>
```

### Análisis de latamvidz1.com

| Campo | Valor |
|---|---|
| IP | 128.0.104.23 |
| Proveedor | Virtual Systems LLC (Kyiv, UA) |
| Registrador | SOLLUTIUM LLC (relacionado con Virtual Systems) |
| Fecha registro | 28 enero 2026 (reciente) |
| Name Servers | DNS10-14.VSYS.NAME + UNS13-14.VSYS.NAME |
| DNSSEC | No firmado |
| TLS | Let's Encrypt R12, válido 31 mar - 29 jun 2026 |
| HTTP response | HTTP 410 Gone (cuando se consulta sin parámetros stream) |

**latamvidz1.com está en la misma IP** (128.0.104.23) que futbollibretv.su. La misma empresa (SOLLUTIUM LLC) es el registrador de este dominio y el proveedor de infraestructura (Virtual Systems). Esto confirma que **el servidor de streams es parte directa de la infraestructura del operador**, no un tercero independiente.

El nombre `latamvidz1.com` sugiere que es el primero de potencialmente múltiples servidores de video (`latamvidz2.com`, etc.).

---

## 8. CDN propio: BunnyCDN

### cdn.futbol-libre.su

```
cdn.futbol-libre.su  →  CNAME: fltsu.b-cdn.net
                     →  IP: 195.181.163.203 (BunnyCDN Miami)
```

El sitio usa **BunnyCDN** (bunnycdn.com) para servir assets estáticos:
- `menu.js` (662 bytes — script de UI del menú)
- `canal.js` (script de lógica de canales)
- Imágenes (logo, etc.)

El nombre del pull zone `fltsu` es una abreviatura de **f**utbo**l** **t**v **.** **su**.

Los headers del CDN revelan:
```
cdn-pullzone: 5740606
cdn-requestcountrycode: BO  ← indica que la consulta fue detectada desde Bolivia
cache-control: max-age=2592000  (30 días)
```

**El CDN BunnyCDN detectó la consulta como proveniente de Bolivia (BO)**, lo que confirma que las pruebas se ejecutaron correctamente desde el entorno del investigador.

---

## 9. Tracking y SEO: Google Analytics + Google Site Verification

### Google Analytics 4

```javascript
gtag('config', 'G-L0N11PVD63');
```

El ID `G-L0N11PVD63` está presente en todas las páginas del sitio (index y canales). Este ID es **único y trazable**: si el mismo ID aparece en otro sitio, implica que ambos son operados por el mismo propietario o compartido intencionalmente.

**Implicación OSINT:** el ID de GA4 puede cruzarse con otras herramientas (SpyOnWeb, BuiltWith, etc.) para identificar otros sitios del operador.

### Google Site Verification (DNS TXT)

```
futbol-libre.su TXT:   google-site-verification=LegHK_GCzoXVbe65RBqWA90SJN7p791Oww8JVGabYrA
futbollibretv.su TXT:  google-site-verification=rSdArONcC2FDZLl7WDw16516IV-nP_nvryYI5soxy70
```

El operador verificó ambos dominios en Google Search Console. Esto es significativo:
1. El operador quiere que ambos dominios aparezcan en resultados de búsqueda de Google
2. El operador tiene acceso a la consola de Google, lo que implica una cuenta de Gmail o Google activa
3. Los tokens de verificación son únicos por dominio y no pueden compartirse, pero pueden cruzarse contra bases de datos de inteligencia de amenazas

---

## 10. Nuevo dominio descubierto: librepelota.su

Mediante reverse IP lookup de la IP 128.0.104.23 (via HackerTarget API), se identificó un nuevo dominio no documentado previamente:

### librepelota.su

| Campo | Valor |
|---|---|
| IP activa | Sin resolución A activa (parked) |
| Name Servers | pola.ns.cloudflare.com / rex.ns.cloudflare.com (Cloudflare) |
| NS adicionales | a/b/d/e/f.dns.ripn.net (DNS raíz ruso TLD .su) |
| Titular | Private Person |
| Registrador | ARDIS-SU (mismo que futbollibretv.su y futbol-libre.su) |

**Hipótesis:** `librepelota.su` es el dominio de reserva más reciente del operador. El nombre combina "libre" (de futbol-libre) con "pelota" (de pelotalibretv), sugiriendo que es una consolidación de marca para ambos mercados (España/LatAm + Argentina/Uruguay). No tiene resolución A activa aún, lo que sugiere que está en preparación para ser desplegado.

**Ecosistema actualizado (11 dominios + 1 en preparación):**

```
Virtual Systems LLC (UA)
├── futbollibretv.su       → redirige a futbol-libre.su (dominio entrada)
├── futbol-libre.su        → dominio canónico actual (España/LatAm)
├── pelotalibretv.su       → mercado rioplatense
├── latamvidz1.com         → servidor de streams (backend técnico)
└── librepelota.su         → en preparación (consolidación de marca)

Cloudflare (proxy)
├── doeemain.org           → plataforma matriz (es/pt subdominios)
└── yourewatching.org/.1/.2 → mercado anglófono

BunnyCDN (Miami, USA)
└── cdn.futbol-libre.su (fltsu) → assets estáticos
```

---

## 11. Historial Wayback Machine

### futbollibretv.su

La API CDX de Wayback Machine muestra capturas disponibles:

| Fecha | Código HTTP |
|---|---|
| 16 mar 2026 | 200 OK |
| 16 mar 2026 | 200 OK |
| 31 mar 2026 | 200 OK |
| 03 abr 2026 | 200 OK |
| 08 abr 2026 | 200 OK |
| 15 abr 2026 | 200 OK (×3) |

**Primera captura registrada:** 16 de marzo de 2026. Antes de esa fecha no hay capturas indexadas en Wayback Machine.

**futbol-libre.su:** La API CDX no retornó capturas disponibles para este dominio (posiblemente bloqueado por el operador vía robots.txt, aunque el robots.txt actual permite indexación completa).

---

## 12. CMS y panel de administración

**El sitio NO usa WordPress** (verificado: 404 en `/wp-login.php` y `/wp-admin/`). Es un sitio estático personalizado con:
- HTML estático servido con nginx + cache de nginx
- PHP solo para el servidor de streams (latamvidz1.com/canal.php)
- jQuery para interactividad del menú y la agenda
- No se detectó ningún sistema de gestión de contenido convencional

---

## Evidencias adjuntas

- `evidencias/headers/headers_futbol-libre_su.txt` — headers HTTP del dominio canónico
- `evidencias/headers/headers_verbose_futbol-libre.txt` — headers detallados con handshake TLS
- `evidencias/dns/dns_ecosistema_10may2026.txt` — snapshot DNS de todo el ecosistema
- `evidencias/puertos/portscan_185254197023.txt` — resultado port scan IP principal
- `evidencias/source_futbol-libre_index.html` — código fuente de la página de inicio
- `evidencias/source_futbol-libre_espn1.html` — código fuente de página de canal ESPN-1

---
