# Análisis comparativo — Cuatro perfiles experimentales

**Fecha:** 14 de mayo de 2026  
**Investigador:** Walter Jaldín  
**Herramienta:** mitmproxy 9.0.1 + Android Studio AVD  
**Sesiones analizadas:** A14-N-R1, A14-D-R1, A11-N-R1, A11-D-R1

---

## 1. Resumen ejecutivo

Se ejecutaron cuatro sesiones experimentales en un diseño factorial 2×2:
- **Versión Android:** 14 (API 34, Chrome 113) vs 11 (API 30, Chrome 91)
- **Protección DNS:** Sin protección (ISP por defecto) vs AdGuard DNS-over-TLS (`dns.adguard.com`)

**Hallazgo transversal más importante:** Los dominios de tracking, fingerprinting y publicidad agresiva del ecosistema futbol-libre.su operaron con normalidad en **los cuatro perfiles**. AdGuard DNS no bloqueó ninguno de los dominios de riesgo identificados. La versión de Android afectó la riqueza del fingerprint capturado pero no la presencia del riesgo.

---

## 2. Tabla maestra de sesiones

| Parámetro | A14-N | A14-D | A11-N | A11-D |
|---|---|---|---|---|
| Android versión | 14 (API 34) | 14 (API 34) | 11 (API 30) | 11 (API 30) |
| Chrome versión | 113.0.5672.136 | 113.0.5672.136 | 91.0.4472.114 | 91.0.4472.114 |
| DNS protección | Ninguna | AdGuard DoT | Ninguna | AdGuard DoT |
| Flujos capturados | 84 | 642 | 452 | 78 |
| Dominios únicos | 19 | 32 | 26 | 19 |
| Archivo .mitm | 2.5 MB | 14 MB | 11 MB | 1.7 MB |

---

## 3. Comparativa de vectores de riesgo

### 3.1 Fingerprinting de dispositivo (usrpubtrk.com)

| Campo enviado | A14-N | A14-D | A11-N | A11-D |
|---|---|---|---|---|
| `chu` (brand list) | ✅ Chrome 113... | ✅ Chrome 113... | ❌ Ausente | ❌ Ausente |
| `chmob` (es móvil) | ✅ `?1` | ✅ `?1` | ❌ Ausente | ❌ Ausente |
| `chmod` (modelo) | ✅ `sdk_gphone64_arm64` | ✅ `sdk_gphone64_arm64` | ✅ `sdk_gphone_arm64` | ✅ `sdk_gphone_arm64` |
| `chp` (plataforma) | ✅ `Android` | ✅ `Android` | ✅ `Android` | ✅ `Android` |
| `chpv` (OS version) | ✅ `14.0.0` | ✅ `14.0.0` | ✅ `11` | ✅ `11` |
| `chuafv` (Chrome ver.) | ✅ `113.0.5672.136` | ✅ `113.0.5672.136` | ✅ `91.0.4472.114` | ✅ `91.0.4472.114` |
| **Requests POST** | **6** | **11** | **10** | **3** |
| **Bloqueado por AdGuard** | N/A | ❌ NO | N/A | ❌ NO |

**Conclusión:** El fingerprinting opera en todos los perfiles. Chrome 113 (Android 14) envía 6 campos incluyendo el brand list completo (`Sec-CH-UA`); Chrome 91 (Android 11) envía 4 campos porque no implementa completamente la API Client Hints. En ambos casos, la combinación de modelo + OS + versión de Chrome es suficientemente específica para identificación cross-session.

---

### 3.2 Scripts Adsterra (acscdn.com)

| Métrica | A14-N | A14-D | A11-N | A11-D |
|---|---|---|---|---|
| aclib.js cargado | ✅ ×2 (200) | ✅ ×2 (200) | ✅ ×5 (200) | ✅ ×3 (200) |
| suv5.js cargado | ✅ ×2 (200) | ✅ ×2 (200) | ✅ ×5 (200) | ✅ ×4 (200) |
| Doble carga (iframe) | ✅ | ✅ | ✅ | ✅ |
| Bloqueado AdGuard | N/A | ❌ NO | N/A | ❌ NO |

---

### 3.3 Subasta RTB (adexchangerapid.com)

| Métrica | A14-N | A14-D | A11-N | A11-D |
|---|---|---|---|---|
| Requests RTB | 3 | 9 | 7 | 5 |
| ZoneId operador | 10652966 | 10652966 | 10652966 | 10652966 |
| Bloqueado AdGuard | N/A | ❌ NO | N/A | ❌ NO |

