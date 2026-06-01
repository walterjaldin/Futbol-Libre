# 1.9 — Análisis de pelotalibretv.su (sitio hermano)

**Fecha de análisis:** 13 de mayo de 2026  
**Investigador:** Walter Jaldín  
**Herramientas:** curl, dig, Shodan InternetDB, análisis HTML, WordPress REST API

---

## Resumen ejecutivo

pelotalibretv.su es el sitio hermano de futbol-libre.su, orientado al mercado rioplatense (Argentina, Uruguay). Comparte operador, infraestructura Virtual Systems LLC, red Adsterra (ZoneId idéntico), y servidor de streams latamvidz1.com. Sin embargo, tiene diferencias técnicas significativas: usa **WordPress 6.9.4** (en lugar de HTML estático), tiene un **GA4 diferente** (G-65329600J2 vs G-L0N11PVD63), y dispone de **3 servidores de stream** (redundancia mayor). El análisis WordPress revela el slug de usuario "futbollibre", confirmación directa de autoría común.

---

## Identificación del sitio

| Campo | Valor |
|---|---|
| Dominio | pelotalibretv.su |
| IP | 138.226.244.112 |
| ASN | VSYS-UA (Virtual Systems LLC, Kyiv) |
| PTR record | dedicated.sollutium.com |
| CMS | WordPress 6.9.4 |
| Tema | Jannah (tema premium de TieLabs) |
| Registrador | ARDIS-SU (mismo que futbol-libre.su) |
| Mercado objetivo | Argentina, Uruguay (fútbol rioplatense) |

---

## Headers HTTP

```
HTTP/2 200 OK
server: nginx
content-type: text/html; charset=UTF-8
cache-control: max-age=3, must-revalidate
last-modified: Wed, 13 May 2026 23:30:54 GMT
x-xss-protection: 1; mode=block
x-content-type-options: nosniff
x-nginx-upstream-cache-status: HIT
x-server-powered-by: Engintron
```

**Headers de seguridad ausentes:**
- Content-Security-Policy: AUSENTE
- Strict-Transport-Security: AUSENTE
- X-Frame-Options: AUSENTE
- Referrer-Policy: AUSENTE
- Permissions-Policy: AUSENTE

El patrón de headers es idéntico a futbol-libre.su, incluyendo el header
`x-server-powered-by: Engintron`, confirmando la misma configuración de servidor.

---

## Tecnologías identificadas

| Tecnología | Detalles |
|---|---|
| CMS | WordPress 6.9.4 |
| Tema | jannah (wp-content/themes/jannah) — tema premium de noticias |
| CDN assets | cdn.pelotalibretv.su → BunnyCDN (pull zone: plbt) |
| Analytics | GA4: G-65329600J2 |
| Publicidad | Adsterra, ZoneId: **10652966** (IDÉNTICO a futbol-libre.su) |
| jQuery | jquery.min.js + jquery-migrate.min.js (WordPress bundled) |

---

## WordPress — API REST expuesta

### Endpoint de usuarios

```
URL: https://pelotalibretv.su/wp-json/wp/v2/users
Método: GET (sin autenticación requerida)
Respuesta: HTTP 200 OK

[{
  "id": 1,
  "name": "admin",
  "slug": "futbollibre"
}]
```

**El slug "futbollibre" es la marca del operador.** Este es el nombre de usuario
WordPress del administrador del sitio. Su exposición vía API REST sin autenticación:

1. Confirma el nombre de usuario del administrador (username enumeration)
2. El slug "futbollibre" conecta directamente con "futbol-libre.su"
3. Facilita ataques de fuerza bruta (el login es accesible en /wp-login.php)
4. La combinación slug + WP login abierto = superficie de ataque directa

### WordPress REST API — estado general

La API REST de WordPress está habilitada sin restricciones. Los endpoints comúnmente expuestos incluyen:
- `/wp-json/wp/v2/users` — usuarios (CONFIRMADO ACTIVO)
- `/wp-json/wp/v2/posts` — posts
- `/wp-json/wp/v2/pages` — páginas

### wp-login.php

El login de WordPress es accesible directamente (sin protección adicional):
```
URL: https://pelotalibretv.su/wp-login.php
Estado: HTTP 200 (formulario de login activo)
```

