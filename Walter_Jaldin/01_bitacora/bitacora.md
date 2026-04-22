# Bitácora de investigación
**Proyecto:** Análisis de exposición del usuario al acceder al sitio futbollibretv.su desde dispositivos Android

**Investigador principal:** Jaldin Gonzales Walter
**Afiliación:** Universidad San Francisco Xavier de Chuquisaca (USFX)
**Correo:** jaldinwalter6@gmail.com
**Equipo de investigación:** Walter Jaldín, Rodrigo Álvarez, Ángel Mauricio, César Soria
**Fecha de inicio:** 22 de abril de 2026

---

## Entrada 1 — 22 de abril de 2026

**Jornada:** Día 1 — Preparación del entorno de laboratorio
**Hora de inicio:** [completar]
**Hora de fin:** [completar hora al cerrar jornada]

### Decisiones metodológicas confirmadas durante la jornada
- **Alcance:** estudio exclusivo Android vía emulador.
- **Perfiles:** 4 perfiles, 20 sesiones totales (5 repeticiones por perfil).
- **Variables independientes:** versión de Android (14 vs 11) × nivel de protección (sin protección vs AdGuard DNS).
- **Marco de análisis:** OWASP Top 10 Client-Side + OWASP Risk Rating Methodology + OWASP WSTG.
- **Emulador seleccionado:** Android Studio AVD.
- **Herramientas de interceptación:** Burp Suite Community + Wireshark.
- **Perfiles de dispositivo:** Pixel 6 para Android 14 (API 34), Pixel 5 para Android 11 (API 30).
- **Variante de imagen del sistema:** Google APIs arm64-v8a (con acceso root habilitado), requerida para instalar certificado CA como autoridad de sistema.
- **Distribución de sesiones entre investigadores:** cada miembro ejecuta 5 sesiones distribuidas entre perfiles, para reforzar validez inter-observador.

### Actividades ejecutadas

**Estructura y repositorio**
- Creación del repositorio colaborativo GitHub (privado): https://github.com/walterjaldin/Futbol-Libre
- Estructura con 4 carpetas (una por investigador) creada y subida.
- Estructura interna de `Walter_Jaldin/` con 9 subcarpetas por fase metodológica.
- Bitácora (`01_bitacora/bitacora.md`) y registro técnico (`02_registro_tecnico/registro_tecnico.md`) inicializados.
- Plantillas `notas.md` creadas en las 5 subcarpetas de sesiones experimentales asignadas.
- README personal creado.

**Instalación de software base**
- Android Studio Panda 3 | 2025.3.3 Patch 1 instalado.
- Burp Suite Community 2026.3.3 instalado.
- Wireshark 4.6.4 instalado con ChmodBPF activado.
- OBS Studio 32.1.1 instalado.

**Cuentas OSINT**
- Creadas: VirusTotal, URLScan.io, Shodan, Censys, AbuseIPDB.
- Sustituida por alternativas gratuitas: SecurityTrails → combinación ViewDNS.info + DNSDumpster + crt.sh.
- Pendiente de resolver: Any.run (requiere correo corporativo). Decisión preliminar: sustituir por Hybrid Analysis.

**Creación de AVDs**
- AVD Android 14 creado: `A14_perfil_investigacion` (Pixel 6, API 34, Google APIs arm64-v8a, 3 GB RAM, 6 GB almacenamiento, Quick boot).
- AVD Android 11 creado: `A11_perfil_investigacion` (Pixel 5, API 30, Google APIs arm64-v8a, 3 GB RAM, 6 GB almacenamiento, Quick boot).
- Snapshot `baseline_limpio` creado en ambos AVDs.
- Configuración inicial en ambos: español, sin cuenta Google, device name personalizado (AVD_A14_INV, AVD_A11_INV).

**Configuración de Burp Suite como proxy**
- Listener configurado en 0.0.0.0:8080 (todas las interfaces) para permitir conexión desde AVD vía IP 10.0.2.2.
- Intercept desactivado (solo registro pasivo en HTTP history).
- Certificado CA exportado como `cacert.der`.
- Certificado convertido a PEM (`burp_cert.pem`).
- Generados dos archivos con hash: `9a5ba575.0` (subject_hash_old, Android < 7) y `7bf17d07.0` (subject_hash, Android 7+).