---

### 3.4 Popunder RTB — destino dinámico

| Sesión | Dominio popunder | Contenido | Solicita pago |
|---|---|---|---|
| A14-N | (no clickeado) | — | — |
| A14-D | `bol.1xbet.com` | Apuestas deportivas | 391 requests |
| A11-N | `bol.1xbet.com` | Apuestas deportivas | 317 requests |
| A11-D | `www.doradobet.com` | Apuestas + registro con bono $500 | **js.stripe.com** |

**Hallazgo crítico:** El destino del popunder varía por sesión según el ganador de la subasta RTB. Esto significa que el operador de futbol-libre.su **no controla** qué contenido ve el usuario cuando hace click. En la sesión A11-D-R1, el ganador RTB fue doradobet.com, que cargó `js.stripe.com` — el SDK de pagos de Stripe — en su página de registro con un bono de bienvenida de $500. Este es un vector directo de captura de datos de pago.

---

### 3.5 IP real del usuario en token HLS

| Sesión | Subdomain HLS redirect | Subdomain HLS final | IP en URL |
|---|---|---|---|
| A14-N | `iaw5b.envivoslatam.org` | `qbk4f.envivoslatam.org` | ✅ `181.115.172.46` |
| A14-D | `smjt9q.envivoslatam.org` | `wf6kt.envivoslatam.org` | ✅ `181.115.172.46` |
| A11-N | `rci1w.envivoslatam.org` | `xky9q.envivoslatam.org` | ✅ `181.115.172.46` |
| A11-D | No cargó | — | — |

**Rotación de subdominios confirmada:** Cada sesión usa subdominios diferentes de envivoslatam.org para el servidor HLS. Los pares observados (iaw5b/qbk4f, smjt9q/wf6kt, rci1w/xky9q) corresponden a diferentes instancias del servidor Streamer 24.03 en la infraestructura TECHOFF. La rotación dificulta el bloqueo por hostname pero la IP del usuario sigue siendo visible en todos los casos.

**Validez del token HLS:** 15 horas en todas las sesiones.

---

### 3.6 PHPSESSID sin flags de seguridad

| Sesión | PHPSESSID emitida | HttpOnly | Secure | SameSite |
|---|---|---|---|---|
| A14-N | ✅ `06bf2c09...` | ❌ | ❌ | ❌ |
| A14-D | ✅ `bdef2739...` | ❌ | ❌ | ❌ |
| A11-N | ✅ `dd2b9552...` | ❌ | ❌ | ❌ |
| A11-D | ❌ No capturada | — | — | — |

La cookie PHPSESSID se emite en todas las sesiones donde el iframe de latamvidz1.com cargó completamente. La ausencia en A11-D se debe a carga parcial del iframe, no a protección de AdGuard.

---

### 3.7 Service Worker — latamvidz1.com

| Sesión | sw.js descargado |
|---|---|
| A14-N | ✅ HTTP 200 |
| A14-D | ✅ HTTP 200 + 304 |
| A11-N | No observado* |
| A11-D | No observado* |

*Chrome 91 puede requerir aprobación explícita de Service Workers; en A11, el iframe cargó con menos requests que en A14.

---

### 3.8 Tracking adicional — nuevos actores por sesión

| Actor | Sesión | Función |
|---|---|---|
| `mc.yandex.ru` (Yandex Metrica) | A14-D, A11-D | Tracking desde bol.1xbet.com y doradobet.com |
| `refpa37630.com` | A14-D, A11-N, A11-D | Cookie de afiliado 1xbet |
| `js.stripe.com` | A11-D | SDK de pagos Stripe desde doradobet.com |
| `v.byads.co` | A11-D | Red de anuncios adicional |
| `v2aka/v2l/v2cn.cdnsfree.com` | A14-D | CDN adicional de 1xbet |
| `analytics.google.com` | A14-D | Endpoint GA4 adicional |

---

## 4. Efectividad de AdGuard DNS — análisis

### 4.1 Dominios de riesgo bloqueados vs no bloqueados

