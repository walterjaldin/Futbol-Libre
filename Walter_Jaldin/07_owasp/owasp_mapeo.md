# Mapeo OWASP — Hallazgos del sitio futbol-libre.su

**Fecha:** 11 de mayo de 2026  
**Investigador:** Walter Jaldín  
**Marco:** OWASP Top 10 Client-Side 2023 + OWASP WSTG v4.2  
**Fuente de datos:** Reconocimiento OSINT (jornadas 1-11) + análisis estático de código + sesiones experimentales mitmproxy

---

## Resumen ejecutivo

El análisis de los hallazgos acumulados contra el marco OWASP Top 10 Client-Side revela **5 categorías de vulnerabilidades activas** y **3 categorías de riesgos elevados** en el sitio futbol-libre.su. El vector de mayor impacto es la combinación de **ausencia de Content-Security-Policy** con la **inyección dinámica de iframes y scripts externos no verificados**, que permite al ecosistema de malvertising operar sin restricción técnica alguna. El riesgo principal para el usuario no es una vulnerabilidad técnica explotable activamente por el sitio, sino la **exposición pasiva a través de terceros** (red Adsterra, servidor de streams, P2P CDN) que el sitio invoca deliberadamente.

---

## A1 — Broken Object Level Authorization / Insecure Direct Object Reference

**Aplicabilidad:** BAJA (no se detectó)

No se identificaron endpoints con IDOR en el reconocimiento pasivo. El servidor de streams (`latamvidz1.com/canal.php?stream=<canal>`) usa parámetros de tipo categorial (`espn`, `fox`, etc.), no IDs numéricos secuenciales. Sin embargo, queda pendiente verificar si un usuario puede acceder a canales no listados mediante enumeración de valores del parámetro `stream`.

**Estado:** Pendiente de verificación en sesiones experimentales.

---

## A2 — Broken Authentication

**Aplicabilidad:** MEDIA

El sitio no tiene sistema de autenticación propio (sin login, sin cuentas). Sin embargo:

1. **PHPSESSID sin flags de seguridad:** El servidor `latamvidz1.com` emite una cookie `PHPSESSID` sin los atributos `HttpOnly`, `Secure` ni `SameSite`. Esto expone la cookie a:
   - Robo vía XSS (sin HttpOnly)
   - Transmisión en HTTP si hay downgrade (sin Secure)
   - CSRF de origen cruzado (sin SameSite)

2. **Token de stream IP-bound pero compartible:** El token HLS (`d087c65d...-1778518249-1778464249`) vincula el stream a una IP pero no a una sesión de usuario. Un token capturado puede ser usado por cualquier dispositivo en la misma IP de red (ej. toda una red NAT compartida).

**Evidencia:**
```
Set-Cookie: PHPSESSID=bf15a598bf10889a1ed4b1b3c29c7d68; path=/
(sin HttpOnly, sin Secure, sin SameSite)
```

---

## A3 — Cross-Site Scripting (XSS)

**Aplicabilidad:** ALTA

La **ausencia total de Content-Security-Policy** combinada con la **carga de scripts de terceros sin integridad verificada** crea un vector XSS potencialmente aprovechable por actores intermedios:

### Vectores identificados

| Vector | Riesgo | Descripción |
|---|---|---|
| `acscdn.com/script/aclib.js` | CRÍTICO | Script externo 166 KB altamente ofuscado, sin Subresource Integrity (SRI). Si el CDN de Adsterra es comprometido, se ejecuta código arbitrario en el browser del usuario. |
| `cdn.jsdelivr.net` (Clappr, SwarmCloud) | ALTO | Scripts de terceros sin SRI. jsdelivr es CDN popular pero sin verificación de integridad. |
| `code.jquery.com/jquery-3.7.1.min.js` | ALTO | jQuery cargado sin SRI desde CDN de jQuery Foundation. |
| `ajax.googleapis.com/jquery/1.7.1` | MEDIO | jQuery versión antigua (1.7.1) en la página de agenda — versión con vulnerabilidades conocidas. |
| Iframe `latamvidz1.com` | ALTO | Iframe sin `sandbox` attribute. El contenido del iframe puede acceder al parent document bajo mismas condiciones de Same-Origin si se usa `document.domain`. |

### jQuery 1.7.1 — CVEs conocidos

