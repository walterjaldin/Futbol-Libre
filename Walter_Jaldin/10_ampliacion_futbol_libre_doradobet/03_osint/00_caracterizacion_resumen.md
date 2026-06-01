# OSINT — Caracterización y resumen consolidado

**Última actualización:** 24 de mayo de 2026  
**Investigador:** Walter Jaldín  
**Sitio investigado:** futbollibretv.su (dominio de entrada) → futbol-libre.su (dominio canónico)

---

## Identificación del objetivo

| Campo | Valor |
|---|---|
| Dominio de entrada | futbollibretv.su |
| Dominio canónico (actual) | futbol-libre.su |
| Tipo de sitio | Streaming pirata de deporte en vivo |
| Canales disponibles | ESPN-1, ESPN Premium, DIRECTV Sports, TyC Sports, WIN Sports+, TUDN, TNT Sports, FOX Sports |
| Audiencia objetivo | Hispanohablantes (España, México, Bolivia, Colombia, Argentina, etc.) |
| Registrador | ARDIS-SU (Rusia) |
| TLD | .su (Soviet Union — jurisdicción no convencional, sin DMCA) |
| Hosting | Virtual Systems LLC (Kyiv, Ucrania) |
| Operador | Anónimo (alias joezm5a@proton.me / hassan.azmw@gmail.com expuesto) |

---

## Estado operativo actual (10 mayo 2026)

- futbollibretv.su → **HTTP 301** hacia futbol-libre.su
- futbol-libre.su → **HTTP 200** (dominio canónico activo)
- Servidor: nginx + Engintron + cPanel/WHM
- TLS: Let's Encrypt (válido)
- Stack: HTML estático + iframe con latamvidz1.com para streams + Adsterra para publicidad

---

## Infraestructura consolidada

```
Virtual Systems LLC (Kyiv, Ucrania)
│
├── IP 185.254.197.23 (ASN 30860 YURTEH-AS)
│   └── futbol-libre.su (dominio canónico)
│
├── IP 128.0.104.23 (ASN 30860 VSYS-UA)
│   ├── futbollibretv.su (comparte con las otras 2 IPs)
│   └── latamvidz1.com (servidor de streams PHP)
│
└── IP 138.226.244.112 (VSYS-UA-COLO12)
    ├── futbollibretv.su (comparte con las otras 2 IPs)
    └── pelotalibretv.su

BunnyCDN (Miami, USA)
└── cdn.futbol-libre.su → fltsu.b-cdn.net (assets estáticos)
```

---

## Ecosistema de dominios identificados (actualizado 24 may 2026)

| Dominio | Estado | Familia | IP/Hosting |
|---|---|---|---|
| futbollibretv.su | Activo (→ futbol-libre.su) | Hispana | Virtual Systems (3 IPs) |
| futbol-libre.su | Activo (canónico) | Hispana | Virtual Systems 185.254.197.23 |
| pelotalibretv.su | Activo (WordPress 6.9.4) | Rioplatense | SOLLUTIUM 138.226.244.112 |
| librepelota.su | En preparación | Rioplatense | Cloudflare NS (sin A) |
| latamvidz1.com | Activo (backend PHP) | Infraestructura | Virtual Systems 128.0.104.23 |
| la14hd.com | Activo (stream backup) | Infraestructura | Virtual Systems 91.218.49.105 |
| streamtpcloud.com | Sin DNS activo (backup) | Infraestructura | Desconocido |
| cdn.futbol-libre.su | Activo (CDN) | Infraestructura | BunnyCDN (fltsu) |
| cdn.pelotalibretv.su | Activo (CDN) | Infraestructura | BunnyCDN (plbt) |
| envivolibre.com | Hostname en 185.254.197.23 | Posible marca alterna | Virtual Systems |
| vivozly.com | Hostname en 128.0.104.23 | Técnico/marca alterna | Virtual Systems |
| doeemain.org | Caído (HTTP 500) | Plataforma matriz | Cloudflare |
| es.doeemain.org | Caído (HTTP 500) | Plataforma matriz | Cloudflare |
| pt.doeemain.org | No verificado | Plataforma matriz | Cloudflare |
| yourewatching.org | Activo (anómalo: IP iraní) | Anglófona | V. Systems + Cloudflare |
| yourewatching1.org | No verificado | Anglófona | Desconocido |
| yourewatching2.org | No verificado | Anglófona | Desconocido |
| acscdn.com | Activo (CDN scripts) | Publicidad Adsterra | Cloudflare |
| adexchangerapid.com | Activo (RTB) | Publicidad Adsterra | Cloudflare |
| usrpubtrk.com | Activo (fingerprinting) | Publicidad Adsterra | Cloudflare |
| wkbc42.com | Sin DNS (tracking) | Publicidad Adsterra | Desconocido (parked) |
| wkbc21.com | Sin DNS (tracking) | Publicidad Adsterra | Desconocido (parked) |
| quesid.com | Activo (403, openresty) | Tracking Adsterra | Cloudflare |

---

## Operador — perfil técnico

