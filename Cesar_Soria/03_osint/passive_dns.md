# Passive DNS y nameservers del dominio

---

## 1. Objetivo

Documentar la infraestructura DNS observable públicamente asociada al dominio objetivo mediante técnicas de reconocimiento pasivo (OSINT), con el propósito de caracterizar el contexto de resolución DNS previo a la fase experimental activa.

---

## 2. Fuente de información

La información presentada en esta sección fue obtenida mediante herramientas de reconocimiento pasivo.

### Fuente principal

- DNSDumpster

### Fecha de consulta

```text
[COMPLETAR FECHA REAL]
```

**Nota metodológica:**  
La información corresponde a observaciones públicas disponibles al momento de la consulta y puede variar con el tiempo debido a cambios en la infraestructura del dominio.

---

## 3. Nameservers identificados

Durante la fase de reconocimiento pasivo se identificaron los siguientes servidores DNS asociados al dominio analizado.

| Dominio | IP | ASN | Proveedor | País |
|--------|----|-----|----------|------|
| ap-dns.com | 37.187.209.163 | AS16276 | OVH | Francia |
| bp-dns.org | 37.187.83.149 | AS16276 | OVH | Francia |
| cp-dns.biz | 162.210.197.241 | AS30633 | Leaseweb USA | Estados Unidos |
| dp-dns.info | 185.108.84.23 | AS60781 | Leaseweb NL | Países Bajos |

---

## 4. Observaciones técnicas

A partir de la información recolectada se observa:

- presencia de múltiples nameservers asociados al dominio
- distribución geográfica observable entre distintas jurisdicciones
- participación de diferentes proveedores de infraestructura
- asignación a múltiples sistemas autónomos (ASN)

Estas observaciones describen exclusivamente infraestructura DNS públicamente visible.

---

## 5. Alcance del análisis

La presente sección se limita a la observación pasiva de infraestructura DNS asociada al dominio objetivo.

Se consideran dentro del alcance:

- nameservers observables
- direcciones IP asociadas
- ASN relacionados
- proveedores identificables públicamente
- distribución geográfica observable

---

## 6. Delimitación metodológica

Esta fase no incluye:

- validación activa de resolución DNS
- pruebas de disponibilidad
- análisis dinámico de comportamiento
- confirmación operativa de servicios
- correlación con tráfico experimental
- interacción directa con infraestructura remota

La validación funcional del comportamiento de red será abordada en fases posteriores mediante observación experimental controlada.

---

## 7. Limitaciones

La información obtenida mediante fuentes OSINT presenta limitaciones inherentes:

- posible desactualización temporal
- cambios dinámicos en infraestructura DNS
- dependencia de indexación externa
- ausencia de validación funcional directa
- falta de confirmación operativa en tiempo real

Por ello, los hallazgos deben interpretarse como contexto preliminar y no como evidencia concluyente del comportamiento operativo actual.

---