La versión jQuery 1.7.1 usada en `/agenda/` tiene múltiples CVEs:
- **CVE-2019-11358:** prototype pollution
- **CVE-2020-11022 / CVE-2020-11023:** XSS en `.html()` y `.load()`

Aunque estas vulnerabilidades requieren que el código de la página las explote de forma específica, el uso de una versión tan antigua es una señal de descuido técnico.

### CSP ausente — máxima exposición

```
Content-Security-Policy: [AUSENTE]
```

Sin CSP, el navegador ejecuta cualquier script inyectado sin validación de fuente. Esto permite:
- Scripts inline inyectados
- Scripts de dominios no autorizados
- Eval() dinámico
- Datos URI

---

## A4 — Insecure Design / Third-Party Components

**Aplicabilidad:** CRÍTICA

El diseño arquitectónico del sitio **delega deliberadamente** el riesgo a terceros:

### Cadena de exposición a terceros

```
Usuario
  → futbol-libre.su (nginx, HTML estático)
      → acscdn.com/aclib.js (Adsterra - OFUSCADO, POPUNDER)
      → latamvidz1.com/canal.php (PHP stream server, PHPSESSID)
          → vg7ie.envivoslatam.org (HLS server - Streamer 24.03, RTMP 1935)
              → SwarmCloud P2P (usuarios como nodos de distribución)
          → acscdn.com/aclib.js (ADSTERRA SEGUNDA VEZ en el iframe)
```

**El usuario recibe contenido de 5 dominios distintos controlados por actores desconocidos**, más el P2P CDN que convierte su dispositivo en nodo de distribución. Ninguno de los terceros tiene mecanismos de verificación de integridad de contenido visibles.

### SwarmCloud P2P — implicaciones de privacidad

SwarmCloud convierte el navegador del usuario en un **nodo P2P** que:
1. Sirve fragmentos del stream HLS a otros usuarios (sus datos móviles/banda ancha son consumidos)
2. Expone su IP a otros pares en la red P2P
3. Puede descargarse y cachear contenido localmente sin el conocimiento del usuario

---

## A5 — Security Misconfiguration

**Aplicabilidad:** CRÍTICA

### Headers de seguridad ausentes (9 evaluados)

| Header | Estado | Riesgo si ausente |
|---|---|---|
| `Content-Security-Policy` | **AUSENTE** | XSS irrestricto, scripts de terceros no controlados |
| `Strict-Transport-Security` | **AUSENTE** | Posible downgrade HTTPS→HTTP |
| `X-Frame-Options` | **AUSENTE** | Clickjacking: el sitio puede ser embebido en iframes maliciosos |
| `Referrer-Policy` | **AUSENTE** | Fuga de URL de navegación en cabeceras Referer |
| `Permissions-Policy` | **AUSENTE** | Sin restricciones a APIs: cámara, micrófono, geolocalización |
| `Cache-Control` | **AUSENTE** | El HTML puede cachearse con contenido dinámico |
| `X-XSS-Protection` | Presente | Protección básica heredada (deprecated en navegadores modernos) |
| `X-Content-Type-Options` | Presente (`nosniff`) | MIME sniffing prevenido |

### Panel de administración expuesto

- cPanel (puerto 2082/2083): accesible directamente por IP
- WHM (puerto 2086/2087): accesible directamente por IP
- Webmail (puerto 2095/2096): accesible directamente por IP
- MySQL (puerto 3306): expuesto a Internet sin filtrado visible

### Cookie sin atributos de seguridad

```
PHPSESSID=bf15a598bf10889a1ed4b1b3c29c7d68; path=/
```
Sin `HttpOnly`, `Secure`, ni `SameSite`.

---

## A6 — Vulnerable and Outdated Components

**Aplicabilidad:** ALTA

| Componente | Versión | Estado |
|---|---|---|
| jQuery | 1.7.1 (en `/agenda/`) | Obsoleto. Última: 3.7.1. CVEs: CVE-2019-11358, CVE-2020-11022/23 |
| jQuery | 3.7.1 (en index/canales) | Actual |
| Clappr Player | 0.8 | Verificar si es última versión estable |
| aclib.js | Versión desconocida (ofuscado) | No verificable |

---

## A7 — Identification and Authentication Failures

**Aplicabilidad:** BAJA-MEDIA

