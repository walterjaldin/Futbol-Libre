# 1.5 — Análisis de reputación del dominio y la infraestructura

**Fecha de consulta:** 4 de mayo de 2026
**Investigador:** Walter Jaldín
**Herramientas usadas:** VirusTotal API v3, URLhaus API, AbuseIPDB API (intento), dig, whois.

**Decisión metodológica:** se ejecutó toda la sub-fase desde terminal con consultas API directas, generando archivos JSON y resúmenes TXT como evidencia objetiva. Esta aproximación garantiza reproducibilidad y permite versionar la evidencia en el repositorio Git del estudio.

---

## Resumen ejecutivo

El análisis de reputación del dominio futbollibretv.su revela un patrón característico de sitio de streaming pirata: bajo número de detecciones por motores antivirus (1/91), ausencia de reportes en URLhaus (no distribuye malware directamente), y operación bajo infraestructura de hosting comercial en Ucrania. Sin embargo, el hallazgo más significativo de esta sub-fase fue la identificación, mediante consulta de resoluciones DNS pasivas en VirusTotal, de un **ecosistema de al menos 10 dominios distintos** que han apuntado a la misma IP del servidor investigado en los últimos siete meses. La verificación cruzada mediante registros WHOIS y consultas DNS confirmó que tres dominios (.su) pertenecen al mismo operador, con evidencia técnica directa de vinculación a través del correo `joezm5a@proton.me`, presente tanto en el registro SOA de futbollibretv.su como en el WHOIS público de pelotalibretv.su. Adicionalmente, todas las IPs del ecosistema (185.254.197.23, 194.42.205.18, 91.218.49.91) pertenecen a la misma empresa proveedora: Virtual Systems LLC, con sede en Kyiv, Ucrania, lo que confirma una infraestructura unificada bajo un único proveedor de hosting.

---

## Análisis del dominio principal: futbollibretv.su

### Estadísticas de detección en VirusTotal
Detection stats:
malicious:    1
suspicious:   0
undetected:  33
harmless:    57
total:       91 motores

**Reputación VirusTotal:** 0 (neutral)
**Votos de la comunidad:** 0 a favor, 0 en contra

### Motor que detecta como malicioso

| Motor | Método | Veredicto |
|---|---|---|
| Chong Lua Dao | blacklist | malicious |

**Lectura analítica:** solo 1 de 91 motores marca el dominio como malicioso. Aunque la cifra es baja, **no implica que el sitio sea seguro**. Significa que el dominio aún no ha sido suficientemente analizado por la mayoría de los proveedores de inteligencia de amenazas, fenómeno conocido en literatura como "luna de miel" de un dominio pirata: los sitios suelen acumular detecciones gradualmente conforme reciben más reportes y son procesados por más motores. Sin embargo, motores especializados ya lo marcaron tempranamente.

### Categorías asignadas

VirusTotal no muestra categorías específicas para este dominio en el momento de la consulta. Esto es consistente con dominios que aún no han sido categorizados sistemáticamente por servicios de filtrado web.

---

## Análisis del dominio paralelo: futbol-libre.su

### Estadísticas de detección

Detection stats:
malicious:    2
suspicious:   1
undetected:  34
harmless:    54
total:       91 motores

### Motores que detectan

| Motor | Método | Veredicto |
|---|---|---|
| alphaMountain.ai | blacklist | malicious |
| Forcepoint ThreatSeeker | blacklist | malicious |
| Gridinsoft | blacklist | suspicious |

**Lectura analítica clave:**

- **Forcepoint ThreatSeeker** es uno de los motores empresariales más confiables del mercado. Que lo marque como malicious sugiere que el dominio ya está bloqueado en muchas redes corporativas.
- **Gridinsoft** es un motor especializado en detección de adware y PUPs (Potentially Unwanted Programs). Su veredicto suspicious es coherente con la hipótesis de que el riesgo principal del sitio proviene de publicidad agresiva, no de malware directo.
- **alphaMountain.ai** es un proveedor de threat intelligence relativamente nuevo pero usado por varios productos comerciales.

