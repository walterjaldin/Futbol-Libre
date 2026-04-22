# Bitácora de investigación
**Proyecto:** Análisis de exposición del usuario al acceder al sitio futbollibretv.su desde dispositivos Android

**Investigador principal:** Jaldin Gonzales Walter
**Afiliación:** Universidad San Francisco Xavier de Chuquisaca (USFX)
**Correo:** jaldinwalter6@gmail.com
**Equipo de investigación:** Walter Jaldín, Rodrigo Álvarez, Ángel Mauricio, César Soria
**Fecha de inicio:** 20 de abril de 2026

---

## Entrada 1 — 22 de abril de 2026

**Jornada:** Día 1 — Preparación del entorno base y estructuración del proyecto
**Hora de inicio:** [21:00]
**Hora de fin:** [3:20]

### Actividades planificadas
- Crear estructura de carpetas del proyecto en el equipo local.
- Instalar Android Studio y configurar SDK.
- Crear dos imágenes AVD (Android 14 API 34 y Android 11 API 30) con snapshots iniciales.
- Instalar Burp Suite Community, Wireshark y OBS Studio.
- Crear cuentas en servicios OSINT.
- Inicializar repositorio colaborativo en GitHub para trabajo en equipo.

### Decisiones metodológicas confirmadas
- **Alcance del estudio:** exclusivamente dispositivos Android mediante emuladores. Se descartó la rama iOS por limitaciones técnicas (cierre del ecosistema, dificultad de interceptación sin jailbreak) y se decidió que el laboratorio trabajará únicamente con Android mediante AVDs.
- **Perfiles experimentales:** 4 perfiles, 20 sesiones totales (5 repeticiones por perfil).
- **Variables independientes:** versión de Android (14 vs 11) × nivel de protección (sin protección vs AdGuard DNS).
- **Marco de análisis:** OWASP Top 10 Client-Side Security Risks (núcleo), OWASP Risk Rating Methodology (para calificar severidad) y OWASP Web Security Testing Guide (como apoyo procedimental).
- **Emulador seleccionado:** Android Studio AVD (gratuito, oficial de Google, soporte nativo para Apple Silicon).
- **Perfiles de dispositivo:** Pixel 6 para imagen Android 14 y Pixel 5 para imagen Android 11 (elegidos por ser perfiles estándar sin UI personalizada del fabricante).
- **Variante de imagen del sistema:** Google APIs (con root habilitado) en ambos AVDs, necesario para instalar certificado CA como autoridad de sistema y permitir interceptación HTTPS completa.
- **Herramientas de captura de tráfico:** Burp Suite Community como proxy principal y Wireshark para captura de red a bajo nivel.
- **Distribución de sesiones entre investigadores:** cada miembro ejecutará 5 sesiones distribuidas entre los 4 perfiles, de modo que cada perfil sea observado por múltiples investigadores, fortaleciendo la validez inter-observador.

### Actividades ejecutadas

**Estructura y documentación**
- Creación de la estructura de carpetas de trabajo en `~/Documents/Futbol-Libre/Walter_Jaldin/` con subdirectorios organizados por fase metodológica (01_bitacora, 02_registro_tecnico, 03_osint, 04_reconocimiento_activo, 05_sesiones, 06_analisis, 07_owasp, 08_articulo, 09_referencias).
- Inicialización de la bitácora de investigación (`01_bitacora/bitacora.md`).
- Inicialización del registro técnico del laboratorio (`02_registro_tecnico/registro_tecnico.md`).
- Creación de archivos `notas.md` en cada subcarpeta de las 5 sesiones experimentales asignadas (A14-N-R1, A14-D-R1, A11-N-R1, A11-D-R1, A14-N-R2).

**Repositorio colaborativo**
- Creación del repositorio en GitHub: https://github.com/walterjaldin/Futbol-Libre
- Invitación a los tres co-investigadores como colaboradores con permiso de escritura.
- Establecimiento de estructura de 4 carpetas principales (una por investigador) para trabajo paralelo sin conflictos de merge.
- Primer commit y push de la estructura inicial.


