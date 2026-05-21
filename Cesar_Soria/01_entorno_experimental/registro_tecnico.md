# Registro técnico del laboratorio

**Proyecto:** Análisis de exposición del usuario en futbollibretv.su  
**Investigador:** Cesar Soria Mita

---

## 1. Descripción general del entorno experimental

El análisis experimental fue ejecutado dentro de un entorno virtualizado, aislado y controlado, diseñado para observar el comportamiento del dominio `futbollibretv.su` desde la perspectiva del cliente, garantizando condiciones reproducibles y minimizando riesgos de propagación fuera del laboratorio.

La arquitectura experimental separa el sistema anfitrión del entorno de observación, permitiendo capturar tráfico, registrar eventos HTTP/HTTPS y documentar comportamiento emergente durante sesiones controladas.

---

## 2. Sistema anfitrión (Host)

El sistema anfitrión utilizado para soportar la virtualización y las herramientas de análisis presenta las siguientes características:

| Componente   | Configuración                        |
| ------------ | ------------------------------------ |
| Arquitectura | x64                                  |
| Procesador   | Intel Core i5-10300H                 |
| Memoria RAM  | 24 GB                                |
| Función      | Soporte del laboratorio experimental |

El sistema anfitrión no participa directamente en la navegación experimental ni en la interacción con el dominio analizado.

---

## 3. Entorno de virtualización

Se implementó una máquina virtual mediante **VMware Workstation 17 Pro**, utilizada como entorno de observación controlado.

### Configuración del hipervisor

| Parámetro | Valor |
|---------|------|
| Software | VMware Workstation Pro |
| Versión | 17.5.2 |
| Build | 23775571 |

### Sistema operativo invitado

| Parámetro | Valor |
|---------|------|
| Sistema operativo | Windows 10 Pro |
| Versión | 22H2 |
| Build | 19045 |
| Arquitectura | x64 |

### Configuración de la máquina virtual

| Componente | Configuración |
|----------|---------------|
| RAM | 8 GB |
| CPU | 2 núcleos |
| Almacenamiento | 80 GB NVMe |
| Red | NAT |

El uso de NAT permite conectividad funcional a Internet manteniendo aislamiento razonable entre el entorno experimental y la red externa.

---

## 4. Configuración de aislamiento

Con el objetivo de contener posibles comportamientos no deseados dentro del laboratorio experimental, se deshabilitaron mecanismos de integración entre host y guest.

### Medidas aplicadas

- Carpetas compartidas deshabilitadas
- Portapapeles compartido deshabilitado
- Transferencia drag-and-drop deshabilitada

Estas restricciones reducen la posibilidad de transferencia involuntaria de artefactos entre entornos.

---

## 5. Snapshot base

Se generó un snapshot inicial denominado:

```text
maquina_limpia