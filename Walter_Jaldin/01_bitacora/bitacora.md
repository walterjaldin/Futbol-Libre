# Bitácora de investigación
**Proyecto:** Análisis de exposición del usuario al acceder al sitio futbollibretv.su desde dispositivos Android

**Investigador:** Jaldin Gonzales Walter
**Afiliación:** Universidad San Francisco Xavier de Chuquisaca (USFX)
**Correo:** jaldinwalter6@gmail.com
**Línea de trabajo asignada:** configuración del laboratorio Android (emuladores), ejecución de sesiones experimentales en los perfiles A14-N-R1, A14-D-R1, A11-N-R1, A11-D-R1 y A14-N-R2.
**Fecha de inicio:** 22 de abril de 2026

---

## Entrada 1 — 22 de abril de 2026

**Jornada:** Día 1 — Preparación del entorno de laboratorio
**Hora de inicio:** [completar]
**Hora de fin:** [completar al cerrar jornada]

### Decisiones metodológicas confirmadas durante la jornada
- **Alcance:** estudio exclusivo Android vía emulador.
- **Perfiles:** 4 perfiles, 20 sesiones totales (5 repeticiones por perfil).
- **Variables independientes:** versión de Android (14 vs 11) × nivel de protección (sin protección vs AdGuard DNS).
- **Marco de análisis:** OWASP Top 10 Client-Side + OWASP Risk Rating Methodology + OWASP WSTG.
- **Emulador seleccionado:** Android Studio AVD.
- **Herramientas de interceptación:** Burp Suite Community + Wireshark.
- **Perfiles de dispositivo:** Pixel 6 para Android 14 (API 34), Pixel 5 para Android 11 (API 30).
- **Variante de imagen del sistema:** Google APIs arm64-v8a (con acceso root habilitado), requerida para instalar certificado CA como autoridad de sistema.

### Actividades ejecutadas

**Estructura y documentación**
- Creación de la estructura de carpetas de trabajo personal.
- Inicialización de bitácora (`01_bitacora/bitacora.md`) y registro técnico (`02_registro_tecnico/registro_tecnico.md`).
- Plantillas `notas.md` creadas en las 5 subcarpetas de sesiones experimentales asignadas.
- README personal creado.

**Instalación de software base**
- Android Studio Panda 3 | 2025.3.3 Patch 1 instalado.
- Burp Suite Community 2026.3.3 instalado.
- Wireshark 4.6.4 instalado con ChmodBPF activado.
- OBS Studio 32.1.1 instalado.

**Cuentas OSINT**
- Creadas: VirusTotal, URLScan.io, Shodan, Censys, AbuseIPDB.
- Sustituida por alternativas gratuitas: SecurityTrails → combinación ViewDNS.info + DNSDumpster + crt.sh.
- Pendiente de resolver: Any.run (requiere correo corporativo). Decisión preliminar: sustituir por Hybrid Analysis.

**Creación de AVDs**
- AVD Android 14 creado: `A14_perfil_investigacion` (Pixel 6, API 34, Google APIs arm64-v8a, 3 GB RAM, 6 GB almacenamiento, Quick boot).
- AVD Android 11 creado: `A11_perfil_investigacion` (Pixel 5, API 30, Google APIs arm64-v8a, 3 GB RAM, 6 GB almacenamiento, Quick boot).
- Snapshot `baseline_limpio` creado en ambos AVDs.
- Configuración inicial en ambos: español, sin cuenta Google, device name personalizado (AVD_A14_INV, AVD_A11_INV).

**Configuración de Burp Suite como proxy**
- Listener configurado en 0.0.0.0:8080 (todas las interfaces) para permitir conexión desde AVD vía IP 10.0.2.2.
- Intercept desactivado (solo registro pasivo en HTTP history).
- Certificado CA exportado como `cacert.der`.
- Certificado convertido a PEM (`burp_cert.pem`).
- Generados dos archivos con hash: `9a5ba575.0` (subject_hash_old, Android < 7) y `7bf17d07.0` (subject_hash, Android 7+).

**Instalación de certificado CA en AVD Android 14 (trabajo parcial)**
- Arranque del AVD con flag `-writable-system` desde terminal.
- adb root + remount + disable-verity ejecutados exitosamente.
- Push del certificado `9a5ba575.0` a `/system/etc/security/cacerts/` exitoso.
- Permisos 644 aplicados.
- Reboot del AVD ejecutado.
- **Problema detectado:** el certificado no apareció en Trusted credentials → System.
- **Diagnóstico:** Android 14 lee certificados CA desde `/apex/com.android.conscrypt/cacerts/` (introducido como refuerzo de seguridad), no desde `/system/etc/security/cacerts/`. Además, el hash correcto para Android 14 es `subject_hash` (7bf17d07), no `subject_hash_old` (9a5ba575).
- **Solución aplicada:** procedimiento de bind mount para inyectar el certificado con nombre correcto en la ubicación APEX. Carpeta `/data/local/tmp/cacerts/` poblada con todos los CAs originales + nuestro certificado renombrado a `7bf17d07.0`. Contexto SELinux ajustado con chcon.
- `mount --bind /data/local/tmp/cacerts /apex/com.android.conscrypt/cacerts` aplicado exitosamente; el certificado aparece en `/apex/` tras el bind mount.
- **Segundo problema:** el intento de propagar el mount a todos los namespaces de procesos causó inestabilidad en el user space del emulador. Chrome y Settings dejaron de responder tras el comando.
- **Acción tomada:** reboot del AVD mediante cierre forzado.
- **Segundo intento:** bind mount aplicado sin tocar todos los procesos (solo global) y complementado con `setprop ctl.restart zygote` para refrescar la UI. El restart del zygote causó que el emulador quedara congelado en el logo de Google.

### Estado al cierre de la jornada
- Jornada pausada con el AVD Android 14 en estado inestable (Chrome y Settings no responden).
- El bind mount aplicado sigue activo y el archivo `7bf17d07.0` aparece correctamente en `/apex/com.android.conscrypt/cacerts/`.
- La carpeta `/data/local/tmp/cacerts/` persistirá en próximos arranques porque `/data/` es persistente en el AVD.
- Snapshot `baseline_con_burp` aún no creado (pendiente para la próxima jornada).
- AVD Android 11 no modificado (pendiente instalación de certificado, se espera sea más simple al no tener protección APEX).

### Problemas encontrados y resoluciones

1. **SecurityTrails sin tier gratuito:** sustituido por ViewDNS + DNSDumpster + crt.sh.
2. **Any.run exige correo corporativo:** se sustituirá por Hybrid Analysis (pendiente confirmar).
3. **Error "Could not save snapshot" con boot option Cold boot:** resuelto cambiando boot option a Quick boot en ambos AVDs.
4. **Certificado no reconocido tras push a `/system/etc/security/cacerts/` en Android 14:** identificado como cambio de seguridad de Android 14 (ubicación APEX). Parcialmente resuelto con bind mount.
5. **Bind mount propagado a todos los procesos causa inestabilidad:** error de procedimiento. Para la próxima jornada se aplicará bind mount solo global, sin propagación.
6. **Restart del zygote deja emulador inestable:** descartado como paso obligatorio. Plan alternativo: tomar snapshot inmediatamente tras el bind mount, sin restart del zygote, y confiar en que al cargar el snapshot en sesiones nuevas los procesos arranquen frescos y lean los CAs correctos.

### Lecciones aprendidas

