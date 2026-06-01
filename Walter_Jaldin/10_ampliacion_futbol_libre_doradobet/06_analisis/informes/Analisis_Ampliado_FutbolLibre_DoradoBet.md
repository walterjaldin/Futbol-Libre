# Informe ampliado de ciberseguridad

Proyecto: Futbol Libre / DoradoBet  
Fecha local del análisis: 31 de mayo de 2026  
Autor: Walter Jaldin  
Objetivo: Profundizar en redirecciones, publicidad, descargas, rastreo y riesgos para el usuario.

## Resumen ejecutivo

El análisis dinámico de Futbol Libre confirmó que el mayor riesgo no aparece en la página inicial sino en la cadena reproductor-publicidad: el dominio original `futbollibretv.su` redirige a `futbol-libre.su`, los canales cargan iframes de `latamvidz1.com`, el reproductor integra publicidad tipo pop-under mediante `acscdn.com/script/aclib.js`, y el video usa infraestructura HLS/P2P con `envivoslatam.org` y `meshify.cloud`. En la prueba controlada no se observó descarga automática, pero sí se observó intento de abrir ventana nueva (`about:blank`) desde el iframe al interactuar con el reproductor.

DoradoBet presenta un perfil diferente. No se comportó como sitio pirata ni mostró descarga automática durante la prueba. Sí se identificó una superficie amplia de rastreo: FingerprintJS, Google Tag Manager, Amplitude, TikTok, Microsoft Clarity, Criteo, Adform, AppNexus/Xandr, MGID, Sportradar y otros dominios de publicidad/retargeting. El riesgo principal no es malware directo, sino privacidad, perfilado persistente, exposición financiera/KYC y suplantación por dominios parecidos.

## Metodología

- Reconocimiento DNS, TLS y cabeceras HTTP.
- Extracción de HTML, scripts, iframes y enlaces.
- Navegación automatizada con perfil temporal aislado de Chrome.
- Registro de solicitudes de red, dominios contactados, popups, service workers y descargas.
- No se creó cuenta, no se inició sesión, no se depositó dinero y no se ejecutó ningún archivo descargado.

## Futbol Libre: hallazgos nuevos

### Redirección principal

`https://futbollibretv.su/` redirige actualmente por HTTP 301 a `https://futbol-libre.su/`.

### Publicidad y scripts observados

En la portada se observaron:

- `https://acscdn.com/script/suv5.js`
- `https://acscdn.com/script/aclib.js`
- llamada explícita `aclib.runPop({ zoneId: '10652966' })`
- enlace publicitario oculto o sin texto visible hacia `https://adexchangerapid.com/ad/visit.php?al=1`
- Google Analytics / Google Tag Manager

### Canal ESPN / reproductor

La página `https://futbol-libre.su/espn-1/` incrusta:

- iframe: `https://latamvidz1.com/canal.php?stream=espn`
- reproductor Clappr
- plugin SwarmCloud HLS/P2P
- HLS servido desde `envivoslatam.org`
- comunicación P2P/telemetría con `us.meshify.cloud`
- service worker en `https://latamvidz1.com/sw.js`

### Comportamiento al interactuar

Durante la prueba controlada:

- No se observó descarga automática.
- No se observó archivo `.exe`, `.apk`, `.dmg`, `.zip` ni equivalente.
- Se observó un intento de abrir ventana nueva desde el iframe (`Page.windowOpen` con `about:blank`) al hacer clic en el reproductor.
- La publicidad se ejecuta dentro de un contexto de terceros y puede cambiar por país, hora, IP, navegador y campaña.

### Riesgo técnico

El riesgo se mantiene alto porque la página combina contenido pirata, publicidad de baja calidad, scripts ofuscados, iframes externos, pop-under y P2P. Aunque en esta ejecución no se descargó malware, el usuario queda expuesto a redirecciones variables, rastreo, abuso de permisos, ventanas emergentes y campañas de malvertising que pueden cambiar sin modificar el dominio principal.

