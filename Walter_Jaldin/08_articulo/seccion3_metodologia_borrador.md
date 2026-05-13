# Sección 3 — Metodología (borrador v1)

**Estado:** Borrador inicial — pendiente de revisión por el equipo  
**Autor:** Walter Jaldín Gonzales  
**Fecha:** 13 de mayo de 2026  
**Basado en:** Jornadas 1–7 de investigación

---

## 3. Metodología

### 3.1 Diseño general del estudio

Este estudio adopta un diseño experimental de laboratorio con enfoque mixto: cuantitativo para la medición de solicitudes de red, cookies y comportamiento del tráfico, y cualitativo para el análisis de las vulnerabilidades y la exposición percibida del usuario. El estudio se estructura en tres fases secuenciales: (1) reconocimiento pasivo y activo del sitio objetivo mediante técnicas OSINT, (2) ejecución de sesiones experimentales controladas en emuladores Android y (3) análisis e interpretación de hallazgos bajo el marco OWASP.

### 3.2 Sitio objetivo

El sitio bajo análisis es **futbollibretv.su** (entrada) → **futbol-libre.su** (dominio canónico), un sitio de streaming pirata de eventos deportivos en vivo orientado a audiencias hispanohablantes. La selección del sitio se justifica por su alta frecuencia de uso documentada en Bolivia y la región latinoamericana, su modelo típico de monetización mediante redes de publicidad agresiva, y la ausencia de estudios académicos previos sobre este tipo de infraestructura en el contexto regional.

### 3.3 Marco de análisis de seguridad

El análisis de vulnerabilidades se realiza bajo tres marcos complementarios:

1. **OWASP Top 10 Client-Side 2023:** para categorizar las vulnerabilidades identificadas en el cliente web (browser).
2. **OWASP Web Security Testing Guide (WSTG) v4.2:** como guía metodológica para las pruebas de reconocimiento activo.
3. **OWASP Risk Rating Methodology:** para evaluar la severidad de cada hallazgo mediante la combinación de probabilidad de ocurrencia e impacto potencial.

### 3.4 Fase 1 — Reconocimiento OSINT (pasivo y activo)

#### 3.4.1 Reconocimiento pasivo

El reconocimiento pasivo se realizó sin interactuar directamente con el servidor objetivo, utilizando fuentes de datos públicas:

- **WHOIS y registros DNS:** identificación del registrador (ARDIS-SU), titular (anónimo con correo expuesto: hassan.azmw@gmail.com), servidores de nombres y registros A/MX/SOA. Herramientas: `whois`, `dig`.
- **Certificate Transparency (crt.sh):** consulta de registros de certificados TLS para identificar subdominios y dominios relacionados.
- **Wayback Machine (CDX API):** análisis del historial de capturas para establecer la línea temporal del sitio.
- **VirusTotal y URLhaus:** consulta de reputación de dominios e IPs del ecosistema.
- **Shodan InternetDB API:** identificación de puertos abiertos, software expuesto y CVEs asociados a las IPs del ecosistema, sin realizar escaneos activos propios.
- **HackerTarget Reverse IP API:** identificación de dominios co-hospedados en las mismas IPs.

#### 3.4.2 Reconocimiento activo

El reconocimiento activo implicó interacción directa con el servidor mediante solicitudes HTTP estándar, equivalentes a las que realiza un navegador web convencional:

- **Análisis de headers HTTP:** mediante `curl -sI` para inspeccionar cabeceras de respuesta y evaluar la presencia de headers de seguridad (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy, Cache-Control).
- **Análisis del código fuente HTML:** descarga de las páginas principales y de canal para identificar scripts externos, iframes, atributos SRI, y endpoints de terceros.
- **Análisis de aclib.js:** descarga y deofuscación parcial del script de Adsterra (166 KB, altamente ofuscado con patrón `_0x*`) mediante decodificación Python de strings Base64 internos.
- **Análisis del servidor de streams:** solicitud a `latamvidz1.com/canal.php?stream=espn` con cabecera `Referer` correcta para obtener el HTML completo del reproductor, incluyendo URL HLS, token de autenticación y configuración SwarmCloud.
- **Verificación de puertos con netcat:** confirmación de accesibilidad de puertos cPanel (2082-2087), MySQL (3306) y RTMP (1935).

### 3.5 Fase 2 — Sesiones experimentales en emuladores Android

#### 3.5.1 Entorno de laboratorio

Las sesiones experimentales se ejecutan en emuladores Android creados con Android Studio AVD (Android Virtual Device), bajo las siguientes especificaciones:

| Parámetro | Valor |
|---|---|
| Herramienta | Android Studio Panda 3 \| 2025.3.3 Patch 1 |
| Imagen Android 14 | Pixel 6 (API 34), Google APIs arm64-v8a |
| Imagen Android 11 | Pixel 5 (API 30), Google APIs arm64-v8a |
| RAM por AVD | 3 GB |
| Almacenamiento | 6 GB |
| Boot | Quick Boot con snapshot `baseline_limpio` |

