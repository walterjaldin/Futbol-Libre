### Análisis de Carga Útil y Explotación de Vulnerabilidades

Mediante el análisis del artefacto identificado con el hash SHA256 (`dc1d54dab6ec8c00f70137927504e4f222c8395f10760b6beecfcfa94e08249f`), se determinó que la infraestructura no solo actúa como un nodo de redirección, sino que participa en la distribución de vectores de ataque.

#### Hallazgos Clave del Artefacto:
* **Firma de Exploit:** Se identificó una firma de **Remote Code Execution (RCE)** para el framework **ThinkPHP** (`invokefunction&function=call_user_func_array...`), lo que sugiere que el servidor está siendo utilizado para comprometer otros activos o alojar código malicioso activo.
* **Comportamiento de Spyware:** El análisis en Sandbox confirmó que el artefacto contacta con **8 dominios y 9 hosts distintos**, realizando peticiones POST para exfiltrar archivos del dispositivo hacia servidores externos.
* **Vector de Distribución:** Se encontró que este hash está vinculado a un archivo comprimido (`.zip`) que utiliza técnicas de ingeniería social agresiva para su distribución.


# Análisis de Reputación y Geolocalización — Nodo `reffpa.com`

El análisis profundo del host:

```text
reffpa.com
```

Revela múltiples inconsistencias entre su registro administrativo y su infraestructura operativa, lo que sugiere una arquitectura diseñada para dificultar la atribución y resiliente frente a procesos de mitigación.

---
<img width="1459" height="323" alt="image" src="https://github.com/user-attachments/assets/45f882b1-d15a-4bd4-80b3-960bc54fc491" />


# Infraestructura de Red

A diferencia de otros nodos observados durante la auditoría que utilizan proveedores ampliamente conocidos como:

```text
Cloudflare
```

El dominio analizado opera bajo el ASN:

```text
ASN 49999
(Hydra Communications Ltd)
```

---

## Hallazgo Técnico

Aunque diversas herramientas de geolocalización sitúan parcialmente la infraestructura en:

```text
Estados Unidos
```

El análisis correlacionado de tráfico y hosting previamente observado indicó actividad asociada a:

```text
Teherán, Irán
```

Bajo el proveedor:

```text
Silverhill Group Holding Ltd
```

---

## Interpretación Técnica

La discrepancia entre:

- ASN reportado
- Geolocalización visible
- Hosting efectivo
- Registro administrativo

Es consistente con el uso de infraestructura:

```text
Bulletproof Hosting
```

---

## Características de este tipo de infraestructura

- Baja cooperación internacional
- Resistencia a solicitudes de baja (*takedowns*)
- Rotación rápida de servicios
- Fragmentación jurisdiccional
- Encubrimiento operacional

---

# Servidores de Nombres (NS)

Durante el análisis WHOIS se identificó el uso de:

```text
cloudns.net
```

Como proveedor DNS.

---

## Implicaciones Técnicas

El uso de DNS administrado facilita:

- Cambios rápidos de zonas DNS
- Rotación de infraestructura
- Balanceo dinámico
- Evasión de bloqueos
- Alta disponibilidad operacional

---

## Interpretación Forense

La combinación de:

- Hosting distribuido
- DNS dinámico
- Infraestructura offshore

Sugiere una arquitectura optimizada para persistencia y evasión.

---
<img width="886" height="400" alt="image" src="https://github.com/user-attachments/assets/a84a07fa-0865-403c-857f-f768ff54b84c" />

<br><br>

<img width="1423" height="886" alt="image" src="https://github.com/user-attachments/assets/591abe59-627d-49ca-ba62-f9d0837b2801" />

<br><br>

<img width="1459" height="867" alt="image" src="https://github.com/user-attachments/assets/d491429b-bffe-45e1-bfe4-5f9c0f96ce9b" />


# Evidencia de Cross-Site Tracking y Red de Afiliados

El análisis WHOIS reveló que el registrador asociado al dominio corresponde a:

```text
GLOBAL DOMAIN PRIVACY SERVICES INC
(Panamá)
```

---

# Correlación de Infraestructura

La investigación permitió correlacionar múltiples dominios asociados al correo de abuso:

```text
abuse@pananames.com
```

---

# Clasificación de Dominios Relacionados

| Categoría de Dominio | Ejemplos Detectados | Implicación Técnica |
|---|---|---|
| Contenido Adulto | `8tube.xxx`, `sexpose.com`, `xbabe.com` | Infraestructura multitemática de tráfico gris |
| Tracking y Ads | `mobtrks.com`, `c4tracking01.com`, `adsvids.com` | Red dedicada a tracking y monetización |
| Descargas/Software | `meremay.descargar`, `allwarez4dl.descargar` | Posible distribución de malware tipo Loader |

---

# Interpretación Técnica

La correlación entre dominios de:

- Publicidad agresiva
- Tracking
- Contenido adulto
- Descargas sospechosas

Sugiere la existencia de una infraestructura industrializada orientada a:

- Captación masiva de tráfico
- Monetización por afiliación
- Recolección de telemetría
- Distribución potencial de malware

---

# Pivoting por Identidad de Registro

El uso del correo:

```text
abuse@pananames.com
```

Permite agrupar una gran cantidad de dominios vinculados operativamente.

---

## Hallazgo Relevante

El análisis OSINT permitió identificar aproximadamente:

```text
198 dominios relacionados
```

Asociados al mismo ecosistema administrativo.

---

## Interpretación

Esto demuestra que:

```text
reffpa.com
```

No corresponde a un actor aislado, sino a una red estructurada de servicios vinculados a:

- Malvertising
- Tracking
- Redirecciones
- Distribución de contenido gris

---

# Análisis de Cloaking (Ocultamiento)

Durante el análisis se documentó una discrepancia significativa entre:

- La respuesta HTTP visible
- La carga útil real asociada al hash analizado

---

## Hallazgo

La URL devolvía un:

```text
404 Not Found
```

Mientras que el hash asociado mantenía correlación histórica con cargas útiles previamente observadas.

---

## Interpretación Técnica

Este comportamiento corresponde a técnicas de:

```text
Cloaking
```

Utilizadas para:

- Evadir escáneres automáticos
- Dificultar análisis sandbox
- Ocultar payloads reales
- Engañar motores de reputación

---

# Validación de Vectores de Explotación

La investigación reveló firmas vinculadas a:

```text
Remote Code Execution (RCE)
```

Asociadas al framework:

```text
ThinkPHP
```

---

## Implicación Técnica

La correlación histórica sugiere reutilización de:

- Kits de explotación
- Payloads antiguos
- Plantillas automatizadas
- Infraestructura previamente comprometida

---

# Mapeo de Ingeniería Social

El análisis OSINT vinculó el hash investigado con archivos de distribución sospechosa, incluyendo nombres como:

```text
aplicacion para quitar ropa a una imagen.zip.zip
```

---

## Interpretación Técnica

El uso de nombres llamativos o provocativos constituye una técnica clásica de:

```text
Social Engineering Bait
```

---

## Objetivo

Este tipo de archivos busca explotar:

- Curiosidad del usuario
- Ingeniería social emocional
- Impulsividad
- Descarga voluntaria de malware

---

# Análisis Forense del Objeto (SHA256)

<img width="1459" height="543" alt="image" src="https://github.com/user-attachments/assets/15dc994d-3379-4b03-8609-7438c3b3e8c8" />

El análisis del hash:

```text
dc1d54dab6ec8c00f70137927504e4f222c8395f10760b6beecfcfa94e08249f
```

Resulta clave para establecer persistencia y reutilización de infraestructura ofensiva.

---

# Identificación del Objeto

<img width="1459" height="546" alt="image" src="https://github.com/user-attachments/assets/527461b6-94c0-4f49-a451-07729066f877" />

El artefacto fue identificado como:

```text
404.htm
```

Correspondiendo a una página de error modificada o inyectada.

---

# Correlación Histórica

Se identificaron coincidencias históricas del mismo hash en muestras asociadas a:

- 2018
- 2019

---

## Asociaciones Detectadas

Las coincidencias históricas vinculan el hash con:

- Explotación de ThinkPHP
- Payloads automatizados
- Ejecutables sospechosos como:

```text
MediaPulse_WTR_LIVE.exe
```

---

# Interpretación Técnica

La reutilización persistente del mismo objeto digital sugiere:

- Reaprovechamiento de kits de explotación
- Uso de infraestructura heredada
- Automatización operacional
- Persistencia de campañas previas

---

# Redacción Técnica

La investigación mediante fuentes abiertas (*OSINT*) confirmó que el dominio:

```text
reffpa.com
```

Forma parte de una infraestructura de gran escala gestionada mediante servicios de privacidad radicados en Panamá y distribuida sobre jurisdicciones con limitada cooperación internacional.

---

## Correlación de Dominios

La vinculación del correo de abuso:

```text
abuse@pananames.com
```

Con múltiples dominios relacionados a:

- Tracking
- Publicidad agresiva
- Redirecciones
- Descargas sospechosas

Demuestra la existencia de una operación profesionalizada de:

```text
Malvertising
```

---

## Persistencia Histórica

Asimismo, la identificación de artefactos digitales con hashes persistentes desde:

```text
2018
```

Sugiere reutilización continua de vectores de explotación previamente asociados a compromisos de servidores web y frameworks vulnerables.

---

# Conclusión Técnica

La evidencia recopilada indica que la infraestructura analizada no corresponde a campañas aisladas de publicidad invasiva, sino a un ecosistema distribuido de:

- Tracking persistente
- Fingerprinting
- Malvertising
- Cloaking
- Ingeniería social
- Reutilización de payloads históricos

La correlación entre infraestructura internacional, dominios efímeros y reutilización de artefactos ofensivos eleva significativamente el nivel de riesgo para usuarios finales dentro del ecosistema Android y web móvil en Bolivia.