- Android 14 introdujo protecciones adicionales para certificados CA (APEX, hash updates). Estas protecciones son relevantes mencionar en la sección de Metodología del artículo, ya que representan barreras técnicas que la investigación tuvo que sortear mediante procedimientos documentados.
- La persistencia del directorio `/data/local/tmp/` en el AVD permite recuperar trabajo tras reboots sin tener que reaplicar copia de certificados.
- El bind mount es un mecanismo frágil: debe aplicarse con mínima intervención en procesos del sistema. La mejor práctica es aplicarlo y seguido tomar snapshot, para congelar ese estado.

### Pendiente para la próxima jornada

- Reintentar bind mount en AVD Android 14 sin tocar procesos adicionales.
- Crear snapshot `baseline_con_burp` en Android 14 inmediatamente tras el bind mount.
- Verificar interceptación HTTPS en Burp desde Chrome del AVD.
- Aplicar procedimiento de certificado en AVD Android 11 (se espera más simple al no tener APEX).
- Crear snapshot `baseline_con_burp` en Android 11.
- Configurar AdGuard DNS en los AVDs (para preparar perfiles con protección).
- Crear snapshots finales con protección.

---



---

## Entrada 2 — 27 de abril de 2026

**Jornada:** Día 3 — Reconocimiento OSINT (sub-fases 1.1, 1.2 y 1.3)
**Hora de inicio:** [completar]
**Hora de fin:** [completar al cerrar jornada]

### Actividades planificadas
- Ejecutar reconocimiento pasivo del dominio futbollibretv.su.
- Documentar hallazgos en sub-fases 1.1 (WHOIS), 1.2 (DNS) y 1.3 (certificados/host).
- Identificar patrones de infraestructura, operador y posibles dominios relacionados.

### Actividades ejecutadas

**Sub-fase 1.1 — WHOIS e historial del dominio**
- Consulta whois desde terminal y vía ViewDNS.info.
- Identificación del registrador ARDIS-SU (ruso).
- Confirmación de privacidad WHOIS activada (titular oculto).
- Histórico de IPs documentado: migración desde OVH (Francia) → Cloudflare → IP directa actual.
- Análisis del TLD .su como elección estratégica de jurisdicción permisiva.
- Documento generado: 03_osint/01_whois.md.

**Sub-fase 1.2 — Resolución DNS y registros**
- Consultas dig para registros A, AAAA, MX, NS, TXT.
- Análisis con DNSDumpster.
- Hallazgo: IP actual 185.254.197.23 alojada en YURTEH-AS (Ucrania).
- Hallazgo: certificado del servidor apunta a dominio distinto (doeemain.org).
- Servidores NS distribuidos en 3 jurisdicciones (Francia, Países Bajos, EE.UU.) bajo proveedores OVH y LeaseWeb.
- Sin servidores MX (sin correo).
- Registro TXT de Google Site Verification (operador busca tráfico orgánico).
- Documento generado: 03_osint/02_dns.md.

**Sub-fase 1.3 — Certificados TLS e infraestructura**
- Análisis profundo del host 185.254.197.23 en Censys.
- Identificación del proveedor: Virtual Systems LLC (Kyiv, Ucrania).
- Detección de 24 servicios expuestos en el host (cPanel, WHM, SSH, MySQL, IMAP, SMTP, webmail, Nginx).
- Detección de servidor multi-tenant: 3 instancias WordPress, 5 de cPanel, 4 de Dovecot.
- 0 CVEs activas en momento del escaneo.
- HALLAZGO PRINCIPAL: identificación del dominio paralelo www.futbol-libre.su apuntando a la misma IP.
- Verificación independiente con dig: ambos dominios resuelven a 185.254.197.23 con TTL idénticos.
- HALLAZGO SECUNDARIO: el dominio paralelo expone correo personal de Gmail en WHOIS, mientras que el principal usa servicio de privacidad. Asimetría operativa documentada.
- Documento generado: 03_osint/03_certificados.md.
- Limitación documentada: crt.sh estuvo intermitentemente caído (error 502), análisis se completó priorizando Censys.

### Hallazgos clave consolidados hasta ahora
1. Dominio futbollibretv.su registrado en diciembre 2022, operador anónimo.
2. Infraestructura distribuida diseñada para resiliencia: NS en 3 países, registrador ruso, hosting actual en Ucrania.
3. Migración reciente de Cloudflare (2026) a hosting directo en Virtual Systems LLC.
4. Servidor multi-tenant con 24 servicios expuestos.
5. Existe al menos un dominio paralelo (futbol-libre.su) con misma infraestructura.
6. Inconsistencia operativa del operador en privacidad WHOIS del dominio paralelo.
7. Patrón consistente con sitios diseñados para evasión legal y resistencia a takedowns.

### Observaciones y decisiones del día
- **Decisión metodológica:** ante el fallo de crt.sh, se priorizó Censys como herramienta principal de análisis de certificados y host. Esta sustitución se documenta como limitación parcial pero se compensa con la riqueza de información de Censys.
- **Línea de investigación abierta:** el dominio paralelo futbol-libre.su y el dominio del certificado TLS doeemain.org se profundizarán en la sub-fase 1.7.
- **Nota ética:** el correo personal expuesto en el WHOIS del dominio paralelo se documenta como evidencia técnica de registros públicos, pero se anonimizará en la versión final del artículo siguiendo el principio de minimización de daños.

### Pendiente para la próxima jornada
- Sub-fase 1.4: análisis de infraestructura ampliado con Shodan.
- Sub-fase 1.5: análisis de reputación (VirusTotal, URLhaus, Google Safe Browsing).
- Sub-fase 1.6: historial visual del sitio en Wayback Machine.
- Sub-fase 1.7: investigación de dominios relacionados (futbol-libre.su, doeemain.org, configma.website).
- Reintentar crt.sh para complementar análisis de certificados.

---

---

## Entrada 3 — 4 de mayo de 2026

**Jornada:** Día 4 — Reconocimiento OSINT (sub-fase 1.5: análisis de reputación)
**Hora de inicio:** [completar]
**Hora de fin:** [completar al cerrar jornada]

### Actividades planificadas
- Ejecutar análisis de reputación del dominio futbollibretv.su, dominio paralelo y la IP del servidor.
- Realizar todas las consultas desde terminal con APIs (VirusTotal, URLhaus, AbuseIPDB).
- Generar evidencias en formato JSON y resúmenes TXT.
- Documentar hallazgos en sub-fase 1.5.

### Actividades ejecutadas

**Configuración técnica:**
- Obtención y configuración de API keys: VirusTotal y AbuseIPDB.
- Instalación de jq para procesamiento de JSON.
- Creación de carpeta `03_osint/evidencias/reputacion/`.

**Consultas VirusTotal API:**
- Análisis del dominio futbollibretv.su (1/91 detecciones, motor Chong Lua Dao).
- Análisis del dominio futbol-libre.su (3/91 detecciones, motores alphaMountain.ai, Forcepoint ThreatSeeker, Gridinsoft).
- Análisis de la IP 185.254.197.23 (1/91 detecciones).
- Consulta de resoluciones DNS pasivas de la IP principal.
- Análisis de IPs alternativas (194.42.205.18 y 91.218.49.91).

**Consultas URLhaus API:**
- Búsqueda de futbollibretv.su, futbol-libre.su y la IP. Sin reportes en ninguno.

**Consultas WHOIS y dig adicionales:**
- WHOIS de pelotalibretv.su.
- WHOIS de doeemain.org y yourewatching.org (limitados por GDPR).
- dig de las IPs alternativas para confirmar resolución actual.