| Dominio | Clasificación | ¿Bloqueado por AdGuard? |
|---|---|---|
| usrpubtrk.com | Fingerprinting Adsterra | ❌ NO — activo en A14-D y A11-D |
| acscdn.com | Scripts Adsterra | ❌ NO — activo en A14-D y A11-D |
| adexchangerapid.com | RTB ad exchange | ❌ NO — activo en A14-D y A11-D |
| latamvidz1.com | Stream backend PHP | ❌ NO — activo en A14-D y A11-D |
| bol.1xbet.com | Popunder RTB | ❌ NO — 391 requests en A14-D |
| www.doradobet.com | Popunder RTB | ❌ NO — 11 requests en A11-D |
| refpa37630.com | Cookie afiliado | ❌ NO — presente en A11-D |
| mc.yandex.ru | Yandex Metrica | ❌ NO — activo en A14-D |
| js.stripe.com | SDK de pagos | ❌ NO — activo en A11-D |
| envivoslatam.org | HLS (TECHOFF) | ⚠️ POSIBLE — ausente en A11-D |

**Conclusión:** AdGuard DNS público (dns.adguard.com) ofrece **protección nula** contra los dominios de tracking y publicidad específicos del ecosistema futbol-libre.su. Estos dominios no están incluidos en las listas de bloqueo estándar de AdGuard. La única posible excepción es envivoslatam.org en A11-D, aunque su ausencia puede deberse a carga parcial del iframe.

### 4.2 Por qué AdGuard DNS no bloquea estos dominios

Los dominios de Adsterra (usrpubtrk.com, acscdn.com, adexchangerapid.com) son infraestructura legítima de una red publicitaria reconocida. AdGuard DNS bloquea principalmente:
- Dominios de malware y phishing conocidos
- Trackers identificados en listas como EasyList, EasyPrivacy
- Dominios de spam y telemetría de sistema

El ecosistema específico de futbol-libre.su usa dominios de Adsterra que **no están en las listas de bloqueo públicas de AdGuard**, lo que significa que incluso usuarios que adoptan protecciones DNS recomendadas quedan completamente expuestos.

---

## 5. Diferencias por versión de Android

### 5.1 Capacidades de fingerprinting

| Capacidad | Android 14 / Chrome 113 | Android 11 / Chrome 91 |
|---|---|---|
| Client Hints completos (6 campos) | ✅ | ❌ (4 campos) |
| `Sec-CH-UA` brand list | ✅ | ❌ |
| `Sec-CH-UA-Mobile` | ✅ | ❌ |
| Modelo de dispositivo (`chmod`) | ✅ | ✅ |
| Versión OS (`chpv`) | ✅ `14.0.0` | ✅ `11` |
| Versión Chrome (`chuafv`) | ✅ `113.0.5672.136` | ✅ `91.0.4472.114` |
| Identificación cross-session posible | ✅ Sí | ✅ Sí |

Android 14 con Chrome 113 proporciona un fingerprint más rico (6 campos vs 4), pero **ambas versiones permiten identificación del dispositivo y OS** con precisión suficiente para targeting publicitario.

### 5.2 Otros comportamientos

| Comportamiento | A14 | A11 |
|---|---|---|
| Service Worker instalado | ✅ Confirmado | ⚠️ No observado |
| Popunder en primer click | ✅ | ✅ |
| HLS cargado y reproduciéndose | ✅ | ✅ (en A11-N) |
| Chrome FRE bypass requerido | Sí (`--disable-fre`) | Sí (`--disable-fre`) |
| CA cert método | tmpfs en APEX conscrypt | tmpfs en /system/etc/security/cacerts + `--ignore-certificate-errors` |

---

## 6. Mapa de actores — ecosistema completo

```
USUARIO ANDROID (cualquier versión)
│
├── SITIO ──────────────────── futbol-libre.su (Virtual Systems LLC, UA)
│   └── CDN ─────────────────── cdn.futbol-libre.su (BunnyCDN Miami)
│
├── ANALYTICS ──────────────── Google Analytics (G-L0N11PVD63)
│                              Google Tag Manager (GTM-XXXXXXX)
│
├── FINGERPRINTING ─────────── usrpubtrk.com [Adsterra]
│   └── Datos: OS + modelo + Chrome + comportamiento
│
├── PUBLICIDAD AGRESIVA ────── acscdn.com (aclib.js, suv5.js) [Adsterra]
│   └── RTB ─────────────────── adexchangerapid.com
│       └── Popunder → {bol.1xbet.com | www.doradobet.com | ...}
│           └── Tracking adicional: mc.yandex.ru, refpa37630.com
│           └── PAGO: js.stripe.com (doradobet)
│
├── STREAM ─────────────────── latamvidz1.com (128.0.104.23, Virtual Systems)
│   └── HLS ─────────────────── *.envivoslatam.org (TECHOFF AS48090, NL)
│       ├── IP usuario expuesta en token
│       └── Servidor: Streamer 24.03
│
└── SERVICE WORKER ─────────── latamvidz1.com/sw.js (persistente)
```

