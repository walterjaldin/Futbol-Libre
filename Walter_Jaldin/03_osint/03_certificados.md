# 1.3 — Certificados TLS e infraestructura del servidor

**Fecha de consulta:** 27 de abril de 2026
**Investigador:** Walter Jaldín
**Herramientas usadas:** Censys (search.censys.io), crt.sh, dig, whois.

**Limitación documentada:** la herramienta crt.sh estuvo intermitentemente caída (error 502 Bad Gateway) durante la realización de esta sub-fase, por lo que el análisis se complementó priorizando Censys, que provee acceso a Certificate Transparency logs e información detallada del host y servicios.

---

## Resumen ejecutivo

El análisis del host 185.254.197.23 mediante Censys reveló que se trata de un servidor de hosting compartido tipo cPanel/WHM operado por **Virtual Systems LLC**, una empresa de hosting con sede en Kyiv, Ucrania (Laboratorna str., building 33/37). El servidor expone 24 servicios públicos simultáneamente, incluyendo paneles de administración cPanel/WHM, servidores de correo (Exim, Dovecot, Roundcube), múltiples instancias de WordPress y MySQL accesible públicamente. El hallazgo más relevante de esta sub-fase fue la identificación del dominio paralelo `www.futbol-libre.su` apuntando a la misma IP, dominio que comparte el mismo registrador, los mismos servidores DNS y el mismo TTL que el dominio investigado, configurando evidencia técnica directa de un ecosistema de dominios bajo el mismo operador. Adicionalmente, el dominio paralelo expone en sus registros WHOIS un correo electrónico personal de Gmail, lo que contrasta con la privacidad WHOIS activada en el dominio principal y constituye un descuido operativo del titular.

---

## Información del host 185.254.197.23

### Datos generales
- **IP:** 185.254.197.23
- **Reverse DNS:** a1.configma.website
- **Forward DNS detectado por Censys:** www.futbol-libre.su (dominio paralelo, ver Hallazgo 1)
- **Sistema operativo detectado:** No determinado por Censys (probablemente Linux con OpenSSH portado, dado el ecosistema cPanel)
- **Total de servicios expuestos:** 24
- **CVEs reportadas:** 0 al momento del escaneo (27 abril 2026, 11:53 UTC)

### Red y geolocalización
- **WHOIS Network:** Virtual Systems LLC (UA-VSYS-20180411)
- **WHOIS Organization:** Virtual Systems LLC
- **Dirección física del proveedor:** Laboratorna str., building 33/37, 03150, Kiyv, Ucrania
- **ID RIPE:** ORG-VSL22-RIPE
- **ASN:** 30860 (YURTEH-AS)
- **Rango de red:** 185.254.196.0/23
- **Ubicación geográfica:** Kyiv, Ucrania
- **Coordenadas:** 50.45466° N, 30.5238° E

---

## Servicios expuestos (24 puertos)

### Servicios de administración remota y paneles de control
- **22 / SSH** — OpenBSD OpenSSH (algoritmo ecdsa-sha2-nistp256)
- **2082 / HTTP** — cPanel (panel de control de hosting, interfaz cliente)
- **2083 / HTTP** — cPanel sobre TLS
- **2086 / HTTP** — WHM (Web Host Manager, interfaz administrador)
- **2087 / HTTP** — WHM sobre TLS
- **2095 / HTTP** — Webmail
- **2077, 2078, 2079, 2080 / HTTP** — Servicios auxiliares cPanel

### Servicios de correo electrónico
- **25 / SMTP** — Exim (envío de correo)
- **465 / SMTPS** — Exim cifrado
- **587 / SMTP** — Submission
- **110 / POP3** — Dovecot (recepción)
- **143 / IMAP** — Dovecot
- **993 / IMAPS** — Dovecot cifrado
- **995 / POP3S** — Dovecot cifrado

### Servicios web y datos
- **53 / DNS** — PowerDNS Authoritative Server (servidor DNS propio)
- **80 / HTTP** — F5 Nginx
- **443 / HTTPS** — F5 Nginx
- **3306 / MySQL** — Base de datos MySQL accesible públicamente

---

## Software detectado en el servidor

Censys identificó 12 productos de software activos:

