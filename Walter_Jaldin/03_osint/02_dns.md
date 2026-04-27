# 1.2 — Resolución DNS y registros del dominio futbollibretv.su

**Fecha de consulta:** 26 de abril de 2026
**Investigador:** Walter Jaldín
**Herramientas usadas:** comando `dig` (BIND 9.10.6), DNSDumpster.

---

## Resumen ejecutivo

Al momento de la consulta, el dominio futbollibretv.su resuelve directamente a la IP **185.254.197.23**, alojada en el ASN ucraniano YURTEH-AS (AS30860). Este hallazgo contrasta con el historial reciente del dominio en ViewDNS, que mostraba uso de Cloudflare como proxy reverso hasta marzo de 2026, lo que sugiere una migración reciente. El servidor expone un servicio HTTPS gestionado por Nginx, con un certificado emitido para el dominio "doeemain.org" (no para futbollibretv.su). El dominio carece de servidores de correo (MX) y posee un registro TXT de verificación de Google Search Console. La infraestructura DNS está distribuida geográficamente en cuatro países, configuración consistente con un diseño orientado a la resiliencia frente a bloqueos por jurisdicción única.

---

## Registros DNS recolectados

### Registro A (IPv4)
- **futbollibretv.su** → `185.254.197.23`
- **TTL:** 23 segundos en una consulta, 60 segundos en otra (TTL muy bajo).

### Registro AAAA (IPv6)
- **Sin registro IPv6 configurado.**
- El sitio no es accesible mediante IPv6.

### Registros NS (servidores DNS autoritativos)
- a.p-dns.com
- b.p-dns.org
- c.p-dns.biz
- d.p-dns.info

### Registro SOA
- **Servidor primario:** cp.p-dns.com
- **Email de contacto:** joezm5a@proton.me (cuenta de ProtonMail, servicio de correo cifrado y anónimo)
- **Serial:** 2026032079

### Registros MX (correo)
- **Sin registros MX.** El dominio no recibe correo electrónico.

### Registros TXT
- `google-site-verification=rSdArONcC2FDZLl7WDw16516IV-nP_nvryYI5soxy70`

---

## Análisis de la IP actual (185.254.197.23)

Información obtenida mediante DNSDumpster:

- **ASN:** AS30860
- **Nombre del ASN:** YURTEH-AS
- **País del proveedor:** Ucrania
- **Rango de red:** 185.254.196.0/23
- **Reverse DNS:** a1.configma.website
- **Servicio HTTPS expuesto:** sí, servidor Nginx
- **CN del certificado TLS:** doeemain.org

### Hallazgos relevantes

1. **Migración a hosting directo en Ucrania:** entre marzo y abril de 2026, el dominio dejó de estar detrás de Cloudflare y ahora apunta directamente a YURTEH-AS en Ucrania. Esta migración es reciente y altera el perfil de exposición del sitio.

2. **Certificado TLS no coincide con el dominio:** el certificado del servidor está emitido para `doeemain.org`, no para `futbollibretv.su`. Esto indica que el servidor probablemente hospeda múltiples sitios (configuración multi-tenant tipo vhost) y que el operador puede estar reutilizando infraestructura de otro dominio. El nombre "doeemain" parece ser una variación tipográfica de "domain" (typosquatting), lo que se profundizará en la sub-fase 1.7 sobre dominios relacionados.

3. **Reverse DNS sospechoso:** `a1.configma.website` no es un dominio comercial reconocible. Sugiere infraestructura compartida o de un proveedor de hosting de bajo perfil.

4. **TTL muy bajo (60 segundos):** facilita rotación rápida de IPs ante bloqueos. Este es un patrón documentado en literatura de ciberseguridad como técnica de evasión de takedowns.

---

## Análisis de los servidores DNS (NS)

Los cuatro servidores NS se ubican en jurisdicciones distintas:

| Servidor NS | IP | ASN | Proveedor | País |
|---|---|---|---|---|
| a.p-dns.com | 37.187.209.163 | AS16276 | OVH | Francia |
| b.p-dns.org | 37.187.83.149 | AS16276 | OVH | Francia |
| c.p-dns.biz | 162.210.197.241 | AS30633 | LeaseWeb USA | Estados Unidos |
| d.p-dns.info | 185.108.84.23 | AS60781 | LeaseWeb Netherlands | Países Bajos |

