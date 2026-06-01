# Articulo tecnico: evidencias Futbol Libre y DoradoBet

Fecha de cierre: 1 de junio de 2026. Evidencias recolectadas en entorno controlado entre el 31 de mayo y 1 de junio de 2026.

## Tesis para el articulo

No encontramos una descarga automatica de malware en las corridas realizadas. Lo peligroso aparece en otro lado: Futbol Libre combina streaming pirata, iframes, publicidad ofuscada y pop-under; DoradoBet concentra rastreo intensivo, fingerprinting, KYC y riesgo de clones/dominos parecidos.

## Pruebas principales

### P1. Futbol Libre carga publicidad ofuscada desde terceros

- Hallazgo: La portada de Futbol Libre carga acscdn.com, adexchangerapid.com y usrpubtrk.com. Tambien se conservo copia local de los scripts aclib.js y suv5.js.
- Evidencia: `evidencias/aclib.js; evidencias/suv5.js; evidencias/publicable/futbol_home_desktop.redacted.json`
- Riesgo: Malvertising, rastreo y redirecciones variables por campana.

### P2. Click en el reproductor intenta abrir ventana nueva

- Hallazgo: En escritorio, el escenario futbol_espn_desktop_click registro 1 popup desde el iframe del reproductor. No hubo descarga.
- Evidencia: `evidencias/extended/futbol_espn_desktop_click/probe-result.json; captura after.png`
- Riesgo: Pop-under y landing externa potencialmente cambiante.

### P3. El stream usa iframe externo y hosts rotativos

- Hallazgo: El canal ESPN se embebe desde latamvidz1.com y contacta hosts envivoslatam.org distintos entre corridas, ademas de infraestructura P2P/telemetria.
- Evidencia: `evidencias/latamvidz1_espn.html; dominios ng0pr.envivoslatam.org y smjt9q.envivoslatam.org en JSON redactados.`
- Riesgo: Dependencia de terceros y comportamiento cambiante fuera del dominio principal.

### P4. DoradoBet movil expone una cadena adult/affiliate

- Hallazgo: En mobile/PWA se observaron solicitudes hacia bit.ly, go.xlviiirdr.com y chaturbate.com con track=doradobet.com.
- Evidencia: `evidencias/publicable/interesting_requests.csv; doradobet_home_mobile.redacted.json; doradobet_pwa_mobile.redacted.json`
- Riesgo: Redireccion/publicidad adulta o afiliada asociada al trafico movil, aunque sin descarga observada.

### P5. DoradoBet tiene rastreo intensivo

- Hallazgo: La carga desktop contacto 62 dominios; mobile 86; registro 69; PWA 68. Incluye FingerprintJS, Amplitude, TikTok, Clarity, Criteo, Adform, Xandr/AppNexus, MGID y Sportradar.
- Evidencia: `evidencias/publicable/scenario_summary.csv; domains_by_scenario.csv`
- Riesgo: Perfilado, retargeting y huella persistente del visitante.

### P6. Fingerprinting confirmado por codigo

- Hallazgo: El HTML de DoradoBet carga fpjscdn.net, guarda visitor_fp/visitor_fp5/fp_visitor_id y envia datos a static.virtualsoft.tech/setvid.
- Evidencia: `evidencias/doradobet/home.html; doradobet_home_desktop.redacted.json`
- Riesgo: Identificacion persistente incluso sin iniciar sesion.

### P7. Registro pide datos personales sensibles

- Hallazgo: La pantalla de registro solicita nombre, apellido, documento, numero de identificacion, telefono, ciudad/provincia, email y contrasena.
- Evidencia: `evidencias/extended/doradobet_register_desktop/after.png`
- Riesgo: Riesgo KYC/identidad, especialmente si el usuario cae en un clon.

### P8. La PWA carga infraestructura de engagement/push

- Hallazgo: La ruta /landing/app-pwa contacto Optimove y Kumulos, incluidos endpoints de worker/config/eventos. No se observo prompt de notificaciones.
- Evidencia: `evidencias/publicable/doradobet_pwa_mobile.redacted.json; interesting_requests.csv`
- Riesgo: Seguimiento de instalacion/eventos y posibilidad de engagement push segun contexto.

### P9. Dominios parecidos amplian el riesgo de suplantacion

