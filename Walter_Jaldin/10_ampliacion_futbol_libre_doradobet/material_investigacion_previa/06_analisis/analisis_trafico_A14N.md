# Análisis de tráfico — Perfil A14-N (Android 14, sin protección)

**Fecha:** 14 de mayo de 2026  
**Investigador:** Walter Jaldín  
**Herramienta:** mitmproxy 9.0.1 + Android Studio AVD (Pixel 6, API 34)  
**Fuente de datos:** Sesión real R1 capturada — 78 flujos HTTP, 19 dominios únicos

---

## 1. Arquitectura de riesgos — perspectiva del cliente

Cuando un usuario Android accede a `futbollibretv.su` sin ninguna protección, su dispositivo establece conexiones con **al menos 19 dominios distintos** en una sola sesión de streaming. La figura a continuación muestra el grafo de conexiones capturado:

```
Usuario Android 14 (181.115.172.46)
│
├──[1]──→ futbollibretv.su:443       [TLS 1.3] → 301 Redirect
├──[2]──→ futbol-libre.su:443        [TLS 1.3] → Página principal
├──[3]──→ cdn.futbol-libre.su:443    [BunnyCDN] → Assets (18 requests)
├──[4]──→ code.jquery.com:443        [CDN jQuery] → Sin SRI
├──[5]──→ cdnjs.cloudflare.com:443   [Cloudflare] → Luxon.js Sin SRI
├──[6]──→ ajax.googleapis.com:443    [Google] → jQuery 1.7.1 (obsoleto)
│
├──[7]──→ www.googletagmanager.com   [Google] → GTM tag loader
├──[8]──→ www.google-analytics.com   [Google] → 2x POST fingerprint
│
├──[9]──→ acscdn.com:443             [Cloudflare] → aclib.js + suv5.js ×2
├──[10]─→ adexchangerapid.com:443    [Cloudflare] → RTB auction ×3
├──[11]─→ usrpubtrk.com:443         [Cloudflare] → Device fingerprint ×6
│
├──[12]─→ latamvidz1.com:443        [Virtual Systems] → PHP stream backend
│          └─ SET-COOKIE: PHPSESSID (sin flags)
│          └─ GET sw.js (Service Worker)
│
├──[13]─→ cdn.jsdelivr.net:443      [jsDelivr] → Clappr + SwarmCloud
│
├──[14]─→ iaw5b.envivoslatam.org    [TECHOFF AS48090] → HLS redirect
└──[15]─→ qbk4f.envivoslatam.org   [TECHOFF AS48090] → Stream HLS real
           ├─ index.m3u8 (manifest)
           ├─ tracks-v1a1/mono.m3u8 (playlist)
           └─ .ts segments (video ESPN en vivo)
```

---

## 2. Vectores de exposición del usuario — análisis por categoría

### 2.1 Exposición de identidad del dispositivo

**Dominio:** `usrpubtrk.com`  
**Requests capturados:** 6 POST durante ~2 minutos de sesión  
**Frecuencia:** Aproximadamente 1 request cada 20 segundos

Cada request POST envía el siguiente payload JSON:
```json
{
  "clientHints": {
    "chu": "\"Google Chrome\";v=113, \"Chromium\";v=113",
    "chmob": "?1",
    "chmod": "sdk_gphone64_arm64",
    "chp": "Android",
    "chpv": "14.0.0",
    "chuafv": "113.0.5672.136"
  },
  "isScrollable": 1,
  "totalClicks": 0,
  "sessionLength": 61,
  "ippMissclicks": 0
}
```

**Datos enviados sin consentimiento explícito:**
- Marca y versión del navegador
- Indicador de dispositivo móvil
- Modelo exacto del dispositivo Android
- Versión del sistema operativo
- Comportamiento de interacción (scrolling, clicks, tiempo de sesión)

Este es un perfil de **device fingerprinting** completo que permite identificar al mismo usuario entre sesiones aunque borre cookies. La combinación (browser + dispositivo + OS + versión) es suficientemente específica para trazar la identidad del usuario.

### 2.2 Exposición de IP real al proveedor de streaming

**Dominio destino:** `qbk4f.envivoslatam.org` (TECHOFF SRV LIMITED, AS48090)  
**URL capturada:**
```
GET /hotflix/espn/index.m3u8
  ?token=5c1c839002db66b15fb38b259441dc2b5a1eec01-0d-1778763323-1778709323
  &ip=181.115.172.46
```

La IP real del usuario (181.115.172.46) se transmite explícitamente al servidor HLS de TECHOFF SRV LIMITED, un proveedor de hosting bulletproof clasificado como actor de riesgo por múltiples plataformas de threat intelligence. El servidor de streaming retiene registros de quién accedió a qué contenido y desde qué IP.

**Validez del token HLS:** 15 horas (desde las 17:55 hasta las 08:55 UTC del día siguiente).

### 2.3 Cookie sin protección — latamvidz1.com

**Cookie capturada:**
```
Set-Cookie: PHPSESSID=06bf2c09da1aeb0cc0d84b449a60cdb7; path=/
```

**Ausencia de flags de seguridad:**

| Flag | Estado | Consecuencia |
|---|---|---|
| `HttpOnly` | ❌ Ausente | Accesible desde JavaScript (robo vía XSS) |
| `Secure` | ❌ Ausente | Transmisión en HTTP si hay downgrade |
| `SameSite` | ❌ Ausente | Vulnerable a CSRF cross-origin |

