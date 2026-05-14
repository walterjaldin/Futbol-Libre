# Sección 4 — Resultados (borrador v1)

**Estado:** Borrador inicial  
**Autor:** Walter Jaldín Gonzales  
**Fecha:** 14 de mayo de 2026  
**Basado en:** Jornadas 1–10, sesiones A14-N-R1, A14-D-R1, A11-N-R1, A11-D-R1

---

## 4. Resultados

### 4.1 Reconocimiento OSINT — infraestructura del ecosistema

#### 4.1.1 Caracterización del sitio objetivo

El sitio **futbollibretv.su** redirige mediante HTTP 301 permanente a **futbol-libre.su**, dominio canónico registrado a través del registrador **ARDIS-SU** (registrador con sede en Rusia, vinculado históricamente a la gestión de dominios .SU). El servidor de origen (185.254.197.23) es operado por **Virtual Systems LLC** (AS34867), proveedor de hosting ucraniano. El análisis de certificados TLS (Censys) identificó el nombre de organización **"Hassan"** como propietario del certificado, junto con la dirección de correo **hassan.azmw@gmail.com**, siendo estos los únicos indicadores de identidad del operador identificados.

El ecosistema comprende al menos **6 dominios de entrada** vinculados al mismo operador por su registrador (ARDIS-SU), nameservers (p-dns.com) y dirección IP (Tabla 1):

**Tabla 1. Dominios del ecosistema identificados mediante OSINT**

| Dominio | IP | Registrador | Función |
|---|---|---|---|
| futbol-libre.su | 185.254.197.23 | ARDIS-SU | Dominio canónico |
| futbollibretv.su | 185.254.197.23 | ARDIS-SU | Entrada (301) |
| librefutbol.su | 128.0.104.23 | ARDIS-SU | Entrada (301) |
| pelotalibretv.su | 138.226.244.112 | ARDIS-SU | Sitio hermano (WordPress) |
| librepelota.su | — | ARDIS-SU | Dominio reservado |
| envivolibre.com | 128.0.104.23 | Dynadot | En preparación |

#### 4.1.2 Infraestructura de servidores HLS — TECHOFF SRV LIMITED

Los servidores de streaming de video (protocolo HLS) están alojados en **TECHOFF SRV LIMITED** (AS48090), proveedor de hosting clasificado como *bulletproof* por su política documentada de ignorar solicitudes de eliminación de contenido bajo la ley DMCA. TECHOFF opera bajo la marca comercial **dmzhost.co**, con registro corporativo en el Reino Unido y operación física en los Países Bajos (Amsterdam), dependiendo de un único proveedor upstream (AS57717 FiberXpress BV).

Se identificaron 6 subdominios activos de `envivoslatam.org` — dominio de streaming del ecosistema — todos alojados en el bloque 195.178.110.0/24 y 93.123.109.0/24 de TECHOFF, con un software de servidor identificado como **Streamer 24.03**. La IP 195.178.110.160, del mismo bloque que el servidor principal, registra más de 117,660 reportes de abuso en AbuseIPDB.

#### 4.1.3 Vulnerabilidades del servidor principal — análisis Shodan

El servidor 185.254.197.23 (futbol-libre.su) presenta **17 CVEs activas** incluyendo:

- **CVE-2023-38408** (CVSS 9.8 — Crítico): RCE remoto en OpenSSH vía ssh-agent (versión 8.7 instalada)
- **CVE-2023-48795** (CVSS 5.9): Terrapin attack — debilitamiento de negociación TLS
- Múltiples CVEs de severidad media-alta en servicios de red activos

La versión OpenSSH 8.7 instalada en el servidor es vulnerable a ejecución remota de código con acceso al servidor completo.

#### 4.1.4 xmlrpc.php en pelotalibretv.su — exposición completa

El endpoint `https://pelotalibretv.su/xmlrpc.php` responde HTTP 200 a peticiones POST con la API completa de WordPress XML-RPC activa. La llamada `system.listMethods` sin autenticación reveló **80 métodos disponibles**, incluyendo:

