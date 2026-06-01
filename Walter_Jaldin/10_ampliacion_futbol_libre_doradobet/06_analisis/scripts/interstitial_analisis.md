# Análisis de interstitial.js — Interstitial Ad Engine

**Fecha:** 24 de mayo de 2026  
**Fuente:** `https://acscdn.com/script/interstitial.js`  
**Tamaño:** 46,333 bytes  
**Ofuscación:** Custom base64 (mismo esquema)  
**Strings decodificados:** 487  

---

## ¿Qué es?

`interstitial.js` es el motor de **anuncios intersticiales** (página completa / overlay) del ecosistema Adsterra. Muestra anuncios que cubren total o parcialmente el contenido de la página, generalmente entre navegaciones o al hacer clic.

---

## Relación con otros scripts

```
aclib.js (configuración)
├── runInterst(config) → LLAMA a interstitial.js
    ├── Renderiza overlay de página completa
    ├── Maneja eventos de cierre/click
    ├── Comunicación RTB para contenido
    └── Callbacks de impresión
```

---

## Hallazgos clave

### Endpoints referenciados

| String | Propósito |
|---|---|
| `/script/in` | Ruta del script (auto-referencia) |
| `/script/na` | Posible script "native" |
| `n.com/scri` | Referencia a `acscdn.com/script/...` |
| `tive.php` | Endpoint de interstitial |
| `&fmt=intrn` | Format = interstitial |

### Tipos de contenido intersticial

| String | Tipo |
|---|---|
| `AL HTML (t` | Full HTML interstitial |
| `AL HTML CU` | Custom HTML interstitial |
| `AL IFRAME ` | Iframe interstitial |
| `AL IMAGE (` | Image interstitial |
| `OVERLAY` | Generic overlay |
| `INTERSTITI` | Interstitial type constant |
| `FULLSCREEN` | Fullscreen interstitial |

### Configuración de renderizado

| String | Propósito |
|---|---|
| `fontFamily` | 'OpenSans-SemiBold, Arial, Helvetica, sans-serif' |
| `fontSize` | Tamaño de fuente |
| `boxShadow` | Sombra del overlay |
| `borderRadi` | Border radius |
| `zIndex` | Z-index (superposición) |
| `position` | Posicionamiento CSS |
| `display` | Display type |
| `opacity` | Opacidad |
| `background` | Color de fondo |
| `justifyCon` | Justify content |
| `alignItems` | Align items |
| `closeButto` | Botón de cerrar |
| `buttonCont` | Contenido del botón |
| `padding` | Padding del overlay |
| `margin` | Margen |
| `scroll` | Scroll habilitado/deshabilitado |

### Comportamiento

| String | Propósito |
|---|---|
| `close butt` | Close button handling |
| `countdown` | Cuenta regresiva antes de mostrar |
| `skipAd` | Skip ad después de tiempo |
| `goToButton` | Botón "ir a" |
| `click on i` | Click en interstitial |
| `on click. ` | On click handler |
| `render fal` | Render fallback |
| `load lib` | Load library |
| `lib loaded` | Library loaded callback |
| `lib alread` | Already loaded |
| `rendering ` | Render status |
| `ad will be` | Ad scheduled |

### Parámetros de llamado

| Parámetro | Propósito |
|---|---|
| `&ab_test=` | A/B testing |
| `&abtg=1` | AB tag |
| `&atv=` | Ad tag version |
| `&sadbl=2` | Anti-adblock |
| `&sbx=1` | Sandbox mode |
| `&ufp=` | Unique fingerprint |
| `&ppv=1` | Page view |
| `&aggr=` | Aggressivity |
| `&czid=` | CZ ID |
| `&sub1=` | Sub ID |
| `&srs=` | Source |
| `&btp=` | BTP parameter |
| `&pblcz=` | PBL CZ |
| `&fmt=intrn` | Format = interstitial |

---

## Comportamiento inferido

```
interstitial.js se activa por runInterst(config)
│
├── Obtiene configuración del ZoneConfig
├── Determina tipo de interstitial:
│   ├── HTML completo (AL HTML)
│   ├── Custom HTML
│   ├── Iframe embebido
│   └── Imagen
│
├── Renderiza overlay:
│   ├── Crea div contenedor con posición fija/absoluta
│   ├── Aplica estilos (z-index alto, fondo semitransparente)
│   ├── Muestra contenido (HTML, iframe, imagen)
│   └── Botón de cierre con timer opcional
│
├── Maneja eventos:
│   ├── Click → CT-CLICK → tracking
│   ├── Close → CT-CLOSE → tracking + remover overlay
│   ├── Countdown → skip ad después de N segundos
│   └── Pagehide/blur → pausar interstitial
│
├── Comunicación RTB:
│   ├── Fetch bid URL desde adexchangerapid.com
│   ├── Maneja rebids si falla
│   └── Fallback a contenido alternativo
│
└── Callbacks:
    ├── Impresión registrada
    ├── Click registrado
    └── Cierre registrado
```

---

## Riesgos específicos

1. **Overlay de página completa** — Bloquea completamente la visión del usuario
2. **Botón de cierre engañoso** — Posible diseño que lleva a click accidental
3. **Countdown** — Fuerza al usuario a ver el anuncio por N segundos
4. **Contenido desde RTB** — El contenido del interstitial es determinado por subasta
5. **Sin límite de frecuencia** — Puede mostrar múltiples interstitials por sesión
6. **Persistencia** — Puede reinstalarse después de cerrado
7. **Integración con otros formatos** — Referencia a `linkedZone`, `pop_zone_i`, `slider_zon`