**Instalación de certificado CA en AVD Android 14 (trabajo parcial)**
- Arranque del AVD con flag `-writable-system` desde terminal.
- adb root + remount + disable-verity ejecutados exitosamente.
- Push del certificado `9a5ba575.0` a `/system/etc/security/cacerts/` exitoso.
- Permisos 644 aplicados.
- Reboot del AVD ejecutado.
- **Problema detectado:** el certificado no apareció en Trusted credentials → System.
- **Diagnóstico:** Android 14 lee certificados CA desde `/apex/com.android.conscrypt/cacerts/` (introducido como refuerzo de seguridad), no desde `/system/etc/security/cacerts/`. Además, el hash correcto para Android 14 es `subject_hash` (7bf17d07), no `subject_hash_old` (9a5ba575).
- **Solución aplicada:** procedimiento de bind mount para inyectar el certificado con nombre correcto en la ubicación APEX. Carpeta `/data/local/tmp/cacerts/` poblada con todos los CAs originales + nuestro certificado renombrado a `7bf17d07.0`. Contexto SELinux ajustado con chcon.
- `mount --bind /data/local/tmp/cacerts /apex/com.android.conscrypt/cacerts` aplicado exitosamente; el certificado aparece en `/apex/` tras el bind mount.
- **Segundo problema:** el intento de propagar el mount a todos los namespaces de procesos (`for pid in $(ls /proc)...`) causó inestabilidad en el user space del emulador. Chrome y Settings dejaron de responder tras el comando.
- **Acción tomada:** reboot del AVD mediante cierre forzado.
- **Segundo intento:** bind mount aplicado sin tocar todos los procesos (solo global) y complementado con `setprop ctl.restart zygote` para refrescar la UI. El restart del zygote causó que el emulador quedara congelado en el logo de Google.

### Estado al cierre de la jornada
- Jornada pausada con el AVD Android 14 en estado inestable (Chrome y Settings no responden).
- El bind mount aplicado sigue activo y el archivo `7bf17d07.0` aparece correctamente en `/apex/com.android.conscrypt/cacerts/`.
- La carpeta `/data/local/tmp/cacerts/` persistirá en próximos arranques porque `/data/` es persistente en el AVD.
- Snapshot `baseline_con_burp` aún no creado (pendiente para la próxima jornada).
- AVD Android 11 no modificado (pendiente instalación de certificado, se espera sea más simple al no tener protección APEX).

### Problemas encontrados y resoluciones

1. **SecurityTrails sin tier gratuito:** sustituido por ViewDNS + DNSDumpster + crt.sh.
2. **Any.run exige correo corporativo:** se sustituirá por Hybrid Analysis (pendiente confirmar).
3. **Error "Could not save snapshot" con boot option Cold boot:** resuelto cambiando boot option a Quick boot en ambos AVDs.
4. **Certificado no reconocido tras push a `/system/etc/security/cacerts/` en Android 14:** identificado como cambio de seguridad de Android 14 (ubicación APEX). Parcialmente resuelto con bind mount.
5. **Bind mount propagado a todos los procesos causa inestabilidad:** error de procedimiento. Para la próxima jornada se aplicará bind mount solo global, sin propagación.
6. **Restart del zygote deja emulador inestable:** descartado como paso obligatorio. Plan alternativo: tomar snapshot inmediatamente tras el bind mount, sin restart del zygote, y confiar en que al cargar el snapshot en sesiones nuevas los procesos arranquen frescos y lean los CAs correctos.

### Lecciones aprendidas

- Android 14 introdujo protecciones adicionales para certificados CA (APEX, hash updates). Estas protecciones son relevantes mencionar en la sección de Metodología del artículo, ya que representan barreras técnicas que la investigación tuvo que sortear mediante procedimientos documentados.
- La persistencia del directorio `/data/local/tmp/` en el AVD permite recuperar trabajo tras reboots sin tener que reaplicar copia de certificados.
- El bind mount es un mecanismo frágil: debe aplicarse con mínima intervención en procesos del sistema. La mejor práctica es aplicarlo y seguido tomar snapshot, para congelar ese estado.

### Pendiente para la próxima jornada

- Reintentar bind mount en AVD Android 14 sin tocar procesos adicionales.
- Crear snapshot `baseline_con_burp` en Android 14 inmediatamente tras el bind mount.
- Verificar interceptación HTTPS en Burp desde Chrome del AVD.
- Aplicar procedimiento de certificado en AVD Android 11 (se espera más simple al no tener APEX).
- Crear snapshot `baseline_con_burp` en Android 11.
- Configurar AdGuard DNS en los AVDs (para preparar perfiles con protección).
- Crear snapshots finales con protección.

---