El PHPSESSID sin HttpOnly puede ser robado por cualquier script de terceros que se ejecute en el contexto de la página — incluyendo el propio `aclib.js` de Adsterra, que tiene acceso completo al DOM.

### 2.4 Service Worker instalado — latamvidz1.com

**Capturado:**
```
GET https://latamvidz1.com/sw.js
  Referer: https://latamvidz1.com/canal.php?stream=espn
```

Un Service Worker instalado por latamvidz1.com puede:
1. **Persistir en el dispositivo** incluso después de cerrar el navegador
2. **Interceptar requests** al dominio latamvidz1.com
3. **Enviar notificaciones push** sin que el usuario esté en el sitio
4. **Ejecutarse en background** — sin ventana de navegador visible

En el contexto de un sitio de streaming pirata, el Service Worker puede ser un mecanismo para mostrar publicidad push adicional o para mantener trazabilidad del usuario entre sesiones.

### 2.5 Publicidad agresiva — doble carga de Adsterra

**Requests capturados a acscdn.com: 4 (2 scripts × 2 cargas)**

| Carga | Origen | Scripts |
|---|---|---|
| 1ª | futbol-libre.su | aclib.js, suv5.js |
| 2ª | latamvidz1.com (iframe) | aclib.js, suv5.js |

**aclib.js** (166 KB, altamente ofuscado, 7,995 tokens `_0x*`) configura un popunder:
```javascript
aclib.runPop({ zoneId: '10652966' });
```

**suv5.js** es un segundo script de Adsterra identificado por primera vez en la sesión real. El nombre "suv5" sugiere "SmartURL version 5" — un sistema de Adsterra que genera URLs de destino personalizadas según el perfil del visitante. Trabaja en conjunto con `adexchangerapid.com/suurl5.php`.

**Consecuencia práctica en Android:** Cada vez que el usuario toca la pantalla en el sitio, se abre una nueva pestaña (popunder) con contenido de la subasta RTB. Esto puede resultar en múltiples pestañas de publicidad agresiva, incluyendo potencialmente páginas de phishing o descarga de APKs maliciosos.

### 2.6 Ad Exchange en tiempo real (RTB)

**Dominio:** `adexchangerapid.com`  
**URL capturada:**
```
GET /script/suurl5.php
  ?r=10652966           ← Adsterra Zone ID
  &chu=Google+Chrome    ← Browser
  &chmob=%3F1           ← Es móvil
  &chmod=sdk_gphone...  ← Modelo dispositivo
  &chp=Android          ← Plataforma
  &chpv=14.0.0          ← OS versión
```

El ad exchange recibe el perfil del dispositivo y devuelve una URL (el destino del popunder) seleccionada mediante RTB. **El destino final del popunder no está bajo control del operador del sitio** — cualquier anunciante que gane la subasta RTB puede entregar el contenido que desee, incluyendo páginas de malware o phishing.

---

## 3. Comparativa de riesgos por perfil (proyectado)

| Riesgo | A14-N | A14-D (AdGuard DNS) | Reducción esperada |
|---|---|---|---|
| Fingerprint usrpubtrk.com | ✅ Confirmado | ❓ Pendiente | Depende del bloqueo DNS |
| Adsterra cargado | ✅ 4 scripts | ❓ Pendiente | AdGuard bloquea acscdn.com |
| IP en HLS token | ✅ Expuesta | ✅ Igual (no DNS) | Sin reducción |
| PHPSESSID inseguro | ✅ Emitida | ✅ Igual | Sin reducción |
| Service Worker | ✅ Instalado | ❓ Pendiente | Depende del bloqueo |
| Popunder activado | ✅ Configurado | ❓ Pendiente | AdGuard bloquea |
| GA4 tracking | ✅ Activo | ❓ Pendiente | AdGuard no bloquea |

---

## 4. Implicaciones para usuarios bolivianos

El IP capturado (181.115.172.46) es de la IP pública del laboratorio. En una situación real con un usuario boliviano:

1. **TECHOFF SRV LIMITED conocería la IP real del usuario en Bolivia** — con geolocalización a nivel de ciudad.

2. **usrpubtrk.com construye un perfil** del modelo exacto de Android usado en Bolivia para streaming, útil para targeting publicitario de alto valor.

3. **El popunder abre una URL determinada por RTB** — cuyo contenido es controlado por terceros que ganaron la subasta. En el mercado latinoamericano, estas subastas frecuentemente entregan páginas que:
   - Solicitan suscripciones de pago por SMS premium
   - Redirigen a tiendas de APKs no oficiales
   - Solicitan datos personales ("completa esta encuesta para continuar")

4. **El Service Worker persiste** en el dispositivo Android del usuario incluso después de cerrar el sitio, habilitando notificaciones push no solicitadas.

---

## 5. Próximas sesiones

- **A14-D-R1:** Mismo protocolo con AdGuard DNS activo (94.140.14.14). Comparar qué dominios quedan bloqueados.
- **A11-N-R1:** Mismo protocolo en Android 11 (API 30). Comparar diferencias de comportamiento.
- **A11-D-R1:** Android 11 con AdGuard DNS.

---