---

## 7. Resumen de riesgos confirmados — todos los perfiles

| # | Riesgo | Evidencia | OWASP | Perfiles |
|---|---|---|---|---|
| R1 | Device fingerprinting a usrpubtrk.com | 6-11 POST con modelo+OS+Chrome | A4 | A14-N, A14-D, A11-N, A11-D |
| R2 | Scripts Adsterra sin CSP | aclib.js, suv5.js — doble carga | A8 | A14-N, A14-D, A11-N, A11-D |
| R3 | RTB popunder con destino variable | 1xbet.com, doradobet.com | A3 | A14-D, A11-N, A11-D |
| R4 | Stripe SDK en sitio de apuestas via popunder | js.stripe.com desde doradobet | A3 | A11-D |
| R5 | IP real del usuario expuesta en HLS | `&ip=181.115.172.46` en URL | A4 | A14-N, A14-D, A11-N |
| R6 | PHPSESSID sin HttpOnly/Secure/SameSite | Set-Cookie capturado | A2 | A14-N, A14-D, A11-N |
| R7 | Service Worker persistente | latamvidz1.com/sw.js HTTP 200 | A4 | A14-N, A14-D |
| R8 | Rotación de subdominios TECHOFF | 6 subdominios distintos en 4 sesiones | A5 | A14-N, A14-D, A11-N |
| R9 | Sin SRI en ningún script externo | `integrity=` ausente en todos los JS | A8 | A14-N, A14-D, A11-N, A11-D |
| R10 | Tracking GA4 inmediato sin consentimiento | POST a google-analytics.com | — | A14-N, A14-D, A11-N, A11-D |
| R11 | AdGuard DNS ofrece protección nula | 0 dominios de riesgo bloqueados | — | A14-D, A11-D |
| R12 | Yandex Metrica via popunder | mc.yandex.ru desde 1xbet | A4 | A14-D |
| R13 | Cookie afiliado cross-session | refpa37630.com A_22811 | A4 | A14-D, A11-N, A11-D |

---

## 8. Implicaciones para usuarios bolivianos

1. **Exposición universal:** Independientemente de la versión de Android o la protección DNS usada, todos los usuarios exponen su perfil de dispositivo, IP real y comportamiento a terceros.

2. **AdGuard DNS es insuficiente:** Los usuarios que adoptan medidas como AdGuard DNS (recomendada frecuentemente en comunidades técnicas) no obtienen protección efectiva contra este ecosistema.

3. **El popunder es un vector de fraude financiero:** La subasta RTB puede entregar en cualquier sesión un sitio de apuestas con captación activa de datos de pago (Stripe). Un usuario boliviano que interactúe con el popup podría registrarse y depositar dinero en plataformas de apuestas externas no reguladas en Bolivia.

4. **TECHOFF conoce qué canales ven los usuarios bolivianos:** La IP en el token HLS revela al proveedor de hosting bulletproof cuándo, qué canal y desde qué ciudad de Bolivia se accede al stream.

5. **El fingerprint es persistente entre sesiones:** usrpubtrk.com puede rastrear al mismo dispositivo boliviano entre sesiones aunque el usuario borre cookies, usando la combinación modelo+OS+Chrome como identificador estable.

---

## 9. Subdominios TECHOFF observados — inventario

| Sesión | Redirect subdomain | Stream subdomain |
|---|---|---|
| A14-N | iaw5b.envivoslatam.org | qbk4f.envivoslatam.org |
| A14-D | smjt9q.envivoslatam.org | wf6kt.envivoslatam.org |
| A11-N | rci1w.envivoslatam.org | xky9q.envivoslatam.org |
| Jornadas anteriores | iaw5b, chrz, dtkb | (varios) |

Todos apuntan al mismo bloque IP TECHOFF (195.178.110.x, 93.123.109.x). La rotación de subdominios es un mecanismo de resiliencia — si un subdomain específico es bloqueado por un ISP, el sistema cambia automáticamente a otro.

---
