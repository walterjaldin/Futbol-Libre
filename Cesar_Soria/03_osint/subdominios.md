# Resolución pasiva de subdominios

---

## 1. Objetivo

Documentar la resolución pasiva observable de subdominios asociados al dominio objetivo, con el fin de caracterizar relaciones entre subdominios e infraestructura IP antes de la fase experimental activa.

---

## 2. Fuentes utilizadas

La información presentada en esta sección fue obtenida mediante técnicas de reconocimiento pasivo (OSINT).

### Fuentes empleadas

- VirusTotal
- DNSDumpster
- observación pasiva de registros DNS históricos

### Fecha de consulta

**Fecha de consulta:** 2026-05-04

**Nota metodológica:**  
La resolución observada corresponde a fuentes públicas indexadas y puede reflejar estados históricos o cambios dinámicos en la infraestructura.

---

## 3. Subdominios e IPs observadas

Durante la fase de reconocimiento pasivo se observaron las siguientes asociaciones entre subdominios e infraestructura IP.

| Subdominio | IP(s) observadas |
|-----------|------------------|
| cdn1.futbollibretv.su | 194.42.205.18 |
| cdn.futbollibretv.su | 169.150.236.99 / 169.150.236.98 / 169.150.236.100 |
| www.futbollibretv.su | 194.42.205.19 / 128.0.104.23 |
| futbollibretv.su | 185.254.197.23 / 194.42.205.18 / 138.226.244.112 |

---

## 4. Observaciones técnicas

A partir de la información recolectada se observa:

- asociación de múltiples subdominios con infraestructura IP públicamente observable
- presencia de múltiples direcciones IP vinculadas a determinados subdominios
- variabilidad de resolución observable entre recursos relacionados con el dominio objetivo

Estas observaciones describen únicamente relaciones visibles en fuentes pasivas.

---

## 5. Alcance del análisis

En esta fase se consideran:

- asociaciones subdominio-IP
- resolución DNS pasiva observable
- registros históricos indexados
- contexto preliminar de infraestructura

---

## 6. Delimitación metodológica

La presente sección no incluye:

- resolución DNS activa
- validación funcional de conectividad
- pruebas de disponibilidad
- confirmación operativa en tiempo real
- interacción directa con infraestructura remota

La validación dinámica del comportamiento de red será documentada en fases experimentales posteriores.

---

## 7. Limitaciones

La información OSINT presenta limitaciones inherentes:

- posible desactualización temporal
- dependencia de indexación externa
- cambios dinámicos en resolución DNS
- ausencia de validación directa

Por ello, los hallazgos deben interpretarse como contexto preliminar y no como representación concluyente del estado operativo actual.

---