- `system.multicall` — permite brute force de credenciales a alta velocidad (múltiples intentos por request)
- `pingback.ping` — vector de DDoS reflection y SSRF sin autenticación
- `wp.uploadFile` — carga de archivos arbitrarios con credenciales válidas
- `wp.getUsers` — enumeración completa de usuarios del sistema
- `wp.setOptions` — modificación de configuración del sitio

El endpoint no presenta rate limiting observable. La combinación de `system.multicall` + falta de rate limiting constituye un vector activo de compromiso de credenciales.

---

### 4.2 Sesiones experimentales — análisis de tráfico

Se ejecutaron cuatro sesiones experimentales en un diseño factorial 2×2 (versión Android × protección DNS), capturando un total de **1,254 flujos HTTP** en **59 dominios únicos**. La Tabla 2 resume los parámetros de cada sesión.

**Tabla 2. Parámetros de las sesiones experimentales**

| Sesión | Android | Chrome | DNS | Flujos | Dominios |
|---|---|---|---|---|---|
| A14-N-R1 | 14 (API 34) | 113.0.5672.136 | ISP default | 84 | 19 |
| A14-D-R1 | 14 (API 34) | 113.0.5672.136 | AdGuard DoT | 642 | 32 |
| A11-N-R1 | 11 (API 30) | 91.0.4472.114 | ISP default | 452 | 26 |
| A11-D-R1 | 11 (API 30) | 91.0.4472.114 | AdGuard DoT | 78 | 19 |

#### 4.2.1 Fingerprinting de dispositivo — usrpubtrk.com

En las cuatro sesiones, el dominio `usrpubtrk.com` (infraestructura de tracking de Adsterra) recibió solicitudes POST con el perfil del dispositivo del usuario. El payload capturado incluye los campos de la API User-Agent Client Hints de Chrome:

**En Android 14 / Chrome 113 (6 campos):**
```json
{
  "clientHints": {
    "chu": "\"Google Chrome\";v=113, \"Chromium\";v=113, \"Not-A.Brand\";v=24",
    "chmob": "?1",
    "chmod": "sdk_gphone64_arm64",
    "chp": "Android",
    "chpv": "14.0.0",
    "chuafv": "113.0.5672.136"
  },
  "isScrollable": 1,
  "sessionLength": 61
}
```

**En Android 11 / Chrome 91 (4 campos):**
```json
{
  "clientHints": {
    "chmod": "sdk_gphone_arm64",
    "chp": "Android",
    "chpv": "11",
    "chuafv": "91.0.4472.114"
  },
  "isScrollable": 1,
  "sessionLength": 0
}
```

Chrome 113 implementa la especificación completa de User-Agent Client Hints (UA-CH), enviando el brand list completo (`chu`) y el indicador de dispositivo móvil (`chmob`). Chrome 91 — publicado en 2021 — no implementa estos campos adicionales. En ambos casos, la combinación modelo+OS+versión de Chrome es suficientemente específica para identificación cross-session sin cookies.

La frecuencia de envío fue de aproximadamente 1 POST cada 20 segundos, acumulando **6 a 11 registros por sesión de 2 minutos**. usrpubtrk.com no es dominio del operador de futbol-libre.su — es infraestructura de Adsterra, una red publicitaria de terceros, que recibe el perfil sin conocimiento explícito del usuario.

#### 4.2.2 Scripts de publicidad agresiva — Adsterra

En las cuatro sesiones se registró la carga de los scripts `aclib.js` (166 KB, 7,995 tokens ofuscados `_0x*`) y `suv5.js` desde el dominio `acscdn.com` (CDN de Adsterra). Ambos scripts se cargaron **dos veces por visita al canal**: una desde la página principal de futbol-libre.su y una segunda desde el iframe de latamvidz1.com. Esta doble carga expone al usuario a cuatro ejecuciones del motor de publicidad por visita.

`aclib.js` configura un mecanismo de popunder:
```javascript
aclib.runPop({ zoneId: '10652966' });
```

El ZoneId `10652966` identifica la cuenta Adsterra del operador. El script `suv5.js` ("SmartURL versión 5") solicita al servidor `adexchangerapid.com` la URL de destino del popunder mediante una subasta en tiempo real (RTB — Real-Time Bidding).

