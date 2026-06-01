# Sesión 01 — Línea base pasiva controlada

---

## Metadatos de la sesión

**ID de sesión:** S01  
**Nombre de la sesión:** Navegación pasiva controlada  
**Fecha:** 2026-05-14  
**Hora de inicio:** 23:24:01  
**Hora de finalización:** 23:29:18  
**Duración real:** 5 minutos 17 segundos  

---

## Objetivo

Observar el comportamiento automático de red y aplicación generado al acceder directamente al dominio objetivo sin interacción deliberada del usuario, con el fin de identificar comunicaciones externas, mecanismos de telemetría, servicios de terceros y posibles indicadores de perfilado del entorno cliente.

---

## Dominio objetivo

```text
https://futbol-libre.su/
```

---

## Tipo de sesión experimental

**Observacional, pasiva y controlada**

La sesión fue diseñada como una línea base experimental con el propósito de capturar el comportamiento automático inicial del sitio web bajo condiciones de mínima intervención.

---

## Entorno experimental

### Infraestructura de laboratorio

**Snapshot utilizado:** `limpio`  
**Hipervisor:** VMware Workstation 17 Pro  
**Sistema operativo invitado:** Windows 10 Pro 22H2 x64  
**Navegador:** Mozilla Firefox 150.0 (64-bit)  
**Proxy HTTP/HTTPS:** Burp Suite Community Edition (`127.0.0.1:8080`)  
**Captura de tráfico de red:** Wireshark  

---

## Herramientas utilizadas

| Herramienta | Propósito |
|----------|-----------|
| Burp Suite Community | Interceptación y análisis HTTP/HTTPS |
| Logger++ | Registro cronológico de solicitudes |
| HaE | Detección de patrones relevantes |
| Wireshark | Captura de tráfico de red |
| Firefox | Simulación de cliente web |

---

## Política de interacción

La sesión fue ejecutada bajo condiciones de observación pasiva estricta.

Durante la ejecución:

- no se realizaron clics
- no se realizó scroll
- no se movió deliberadamente el cursor
- no se reprodujo contenido multimedia
- no se interactuó con popups
- no se introdujo texto
- no se navegó fuera del dominio objetivo

---

## Medidas de control del navegador

Con el fin de reducir tráfico instrumental no relacionado con el experimento, el navegador fue configurado previamente mediante controles de entorno.

Configuraciones aplicadas:

- telemetría de Firefox deshabilitada
- reportes automáticos deshabilitados
- DNS prefetch deshabilitado
- speculative prefetch deshabilitado
- captive portal checks deshabilitados
- actualizaciones automáticas deshabilitadas
- DNS over HTTPS deshabilitado

Estas medidas fueron implementadas para mejorar la validez interna del experimento reduciendo ruido generado por el navegador, sin alterar el comportamiento funcional del sitio web objetivo.

---

## Procedimiento experimental ejecutado

Secuencia aplicada:

1. restauración del snapshot limpio del entorno experimental
2. inicio de captura de tráfico en Wireshark
3. inicio de Burp Suite Community
4. verificación del proxy HTTP/HTTPS
5. apertura del navegador Firefox
6. acceso directo al dominio objetivo
7. observación pasiva sin interacción durante toda la sesión
8. captura de evidencia técnica
9. exportación de artefactos experimentales

---

## Alcance de esta sesión

La presente sesión se limita a observar comportamiento automático inicial del lado cliente, incluyendo:

- solicitudes HTTP/HTTPS
- resoluciones DNS
- conexiones de red salientes
- carga de recursos externos
- comunicaciones con terceros
- telemetría automática
- mecanismos de analítica
- posibles indicadores de perfilado del navegador

---

## Delimitaciones

La presente sesión no incluye:

- interacción activa con elementos del sitio
- reproducción de streams
- clics sobre anuncios
- interacción con reproductores
- envío manual de formularios
- explotación activa
- manipulación del sitio objetivo

---

## Estado de la sesión

**Completada correctamente**