### Hallazgos clave de la jornada

1. **HALLAZGO MAYOR — Ecosistema de 10 dominios identificado:** mediante resoluciones DNS pasivas en VirusTotal se descubrieron 10 dominios distintos que han apuntado a la IP 185.254.197.23 en los últimos 7 meses, agrupados en familias por idioma/región (hispano, rioplatense, anglófono, matriz multi-idioma).

2. **HALLAZGO MAYOR — Vinculación cruzada del operador:** el correo joezm5a@proton.me aparece en el SOA de futbollibretv.su y en el WHOIS público de pelotalibretv.su, configurando evidencia técnica directa de operador único.

3. **HALLAZGO MAYOR — Infraestructura unificada en Virtual Systems LLC:** las tres IPs analizadas (185.254.197.23, 194.42.205.18, 91.218.49.91) pertenecen al mismo proveedor de hosting ucraniano, aunque distribuidas en dos ASNs distintos.

4. **Asimetría de detección entre dominios hermanos:** futbol-libre.su tiene 3 veces más detecciones que futbollibretv.su, lo que sugiere efecto "luna de miel" del dominio principal.

5. **Confirmado: el sitio NO distribuye malware directamente:** URLhaus sin reportes confirma que el riesgo viene por malvertising, no por payloads directos.

### Decisiones metodológicas

- **Aproximación 100% terminal:** se ejecutó toda la sub-fase desde línea de comandos con APIs, generando evidencias en JSON y TXT versionables en Git. Esta decisión refuerza la reproducibilidad del estudio.
- **Documentación del operador:** se decidió incluir en evidencias técnicas los correos hallados en WHOIS (públicos por naturaleza), pero se anonimizarán en el artículo final por el principio de minimización de daños.

### Limitaciones documentadas

1. **AbuseIPDB no consultado:** problema con la variable de entorno de la API key. Pendiente para próxima jornada.
2. **WHOIS limitados de los .org:** restricciones de GDPR aplicadas por Public Interest Registry impiden ver datos completos de doeemain.org y yourewatching.org.

### Pendiente para la próxima jornada

- Completar consulta AbuseIPDB de la IP principal.
- Sub-fase 1.6: análisis del historial visual del sitio en Wayback Machine.
- Sub-fase 1.7: profundización del análisis del ecosistema de dominios relacionados.
- Reintentar crt.sh para cerrar el análisis de certificados TLS de la sub-fase 1.3.

---

---

## Entrada 4 — 10 de mayo de 2026

**Jornada:** Día 5 — Reconocimiento activo HTTP + sub-fases 1.4, 1.6 y 1.7
**Hora de inicio:** [completar]
**Hora de fin:** [completar al cerrar jornada]

### Actividades planificadas
- Completar sub-fase 1.4 (infraestructura ampliada).
- Ejecutar reconocimiento activo desde consola: headers HTTP, TLS, redirecciones, port scan.
- Sub-fase 1.6: Wayback Machine.
- Sub-fase 1.7: profundización del ecosistema de dominios relacionados.
- Intentar completar AbuseIPDB (pendiente de jornada anterior).

### Actividades ejecutadas

**Reconocimiento activo — consola (curl, dig, nc, openssl)**

- Consulta de headers HTTP completos con User-Agent de Android 14 (Pixel 6).
- Análisis de cadena de redirección: futbollibretv.su → futbol-libre.su.
- Análisis del certificado TLS con openssl.
- Port scan básico de la IP 185.254.197.23 con netcat.
- Descarga y análisis del código fuente HTML de index y página /espn-1/.
- Consulta de robots.txt y sitemap.xml.
- Análisis de headers de seguridad (9 headers evaluados).
- Reverse IP lookup de 128.0.104.23 vía HackerTarget.
- DNS de todo el ecosistema comparado con jornada previa.

**Sub-fase 1.4 — Infraestructura**
- Identificación del stack completo: nginx + Engintron + cPanel/WHM + Apache.
- Verificación de 20 puertos abiertos en 185.254.197.23.
- Identificación del CDN BunnyCDN (fltsu.b-cdn.net, Miami) para assets.
- Documento generado: `03_osint/04_infraestructura.md`.

**Sub-fase 1.6 — Historial Wayback Machine**
- Consulta CDX API: futbollibretv.su con primeras capturas desde 16 marzo 2026.
- futbol-libre.su sin capturas disponibles en CDX.
- Documento generado: `03_osint/06_historial.md`.

**Sub-fase 1.7 — Dominios relacionados**
- Verificación DNS actual de los 12 dominios del ecosistema.
- Detección de cambios: pelotalibretv.su migró de IP, doeemain.org caído (HTTP 500), yourewatching.org con IP iraní nueva.
- Documento generado: `03_osint/07_dominios_relacionados.md`.

**Reconocimiento activo — documento principal**
- Documento generado: `04_reconocimiento_activo/reconocimiento_activo.md`.
- Evidencias guardadas en `04_reconocimiento_activo/evidencias/`.

### Hallazgos clave de la jornada

1. **HALLAZGO CRÍTICO — Redirección 301:** futbollibretv.su ahora redirige permanentemente a futbol-libre.su. El dominio canónico de operación ha cambiado. El dominio de entrada (menor detección: 1/91) actúa como decoy, mientras el usuario termina en el dominio con más detecciones (3/91, bloqueado por Forcepoint).

2. **HALLAZGO CRÍTICO — Adsterra / aclib.js ofuscado:** el script `acscdn.com/script/aclib.js` (166 KB) está **completamente ofuscado** con patrón `_0x...` (hex-string obfuscation). Es la red de publicidad Adsterra configurando popunders en todas las páginas del sitio. El ZoneId 10652966 identifica al publisher. La ofuscación dificulta el análisis estático del comportamiento real del script.

3. **HALLAZGO CRÍTICO — latamvidz1.com:** servidor PHP de streams (`/canal.php?stream=<canal>`) en la misma IP (128.0.104.23) que futbollibretv.su. Registrado el 28 enero 2026 por SOLLUTIUM LLC (relacionado con Virtual Systems). Parte directa de la infraestructura del operador, no un tercero.

4. **HALLAZGO MAYOR — 3 IPs en futbollibretv.su:** el dominio de entrada ahora resuelve a tres IPs de Virtual Systems LLC (128.0.104.23, 138.226.244.112, 185.254.197.23), aumentando la resiliencia ante bloqueos por IP.

5. **HALLAZGO MAYOR — librepelota.su:** nuevo dominio descubierto vía reverse IP lookup. Registrado en ARDIS-SU, con Cloudflare NS, sin resolución A activa. Nombre combina marcas de ambos sitios — dominio en preparación para futura expansión.

6. **HALLAZGO MAYOR — Google Analytics G-L0N11PVD63:** ID único de GA4 presente en todas las páginas. Puede usarse para cruzar con SpyOnWeb/BuiltWith para identificar otros sitios del operador.

7. **HALLAZGO MAYOR — Ausencia de headers de seguridad:** solo 2 de 9 headers de seguridad recomendados están presentes. Sin CSP, sin HSTS, sin X-Frame-Options. Contexto ideal para que el malvertising opera sin restricciones.

8. **HALLAZGO SECUNDARIO — CMS:** el sitio no usa WordPress. Es HTML estático personalizado con nginx cache + PHP solo en el servidor de streams. No hay panel de administración web-visible.

9. **yourewatching.org con IP iraní (213.176.3.63):** hallazgo anómalo. La IP pertenece a la Iranian Research Organization for Science & Technology. Puede ser migración, error de configuración o uso de hosting iraní fuera de jurisdicción DMCA.