#### 4.2.3 Subasta RTB y destino dinámico del popunder

`adexchangerapid.com` recibe el perfil del dispositivo como parámetros GET y devuelve la URL ganadora de la subasta:

```
GET https://adexchangerapid.com/script/suurl5.php
  ?r=10652966
  &chu=%22Google+Chrome%22%3Bv%3D113
  &chmob=%3F1
  &chmod=sdk_gphone64_arm64
  &chp=Android
  &chpv=14.0.0
```

El destino del popunder varió entre sesiones según el ganador de la subasta (Tabla 3):

**Tabla 3. Destinos del popunder RTB por sesión**

| Sesión | Dominio popunder | Categoría | Solicita pago |
|---|---|---|---|
| A14-N-R1 | (no activado) | — | — |
| A14-D-R1 | bol.1xbet.com | Apuestas deportivas | No (browsing) |
| A11-N-R1 | bol.1xbet.com | Apuestas deportivas | No (browsing) |
| A11-D-R1 | www.doradobet.com | Apuestas + bono $500 | **Sí (Stripe SDK)** |

En la sesión A11-D-R1, el popunder resolvió a `www.doradobet.com`, que cargó el SDK de pagos de Stripe (`js.stripe.com`) en su página de registro `/registro_regalo_bienvenida_500.htm`. Este hallazgo demuestra que el destino del popunder puede incluir formularios activos de captación de datos de pago, sin que el operador de futbol-libre.su tenga control sobre este contenido.

#### 4.2.4 Exposición de la dirección IP del usuario

La URL de solicitud del stream HLS incluye la dirección IP del usuario como parámetro explícito:

```
GET https://smjt9q.envivoslatam.org/hotflix/espn/index.m3u8
  ?token=5861413f...
  &ip=181.115.172.46
```

Esta práctica expone la IP real del usuario a TECHOFF SRV LIMITED, clasificado como hosting bulletproof. En las tres sesiones donde se cargó el stream (A14-N, A14-D, A11-N), la IP fue transmitida al servidor HLS. El token tiene una validez de **15 horas**. Además, se observó rotación de subdominios en cada sesión (Tabla 4), sugiriendo infraestructura redundante diseñada para resistir bloqueos por hostname.

**Tabla 4. Subdominios TECHOFF observados por sesión**

| Sesión | Subdomain redirect | Subdomain stream |
|---|---|---|
| A14-N-R1 | iaw5b.envivoslatam.org | qbk4f.envivoslatam.org |
| A14-D-R1 | smjt9q.envivoslatam.org | wf6kt.envivoslatam.org |
| A11-N-R1 | rci1w.envivoslatam.org | xky9q.envivoslatam.org |

#### 4.2.5 Vulnerabilidades en gestión de sesión

`latamvidz1.com` emitió la cookie de sesión PHPSESSID en todas las sesiones donde el iframe cargó completamente, sin ningún flag de seguridad:

```
Set-Cookie: PHPSESSID=06bf2c09da1aeb0cc0d84b449a60cdb7; path=/
```

La ausencia de `HttpOnly` permite acceso al valor de la cookie desde JavaScript — incluyendo el propio `aclib.js` de Adsterra, que se ejecuta en el mismo contexto. La ausencia de `Secure` permite transmisión en HTTP plano si existe un ataque de downgrade. La ausencia de `SameSite` habilita ataques CSRF cross-origin.

#### 4.2.6 Service Worker instalado por latamvidz1.com

En las sesiones A14-N y A14-D se detectó la descarga de `https://latamvidz1.com/sw.js` — un Service Worker. Este mecanismo de la plataforma web permite al código del sitio:

1. Persistir en el dispositivo después de cerrar el navegador
2. Interceptar solicitudes de red al dominio latamvidz1.com
3. Enviar notificaciones push sin que la página esté abierta
4. Ejecutarse en segundo plano de forma invisible

La instalación de un Service Worker por parte de un sitio de streaming pirata constituye un mecanismo de persistencia que trasciende la sesión de navegación.