**Instalación de software**
- Android Studio Panda 3 | 2025.3.3 Patch 1 instalado. SDK base descargado.
- Burp Suite Community 2026.3.3 instalado.
- Wireshark 4.6.4 instalado con ChmodBPF activado para captura sin privilegios de root.
- OBS Studio 32.1.1 instalado para grabación de pantalla durante sesiones experimentales.

**Creación de imágenes virtuales Android**
- AVD 1 creado: `A14_perfil_investigacion` (Pixel 6, API 34 Android 14, Google APIs arm64-v8a, 3 GB RAM, 6 GB almacenamiento).
- AVD 2 creado: `A11_perfil_investigacion` (Pixel 5, API 30 Android 11, Google APIs arm64-v8a, 3 GB RAM, 6 GB almacenamiento).
- Snapshots iniciales `baseline_limpio` creados en ambos AVDs.
- Verificación exitosa de restauración desde snapshot en ambos AVDs.
- Configuración inicial de cada AVD: idioma español, sin cuenta Google, device name personalizado (AVD_A14_INV y AVD_A11_INV).

**Cuentas OSINT creadas**
- VirusTotal
- URLScan.io
- Shodan
- Censys
- AbuseIPDB


### Observaciones y decisiones del día

- **Privacidad del repositorio:** se tomó la decisión de mantener el repositorio privado durante toda la fase de investigación y solo considerar su publicación posterior a la publicación del artículo, previa limpieza y anonimización de datos sensibles. Esta decisión responde a tres motivos: (1) evitar exposición de URLs activas de malvertising que terceros puedan reutilizar, (2) evitar alertar a los operadores del sitio investigado, (3) cumplir con principios éticos de investigación que restringen la publicación abierta de datos crudos.

- **Variante Google APIs vs Google Play:** se eligió intencionalmente Google APIs para los AVDs. La variante Google Play bloquea el acceso root mediante SafetyNet, lo que impediría instalar el certificado CA de Burp como autoridad de sistema y, por tanto, limitaría la interceptación HTTPS. Esta decisión es metodológicamente crítica y debe documentarse en la sección de Metodología del artículo.

- **Perfiles de dispositivo diferenciados (Pixel 6 para A14 y Pixel 5 para A11):** se usó un perfil de dispositivo histórico consistente con cada versión de Android (el Pixel 5 fue contemporáneo de Android 11, el Pixel 6 de Android 14), para reproducir condiciones más realistas en cada caso.

- **Rendimiento del equipo anfitrión (MacBook Air M5, 16 GB RAM):** excelente en las pruebas iniciales. Los AVDs arrancan desde snapshot en menos de 20 segundos gracias a la arquitectura ARM64 nativa. No se prevén cuellos de botella para las 20 sesiones experimentales.

### Problemas encontrados y resoluciones

- **Problema 1:** SecurityTrails dejó de ofrecer tier gratuito y solicita pago de 500 USD mensuales para acceso a su API. **Resolución:** se sustituyó por combinación de servicios gratuitos (ViewDNS.info + DNSDumpster + crt.sh) que cubren las funciones requeridas. Se documentará esta sustitución en la sección de Metodología del artículo.

- **Problema 2:** Any.run restringió su tier gratuito exigiendo correo corporativo. **Resolución:** [completar según lo que resolviste — si usaste correo USFX, si queda pendiente, o si se sustituirá por Hybrid Analysis].

### Métricas del día
- Carpetas creadas: 14 directorios en estructura local + repositorio colaborativo.
- Software instalado y funcional: 4 aplicaciones (Android Studio, Burp Suite, Wireshark, OBS Studio).
- AVDs operativos: 2 (Android 14 y Android 11) con snapshots baseline.
- Cuentas OSINT activas: 5 de 7 previstas (2 sustituidas por alternativas equivalentes).

### Pendiente para la siguiente jornada
- Configurar Burp Suite como proxy accesible desde los AVDs.
- Instalar certificado CA de Burp como autoridad de sistema en ambos AVDs.
- Verificar interceptación HTTPS completa.
- Crear segundo snapshot por AVD: `baseline_con_burp`.
- Configurar AdGuard DNS en las imágenes que corresponden a los perfiles "con protección".
- Crear tercer snapshot: `baseline_con_burp_y_proteccion` para los perfiles A14-D y A11-D.

---