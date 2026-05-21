# Metodología de la investigación

---

## 1. Diseño de investigación

La presente investigación corresponde a un estudio **observacional, no experimental, descriptivo y analítico**, con enfoque **mixto (cuantitativo y cualitativo)**.

Es observacional porque se centra en el registro y análisis del comportamiento observable del sitio web desde la perspectiva del cliente, sin manipular deliberadamente variables del sistema analizado.

Es no experimental debido a que no se realizan intervenciones orientadas a modificar el comportamiento del sitio ni se ejecutan pruebas de explotación activa.

Es descriptivo porque documenta las características técnicas observadas durante la navegación controlada.

Es analítico porque interpreta los hallazgos obtenidos y los correlaciona con modelos de riesgo y marcos de referencia en ciberseguridad.

El enfoque mixto permite combinar métricas cuantificables de tráfico y comportamiento de red con análisis cualitativo de patrones observados durante las sesiones experimentales.

---

## 2. Pregunta de investigación

### Pregunta principal

¿Qué riesgos observables de seguridad y exposición de información enfrenta un usuario al interactuar con el dominio `futbollibretv.su` durante sesiones controladas de navegación?

### Subpreguntas

- ¿Qué dominios, subdominios y servicios externos participan durante la navegación?
- ¿Qué patrones de comunicación HTTP/HTTPS se generan durante la interacción con el sitio?
- ¿Existen mecanismos de tracking o fingerprinting orientados a la identificación del usuario o del entorno cliente?
- ¿Se observan redirecciones, cargas dinámicas o interacciones con infraestructura externa potencialmente riesgosa?
- ¿Qué información del entorno cliente puede quedar expuesta durante la navegación?
- ¿Cómo pueden clasificarse los hallazgos observados según marcos de referencia como OWASP, NIST y MITRE ATT&CK?

---

## 3. Objetivo general

Analizar el comportamiento de red, las comunicaciones externas y los mecanismos de tracking presentes durante la navegación controlada en el dominio `futbollibretv.su`, con el fin de identificar riesgos observables de seguridad y exposición de información para el usuario final.

---

## 4. Objetivos específicos

- Identificar dominios y subdominios involucrados durante la navegación.
- Analizar solicitudes HTTP y HTTPS generadas durante las sesiones experimentales.
- Identificar servicios externos, infraestructura de terceros y recursos cargados por la plataforma.
- Detectar mecanismos de tracking y posibles técnicas de fingerprinting.
- Evaluar patrones de redirección y comunicación con infraestructura externa.
- Determinar qué información observable del entorno cliente puede quedar expuesta.
- Correlacionar los hallazgos técnicos con modelos de clasificación de riesgos como OWASP, NIST y MITRE ATT&CK.

---

## 5. Hipótesis de investigación

### Hipótesis principal (H1)

La interacción controlada con el dominio `futbollibretv.su` expone al usuario a riesgos observables de seguridad y privacidad derivados de comunicaciones con infraestructura externa, mecanismos de tracking y comportamiento dinámico del lado cliente.

### Hipótesis nula (H0)

La interacción controlada con el dominio `futbollibretv.su` no expone al usuario a riesgos observables significativos de seguridad o privacidad durante las sesiones experimentales.

---

## 6. Alcance y delimitación

La investigación se limita al análisis del comportamiento observable desde el lado cliente durante sesiones controladas de navegación ejecutadas en un entorno experimental aislado.

El alcance incluye:

- tráfico de red generado durante la navegación
- solicitudes HTTP y HTTPS
- resoluciones DNS
- dominios y servicios externos involucrados
- recursos cargados dinámicamente
- mecanismos de tracking observables
- patrones de fingerprinting detectables desde el cliente
- redirecciones y comportamiento de navegación inducida

El estudio no incluye:

- explotación activa de vulnerabilidades
- modificación deliberada del comportamiento del sitio
- evasión de controles de seguridad
- acceso no autorizado a infraestructura externa
- análisis interno de servidores o sistemas no accesibles desde el cliente
- ejecución deliberada de archivos potencialmente maliciosos

---

## 7. Unidad de análisis

La unidad principal de análisis corresponde a la **sesión controlada de navegación**.

Cada sesión experimental representa una ejecución independiente del protocolo definido, realizada desde un estado limpio del entorno virtualizado, con el objetivo de observar el comportamiento técnico del sitio bajo condiciones reproducibles.

Adicionalmente, se consideran como unidades secundarias de observación:

