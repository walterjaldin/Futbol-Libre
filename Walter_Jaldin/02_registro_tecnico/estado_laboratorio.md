# Estado del laboratorio — Checkpoint diario
**Investigador:** Jaldin Gonzales Walter

## Última actualización: 22 de abril de 2026, cierre de jornada día 1

---

## Estado actual

### ✅ Completado y funcional
- Estructura de carpetas en repo + local.
- Android Studio operativo con SDK configurado.
- Burp Suite, Wireshark, OBS Studio instalados.
- Cuentas OSINT creadas (excepto SecurityTrails sustituido y Any.run pendiente).
- AVD A14_perfil_investigacion (Android 14, Pixel 6) creado con snapshot `baseline_limpio`.
- AVD A11_perfil_investigacion (Android 11, Pixel 5) creado con snapshot `baseline_limpio`.
- Certificado CA de Burp exportado, convertido y renombrado a los dos hashes necesarios.
- Certificado copiado físicamente a /system/etc/security/cacerts/ del AVD A14.
- Carpeta /data/local/tmp/cacerts/ preparada en AVD A14 con 7bf17d07.0 listo.

### ⏸ En progreso — se retoma mañana
- Bind mount persistente de certificado en /apex/ del AVD A14.
- Snapshot `baseline_con_burp` en AVD A14 (no creado aún).
- Verificación de interceptación HTTPS en A14.
- Instalación de certificado en AVD A11.
- Snapshot `baseline_con_burp` en AVD A11.
- Configuración de AdGuard DNS.

---

## Plan de retoma — Próxima jornada

### Fase 1 — Terminar AVD A14 (~20 min)
1. Abrir Burp Suite (o cargar proyecto guardado).
2. Arrancar A14 con:

cd ~/Library/Android/sdk/emulator
./emulator -avd A14_perfil_investigacion -writable-system

3. Esperar home. Verificar Chrome y Settings responden.
4. En otra terminal:

cd ~/Library/Android/sdk/platform-tools
./adb root
./adb shell

5. Dentro del shell del emulador verificar:

ls /data/local/tmp/cacerts/ | grep 7bf17d07

Debe mostrar 7bf17d07.0.
6. Aplicar bind mount:

mount --bind /data/local/tmp/cacerts /apex/com.android.conscrypt/cacerts

7. Salir del shell (exit).
8. **INMEDIATAMENTE tomar snapshot** (sin restart zygote):
   - Extended Controls → Snapshots → Take snapshot → `baseline_con_burp`.
9. Configurar proxy en AVD: WiFi → Modify → Proxy Manual → 10.0.2.2:8080.
10. Verificar: abrir Chrome → https://example.com → revisar en Burp que aparece descifrado.
11. Si Chrome muestra error de certificado, cerrar Chrome y reabrir (sin restart zygote). Si persiste, consultar con apoyo metodológico.

### Fase 2 — AVD A11 (~30 min)
Android 11 no tiene protección APEX. Proceso más directo:
1. Arrancar A11 con -writable-system.
2. adb root + remount + disable-verity (si hace falta).
3. Push del certificado 9a5ba575.0 (NO el 7bf17d07.0, porque A11 usa subject_hash_old) a /system/etc/security/cacerts/.
4. chmod 644 + reboot.
5. Verificar en Settings → Security → Trusted credentials → System: debe aparecer PortSwigger.
6. Configurar proxy WiFi 10.0.2.2:8080.
7. Verificar interceptación en Burp.
8. Tomar snapshot `baseline_con_burp`.

### Fase 3 — AdGuard DNS (~30 min)
Pendiente definir procedimiento exacto. Dos opciones:
- Configurar DNS personalizado en WiFi del AVD apuntando a servidores de AdGuard.
- Instalar app de AdGuard en el AVD (requiere Google Play, no disponible en Google APIs).

### Fase 4 — Snapshot final y documentación (~20 min)

---

## Información crítica para no perder

- **IP del host desde AVD:** 10.0.2.2 (constante, no cambia según red).
- **Puerto de Burp:** 8080.
- **Usuario ADB:** root (asegurado con `./adb root`).
- **Ruta del certificado para A14:** /apex/com.android.conscrypt/cacerts/7bf17d07.0 (vía bind mount).
- **Ruta del certificado para A11:** /system/etc/security/cacerts/9a5ba575.0 (directo).

---