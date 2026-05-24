# Análisis de at.js — Auto-Tag / Tracking Engine

**Fecha:** 24 de mayo de 2026  
**Fuente:** `https://acscdn.com/script/at.js`  
**Tamaño:** 30,821 bytes  
**Ofuscación:** Custom base64 (mismo esquema)  
**Strings decodificados:** 359  

---

## ¿Qué es?

`at.js` (auto-tag) es el **motor de tracking y analytics** del ecosistema Adsterra. Su función principal es recolectar métricas de comportamiento del usuario y enviarlas a los servidores de tracking. Es el equivalente a Google Analytics pero del ecosistema Adsterra.

---

## Hallazgos clave

### Dominios NUEVOS descubiertos

| Dominio | Propósito |
|---|---|
| `wkbc42.com` | Tracking server (NUEVO) |
| `wkbc21.com` | Tracking server (NUEVO) |
| `quesid.com` (parcial: `//quesid.c`) | Posible tracking/analytics |

Estos dominios **NO estaban documentados** en el análisis OSINT previo.

### Endpoints de tracking

| String | Endpoint | Propósito |
|---|---|---|
| `/ad/visit.` | POST a endpoint de visitas | Registro de page view |
| `/al/visit.` | POST alternativo | Registro alternativo |
| `/ut/aft.ph` | After-tag? | Post-auto-tag |
| `/ut/aut.ph` | Auto-tag? | Auto-tag endpoint |
| `php?al=1` | Auto-log? | Logging |
| `php?al=8,1` | Auto-log variant | Logging alternativo |

### Métricas recolectadas

| String | Métrica | Origen |
|---|---|---|
| `userAgent` | User Agent string | `navigator.userAgent` |
| `platform` | Plataforma | `navigator.platform` |
| `language` | Idioma | `navigator.language` |
| `brands` | Browser brands | `navigator.userAgentData.brands` |
| `model` | Modelo dispositivo | `navigator.userAgentData.model` |
| `version` | Versión browser | `navigator.appVersion` |
| `appName` | Nombre app | `navigator.appName` |
| `appCodeNam` | Código app | `navigator.appCodeName` |
| `cookieEnab` | Cookies habilitadas | `navigator.cookieEnabled` |
| `javaEnable` | Java habilitado | `navigator.javaEnabled()` |
| `hardwareCo` | Hardware concurrency | `navigator.hardwareConcurrency` |
| `deviceMemo` | Device memory | `navigator.deviceMemory` |
| `maxTouchPo` | Max touch points | `navigator.maxTouchPoints` |
| `pixelDepth` | Pixel depth | `screen.pixelDepth` |
| `timezoneOf` | Timezone offset | `Date.getTimezoneOffset()` |
| `chu`, `chmob`, `chmod`, `chp`, `chpv`, `chuafv` | Client Hints | `navigator.userAgentData` |

### Comportamiento del usuario

| String | Métrica | Evento |
|---|---|---|
| `totalClick` | Total de clicks | click events |
| `clicksByTy` | Clicks por tipo | click type classification |
| `mouseMove` | Movimiento de mouse | mousemove events |
| `sessionLen` | Duración de sesión | session timer |
| `isScrollab` | ¿Es scrolleable? | scrollHeight check |
| `pagePercen` | Porcentaje de página visto | scroll position |
| `belowTheFo` | Below the fold | scroll threshold |
| `isScrolled` | ¿Ha scrolleado? | scroll boolean |
| `activeSess` | Sesión activa | activity timer |
| `lastActivi` | Última actividad | timestamp |
| `ropyValues` | Entropy values | fingerprinting |

### Detección de bots/fraude

| String | Propósito |
|---|---|
| `User activ` | Detección de actividad de usuario |
| `Actionable` | ¿Usuario es accionable? |
| `Click dete` | Detección de click genuino |
| `Bot trap l` | Bot trap links |
| `Fraud init` | Inicialización de detección de fraude |
| `Known bots` | Lista de bots conocidos |
| ` inIframe` | ¿Ejecutándose en iframe? |
| `bot_link` | Bot trap link |

### DOM scraping

| String | Propósito |
|---|---|
| `data-adel` | Atributo data-adel="as" |
| `data-href` | Atributo data-href |
| `data-url` | Atributo data-url |
| `data-link` | Atributo data-link |
| `script[dat` | Script con atributos data |
| `element-ac` | Element actionable |
| `country-li` | Country list element |
| `country-ac` | Country actionable element |

---

## Comportamiento inferido

```
at.js se carga en segundo plano
│
├── Inicializa recolector de métricas
├── Registra event listeners para:
│   ├── mousemove → mouseMove tracking
│   ├── click → totalClick, clicksByType
│   ├── scroll → pagePercentage, belowTheFold
│   ├── touchmove → touch events (mobile)
│   ├── visibilitychange → session active/inactive
│   └── blur → tab inactivity
│
├── Recolecta fingerprint del dispositivo:
│   ├── navigator properties
│   ├── Client Hints (Sec-CH-UA)
│   └── Screen properties
│
├── Envía datos periódicamente a:
│   ├── wkbc42.com (via POST/XMLHttpRequest)
│   ├── wkbc21.com (alternate)
│   ├── /ad/visit.php
│   └── /ut/aft.php
│
└── Bot detection:
    ├── Bot trap links (invisible)
    ├── User activity patterns
    └── Known bot signatures
```

---

## Riesgos específicos

1. **NUEVOS DOMINIOS** `wkbc42.com` y `wkbc21.com` — No documentados en OSINT, expanden el ecosistema
2. **Captura completa de comportamiento** — Click, scroll, movimiento, tiempo de sesión, visibilidad de pestaña
3. **Fingerprinting extensivo** — Client Hints, hardware, screen, OS, browser
4. **Bot traps** — Elementos invisibles que detectan si un bot está navegando
5. **DOM scraping** — Lee atributos `data-*` de elementos en la página
6. **Sin consentimiento** — Todo el tracking ocurre sin aviso ni opción de opt-out
