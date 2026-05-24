# Análisis de suv5.js (SmartURL v5 — Adsterra)

**Fecha:** 24 de mayo de 2026  
**Investigador:** Walter Jaldín  
**Fuente:** `https://acscdn.com/script/suv5.js`  
**Tamaño:** 62,862 bytes  
**Ofuscación:** Custom base64 (mismo esquema que aclib.js)  
**Strings decodificados:** 687  
**Nota:** Este script fue descubierto en sesiones experimentales (14 may 2026) pero **nunca antes analizado**.

---

## ¿Qué es suv5.js?

`suv5.js` es el **motor de ejecución de anuncios** que trabaja junto con `aclib.js`. Mientras que `aclib.js` se encarga de la configuración, detección de entorno y fingerprinting, `suv5.js` maneja:

- La lógica de **renderizado de overlays** (popunder, interstitial, banner, video)
- La **gestión de eventos** (click, mousedown, scroll, visibility change)
- El **attach/detach de listeners** para cada tipo de anuncio
- La **comunicación con el servidor RTB** (`url5.php`)
- El **control de estado** de cada overlay

El nombre "suv5" corresponde a **"SmartURL versión 5"**, el sistema que genera URLs de destino dinámicas según el perfil del visitante.

---

## Relación con aclib.js

```
aclib.js (configuración + detección)
├── ZoneConfig (zoneId, aggressivity, adsCapping, ...)
├── Detector de entorno (headless, DevTools, WebDriver)
├── Client Hints → usrpubtrk.com
│
└── Delega a → suv5.js (ejecución)
    ├── PopUnder engine
    ├── Interstitial engine
    ├── In-Page Push engine
    ├── Video Slider engine
    ├── Banner engine
    ├── RTB communication → url5.php
    └── State management
```

---

## Strings clave revelados

### Formatos de anuncio

| String | Referencia |
|---|---|
| `PopUnder` | Popunder engine |
| `runInPageP` | In-Page Push execution |
| `runInterst` | Interstitial execution |
| `runVideoSl` | Video Slider execution |
| `IFRAME OVERLAY` | Overlay type iframe |
| `VIDEO OVER` | Video overlay |
| `OVERLAY` | Generic overlay |

### Eventos

| String | Propósito |
|---|---|
| `mousedown` | Trigger de popunder |
| `click` | Click tracking |
| `scroll` | Scroll detection |
| `visibilitychange` | Tab visibility |
| `pagehide` | Page hide event |
| `blur` | Window blur (tab swap) |
| `focus` | Window focus |
| `resize` | Window resize |
| `touchstart` | Touch events (mobile) |
| `touchend` | Touch end (mobile) |

### Configuración

| String | Propósito |
|---|---|
| `zoneId` | Zone ID del publisher |
| `ZoneId` | Referencia a Zone ID |
| `linkedZone` | Zone vinculada |
| `collective` | Zone colectiva |
| `adserverDo` | Ad server domain |
| `tagVersion` | Tag version |
| `abTest` | A/B testing ID |
| `aggressivi` | Aggressivity level |
| `adsCapping` | Ad capping config |
| `isAdbMode` | Adblock mode detection |
| `adbVersion` | Adblock version |

### Endpoints

| String | Propósito |
|---|---|
| `url5.php` | SmartURL endpoint |
| `/script/su` | Script path prefix |
| `&fmt=suv5` | Format identifier |
| `&cbiframe=` | Callback iframe |
| `&cbpage=` | Callback page |
| `&cbWidth=` | Callback width |
| `&cbHeight=` | Callback height |
| `&cbtitle=` | Callback title |
| `&cbdescrip` | Callback description |
| `&cbcdn=` | Callback CDN |
| `&cbref=` | Callback referrer |
| `&cbkeyword` | Callback keyword |
| `&cbur=` | Callback URL |
| `&pub_hash=` | Publisher hash |
| `&pub_value` | Publisher value |
| `&pub_click` | Publisher click ID |
| `&allowed_c` | Allowed countries |
| `&excluded_` | Excluded countries |

---

## Comportamiento inferido

```
suv5.js se carga como parte del popunder/overlay
│
├── Inicializa estado del overlay (preState, currentState)
├── Attach listeners para eventos:
│   ├── mousedown → trigger popunder
│   ├── visibilitychange → pausar/reanudar
│   ├── blur → tabswap detection → reopen popup
│   ├── resize → re-calcular dimensiones
│   └── scroll → lazy loading
│
├── Comunicación con RTB:
│   ├── GET url5.php con parámetros de fingerprint
│   ├── Recibe URL destino del popunder
│   └── Maneja fallbacks (timeout, retry)
│
├── Renderizado del overlay:
│   ├── Crea elementos HTML (div, iframe, img)
│   ├── Posiciona con CSS (position:absolute/fixed)
│   ├── Maneja z-index
│   └── Limpia overlays anteriores
│
└── Tracking:
    ├── sendBeacon para eventos
    ├── localStorage para estado persistente
    └── Callbacks de impresión y clicks
```

---

## Diferencias con aclib.js

| Aspecto | aclib.js | suv5.js |
|---|---|---|
| Rol | Configuración + detección | Ejecución + renderizado |
| Strings | 1556 | 687 |
| Tamaño | 166 KB | 62 KB |
| Fingerprinting | Sí (client hints + WebGL) | No |
| Anti-detección | Sí (headless, DevTools) | Parcial |
| Overlays | Configura | Renderiza |
| Event listeners | Configura | Attach/detach |
| RTB | Inicia subasta | Obtiene URL final |

---

## Riesgos específicos de suv5.js

1. **Ejecución en contexto de popup** — suv5.js se ejecuta dentro de la ventana emergente, no en la página principal
2. **Acceso a datos de navegación** — Puede leer `document.referrer`, `location`, `title` del popup
3. **Persistencia cross-session** — Usa `localStorage` con claves como `suv5_`, `atag_`
4. **Redirecciones encadenadas** — La URL determinada por RTB puede redirigir múltiples veces
5. **Stripe SDK** — Demostrado en sesión A11-D-R1: `js.stripe.com` cargado desde `doradobet.com` vía popunder RTB