**Observaciones clave:**

- **Distribución geográfica deliberada:** los NS están en 3 jurisdicciones distintas (Francia, EE.UU., Países Bajos) y bajo 2 proveedores diferentes (OVH y LeaseWeb). Si una autoridad nacional intenta forzar un takedown DNS en una jurisdicción, los demás NS continúan resolviendo el dominio.

- **Conexión con el registrador:** el reverse DNS de `d.p-dns.info` (185.108.84.23) es `dns4.ardis.ru`, lo que vincula el servicio DNS al registrador ARDIS-SU declarado en el WHOIS. Esto confirma que el operador eligió un ecosistema unificado bajo control de ARDIS para el ciclo registro-DNS.

- **Proveedores con políticas permisivas:** OVH y LeaseWeb son frecuentemente identificados en literatura de ciberseguridad como hosts utilizados por sitios cuestionables, aunque también alojan tráfico legítimo masivo. La relación operador-proveedor no es por sí sola evidencia de malicia, pero forma parte del perfil consistente del sitio.

---

## Análisis de la ausencia de MX

La inexistencia de servidores de correo en el dominio implica:

- Imposibilidad de enviar o recibir correo en `@futbollibretv.su`.
- Ausencia de canal de contacto oficial con el operador.
- Inconsistencia con sitios legítimos que ofrecen al menos un correo de soporte.

Esta característica refuerza el perfil de operador anónimo que prioriza la opacidad sobre la trazabilidad legal o comercial.

---

## Análisis del registro TXT (Google Site Verification)

El registro TXT contiene una clave de verificación de Google Search Console (`google-site-verification`). Esto significa que:

- El operador (o alguien en su nombre) registró el sitio en Google Search Console.
- Es probable que esté monitoreando posiciones de búsqueda y tráfico orgánico.
- El operador busca **visibilidad pública** del sitio, contradiciendo parcialmente la imagen de "sitio totalmente clandestino": quiere ser encontrado por usuarios que buscan transmisiones de fútbol gratis.
- En sesiones experimentales se verificará si el sitio incluye Google Analytics u otras herramientas de medición de tráfico.

El email de contacto en el registro SOA es `joezm5a@proton.me`, una cuenta de **ProtonMail** (servicio suizo de correo cifrado y anónimo), lo que mantiene la coherencia del perfil operativo de anonimato del titular.

---

## Observaciones e interpretación

A partir del análisis DNS pueden extraerse estas conclusiones técnicas:

1. **Cambio reciente de infraestructura:** la migración de Cloudflare a hosting directo en Ucrania (entre marzo y abril de 2026) representa un cambio operativo significativo. Las razones pueden incluir: cambio de modelo de negocio, problemas con políticas de Cloudflare ante denuncias, o búsqueda de menor latencia para usuarios objetivo.

2. **Patrón de resiliencia DNS:** los cuatro servidores NS distribuidos en distintas jurisdicciones forman un esquema deliberado de resistencia ante bloqueos.

3. **Certificado TLS de otro dominio:** el uso de un certificado emitido para `doeemain.org` es atípico y abre una línea de investigación sobre el ecosistema de dominios del operador.

4. **Operador anónimo pero buscando tráfico:** el operador combina técnicas de opacidad (privacidad WHOIS, ProtonMail, sin MX) con técnicas de visibilidad (Google Search Console). El interés en tráfico orgánico desde Google es coherente con un modelo de monetización vía publicidad.

5. **Implicación para la metodología del estudio:** dado que la IP actual no está detrás de Cloudflare, en sesiones experimentales podríamos observar contenido directo del servidor sin intermediación de WAF. Esto puede facilitar la observación de comportamientos del lado servidor durante la navegación.

---

## Evidencias adjuntas

- `evidencias/dns/dig_a.txt` — registro A.
- `evidencias/dns/dig_aaaa.txt` — sin registros IPv6.
- `evidencias/dns/dig_any.txt` — consulta ANY consolidada.
- `evidencias/dns/dig_mx.txt` — sin registros MX.
- `evidencias/dns/dig_ns.txt` — servidores DNS autoritativos.
- `evidencias/dns/dig_txt.txt` — registro TXT de verificación de Google.
- `evidencias/dns/dnsdumpster.png` — captura de DNSDumpster con análisis completo de infraestructura.

---