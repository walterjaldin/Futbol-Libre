# Notas — Sesión A14-N-R1

**Perfil:** Android 14, Sin protección DNS  
**Sesión:** R1 (primera captura)  
**Fecha:** 27 de abril de 2026  
**Hora inicio:** 20:15 UTC  
**Herramienta:** mitmproxy 9.0.1, puerto 8082  
**Emulador:** AVD A14_perfil_investigacion (Pixel 6, API 34)  
**DNS:** ISP predeterminado (sin protección)  
**Chrome:** 113.0.5672.136

---

## Resumen

**84 flujos, 19 dominios únicos, 2.5 MB.** Primera sesión de captura del estudio. Documenta el comportamiento base del ecosistema futbol-libre.su en Android 14 sin ninguna capa de protección activa. La sesión capturó todos los vectores de fingerprinting, tracking inicial y el pipeline HLS completo. El popunder RTB fue documentado en profundidad en R2.

---

## Configuración del perfil

- **Versión Android:** 14 (API 34)
- **Navegador:** Chrome 113.0.5672.136
- **Protección DNS:** Ninguna (ISP predeterminado)
- **Proxy:** mitmproxy 9.0.1, puerto 8082
- **CA instalada:** mitmproxy-ca-cert.pem vía tmpfs en /apex/com.android.conscrypt/cacerts/

---

## Dominios destacados

| Dominio | Requests | Función |
|---|---|---|
| futbol-libre.su | 12 | Carga inicial del sitio |
| cdn.futbol-libre.su | 8 | CDN BunnyCDN Miami |
| usrpubtrk.com | 6 | Fingerprinting Adsterra (POST) |
| acscdn.com | 7 | aclib.js + suv5.js (scripts Adsterra) |
| adexchangerapid.com | 4 | RTB bid exchange |
| iaw5b.envivoslatam.org | 3 | HLS redirect (TECHOFF) |
| qbk4f.envivoslatam.org | 14 | HLS stream final (TECHOFF) |
| latamvidz1.com | 5 | Backend PHP streams |
| google-analytics.com | 6 | GA4 G-L0N11PVD63 |
| googletagmanager.com | 3 | GTM |

---

## Observaciones durante la sesión

### Al cargar la página principal

- Carga inmediata de `usrpubtrk.com` (fingerprinting Adsterra) antes de cualquier interacción del usuario
- GA4 G-L0N11PVD63 disparado sin aviso de cookies ni consentimiento
- Scripts `aclib.js` y `suv5.js` cargados desde `acscdn.com` — configuran ZoneId Adsterra 10652966

### Al interactuar con la primera transmisión

- Selección de canal ESPN → solicitud a `latamvidz1.com/canal.php?stream=espn`
- `latamvidz1.com` emite PHPSESSID sin flags de seguridad
- Redirect HLS: `iaw5b.envivoslatam.org` → `qbk4f.envivoslatam.org`
- IP del usuario incluida en token: `&ip=181.115.172.46`
- Stream se reproduce correctamente (Server: Streamer 24.03)

### Permisos solicitados

- Ningún permiso de sistema solicitado al usuario durante la sesión

### Pop-ups, pop-unders y redirecciones

- Script `aclib.js` configura el popunder con ZoneId 10652966 (Adsterra)
- El popunder no fue activado en esta sesión base — documentado en profundidad en R2

### Descargas sugeridas o forzadas

- Ninguna descarga de archivo disparada en esta sesión

---

## Fingerprinting — usrpubtrk.com

```json
POST usrpubtrk.com/track
{
  "clientHints": {
    "chu": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"113\", \"Google Chrome\";v=\"113\"",
    "chmob": "?1",
    "chmod": "sdk_gphone64_arm64",
    "chp": "Android",
    "chpv": "14.0.0",
    "chuafv": "113.0.5672.136"
  }
}
```

**6 campos Client Hints** — implementación completa de UA-CH en Chrome 113. El campo `chu` (brand list) y `chmob` (indicador móvil) están presentes, a diferencia de Chrome 91.

---

## HLS

```
iaw5b.envivoslatam.org/hotflix/espn/index.m3u8?token=d087c65d...&ip=181.115.172.46
→ qbk4f.envivoslatam.org (stream final)
Server: Streamer 24.03
Content-Type: application/vnd.apple.mpegurl
```

IP del usuario boliviano (`181.115.172.46`) expuesta en parámetro `&ip=` de la URL del token. El servidor TECHOFF recibe y registra la IP real.

---

## PHPSESSID

```
Set-Cookie: PHPSESSID=a3f7b91c2d044e8f1a6c5d8b3e7f9012; path=/
```

Sin flags `HttpOnly`, `Secure` ni `SameSite`. Vulnerable a robo por XSS y transmisión en contextos inseguros.

---

## GA4 — confirmado

```
POST https://www.google-analytics.com/g/collect?...&tid=G-L0N11PVD63
```

Tracking inmediato al cargar la página, antes de cualquier interacción. Sin aviso de cookies ni consentimiento explícito.

---

## Archivos de evidencia

- `A14-N-R1_flows.mitm` — 84 flujos, 2.5 MB
