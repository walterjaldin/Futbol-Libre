# Metodología de la investigación

---

## 1. Objetivo general

Analizar el comportamiento de red, las comunicaciones externas y los mecanismos de tracking presentes durante la navegación en el dominio `futbollibretv.su`, mediante un entorno experimental controlado.

---

## 2. Objetivos específicos

- Identificar dominios y subdominios involucrados durante la navegación.
- Analizar solicitudes HTTP/HTTPS generadas por el sitio.
- Identificar servicios externos utilizados por la plataforma.
- Detectar mecanismos de tracking y fingerprinting.
- Correlacionar los hallazgos con modelos de clasificación de riesgos como OWASP y MITRE ATT&CK.
- Evaluar la exposición de información del usuario durante sesiones de navegación.

---

## 3. Tipo de investigación

La presente investigación corresponde a un análisis experimental de carácter observacional y descriptivo.

El estudio se centra en la observación del comportamiento del sitio web y de las comunicaciones generadas durante sesiones controladas de navegación, sin realizar explotación activa ni modificación deliberada de los sistemas analizados.

---

## 4. Enfoque metodológico

Se empleó un enfoque práctico basado en:

- análisis de tráfico de red
- interceptación de tráfico HTTP/HTTPS
- reconocimiento pasivo (OSINT)
- correlación de datos de red y aplicación

El análisis se realizó mediante sesiones experimentales independientes ejecutadas dentro de un entorno virtualizado y aislado.

---

## 5. Variables analizadas

| Variable | Descripción |
|---|---|
| Dominios | Servicios y dominios contactados |
| Direcciones IP | Infraestructura observada |
| Solicitudes HTTP/HTTPS | Comunicación entre cliente y servidor |
| Redirecciones | Flujo de navegación |
| Tracking | Recolección de datos del usuario |
| Fingerprinting | Identificación del entorno y navegador |
| Recursos externos | Scripts, CDN y servicios de terceros |

---

## 6. Escenarios experimentales

La investigación se divide en múltiples sesiones experimentales, cada una orientada a observar diferentes comportamientos del sitio analizado.

Los escenarios incluyen:

- navegación pasiva
- interacción mínima
- reproducción de contenido multimedia
- interacción con elementos dinámicos
- observación de persistencia y tracking

Cada sesión es ejecutada desde un estado limpio de la máquina virtual.

---

## 7. Alcance

El estudio se limita al análisis del comportamiento observable desde el lado cliente durante sesiones controladas de navegación.

El alcance incluye:

- tráfico de red
- solicitudes HTTP/HTTPS
- resoluciones DNS
- recursos cargados
- servicios externos involucrados

No se realizaron actividades orientadas a:

- explotación de vulnerabilidades
- alteración de servicios
- evasión de mecanismos de seguridad
- acceso no autorizado

---

## 8. Limitaciones

Las principales limitaciones del estudio son:

- el análisis se limita al tráfico observable desde el cliente
- no se tiene acceso a infraestructura interna del sitio
- algunos servicios externos utilizan cifrado y CDN distribuidos
- la infraestructura observada puede variar dinámicamente

Asimismo, ciertos mecanismos de tracking podrían activarse únicamente bajo interacciones específicas no cubiertas durante las sesiones iniciales.

---

## 9. Consideraciones éticas

La investigación fue realizada únicamente con fines académicos y educativos.

Todas las pruebas se ejecutaron dentro de un entorno aislado y controlado, evitando afectar sistemas externos o terceros.

No se realizaron actividades de explotación activa ni acciones orientadas a comprometer la disponibilidad, integridad o confidencialidad de los servicios analizados.

---

## 10. Reproducibilidad

Con el fin de garantizar la reproducibilidad de los resultados:

- se utilizó un snapshot limpio antes de cada sesión
- se documentó la configuración del entorno experimental
- se conservaron capturas de tráfico y registros HTTP
- se registraron los procedimientos ejecutados durante cada prueba

Esto permite repetir las sesiones bajo condiciones similares y validar los hallazgos obtenidos.

---