#### 4.2.7 Ausencia de Subresource Integrity

Ninguno de los scripts externos cargados por futbol-libre.su incluye el atributo `integrity` (Subresource Integrity). Esto incluye:

- `code.jquery.com` — jQuery 1.7.1 (versión de 2011, con CVEs documentadas)
- `cdnjs.cloudflare.com` — Luxon.js
- `cdn.jsdelivr.net` — Clappr player, SwarmCloud P2P

La ausencia de SRI significa que si cualquiera de estos CDNs fuera comprometido, código malicioso sería ejecutado por todos los visitantes sin posibilidad de detección.

---

### 4.3 Efectividad de protección DNS — AdGuard vs sin protección

**Tabla 5. Presencia de dominios de riesgo por perfil de protección**

| Dominio | Función | Sin DNS (A14-N, A11-N) | AdGuard DNS (A14-D, A11-D) |
|---|---|---|---|
| usrpubtrk.com | Fingerprinting | ✅ Activo | ✅ Activo — **NO bloqueado** |
| acscdn.com | Scripts Adsterra | ✅ Activo | ✅ Activo — **NO bloqueado** |
| adexchangerapid.com | RTB exchange | ✅ Activo | ✅ Activo — **NO bloqueado** |
| latamvidz1.com | Stream backend | ✅ Activo | ✅ Activo — **NO bloqueado** |
| bol.1xbet.com | Popunder RTB | ✅ Activo | ✅ Activo — **NO bloqueado** |
| www.doradobet.com | Popunder RTB | — | ✅ Activo — **NO bloqueado** |
| mc.yandex.ru | Yandex Metrica | — | ✅ Activo (vía popunder) |
| js.stripe.com | SDK de pagos | — | ✅ Activo (vía popunder) |

AdGuard DNS (dns.adguard.com, DNS-over-TLS) no bloqueó ninguno de los dominios de riesgo identificados en el ecosistema de futbol-libre.su. Los dominios de Adsterra (usrpubtrk.com, acscdn.com, adexchangerapid.com) no están incluidos en las listas de bloqueo estándar de AdGuard DNS público. Este resultado indica que las medidas de protección DNS comúnmente recomendadas en comunidades técnicas son **insuficientes** para mitigar la exposición generada por este tipo de ecosistema.

---

### 4.4 Resumen de vulnerabilidades identificadas

**Tabla 6. Vulnerabilidades confirmadas experimentalmente — clasificación OWASP**

| ID | Vulnerabilidad | Evidencia | OWASP | Severidad |
|---|---|---|---|---|
| V1 | Fingerprinting dispositivo sin consentimiento | 6–11 POST a usrpubtrk.com por sesión | A4 | Alta |
| V2 | Scripts de terceros sin CSP ni SRI | aclib.js, suv5.js, jQuery 1.7.1 sin integrity | A8 | Alta |
| V3 | Popunder RTB con destino variable no controlado | 1xbet.com, doradobet.com | A3 | Alta |
| V4 | SDK de pagos en popunder gambling | js.stripe.com desde doradobet.com | A3 | Crítica |
| V5 | IP real expuesta en token HLS | &ip=181.115.172.46 en URL pública | A4 | Media |
| V6 | PHPSESSID sin HttpOnly/Secure/SameSite | Set-Cookie sin flags de seguridad | A2 | Alta |
| V7 | Service Worker persistente de tercero | latamvidz1.com/sw.js | A4 | Alta |
| V8 | Rotación de subdominios bulletproof | 6 subdominios TECHOFF distintos | A5 | Media |
| V9 | xmlrpc.php expuesto sin protección | 80 métodos, pingback sin auth, multicall | A5/A7 | Alta |
| V10 | RCE en servidor (OpenSSH 8.7, CVE-2023-38408) | Shodan — CVSS 9.8 | A6 | Crítica |
| V11 | Tracking GA4 inmediato sin consentimiento | POST inmediato a google-analytics.com | — | Informativo |
| V12 | AdGuard DNS inefectivo contra este ecosistema | 0 dominios de riesgo bloqueados | — | Informativo |

---