---

## Arquitectura de streams

### Código fuente HTML (/espn-1/)

El análisis del HTML de la página de canal revela **3 opciones de stream**:

```html
<!-- Opción primaria -->
<iframe src="https://latamvidz1.com/canal.php?stream=espn"></iframe>

<!-- Opción secundaria -->
<!-- href: https://la14hd.com/vivo/canal.php?stream=espn -->

<!-- Opción terciaria -->
<!-- href: https://streamtpcloud.com/global1.php?stream=espn -->
```

### Comparativa futbol-libre.su vs pelotalibretv.su

| Aspecto | futbol-libre.su | pelotalibretv.su |
|---|---|---|
| CMS | HTML estático | WordPress 6.9.4 |
| Stream backend primario | latamvidz1.com | latamvidz1.com |
| Stream backends alternativos | Ninguno | la14hd.com, streamtpcloud.com |
| Adsterra ZoneId | 10652966 | **10652966 (idéntico)** |
| GA4 ID | G-L0N11PVD63 | G-65329600J2 |
| CDN assets | cdn.futbol-libre.su / fltsu | cdn.pelotalibretv.su / plbt |
| Proveedor IP | Virtual Systems (185/128) | SOLLUTIUM vía Virtual Systems |
| Engintron | Sí | Sí |

---

## Canales disponibles

```
pelotalibretv.su/directv-sports/
pelotalibretv.su/espn-1/
pelotalibretv.su/espn-premium/
pelotalibretv.su/fox-sports/
```

Los canales coinciden con los de futbol-libre.su pero con orientación rioplatense:
el sitio enfatiza fútbol argentino (Liga Profesional, Copa Argentina).

---

## Análisis de nuevos servidores de stream

### la14hd.com

| Campo | Valor |
|---|---|
| IP | 91.218.49.105 |
| PTR | dedicated.vsys.host |
| Proveedor | Virtual Systems LLC |
| Stack | Ubuntu + nginx + OpenSSH 8.9p1 |
| HSTS | Sí (max-age=31536000) |
| Last-Modified | Tue, 23 Sep 2025 |
| Endpoint | /vivo/canal.php?stream=<canal> |

la14hd.com está en Virtual Systems LLC pero en una IP diferente al cluster principal,
con PTR `dedicated.vsys.host`. La presencia de HSTS lo diferencia de latamvidz1.com
que no tiene HSTS configurado.

### streamtpcloud.com

| Campo | Valor |
|---|---|
| IP | Sin resolución DNS activa (13/05/2026) |
| Estado | Dominio registrado, sin A record |
| Endpoint | /global1.php?stream=<canal> |

El dominio existe en el código fuente pero no resuelve DNS. Puede ser:
1. Un servidor de backup desactivado temporalmente
2. Un servidor en preparación (similar a librepelota.su)
3. Un servidor caído/abandonado

---

## Implicaciones de privacidad — GA4 separado

El uso de GA4 ID separado (G-65329600J2 vs G-L0N11PVD63) podría indicar:

1. El operador tiene **dos propiedades distintas en Google Analytics** para medir cada audiencia por separado (hispana vs rioplatense)
2. O el sitio fue creado por un tercero diferente que luego fue integrado al ecosistema
3. Los dos IDs pueden cruzarse mediante SpyOnWeb para identificar otros sitios del operador

**Pendiente:** Verificar G-65329600J2 en SpyOnWeb y BuiltWith (requiere browser).

---

## Riesgos adicionales por WordPress

Respecto a futbol-libre.su (HTML estático), pelotalibretv.su presenta superficie de ataque adicional por usar WordPress:

| Vector | Descripción | Riesgo |
|---|---|---|
| wp-login.php | Admin login expuesto sin 2FA/protección IP | ALTO |
| REST API /users | Username enumeration — slug "futbollibre" expuesto | MEDIO |
| Actualizaciones | WordPress 6.9.4 requiere actualizaciones frecuentes | MEDIO |
| Tema Jannah | Tema premium — exploits de terceros si no actualizado | MEDIO |
| xmlrpc.php | Por defecto habilitado en WordPress (pendiente verificar) | MEDIO |

---
