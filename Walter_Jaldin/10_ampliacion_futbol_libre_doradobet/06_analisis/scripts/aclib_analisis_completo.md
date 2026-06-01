# Análisis completo de aclib.js (Adsterra)

**Fecha:** 24 de mayo de 2026  
**Investigador:** Walter Jaldín  
**Fuente:** `https://acscdn.com/script/aclib.js`  
**Tamaño:** 166,680 bytes  
**Ofuscación:** Custom base64 (alfabeto: a-z, A-Z, 0-9, +, /)  
**Método:** Deobfuscación mediante extracción y decodificación del string array (1556 strings)

---

## Resumen

`aclib.js` no es un simple loader de popunder. Es un **motor completo de detección de entorno, fingerprinting, y entrega de publicidad agresiva** que implementa:

1. **Anti-detección:** Detecta si está siendo ejecutado en un entorno de análisis (headless browser, DevTools, Puppeteer, WebDriver, CDP)
2. **Fingerprinting multi-capa:** Recopila client hints, WebGL, canvas, navegador, OS, dispositivo, y comportamiento del usuario
3. **Múltiples formatos de anuncio:** PopUnder, Interstitial, In-Page Push, Banner, Video Slider, AutoTag
4. **Subasta RTB:** Integración con `adexchangerapid.com` para ads en tiempo real
5. **Persistencia:** Usa localStorage, sessionStorage, cookies y Service Workers
6. **Anti-bot:** Detección de movimiento de mouse, scroll, clicks para validar usuario humano

---

## Arquitectura general

```
aclib.js (motor principal)
├── Configuración (ZoneConfig)
├── Clase Logger (debug con niveles)
├── Client Hints collector → usrpubtrk.com
├── Detector de entorno
│   ├── Headless browser detection
│   ├── WebDriver / Puppeteer / CDP detection
│   ├── Sandbox detection
│   └── DevTools detection
├── Formatos de anuncio
│   ├── PopUnder (principal)
│   ├── Interstitial
│   ├── In-Page Push
│   ├── Banner
│   └── Video Slider
├── RTB Integration → adexchangerapid.com
│   └── suv5.js (SmartURL v5)
└── Persistencia y tracking
    ├── localStorage
    ├── sessionStorage
    └── Service Worker (sw.js)
```

---

## 1. Sistema de ofuscación

Usa **custom base64** con alfabeto reordenado:
- **Custom:** `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=`
- **Standard:** `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`

Esto impide la decodificación directa con herramientas estándar. Contiene **1556 strings** en el array interno, referenciados mediante índices hex desde la función `_0x2791(index)`.

---

## 2. Fingerprinting (usrpubtrk.com)

El script recolecta y envía a `usrpubtrk.com` los siguientes datos mediante POST:

| Campo | Descripción | Origen |
|---|---|---|
| `chu` | Brand list (Chrome, Chromium) | `navigator.userAgentData.brands` |
| `chmob` | ¿Es móvil? | `navigator.userAgentData.mobile` |
| `chmod` | Modelo de dispositivo | `navigator.userAgentData.model` |
| `chp` | Plataforma | `navigator.userAgentData.platform` |
| `chpv` | Versión del OS | `navigator.userAgentData.platformVersion` |
| `chuafv` | Versión completa del UA | `navigator.userAgentData.uaFullVersion` |
| `isScrollable` | ¿Tiene scroll? | `document.documentElement.scrollHeight` |
| `totalClicks` | Conteo de clicks | Mouse events |
| `sessionLength` | Duración de sesión | Timestamps |
| `ippMissclicks` | Missclicks | Patrones de click |

Además recolecta datos de **WebGL** (vendor, renderer), **Canvas fingerprinting**, **lenguajes**, **zona horaria**, **hardware concurrency**, **max touch points**, y más.

---

## 3. Detección de entorno de análisis

El script implementa **múltiples detectores** para evitar ser analizado:

| Detector | Strings clave | Certeza |
|---|---|---|
| **Headless browser** | `isHeadless`, `s 'Headless` | 0.99 |
| **Chrome DevTools Protocol (CDP)** | `isCDPDetec`, `window.cdc_` | Alta |
| **WebDriver** | `isWebDrive`, `webdriver` | Alta |
| **Puppeteer** | `puppeteer_` | Alta |
| **Chrome for Testing** | `Chrome Dev`, `googlechro` | Alta |
| **Headless Chrome** | `'Headles` | Media |
| **Sandbox** | `isSandboxed`, `sandbox` | Media |
| **Offscreen canvas** | `of Offscre` | Media |
| **PhantomOS** | (navegadores headless) | Media |

Si detecta un entorno de análisis, el script puede alterar su comportamiento (no cargar anuncios, mostrar falsos positivos, etc.).

---

## 4. Formatos de anuncio

### 4.1 PopUnder (principal)

```javascript
aclib.runPop({ zoneId: '10652966' });
```

Implementado mediante la clase `PopUnder`. Abre una nueva ventana/pestaña con `window.open()` y URL determinada por RTB. Usa `noopener,noreferrer` attributes.

Técnicas:
- Inyección de `<!DOCTYPE html>` completo en la ventana popup
- Crea iframes dinámicamente
- Detecta movimiento del mouse como anti-bot (`Movement`, `Mouse move`)
- Rotación de anuncios (`ROTATION`)
- Tracking de eventos (`ACTION CALLED`)

### 4.2 Interstitial

```javascript
runInterst(config)
```

Anuncio de página completa que se superpone al contenido.

### 4.3 In-Page Push

