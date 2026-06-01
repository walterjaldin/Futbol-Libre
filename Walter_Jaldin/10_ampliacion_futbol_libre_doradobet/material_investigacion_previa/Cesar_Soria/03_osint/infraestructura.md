# Infraestructura asociada al dominio

---

## 1. Objetivo

Documentar la infraestructura públicamente observable asociada al dominio objetivo mediante técnicas de reconocimiento pasivo (OSINT), con el fin de caracterizar el contexto técnico preliminar previo a la fase experimental activa.

---

## 2. Fuentes utilizadas

La información presentada en esta sección fue obtenida mediante fuentes de inteligencia de acceso público.

### Herramientas utilizadas

- Shodan
- VirusTotal
- DNSDumpster
- observación pasiva de registros DNS e infraestructura públicamente indexada

### Fecha de consulta

```text
[COMPLETAR FECHA REAL]
```

**Nota metodológica:**  
La información recopilada corresponde a observaciones pasivas y puede variar con el tiempo debido a cambios en la infraestructura operativa del dominio.

---

## 3. Direcciones IP observadas

Durante la fase de reconocimiento pasivo se identificaron las siguientes direcciones IP asociadas al dominio objetivo.

| IP | Fuente de observación | Observación |
|----|----------------------|-------------|
| 185.254.197.23 | OSINT | infraestructura asociada al dominio |
| 194.42.205.18 | OSINT | infraestructura históricamente observable |

---

## 4. Sistemas autónomos e infraestructura asociada

### Infraestructura principal observada

| Campo | Valor |
|------|-------|
| ASN | AS30860 |
| Proveedor | Virtual Systems LLC (YURTEH-AS) |
| Ubicación observable | Ucrania |

---

## 5. Servicios públicamente observables

Las fuentes OSINT consultadas reportaron la presencia de tecnologías web asociadas a la infraestructura observada.

### Tecnologías reportadas

- nginx
- Apache HTTP Server

**Nota metodológica:**  
La identificación de tecnologías en esta fase depende de observaciones públicas indexadas y no constituye validación funcional directa en tiempo real.

---

## 6. Puertos observables

Las fuentes consultadas reportaron exposición pública de los siguientes puertos:

| Puerto | Servicio asociado |
|--------|------------------|
| 443 | HTTPS |
| 8443 | HTTPS alternativo |

Estas observaciones describen únicamente información públicamente indexada.

---

## 7. Observaciones técnicas

Durante la fase de reconocimiento pasivo se observó:

- asociación del dominio con infraestructura pública identificable
- presencia de múltiples tecnologías web reportadas
- exposición de servicios HTTPS observables
- infraestructura asociada a proveedores internacionales

Estas observaciones constituyen contexto técnico preliminar para comparación con la fase experimental activa.

---

## 8. Delimitación metodológica

La presente sección no incluye:

- validación activa de servicios
- pruebas de conectividad
- fingerprinting activo
- interacción HTTP/HTTPS directa
- confirmación operativa en tiempo real
- análisis dinámico del comportamiento del dominio

Los hallazgos experimentales obtenidos mediante navegación controlada serán documentados en fases posteriores.

---

## 9. Limitaciones

La información obtenida mediante OSINT presenta limitaciones inherentes:

- posible desactualización temporal
- dependencia de fuentes externas de indexación
- cambios dinámicos de infraestructura
- ausencia de validación funcional directa
- posible discrepancia entre infraestructura histórica y operativa actual

Por ello, los hallazgos de esta fase deben interpretarse como contexto preliminar y no como representación concluyente del estado operativo actual.

---