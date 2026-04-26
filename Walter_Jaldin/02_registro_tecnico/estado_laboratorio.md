# Estado del laboratorio — Checkpoint diario
**Investigador:** Jaldin Gonzales Walter

## Última actualización: 26 de abril de 2026 — Cierre Día 2

---

## Estado actual: LABORATORIO 100% OPERATIVO ✅

### Configuración completa
- ✅ Estructura de carpetas en repo + local.
- ✅ Software base instalado: Android Studio, Burp Suite, Wireshark, OBS Studio.
- ✅ Cuentas OSINT operativas (con sustituciones documentadas).
- ✅ AVD A14_perfil_investigacion con 3 snapshots.
- ✅ AVD A11_perfil_investigacion con 3 snapshots.
- ✅ Certificado CA de Burp instalado en ambos AVDs como CA de sistema.
- ✅ Interceptación HTTPS verificada en ambos.
- ✅ AdGuard DNS configurado para perfiles "D".
- ✅ Procedimiento de bind mount documentado para A14.

---

## Mapa de perfiles experimentales

| Perfil | AVD | Snapshot a cargar | Acción tras cargar |
|---|---|---|---|
| A14-N | A14_perfil_investigacion | baseline_con_burp | Reaplicar bind mount |
| A14-D | A14_perfil_investigacion | baseline_con_proteccion | Reaplicar bind mount |
| A11-N | A11_perfil_investigacion | baseline_con_burp | Ninguna (listo) |
| A11-D | A11_perfil_investigacion | baseline_con_proteccion | Ninguna (listo) |

---

## Próximas fases

### Fase siguiente — Reconocimiento OSINT del sitio
- WHOIS, certificados, infraestructura, reputación.
- Sin tocar el sitio aún. Trabajo desde herramientas externas.
- Salida: documento de caracterización del objeto de estudio.

### Después — Reconocimiento activo no invasivo
- Cabeceras HTTP, URLScan.io, evaluación de seguridad.

### Después — Sesión piloto
- Una sesión de prueba completa para calibrar protocolo y umbrales del IEU.

### Después — 20 sesiones experimentales (5 asignadas a Walter)

---

## Procedimiento de bind mount A14 (referencia rápida)

Tras cargar cualquier snapshot de A14:

cd ~/Library/Android/sdk/platform-tools
./adb root
./adb shell
mount --bind /data/local/tmp/cacerts /apex/com.android.conscrypt/cacerts
exit

Verificación:

ls /apex/com.android.conscrypt/cacerts/ | grep 7bf17d07

Debe mostrar `7bf17d07.0`.

---

## Información crítica para el laboratorio

- **IP del host desde AVD:** 10.0.2.2
- **Puerto Burp:** 8080
- **DNS AdGuard (perfiles D):** 94.140.14.14 y 94.140.15.15
- **IP estática del AVD:** 10.0.2.16, gateway 10.0.2.2, prefix 24
- **Certificado A14:** /apex/com.android.conscrypt/cacerts/7bf17d07.0 (vía bind mount)
- **Certificado A11:** /system/etc/security/cacerts/9a5ba575.0 (persistente)

