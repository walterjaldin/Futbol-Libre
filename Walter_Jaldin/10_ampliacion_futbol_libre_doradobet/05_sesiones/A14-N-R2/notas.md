# Notas — Sesión A14-N-R2

**Perfil:** Android 14, Sin protección DNS  
**Sesión:** R2 (segunda repetición)  
**Fecha:** 14 de mayo de 2026  
**Hora inicio:** 21:44 UTC  
**Herramienta:** mitmproxy 9.0.1, puerto 8082  
**Emulador:** AVD A14_perfil_investigacion (Pixel 6, API 34)  
**DNS:** ISP predeterminado (sin protección)  
**Chrome:** 113.0.5672.136

---

## Resumen

**411 flujos, 122 dominios únicos, 7.8 MB.** La segunda repetición capturó significativamente más dominios que R1 (19 dominios) porque el popunder RTB resolvió a **www.doradobet.com**, que a su vez cargó un ecosistema completo de tracking publicitario.

---

## Dominios destacados

| Dominio | Requests | Novedad vs R1 |
|---|---|---|
| qbk4f.envivoslatam.org | 52 | Mismo subdomain que R1 |
| **analytics.tiktok.com** | **30** | **NUEVO — TikTok Pixel** |
| www.doradobet.com | 21 | Nuevo (popunder RTB) |
| a2.adform.net / c1.adform.net | 26 | **NUEVO — Adform ad exchange** |
| x.bidswitch.net | 8 | **NUEVO — BidSwitch RTB** |
| j.clarity.ms | 6 | **NUEVO — Microsoft Clarity** |
| sync.crwdcntrl.net | 6 | **NUEVO — Lotame DMP** |
| segment.prod.bidr.io | 6 | **NUEVO — Bidr.io audience** |
| www.woopra.com | 7 | **NUEVO — Woopra analytics** |
| pulse-vs.vercel.app | 9 | **NUEVO — desconocido** |
| usrpubtrk.com | 7 | Confirmado (fingerprint) |
| adexchangerapid.com | 6 | Confirmado (RTB Adsterra) |
| latamvidz1.com | — | No capturado esta sesión |

## Hallazgos nuevos de R2

1. **TikTok Pixel (analytics.tiktok.com)** — 30 requests desde doradobet.com. El sitio de apuestas usa TikTok Pixel para tracking de conversiones, enviando el perfil del visitante a TikTok/ByteDance.

2. **Adform ad exchange** — plataforma europea de compra de anuncios. Indica que el ecosistema de monetización de doradobet.com conecta con múltiples exchanges RTB.

3. **Microsoft Clarity (j.clarity.ms)** — herramienta de analítica de sesión con grabación de pantalla (heatmaps, session recording). Doradobet.com graba la sesión del usuario.

4. **Lotame (crwdcntrl.net)** — DMP (Data Management Platform) de audience syndication. El perfil del usuario boliviano se sincroniza a la plataforma de datos de audiencias de Lotame.

5. **bd2ih.envivoslatam.org** — séptimo subdomain TECHOFF observado en el estudio.

## HLS

```
bd2ih.envivoslatam.org/hotflix/espn/index.m3u8?token=4a6c0a68...&ip=181.115.172.46
→ qbk4f.envivoslatam.org (mismo stream final que R1)
Server: Streamer 24.03
```

## PHPSESSID

```
PHPSESSID=8e3c550f81844ca0d018a6fddf45fd70; path=/  (sin flags — idéntico a R1)
```

## Archivos de evidencia

- `A14-N-R2_flows.mitm` — 411 flujos, 7.8 MB
