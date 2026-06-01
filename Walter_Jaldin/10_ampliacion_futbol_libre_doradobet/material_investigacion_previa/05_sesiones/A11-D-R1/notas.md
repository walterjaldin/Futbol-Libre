# Notas — Sesión A11-D-R1

**Perfil:** Android 11, AdGuard DNS-over-TLS activo  
**Sesión:** R1 (primera repetición)  
**Fecha:** 14 de mayo de 2026  
**Hora inicio:** 21:16 UTC  
**Herramienta de captura:** mitmproxy 9.0.1 (modo proxy transparente, puerto 8084)  
**Emulador:** AVD A11_perfil_investigacion (Pixel 5, API 30, Google APIs arm64-v8a)  
**Proxy instalado:** 192.168.1.6:8084 (host Mac Air)  
**DNS activo:** Private DNS → `dns.adguard.com` (DNS-over-TLS)  
**Chrome versión:** 91.0.4472.114  
**Nota metodológica:** Mismo setup que A11-N + AdGuard DNS configurado

---

## Resumen de la sesión

La sesión capturó **78 flujos HTTP** en **19 dominios únicos**. El volumen es menor que las sesiones anteriores porque el HLS de envivoslatam.org no llegó a cargar en esta sesión (posiblemente bloqueado por AdGuard DNS en este intento). Los dominios de tracking y publicidad de Adsterra continuaron activos. El popunder RTB resolvió esta vez a **www.doradobet.com** — un sitio de apuestas diferente a bol.1xbet.com (observado en A14-D y A11-N), confirmando la naturaleza dinámica del RTB.

---

## Dominios contactados

| Dominio | Requests | Categoría | Riesgo | Bloqueado AdGuard |
|---|---|---|---|---|
| cdn.futbol-libre.su | 18 | CDN propio | Bajo | — |
| **www.doradobet.com** | **11** | **Popunder RTB — apuestas** | CRÍTICO | ❌ NO |
| acscdn.com | 7 | Adsterra scripts | **ALTO** | ❌ NO |
| adexchangerapid.com | 5 | Ad exchange RTB | **ALTO** | ❌ NO |
| cdn.jsdelivr.net | 5 | Clappr CDN | Bajo | — |
| futbol-libre.su | 4 | Sitio objetivo | — | — |
| usrpubtrk.com | 3 | Fingerprint dispositivo | **ALTO** | ❌ NO |
| www.googletagmanager.com | 3 | GTM | Bajo | — |
| www.google-analytics.com | 2 | Analytics | Bajo | — |
| latamvidz1.com | 2 | Stream backend | Medio | ❌ NO |
| **v.byads.co** | 1 | Red de anuncios (nueva) | Alto | ❌ NO |
| **js.stripe.com** | 1 | Stripe SDK (desde doradobet) | **CRÍTICO** | ❌ NO |

---

## Hallazgo crítico: js.stripe.com cargado desde el popunder

El popunder `www.doradobet.com` cargó el SDK de Stripe (`js.stripe.com`):

```
GET https://js.stripe.com/v3/
  Referer: https://www.doradobet.com/registro_regalo_bienvenida_500.htm
```

**Implicaciones:**
1. El popunder no es solo publicidad — es un **formulario de captación activo** destinado a registros de usuarios con datos de pago
2. Stripe es usado para procesar depósitos en el sitio de apuestas
3. Un usuario boliviano que interactúe con el popup podría proporcionar datos bancarios a un sitio de apuestas externo
4. La URL de destino (`/registro_regalo_bienvenida_500.htm`) es explícitamente una página de registro con "regalo de bienvenida de $500"

---

## Hallazgo: RTB dinámico — diferente destino por sesión

| Sesión | Popunder RTB destino |
|---|---|
| A14-N-R1 | Subasta RTB (no clickeado) |
| A14-D-R1 | bol.1xbet.com (apuestas deportivas) |
| A11-N-R1 | bol.1xbet.com (apuestas deportivas) |
| **A11-D-R1** | **www.doradobet.com (apuestas — $500 bono)** |

El destino del popunder varía por sesión, dependiendo del ganador de la subasta RTB en tiempo real. El operador de futbol-libre.su **no controla qué sitio se abre** — cualquier anunciante que gane la subasta puede mostrar su contenido, incluyendo sitios de phishing, malware o estafas.

---

## Fingerprint — idéntico a A11-N (AdGuard no lo bloquea)

```json
{
  "clientHints": {
    "chmod": "sdk_gphone_arm64",
    "chp": "Android",
    "chpv": "11",
    "chuafv": "91.0.4472.114"
  },
  "isScrollable": 1,
  "totalClicks": 0,
  "sessionLength": 0
}
```

usrpubtrk.com, acscdn.com y adexchangerapid.com **no están en las listas de bloqueo de AdGuard DNS** y operan con normalidad en todos los perfiles con AdGuard.

---

## HLS — No observado en esta sesión

`envivoslatam.org` no aparece en los flujos de esta sesión (0 requests). Posibles causas:
1. El iframe de latamvidz1.com solo recibió 2 requests — carga parcial del player
2. El subdomain específico de envivoslatam.org rotado para esta sesión podría estar en la lista de AdGuard
3. La sesión fue más corta que las demás

Esta inconsistencia se documenta como limitación metodológica. En sesiones repetidas, el HLS podría cargar o no dependiendo de la rotación de subdominios activa.

---

## Archivos de evidencia

- `A11-D-R1_flows.mitm` — 78 flujos, 1.7 MB