10. **doeemain.org caído (HTTP 500):** la plataforma matriz está inaccesible al momento del análisis.

### Decisiones metodológicas

- **AbuseIPDB pendiente nuevamente:** la API key no está disponible en el entorno. Se documenta como limitación técnica recurrente. Para la próxima jornada, el investigador debe configurar la variable de entorno `ABUSEIPDB_API_KEY` antes de iniciar.
- **Port scan limitado a nc:** no se usó nmap para no generar tráfico agresivo. El port scan con nc es suficiente para documentar servicios expuestos en puertos estándar.
- **aclib.js no se deofuscó:** la deofuscación del script de Adsterra requiere un sandbox dinámico (browser con DevTools). Esta tarea se realizará en las sesiones experimentales con el emulador y Burp Suite.

### Evidencias generadas

- `04_reconocimiento_activo/evidencias/headers/headers_futbol-libre_su.txt`
- `04_reconocimiento_activo/evidencias/headers/headers_verbose_futbol-libre.txt`
- `04_reconocimiento_activo/evidencias/dns/dns_ecosistema_10may2026.txt`
- `04_reconocimiento_activo/evidencias/puertos/portscan_185254197023.txt`
- `04_reconocimiento_activo/evidencias/source_futbol-libre_index.html`
- `04_reconocimiento_activo/evidencias/source_futbol-libre_espn1.html`

### Pendiente para la próxima jornada

- Configurar variable de entorno `ABUSEIPDB_API_KEY` y completar consulta.
- Cruzar GA4 ID `G-L0N11PVD63` con SpyOnWeb/BuiltWith para identificar otros sitios del operador.
- Reintentar crt.sh para completar análisis de certificados (sub-fase 1.3).
- Profundizar análisis de aclib.js en sesión experimental con el emulador (deofuscación dinámica).
- Iniciar sesiones experimentales en los AVDs (primera sesión: A14-N-R1 o A14-D-R1).
- Verificar estado de yourewatching.org y la IP iraní en días posteriores.

---

---

## Entrada 5 — 11 de mayo de 2026

**Jornada:** Día 6 — crt.sh, aclib.js, latamvidz1.com, envivoslatam.org, mapeo OWASP
**Hora de inicio:** [completar]
**Hora de fin:** [completar al cerrar jornada]

### Actividades planificadas
- Sub-fase 1.3 completar: crt.sh para el ecosistema completo.
- Cruce del GA4 ID G-L0N11PVD63 con SpyOnWeb/BuiltWith.
- AbuseIPDB (3er intento).
- Análisis estático de aclib.js.
- Análisis profundo de latamvidz1.com.
- Primer borrador de mapeo OWASP.

### Actividades ejecutadas

**crt.sh — sub-fase 1.3 completada**
- crt.sh operativo (endpoint sin `&output=json` funciona, con output=json da 502).
- Identificados 6 subdomains únicos: `*.futbollibretv.su`, `futbollibretv.su`, `www.futbollibretv.su`, `cdn.futbollibretv.su`, `cdn1.futbollibretv.su`, `cdn2.futbollibretv.su`.
- Cronología de certificados desde 10 marzo 2026 hasta presente — 7 emisiones distintas.
- cdn1.futbollibretv.su activo (128.0.104.23), redirige a futbol-libre.su.
- latamvidz1.com confirmado en crt.sh: `latamvidz1.com` y `www.latamvidz1.com`.

**GA4 cruce — parcialmente completado**
- SpyOnWeb y BuiltWith API free no retornaron datos (requieren key de pago o bloquean crawlers).
- El ID `G-L0N11PVD63` queda documentado como vector pendiente para herramientas con acceso pago.

**AbuseIPDB — no completado (3er intento)**
- API requiere key. Sin key disponible en el entorno. Se documenta como limitación recurrente.

**Análisis estático aclib.js**
- 7,995 tokens ofuscados `_0x*`.
- 2 llamadas a `atob()` (Base64 decodificación en runtime).
- Sin `eval()` (ofuscación sin eval).
- Decodificación de strings Base64 internos revela técnicas: `ROTATION`, `-event`, `<!DOCTYPE `, `ACTION CALLED`, `IFRAME`, `Movement`, `?cz=`.
- Comportamiento inferido: inyecta documentos HTML completos (popunder), crea iframes dinámicos, rota anuncios, detecta movimiento de mouse (anti-bot), trackea eventos de usuario.
- Evidencia: `04_reconocimiento_activo/evidencias/aclib/aclib_analisis.txt`.

**Análisis latamvidz1.com — hallazgos mayores**
- El endpoint requiere header `Referer: https://futbol-libre.su/espn-1/` para responder con HTTP 200.
- Sin Referer: HTTP 410 Gone. Con Referer correcto: HTTP 200, PHPSESSID, HTML completo del player.
- HTML fuente del player revela arquitectura de streaming completa:
  - Player: Clappr Player 0.8 (HTML5)
  - P2P CDN: SwarmCloud con token `AUgDeTQSR`, trackerZone: us
  - URL HLS real: `https://vg7ie.envivoslatam.org:443/global/espn/index.m3u8`
  - Token de stream: `d087c65d...-f6-1778518249-1778464249` (15 horas de validez, IP-bound)
  - Adsterra presente también en el player (doble exposición publicitaria)

**HALLAZGO CRÍTICO — envivoslatam.org (nuevo dominio clave)**
- Dominio registrado: 7 enero 2026 (Dynadot, Super Privacy Service LTD).
- IP: 195.178.110.11 (TECHOFF SRV LIMITED, GB/Andorra) — 4º proveedor de infraestructura.
- Puertos abiertos: 80, 443, **1935 (RTMP)** — confirma servidor de streaming real.
- Server header: `Streamer 24.03` — software de streaming propietario/personalizado.
- Único subdominio en reverse IP: `vg7ie.envivoslatam.org`.

**IP 181.115.172.46 en el token = IP boliviana del investigador**
- El token HLS incluye la IP del cliente que lo solicitó (la máquina del investigador en Bolivia).
- Confirma que el mecanismo de tokenización es IP-aware: cada token se genera bound a la IP del solicitante.

**Mapeo OWASP completado**
- Documento generado: `07_owasp/owasp_mapeo.md`.
- 4 categorías CRÍTICAS identificadas: A3 (XSS/CSP), A4 (cadena de terceros), A8 (SRI ausente), M1 (Adsterra doble exposición).
- 3 categorías ALTAS: A5 (headers), M2 (P2P involuntario), A2 (cookie sin flags).

### Hallazgos clave de la jornada

1. **HALLAZGO CRÍTICO — envivoslatam.org:** el servidor HLS real del ecosistema. Registrado en enero 2026, alojado en TECHOFF SRV LIMITED (GB/Andorra), con RTMP en puerto 1935. Software: `Streamer 24.03`. Es el servidor de video más profundo de la cadena y el que nunca habría sido descubierto sin inspeccionar el código fuente del iframe.

2. **HALLAZGO CRÍTICO — Arquitectura de streaming completa descubierta:**
   - Usuario → futbol-libre.su (sitio) → latamvidz1.com (PHP proxy) → envivoslatam.org (HLS Streamer) + SwarmCloud P2P
   - Cada capa añade un proveedor diferente: Virtual Systems → TECHOFF → SwarmCloud

