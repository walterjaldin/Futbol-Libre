# Análisis de banner.js — Banner Ads Engine

**Fecha:** 24 de mayo de 2026  
**Fuente:** `https://acscdn.com/script/banner.js`  
**Tamaño:** 26,834 bytes  
**Ofuscación:** Custom base64 (mismo esquema que aclib.js)  
**Strings decodificados:** 330  

---

## ¿Qué es?

`banner.js` es el motor de **anuncios tipo banner** (display ads) del ecosistema Adsterra. Se carga como script secundario del ecosistema cuando el ZoneConfig determina que deben mostrarse banners.

---

## Relación con otros scripts

```
aclib.js (configuración + detección de entorno)
├── ZoneConfig → determina qué formato de anuncio usar
│   ├── PopUnder → suv5.js
│   ├── Interstitial → interstitial.js
│   ├── Banner → banner.js       ← ESTE
│   ├── Video Slider → video.js
│   └── Auto-Tag → at.js
```

---

## Hallazgos clave

### Endpoints referenciados

| String | Propósito |
|---|---|
| `/script/ba` | Ruta del script (auto-referencia) |
| `/script/su` | Referencia a suv5.js |
| `&fmt=bnr` | Formato banner |
| `adexchangerapid.com` (como `rapid.com`) | RTB ad exchange |
| `velocecdn.com` | CDN para assets de banners |

### Formatos de banner

| String | Tipo |
|---|---|
| `e - image` | Banner de imagen |
| `e - html` | Banner HTML personalizado |
| `e - fallba` | Fallback |
| `image_url` | URL de imagen del banner |
| `click_url` | URL de destino al hacer click |

### Configuración

| String | Propósito |
|---|---|
| `zoneId` | Zone ID del publisher |
| `neId` | Posiblemente "zoneId" fragmentado |
| `pop_zone_i` | Pop zone ID vinculado |
| `slider_zon` | Slider zone ID vinculado |
| `source_zon` | Source zone ID |
| `adserverDo` | Ad server domain |
| `tagVersion` | Tag version suffix |
| `capped` | Ad capping status |
| `Banner typ` | Tipo de banner |

### Parámetros de llamado

| Parámetro | Propósito |
|---|---|
| `&atv=` | Ad tag version |
| `&cbtitle=` | Callback title |
| `&cbpage=` | Callback page |
| `&cbkeyword` | Callback keyword |
| `&cbref=` | Callback referrer |
| `&cbdescrip` | Callback description |
| `&fmt=bnr` | Format = banner |
| `&sub1=` | Sub ID 1 |
| `&sadbl=2` | Anti-adblock parameter |
| `&srs=` | Source |
| `&ufp=` | Unique fingerprint |
| `&rbd=1` | Rebidding flag |

---

## Comportamiento inferido

```
banner.js se carga desde acscdn.com/script/banner.js
│
├── Obtiene configuración desde ZoneConfig
├── Determina tipo de banner (imagen/html/fallback)
├── Fetch a adexchangerapid.com para obtener:
│   ├── image_url (URL de la imagen del banner)
│   ├── click_url (URL de destino al hacer click)
│   └── tracking pixels
├── Renderiza banner en la página:
│   ├── Crea elemento img/div/iframe
│   ├── Posiciona según configuración
│   └── Aplica estilos CSS
├── Tracking de clicks:
│   ├── click reco → registro de click
│   └── prclck → parámetro de click
└── Auto-remplazo (rotación) después de intervalo
```

---

## Riesgos específicos

1. **Carga de imágenes desde dominio externo** — Puede cargar `velocecdn.com` o cualquier CDN
2. **Redirección de click** — `click_url` puede llevar a cualquier destino
3. **Tracking de clicks** — Registra todos los clicks del usuario en el banner
4. **Sin SRI** — Sin integridad verificable
5. **Rotación automática** — Puede cambiar el anuncio sin interacción del usuario