La imagen **Google APIs arm64-v8a** fue seleccionada sobre Google Play Store para permitir la instalación del certificado CA de Burp Suite como autoridad de sistema, requisito para la interceptación de tráfico HTTPS.

#### 3.5.2 Perfiles experimentales

El diseño factorial 2×2 contempla las siguientes combinaciones:

| Perfil | Android | Protección DNS | Código |
|---|---|---|---|
| Sin protección, Android 14 | 14 (API 34) | Ninguna (DNS ISP por defecto) | A14-N |
| Con protección, Android 14 | 14 (API 34) | AdGuard DNS (94.140.14.14) | A14-D |
| Sin protección, Android 11 | 11 (API 30) | Ninguna (DNS ISP por defecto) | A11-N |
| Con protección, Android 11 | 11 (API 30) | AdGuard DNS (94.140.14.14) | A11-D |

Cada perfil se repite **5 veces** (R1–R5), totalizando **20 sesiones experimentales**. Cada sesión parte del snapshot `baseline_limpio` para garantizar un estado inicial idéntico.

#### 3.5.3 Protocolo de sesión experimental

Cada sesión sigue el siguiente protocolo estandarizado:

1. **Preparación (pre-sesión):**
   - Restaurar snapshot `baseline_limpio` en el AVD correspondiente.
   - Iniciar captura Wireshark en la interfaz de red del emulador.
   - Iniciar Burp Suite Community con el proxy configurado (127.0.0.1:8080).
   - Configurar el proxy en el AVD (WiFi → Proxy manual).

2. **Ejecución (sesión):**
   - Abrir Chrome en el AVD y navegar a `https://futbollibretv.su`.
   - Esperar la carga completa de la página principal (máximo 30 segundos).
   - Navegar a la página de un canal (ESPN-1 o equivalente).
   - Esperar la carga del reproductor de video (máximo 30 segundos).
   - Observar y registrar: popups/pestañas abiertas, solicitudes de permisos, cookies emitidas.
   - Intentar reproducir el stream (click en play).
   - Mantener el stream activo durante 60 segundos.

3. **Cierre (post-sesión):**
   - Detener captura Wireshark → guardar .pcap.
   - Exportar historial de Burp Suite (HTTP history).
   - Registrar observaciones en `05_sesiones/[perfil]/notas.md`.
   - Restaurar snapshot para la siguiente sesión.

#### 3.5.4 Variables de medición

| Variable | Instrumento | Métrica |
|---|---|---|
| Solicitudes de red | Burp Suite / Wireshark | Número de requests, dominios contactados |
| Cookies emitidas | Burp Suite HTTP History | Nombre, flags (HttpOnly/Secure/SameSite) |
| Popups generados | Observación directa | Número de pestañas/ventanas nuevas |
| Datos P2P transmitidos | Wireshark (filtro SwarmCloud) | MB enviados/recibidos por P2P |
| Dominios de terceros | Burp Suite | Lista y clasificación de terceros |
| Requests bloqueados | Wireshark (perfil D) | Diferencia entre perfil N y D |

### 3.6 Fase 3 — Análisis e interpretación

Los hallazgos de las fases 1 y 2 se analizan bajo tres dimensiones:

1. **Exposición técnica:** mapeo de vulnerabilidades contra OWASP Top 10 Client-Side, evaluación de severidad mediante OWASP Risk Rating (probabilidad × impacto).

2. **Exposición por perfil de usuario:** comparación entre los 4 perfiles experimentales para cuantificar la reducción de riesgo aportada por AdGuard DNS en Android 14 vs Android 11.

3. **Implicaciones para el usuario boliviano:** contextualización de los hallazgos en el marco del acceso típico desde Bolivia (conexiones móviles LTE, dispositivos de gama media-baja).

### 3.7 Limitaciones del estudio

1. **AbuseIPDB:** no se pudo obtener API key para consultas automatizadas de reputación de IPs. Las consultas de reputación se realizaron mediante VirusTotal y URLhaus como alternativas.

2. **Análisis dinámico de aclib.js:** la deofuscación completa del script de Adsterra requiere ejecución en browser real con DevTools. El análisis estático parcial fue posible mediante decodificación de strings Base64.

3. **SpyOnWeb/BuiltWith:** no disponibles vía API gratuita para el cruce de Google Analytics IDs. Pendiente de análisis manual en browser.

4. **Emulador vs dispositivo físico:** las sesiones en AVD no reproducen exactamente el comportamiento de un dispositivo físico, especialmente en aspectos como uso de datos móviles (el emulador usa la conexión WiFi del host) y comportamiento de aplicaciones del sistema.

5. **Temporalidad:** la infraestructura del sitio puede cambiar entre el reconocimiento y las sesiones experimentales. Los hallazgos representan el estado del sitio durante el período mayo–junio 2026.

---

*Este borrador requiere revisión del equipo antes de su integración al manuscrito final.*