| Software | Cantidad de instancias | Función |
|---|---|---|
| OpenBSD OpenSSH | 1 | Acceso administrativo SSH |
| Exim | 3 | Servidor de correo SMTP |
| PowerDNS Authoritative Server | 1 | Servidor DNS |
| F5 Nginx | 1 | Servidor web |
| WordPress | 3 | CMS (múltiples sitios alojados) |
| Yoast SEO | 1 | Plugin SEO de WordPress |
| Dovecot | 4 | Servidor IMAP/POP3 |
| cPanel | 5 | Panel de control de hosting |
| Roundcube Webmail | 3 | Cliente de correo web |
| cPanel WHM | 1 | Panel administrador |

La presencia simultánea de 3 instancias de WordPress, 3 de Roundcube, 4 de Dovecot y 5 de cPanel confirma que se trata de un servidor multi-tenant que aloja varios sitios web independientes bajo el mismo hardware. Futbollibretv.su es uno de varios sitios hospedados aquí.

---

## Análisis del certificado TLS principal

### Certificado del servidor en puerto 443
- **Common Name (CN):** doeemain.org
- **Servidor web:** F5 Nginx
- **Observación:** el certificado del servidor está emitido para un dominio (`doeemain.org`) distinto al dominio investigado. Esto indica configuración de virtual hosts (vhost), donde Nginx sirve múltiples dominios desde la misma IP, presentando el certificado del primer vhost o del dominio configurado por defecto.
- El nombre `doeemain` aparenta ser un typosquatting de "domain" (variación tipográfica). Esta línea de investigación se profundiza en la sub-fase 1.7.

### Limitación de la consulta a crt.sh
La búsqueda directa de certificados emitidos para `futbollibretv.su` en crt.sh no pudo completarse durante esta sub-fase debido a fallos intermitentes del servicio (error 502). Se documenta como limitación y se reintentará en una ventana posterior para consolidar los hallazgos.

---

## Hallazgos críticos

### Hallazgo 1: Dominio paralelo confirmado técnicamente

Censys reportó como Forward DNS del host la cadena `www.futbol-libre.su`. La verificación independiente con dig confirmó que ambos dominios resuelven a la misma IP:

futbollibretv.su.   60   IN   A   185.254.197.23
futbol-libre.su.    60   IN   A   185.254.197.23

**Comparación técnica entre ambos dominios:**

| Atributo | futbollibretv.su | futbol-libre.su |
|---|---|---|
| TLD | .su | .su |
| Registrador | ARDIS-SU | ARDIS-SU |
| Servidores NS | a/b/c/d.p-dns.* | a/b/c/d.p-dns.* |
| IP de resolución | 185.254.197.23 | 185.254.197.23 |
| TTL | 60 segundos | 60 segundos |
| Fecha de registro | 26 dic 2022 | 22 nov 2022 |

La coincidencia total en TLD, registrador, servidores DNS, IP de hospedaje y TTL constituye evidencia técnica directa de que ambos dominios pertenecen al mismo operador. La diferencia de aproximadamente un mes en las fechas de registro (futbol-libre.su precede a futbollibretv.su) sugiere que el primero fue el dominio inicial y el segundo se registró posteriormente como respaldo o variante.

### Hallazgo 2: Inconsistencia operativa en la privacidad WHOIS

Aunque ambos dominios comparten infraestructura, los registros WHOIS muestran un patrón asimétrico:

- **futbollibretv.su:** correo de contacto `doublesclick.su@whoisprotectservice.net` — uso de servicio de privacidad WHOIS, identidad oculta.
- **futbol-libre.su:** correo de contacto `hassan.azmw@gmail.com` — correo personal de Gmail expuesto en registro público.

Esta asimetría es metodológicamente relevante: el dominio principal (futbollibretv.su) está protegido por privacidad WHOIS, mientras que el dominio paralelo (futbol-libre.su) deja expuesto un correo personal que probablemente corresponde al mismo operador. Esto evidencia un descuido operativo: el operador, al replicar su infraestructura para crear redundancia, no aplicó consistentemente las mismas medidas de anonimato a todos sus dominios.

