# Línea de tiempo — Sesión 01

---

## Cronología de eventos observados

| Hora     | Tiempo relativo | Evento observado                                                                                    |
| -------- | --------------- | --------------------------------------------------------------------------------------------------- |
| 23:24:01 | T+00s           | Inicio de la sesión experimental                                                                    |
| 23:24:01 | T+00s           | Acceso directo al dominio `https://futbol-libre.su/`                                                |
| 23:24:02 | T+01s           | Solicitud inicial del documento HTML principal                                                      |
| 23:24:02 | T+01s           | Inicio de carga de recursos externos JavaScript                                                     |
| 23:24:03 | T+02s           | Solicitudes a librerías externas (`code.jquery.com`, `cdnjs.cloudflare.com`, `ajax.googleapis.com`) |
| 23:24:03 | T+02s           | Solicitud a `googletagmanager.com`                                                                  |
| 23:24:03 | T+02s           | Solicitud a scripts internos del dominio objetivo                                                   |
| 23:24:04 | T+03s           | Solicitud a infraestructura publicitaria externa (`acscdn.com`)                                     |
| 23:24:05 | T+04s           | Primer POST automático hacia `usrpubtrk.com`                                                        |
| 23:24:05 | T+04s           | Solicitud a infraestructura publicitaria (`adexchangerapid.com`)                                    |
| 23:24:06 | T+05s           | POST hacia Google Analytics (`google-analytics.com`)                                                |
| 23:25:09 | T+68s           | Nueva solicitud POST automática hacia `usrpubtrk.com`                                               |
| 23:29:18 | T+317s          | Último POST automático observado hacia `usrpubtrk.com`                                              |
| 23:29:18 | T+317s          | Finalización de la sesión experimental                                                              |

---

## Observaciones cronológicas relevantes

Durante los primeros segundos de ejecución se observó una carga intensiva de recursos externos, incluyendo librerías JavaScript, servicios de analítica y componentes publicitarios.

Asimismo, se identificó comportamiento repetitivo consistente con telemetría automática mediante múltiples solicitudes POST hacia infraestructura externa durante la sesión pasiva.

---

## Nota metodológica

La cronología fue reconstruida a partir de:

- registros HTTP/HTTPS de Burp Suite
- timeline de Logger++
- observación directa durante la ejecución experimental

Los tiempos reflejan eventos observables desde el entorno cliente.