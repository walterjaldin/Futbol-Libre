# Sección 5 — Discusión (borrador v1)

**Estado:** Borrador inicial  
**Autor:** Walter Jaldín Gonzales  
**Fecha:** 24 de mayo de 2026  
**Basado en:** Jornadas 1–10, sesiones experimentales A14-N-R1, A14-D-R1, A11-N-R1, A11-D-R1, deobfuscación de scripts Adsterra

---

## 5. Discusión

### 5.1 El modelo de riesgo de los sitios de streaming pirata

Los resultados obtenidos permiten describir un modelo de riesgo estructurado en tres capas superpuestas que afectan al usuario simultáneamente:

**Capa 1 — Identificación pasiva:** Desde el primer segundo de navegación, el dispositivo del usuario es perfilado por `usrpubtrk.com` (Adsterra) sin interacción alguna. El perfil incluye modelo de dispositivo, versión del sistema operativo, versión del navegador y comportamiento de scroll. Este proceso no requiere cookies: la combinación de modelo+OS+versión de Chrome constituye un identificador estable entre sesiones, resistente al borrado de historial y cookies.

**Capa 2 — Monetización agresiva:** El script `aclib.js` configura un popunder que se activa al primer toque sobre el reproductor de video. El destino es determinado por una subasta en tiempo real (RTB) entre anunciantes de la red Adsterra, sin que el operador del sitio ni el usuario tengan control sobre el resultado. En las sesiones experimentales, el popunder entregó sitios de apuestas deportivas (1xbet.com, doradobet.com), con una sesión cargando el SDK de pagos de Stripe para captación de datos bancarios.

**Capa 3 — Exposición a infraestructura de alto riesgo:** El stream HLS se sirve desde TECHOFF SRV LIMITED, clasificado como hosting bulletproof. La IP real del usuario se transmite explícitamente al servidor en el parámetro `&ip=` de la URL del token, quedando registrada en los logs de una infraestructura que acumula más de 117,000 reportes de abuso y opera deliberadamente fuera del alcance de los mecanismos estándar de enforcement de copyright.

La superposición de estas tres capas produce un perfil de riesgo que supera significativamente al de la simple reproducción de contenido pirata, que en otros contextos podría reducirse a un riesgo legal para el usuario. Aquí, el riesgo es técnico, inmediato y no requiere ninguna acción adicional del usuario más allá de la visita al sitio.

---

### 5.2 El ecosistema como infraestructura deliberadamente diseñada

Una observación transversal del análisis OSINT y experimental es que la arquitectura del ecosistema no es accidental. Varios indicadores apuntan a un diseño deliberado orientado a la evasión y la resiliencia:

**Separación funcional por capas de hosting:** El contenido web principal reside en Virtual Systems LLC (Ucrania), los streams en TECHOFF SRV LIMITED (hosting bulletproof, Países Bajos), el backend PHP de streams en SOLLUTIUM (revendedor de Virtual Systems), y los scripts de publicidad en Adsterra (multinacional). Esta separación dificulta que una acción legal o técnica contra un componente derribe el sistema completo.

**Rotación automática de subdominios:** Los seis subdominios de `envivoslatam.org` observados en cuatro sesiones (iaw5b, qbk4f, smjt9q, wf6kt, rci1w, xky9q) sugieren un sistema de load balancing y rotación automática. Si un ISP bloquea un subdominio específico, las sesiones nuevas reciben un subdominio diferente, manteniendo el acceso.

**Dominios de respaldo registrados:** `librefutbol.su`, `librepelota.su` y `envivolibre.com` están registrados bajo el mismo operador pero sin contenido activo, funcionando como reservas para migración rápida si el dominio principal es bloqueado o retirado.

**Registros de corta duración:** `envivoslatam.org` fue registrado en enero de 2026 (4 meses antes del estudio) con privacidad máxima (Dynadot Super Privacy Service). El dominio principal `futbol-libre.su` usa el TLD `.su` (Soviet Union, retirado pero aún funcional), que históricamente presenta menor respuesta a solicitudes de takedown que TLDs gestionados por ICANN.

Este patrón de diseño es consistente con lo descrito en la literatura de seguridad sobre ecosistemas de streaming pirata de gran escala [REFERENCIA], donde la resiliencia operativa es un objetivo explícito de diseño.

---

### 5.3 La ofuscación de scripts como barrera al análisis

El esquema de ofuscación identificado en los 5 scripts de Adsterra merece un análisis específico. Se trata de un patrón homogéneo: un array de strings codificadas en Base64 con un alfabeto reordenado (mayúsculas y minúsculas intercambiadas respecto al estándar), referenciadas mediante índices hexadecimales que son restados por un offset específico por script. Este esquema:

