# 01. Contexto de la sesión

## Identificación de la sesión

- **ID de sesión:** S02
- **Tipo de análisis:** Análisis técnico de exposición de seguridad durante navegación web
- **Objetivo principal:** Identificar mecanismos de tracking, redirecciones inducidas, exposición a terceros y posibles riesgos de seguridad asociados a la navegación en el sitio objetivo.

---

## Sitio objetivo

- **Dominio principal analizado:** `futbol-libre.su`
- **URL inicial observada:** `https://futbol-libre.su/`
- **Tipo de servicio observado:** Portal web de acceso a contenido de streaming deportivo.

---

## Entorno experimental

### Sistema cliente

- **Sistema operativo:** Windows 10 x64
- **Plataforma reportada:** Win32
- **Navegador:** Mozilla Firefox
- **Versión observada:** Firefox 150.0
- **Idioma configurado:** `es-ES`
- **Zona horaria observada:** UTC-4
- **Resolución de pantalla observada:** 1536x864
- **Viewport observado:** 1536x739
- **Densidad de píxeles (DPR):** 1.25

---

## Herramientas utilizadas

Durante la sesión experimental se utilizaron las siguientes herramientas de captura e inspección:

- **Burp Suite**
  - Captura de tráfico HTTP/HTTPS
  - Inspección de requests y responses
  - Identificación de redirecciones
  - Inspección de cookies
  - análisis de headers
  - revisión de recursos third-party

- **Burp WebSocket History**
  - inspección de comunicaciones persistentes WebSocket
  - revisión de mensajes JSON bidireccionales

- **Logger++ / observación temporal**
  - correlación temporal de eventos observados

- **Observación manual controlada**
  - interacción directa con el sitio
  - documentación de eventos visibles (popups, nuevas pestañas, redirecciones, reproducción de contenido)

---

## Alcance de captura

### Incluido en el análisis

Se analizaron los siguientes artefactos técnicos:

- tráfico HTTP y HTTPS
- requests GET y POST
- responses HTTP
- headers HTTP
- cookies observables
- redirecciones HTTP (302 / 303)
- comunicaciones WebSocket
- ejecución de recursos third-party
- recursos embebidos cross-site
- endpoints de streaming
- playlists multimedia (`m3u8`)
- segmentos multimedia (`.ts`)
- telemetría analítica observada
- infraestructura publicitaria y de tracking

---

### No incluido en el análisis

El alcance de esta sesión no incluyó:

- análisis dinámico de malware en sandbox
- reverse engineering completo de JavaScript
- análisis de memoria RAM
- captura de tráfico fuera del navegador
- análisis DNS independiente
- análisis del sistema de archivos
- inspección de persistencia local avanzada
- análisis de procesos del sistema operativo
- deobfuscación completa de payloads publicitarios

---

## Metodología operacional de la sesión

La sesión se ejecutó mediante navegación manual controlada sobre el dominio objetivo.

El procedimiento seguido consistió en:

1. acceso inicial al dominio principal
2. navegación manual sobre el portal
3. interacción deliberada con elementos visuales y reproductores
4. observación de aperturas de popups y redirecciones
5. inspección pasiva del tráfico generado
6. identificación de terceros involucrados
7. correlación de requests/responses con eventos observables
8. análisis de infraestructura publicitaria y de tracking
9. reconstrucción de cadenas de redirección
10. identificación de infraestructura de entrega de streaming

---

## Comportamiento manual observado durante la sesión

Durante la interacción manual se documentaron los siguientes eventos visibles:

- apertura automática de popups tras clics del usuario
- apertura de nuevas pestañas o ventanas inducidas
- redirección hacia plataformas externas no solicitadas
- necesidad de múltiples interacciones para acceder al contenido
- persistencia de popups incluso durante navegación funcional
- acceso final al contenido multimedia mediante reproductor externo

---

## Características generales observadas

A nivel general, la sesión presentó:

- interacción intensiva con infraestructura third-party
- activación recurrente de mecanismos de tracking
- múltiples cadenas de redirección publicitaria
- exposición a plataformas externas comerciales
- ejecución de widgets embebidos de terceros
- establecimiento de canales persistentes WebSocket
- entrega indirecta del contenido multimedia
- coexistencia de streaming funcional con tracking activo

---

## Limitación contextual

Esta sesión representa una observación experimental puntual bajo condiciones controladas.

Los hallazgos documentados corresponden exclusivamente al comportamiento observable dentro del intervalo de captura analizado y no implican necesariamente persistencia temporal fuera del periodo experimental.