No hay sistema de autenticación de usuarios. El mecanismo de acceso al stream (token URL + IP binding) es la única forma de control de acceso, y como se documentó en A2, tiene limitaciones.

---

## A8 — Software and Data Integrity Failures

**Aplicabilidad:** CRÍTICA

### Subresource Integrity (SRI) ausente en TODOS los scripts externos

Ninguno de los scripts externos cargados por el sitio incluye el atributo `integrity`:

```html
<!-- Sin SRI: -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/luxon/3.4.4/luxon.min.js"></script>
<script src="//acscdn.com/script/aclib.js"></script>
<script src="//cdn.jsdelivr.net/npm/@clappr/player@0.8/dist/clappr.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/@swarmcloud/hls/p2p-engine.min.js"></script>

<!-- Debería ser: -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha384-..."
        crossorigin="anonymous"></script>
```

Si cualquier CDN es comprometido (supply chain attack), el código malicioso se ejecuta directamente en el browser de cada visitante sin ninguna verificación.

### aclib.js — ofuscación como señal de integridad negativa

El script de Adsterra está altamente ofuscado (**7,995 tokens `_0x*`**), impidiendo verificación visual de su comportamiento. Esta característica es incompatible con la transparencia esperada de un componente de terceros legítimo.

---

## A9 — Security Logging and Monitoring Failures

**Aplicabilidad:** No evaluable externamente

No es posible evaluar los mecanismos de logging del sitio desde el exterior. Sin embargo, la exposición de MySQL en puerto 3306 sin filtrado sugiere configuración por defecto sin hardening.

---

## A10 — Server-Side Request Forgery (SSRF)

**Aplicabilidad:** BAJA (no identificado activamente)

No se identificaron endpoints con parámetros de URL que puedan ser redirigidos para ataques SSRF. El parámetro `?stream=<canal>` parece usarse como clave de lookup interna, no como URL remota. Pendiente verificar en sesiones experimentales.

---

## Hallazgos OWASP adicionales — específicos del contexto de streaming pirata

### Malvertising como vector primario de riesgo (fuera de OWASP estándar)

El riesgo más significativo para el usuario no está en las vulnerabilidades del servidor, sino en el **ecosistema de publicidad** diseñado para maximizar exposición:

1. **Doble exposición Adsterra:** Adsterra aparece tanto en la página principal como dentro del iframe de stream (`latamvidz1.com`). El usuario recibe **dos cargas del script ofuscado** por visita a un canal.

2. **Popunder por diseño:** `aclib.runPop({ zoneId: '10652966' })` configura explícitamente un anuncio de tipo popunder — el tipo de anuncio más agresivo, que abre ventanas o pestañas sin interacción del usuario.

3. **Decodificación de aclib.js revela:**
   - `<!DOCTYPE ` injection → escribe documentos HTML completos (ventanas popunder)
   - `IFRAME` → crea iframes dinámicos
   - `ROTATION` → rota múltiples anuncios
   - `Movement` → detecta movimiento del mouse (anti-bot, activa el ad solo cuando detecta usuario humano real)
   - `ACTION CALLED` → tracking de interacciones

4. **P2P involuntario:** SwarmCloud convierte el dispositivo del usuario en nodo de la red P2P sin consentimiento explícito.

---

## Tabla de riesgos consolidada (OWASP Risk Rating)

| ID | Vulnerabilidad/Riesgo | Probabilidad | Impacto | Nivel |
|---|---|---|---|---|
| A3 | XSS por ausencia de CSP + scripts sin SRI | ALTA | ALTO | **CRÍTICO** |
| A4 | Cadena de 5 terceros no verificados | ALTA | ALTO | **CRÍTICO** |
| A5 | 7/9 headers de seguridad ausentes | ALTA | MEDIO | **ALTO** |
| A8 | Ausencia de SRI en todos los scripts | ALTA | ALTO | **CRÍTICO** |
| M1 | Adsterra popunder (script ofuscado, doble carga) | ALTA | ALTO | **CRÍTICO** |
| M2 | P2P involuntario (SwarmCloud) | ALTA | MEDIO | **ALTO** |
| A2 | Cookie PHPSESSID sin flags de seguridad | MEDIA | MEDIO | **ALTO** |
| A6 | jQuery 1.7.1 obsoleto en /agenda/ | MEDIA | MEDIO | **MEDIO** |
| A5 | MySQL 3306 expuesto en Internet | BAJA | ALTO | **MEDIO** |
| A5 | cPanel/WHM accesible por IP directa | BAJA | ALTO | **MEDIO** |
| A1/A5 | xmlrpc.php expuesto sin protección en pelotalibretv.su | ALTA | ALTO | **CRÍTICO** |
| A7 | Sin rate limiting en xmlrpc brute force | ALTA | ALTO | **CRÍTICO** |
| A4 | TikTok Pixel + Microsoft Clarity vía popunder RTB | ALTA | ALTO | **CRÍTICO** |
| A4 | Lotame DMP audience sync vía popunder RTB | ALTA | MEDIO | **ALTO** |