## DoradoBet: hallazgos técnicos

### Dominio analizado

Dominio principal observado: `doradobet.com`

DNS:

- IPv4: `104.18.192.230`, `104.18.193.230`
- IPv6: `2606:4700::6812:c0e6`, `2606:4700::6812:c1e6`
- Nameservers: `edna.ns.cloudflare.com`, `jerry.ns.cloudflare.com`
- Proveedor frontal: Cloudflare

TLS:

- Certificado para `doradobet.com` y `*.doradobet.com`
- Emisor: Google Trust Services
- Vigencia observada: 16 de mayo de 2026 a 14 de agosto de 2026

Cabeceras positivas:

- Redirección HTTP a HTTPS
- `Strict-Transport-Security`
- `X-Content-Type-Options: nosniff`
- cookies Cloudflare y balanceador con `HttpOnly` / `Secure`

Cabeceras débiles o incompletas:

- CSP observada solo restringe `frame-ancestors`; no se observó una política fuerte que limite scripts, conexiones e imágenes.
- No se observó `Permissions-Policy`.
- `Referrer-Policy` es `no-referrer-when-downgrade`, menos restrictiva que `strict-origin-when-cross-origin` o `no-referrer`.
- No se encontró `security.txt`; la URL respondió con HTML normal.

### Rastreo y terceros

En una carga controlada de `https://doradobet.com/` se observaron más de 50 dominios externos. Entre los principales:

- `fpjscdn.net` y `api.fpjs.io` para FingerprintJS
- `static.virtualsoft.tech` y `cdnconfigs.virtualsoft.tech`
- `api2.amplitude.com` y `cdn.amplitude.com`
- `www.googletagmanager.com`, `www.google-analytics.com`, `stats.g.doubleclick.net`
- `analytics.tiktok.com`
- `www.clarity.ms`, `scripts.clarity.ms`
- `dynamic.criteo.com`, `gum.criteo.com`
- `a2.adform.net`, `track.adform.net`
- `acdn.adnxs.com`, `ib.adnxs.com`
- `a.mgid.com`
- `tracker.ads.sportradar.com`, `tm.ads.sportradar.com`
- `ctag.containermedia.net`
- `www.rtb123.com`, `x.bidswitch.net`, `pixel.rubiconproject.com`

### Fingerprinting confirmado

El HTML contiene una integración explícita con FingerprintJS:

- carga dinámica de `https://fpjscdn.net/v4/PmGJOlgFXlEl6IqCC6Bi`
- almacenamiento de `result.visitor_id` en `localStorage`
- claves observadas: `visitor_fp`, `visitor_fp5`, `fp_visitor_id`
- envío del identificador a `https://static.virtualsoft.tech/setvid`

Esto permite reconocer al visitante de manera persistente incluso si no inicia sesión. No equivale a malware, pero sí es rastreo avanzado.

### Permisos, descargas y popups

Durante la prueba:

- No se observó descarga automática.
- No se observaron instaladores `.apk`, `.exe`, `.dmg`, `.pkg` o `.zip`.
- No se observó popup en la carga inicial.
- No se observó solicitud de notificaciones push; el permiso quedó en `default`.
- No se observó service worker activo en la página principal.
- La sección de app apunta a una PWA (`/landing/app-pwa`), no a una descarga directa de APK en la evidencia recolectada.

### Licencia y jurisdicción

La propia página muestra en el pie que DoradoBet es operado por `VS Services Ltd`, con dirección en Anjouan, Unión de Comoras, y licencia `ALSI-132405045-F13` o variante visualmente similar. El sello externo de Anjouan confirmó una página de validación para `doradobet.com` y mostró licencia `ALSI-132405045-FI3`, con jurisdicciones excluidas como Estados Unidos, Reino Unido, España, Francia, Países Bajos, Australia y Comoros.

