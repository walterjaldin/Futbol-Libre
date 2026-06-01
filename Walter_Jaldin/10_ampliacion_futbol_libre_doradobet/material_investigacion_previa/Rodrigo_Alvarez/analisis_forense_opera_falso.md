# 🔍 Análisis Forense — Instalador Falso de Opera GX desde futbollibretv.su

> **Tipo:** Análisis de red + análisis de sistema  
> **Fecha del incidente:** 21 de mayo de 2026  
> **Entorno:** Máquina virtual Windows 10 (VMware) — aislada  
> **Herramientas usadas:** Wireshark, tshark, PowerShell  
> **Clasificación:** PUA (Potentially Unwanted Application) con firma digital manipulada  

---

## 📋 Índice

1. [Resumen ejecutivo](#1-resumen-ejecutivo)
2. [Contexto del incidente](#2-contexto-del-incidente)
3. [Evidencia — Archivos analizados](#3-evidencia--archivos-analizados)
4. [Comparativa de instaladores](#4-comparativa-de-instaladores)
5. [Análisis de firmas digitales](#5-análisis-de-firmas-digitales)
6. [Análisis de red — Captura 1 (instalación)](#6-análisis-de-red--captura-1-instalación)
7. [Análisis de red — Captura 2 (navegación)](#7-análisis-de-red--captura-2-navegación)
8. [Análisis del sistema](#8-análisis-del-sistema)
9. [Componentes instalados (BITS)](#9-componentes-instalados-bits)
10. [Dominios e IPs sospechosas detectadas](#10-dominios-e-ips-sospechosas-detectadas)
11. [Indicadores de Compromiso (IOCs)](#11-indicadores-de-compromiso-iocs)
12. [Veredicto final](#12-veredicto-final)
13. [Recomendaciones](#13-recomendaciones)

---

## 1. Resumen ejecutivo

Al navegar en el sitio **futbollibretv.su** (sitio de streaming pirata con dominio `.su` soviético), se descargó automáticamente un instalador llamado `OperaSetup (1).exe`. Este archivo se presenta como el instalador oficial de Opera GX pero contiene diferencias clave respecto al instalador legítimo.

El análisis forense de dos capturas de red (Wireshark) y del sistema de la VM reveló que el instalador falso:

- Tiene una **firma digital con fecha manipulada** (firmado un día antes que el instalador oficial)
- Pesa **840 KB menos** que el instalador real
- Activa módulos de **Opera Crypto Wallet** y el **asistente de escritorio** sin consentimiento del usuario
- Pre-configura extensiones antes de que el usuario abra el navegador
- **No instala malware clásico ni backdoor** — actúa como un dropper/PUA de monetización

---

## 2. Contexto del incidente

| Campo | Detalle |
|---|---|
| Sitio de origen | `futbollibretv.su` |
| Tipo de sitio | Streaming pirata — dominio soviético `.su` |
| Archivo descargado | `OperaSetup (1).exe` |
| Acción del usuario | El archivo se descargó automáticamente al navegar |
| Entorno de análisis | VM Windows 10 — VMware — sin carpetas compartidas con host |
| IP de la VM | `192.168.95.134` |
| Usuario de la VM | `concrack` |
| Capturas de red | `caprtura_real4.pcapng` (instalación) · `caprtura_real5.pcapng` (navegación) |

---

## 3. Evidencia — Archivos analizados

| Archivo | Descripción |
|---|---|
| `caprtura_real4.pcapng` | Captura de red durante la instalación de Opera (171 MB) |
| `caprtura_real5.pcapng` | Captura de red durante navegación en Facebook y MEXC crypto |
| `analisis_seguridad.txt` | Volcado de PowerShell: conexiones, autoarranque, usuarios, tareas |
| `OperaGXSetup.exe` | Instalador **legítimo** — referencia |
| `OperaSetup (1).exe` | Instalador **falso** — descargado de futbollibretv.su |

---

## 4. Comparativa de instaladores

| Propiedad | Instalador LEGÍTIMO | Instalador FALSO |
|---|---|---|
| Nombre | `OperaGXSetup.exe` | `OperaSetup (1).exe` |
| Tamaño | 3.93 MB (4,130,296 bytes) | 3.09 MB (3,248,624 bytes) |
| Tamaño en disco | 3.94 MB (4,132,864 bytes) | 3.10 MB (3,252,224 bytes) |
| Diferencia de tamaño | — | **840 KB menor** |
| Fecha de creación | Jueves 21 mayo 2026, 11:32:21 | Jueves 21 mayo 2026, 02:19:58 |
| Fecha de modificación | 21 mayo 2026, 11:33:52 | 21 mayo 2026, 02:25:21 |
| Ubicación | `C:\Users\acald\Downloads` | `C:\Users\concrack\Downloads` |
| Descripción | Opera installer SFX | Opera installer SFX |
| Icono | Opera GX (rojo/negro) | Opera (rojo) — **diferente** |

> ⚠️ **El instalador falso fue creado 9 horas antes** que el instalador oficial del mismo día.

---

## 5. Análisis de firmas digitales

### Instalador LEGÍTIMO

| Campo | Valor |
|---|---|
| Firmante | Opera Norway AS |
| Fecha y hora de firma | **Miércoles 20 de mayo de 2026, 10:44:41** |
| Contrafirma (timestamp) | DigiCert SHA256 — miércoles 20 de mayo |
| Certificado timestamp | DigiCert SHA256 RSA4096 Timestamp Responder 2025 1 |
| Válido desde/hasta | 3/6/2025 — 9/3/2036 |
| Estado | ✅ Firma correcta |

### Instalador FALSO

| Campo | Valor |
|---|---|
| Firmante | Opera Norway AS |
| Fecha y hora de firma | **Martes 19 de mayo de 2026, 00:41:03** |
| Contrafirma (timestamp) | DigiCert SHA256 — martes 19 de mayo |
| Estado | ⚠️ Firma válida pero con fecha **anterior** al instalador oficial |

### Análisis de la anomalía de firma

El instalador falso fue firmado digitalmente el **19 de mayo**, mientras que el oficial fue firmado el **20 de mayo**. Esto es físicamente imposible bajo un flujo normal de distribución: un instalador no puede estar firmado antes de que el instalador oficial exista. Las hipótesis son:

1. El atacante robó o duplicó un certificado de firma anterior de Opera Norway AS
2. El instalador fue construido a partir de una versión antigua de Opera con un binario modificado
3. El proceso de build fue comprometido upstream

---

## 6. Análisis de red — Captura 1 (instalación)

**Archivo:** `caprtura_real4.pcapng`  
**Duración:** ~21 minutos (15:49 – 16:10 UTC del 21/05/2026)  
**Paquetes totales:** ~137,000 frames

### Timeline de eventos

| Hora UTC | Evento | IP / Dominio | Veredicto |
|---|---|---|---|
| 15:49:10 | Inicio — instalador ya corriendo | — | Captura tardía |
| 15:49:12 | Consulta a VirusTotal ×4 | `www.virustotal.com` | ⚠️ Sandbox evasion check |
| 15:49:26 | Activa Opera Crypto Wallet | `xpaywalletcdn-prod.azureedge.net` | ⚠️ Sin consentimiento |
| 15:49:30 | Descarga Opera real (116 MB) | `download5.operacdn.com` · `104.18.11.89` | Dropper technique |
| 15:49:35 | Registro del instalador | `desktop-netinstaller-sub.osp.opera.software` | Normal |
| 15:53:14 | Pre-instala extensiones | `addons.opera.com` · `addons-extensions.operacdn.com` | ⚠️ Antes de abrir Opera |
| 15:53:25 | Registro de actualizaciones | `autoupdate.opera.com` | Normal |
| 15:56:00 | Opera abre por primera vez | — | — |
| 15:56:05 | Sistema de monetización activo | `co-merchandise.opera-api.com` · `ab-merchandise.opera-api.com` | ⚠️ Telemetría inmediata |
| 15:56:10 | Asistente de escritorio activado | `desktop-assistant-sub.osp.opera.software` | ⚠️ Persiste sin navegador |
| 15:56:34 | Crypto exchange activado | `exchange.opera.com` · `af.opera.com` | ⚠️ Tracking financiero |
| 15:57:37 | Descarga 7 componentes vía BITS | `edgedl.me.gvt1.com` (Google) | ✅ Legítimos |

### Técnica del instalador: Dropper

El instalador falso actúa como **dropper**: descarga e instala el Opera real legítimo para no levantar sospechas, mientras configura módulos de monetización y tracking en segundo plano. Esta técnica se usa comúnmente en adware y PUAs.

```
futbollibretv.su
    └─► OperaSetup (1).exe [FALSO - 3.09 MB]
            ├─► Consulta VirusTotal (sandbox check)
            ├─► Activa xpaywalletcdn (crypto wallet)
            ├─► Descarga OperaGX real (116 MB)
            ├─► Pre-configura extensiones en addons.opera.com
            └─► Instala Opera con módulos de monetización activos
```

### Estadísticas de tráfico — Captura 1

| IP Destino | Dominio | Bytes recibidos | Bytes enviados | Dirección |
|---|---|---|---|---|
| `104.18.11.89` | download5.operacdn.com | ~116 MB | ~1 MB | ← Descarga Opera |
| `107.167.125.189` | desktop-netinstaller-sub | ~80 KB | ~5 KB | Registro |
| `13.89.178.26` | xpaywalletcdn (Azure) | ~276 KB | ~70 KB | Wallet |
| `185.26.182.112` | addons.opera.com | ~19 KB | ~4 KB | Extensiones |

---

## 7. Análisis de red — Captura 2 (navegación)

**Archivo:** `caprtura_real5.pcapng`  
**Duración:** ~7 minutos (18:42 – 18:49 UTC del 21/05/2026)  
**Paquetes totales:** ~45,815 frames  
**Actividad del usuario:** Navegación en Facebook, MEXC (crypto exchange)

### Dominios contactados de interés

| Dominio | Categoría | Conexiones | Veredicto |
|---|---|---|---|
| `www.facebook.com` · `static.xx.fbcdn.net` | Red social | 5 | ✅ Normal |
| `www.mexc.com` · `futures.mexc.com` · `otc.mexc.com` | Crypto exchange | 16 | ✅ Normal (usuario lo visitó) |
| `wbs.mexc.com` | WebSocket MEXC (trading real-time) | 3 | ✅ Normal |
| `watchman.gotoda.co` | SDK de analytics/tracking | 10 | ⚠️ Heartbeat cada ~60s |
| `trochi.gotoda.co` · `trochilus-web.gotoda.co` | GoToDa SDK | 4 | ⚠️ Tracking SDK |
| `sentry-new.gotoda.co` · `e.gotoda.co` | GoToDa error reporting | 5 | ⚠️ Reporte de errores |
| `static.mocortech.com` · `public.mocortech.com` | CDN de terceros | 6 | ⚠️ Desconocido |
| `pixelfnt-us.dsp-api.moloco.com` | Moloco — Ad platform | 12 | ⚠️ Publicidad dirigida |
| `mc.yandex.ru` | Yandex Metrica (analytics ruso) | 7 | ⚠️ Tracker ruso |
| `af.opera.com` | Opera affiliates | 8 | ⚠️ Monetización |
| `ab-merchandise.opera-api.com` | Opera A/B testing | 1 | ⚠️ Telemetría |
| `sync.taboola.com` | Taboola (ad network) | 1 | ⚠️ Publicidad |
| `api.fpjs.io` | FingerprintJS — fingerprinting | 2 | ⚠️ Huellas digitales |

### gotoda.co — SDK de tracking

`gotoda.co` es un SDK de analytics con comportamiento de **heartbeat**: `watchman.gotoda.co` recibe pings cada ~60 segundos mientras el navegador está abierto. Envía datos de telemetría sobre el comportamiento del usuario.

```
VM (192.168.95.134)
    ├─► watchman.gotoda.co:443  ×10  [heartbeat cada 60s]
    ├─► trochi.gotoda.co:443    ×4   [sesión de usuario]
    ├─► sentry-new.gotoda.co    ×3   [errores y eventos]
    └─► e.gotoda.co             ×4   [eventos de tracking]
```

### Actividad STUN detectada

Se detectaron 12 paquetes STUN hacia `44.194.44.174` — protocolo usado para WebRTC (videoconferencias o comunicación P2P). No se identificó uso malicioso; puede ser parte de una funcionalidad de Opera o de algún sitio visitado.

---

## 8. Análisis del sistema

**Fuente:** `analisis_seguridad.txt` — ejecutado vía PowerShell como Administrador

### Conexiones activas al momento del análisis

Todas las conexiones identificadas corresponden a procesos legítimos:

| Proceso | IPs contactadas | Servicio |
|---|---|---|
| `svchost` | 23.211.109.x, 92.223.98.98, 95.101.24.197, 130.213.27.178, 150.171.110.40 | Windows Update / Akamai CDN |
| `opera...` | 104.18.11.89, 127.0.0.1 | Opera GX (CDN + IPC local) |
| `OneDrive` | 20.50.80.210 | Microsoft OneDrive |
| `updater` | 34.104.35.123, 108.177.123.x | Google Update |
| `Search...` | 204.79.197.222, 190.98.160.131, 23.11.35.158, 23.37.9.179 | Bing / Microsoft Search |
| `Micro...` | 74.178.232.29 | Microsoft (Teams/Edge) |
| Sin nombre | 52.168.117.168 ×2 | Microsoft Azure (normal) |

> ✅ **No se detectaron conexiones a IPs de C2, botnets, ni rangos maliciosos conocidos.**

### Autoarranque (HKCU y HKLM)

| Entrada | Ejecutable | Veredicto |
|---|---|---|
| OneDrive | `AppData\Local\Microsoft\OneDrive\OneDrive.exe` | ✅ Legítimo |
| FiddlerEverywhere.Cleanup | `AppData\Local\Programs\Fiddler Everywhere\...` | ⚠️ Proxy de análisis — intercepta tráfico |
| Mozilla Firefox | `Program Files\Mozilla Firefox\firefox.exe` | ✅ Legítimo |
| **Opera Browser Assistant** | `AppData\Local\Programs\Opera\assistant\browser_assistant.exe` | ⚠️ Instalado por Opera falso — corre en segundo plano |
| **Opera Stable** | `AppData\Local\Programs\Opera\opera.exe --autostart` | ⚠️ Instalado por Opera falso |
| SecurityHealth | `C:\Windows\system32\SecurityHealthSystray.exe` | ✅ Windows Defender |
| VMware User Process | `Program Files\VMware\VMware Tools\vmtoolsd.exe` | ✅ VMware |

### Tareas programadas

| Tarea | Ejecutable | Veredicto |
|---|---|---|
| npcapwatchdog | `C:\Program Files\Npcap\CheckStatus.bat` | ✅ Npcap (Wireshark) |
| OneDrive (×3) | `%localappdata%\Microsoft\OneDrive\...` | ✅ Legítimo |
| **Opera scheduled assistant Autoupdate** | `AppData\Local\Programs\Opera\...` | ⚠️ Actualización silenciosa de Opera |
| RunPlatformExperienceHelper (×2) | `Program Files\Google\Chrome\...` | ✅ Chrome |
| Firefox Default Browser Agent | `C:\Program Files\Mozilla Firefox\...` | ✅ Legítimo |

### Usuarios del sistema

| Usuario | Habilitado | Estado |
|---|---|---|
| concrack | ✅ Sí | Usuario principal — legítimo |
| Administrator | ❌ No | Desactivado — correcto |
| DefaultAccount | ❌ No | Sistema — correcto |
| Guest | ❌ No | Desactivado — correcto |
| WDAGUtilityAccount | ❌ No | Windows Defender sandbox — correcto |

> ✅ **No se crearon usuarios nuevos. No hay backdoor de cuenta.**

---

## 9. Componentes instalados (BITS)

Opera usó el servicio **Microsoft BITS** (Background Intelligent Transfer Service) para descargar 7 componentes desde los servidores de Google (`edgedl.me.gvt1.com`). Todos son componentes estándar del motor Chromium:

| ID de componente | Nombre | Función |
|---|---|---|
| `neifaoindggfcjicffkgpmnlppeffabd` | Widevine CDM | DRM para Netflix, Spotify, Disney+ |
| `oimompecagnajdejgnnjijobebaeigek` | Widevine CDM (adicional) | Módulo DRM secundario |
| `hfnkpimlhhgieaddgfemjhofmfblmnib` | CRLSet / Certificate Verifier | Lista de certificados revocados |
| `efniojlnjndmcbiieegkicadnoecjjef` | PKI Metadata | Infraestructura de clave pública |
| `jflookgnkcckhobaglndicnbbgbonegd` | Safety Tips / Lookalike URL | Detección de URLs de phishing |
| `laoigpblnllgcgjnjnllmfolckpjlhki` | MEI Preload | Control de autoplay de medios |
| `jamhcnnkihinmdlkakkaopbjbbcngflc` | Hyphenation Data | Separación de sílabas por idioma |

> ✅ **Todos son componentes legítimos de Chromium. No se descargó malware adicional.**

---

## 10. Dominios e IPs sospechosas detectadas

### Durante la instalación

| Dominio | IP | Momento | Motivo de alerta |
|---|---|---|---|
| `www.virustotal.com` | `34.54.88.138` | 15:49:12 — primeros 3s | Sandbox evasion check |
| `xpaywalletcdn-prod.azureedge.net` | `13.89.178.26` | 15:49:26 — 16s después | Crypto wallet sin consentimiento |
| `addons-extensions.operacdn.com` | `185.26.182.112` | 15:53:14 | Extensiones pre-instaladas silenciosamente |
| `co-merchandise.opera-api.com` | — | 15:56:05 | Monetización activa al primer arranque |
| `ab-merchandise.opera-api.com` | — | 15:56:05 | A/B testing de anuncios |
| `exchange.opera.com` | — | 15:56:34 | Módulo crypto exchange |
| `af.opera.com` | — | 15:56:34 | Sistema de afiliados Opera |

### Durante la navegación

| Dominio | IP | Tipo | Nivel de riesgo |
|---|---|---|---|
| `watchman.gotoda.co` | `175.41.214.195` | Heartbeat tracking | 🟡 Medio |
| `trochi.gotoda.co` | `18.178.22.112` | Analytics SDK | 🟡 Medio |
| `sentry-new.gotoda.co` | `13.192.57.237` | Error reporting | 🟡 Medio |
| `e.gotoda.co` | `57.181.145.109` | Event tracking | 🟡 Medio |
| `static.mocortech.com` | `18.164.13.x` | CDN desconocido | 🟡 Medio |
| `pixelfnt-us.dsp-api.moloco.com` | `34.111.130.7` | Ad targeting platform | 🟡 Medio |
| `mc.yandex.ru` | `87.250.251.119` | Analytics ruso | 🟡 Medio |
| `api.fpjs.io` | `50.19.210.191` | Browser fingerprinting | 🟠 Medio-alto |
| `ab.dgshen.com` | `52.192.189.47` | Desconocido — Japón AWS | 🟠 Medio-alto |

---

## 11. Indicadores de Compromiso (IOCs)

### Hashes (pendiente de calcular sobre muestra)

```
Archivo: OperaSetup (1).exe
Tamaño:  3,248,624 bytes (3.09 MB)
MD5:     [calcular con: Get-FileHash -Algorithm MD5]
SHA256:  [calcular con: Get-FileHash -Algorithm SHA256]
```

### Dominios IOC

```
futbollibretv.su          # Sitio de origen del malware
watchman.gotoda.co        # Heartbeat tracking cada 60s
trochi.gotoda.co          # Analytics SDK
e.gotoda.co               # Event tracking
sentry-new.gotoda.co      # Error reporting tracker
static.mocortech.com      # CDN desconocido
public.mocortech.com      # CDN desconocido
opt.mocortech.com         # CDN desconocido
ab.dgshen.com             # Dominio desconocido Japón
```

### IPs IOC

```
175.41.214.195    # watchman.gotoda.co (heartbeat C2-like)
57.181.145.109    # e.gotoda.co
18.178.22.112     # trochi.gotoda.co
13.192.57.237     # sentry-new.gotoda.co
52.192.189.47     # ab.dgshen.com
18.164.13.x       # mocortech.com (rango CDN)
```

### Entradas de Registro creadas

```
HKCU\Software\Microsoft\Windows\CurrentVersion\Run
  "Opera Browser Assistant" = C:\Users\concrack\AppData\Local\Programs\Opera\assistant\browser_assistant.exe
  "Opera Stable"            = "C:\Users\concrack\AppData\Local\Programs\Opera\opera.exe" --autostart
```

### Tarea programada creada

```
Nombre: Opera scheduled assistant Autoupdate 1779378948
Ruta:   C:\Users\concrack\AppData\Local\Programs\Opera\...
Estado: Ready (ejecuta en segundo plano)
```

---

## 12. Veredicto final

| Categoría | Resultado |
|---|---|
| **Tipo de amenaza** | PUA — Potentially Unwanted Application (dropper + adware) |
| **Firma digital** | ⚠️ Manipulada — fechada 1 día antes del instalador oficial |
| **Backdoor / RAT** | ❌ No detectado |
| **Exfiltración de datos** | ❌ No detectada durante las capturas |
| **Servidor C2** | ❌ No detectado |
| **Usuario nuevo creado** | ❌ No |
| **Persistencia** | ✅ Sí — Opera en autoarranque + tarea programada de actualización |
| **Módulos activados sin consentimiento** | ✅ Sí — Crypto Wallet, Exchange, Browser Assistant |
| **Tracking / telemetría** | ✅ Sí — gotoda.co, moloco.com, Yandex, FingerprintJS |
| **Componentes descargados** | ✅ Sí — 7 vía BITS (todos legítimos de Chromium) |
| **Riesgo para máquina REAL** | 🔴 Alto si se instala fuera de VM |
| **Riesgo para VM de análisis** | 🟡 Medio — privacidad y persistencia |

### Conclusión

El instalador `OperaSetup (1).exe` de **futbollibretv.su** es un **dropper de tipo PUA** que:

1. Instala el navegador Opera GX legítimo para no levantar sospechas
2. Activa módulos de **monetización y crypto** sin pedir permiso
3. Tiene una **firma digital con fecha inconsistente** respecto al instalador oficial
4. Establece **persistencia** en el autoarranque y tareas programadas
5. Durante la navegación activa **trackers de terceros** (gotoda.co, Moloco, Yandex)

No se detectó código malicioso de acceso remoto ni robo de credenciales. El riesgo principal es de **privacidad y rastreo de comportamiento financiero** (crypto wallet activo).

---

## 13. Recomendaciones

### Para el entorno analizado (VM)

```powershell
# 1. Eliminar Opera del autoarranque
Remove-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run" -Name "Opera Stable"
Remove-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run" -Name "Opera Browser Assistant"

# 2. Eliminar tarea programada de Opera
Unregister-ScheduledTask -TaskName "Opera scheduled assistant Autoupdate 1779378948" -Confirm:$false

# 3. Escaneo completo con Windows Defender
Start-MpScan -ScanType FullScan

# 4. Calcular hashes del instalador falso para base de datos IOC
Get-FileHash "OperaSetup (1).exe" -Algorithm MD5
Get-FileHash "OperaSetup (1).exe" -Algorithm SHA256
```

### Generales

- **No instalar software de sitios de streaming pirata** — los dominios `.su` son especialmente usados para distribuir malware
- **Verificar siempre la firma digital** de instaladores antes de ejecutarlos — comparar fecha de firma con la release oficial
- **Comparar el tamaño del archivo** con el publicado en el sitio oficial del proveedor
- **Usar VM aislada sin carpetas compartidas** para analizar software sospechoso
- **Desactivar Fiddler Everywhere** del autoarranque cuando no se use activamente — intercepta todo el tráfico HTTPS incluyendo contraseñas
- Bloquear los dominios IOC en firewall o archivo hosts si se sospecha infección en máquina real

---

## 📁 Estructura de evidencias recomendada para repositorio

```
/
├── README.md                          # Este informe
├── capturas/
│   ├── caprtura_real4.pcapng          # Captura instalación
│   └── caprtura_real5.pcapng          # Captura navegación
├── imagenes/
│   ├── firma_digital_legitimo.png     # Firma instalador real
│   ├── firma_digital_falso.png        # Firma instalador falso
│   └── propiedades_comparativa.png    # Comparativa de propiedades
├── sistema/
│   └── analisis_seguridad.txt         # Volcado PowerShell
└── iocs/
    └── iocs.txt                       # Lista de IOCs extraídos
```

---

*Análisis realizado con fines educativos e investigación de seguridad.*  
*Entorno: VM aislada — ningún dato real fue comprometido durante el análisis.*