- eventos HTTP/HTTPS
- solicitudes DNS
- recursos externos cargados
- eventos de redirección
- patrones de tracking
- interacciones dinámicas observables

---

## 8. Variables e indicadores

| Variable | Indicador | Métrica | Instrumento |
|---------|-----------|---------|-------------|
| Dominios externos | cantidad de dominios contactados | conteo por sesión | Burp Suite / Wireshark |
| Infraestructura IP | IPs observadas | conteo y clasificación | Wireshark |
| Solicitudes HTTP/HTTPS | volumen de tráfico web | número de requests | Burp Suite |
| Redirecciones | eventos de navegación inducida | frecuencia por sesión | Burp Suite / Logger |
| Tracking | cookies y recursos de terceros | presencia / cantidad | Burp Suite / navegador |
| Fingerprinting | acceso a artefactos del entorno cliente | presencia de patrones | análisis HTTP / navegador |
| Recursos externos | scripts, iframes, CDNs | conteo y clasificación | Burp Suite |
| Exposición de información | metadatos enviados por el cliente | observación cualitativa | Burp Suite / Wireshark |

---

## 9. Instrumentos de recolección

Para la ejecución del estudio se emplean los siguientes instrumentos técnicos:

- VMware Workstation (virtualización del entorno experimental)
- Windows 10 (sistema operativo del entorno cliente)
- Firefox (navegador de prueba)
- Burp Suite (interceptación y análisis HTTP/HTTPS)
- Wireshark (captura y análisis de tráfico de red)
- Logger++ (registro detallado de tráfico HTTP)
- Highlighter and Extractor (HaE) para clasificación rápida de patrones observables

---

## 10. Enfoque metodológico

El proceso metodológico se desarrolla en múltiples fases complementarias:

### Reconocimiento pasivo (OSINT)

Orientado a recopilar información pública sobre el dominio antes de la interacción experimental.

Incluye:

- observación de DNS
- perfil de certificados
- reputación pública
- inteligencia pasiva disponible

### Validación estática

Orientada a caracterizar el comportamiento inicial del sitio con interacción mínima.

Incluye:

- inspección inicial
- análisis de cabeceras
- recursos cargados
- cookies iniciales

### Sesiones experimentales dinámicas

Orientadas a observar comportamiento emergente durante interacción controlada.

Incluye:

- navegación
- interacción con elementos del flujo principal
- observación de recursos dinámicos
- registro de tráfico

---

## 11. Técnicas de análisis

### Análisis cuantitativo

Se aplicará estadística descriptiva sobre variables observables, incluyendo:

- frecuencia de solicitudes
- número de dominios externos
- cantidad de recursos cargados
- eventos de redirección
- indicadores de tracking

### Análisis cualitativo

Se realizará clasificación temática de patrones observados, incluyendo:

- comportamiento sospechoso
- tracking agresivo
- navegación inducida
- carga dinámica de recursos
- exposición de información del entorno cliente

### Correlación con marcos de referencia

Los hallazgos serán interpretados utilizando:

- OWASP
- NIST
- MITRE ATT&CK

---

## 12. Limitaciones

Las principales limitaciones del estudio son:

- el análisis se restringe al comportamiento observable desde el cliente
- no existe acceso a infraestructura interna del dominio analizado
- ciertos servicios externos pueden utilizar infraestructura distribuida y dinámica
- el comportamiento del sitio puede variar según fecha, región o condiciones de navegación
- algunos mecanismos de tracking podrían activarse bajo interacciones específicas no observadas

---

## 13. Consideraciones éticas

La investigación se realiza exclusivamente con fines académicos.

Todas las pruebas son ejecutadas dentro de un entorno virtualizado, aislado y controlado.

No se realizan actividades orientadas a:

- comprometer sistemas externos
- alterar el comportamiento del dominio analizado
- explotar vulnerabilidades
- acceder sin autorización a recursos restringidos

El estudio mantiene un enfoque estrictamente observacional.

---

## 14. Reproducibilidad

Con el fin de garantizar reproducibilidad metodológica:

- cada sesión se ejecuta desde un snapshot limpio
- el entorno experimental es documentado técnicamente
- se conservan registros HTTP y capturas de tráfico
- se documentan procedimientos, observaciones y evidencia
- las sesiones siguen un protocolo experimental definido

Esto permite repetir el proceso bajo condiciones equivalentes y validar la consistencia de los hallazgos.

---