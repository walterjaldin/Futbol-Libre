# Nuevos dominios descubiertos en at.js (Auto-Tag)

**Fecha:** 24 de mayo de 2026  
**Fuente:** Deobfuscación de `acscdn.com/script/at.js`  

---

## wkbc42.com y wkbc21.com

**Estado:** Registrados (WHOIS activo) pero **sin resolución DNS**  
**Tipo:** Posibles dominios de tracking internos de Adsterra  

### Evidencia en at.js

Aparecen en el código de tracking/analytics para:
- URLs de fetch para recolectar métricas
- Logging de configuración de tracking
- Separación de datos en client hints

### Posibles explicaciones para la falta de resolución DNS

1. **Dominios de tracking personalizados** — Adsterra permite a publishers configurar dominios de tracking personalizados. Estos podrían ser dominios configurados por el operador de futbol-libre.su que ya no están activos o fueron desactivados.

2. **Generación dinámica** — El nombre del dominio podría ser modificado en runtime, con `wkbc42`/`wkbc21` como valores por defecto que son reemplazados.

3. **Infraestructura interna** — Podrían ser dominios usados dentro de la red interna de Adsterra, no accesibles públicamente.

4. **Rotación de dominios** — Adsterra rota sus dominios de tracking frecuentemente para evadir bloqueos.

### URLs/endpoints asociados (desde at.js)

```
wkbc42.com/ad/visit.php      (tracking de visitas)
wkbc42.com/al/visit.php      (tracking alternativo)
wkbc42.com/ut/aft.php        (post-auto-tag)
wkbc42.com/ut/aut.php        (auto-tag)
wkbc21.com (mismos endpoints, dominio alternativo)
```

---

## quesid.com

**Estado:** Activo — resuelve a Cloudflare (104.21.3.211 / 172.67.131.52)  
**Servidor:** openresty (nginx + LuaJIT)  
**Respuesta directa:** 403 Forbidden (esperado para endpoint de tracking)  
**Referencia parcial en at.js:** `//quesid.c` (el string completo es `//quesid.com`)  

### Detalles WHOIS

| Campo | Valor |
|---|---|
| Fecha de creación | 2021-10-19 |
| Expiración | 2026-10-19 |
| Registrar | NameCheap, Inc. |
| Privacidad | Withheld for Privacy ehf (Islandia) |
| DNS | dawn.ns.cloudflare.com / will.ns.cloudflare.com |

### URLScan histórico (140 escaneos totales)

| Sitio que contacta a quesid.com | Fecha | Contexto |
|---|---|---|
| games2go.site/de/987/ | 2026-01-03 | Casino alemán (Neon) con Adsterra |
| arcanescans.org (manga chapter) | 2025-11-20 | Scanlation — red publicitaria |
| spinandwin.casino/tonybet/ca/ | 2025-09–10 | Casino Tonybet |
| Múltiples sitios phishing | 2025-09 | Redireccionan a spinandwin.casino |

### Análisis

**quesid.com** es un **endpoint de tracking de Adsterra**. Evidencia:
1. Aparece en at.js (`//quesid.c` → `//quesid.com`) como parte del sistema de auto‑tag
2. Sirve con **openresty** — tecnología común en infraestructura de ad‑tech/tracking (permite validación Lua personalizada de requests)
3. 403 Forbidden a requests directos sin headers/cookies de tracking
4. Solo es contactado por sitios que cargan scripts de Adsterra (casinos, scanlation, phishing)
5. Mismo perfil que otros dominios de tracking de Adsterra

No se encontraron endpoints públicos. Su función específica dentro de at.js es probablemente:
- Receptor de métricas de comportamiento de usuario
- Registro de visitas para el dashboard de Adsterra
- Validación de tráfico (anti-fraude)

---

## Dominios previamente documentados confirmados en scripts

| Dominio | Aparece en | Propósito |
|---|---|---|
| `adexchangerapid.com` | aclib.js, suv5.js, banner.js | RTB ad exchange |
| `acscdn.com` | aclib.js, suv5.js, banner.js, interstitial.js | CDN de scripts |
| `usrpubtrk.com` | aclib.js | Fingerprinting |
| `velocecdn.com` | banner.js | CDN de assets |
| `cdn.jsdelivr.net` | aclib.js, sw.js | CDN de librerías (Clappr, SwarmCloud) |

---

## Impacto en el mapa del ecosistema

```
Ecosistema actualizado (con nuevos hallazgos)
├── Publicidad / Tracking
│   ├── acscdn.com (CDN scripts) ✓
│   ├── adexchangerapid.com (RTB) ✓
│   ├── usrpubtrk.com (fingerprinting) ✓
│   ├── wkbc42.com (tracking) ← NUEVO
│   ├── wkbc21.com (tracking) ← NUEVO
│   └── quesid.com (analytics) ← NUEVO (parcial)
```

---

## Recomendaciones

1. Monitorear `wkbc42.com` y `wkbc21.com` periódicamente para detectar cuando activen resolución DNS
2. Investigar `quesid.com` con herramientas de OSINT más profundas (Shodan, Censys)
3. Actualizar el mapa del ecosistema en `03_osint/00_caracterizacion_resumen.md`
4. Buscar estos dominios en capturas de tráfico de sesiones experimentales previas (pueden estar presentes pero no identificados)