3. **HALLAZGO MAYOR — crt.sh:** 3 subdominios CDN propios en futbollibretv.su (`cdn`, `cdn1`, `cdn2`) y certificado wildcard `*.futbollibretv.su` — indica infraestructura mayor de la documentada.

4. **HALLAZGO MAYOR — Doble exposición Adsterra:** el script de Adsterra se carga tanto en la página principal como dentro del iframe de stream. El usuario recibe dos instancias del script ofuscado en una misma visita a un canal.

5. **HALLAZGO MAYOR — aclib.js deofuscado parcialmente:** la decodificación Base64 de tokens internos revela inyección de DOCTYPE completo (popunder window), manipulación de iframes y tracking de mouse. Confirma el vector de malvertising como riesgo activo.

6. **SwarmCloud P2P — implicación de privacidad:** el navegador del usuario se convierte en nodo P2P que sirve fragmentos del stream a otros usuarios, consumiendo sus datos y exponiendo su IP real.

### Decisiones metodológicas

- **AbuseIPDB marcado como no disponible sin key:** se mantiene como limitación documentada. No bloquea el avance del estudio.
- **GA4 cruce sin resultados:** herramientas públicas no funcionan sin API key de pago. Se recomienda intentar manualmente con SpyOnWeb.com en browser.
- **crt.sh alternativa:** usar sin `&output=json` + parse HTML para obtener datos cuando el endpoint JSON da 502.

### Evidencias generadas

- `04_reconocimiento_activo/evidencias/crtsh/crtsh_futbollibretv_subdomains.txt`
- `04_reconocimiento_activo/evidencias/crtsh/crtsh_futbollibretv_raw.html`
- `04_reconocimiento_activo/evidencias/aclib/aclib_analisis.txt`
- `04_reconocimiento_activo/evidencias/streams/latamvidz1_espn_stream.html`
- `07_owasp/owasp_mapeo.md`

### Arquitectura completa del ecosistema (actualizada)

```
USUARIO (Android)
    ↓ accede a
futbollibretv.su (Virtual Systems, 3 IPs)
    ↓ HTTP 301
futbol-libre.su (Virtual Systems, 185.254.197.23)
    ├── [publicidad] acscdn.com → Adsterra popunder (aclib.js ofuscado, 166 KB)
    ├── [assets]    cdn.futbol-libre.su → BunnyCDN Miami
    └── [stream]    latamvidz1.com/canal.php (Virtual Systems, 128.0.104.23)
            ├── [publicidad] acscdn.com → Adsterra SEGUNDA VEZ
            ├── [player]    jsdelivr.net → Clappr + SwarmCloud
            ├── [video]     vg7ie.envivoslatam.org (TECHOFF SRV, 195.178.110.11)
            │               → HLS m3u8 con token IP-bound, 15h de validez
            │               → Puerto 1935 RTMP abierto
            │               → Software: Streamer 24.03
            └── [P2P]       SwarmCloud (usuario = nodo P2P, IP expuesta, datos consumidos)
```

### Pendiente para la próxima jornada

- Iniciar sesiones experimentales en los AVDs (primera sesión: A14-N-R1).
- AbuseIPDB: intentar manualmente con key disponible, o documentar como limitación definitiva.
- SpyOnWeb.com: intentar cruce de GA4 desde browser.
- Investigar envivoslatam.org en profundidad (otros subdominios, software Streamer).
- Verificar cdn.futbollibretv.su y cdn2 (sin resolución activa — dominios de reserva?).
- Primer borrador de sección de metodología para el artículo.

---

## Entrada 6 — 13 de mayo de 2026

**Jornada:** Día 7 — Análisis de infraestructura profunda, Shodan CVEs, WordPress y nuevos dominios  
**Hora de inicio:** 18:00 (aprox.)  
**Hora de fin:** 23:55

### Objetivo de la jornada

Profundizar en la infraestructura del ecosistema usando Shodan InternetDB para todas las IPs identificadas, analizar el sitio hermano pelotalibretv.su con foco en su pila WordPress, cruzar el ZoneId de Adsterra como evidencia de autoría común, e identificar nuevos dominios del ecosistema.

### Actividades ejecutadas

1. **Shodan InternetDB — análisis de 5 IPs del ecosistema:**
   - 185.254.197.23 (futbol-libre.su): **17 CVEs detectados**. Incluye CVE-2024-6387 (regreSSHion — OpenSSH 8.7, RCE sin autenticación, CVSS 8.1) y CVE-2023-38408 (CVSS 9.8). Puertos 22, 53, 465, 2083, 3306, 9191. MySQL en 3306 expuesto.
   - 128.0.104.23 (latamvidz1.com): 0 CVEs, MySQL 3306 expuesto. Hostname Shodan: `server.vivozly.com` — nuevo dominio del ecosistema.
   - 138.226.244.112 (pelotalibretv.su): 0 CVEs. WordPress 6.9.4 confirmado. PTR: `dedicated.sollutium.com`.
   - 195.178.110.11 (envivoslatam.org): 0 CVEs. Ubuntu + OpenSSH 8.9p1. Sin hostnames.
   - 91.218.49.105 (la14hd.com): 0 CVEs. PTR: `dedicated.vsys.host` (Virtual Systems LLC).

2. **PTR records — DNS inverso de todas las IPs:**
   - 185.254.197.23 → `a1.configma.website.` — nombre de servidor del panel cPanel
   - 128.0.104.23 → (sin PTR)
   - 138.226.244.112 → `dedicated.sollutium.com.` — confirma proveedor SOLLUTIUM

3. **pelotalibretv.su — análisis completo:**
   - WordPress 6.9.4, tema Jannah (premium)
   - CDN: cdn.pelotalibretv.su → BunnyCDN (pull zone: plbt)
   - GA4: G-65329600J2 (diferente a futbol-libre.su)
   - Adsterra ZoneId: **10652966 — IDÉNTICO a futbol-libre.su** → evidencia directa de autoría común
   - API REST WordPress expuesta: `/wp-json/wp/v2/users` → ID 1, slug: **"futbollibre"**
   - 3 servidores de stream: latamvidz1.com (primario), la14hd.com (backup), streamtpcloud.com (inactivo)

4. **Nuevos dominios descubiertos:**
   - `la14hd.com` (91.218.49.105, Virtual Systems LLC) — tercer servidor de streams
   - `streamtpcloud.com` — dominio de stream sin DNS activo
   - `server.vivozly.com` — nombre técnico del servidor de latamvidz1.com
   - `server.envivolibre.com` — hostname Shodan de 185.254.197.23 → apunta a envivolibre.com como posible dominio adicional del ecosistema

5. **Análisis de sollutium.com:**
   - PHP/7.4.32 (EOL desde 2022), panel WHMCS, protegido por Cloudflare
   - Confirma rol de revendedor de Virtual Systems LLC
   - Tiene mejores headers de seguridad que los sitios del operador (Referrer-Policy, X-Frame-Options)

### Hallazgos críticos de la jornada

1. **CVE-2024-6387 (regreSSHion) en el servidor principal:** el servidor 185.254.197.23 que sirve futbol-libre.su a millones de usuarios tiene una vulnerabilidad crítica de RCE sin autenticación en OpenSSH 8.7. Un atacante que explote esta vulnerabilidad puede tomar control completo del servidor e inyectar código malicioso en el HTML servido a todos los usuarios.

2. **ZoneId Adsterra '10652966' idéntico:** prueba técnica directa de que futbol-libre.su y pelotalibretv.su pertenecen al mismo operador. El ZoneId es el identificador único de la cuenta en la red Adsterra.

