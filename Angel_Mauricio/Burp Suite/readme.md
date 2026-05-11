## Herramientas de Auditoría: Burp Suite Professional/Community

En el desarrollo de esta investigación, se utilizó **Burp Suite** como la herramienta central para la interceptación y análisis de tráfico. Burp Suite es una plataforma líder en el sector de la ciberseguridad, diseñada específicamente para realizar pruebas de seguridad en aplicaciones web mediante un enfoque de **Proxy de Interceptación**.

### Utilidad y Objetivos Técnicos en el Proyecto
Como parte de las competencias desarrolladas en la carrera de **Ingeniería de Tecnologías de la Información y Seguridad**, el uso de esta herramienta permitió:

* **Análisis Man-In-The-Middle (MITM):** Actuar como intermediario entre el dispositivo móvil (cliente) y los servidores de streaming para visualizar peticiones que normalmente son opacas al usuario.
* **Descifrado de Tráfico HTTPS:** Mediante la instalación de una Autoridad de Certificación (CA) en el dispositivo Android, se logró auditar el contenido cifrado de las peticiones para identificar la exfiltración de metadatos.
* **Análisis de Payloads y Telemetría:** Inspeccionar cuerpos de peticiones en formato **JSON** y parámetros de URL para documentar técnicas de *fingerprinting* y rastreo de comportamiento.
* **Mapeo de Infraestructura de Terceros:** Identificar la procedencia real de los flujos de video (.ts) y las conexiones hacia redes de anuncios y apuestas deportivas.



### Relevancia Académica y Profesional
Este análisis demuestra la capacidad de aplicar herramientas de auditoría profesional para exponer riesgos de privacidad en entornos reales. El uso de Burp Suite en este proyecto, bajo los estándares académicos de la **Universidad Mayor Real y Pontificia de San Francisco Xavier de Chuquisaca (USFX)**, evidencia cómo la seguridad defensiva y la inspección de tráfico son fundamentales para proteger la integridad de los datos de los usuarios frente a plataformas de streaming no autorizadas.