- Hallazgo: El escaneo encontro dominios similares con Cloudflare, WordPress, LiteSpeed, titulos promocionales y un caso con X-Powered-By: PHP/5.6.40.
- Evidencia: `evidencias/publicable/doradobet_clone_scan.csv`
- Riesgo: Confusion de marca, phishing, captura de datos o afiliacion agresiva.

### P10. No hubo descarga automatica en los escenarios medidos

- Hallazgo: Los siete escenarios registraron downloads=0. Esto limita la conclusion: no se probo malware directo, pero si redirecciones, popups y rastreo.
- Evidencia: `evidencias/publicable/scenario_summary.csv`
- Riesgo: La ausencia de descarga en una muestra no descarta campanas futuras o segmentadas.

## Conteo por escenario

| Escenario | Dominios | Popups | Descargas | localStorage |
|---|---:|---:|---:|---:|
| doradobet_home_desktop | 62 | 0 | 0 | 15 |
| doradobet_home_mobile | 86 | 0 | 0 | 15 |
| doradobet_pwa_mobile | 68 | 0 | 0 | 23 |
| doradobet_register_desktop | 69 | 0 | 0 | 23 |
| futbol_espn_desktop_click | 8 | 1 | 0 | 0 |
| futbol_espn_mobile_click | 8 | 0 | 0 | 0 |
| futbol_home_desktop | 10 | 0 | 0 | 0 |

## Dominios parecidos a DoradoBet

| Dominio | Estado | Servidor | X-Powered-By | WordPress | Titulo |
|---|---|---|---|---:|---|
| doradobet.com | 200 | cloudflare | - | no |  |
| doradobet.online | 200 | cloudflare | PHP/5.6.40 | no | Doradobet Casino Perú | 300% + S/50 Gratis o 50 Giros |
| dorado-bet.org | 403 | cloudflare | - | no | 403 Forbidden |
| doradobet.org.pe | 403 | cloudflare | - | no | 403 Forbidden |
| dorado-bet.pe | 200 | cloudflare | - | si | Doradobet Casino Online y Apuestas Deportivas en Perú 2026 |
| doradobet-peru.org | 200 | cloudflare | - | si | Doradobet Perú – Apuestas Deportivas y Casino Online Legal con Bono de Bienvenid |
| doradobetapp.com |  |  | - | no |  |
| doradobet.bet | 200 | LiteSpeed | - | no | DoradoBet Reseña de Perú - Cómo Apostar y Retirar Ganancias Fácilmente |
| doradobet.pe | 405 |  | - | no |  |
| doradobet-review.com | 503 | cloudflare | - | no | Account Suspended — doradobet-review.com |

## Frases utilizables en el articulo

- En nuestras pruebas no hubo descarga automatica, pero si hubo pop-under, iframes externos, publicidad ofuscada y rastreo de terceros.
- En DoradoBet, el hallazgo mas fuerte no fue malware directo sino privacidad: 62 a 86 dominios externos por escenario y fingerprinting persistente.
- En mobile/PWA aparecio una cadena de publicidad adulta/afiliada asociada a DoradoBet: bit.ly, go.xlviiirdr.com y chaturbate.com.
- La superficie de riesgo no termina en el dominio oficial: existen dominios parecidos, clones o sitios promocionales que pueden capturar usuarios confundidos.

## Archivos clave

- `evidencias/publicable/ANEXO_EVIDENCIAS.md`
- `evidencias/publicable/scenario_summary.csv`
- `evidencias/publicable/domains_by_scenario.csv`
- `evidencias/publicable/interesting_requests.csv`
- `evidencias/publicable/doradobet_clone_scan.csv`
- `evidencias/extended/doradobet_home_mobile/after.png`
- `evidencias/extended/doradobet_register_desktop/after.png`
- `evidencias/extended/futbol_espn_desktop_click/after.png`

## Fuentes externas

- https://doradobet.com/
- https://verification.anjouangamingboard.org/
- https://www.scamadviser.com/check-website-old/doradobet.com
- https://www.scamdoc.com/view/419235
- https://www.klazify.com/website/doradobet.com
- https://www.yogonet.com/international/news/2024/04/16/71750-peru-doradobet-earns-authorization-to-operate-online-casino-games-for-the-next-six-years