3. **Slug WordPress "futbollibre":** el administrador de pelotalibretv.su usa el slug "futbollibre", que vincula directamente con la marca "futbol libre" y el dominio futbol-libre.su. La API REST de WordPress lo expone sin autenticación.

4. **Ecosistema ampliado:** el ecosistema total ahora comprende al menos **16 dominios** (12 documentados en jornada anterior + la14hd.com, streamtpcloud.com, envivolibre.com, vivozly.com como nuevos candidatos).

5. **MySQL en Internet:** dos IPs del ecosistema tienen MySQL/MariaDB (puerto 3306) accesible directamente desde Internet, lo cual es una mala práctica de seguridad grave que expone las bases de datos a ataques de fuerza bruta directos.

### Decisiones metodológicas

- **AbuseIPDB marcado definitivamente como limitación:** sin API key disponible. No afecta el avance del estudio dado el nivel de evidencia obtenido por otras vías.
- **Shodan InternetDB como herramienta de verificación clave:** permite confirmar CVEs, puertos y hostnames sin acceso privilegiado.
- **pelotalibretv.su = objeto de análisis secundario:** los hallazgos de este sitio refuerzan los de futbol-libre.su y amplían la caracterización del operador.

### Evidencias generadas

- `04_reconocimiento_activo/evidencias/shodan/shodan_analisis_13may2026.txt`
- `03_osint/08_infraestructura_profunda.md`
- `03_osint/09_pelotalibretv_analisis.md`

### Arquitectura del ecosistema (versión definitiva Jornada 7)

```
OPERADOR (hassan.azmw@gmail.com / joezm5a@proton.me)
│
├── futbol-libre.su [mercado hispano general]
│   └── CMS: HTML estático | IP: 185.254.197.23 | PTR: a1.configma.website
│       ├── [publicidad] Adsterra ZoneId 10652966 (aclib.js)
│       ├── [assets]     BunnyCDN (fltsu)
│       └── [streams]    latamvidz1.com → envivoslatam.org (HLS) + SwarmCloud P2P
│
├── pelotalibretv.su [mercado rioplatense]
│   └── CMS: WordPress 6.9.4 | IP: 138.226.244.112 | PTR: dedicated.sollutium.com
│       ├── [publicidad] Adsterra ZoneId 10652966 (IDÉNTICO)
│       ├── [assets]     BunnyCDN (plbt)
│       └── [streams]    latamvidz1.com (primario)
│                        la14hd.com (backup, IP 91.218.49.105)
│                        streamtpcloud.com (backup inactivo)
│
└── INFRAESTRUCTURA
    ├── Virtual Systems LLC (Kyiv, UA) — proveedor principal
    ├── SOLLUTIUM LLC — revendedor dedicado para pelotalibretv
    └── TECHOFF SRV LIMITED — servidor HLS (envivoslatam.org)
```

### Pendiente para la próxima jornada

- SpyOnWeb.com: cruzar GA4 IDs (G-L0N11PVD63 y G-65329600J2) desde browser.
- Verificar envivolibre.com y vivozly.com como posibles dominios de cara al usuario.
- Iniciar sesiones experimentales en AVDs (A14-N-R1).
- Primer borrador sección de metodología para el artículo.
- Análisis de xmlrpc.php en pelotalibretv.su.

---

## Entrada 7 — 14 de mayo de 2026

**Jornada:** Día 8 — Ecosistema ampliado, TECHOFF SRV LIMITED y hosting bulletproof  
**Hora de inicio:** 00:00 (aprox.)  
**Hora de fin:** 02:30

### Objetivo de la jornada

Aprovechar el acceso a Internet con herramientas de búsqueda web para investigar el ecosistema ampliado: nuevos dominios descubiertos, caracterización de TECHOFF SRV LIMITED como proveedor HLS, análisis de la familia la*hd.com, y recopilación de artículos de seguridad relevantes para el paper.

### Actividades ejecutadas

1. **Investigación de nuevos dominios con WebSearch y WebFetch:**
   - SpyOnWeb (sin acceso por permisos) — GA4 IDs no encontrados en resultados públicos de búsqueda
   - librefutbol.su: registrado ARDIS-SU (mismo operador), redirige a futbol-libre.su, IP 128.0.104.23, Tranco top 500
   - envivolibre.com: IP 128.0.104.23, muestra cPanel default page (dominio parqueado), Dynadot registrar
   - vivozly.com: Cloudflare, NameCheap, 8 meses de edad

2. **Familia la*hd.com — mapeo completo:**
   - la10hd.com → AWS/CloudFront, Afternic NS (posiblemente a la venta)
   - la12hd.com → 91.218.49.105, HTTP 301 → la14hd.com (alias)
   - la14hd.com → activo, HLS server: fubohd.com, Adsterra ZoneId 11225378 (DISTINTO)
   - la16hd.com → Cloudflare, Tucows, registrado marzo 2026 (muy reciente)

3. **fubohd.com — servidor HLS de la14hd.com:**
   - IP 93.123.109.145
   - Proveedor: **TECHOFF SRV LIMITED** (mismo que envivoslatam.org)
   - Software: **Streamer 24.03** (idéntico a envivoslatam.org)
   - Panel /admin/ expuesto (con autenticación)

4. **TECHOFF SRV LIMITED (AS48090) — identificado como BULLETPROOF HOSTING:**
   - 768 IPs en 3 bloques /24 (45.148.10.x, 93.123.109.x, 195.178.110.x)
   - Servicio público: dmzhost.co — **política explícita de ignorar DMCA**
   - Tags del AS: BitTorrent, Tor, VPN
   - IP 195.178.110.160 (mismo /24 que envivoslatam.org): **117,660 reportes en AbuseIPDB**
   - Upstream único: AS57717 FiberXpress BV (Amsterdam)
   - Estructura corporativa ficticia: virtual office UK, sin storefront real
   - Dominios identificados en TECHOFF: envivoslatam.org, fubohd.com, streamingtv339.com, kora-plus.dad, uwucdn.sbs

5. **streamingtv339.com** — otro servicio de streaming en TECHOFF:
   - IP 93.123.109.10, Tucows registrar, **Njalla nameservers** (máxima privacidad)
   - Registrado marzo 2026

6. **Artículos de seguridad relevantes para el paper:**
   - ciberprisma.org: RAT + fake browser updates + silent executable activation → robo bancario
   - cronista.com: "cuenta bancaria saqueada en segundos" vía sitios fútbol libre

7. **URLScan de librefutbol.su revela dominios de tracking:**
   - gounodogaptofok.net/tag.min.js (URL Solutions, Cloudflare, oct 2024) — random domain
   - doanaudabu.net (HTTP 204, OpenResty, Dynadot, mar 2026) — servidor de tracking píxel
   - my.rtmark.net (AWS) — red de afiliados/marketing

### Hallazgos críticos de la jornada

1. **TECHOFF SRV LIMITED = Bulletproof hosting** (dmzhost.co): el proveedor de los servidores HLS del ecosistema tiene política explícita de no atender DMCA. Esto hace el streaming prácticamente indestructible por vía de takedowns de copyright. SOLO una acción sobre el upstream AS57717 (FiberXpress BV) podría cortar la conectividad.

2. **Streamer 24.03 en dos servidores distintos** (envivoslatam.org y fubohd.com): el software HLS es el mismo en dos infraestructuras diferentes, sugiriendo distribución del software por el mismo proveedor o comunidad de operadores.

3. **librefutbol.su = tercera puerta de entrada** al sitio principal: además de futbollibretv.su, el operador tiene librefutbol.su como redireccionamiento alternativo. Todos registrados con ARDIS-SU.

