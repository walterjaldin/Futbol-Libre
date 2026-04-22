# Registro técnico del laboratorio
**Proyecto:** Análisis de exposición del usuario en futbollibretv.su (Android)

---

## Hardware anfitrión
- **Equipo:** MacBook Air 13"
- **Chip:** Apple M5
- **RAM:** 16 GB
- **Almacenamiento libre al inicio:** 341.5 GB
- **Sistema operativo:** macOS Tahoe 26.4.1

## Software instalado

### Android Studio
- **Versión:** Android Studio Panda 3 | 2025.3.3 Patch 1
- **Fecha de instalación:** 21 de abril de 2026
- **Ruta de instalación:** /Applications/Android Studio.app
- **Ruta del SDK:** ~/Library/Android/sdk
- **Ruta del emulador:** ~/Library/Android/sdk/emulator/emulator
- **Ruta de platform-tools:** ~/Library/Android/sdk/platform-tools

### Burp Suite Community
- **Versión:** 2026.3.3
- **Fecha de instalación:** 21 de abril de 2026
- **Listener configurado:** 0.0.0.0:8080 (bind on all interfaces)
- **Intercept:** desactivado (modo pasivo, solo HTTP history)
- **IP desde emulador Android:** 10.0.2.2 (equivale al localhost del host)

### Wireshark
- **Versión:** 4.6.4
- **Fecha de instalación:** 21 de abril de 2026
- **ChmodBPF:** activado

### OBS Studio
- **Versión:** 32.1.1
- **Fecha de instalación:** 21 de abril de 2026

## Imágenes AVD creadas

### AVD 1 — Android 14
- **Nombre del AVD:** A14_perfil_investigacion
- **Imagen de sistema:** Google APIs arm64-v8a API 34 (Android 14 "UpsideDownCake")
- **Perfil de dispositivo:** Pixel 6
- **RAM asignada:** 3 GB (3072 MB)
- **VM heap:** 512 MB
- **Almacenamiento interno:** 6 GB
- **Boot option:** Quick boot
- **Multi-Core CPU:** 4 cores
- **Graphics:** Automatic
- **Device name en el AVD:** AVD_A14_INV
- **Snapshots creados:**
  - `baseline_limpio` — estado inicial sin configuraciones adicionales ✅
  - `baseline_con_burp` — pendiente de creación en próxima jornada

### AVD 2 — Android 11
- **Nombre del AVD:** A11_perfil_investigacion
- **Imagen de sistema:** Google APIs arm64-v8a API 30 (Android 11 "R")
- **Perfil de dispositivo:** Pixel 5
- **RAM asignada:** 3 GB
- **VM heap:** 512 MB
- **Almacenamiento interno:** 6 GB
- **Boot option:** Quick boot
- **Multi-Core CPU:** 4 cores
- **Graphics:** Automatic
- **Device name en el AVD:** AVD_A11_INV
- **Snapshots creados:**
  - `baseline_limpio` — estado inicial sin configuraciones adicionales ✅
  - `baseline_con_burp` — pendiente de creación en próxima jornada

## Cuentas OSINT creadas
- **VirusTotal:** creada el 22 de abril de 2026
- **URLScan.io:** creada el 22 de abril de 2026
- **Shodan:** creada el 22 de abril de 2026
- **Censys:** creada el 22 de abril de 2026
- **AbuseIPDB:** creada el 22 de abril de 2026
- **SecurityTrails:** no disponible en tier gratuito. Sustituido por ViewDNS.info + DNSDumpster + crt.sh.
- **Any.run:** exige correo corporativo. Sustitución preliminar por Hybrid Analysis (pendiente confirmar).

## Certificado CA de Burp

- **Archivo original DER:** cacert.der
- **Archivo PEM convertido:** burp_cert.pem
- **Hash subject_hash_old (Android < 7):** 9a5ba575
- **Hash subject_hash (Android 7+):** 7bf17d07
- **Archivo con hash antiguo:** 9a5ba575.0
- **Archivo con hash moderno:** 7bf17d07.0
- **Ubicación en el filesystem del host:** ~/Documents/Futbol-Libre/Walter_Jaldin/02_registro_tecnico/certificados/
- **Ubicación en el AVD Android 14 (sistema legacy):** /system/etc/security/cacerts/9a5ba575.0
- **Ubicación en el AVD Android 14 (sistema moderno, pendiente persistir):** /apex/com.android.conscrypt/cacerts/7bf17d07.0 (vía bind mount)
- **Carpeta staging en AVD A14:** /data/local/tmp/cacerts/ (persiste reboots)

## Procedimiento técnico documentado: instalación de CA en Android 14

### Contexto técnico
Android 14 introduce el módulo APEX Conscrypt que sirve los certificados CA del sistema desde `/apex/com.android.conscrypt/cacerts/`, en lugar de la ubicación tradicional `/system/etc/security/cacerts/`. Este directorio está montado como read-only incluso con permisos root. Además, Android 7+ usa `subject_hash` en lugar de `subject_hash_old` para el nombre del archivo CA.

### Procedimiento aplicado
1. Arranque del AVD con flag `-writable-system` para permitir escritura en /system.
2. `adb root` + `adb remount` + `adb disable-verity` para obtener acceso de escritura.
3. Push del certificado a /system/etc/security/cacerts/ (para Android legacy).
4. Creación de directorio staging en /data/local/tmp/cacerts/ con todos los CAs originales del sistema + nuestro certificado renombrado al hash moderno.
5. Aplicación de contexto SELinux system_file con chcon.
6. `mount --bind` del directorio staging sobre /apex/com.android.conscrypt/cacerts/.

### Observación metodológica
El procedimiento descrito representa una técnica documentada en la comunidad de seguridad Android para habilitar interceptación HTTPS en investigación. No se introdujo ninguna modificación irreversible al sistema Android del AVD, y todo el proceso es replicable en AVDs limpios. Esta observación es relevante para la sección de Metodología del artículo, en el apartado de consideraciones técnicas del entorno experimental.

## Configuraciones críticas
- **Proxy Burp Suite:** 0.0.0.0:8080 (listener), accesible desde AVD como 10.0.2.2:8080.
- **Certificado CA de Burp:** instalación en AVD Android 14 en progreso; AVD Android 11 pendiente.
- **Configuración AdGuard DNS:** pendiente (próxima jornada).

---