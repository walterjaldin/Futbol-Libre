# OSINT — Caracterización y resumen consolidado

**Última actualización:** 10 de mayo de 2026  
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

## Ecosistema de 12 dominios identificados

| Dominio | Estado | Familia | IP/Hosting |
|---|---|---|---|
| futbollibretv.su | Activo (→ futbol-libre.su) | Hispana | Virtual Systems (3 IPs) |
| futbol-libre.su | Activo (canónico) | Hispana | Virtual Systems |
| pelotalibretv.su | Activo | Rioplatense | Virtual Systems |
| librepelota.su | En preparación | Rioplatense | Cloudflare NS (sin A) |
| latamvidz1.com | Activo (backend) | Infraestructura | Virtual Systems |
| cdn.futbol-libre.su | Activo (CDN) | Infraestructura | BunnyCDN |
| doeemain.org | Caído (HTTP 500) | Plataforma matriz | Cloudflare |
| es.doeemain.org | Caído (HTTP 500) | Plataforma matriz | Cloudflare |
| pt.doeemain.org | No verificado | Plataforma matriz | Cloudflare |
| yourewatching.org | Activo (anómalo: IP iraní) | Anglófona | V. Systems + Cloudflare |
| yourewatching1.org | No verificado | Anglófona | Desconocido |
| yourewatching2.org | No verificado | Anglófona | Desconocido |

---

## Operador — perfil técnico

| Atributo | Evidencia |
|---|---|
| Correo operativo | joezm5a@proton.me (SOA futbollibretv.su + WHOIS pelotalibretv.su) |
| Correo personal expuesto | hassan.azmw@gmail.com (WHOIS futbol-libre.su — descuido inicial) |
| Registrador preferido | ARDIS-SU (todos los .su) |
| Proveedor de hosting | Virtual Systems LLC (todos los servidores activos) |
| Patrón de privacidad | Incoherente: WHOIS privado en futbollibretv.su, expuesto en futbol-libre.su, ProtonMail en pelotalibretv.su |
| Google Analytics | G-L0N11PVD63 (en todas las páginas de futbol-libre.su) |
| Google Search Console | Verificado en ambos dominios .su principales |
| Red de publicidad | Adsterra (popunder, ZoneId 10652966) |
| CDN de streams | latamvidz1.com (PHP, misma IP) |
| CDN de assets | BunnyCDN (pull zone: fltsu) |

---

## Vectores de riesgo identificados

| Vector | Descripción | Severidad estimada |
|---|---|---|
| Adsterra popunder (aclib.js) | Script ofuscado con 166 KB, popunder en todas las páginas | ALTA |
| Iframe de stream (latamvidz1.com) | Carga contenido de servidor externo sin CSP | ALTA |
| Ausencia de CSP | Sin Content-Security-Policy, scripts de terceros sin restricción | ALTA |
| Ausencia de HSTS | Sin Strict-Transport-Security, posible downgrade | MEDIA |
| Sin X-Frame-Options | Clickjacking posible | MEDIA |
| Tracking GA4 | Recolección de datos de visita | BAJA |
| Cross-linking ecosistema | Redireccionamiento entre dominios del operador | MEDIA |

---

## Líneas pendientes de investigación

1. **AbuseIPDB** — consulta pendiente por problema con API key.
2. **GA4 ID G-L0N11PVD63** — cruzar con SpyOnWeb/BuiltWith para otros sitios del operador.
3. **crt.sh** — análisis de certificados TLS del historial (sub-fase 1.3 incompleta).
4. **aclib.js deofuscación dinámica** — requiere browser + DevTools en sesión experimental.
5. **yourewatching.org + IP iraní** — verificar si es temporal o indica nueva jurisdicción.
6. **librepelota.su** — monitorear si activa resolución A.
7. **Sesiones experimentales** — iniciar con A14-N-R1 y A14-D-R1 en AVD.

---