Este punto no implica malware, pero sí es importante para el usuario: cualquier disputa de cuenta, retiro, bloqueo o verificación KYC dependerá de términos y jurisdicción de juego, no de protecciones bancarias comunes.

### Riesgos para el usuario

- Privacidad: alto. El sitio usa fingerprinting persistente y muchas redes de publicidad/retargeting.
- Malware directo: bajo en esta ejecución. No hubo descarga ni exploit observado.
- Phishing/suplantación: medio-alto. Hay múltiples dominios parecidos en resultados públicos (`doradobet.online`, `dorado-bet.pe`, `doradobet-peru.org`, etc.). Algunos son WordPress o sitios promocionales no necesariamente oficiales.
- Riesgo financiero: alto por naturaleza del servicio. El usuario puede entregar datos personales, documento, teléfono, banco y medios de pago.
- Riesgo KYC: alto. Para retiros/verificación se solicitan datos reales y documentos; si el usuario cae en un clon, el daño potencial es robo de identidad.
- Riesgo legal/regulatorio: variable por país. El usuario debe verificar si el operador está autorizado en su jurisdicción concreta.

## Comparación rápida

| Sitio | Riesgo principal | Descarga observada | Publicidad/redirección | Rastreo |
|---|---|---:|---|---|
| Futbol Libre | Malvertising, pop-under, iframes externos, P2P | No | Alta | Media |
| DoradoBet | Privacidad, KYC, financiero, suplantación por clones | No | Alta red publicitaria/retargeting, no popup inicial | Alta |

## Conclusiones

No se encontró una descarga maliciosa automática ni en Futbol Libre ni en DoradoBet durante estas ejecuciones controladas. Sin embargo, eso no significa que sean equivalentes.

Futbol Libre sigue siendo el más peligroso técnicamente: usa infraestructura cambiante de streaming pirata, publicidad pop-under y terceros que pueden variar por campaña. La ausencia de descarga en una prueba no elimina el riesgo de malvertising.

DoradoBet parece una plataforma comercial más estructurada y con controles básicos de seguridad web, pero expone al usuario a rastreo intensivo, perfilado persistente, recopilación KYC y riesgo financiero. El mayor peligro práctico es entregar datos reales o documentos a un clon o a una página promocional no oficial.

## Recomendaciones

- No usar perfiles personales del navegador para sitios de apuestas o streaming riesgoso.
- Bloquear terceros con uBlock Origin o Brave Shields.
- Revisar y borrar permisos del navegador, cookies y datos de sitio.
- No instalar APKs ni apps fuera de tiendas oficiales.
- Verificar que el dominio sea exactamente `doradobet.com` antes de ingresar datos.
- No enviar documentos por correo o chat salvo que se haya validado el canal oficial.
- Usar tarjetas virtuales o métodos con límites cuando se trate de pagos en línea.
- Revisar términos de bonos, rollover, KYC, retiros y jurisdicción antes de depositar.

## Evidencias locales

- `evidencias/aclib.js`
- `evidencias/suv5.js`
- `evidencias/latamvidz1_espn.html`
- `evidencias/cdp/probe-result.json`
- `evidencias/doradobet/home.html`
- `evidencias/doradobet/pe_home.html`
- `evidencias/doradobet/app_pwa.html`
- `evidencias/doradobet/config_bo.js`
- `evidencias/doradobet/cdp/probe-result.json`

## Fuentes consultadas

- Sitio principal: https://doradobet.com/
- Validación Anjouan: https://verification.anjouangamingboard.org/
- ScamAdviser: https://www.scamadviser.com/check-website-old/doradobet.com
- ScamDoc: https://www.scamdoc.com/view/419235
- Klazify: https://www.klazify.com/website/doradobet.com
- Yogonet sobre autorización en Perú: https://www.yogonet.com/international/news/2024/04/16/71750-peru-doradobet-earns-authorization-to-operate-online-casino-games-for-the-next-six-years
