# Evidencias Técnicas del Análisis de Vulnerabilidades
**Investigador:** Angel Mauricio  
**Proyecto:** Futbol-Libre TV Security Analysis

---

## 1. Interceptación Inicial de Tráfico
![Imagen1](https://github.com/user-attachments/assets/00569457-be2d-491a-9bea-8cb7e7e75fcf)
**Análisis Técnico:**
* **Captura de Handshake:** Se observa la interceptación de peticiones HTTP/1.1 salientes desde el dispositivo móvil.
* **Verificación de Proxy:** Esta captura confirma la correcta configuración del túnel entre el smartphone y Burp Suite, permitiendo la lectura de cabeceras de control antes de la redirección al dominio malicioso.

---

## 2. Exfiltración de Direcciones IP y Triangulación
![Imagen2](https://github.com/user-attachments/assets/fa920653-1fc7-4ba4-8874-d7c38779428a)
**Análisis Técnico:**
* **Fuga de Privacidad:** Se identifica el parámetro `&ip=181.115.171.81` dentro de la URL del stream. El sitio envía la dirección IP pública del usuario a servidores de terceros (`envivoslatam.org`) sin ningún tipo de enmascaramiento.
* **Táctica de Evasión:** El uso del dominio de origen `latamvidz1.com` confirma una estructura de "triangulación de dominios" para evadir bloqueos geográficos.

---

## 3. Reputación de Dominios (VirusTotal)
![Imagen3](https://github.com/user-attachments/assets/99f12ef9-9bd8-4d65-a92d-8207197446fc)
**Análisis Técnico:**
* **Indicadores de Compromiso (IoC):** El dominio de distribución de video presenta alertas activas por parte de motores de seguridad como Fortinet y Seclookup.
* **Clasificación:** El recurso es categorizado como "Malicious" y "Spam", validando que la infraestructura que soporta el streaming no es segura para el usuario institucional.

---

## 4. Historial de Abuso de Infraestructura (AbuseIPDB)
![Imagen4](https://github.com/user-attachments/assets/234ff04d-caea-40cc-8b91-0559bb790480)
**Análisis Técnico:**
* **Volumen de Reportes:** La IP de alojamiento (`45.148.10.186`) cuenta con más de **3,000 reportes de abuso**.
* **Geolocalización Crítica:** Nodo ubicado en Ámsterdam, Países Bajos, vinculado a servicios de "Bulletproof Hosting" (TECHOFF SRV LIMITED), diseñados para ignorar solicitudes de baja por contenido malicioso o ilegal.

---

## 5. Exfiltración de Metadatos y Fingerprinting (GA4)
![Imagen5](https://github.com/user-attachments/assets/d3bef951-6497-451b-8e5a-707a2a6f98f6)
**Análisis Técnico:**
* **Perfilamiento de Hardware:** La petición `POST /g/collect` revela datos específicos del dispositivo: modelo (`uam`), resolución (`sr`) y versión de sistema operativo.
* **Monitoreo de Interacción:** El parámetro `epn.percent_scrolled=90` demuestra un seguimiento invasivo de la actividad del usuario, recolectando telemetría detallada sin consentimiento explícito.