### Asimetría de detección entre dominios hermanos

El dominio paralelo `futbol-libre.su` tiene **3 veces más detecciones** que `futbollibretv.su`, a pesar de servir el mismo backend técnico. Hipótesis explicativas:

1. **Antigüedad acumulada:** futbol-libre.su fue registrado un mes antes (22 nov 2022 vs 26 dic 2022), por lo que tuvo más tiempo para acumular reportes.
2. **Mayor exposición pública:** el correo personal expuesto en su WHOIS pudo facilitar reportes externos al operador.
3. **Propagación gradual de listas de bloqueo:** las listas de threat intelligence comparten datos entre proveedores, pero la propagación toma tiempo. futbollibretv.su probablemente seguirá la misma trayectoria de detección.

---

## Análisis de la IP principal: 185.254.197.23

### Estadísticas de detección VirusTotal

Detection stats:
malicious:    0
suspicious:   1
undetected:  36
harmless:    54
total:       91 motores

### Información de red

| Campo | Valor |
|---|---|
| País | UA (Ucrania) |
| ASN | 30860 |
| AS Owner | Virtual Systems LLC |
| Red | 185.254.196.0/23 |

### Motor que detecta

| Motor | Método | Veredicto |
|---|---|---|
| alphaMountain.ai | blacklist | suspicious |

---

## Hallazgo crítico: Ecosistema de 10 dominios

La consulta a la API de VirusTotal sobre las **resoluciones DNS pasivas** de la IP 185.254.197.23 reveló que en los últimos meses al menos 10 dominios distintos han apuntado a esa IP:

| Dominio | Última vez visto | Categoría tentativa |
|---|---|---|
| www.futbollibretv.su | 1-may-2026 | Streaming hispano |
| futbol-libre.su | 24-abr-2026 | Streaming hispano |
| www.futbol-libre.su | 24-abr-2026 | Streaming hispano |
| pelotalibretv.su | 19-abr-2026 | Streaming rioplatense |
| futbollibretv.su | 15-abr-2026 | Streaming hispano (sitio investigado) |
| orion.yourewatching2.org | 21-ene-2026 | Streaming anglófono |
| orion.yourewatching1.org | 20-ene-2026 | Streaming anglófono |
| orion.yourewatching.org | 10-ene-2026 | Streaming anglófono |
| pt.doeemain.org | 1-nov-2025 | Plataforma matriz (portugués) |
| es.doeemain.org | 21-oct-2025 | Plataforma matriz (español) |

### Clasificación funcional del ecosistema

La organización por familias semánticas sugiere segmentación deliberada por idioma y región:

**Familia hispana (España, México, Bolivia, Colombia, etc.):**
- futbollibretv.su (sitio investigado)
- futbol-libre.su

**Familia rioplatense (Argentina, Uruguay, Paraguay):**
- pelotalibretv.su
- (uso del modismo "pelota" propio del Río de la Plata)

**Familia anglófona (mercados de habla inglesa):**
- yourewatching.org con tres variantes numeradas (.org, 1.org, 2.org), patrón típico de redundancia industrial

**Familia matriz (multi-idioma centralizado):**
- doeemain.org con subdominios por idioma (es, pt) — cuyo nombre aparenta ser un typosquatting de "domain"

---

## Hallazgo crítico: Vinculación cruzada del operador

### Evidencia directa de operador único

La verificación de los registros WHOIS y SOA de los tres dominios .su reveló una **vinculación técnica directa** mediante el correo `joezm5a@proton.me`:

| Dominio | Aparición del correo joezm5a@proton.me |
|---|---|
| futbollibretv.su | Como contacto técnico en el registro SOA del DNS (`cp.p-dns.com. joezm5a.proton.me.`) |
| pelotalibretv.su | Como correo de contacto público en el WHOIS |