1. **Impide la inspección directa del código fuente:** en su forma ofuscada, el código es una secuencia de referencias a índices numéricos sin significado semántico aparente.
2. **Dificulta la búsqueda automatizada de strings:** los nombres de funciones, URLs de endpoints y dominios de tracking aparecen exclusivamente como índices, no como cadenas de texto legibles.
3. **Utiliza offsets variables por script** (0x93, 0x1ef, 0x1b6), impidiendo que una misma herramienta de deobfuscación funcione sin conocer el offset de cada archivo.

Este nivel de ofuscación supera al típicamente empleado por redes publicitarias legítimas y se aproxima al de muestras de malware. La presencia de mecanismos de anti-detección adicionales (Headless detection, Puppeteer, CDP, DevTools) sugiere que Adsterra ha diseñado su plataforma específicamente para operar en entornos de alto escrutinio, donde sus scripts son objetivo de bloqueo o análisis.

La implicación para la metodología de este estudio es que las técnicas de análisis estático (descarga del script + deobfuscación fuera de línea) son necesarias pero insuficientes: el comportamiento real de los scripts depende de parámetros de configuración recibidos del servidor de Adsterra en tiempo de ejecución, que solo pueden observarse mediante análisis dinámico en un navegador real. Para este estudio, la combinación de ambas técnicas (estática para los strings ofuscados, dinámica para el comportamiento observado en las sesiones experimentales) permitió reconstruir la funcionalidad completa de la infraestructura publicitaria.

---

### 5.4 Ineficacia de la protección DNS como medida individual

Los resultados del diseño 2×2 (Android 14/11 × con/sin AdGuard DNS) revelan que la protección DNS-over-TLS mediante AdGuard no ofrece ninguna reducción de los riesgos de tracking y publicidad agresiva identificados. Este hallazgo contradice la recomendación común en comunidades técnicas de adoptar resolvers DNS alternativos como medida de privacidad.

La explicación técnica es directa: los dominios de Adsterra (usrpubtrk.com, acscdn.com, adexchangerapid.com) no están incluidos en las listas de bloqueo estándar de AdGuard DNS público porque son infraestructura de una red publicitaria legítimamente registrada. La distinción entre publicidad legítima y publicidad abusiva no es un criterio binario en los filtros DNS.

Esto sugiere que la mitigación efectiva requiere intervención en capas más profundas: bloqueo a nivel de Content Security Policy (CSP) en el servidor, uso de extensiones de navegador con listas de bloqueo específicas de redes publicitarias (uBlock Origin con listas de Adsterra), o VPNs que filtren a nivel de HTTP/HTTPS. Ninguna de estas medidas está disponible por defecto en un dispositivo Android estándar.

---

### 5.5 Diferencias entre versiones de Android y sus implicaciones

La comparativa entre Android 14/Chrome 113 y Android 11/Chrome 91 revela una diferencia importante en la riqueza del fingerprint: Chrome 113 implementa la especificación completa de User-Agent Client Hints (UA-CH), enviando seis campos incluyendo el brand list completo y el indicador de dispositivo móvil. Chrome 91 solo envía cuatro campos.

Sin embargo, esta diferencia no implica mayor protección para usuarios de Android 11. En ambos casos, la combinación de modelo de dispositivo + versión de SO + versión de Chrome es suficientemente específica para identificación cross-session. La reducción de campos en Chrome 91 es una limitación de implementación, no una protección de privacidad.

Este hallazgo tiene implicaciones relevantes para el contexto boliviano, donde la adopción de versiones más antiguas de Android es significativamente mayor que en mercados de alto ingreso. Según datos de distribución de Android en Bolivia, versiones anteriores a Android 10 representan una fracción importante de los dispositivos en uso. Estos usuarios enfrentan los mismos vectores de exposición que los documentados en este estudio, posiblemente con capacidades de protección adicionales menores.

---

### 5.6 El popunder como vector de fraude financiero

La variabilidad del destino RTB del popunder constituye el hallazgo de mayor impacto directo sobre el usuario. En la sesión A11-D-R1, el popunder abrió `www.doradobet.com/registro_regalo_bienvenida_500.htm`, una página de registro con un "bono de bienvenida de $500" que cargó el SDK de pagos de Stripe.

Este mecanismo describe un vector de fraude financiero de tres pasos:

1. El usuario visita futbol-libre.su para ver un partido de fútbol
2. Al tocar el reproductor de video, se abre automáticamente (sin consentimiento) una nueva pestaña a un sitio de apuestas
3. El sitio de apuestas presenta un formulario de registro con incentivo económico y solicita datos de pago via Stripe

El operador de futbol-libre.su no controla este proceso más allá de haber configurado su cuenta Adsterra con el ZoneId 10652966. El sistema RTB selecciona automáticamente al anunciante ganador, quien puede ser cualquier actor dispuesto a pagar el costo por clic, incluyendo sitios de apuestas no regulados en Bolivia, plataformas de phishing, o distribuidores de malware.