| Atributo | Evidencia |
|---|---|
| Correo operativo | joezm5a@proton.me (SOA futbollibretv.su + WHOIS pelotalibretv.su) |
| Correo personal expuesto | hassan.azmw@gmail.com (WHOIS futbol-libre.su — descuido inicial) |
| Registrador preferido | ARDIS-SU (todos los .su) |
| Proveedor de hosting | Virtual Systems LLC (todos los servidores activos) |
| Sub-proveedor | SOLLUTIUM LLC (revendedor VDS; PTR dedicated.sollutium.com en 138.226.244.112) |
| Proveedor HLS | TECHOFF SRV LIMITED (195.178.110.11, envivoslatam.org) |
| Patrón de privacidad | Incoherente: WHOIS privado en futbollibretv.su, expuesto en futbol-libre.su, ProtonMail en pelotalibretv.su |
| Google Analytics futbol-libre.su | G-L0N11PVD63 |
| Google Analytics pelotalibretv.su | G-65329600J2 |
| Google Search Console | Verificado en ambos dominios .su principales |
| Red de publicidad | Adsterra (popunder, **ZoneId 10652966 — IDÉNTICO en ambos sitios**) |
| Scripts de publicidad | aclib.js (popunder, fingerprinting), suv5.js (SmartURL v5), banner.js, interstitial.js, at.js (auto-tag) — todos desde acscdn.com |
| CDN de scripts Adsterra | acscdn.com (Cloudflare) |
| RTB ad exchange | adexchangerapid.com (url5.php, hb.php, visit.php, czcf.php) |
| Fingerprinting | usrpubtrk.com (Client Hints, WebGL, Canvas) |
| Dominios de tracking Adsterra | wkbc42.com, wkbc21.com, quesid.com |
| Service Worker | sw.js (latamvidz1.com) → SwarmCloud P2P (jsDelivr) |
| CDN de streams primario | latamvidz1.com (PHP, 128.0.104.23) |
| CDN de streams backup | la14hd.com (91.218.49.105, Virtual Systems) |
| CDN de assets futbol-libre.su | BunnyCDN (pull zone: fltsu) |
| CDN de assets pelotalibretv.su | BunnyCDN (pull zone: plbt) |
| Slug WordPress | "futbollibre" (admin de pelotalibretv.su, expuesto vía REST API) |
| CMS futbol-libre.su | HTML estático (nginx) |
| CMS pelotalibretv.su | WordPress 6.9.4 + tema Jannah |

---

## Vectores de riesgo identificados

| Vector | Descripción | Severidad estimada |
|---|---|---|
| Adsterra popunder (aclib.js) | Script ofuscado con 166 KB, popunder en todas las páginas | ALTA |
| Iframe de stream (latamvidz1.com) | Carga contenido de servidor externo sin CSP | ALTA |
| Ausencia de CSP | Sin Content-Security-Policy, scripts de terceros sin restricción | ALTA |
| Ausencia de HSTS | Sin Strict-Transport-Security, posible downgrade | MEDIA |
| Sin X-Frame-Options | Clickjacking posible | MEDIA |
| Tracking GA4 (doble) | Dos propiedades GA4 distintas por sitio | MEDIA |
| Cross-linking ecosistema | Redireccionamiento entre dominios del operador | MEDIA |
| CVE-2024-6387 en servidor principal | OpenSSH 8.7, RCE sin autenticación (regreSSHion) | **CRÍTICA** |
| MySQL 3306 expuesto en Internet | Dos IPs con puerto 3306 abierto sin filtrado | ALTA |
| WordPress API REST expuesta | Slug de usuario "futbollibre" visible públicamente | MEDIA |
| SwarmCloud P2P involuntario | Usuario = nodo P2P, IP expuesta, datos consumidos | ALTA |
| at.js tracking agresivo | Captura clicks, scroll, touch, mouse, Client Hints, session length → wkbc42/wkbc21 | ALTA |
| aclib.js anti‑detección | Headless, WebDriver, Puppeteer, CDP, DevTools detection | MEDIA |
| Interstitial sin control | Overlay full‑screen con RTB, posible click hijacking | ALTA |

---

## Vulnerabilidades del servidor (hallazgo Jornada 7)

El servidor principal 185.254.197.23 tiene **17 CVEs** según Shodan InternetDB:

| CVE | CVSS | Descripción |
|---|---|---|
| CVE-2024-6387 | 8.1 | regreSSHion — RCE sin auth en OpenSSH 8.7 |
| CVE-2023-38408 | 9.8 | OpenSSH ssh-agent RCE |
| CVE-2023-48795 | 5.9 | Terrapin — protocol downgrade SSH |
| CVE-2023-51385 | 6.5 | OpenSSH command injection ProxyCommand |
| CVE-2025-26465 | 6.8 | OpenSSH MitM cliente |
| CVE-2025-32728 | — | OpenSSH 2025 (detalles pendientes) |
| +11 CVEs adicionales | — | Legado y emergentes |

---

## Líneas pendientes de investigación

1. **AbuseIPDB** — definitivamente sin API key disponible. Limitación documentada.
2. **GA4 cruce vía SpyOnWeb** — G-L0N11PVD63 y G-65329600J2. Requiere browser.
3. **envivolibre.com y vivozly.com** — verificar si son sitios de cara al usuario.
4. **streamtpcloud.com** — monitorear DNS para ver cuándo activa.
5. **xmlrpc.php en pelotalibretv.su** — verificar si está habilitado (riesgo adicional WordPress).
6. **yourewatching.org + IP iraní** — verificar si es temporal o indica nueva jurisdicción.
7. ~~**Sesiones experimentales** — iniciar con A14-N-R1 y A14-D-R1 en AVD.~~ COMPLETADA
8. ~~**aclib.js deofuscación dinámica** — requiere browser + DevTools en sesión experimental.~~ COMPLETADA (deobfuscación completa + 5 scripts analizados)
9. **APKs de 1xbet.com y doradobet.com** — buscar en APKPure, APKCombo, VirusTotal.
10. **Herramienta de deobfuscación automatizada** — script Python reutilizable para esquema Adsterra.

---