4. **Panel /admin/ de Streamer 24.03 expuesto**: el servidor HLS tiene un panel de administración accesible (con auth) en la URL pública. Si comprometido, permite inyectar contenido en el stream HLS de millones de usuarios.

5. **la14hd.com es un operador diferente** pero vinculado: diferente ZoneId Adsterra (11225378), pero usa la misma infraestructura TECHOFF y el mismo software SwarmCloud, sugiriendo un ecosistema más amplio de operadores interdependientes en la misma infraestructura.

### Decisiones metodológicas

- **SpyOnWeb sin acceso directo:** Los IDs de GA4 no aparecen indexados en búsqueda web pública. Se requiere acceso browser a spyonweb.com directamente. Se mantiene como pendiente.
- **TECHOFF documentado como proveedor crítico:** Añadido a la arquitectura del paper como hallazgo central sobre por qué el ecosistema es resistente a takedowns.

### Evidencias generadas

- `03_osint/10_ecosistema_ampliado_j8.md`
- `03_osint/11_techoff_bulletproof.md`

### Arquitectura final del ecosistema (post-Jornada 8)

```
Usuario (Android Bolivia)
    ↓ accede a cualquier dominio de entrada
librefutbol.su ──┐
futbollibretv.su ─┼──→ HTTP 301 → futbol-libre.su (185.254.197.23, Virtual Systems)
                  │       ├── Adsterra popunder (ZoneId 10652966)
                  │       ├── BunnyCDN assets (fltsu)
                  │       └── iframe → latamvidz1.com/canal.php?stream=X
                  │               ├── Adsterra 2da carga
                  │               ├── SwarmCloud P2P
                  │               └── HLS → envivoslatam.org (TECHOFF, Streamer 24.03)
                  │                         │
                  │                   [Bulletproof hosting]
                  │                   DMCA ignorado
                  │                   768 IPs, 3 bloques /24
                  │                   BitTorrent/Tor/VPN tags
                  │
pelotalibretv.su ─── WordPress (SOLLUTIUM, 138.226.244.112)
                       ├── Adsterra (ZoneId 10652966 — IDÉNTICO)
                       ├── latamvidz1.com (primario)
                       ├── la14hd.com → fubohd.com (TECHOFF, Streamer 24.03)
                       └── streamtpcloud.com (inactivo)
```

### Pendiente para la próxima jornada

- Iniciar sesiones experimentales en AVDs (A14-N-R1, A14-D-R1).
- SpyOnWeb.com: acceso browser directo para cruzar GA4 IDs.
- Investigar el bloque 45.148.10.0/24 de TECHOFF (tercer bloque sin dominios identificados).
- Verificar panel /admin/ de Streamer 24.03 (¿requiere credenciales? ¿expone versión?).
- Análisis xmlrpc.php en pelotalibretv.su.
- Borrador secciones 4 y 5 del artículo (resultados y discusión).

---

## Entrada 8 — 14 de mayo de 2026

**Jornada:** Día 10 — Sesiones experimentales A14-D-R1, A11-N-R1, A11-D-R1 + análisis comparativo  
**Hora de inicio:** 20:45 UTC  
**Hora de fin:** 21:25 UTC

### Resumen ejecutivo de la jornada

Se completaron las tres sesiones experimentales restantes del diseño factorial 2×2, produciendo el conjunto completo de datos para el análisis comparativo. El hallazgo más importante de la jornada es que **AdGuard DNS no bloquea ninguno de los dominios de riesgo** del ecosistema futbol-libre.su, y que el popunder RTB muestra un **destino dinámico** que varía por sesión (1xbet.com en A14-D y A11-N; doradobet.com en A11-D).

### Sesiones ejecutadas

#### Sesión A14-D-R1 — Android 14 + AdGuard DNS

- **Problema inicial:** Chrome mostraba pantalla de primer uso ("Welcome to Chrome"). Solución: comando `--disable-fre` en `/data/local/tmp/chrome-command-line`.
- **Flujos capturados:** 642 flujos, 32 dominios únicos, 14 MB
- **Resultado:** AdGuard DNS no bloqueó ningún dominio de riesgo. usrpubtrk.com recibió 11 POST (más que A14-N), Adsterra cargó 4 scripts, adexchangerapid.com ejecutó 9 subastas RTB.
- **Popunder:** bol.1xbet.com — 391 requests adicionales incluyendo Yandex Metrica (mc.yandex.ru) y cookie de afiliado (refpa37630.com).
- **HLS:** wf6kt.envivoslatam.org — IP 181.115.172.46 en token, validez 15h.

#### Sesión A11-N-R1 — Android 11 sin protección

- **Problema:** CA mitmproxy con contexto SELinux incorrecto (`appdomain_tmpfs` en lugar de `system_security_cacerts_file`). Solución: `--ignore-certificate-errors` en chrome-command-line.
- **Chrome versión:** 91.0.4472.114 (más antiguo que A14)
- **Flujos capturados:** 452 flujos, 26 dominios únicos, 11 MB
- **Hallazgo clave:** Fingerprint adaptativo — Chrome 91 envía 4 campos Client Hints vs 6 en Chrome 113. Los campos `chu` (brand list) y `chmob` (indicador móvil) están ausentes en Chrome 91.
- **Popunder:** bol.1xbet.com — 317 requests.
- **HLS:** xky9q.envivoslatam.org — IP 181.115.172.46 en token.

#### Sesión A11-D-R1 — Android 11 + AdGuard DNS

- **Flujos capturados:** 78 flujos, 19 dominios únicos, 1.7 MB
- **Popunder:** www.doradobet.com (¡diferente a 1xbet!) — con `js.stripe.com` cargado en página de registro con bono $500.
- **Hallazgo crítico:** El popunder RTB puede entregar cualquier sitio, incluyendo formularios de captación de datos de pago vía Stripe.
- **AdGuard DNS:** No bloqueó usrpubtrk.com, acscdn.com ni adexchangerapid.com.
- **HLS:** No cargó en esta sesión (iframe parcial).

### Documento generado: comparativa_perfiles.md

Documento maestro de análisis comparativo creado en `Walter_Jaldin/06_analisis/comparativa_perfiles.md` con:
- Tabla maestra de 4 sesiones
- Comparativa de fingerprinting (6 vs 4 Client Hints)
- Tabla de popunder RTB dinámico por sesión
- Inventario de 6 subdominios TECHOFF observados
- 13 riesgos confirmados con evidencia experimental
- Mapa de actores completo del ecosistema
- Análisis de efectividad de AdGuard DNS

### Hallazgos de alto impacto — Jornada 10

1. **AdGuard DNS = protección nula** contra este ecosistema. usrpubtrk.com, acscdn.com y adexchangerapid.com no están en listas de bloqueo de AdGuard DNS público.

2. **Popunder RTB es dinámico.** El destino varía por sesión:  
   A14-D → `bol.1xbet.com` | A11-N → `bol.1xbet.com` | A11-D → `www.doradobet.com`

3. **js.stripe.com en popunder.** El sitio de apuestas doradobet.com cargó el SDK de Stripe en su página de registro con "bono de bienvenida $500" — vector directo de captura de datos bancarios.

4. **Fingerprint adaptativo.** usrpubtrk.com ajusta los campos enviados según las capacidades del navegador. Chrome 91 no envía `chu`/`chmob` pero el fingerprint sigue siendo identificable.

