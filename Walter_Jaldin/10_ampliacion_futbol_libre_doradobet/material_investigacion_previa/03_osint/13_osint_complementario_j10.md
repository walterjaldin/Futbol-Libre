# 1.13 — OSINT complementario — Jornada 10

**Fecha:** 14 de mayo de 2026  
**Investigador:** Walter Jaldín  
**Fuentes:** whois terminal, análisis repositorio existente

---

## envivoslatam.org — WHOIS verificado

| Campo | Valor |
|---|---|
| Registrador | Dynadot Inc (IANA 472) |
| Privacidad | Super Privacy Service LTD c/o Dynadot |
| Fecha de creación | **7 de enero de 2026** |
| Fecha de expiración | 7 de enero de 2027 |
| Última actualización | 12 de enero de 2026 |
| Nameservers | ns1.dyna-ns.net / ns2.dyna-ns.net |
| Estado | clientTransferProhibited |
| IP | 195.178.110.11 (TECHOFF SRV LIMITED, AS48090) |

**Análisis:** `envivoslatam.org` fue registrado apenas **37 días antes del inicio de este estudio** (inicio: 27 de abril de 2026, registro: 7 de enero de 2026). Su corta vida útil y el uso de privacidad máxima (Dynadot Super Privacy) sugiere que es un dominio de infraestructura efímera creado específicamente para esta operación de streaming. El registrador Dynadot coincide con el registrador de otros dominios de respaldo del ecosistema (envivolibre.com).

---

## configma.website — OSINT

| Campo | Valor |
|---|---|
| Tipo | Nombre técnico de servidor (PTR reverse DNS) |
| Registro A | No resuelve públicamente |
| Aparición | PTR de IP 185.254.197.23 → `a1.configma.website.` |
| Registrador | Radix Technologies Inc. (registry de .website TLD) |
| Función | Identificador interno del servidor #1 del operador |

**Análisis:** `configma.website` no es un sitio web de cara al usuario. Es el nombre técnico que el operador usa para su servidor bajo el esquema PTR inverso. El patrón `a1.configma.website` (`a` = servidor tipo A, `1` = primer servidor) es típico de servidores cPanel con Engintron, donde el nombre del servidor se configura como el PTR del bloque IP. Esto revela que el operador nombra internamente sus servidores bajo el dominio `configma.website`, que solo existe en DNS inverso — no hay registro A público y el dominio no sirve contenido web.

---

## SOLLUTIUM — perfil completo

| Campo | Valor |
|---|---|
| Nombre | SOLLUTIUM LLC |
| Rol en ecosistema | Revendedor de servidores dedicados (VPS) de Virtual Systems LLC |
| IP hospedada | 138.226.244.112 (pelotalibretv.su) |
| PTR de la IP | `dedicated.sollutium.com` |
| Panel de gestión | WHMCS (confirmado por cookie `WHMCShpOU0C5N0hQs`) |
| Stack propio | PHP/7.4.32 (EOL noviembre 2022) |
| Subred RIPE | 138.226.244.0/23 (SOLLUTIUM-EU-MNT) |
| Conexión adicional | Registrador de latamvidz1.com |
| Dominio | sollutium.com (NameCheap, ~2013, Cloudflare DNS) |

**Análisis:** SOLLUTIUM es un intermediario técnico que arrienda servidores de Virtual Systems LLC a clientes como el operador del ecosistema. La vinculación de SOLLUTIUM con `latamvidz1.com` (backend PHP de streams) confirma que el operador es cliente directo de SOLLUTIUM para múltiples componentes de su infraestructura. El uso de PHP 7.4.32 (fuera de soporte de seguridad desde noviembre 2022) en el propio panel de SOLLUTIUM indica una plataforma de hosting con deuda técnica significativa.

---

## GA4 cross-reference — estado

| Propiedad GA4 | Sitio | Estado verificación |
|---|---|---|
| G-L0N11PVD63 | futbol-libre.su | ✅ Confirmado en capturas mitmproxy |
| G-65329600J2 | pelotalibretv.su | ✅ Confirmado en análisis estático |
| G-L0N11PVD63 en otros dominios | librefutbol.su, futbollibretv.su | ⚠️ Heredado vía 301 redirect |
| SpyOnWeb cross-reference | — | ❌ Pendiente — requiere browser |

Los IDs son distintos (dos propiedades GA4 separadas), pero el ZoneId Adsterra 10652966 idéntico en ambos sitios, el registrador ARDIS-SU compartido y el stack de hosting vinculado confirman propiedad del mismo operador.

---

## AbuseIPDB — limitación documentada

Sin API key, la consulta pública a AbuseIPDB devuelve solo:
- Número total de reportes
- Porcentaje de confianza de abuso  
- Categorías principales agregadas

No se obtiene: timestamps individuales, comentarios de reportante, ni detalle por reporte.

**Dato verificado (Jornada 8):** IP 195.178.110.160 (bloque /24 de envivoslatam.org) → 117,660 reportes en AbuseIPDB, clasificada como de muy alto riesgo de fraude por Scamalytics.

---

## Nuevo subdomain TECHOFF — sesión A14-N-R2

`bd2ih.envivoslatam.org` — **séptimo subdomain** confirmado en el estudio.

### Inventario completo de subdominios TECHOFF observados

| Subdomain | Función | Sesión |
|---|---|---|
| iaw5b.envivoslatam.org | HLS redirect | A14-N-R1 |
| qbk4f.envivoslatam.org | HLS stream | A14-N-R1, A14-N-R2 |
| smjt9q.envivoslatam.org | HLS redirect | A14-D-R1 |
| wf6kt.envivoslatam.org | HLS stream | A14-D-R1 |
| rci1w.envivoslatam.org | HLS redirect | A11-N-R1 |
| xky9q.envivoslatam.org | HLS stream | A11-N-R1 |
| bd2ih.envivoslatam.org | HLS redirect | A14-N-R2 |
| chrz.envivoslatam.org | HLS (Shodan) | Jornada anterior |
| dtkb.envivoslatam.org | HLS (Shodan) | Jornada anterior |

**9 subdominios en total** documentados para envivoslatam.org, todos en infraestructura TECHOFF AS48090.

---

## Ecosistema publicitario expandido — hallazgo A14-N-R2

La sesión R2 (con popunder resolviendo a doradobet.com) reveló un ecosistema de tracking mucho más extenso que el observado directamente en futbol-libre.su:

| Dominio | Empresa | Función |
|---|---|---|
| analytics.tiktok.com | TikTok/ByteDance | TikTok Pixel (30 req.) |
| a2/c1.adform.net | Adform | Ad exchange europeo |
| x.bidswitch.net | BidSwitch | Intermediario RTB |
| j.clarity.ms | Microsoft | Session recording |
| sync.crwdcntrl.net | Lotame | DMP / audience sync |
| segment.prod.bidr.io | Bidr.io | Audience bidder |
| www.woopra.com | Woopra | Analytics avanzado |
| mc.yandex.ru | Yandex | Metrica tracking |
| refpa37630.com | 1xbet afiliados | Cookie afiliado |

**Implicación:** La exposición de datos del usuario no se limita a los scripts cargados por futbol-libre.su. El popunder RTB — cuyo destino no controla el operador — introduce a su vez un segundo ecosistema completo de tracking, que incluye actores en jurisdicciones de alta opacidad (Yandex/Rusia, dominio de apuestas offshore).

---