A esto se suma el correo personal expuesto en el WHOIS de futbol-libre.su (`hassan.azmw@gmail.com`), que constituye un descuido operativo del titular. La combinación de evidencias permite concluir con alta confianza que **un único operador controla los tres dominios .su del ecosistema**.

### Identidades operativas del operador

El operador utiliza una jerarquía de correos que revela su metodología:

1. **`joezm5a@proton.me`** — correo "operativo serio" en ProtonMail (cifrado, anónimo, jurisdicción suiza). Usado para gestión técnica de DNS y registros WHOIS más recientes.
2. **`hassan.azmw@gmail.com`** — correo personal real. Apareció por descuido operativo en futbol-libre.su (el primer dominio registrado).
3. **`doublesclick.su@whoisprotectservice.net`** — alias generado por servicio de privacidad WHOIS. Usado únicamente en futbollibretv.su (el segundo dominio).

### Cronología del operador

| Fecha | Evento |
|---|---|
| 22 nov 2022 | Registra futbol-libre.su con correo personal de Gmail (sin privacidad WHOIS) |
| 26 dic 2022 | Registra futbollibretv.su con servicio de privacidad WHOIS activado |
| 10 ene 2026 | Registra pelotalibretv.su con correo de ProtonMail directamente expuesto |

**Patrón operativo deducido:** el operador inició su actividad sin medidas de privacidad, las reforzó al registrar el segundo dominio, y volvió a una privacidad parcial (ProtonMail directo, sin servicio adicional) al expandir el ecosistema con el tercero. La inconsistencia operativa entre dominios es lo que permite la vinculación cruzada.

---

## Hallazgo crítico: Infraestructura unificada bajo Virtual Systems LLC

La verificación de las IPs alternativas de los dominios del ecosistema confirmó que todas pertenecen al mismo proveedor de hosting:

| IP | Dominio actualmente asociado | ASN | AS Owner | País |
|---|---|---|---|---|
| 185.254.197.23 | futbollibretv.su, futbol-libre.su | 30860 (YURTEH-AS) | Virtual Systems LLC | Ucrania |
| 194.42.205.18 | pelotalibretv.su | 30860 | Virtual Systems LLC | Ucrania |
| 91.218.49.91 | orion.yourewatching.org | 6698 | Virtual Systems LLC | Ucrania |

### Detecciones en las IPs alternativas

**194.42.205.18 (pelotalibretv.su):**

malicious:    0
suspicious:   2
undetected:  36
harmless:    53

2 motores marcan como suspicious.

**91.218.49.91 (yourewatching.org):**

malicious:    0
suspicious:   0
undetected:  91
harmless:     0

Esta IP llama la atención: 91 de 91 motores la consideran "undetected" (sin clasificar), ningún motor la considera harmless. Esto puede indicar una IP relativamente nueva o de bajo perfil que aún no ha sido analizada extensamente.

### Implicación arquitectónica

Virtual Systems LLC (Kyiv, Ucrania) — proveedor de hosting comercial
│
├─ ASN 30860 (YURTEH-AS)
│       ├─ 185.254.197.23 → futbollibretv.su, futbol-libre.su
│       └─ 194.42.205.18  → pelotalibretv.su (proxied vía Cloudflare)
│
└─ ASN 6698
└─ 91.218.49.91   → yourewatching.org

El operador alquila múltiples IPs y servidores del mismo proveedor (Virtual Systems LLC) para distribuir su ecosistema. Esto sugiere una **relación comercial sostenida** entre el operador y el proveedor, y refuerza la hipótesis de jurisdicción permisiva como criterio operativo central del operador.

---

## Análisis URLhaus

URLhaus, base de datos pública de URLs maliciosas mantenida por abuse.ch, **no reporta entradas** para ninguno de los dos dominios principales investigados ni para la IP del servidor:

