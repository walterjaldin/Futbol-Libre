# 1.1 — WHOIS e historial del dominio futbollibretv.su

**Fecha de consulta:** 26 de abril de 2026
**Investigador:** Walter Jaldín
**Fuentes consultadas:** servidor WHOIS oficial (whois.tcinet.ru), ViewDNS.info (WHOIS y IP History).

---

## Resumen ejecutivo

El dominio futbollibretv.su fue registrado el 26 de diciembre de 2022 mediante el registrador ruso ARDIS-SU, bajo el TLD .su (antigua Unión Soviética), gestionado por la Russian Institute for Development of Public Networks (ROSNIIROS). El titular real está oculto detrás de un servicio de privacidad WHOIS (whoisprotectservice.net), lo que impide su identificación directa. El dominio utiliza servidores DNS distribuidos en múltiples TLDs (P-DNS), un patrón asociado a infraestructuras resilientes ante bloqueos. Históricamente ha estado alojado en OVH (Francia) y, desde inicios de 2026, opera detrás de Cloudflare como CDN/proxy reverso, lo que oculta la IP real del servidor de origen.

---

## Datos del registro WHOIS

### Información actual del dominio
- **Dominio:** FUTBOLLIBRETV.SU
- **TLD:** .su (Unión Soviética histórica)
- **Estado:** REGISTERED, DELEGATED (activo)
- **Fecha de registro:** 26 de diciembre de 2022 (16:43:23 UTC)
- **Fecha de última actualización del WHOIS:** 22 de abril de 2026
- **Renovado hasta:** 26 de diciembre de 2026
- **Fecha de liberación si no se renueva:** 28 de enero de 2027
- **Antigüedad al momento del estudio:** 3 años y 4 meses

### Registrador
- **Registrar:** ARDIS-SU
- **Tipo:** registrador ruso especializado en TLDs .ru y .su
- **Autoridad reguladora:** TCI (Technical Center of Internet, Moscú)
- **Email administrativo del TLD:** su-adm@ripn.su

### Información del titular
- **Persona registrada:** "Private Person" (privacidad WHOIS activada)
- **Email de contacto:** doublesclick.su@whoisprotectservice.net
- **Servicio de privacidad usado:** whoisprotectservice.net
- **Identidad real del operador:** no disponible públicamente

### Servidores DNS configurados
- a.p-dns.com
- b.p-dns.org
- c.p-dns.biz
- d.p-dns.info

**Observación:** uso de cuatro servidores DNS distribuidos en TLDs distintos (.com, .org, .biz, .info), patrón característico del proveedor P-DNS, asociado a infraestructuras diseñadas para resistir bloqueos por jurisdicción única.

---

## Historial de IPs

Se identificaron 4 direcciones IP históricas asociadas al dominio según ViewDNS.info:

| IP | Propietario | Ubicación | Última vez vista |
|---|---|---|---|
| 172.67.214.174 | Cloudflare, Inc | (oculta) | 2026-03-13 |
| 104.21.37.231 | Cloudflare, Inc | (oculta) | 2026-03-13 |
| 37.187.202.102 | OVH SAS | Francia | 2026-01-02 |
| 176.31.176.81 | OVH SAS | Francia | 2026-01-02 |

### Análisis del cambio de hosting

El dominio migró de **hosting directo en OVH (Francia)** a **proxy reverso de Cloudflare** entre enero y marzo de 2026. Las dos IPs actuales (172.67.x y 104.21.x) corresponden al rango público de Cloudflare, no al servidor real del operador.

**Implicaciones técnicas:**
- La IP real del servidor de origen (donde efectivamente reside el contenido del sitio) queda oculta detrás de Cloudflare.
- Cualquier intento de bloqueo por IP queda neutralizado, ya que se bloquearían IPs compartidas con miles de sitios legítimos.
- Cloudflare provee mitigación de DDoS, lo que puede ser una motivación para la migración.
- Esta configuración representa una **limitación documentable** para la investigación: no es posible determinar la ubicación geográfica ni el proveedor real del servidor de origen sin métodos invasivos que escapan al alcance ético del estudio.

---

## Análisis del TLD .su

El TLD `.su` corresponde a la Unión Soviética y, pese a la disolución de la URSS en 1991, continúa operativo bajo gestión de la Russian Institute for Development of Public Networks (ROSNIIROS), con sede en Moscú.

**Características relevantes para el estudio:**

- **Regulación menos estricta** que TLDs occidentales como .com, .net o ccTLDs latinoamericanos.
- **Costo bajo de registro** (~10-15 USD/año), accesible para operadores de sitios efímeros.
- **Tiempos de respuesta a denuncias prolongados**, lo que dificulta takedowns rápidos.
- **Asociación histórica con cibercriminalidad:** el TLD ha sido referenciado en literatura académica de ciberseguridad como destino frecuente de sitios maliciosos, foros de cibercrimen y operaciones de phishing por su jurisdicción permisiva.
- **Persistencia paradójica:** el TLD de un país que ya no existe sigue siendo elegible para registro, lo que genera asimetrías regulatorias que ciertos operadores aprovechan deliberadamente.

La elección de .su sobre alternativas más estandarizadas (.com, .net) es **sugestiva** de una preferencia operativa por jurisdicción permisiva, aunque no es prueba concluyente de intención maliciosa por sí sola.

---

## Observaciones e interpretación

A partir de los datos WHOIS pueden extraerse las siguientes observaciones técnicas:

1. **Anonimato deliberado del operador:** el uso simultáneo de servicio de privacidad WHOIS y registración bajo "Private Person" ocultan completamente la identidad legal de quien opera el sitio. Aunque la privacidad WHOIS es legítima en muchos casos, su combinación con el resto de patrones (TLD .su, hosting tras Cloudflare, DNS distribuido) configura un perfil de operador que prioriza la opacidad.

2. **Infraestructura diseñada para resistencia:** los nameservers P-DNS en TLDs distintos y el uso de Cloudflare como proxy son técnicas usadas comúnmente por sitios que buscan resiliencia ante intentos de bloqueo o takedown.

3. **Antigüedad moderada:** 3 años y 4 meses de operación con renovación reciente sugiere un sitio establecido (no un dominio efímero recién creado), lo que indica que ha sobrevivido a posibles intentos de denuncia y mantiene una base de usuarios activa.

4. **Coincidencia temporal con el Mundial 2022:** el registro en diciembre de 2022 coincide con el final del Mundial de Qatar, momento histórico de auge de plataformas de streaming deportivo no oficial en mercados de habla hispana.

5. **Limitación del estudio:** dado que el sitio opera tras Cloudflare, la información sobre el servidor real (IP, ubicación, proveedor) no es accesible mediante técnicas pasivas. Esto se reconocerá como limitación en la sección correspondiente del artículo.

---

## Evidencias adjuntas

- `evidencias/whois/whois_terminal.txt` — salida completa del comando whois.
- `evidencias/whois/viewdns_whois.png` — captura del WHOIS desde ViewDNS.info.
- `evidencias/whois/viewdns_iphistory.png` — historial de IPs desde ViewDNS.info.

---