*(M = categoría específica del contexto malvertising, fuera del Top 10 estándar)*

---

## Hallazgos adicionales — Jornadas 10-11 (sesiones experimentales)

### xmlrpc.php — pelotalibretv.su (A1 + A5 + A7)

`pelotalibretv.su/xmlrpc.php` responde HTTP 200 sin autenticación a `system.listMethods`, exponiendo 80+ métodos WordPress:

- **`system.multicall`** — permite probar cientos de contraseñas en un solo request HTTP, evadiendo rate limiting basado en número de peticiones. Clasificado OWASP A7 (Identification and Authentication Failures).
- **`pingback.ping`** — DDoS reflection y SSRF sin autenticación. Clasificado OWASP A1 (Broken Access Control).
- **`wp.uploadFile`** — con credenciales válidas permite subir webshell PHP. Compromiso total del servidor 138.226.244.112 (SOLLUTIUM/Virtual Systems LLC).

**Severidad CVSS estimada:** 8.8 (Alta) — explotable remotamente sin autenticación previa para vectores DDoS/SSRF.

### Ecosistema RTB expandido — A14-N-R2

La sesión R2 reveló que el popunder RTB introduce un segundo ecosistema de tracking completo que el operador de futbol-libre.su no controla:

- **TikTok Pixel (analytics.tiktok.com):** 30 requests. El perfil del usuario boliviano llega a ByteDance bajo jurisdicción china con leyes de acceso de datos distintas a las europeas.
- **Microsoft Clarity (j.clarity.ms):** Grabación de sesión completa (heatmaps, replay). El sitio de apuestas graba la interacción exacta del usuario con la pantalla.
- **Lotame DMP (crwdcntrl.net):** El perfil del usuario boliviano se sincroniza a una plataforma de audience data vendible a terceros anunciantes.
- **Adform (a2/c1.adform.net):** Ad exchange europeo conectado — amplía el número de actores que reciben datos del usuario.

**Clasificación OWASP A4** (Insecure Design): El modelo de monetización basado en RTB expone por diseño al usuario a terceros desconocidos e incontrolables.

---

## Implicaciones para el usuario de Android

En el contexto del estudio (acceso desde Android 14 / Android 11):

1. **Sin protección del sistema operativo:** Android no bloquea popunders en Chrome por defecto. El usuario recibirá popups/pestañas nuevas al interactuar con la página.

2. **Datos móviles consumidos por P2P:** SwarmCloud puede usar datos de la conexión móvil del usuario para distribuir el stream a otros usuarios.

3. **Exposición de IP real:** La arquitectura P2P expone la IP del dispositivo a otros pares en la red SwarmCloud.

4. **Cookies persistentes:** El `PHPSESSID` de latamvidz1.com puede persistir en el almacenamiento del navegador entre sesiones.

5. **Android 14 vs Android 11:** Las diferencias en protecciones de seguridad entre versiones de Android son relevantes: Android 14 tiene mejores controles de privacidad (Privacy Dashboard, permisos de sensores, etc.) pero no afectan directamente la exposición vía navegador web.

---

## Evidencias que respaldan este análisis

- `04_reconocimiento_activo/evidencias/headers/` — headers HTTP con ausencia de headers de seguridad
- `04_reconocimiento_activo/evidencias/source_futbol-libre_espn1.html` — código fuente con scripts sin SRI
- `04_reconocimiento_activo/evidencias/aclib/aclib_analisis.txt` — análisis estático de aclib.js
- `04_reconocimiento_activo/evidencias/streams/latamvidz1_espn_stream.html` — HTML del stream con doble carga Adsterra
- `03_osint/05_reputacion.md` — datos VirusTotal y URLhaus

---