5. **Rotación de subdominios TECHOFF.** Seis subdominios distintos de envivoslatam.org usados en las 4 sesiones (iaw5b, qbk4f, smjt9q, wf6kt, rci1w, xky9q). Estrategia de resiliencia ante bloqueos por hostname.

6. **PHPSESSID insegura en todos los perfiles** donde el iframe cargó completamente — vulnerabilidad sistémica, no accidental.

### Pendiente

- SpyOnWeb GA4 cross-reference (requiere acceso a browser)

---

## Entrada 11 — 14 de mayo de 2026 (continuación)

**Jornada:** Día 11 — Completar trabajo pendiente: secciones del artículo, OSINT complementario, sesión R2, xmlrpc
**Hora de inicio:** 22:00 UTC  
**Hora de fin:** 23:59 UTC

### Actividades ejecutadas

#### Sesión A14-N-R2

Segunda repetición del perfil Android 14 sin protección DNS. Resultado diferente al R1 — el popunder RTB resolvió a `doradobet.com` (en R1 no se activó el popunder; en R2 se activó intencionalmente).

**Hallazgo clave:** Con el popunder activo y resolviendo a doradobet.com, la sesión capturó 122 dominios únicos (vs 19 en R1), revelando un ecosistema de tracking masivo introducido por el destino RTB:

- **TikTok Pixel** — analytics.tiktok.com (30 requests). ByteDance recibe el perfil del visitante boliviano.
- **Microsoft Clarity** — j.clarity.ms. Grabación de sesión con heatmaps desde el sitio de apuestas.
- **Lotame DMP** — sync.crwdcntrl.net. El perfil se sincroniza a la plataforma de datos de audiencias global.
- **Adform** — a2/c1.adform.net. Ad exchange europeo conectado al ecosistema RTB de doradobet.
- **BidSwitch** — x.bidswitch.net. Intermediario RTB adicional.
- **Nuevo subdomain TECHOFF:** `bd2ih.envivoslatam.org` — séptimo subdomain único documentado.

Archivos generados: `Walter_Jaldin/05_sesiones/A14-N-R2/notas.md`, `A14-N-R2_flows.mitm` (411 flujos, 7.8 MB).

#### Análisis xmlrpc.php — pelotalibretv.su

Confirmado con curl: `pelotalibretv.su/xmlrpc.php` responde HTTP 200 a `system.listMethods` sin autenticación, exponiendo 80+ métodos WordPress.

Vectores de ataque documentados:
- `system.multicall` → brute force de credenciales a alta velocidad (cientos de contraseñas por request)
- `pingback.ping` → DDoS reflection y SSRF sin autenticación requerida
- `wp.uploadFile` → carga de webshell con credenciales válidas
- Sin rate limiting observable (respuesta siempre HTTP 200)

Archivo generado: `Walter_Jaldin/03_osint/12_xmlrpc_pelotalibretv.md`.

#### OSINT complementario — Jornada 10/11

Investigación y documentación de tres actores adicionales del ecosistema:

1. **envivoslatam.org WHOIS:** Registrado el 7 de enero de 2026 (4 meses antes del estudio), privacidad máxima Dynadot Super Privacy, IP 195.178.110.11 (TECHOFF AS48090). Dominio de infraestructura efímera creado específicamente para la operación de streaming.

2. **configma.website:** No es un sitio web público. Es el nombre técnico PTR del servidor 185.254.197.23 (`a1.configma.website`). Patrón típico de servidor cPanel con Engintron. Solo existe en DNS inverso.

3. **SOLLUTIUM LLC:** Revendedor de servidores de Virtual Systems LLC. Hospeda `pelotalibretv.su` (138.226.244.112). Registrador de `latamvidz1.com`. Panel WHMCS con PHP 7.4.32 EOL (noviembre 2022). Conexión doble al ecosistema confirma que el operador es cliente SOLLUTIUM para múltiples componentes.

Inventario de subdominios TECHOFF completado: **9 subdominios únicos** (iaw5b, qbk4f, bd2ih, smjt9q, wf6kt, rci1w, xky9q, chrz, dtkb).

Archivo generado: `Walter_Jaldin/03_osint/13_osint_complementario_j10.md`.

#### Sección 4 — Resultados (borrador)

Borrador completo de la sección de resultados del artículo académico:
- 4.1: Hallazgos OSINT (ecosistema, TECHOFF, CVE-2023-38408, xmlrpc.php)
- 4.2: Análisis de sesiones experimentales (7 subsecciones)
- 4.3: Efectividad de AdGuard DNS (tabla comparativa)
- 4.4: Tabla resumen de 12 vulnerabilidades con clasificación OWASP

Archivo generado: `Walter_Jaldin/08_articulo/seccion4_resultados_borrador.md`.

#### Sección 5 — Discusión (borrador)

Borrador completo de la sección de discusión:
- 5.1: Modelo de riesgo en tres capas (identificación, monetización, infraestructura bulletproof)
- 5.2: El ecosistema como infraestructura deliberadamente diseñada
- 5.3: Ineficacia de la protección DNS como medida individual
- 5.4: Diferencias entre versiones de Android e implicaciones para Bolivia
- 5.5: El popunder como vector de fraude financiero (mecanismo Stripe SDK)
- 5.6: Vulnerabilidades del servidor — implicaciones para el ecosistema
- 5.7: Limitaciones del estudio
- 5.8: Implicaciones para políticas públicas y recomendaciones

Archivo generado: `Walter_Jaldin/08_articulo/seccion5_discusion_borrador.md`.

### Estado del artículo académico al cierre de Jornada 11

| Sección | Estado |
|---|---|
| Sección 1 — Introducción | ✅ Borrador completo |
| Sección 2 — Marco teórico | ✅ Borrador completo |
| Sección 3 — Metodología | ✅ Borrador completo |
| Sección 4 — Resultados | ✅ Borrador completo |
| Sección 5 — Discusión | ✅ Borrador completo |
| Sección 6 — Conclusiones | ⏳ Pendiente |
| Referencias | ⏳ Pendiente de consolidar |

### Hallazgos de alto impacto — Jornada 11

1. **Ecosistema RTB introduce segundo nivel de exposición.** Cuando el popunder resuelve a doradobet.com, el perfil del usuario boliviano llega simultáneamente a TikTok/ByteDance, Microsoft, Lotame, Adform, BidSwitch — actores que el operador de futbol-libre.su no controla y el usuario no conoce.

2. **xmlrpc.php sin protección en pelotalibretv.su.** `system.multicall` habilita brute force de credenciales a alta velocidad. Sin rate limiting. Cualquier atacante puede comprometer el servidor WordPress y por extensión la infraestructura SOLLUTIUM.

3. **SOLLUTIUM es el nodo de infraestructura central.** Hospeda pelotalibretv.su Y es el registrador de latamvidz1.com (backend de streams). Un solo proveedor (revendedor de Virtual Systems LLC) concentra dos componentes críticos del ecosistema.

4. **envivoslatam.org es infraestructura efímera.** Registrado 4 meses antes del estudio, con privacidad máxima. Patrón típico de dominios creados para operaciones de streaming de corta duración.

5. **Inventario TECHOFF completo: 9 subdominios.** La rotación cubre al menos 3 sesiones activas simultáneas con subdominios independientes, sugiriendo operación a escala mayor que un solo operador.

### Pendiente al cierre de Jornada 11

- SpyOnWeb GA4 cross-reference para G-L0N11PVD63 (requiere browser)
- Sección 6 — Conclusiones del artículo
- Integración y revisión final del artículo (secciones 1-5)

---
