# 🧪 Sesión 01 — Análisis de tráfico web (Navegación pasiva)

---

## 1. Descripción

La presente sesión tiene como objetivo analizar el comportamiento de red generado durante el acceso inicial al sitio **futbollibretv.su**, bajo condiciones de navegación pasiva (sin interacción del usuario).

Se busca identificar:

- Flujo de navegación inicial  
- Redirecciones entre dominios  
- Recursos cargados automáticamente  
- Comunicación con servicios externos  
- Presencia de mecanismos de tracking y fingerprinting  

El análisis se realizó en un entorno controlado mediante una máquina virtual, con el fin de garantizar la seguridad y reproducibilidad del experimento.

---

## 2. Procedimiento

1. Se restauró un snapshot limpio de la máquina virtual.
2. Se configuró el navegador Firefox para utilizar un proxy local (127.0.0.1:8080).
3. Se instaló el certificado de Burp Suite para la inspección de tráfico HTTPS.
4. Se inició Burp Suite en modo pasivo (Intercept OFF).
5. Se inició la captura de tráfico de red mediante Wireshark.
6. Se abrió el navegador sin sesión previa ni caché.
7. Se realizó una búsqueda en Google con el término: **“futbol libre”**.
8. Se seleccionó un resultado que redirige al dominio:
   - `futbollibretv.su`
9. Se observó la redirección automática hacia:
   - `futbol-libre.su`
10. Se permitió la carga completa del sitio durante aproximadamente 5 minutos sin interacción adicional.
11. Se detuvo la captura de tráfico.
12. Se exportaron los siguientes artefactos:
    - Captura de red (`.pcapng`)
    - Historial HTTP (`.json` desde Burp Suite)

---

## 3. Evidencia recolectada

Los siguientes archivos respaldan el análisis realizado:

- `trafico_proxi.pcapng` → captura de tráfico de red completa  
- `burp_log.json` → historial HTTP/HTTPS  
- `capturas/` → evidencia visual (Burp, Wireshark, navegador)  
- `resumen.csv` → datos procesados (opcional)

---

## 4. Análisis

---

### 4.1 Flujo de navegación

El análisis del tráfico revela el siguiente flujo:

1. El usuario inicia una búsqueda en Google.
2. El navegador genera solicitudes de autocompletado (`/complete/search`).
3. Se ejecuta la búsqueda (`/search`).
4. El usuario accede a un resultado externo.
5. Se realiza una solicitud inicial a `futbollibretv.su`.
6. El servidor responde con una redirección HTTP 301.
7. El navegador es redirigido a `futbol-libre.su`.
8. Se carga el contenido principal del sitio.

Esto evidencia un proceso de redirección utilizado como punto de entrada al sitio real.

---

### 4.2 Redirección entre dominios

Se identificó la siguiente redirección:
futbollibretv.su → futbol-libre.su

- Código HTTP: 301 (Moved Permanently)
- Servidor: nginx

Esto indica que el dominio inicial actúa como intermediario o gateway hacia el contenido principal.

---

### 4.3 Infraestructura del sitio

El sitio presenta una arquitectura distribuida basada en múltiples servicios externos:

#### CDN y recursos estáticos
- cdn.futbol-libre.su  
- cdnjs.cloudflare.com  
- ajax.googleapis.com  
- code.jquery.com  

#### Contenido multimedia
- youtube.com (contenido embebido)

#### Scripts externos
- Google Tag Manager  
- librerías JavaScript externas  

Esto demuestra una alta dependencia de infraestructura de terceros.

---

### 4.4 Análisis DNS

El análisis de resoluciones DNS permitió identificar todos los dominios involucrados en la sesión.

#### Dominio principal
- futbollibretv.su  
- futbol-libre.su  

#### Infraestructura de contenido
- cdn.futbol-libre.su  
- cdnjs.cloudflare.com  
- ajax.googleapis.com  

#### Plataformas externas
- youtube.com  

#### Servicios de tracking y publicidad
- usrpubtrk.com  
- adexchangerapid.com  
- google-analytics.com  
- googletagmanager.com  

#### Servicios del navegador
- incoming.telemetry.mozilla.org  
- ads.mozilla.org  

Esto evidencia que la navegación no se limita al dominio principal, sino que involucra múltiples actores externos.