Búsqueda futbollibretv.su:  sin reportes
Búsqueda futbol-libre.su:   sin reportes
Búsqueda 185.254.197.23:    sin reportes

### Lectura analítica

URLhaus rastrea específicamente URLs que distribuyen **malware activo** (binarios ejecutables, scripts maliciosos, payloads). La ausencia de reportes confirma una hipótesis central del estudio: **el sitio no es un distribuidor directo de malware**. El riesgo para el usuario proviene de un vector distinto: **malvertising** (publicidad maliciosa) y **redirecciones a sitios terceros**, lo que será verificado en las sesiones experimentales.

Este hallazgo es metodológicamente importante porque:

1. **Justifica la metodología del estudio:** las listas de bloqueo automatizadas (URLhaus, Safe Browsing) **no son suficientes** para detectar el riesgo real de sitios de streaming pirata. Es necesario un análisis dinámico controlado para revelar las amenazas reales.
2. **Refuerza el aporte del estudio:** el peligro queda invisible para usuarios que confían exclusivamente en navegadores con protección automática.

---

## Análisis AbuseIPDB

La consulta a AbuseIPDB para la IP 185.254.197.23 quedó pendiente de completar en esta sub-fase debido a problemas de configuración de la API key. Se documenta como limitación técnica menor, dado que los demás indicadores de reputación recolectados (VirusTotal, resoluciones DNS pasivas, ausencia en URLhaus) son suficientes para caracterizar la reputación del activo.

**Acción futura:** completar la consulta a AbuseIPDB en una jornada posterior y agregar los resultados a este documento como anexo.

---

## Análisis WHOIS comparativo del ecosistema

| Atributo | futbollibretv.su | futbol-libre.su | pelotalibretv.su |
|---|---|---|---|
| TLD | .su | .su | .su |
| Registrador | ARDIS-SU | ARDIS-SU | ARDIS-SU |
| Servidores DNS | a/b/c/d.p-dns.* | a/b/c/d.p-dns.* | Cloudflare (lovisa, owen) |
| Email contacto | doublesclick.su@whoisprotectservice.net | hassan.azmw@gmail.com | joezm5a@proton.me |
| Person | Private Person | Private Person | Private Person |
| Fecha registro | 26-dic-2022 | 22-nov-2022 | 10-ene-2026 |
| IP actual | 185.254.197.23 | 185.254.197.23 | 194.42.205.18 |
| Hosting | Virtual Systems LLC | Virtual Systems LLC | Virtual Systems LLC |

La coincidencia en TLD, registrador y proveedor de hosting; el correo joezm5a@proton.me presente en SOA de un dominio y WHOIS de otro; y el correo personal expuesto en el primer dominio del operador, configuran **evidencia técnica robusta** de un operador único detrás del ecosistema.

---

## Limitaciones documentadas de la sub-fase

1. **AbuseIPDB no consultado:** problema de configuración de variable de entorno con la API key. Pendiente de complementar.
2. **WHOIS limitado de los dominios .org (doeemain.org, yourewatching.org):** las restricciones de GDPR aplicadas a TLDs gestionados por Public Interest Registry limitan la información disponible públicamente sobre titulares y fechas. La vinculación de estos dominios al operador investigado se basa en evidencia circunstancial (coexistencia histórica en la misma IP) y no en evidencia directa por WHOIS.
3. **No verificación en Google Safe Browsing automatizada:** la API de Safe Browsing requiere proyecto de Google Cloud, fuera del alcance del estudio. Se documenta como limitación menor.

---

## Consideraciones éticas sobre los hallazgos

Los datos de correo expuestos en registros WHOIS son **información pública** obtenida de fuentes legítimas (registros oficiales de TCI/ARDIS-SU). Su uso en este estudio se limita estrictamente a la documentación técnica de patrones operativos del ecosistema y no implica ninguna acción de identificación personal, contacto, ni divulgación más allá del ámbito académico.