Este tipo de inconsistencia es un patrón documentado en literatura de ciberseguridad y operaciones de cumplimiento legal: incluso operadores que buscan anonimato suelen fallar en mantener uniformidad operativa entre sus múltiples activos.

**Nota ética:** el correo expuesto se documenta como evidencia técnica obtenida de registros públicos WHOIS. En la versión final del artículo, este dato se presentará de forma anonimizada (ej. "se identificó un correo personal de Gmail expuesto en el WHOIS del dominio paralelo") sin difundir el correo completo, en respeto al principio de minimización de daños.

### Hallazgo 3: Servidor de hosting compartido cPanel multi-tenant

Las 24 servicios expuestos y la detección de múltiples instancias de WordPress, Dovecot, Exim y cPanel confirman que el servidor es un shared hosting comercial operado por Virtual Systems LLC. Futbollibretv.su es un cliente o sitio del operador del servidor, no un servidor dedicado al sitio.

**Implicación para el estudio:** el problema no es un sitio aislado; es parte de una infraestructura más amplia de hosting comercial en jurisdicción permisiva (Ucrania) que probablemente aloja múltiples sitios análogos.

### Hallazgo 4: Identificación del proveedor de hosting

Por primera vez en el estudio se identifica una entidad jurídica relacionada con la infraestructura: Virtual Systems LLC, con dirección física registrada en Kyiv. Esta empresa es el proveedor de hosting; el operador del sitio (titular real) sigue oculto detrás de la privacidad WHOIS del dominio principal, pero ahora sabemos a través de qué proveedor opera y qué jurisdicción cubre la operación.

### Hallazgo 5: Servidor mantenido sin CVEs públicas

Censys reporta cero vulnerabilidades conocidas activas. El operador del servidor o el cliente mantienen los componentes actualizados. Este dato contradice el estereotipo de "servidor descuidado" típico de sitios pirata y sugiere una operación más profesional desde el punto de vista de mantenimiento técnico.

### Hallazgo 6: Superficie de ataque amplia para el ecosistema

A pesar de no tener CVEs activas, la exposición pública de 24 servicios incluyendo cPanel, WHM, MySQL, SSH, IMAP, SMTP y webmail constituye una superficie de ataque significativa. Si en algún momento se descubre una vulnerabilidad en cualquiera de estos componentes, todos los sitios alojados (incluido el investigado) podrían verse comprometidos rápidamente.

---

## Observaciones e interpretación

1. **El sitio futbollibretv.su es parte de un ecosistema más amplio.** No estamos frente a un sitio aislado, sino frente a uno de múltiples sitios alojados en infraestructura compartida ucraniana.

2. **La identificación de futbol-libre.su como dominio paralelo es un hallazgo metodológico clave.** Cambia la perspectiva del estudio: el operador maneja una red de dominios, no un dominio único.

3. **El proveedor (Virtual Systems LLC) es identificable, pero el operador real del sitio no lo es completamente.** Sin embargo, la inconsistencia operativa del operador en la privacidad WHOIS del dominio paralelo introduce una pista circunstancial que ilustra los límites prácticos del anonimato operativo.

4. **El servidor está "limpio" desde la perspectiva de CVEs**, lo que sugiere que el operador o el proveedor aplican parches rutinarios. El riesgo no proviene tanto del estado de la infraestructura como del contenido servido al usuario, que será el foco de las sesiones experimentales.

5. **Existe oportunidad de profundización en sesiones experimentales** observando si los anuncios servidos por el sitio incluyen scripts hospedados en `doeemain.org` u otros dominios del mismo servidor, lo que confirmaría una integración aún más profunda del ecosistema.

---

## Evidencias adjuntas

- `evidencias/certificados/censys_ip_resumen.png` — vista resumen de la IP en Censys con servicios y geolocalización.
- `evidencias/certificados/censys_ip_detalle.png` — vista de detalle del host con Forward DNS revelando futbol-libre.su.
- `evidencias/dominios/dig_a_futbol-libre.txt` — verificación de la IP del dominio paralelo.
- `evidencias/dominios/dig_ns_futbol-libre.txt` — servidores DNS del dominio paralelo (idénticos al principal).
- `evidencias/dominios/whois_futbol-libre.txt` — registro WHOIS del dominio paralelo con correo expuesto.

---