---
### 4.4.1 Direcciones IP asociadas

Se identificaron las siguientes direcciones IP asociadas a los dominios observados durante la sesión:

#### Dominio principal
- futbollibretv.su  
  - 194.42.205.19  
  - 185.254.197.23  
  - 138.226.244.112  

- futbol-libre.su  
  - 185.254.197.23  

#### CDN y recursos
- cdn.futbol-libre.su  
  - 152.233.22.97  

- cdnjs.cloudflare.com  
  - 104.17.24.14  
  - 104.17.25.14  

#### Tracking y publicidad
- usrpubtrk.com  
  - 172.67.186.11  
  - 104.21.92.33  

- adexchangerapid.com  
  - 104.21.35.134  
  - 172.67.222.246  

#### Servicios externos
- youtube.com  
  - múltiples direcciones IP (infraestructura distribuida)  

- google-analytics.com  
  - 142.251.129.110
---

### 4.5 Análisis de tráfico HTTP

Se identificaron dos tipos principales de solicitudes:

#### Solicitudes GET
Utilizadas para:
- carga de HTML  
- descarga de scripts  
- carga de estilos (CSS)  
- contenido multimedia  

#### Solicitudes POST
Identificadas hacia dominios externos, especialmente:

POST /ut/hb.php
Host: usrpubtrk.com


---

### 4.6 Tracking y recolección de datos

Las solicitudes POST hacia `usrpubtrk.com` contienen información detallada del usuario, incluyendo:

#### Comportamiento
- movimiento del mouse  
- scroll  
- porcentaje de página visualizada  
- tiempo de sesión  

#### Información del sistema
- sistema operativo  
- navegador  
- resolución de pantalla  

#### Contexto de navegación
- URL visitada  
- referer (Google)  

#### Interacción
- número de clics  
- tipo de interacción  

Este comportamiento indica un sistema activo de tracking.

---

### 4.7 Fingerprinting

Se identificó el uso de técnicas de fingerprinting mediante datos codificados (campo `bsd`), que permiten:

- detección de automatización (bots)  
- análisis de consistencia del navegador  
- verificación de entorno (headless, WebDriver)  

Aunque no se detecta explícitamente una máquina virtual, la información recopilada permite inferir características del entorno del usuario.

---

### 4.8 Análisis de red (Wireshark)

El análisis de conversaciones TCP mostró:

- múltiples conexiones simultáneas  
- comunicación constante con múltiples IPs  
- uso exclusivo de HTTPS (puerto 443)  

Se identificaron:

- conexiones de alto volumen (carga de contenido)
- conexiones recurrentes de bajo volumen (tracking)

---

### 4.9 Correlación de datos

Se realizó correlación entre:

| Fuente        | Información obtenida |
|--------------|---------------------|
| Burp Suite   | solicitudes HTTP (GET/POST) |
| Wireshark    | tráfico de red e IPs |
| DNS          | resolución de dominios |

Esto permitió validar la relación entre dominios, tráfico y comportamiento observado.

---

### 4.10 Implicaciones de seguridad

El análisis evidencia:

- envío de datos a múltiples terceros  
- ejecución de tracking sin interacción del usuario  
- dependencia de redes de publicidad  
- exposición de información del entorno del usuario  

Esto implica:

- riesgo para la privacidad  
- incremento de superficie de ataque  
- pérdida de control sobre los datos transmitidos  

---

## 5. Conclusión

Durante una navegación pasiva, el sitio analizado establece múltiples comunicaciones externas, carga recursos de terceros y ejecuta mecanismos de tracking avanzados.

Se identificó:

- redirección entre dominios  
- carga dinámica de contenido  
- interacción con múltiples servicios externos  
- recolección de datos del usuario en tiempo real  

El comportamiento observado indica que el usuario es monitoreado desde el momento inicial de acceso, incluso sin realizar acciones dentro del sitio.

---

## 6. Resumen técnico

El sitio analizado presenta las siguientes características:

- arquitectura distribuida  
- uso intensivo de CDN  
- integración con plataformas externas  
- sistemas de tracking activos  
- implementación de fingerprinting  

---

## 7. Insight principal

> El usuario no solo accede al sitio, sino que es activamente monitoreado mediante múltiples mecanismos de seguimiento y análisis de comportamiento.

---




