# Registro técnico del laboratorio

**Proyecto:** Análisis de exposición del usuario en futbollibretv.su  
**Investigador:** Cesar Soria Mita  

---

## Sistema anfitrión (Host)

El entorno experimental se ejecutó sobre un equipo portátil **HP Pavilion Gaming 15-dk1xxx**, configurado con un procesador **Intel Core i5-10300H @ 2.50 GHz**, **24 GB de memoria RAM** y sistema operativo de **64 bits (arquitectura x64)**.

Este equipo proporciona la capacidad de cómputo necesaria para la ejecución simultánea de la máquina virtual y las herramientas de análisis de tráfico, sin evidenciar degradación significativa en el rendimiento durante las pruebas.

---

## Entorno de virtualización

Se implementó una máquina virtual utilizando **VMware Workstation 17 Pro (versión 17.5.2 build-23775571)**, con el objetivo de garantizar un entorno **aislado, controlado y reproducible**.

Como sistema operativo invitado se utilizó **Windows 10 Pro, versión 22H2 (build 19045, arquitectura x64)**.

### Configuración de la máquina virtual

- **Memoria RAM:** 8 GB  
- **CPU:** 2 núcleos (Intel Core i5-10300H @ 2.50 GHz)  
- **Almacenamiento:** 80 GB (NVMe)  
- **Modo de red:** NAT (Network Address Translation)  

El uso de NAT permitió mantener conectividad a Internet sin exponer directamente la máquina virtual a la red externa, reduciendo la superficie de riesgo durante la experimentación.

---

## Herramientas de análisis

Se emplearon las siguientes herramientas, seleccionadas en función de las variables de estudio (**tráfico de red** y **comportamiento de aplicación**):

### Wireshark

- **Versión:** 4.6.4 (64-bit)  
- **Motor de captura:** Npcap 1.86 (libpcap 1.10.6)  
- **Propósito:** Captura y análisis de tráfico de red a nivel de paquetes  
- **Datos recolectados:** DNS, direcciones IP, conexiones TCP/UDP, patrones de comunicación  

### Burp Suite Community Edition

- **Versión:** 2026.3.3  
- **Configuración:** Proxy local 127.0.0.1:8080  
- **Modo de operación:** Intercept deshabilitado (registro pasivo)  
- **Propósito:** Interceptación y análisis de tráfico HTTP/HTTPS a nivel de aplicación  
- **Datos recolectados:** Requests, headers, cookies, redirecciones  

### Mozilla Firefox

- **Versión:** 150.0 (64-bit)  
- **Configuración:**
  - Sin extensiones instaladas  
  - Sin sesión iniciada  
  - Caché limpia al inicio de cada sesión  
  - Proxy configurado hacia Burp Suite  
- **Propósito:** Simulación del comportamiento de un usuario real durante la navegación  

---

## Configuración de aislamiento

Con el fin de evitar la propagación de posibles amenazas fuera del entorno experimental, se deshabilitaron los mecanismos de integración entre el sistema anfitrión y la máquina virtual, incluyendo:

- **Carpetas compartidas**  
- **Portapapeles compartido**  
- **Transferencia mediante arrastrar/soltar**  

Estas medidas garantizan que cualquier comportamiento potencialmente malicioso permanezca contenido dentro de la máquina virtual.

---

## Snapshot base del entorno

Se generó un snapshot inicial denominado **“maquina_limpia”**, correspondiente a un estado base del sistema con las herramientas instaladas y sin actividad previa de navegación.

Este snapshot se utilizó como punto de restauración antes de cada sesión experimental, asegurando la consistencia de las condiciones de prueba y evitando la contaminación entre ejecuciones.

---

## Datos recolectados

Durante las sesiones experimentales se registraron los siguientes tipos de datos:

- **Direcciones IP de destino**  
- **Dominios externos**  
- **Solicitudes HTTP/HTTPS**  
- **Redirecciones**  
- **Scripts cargados durante la navegación**  