```javascript
runInPageP(config)
```

Notificaciones push simuladas dentro de la página.

### 4.4 Banner

Anuncios display estándar en posiciones configurables.

### 4.5 Video Slider

```javascript
runVideoSl(config)
```

Anuncios overlay sobre el reproductor de video.

---

## 5. Integración RTB (adexchangerapid.com)

El script se comunica con `adexchangerapid.com` para la subasta en tiempo real:

```
adexchangerapid.com
├── /script/suurl5.php → SmartURL v5 (suv5)
├── /ut/hb.php → Header bidding
├── /ad/visit.php → Tracking de visitas
├── /ad/czcf.php → Zone config fetch
└── url5.php → URL generation
```

La subasta RTB determina:
1. El destino del popunder
2. El tipo de anuncio a mostrar
3. El precio del bid

---

## 6. Persistencia

| Mecanismo | Clave | Propósito |
|---|---|---|
| `localStorage` | `aclib` | Configuración persistente |
| `sessionStorage` | `_suv5_`, `atag_` | Estado de sesión |
| `Service Worker` | `sw.js` | Persistencia cross-session |

---

## 7. URLs/endpoints referenciados

| String decodificado | Propósito |
|---|---|
| `usrpubtrk.com` | Fingerprinting/analytics |
| `adexchangerapid.com` | RTB ad exchange |
| `url5.php` | SmartURL endpoint |
| `/script/su` → `suv5.js` | Script secundario |
| `/script/ba` → banner script | Banner ads |
| `/script/at` → auto-tag | Auto-tagging |
| `/script/in` → interstitial | Interstitial ads |
| `/script/vi` → video | Video slider |
| `m/ut/hb.php` | Header bidding endpoint |
| `/ad/visit.php` | Visit tracking |
| `/ad/czcf.php` | Zone config fetch |
| `acscdn.com` | CDN host para scripts |

---

## 8. Configuración (ZoneConfig)

El objeto `ZoneConfig` acepta:

| Parámetro | Descripción |
|---|---|
| `zoneId` | ID único del publisher en Adsterra |
| `aggressivity` | Nivel de agresividad de anuncios |
| `adsCapping` | Límite de anuncios por sesión |
| `collectiveZoneId` | Zone ID colectivo |
| `linkedZoneId` | Zone ID vinculado |
| `adserverDomain` | Dominio del servidor de ads |
| `adblockSettings` | Configuración anti-adblock |
| `tagVersion` | Versión del tag |
| `abTest` | A/B testing |
| `recordPageView` | ¿Registrar page view? |
| `isAutoTag` | ¿Auto-tagging activado? |
| `cdnDomain` | CDN domain |

---

## 9. Zonas de riesgo identificadas

1. **Carga sin SRI** - No hay atributo `integrity` en ningún script
2. **CORS abierto** - `access-control-allow-origin: *`
3. **Ofuscación total** - Imposible auditar comportamiento real
4. **Cache largo** - 30 días (`max-age=2592000`)
5. **Ejecución en iframe** - También se carga dentro de `latamvidz1.com`
6. **Detección de análisis** - Cambia comportamiento si detecta DevTools
7. **Persistencia vía SW** - Service Worker instalado sin consentimiento
8. **Subasta RTB incontrolable** - El destino del popunder es variable

---

## 10. Comportamiento inferido completo

```
Usuario abre futbol-libre.su
├── aclib.js se carga desde acscdn.com
├── Logger inicia (debug mode opcional)
├── ClientHints collector → usrpubtrk.com (6+ POST durante la sesión)
├── ZoneConfig se carga (zoneId: 10652966)
├── Detector de entorno evalúa:
│   ├── ¿Headless? → ajusta comportamiento
│   ├── ¿WebDriver? → podría no cargar ads
│   ├── ¿DevTools? → altera respuesta
│   └── ¿Sandbox? → comportamiento diferente
├── Si entorno es "normal" (usuario real):
│   ├── runPop() prepara popunder
│   ├── RTB auction → adexchangerapid.com
│   │   ├── Envía fingerprint del dispositivo
│   │   └── Recibe URL destino del popunder
│   ├── Popunder listo para activarse en:
│   │   ├── Click/touch del usuario
│   │   ├── Mouse move detection (anti-bot)
│   │   └── Timeout
│   ├── Popunder abre ventana con:
│   │   ├── noopener,noreferrer
│   │   ├── DOCTYPE HTML completo
│   │   └── Script adicional (suv5.js) en el popup
│   └── Tracking events:
│       ├── ACTION CALLED
│       ├── ROTATION (cambio de anuncio)
│       └── -event (eventos de usuario)
└── Service Worker (sw.js) persiste en el dispositivo
```

---

## Comparativa con análisis anterior

| Aspecto | Análisis previo (11 may) | Análisis actual (24 may) |
|---|---|---|
| Alcance | Estático parcial (Base64 strings) | Completo (1556 strings decodificados) |
| Detección headless | No detectado | Detectado (múltiples métodos) |
| RTB endpoints | Parcial | Completo (url5, hb, visit, czcf) |
| Config ZoneConfig | No detectado | Documentado completo |
| Anti-bot/DevTools | No detectado | Documentado |
| Formatos de ad | Solo PopUnder | PopUnder + Interstitial + Push + Banner + Video |
| Scripts hijos | No detectados | suv5.js, banner, autotag, interstitial, video |

---

## Archivos relacionados

- `aclib_deobfuscated.js` — Versión deobfuscada del script (164 KB)
- `suv5_analysis.md` — Análisis del script secundario
