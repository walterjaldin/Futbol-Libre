# 3. Inteligencia de Infraestructura (OSINT)

Tras identificar la actividad de tráfico anómalo mediante Burp Suite, se procedió a realizar un análisis de **Open Source Intelligence (OSINT)** sobre los dominios involucrados. Esta fase es crítica para determinar la **reputación de la infraestructura** y entender la estrategia de evasión del atacante.

El análisis de registros **WHOIS** permite responder preguntas clave para la investigación:
1. **Atribución Geográfica:** ¿Dónde se alojan físicamente los datos?
2. **Ciclo de Vida:** ¿Son dominios creados recientemente para una campaña de ataque específica?
3. **Resiliencia Legal:** ¿Se utilizan jurisdicciones "opacas" para evitar solicitudes de baja (takedowns)?

A continuación, se detalla la topología de red que sostiene la operación de `futbollibretv.su`.
# Resumen de Infraestructura Detectada con WHOIS

| Dominio | Antigüedad (Aprox.) | Ubicación de IP | Función en el Ataque |
|---|---|---|---|
| `adexchangerapid.com` | 15 días | California, Estados Unidos (Cloudflare) | Fingerprinting de Hardware |
| `reffpa.com` | 308 días | Teherán, Irán | Redirección Crítica (TDS) |
| `latamvidz1.com` | 105 días | Kiev, Ucrania | Puente de Referencia (*Referer*) |
| `envivoslatam.org` | 126 días | San Mateo, California | Entrega de Video (HLS) |

---

# 2. Análisis Detallado por Nodo

---

# 2.1 `adexchangerapid.com` — Nodo de Fingerprinting

<img width="886" height="628" alt="image" src="https://github.com/user-attachments/assets/7a3c6f64-87a6-4390-aa58-df85d0e08acc" />

Este dominio representa uno de los componentes más sospechosos de la infraestructura observada debido a su reciente creación.

---

## Fecha de Creación

```text
28 de abril de 2026
```

---

## Hallazgo Clave

Al momento de la auditoría, el dominio tenía aproximadamente:

```text
15 días de existencia
```

El uso de dominios recién registrados constituye una táctica común utilizada para:

- Evadir listas negras (*blocklists*)
- Eludir sistemas de reputación
- Rotar infraestructura maliciosa
- Reducir trazabilidad

---

## Privacidad del Registro

El dominio fue registrado mediante:

```text
Namecheap
```

Con protección de identidad a través de:

```text
Withheld for Privacy ehf (Islandia)
```

---

## Interpretación Técnica

La combinación de:

- Registro reciente
- Protección de identidad
- Infraestructura efímera

Sugiere una arquitectura orientada a operaciones de rastreo y telemetría de corta duración.

---

# 2.2 `reffpa.com` — Nodo de Redirección (TDS)

<img width="886" height="602" alt="image" src="https://github.com/user-attachments/assets/32bd0b7b-a261-4fbe-b19d-fca331ea39c8" />

Este dominio actúa como el primer punto de contacto tras la interacción inicial del usuario.

---

## Ubicación Geográfica

La dirección IP asociada:

```text
91.186.207.126
```

Fue identificada en:

```text
Teherán, Irán
```

Bajo el proveedor:

```text
Silverhill Group Holding Ltd
```

---

## Función Técnica

El comportamiento observado corresponde a un:

```text
TDS (Traffic Direction System)
```

Utilizado para:

- Redirección de usuarios
- Segmentación geográfica
- Distribución de campañas
- Encadenamiento publicitario

---

## Anomalía Técnica

El análisis WHOIS reveló que el dominio utiliza servicios de privacidad gestionados desde:

```text
Panamá
```

A través de:

```text
Global Domain Privacy Services Inc
```

---

## Interpretación Forense

La triangulación entre:

- Registro en Panamá
- Hosting en Irán
- Operación dirigida a Latinoamérica

Sugiere una infraestructura diseñada para:

- Resistir solicitudes de baja (*takedowns*)
- Dificultar procesos legales
- Fragmentar jurisdicciones
- Obstaculizar investigaciones

---

# 2.3 `envivoslatam.org` y `latamvidz1.com` — Infraestructura de Contenido

<img width="886" height="702" alt="image" src="https://github.com/user-attachments/assets/541b629f-6499-48c9-8f18-aef6ad48a049" />

<br><br>

<img width="886" height="538" alt="image" src="https://github.com/user-attachments/assets/5c0a3961-10e8-4da5-b531-2cb8d1f351d2" />

Estos dominios conforman la infraestructura responsable de la distribución multimedia observada durante la auditoría.

---

# `envivoslatam.org`

## Fecha de Creación

```text
7 de enero de 2026
```

---

## Función Técnica

El dominio es responsable de:

- Distribución de segmentos `.ts`
- Entrega HLS
- Streaming multimedia
- CDN de contenido

---

## Evidencia Observada

Durante la captura de tráfico se identificó la transferencia de:

```text
MPEG-TS (.ts)
```

Asociados a sesiones activas de reproducción.

---

# `latamvidz1.com`

## Ubicación Detectada

```text
Kiev, Ucrania
(IP: 128.0.104.23)
```

---

## Función Técnica

El dominio funciona como:

```text
Referer Intermediario
```

Facilitando mecanismos de:

- Cross-Site Fetching
- Encubrimiento de origen
- Segmentación de tráfico
- Fragmentación de infraestructura

---

# Interpretación Técnica

La separación entre:

- Sitio visible
- Referer
- Proveedor de contenido
- Infraestructura HLS

Es una táctica utilizada para dificultar:

- Trazabilidad legal
- Bloqueos automatizados
- Correlación de servicios

---

# 3. Interpretación Forense de Resultados

La correlación de los datos obtenidos durante el análisis permite establecer múltiples patrones consistentes con infraestructuras de monetización agresiva y evasión geográfica.

---

# 1. Ecosistema de Evasión

Se identificó el uso combinado de:

- Registradores en Islandia
- Servicios de privacidad en Panamá
- Hosting en Irán
- Infraestructura en Ucrania

---

## Interpretación

Esta descentralización geográfica evidencia una estrategia orientada a:

- Evadir jurisdicciones occidentales
- Reducir capacidad de respuesta legal
- Dificultar solicitudes internacionales
- Fragmentar responsabilidades operativas

---

# 2. Infraestructura Desechable

La antigüedad extremadamente reducida de:

```text
adexchangerapid.com
```

Confirma el uso de dominios efímeros para operaciones de:

- Fingerprinting
- Telemetría
- Rastreo persistente

---

## Objetivo Técnico

Estos dominios son reemplazados antes de que:

- Sistemas de reputación
- Motores anti-malware
- Listas negras
- Plataformas de seguridad

Logren catalogarlos como maliciosos.

---

# 3. Monetización por Afiliación

La persistencia de parámetros detectados durante la captura de tráfico:

```text
btag
click_id
```

Combinada con la inyección de cookies observada en:

```text
reffpa.com
```

Confirma un ecosistema profesional de:

```text
Malvertising
```

Orientado específicamente al mercado latinoamericano y boliviano.

---

# Conclusión Técnica

La infraestructura observada presenta características típicas de operaciones distribuidas orientadas a:

- Monetización mediante afiliación
- Rastreo persistente
- Segmentación geográfica
- Perfilamiento avanzado
- Evasión jurisdiccional

La fragmentación internacional de los componentes técnicos dificulta significativamente:

- La atribución
- La mitigación
- El bloqueo coordinado
- Las acciones legales tradicionales