En la versión final del artículo, los correos expuestos se presentarán de forma anonimizada (por ejemplo: "se identificó un correo personal de Gmail expuesto en el WHOIS del dominio paralelo, contrastando con la privacidad activada en el dominio principal") siguiendo el principio de **minimización de daños** establecido en buenas prácticas de investigación en ciberseguridad.

---

## Hallazgos consolidados de la sub-fase

1. **Bajo número de detecciones en motores antivirus generalistas** (1-3/91), pero motores especializados (Forcepoint, Gridinsoft) ya marcan el ecosistema, prediciendo propagación futura.

2. **Ecosistema de al menos 10 dominios** identificado mediante resoluciones DNS pasivas, con segmentación por idioma (español, español rioplatense, portugués, inglés).

3. **Vinculación técnica directa entre tres dominios .su** mediante el correo joezm5a@proton.me y el correo personal expuesto hassan.azmw@gmail.com.

4. **Infraestructura unificada bajo Virtual Systems LLC** (Kyiv, Ucrania), con al menos tres IPs en dos ASNs distintos pertenecientes al mismo proveedor.

5. **No es distribuidor directo de malware** según URLhaus, confirmando que el riesgo proviene de malvertising y redirecciones (a verificar en sesiones experimentales).

6. **Inconsistencia operativa del operador** documentada: el descuido en mantener uniformidad de privacidad WHOIS entre sus tres dominios .su es lo que permitió la vinculación cruzada. Este patrón es relevante para la literatura académica sobre operadores de sitios pirata.

7. **Implicación para usuarios:** la baja detección en motores generalistas crea una falsa sensación de seguridad. Un usuario que verifique únicamente con navegadores con protección automática puede recibir señal de "seguro" cuando el sitio pertenece a un ecosistema ya señalado por motores especializados de threat intelligence empresarial.

---

## Evidencias adjuntas

- `evidencias/reputacion/vt_dominio_futbollibretv.json` — respuesta API VirusTotal del dominio principal.
- `evidencias/reputacion/vt_dominio_futbol-libre.json` — respuesta API VirusTotal del dominio paralelo.
- `evidencias/reputacion/vt_ip_185254197023.json` — respuesta API VirusTotal de la IP principal.
- `evidencias/reputacion/vt_ip_resoluciones.json` — resoluciones DNS pasivas de la IP principal.
- `evidencias/reputacion/vt_ip_pelotalibretv.json` — análisis de IP alternativa para pelotalibretv.su.
- `evidencias/reputacion/vt_ip_yourewatching.json` — análisis de IP alternativa para yourewatching.org.
- `evidencias/reputacion/vt_dominio_resumen.txt` — resumen procesado del dominio principal.
- `evidencias/reputacion/vt_dominio2_resumen.txt` — resumen procesado del dominio paralelo.
- `evidencias/reputacion/vt_ip_resumen.txt` — resumen procesado de la IP.
- `evidencias/reputacion/vt_ip_resoluciones_resumen.txt` — listado de los 10 dominios del ecosistema.
- `evidencias/reputacion/urlhaus_futbollibretv.json` — respuesta URLhaus dominio principal.
- `evidencias/reputacion/urlhaus_futbol-libre.json` — respuesta URLhaus dominio paralelo.
- `evidencias/reputacion/urlhaus_ip.json` — respuesta URLhaus IP del servidor.
- `evidencias/reputacion/urlhaus_resumen.txt` — resumen consolidado URLhaus.
- `evidencias/reputacion/vt_dominio_detection.png` — captura visual de VirusTotal del dominio principal.
- `evidencias/reputacion/vt_dominio_details.png` — captura visual de detalles VT.
- `evidencias/reputacion/vt_dominio_relations.png` — captura visual de relaciones VT.
- `evidencias/reputacion/vt_dominio_comunity.png` — captura de comentarios comunidad VT.

---

