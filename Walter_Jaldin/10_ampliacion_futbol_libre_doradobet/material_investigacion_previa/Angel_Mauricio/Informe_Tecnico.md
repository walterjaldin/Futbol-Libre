# Informe Técnico: Análisis de Riesgos y Privacidad en futbollibretv.su

## 1. Resumen Ejecutivo
Este documento detalla los hallazgos técnicos obtenidos tras el análisis dinámico del sitio web **futbollibretv.su** en dispositivos móviles. Durante la investigación, se identificaron riesgos críticos de exfiltración de datos, infraestructura con reputación negativa y mecanismos de rastreo persistente que comprometen la privacidad y seguridad del usuario.

## 2. Metodología de Análisis
Para garantizar la reproducibilidad científica del estudio, se implementó el siguiente entorno de laboratorio:
* **Entorno de Pruebas:** Smartphone Android conectado mediante un proxy manual a una estación de trabajo (Laptop).
* **Interceptación de Tráfico:** Uso de **Burp Suite Community Edition v2026.3.3** para la captura y análisis de peticiones HTTPS mediante la instalación de un certificado CA en el dispositivo móvil.
* **Inspección Dinámica:** Uso del protocolo `chrome://inspect/#devices` para monitorear el almacenamiento local, cookies y la activación de *Service Workers* en tiempo real.

## 3. Hallazgos Técnicos

### 3.1. Interceptación de Tráfico y Triangulación de Dominios
Se detectó que la reproducción de contenido (streaming) no es directa, sino que se realiza mediante una red fragmentada de servidores de terceros diseñada para evadir bloqueos geográficos y legales.
* **Endpoint Detectado:** Petición hacia una lista de reproducción HLS (`index.m3u8`).
* **Dominios Involucrados:** Host `kh5vy.envivoslatam.org` con origen en `latamvidz1.com`.
* **Falla de Privacidad:** La dirección IP pública del usuario se exfiltra directamente como un parámetro visible y no cifrado en la URL (`&ip=181.115.171.81`).

### 3.2. Reputación de la Infraestructura de Red
El análisis de los nodos de conexión mediante herramientas de inteligencia de amenazas reveló una infraestructura de soporte altamente sospechosa:

| Recurso Analizado | Función | Ubicación | Hallazgo de Seguridad |
| :--- | :--- | :--- | :--- |
| `envivoslatam.org` | Servidor de Video | Desconocida | Marcado como Malicioso/Spam |
| `45.148.10.186` | Nodo de Conexión | Países Bajos | +3,000 reportes de abuso |

> **Nota Técnica:** El alojamiento en los Países Bajos bajo el ISP TECHOFF SRV LIMITED sugiere el uso de infraestructuras de "Bulletproof Hosting", caracterizadas por su baja reactividad ante denuncias de actividades ilícitas.

### 3.3. Exfiltración de Metadatos (Fingerprinting)
Se confirmó el uso de telemetría avanzada (GA4) para recolectar datos detallados del hardware móvil sin el consentimiento explícito del usuario:
* **Modelo de hardware:** `220333QAG` (Identificado como serie POCO X4 Pro).
* **Versión de sistema:** Android 13 (`uapv=13.0.0`).
* **Resolución de pantalla:** `360x825`.
* **Monitoreo de actividad:** Registro de desplazamiento (scroll) hasta el 90% de la página, permitiendo perfilar el nivel de interés del usuario.

## 4. Análisis Comparativo de Navegación
Se evaluó el nivel de exposición comparando el comportamiento entre navegadores convencionales y herramientas de filtrado:

| Parámetro | Navegador Convencional (Chrome) | Navegador con Filtros (AdBlock/Brave) |
| :--- | :--- | :--- |
| **Telemetría (GA4)** | Activa (Exfiltración detectada) | Bloqueada (0 peticiones) |
| **Fingerprinting** | Expuesto (Hardware y Resolución) | Protegido / Genérico |
| **Rastreo de Actividad** | Detallado (Métricas de scroll) | No detectable |

## 5. Conclusiones
La interacción con el sitio representa un riesgo elevado para la privacidad del usuario. La infraestructura detectada está vinculada a redes de abuso masivo y los mecanismos de *fingerprinting* permiten la identificación única de dispositivos, facilitando potenciales campañas de ingeniería social o distribución de software malicioso dirigido.
