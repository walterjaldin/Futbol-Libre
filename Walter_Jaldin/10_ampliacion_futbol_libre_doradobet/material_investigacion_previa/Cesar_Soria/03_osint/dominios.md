# Identificación de dominios

---

## 1. Objetivo

Documentar los dominios y subdominios asociados al dominio objetivo mediante técnicas de reconocimiento pasivo (OSINT), con el propósito de establecer una línea base preliminar de infraestructura antes de la fase experimental activa.

---

## 2. Dominio principal

El dominio principal definido como objeto de estudio en la presente investigación es:

```text
futbollibretv.su
```

Este dominio constituye la unidad principal de observación durante las fases experimentales posteriores.

---

## 3. Fuentes utilizadas

La identificación pasiva de dominios se realizó mediante herramientas de inteligencia de fuentes abiertas.

### Fuentes empleadas

- VirusTotal
- DNSDumpster
- registros DNS históricos públicamente accesibles
- observación pasiva de infraestructura disponible públicamente

## 4. Subdominios identificados pasivamente

Durante la fase de reconocimiento pasivo se identificaron los siguientes subdominios asociados al dominio objetivo:

| Subdominio |
|------------|
| cdn1.futbollibretv.su |
| cdn.futbollibretv.su |
| www.futbollibretv.su |

Estos registros corresponden exclusivamente a observaciones obtenidas mediante fuentes pasivas y no implican validación funcional activa durante esta etapa.

---

## 5. Alcance del análisis

En esta fase el análisis se limita estrictamente a información obtenida mediante reconocimiento pasivo, sin interacción directa con el dominio objetivo.

Se consideran dentro del alcance:

- dominio raíz
- subdominios identificados públicamente
- infraestructura DNS observable
- IPs asociadas disponibles en fuentes abiertas
- contexto de infraestructura públicamente accesible

---

## 6. Delimitación metodológica

La presente fase no incluye:

- navegación directa al dominio
- solicitudes HTTP/HTTPS activas
- interacción con recursos web
- análisis dinámico del comportamiento del sitio
- observación experimental de tráfico de red
- validación funcional de subdominios identificados

Los dominios externos observados durante sesiones experimentales posteriores serán documentados en fases independientes del estudio.

---

## 7. Observaciones técnicas

Durante la fase de reconocimiento pasivo se observó:

- existencia de múltiples subdominios asociados al dominio principal
- diferenciación nominal entre recursos públicamente observables
- presencia de infraestructura indexada en fuentes OSINT

Estas observaciones constituyen una línea base preliminar para comparación con los hallazgos obtenidos durante el análisis experimental dinámico.

---

## 8. Limitaciones

La información obtenida mediante OSINT presenta limitaciones inherentes:

- posible desactualización temporal de registros públicos
- cambios dinámicos en infraestructura
- dependencia de fuentes externas de indexación
- ausencia de validación funcional directa

Por ello, los hallazgos de esta fase deben interpretarse como contexto preliminar y no como evidencia concluyente del comportamiento operativo actual.