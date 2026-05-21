# Protocolo experimental

---

## 1. Objetivo del protocolo

Establecer un procedimiento técnico, controlado y reproducible para la ejecución de sesiones de observación orientadas al análisis del comportamiento de red, comunicaciones HTTP/HTTPS, servicios externos, mecanismos de tracking y exposición observable de información durante la navegación en el dominio `futbollibretv.su`.

El protocolo busca garantizar:

- consistencia entre sesiones
- integridad de la evidencia recolectada
- control del entorno experimental
- trazabilidad metodológica
- reproducibilidad de resultados

---

## 2. Unidad experimental

La unidad experimental corresponde a una **sesión controlada de navegación** ejecutada dentro de un entorno virtualizado previamente definido.

Cada sesión constituye una ejecución independiente del protocolo, iniciada desde un estado limpio del sistema y documentada individualmente.

Cada sesión debe mantener condiciones equivalentes para permitir comparabilidad entre observaciones.

---

## 3. Entorno experimental

Las sesiones experimentales se ejecutarán bajo el siguiente entorno técnico:

| Componente | Configuración |
|----------|---------------|
| Virtualización | VMware Workstation |
| Sistema operativo | Windows 10 |
| Navegador | Firefox |
| Proxy HTTP/HTTPS | Burp Suite |
| Captura de tráfico | Wireshark |
| Logging HTTP | Logger++ |
| Clasificación rápida | HaE |

---

## 4. Preparación previa de cada sesión

Antes de iniciar cualquier sesión experimental deben ejecutarse las siguientes acciones.

---

### 4.1 Restauración del entorno

Restaurar el snapshot base:

```text
maquina_limpia