Artículos de ciberseguridad latinoamericanos documentan consecuencias financieras directas de este tipo de exposición: vaciamiento de cuentas bancarias vía transferencias no autorizadas, solicitudes de préstamos fraudulentas en nombre de la víctima, y suscripciones no deseadas a servicios premium. Los datos técnicos de este estudio proveen la explicación mecanística de cómo ocurren estas consecuencias.

---

### 5.7 Vulnerabilidades del servidor — implicaciones para el ecosistema completo

La identificación de CVE-2023-38408 (CVSS 9.8) en el servidor principal de futbol-libre.su (OpenSSH 8.7 en 185.254.197.23) tiene implicaciones que trascienden el sitio individual. Un compromiso exitoso del servidor principal permitiría a un atacante:

1. Acceder al código fuente del sitio y la base de datos de usuarios registrados
2. Modificar los scripts de publicidad cargados por el sitio (incluyendo aclib.js y suv5.js si estuvieran servidos localmente) para inyectar código malicioso adicional
3. Redirigir el tráfico de todos los usuarios del sitio a contenido controlado por el atacante

Similarmente, la exposición de xmlrpc.php en pelotalibretv.su sin protección habilita ataques de brute force de alta velocidad mediante `system.multicall`, que puede comprometer credenciales administrativas del WordPress y por extensión el servidor completo (138.226.244.112, SOLLUTIUM). Un webshell subido vía `wp.uploadFile` con credenciales válidas comprometería toda la infraestructura del sitio hermano.

Estas vulnerabilidades no afectan directamente al usuario visitante (quien no tiene acceso al servidor), pero sí amplifican el riesgo: si el servidor es comprometido por un tercero, los usuarios del sitio quedan expuestos a contenido malicioso inyectado en el stream o en los scripts, sin ningún aviso.

---

### 5.8 Limitaciones del estudio

**Representatividad del perfil de usuario:** Las sesiones experimentales usaron emuladores AVD con configuraciones controladas de laboratorio. Un usuario real en Bolivia podría tener instaladas aplicaciones adicionales que modifiquen el comportamiento del navegador, versiones más antiguas de Chrome, o configuraciones de red corporativas/ISP que alteren el tráfico observado.

**Número de repeticiones:** El protocolo experimental preveía 5 repeticiones por perfil. Este estudio documenta 1-2 repeticiones por perfil. El análisis de variabilidad entre sesiones (especialmente en el destino del popunder RTB) requeriría más repeticiones para caracterizar estadísticamente la distribución de destinos.

**Temporalidad de los hallazgos:** El ecosistema de futbol-libre.su es dinámico: los subdominios TECHOFF rotan, el ZoneId Adsterra puede cambiar, y el destino RTB varía por sesión. Los hallazgos son válidos para el período de análisis (mayo 2026) y pueden variar en análisis futuros.

**Acceso a listas de bloqueo:** No se verificó experimentalmente si versiones de AdGuard con listas extendidas (AdGuard for Android, con filtros adicionales) ofrecerían mayor protección. El estudio evaluó únicamente AdGuard DNS público (94.140.14.14 / dns.adguard.com).

**GA4 cross-reference:** La verificación de si el ID G-L0N11PVD63 aparece en otros dominios independientes del ecosistema no pudo completarse via herramientas como SpyOnWeb.com durante el período de análisis.

---

### 5.9 Implicaciones para políticas públicas y recomendaciones

Los hallazgos de este estudio sugieren que la exposición de usuarios bolivianos al usar sitios de streaming pirata no se limita a infringir derechos de autor. El riesgo técnico documentado justifica consideraciones adicionales:

**Para usuarios:**
- El uso de un resolver DNS alternativo (AdGuard, Cloudflare 1.1.1.1) es insuficiente como única medida de protección
- Extensiones de navegador con bloqueo activo de scripts (uBlock Origin con listas Adsterra) reducirían efectivamente V1-V3 de la Tabla 6
- La apertura de cualquier nueva pestaña generada automáticamente al interactuar con el reproductor de video debe ser tratada como contenido no solicitado

**Para ISPs bolivianos:**
- El bloqueo a nivel DNS de dominios como usrpubtrk.com, acscdn.com y adexchangerapid.com protegería a todos los usuarios del ISP, independientemente de sus configuraciones individuales
- La infraestructura TECHOFF (AS48090) puede ser bloqueada a nivel de prefijo BGP (195.178.110.0/24, 93.123.109.0/24) si se determina que su uso para streaming pirata justifica acción en el plano del transporte

**Para AGESIC/reguladores regionales:**
- El modelo de monetización documentado (Adsterra + RTB + popunder) opera en un área gris regulatoria: no es malware en sentido estricto, pero produce efectos económicos y de privacidad equivalentes
- La exposición de IP reales de usuarios bolivianos a TECHOFF SRV LIMITED (jurisdicción UK/NL) plantea interrogantes sobre aplicación de normativas de protección de datos

---
