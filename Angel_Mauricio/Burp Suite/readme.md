# Introducción

El presente análisis tiene como objetivo examinar el comportamiento de plataformas de streaming no oficiales desde un dispositivo Android, utilizando técnicas de interceptación de tráfico HTTP/HTTPS mediante Burp Suite.

Durante la investigación se identificaron mecanismos de:

- Rastreo persistente (*tracking*)
- Fingerprinting de dispositivos
- Redirecciones publicitarias forzadas
- Telemetría de comportamiento
- Distribución de contenido mediante HLS
- Integración con plataformas de apuestas y publicidad automatizada

El análisis se realizó en un entorno controlado utilizando un dispositivo Android conectado a un proxy de inspección configurado sobre Burp Suite Community Edition.

# Configuración de Burp Suite como Proxy para Android

## 1. Preparación del Host (PC)

Primeramente debemos descargar e instalar Burp Suite:

https://portswigger.net/burp/communitydownload

Abrimos Burp Suite y vamos a:

```text
Proxy -> Proxy Settings -> Tools -> Proxy
```
<img width="886" height="472" alt="image" src="https://github.com/user-attachments/assets/c4aced04-c30b-45ed-9439-31a69359b4d2" />

<br><br>

<img width="886" height="116" alt="image" src="https://github.com/user-attachments/assets/c53571a1-19da-43f3-8721-91a39867dd71" />

<br><br>

<img width="886" height="178" alt="image" src="https://github.com/user-attachments/assets/37ae8ba0-bb91-4894-b901-cc7a2f9131fc" />

### Usaremos el puerto `8081` y todas las interfaces.
<img width="886" height="588" alt="image" src="https://github.com/user-attachments/assets/510a1f42-dfaf-4544-b3ef-f06e0808cb7a" />


### Guardaremos el certificado para nuestro dispositivo celular.
<img width="347" height="113" alt="image" src="https://github.com/user-attachments/assets/861db90b-df63-488b-9534-7b0169da2572" />


### Necesitamos saber la IP de nuestra PC para que el Android lo apunte como proxy, para eso necesitaremos hacer un `ipconfig` en CMD.
<img width="880" height="139" alt="image" src="https://github.com/user-attachments/assets/e9b900c6-fc87-4a0a-b475-78275d2556c8" />


---

## 2. Preparación del Cliente (Android)

Conecta el celular a la misma red Wi-Fi que la PC.

Apuntaremos la dirección IP de nuestra PC, en este caso:

```text
192.168.100.219
```

En Android vamos a:

```text
Ajustes de Wi-Fi -> Selecciona tu red -> Modificar red
-> Opciones avanzadas -> Proxy -> Manual
```
<img width="691" height="1459" alt="image" src="https://github.com/user-attachments/assets/35408367-b51a-4ccd-91fc-8bb798fc2364" />

<br><br>

<img width="691" height="1459" alt="image" src="https://github.com/user-attachments/assets/8fd962d5-8178-4d5a-bfdd-74d6cea60aeb" />


### Una vez configurado, ponemos en prueba que esto funciona.
<img width="886" height="232" alt="image" src="https://github.com/user-attachments/assets/25506026-ca00-4b1d-bb62-1bef084b15cf" />


Pero esto no es lo que buscamos, ya que esto nos dirá qué hacer con cada paquete entrante, lo cual no nos permitiría cargar la página porque nos preguntará qué hacer con cada paquete.

Entonces desactivamos:

```text
Intercept ON
```

Para luego ir a:

```text
HTTP history
```

<img width="886" height="290" alt="image" src="https://github.com/user-attachments/assets/1eff44c8-b285-4e24-b6ce-2d64c069b759" />

# Análisis de Redirecciones y Rastreo en Sitios de Streaming

Le dimos click a un partido dentro de la página:

https://futbol-libre.su

Y nos manda nuestro primer anuncio:

```text
reffpa.com
```
<img width="886" height="199" alt="image" src="https://github.com/user-attachments/assets/16f6f2b1-b909-4ad4-9628-f899447d88b1" />

---

# 1. Desglose Técnico de los Datos (Análisis Forense)

## Código de Estado HTTP 303 (See Other)

Este es un hallazgo crítico.  
A diferencia de un `301` o `302`, el `303` indica que el servidor está redirigiendo al navegador a una URL distinta (posiblemente una página de aterrizaje de malware o phishing) y obliga al dispositivo a realizar una nueva petición `GET`.

---

## Set-Cookie (A_1599_v=0; A_1599_c=1)

El servidor ha logrado escribir datos en el almacenamiento local del navegador Android.

Esto se utiliza para:

- Rastreo persistente (`tracking`)
- Identificación del usuario
- Seguimiento entre sesiones

---

## IP de Destino (91.186.207.126)

Se identificó la ubicación física del servidor de publicidad.

Es importante documentar:

- ASN (Número de Sistema Autónomo)
- País de origen
- Proveedor de hosting

---

## Tamaño de Respuesta (402 bytes)

Es una respuesta pequeña, típica de una instrucción de redirección pura que no contiene contenido visual, solo lógica de control.

---

# Redacción Técnica

Se identificó una redirección forzada hacia el dominio `reffpa.com`.

El análisis de la cabecera `User-Agent` confirma la persistencia de una solicitud orientada específicamente al ecosistema Android.

La presencia del parámetro `click_id` sugiere una cadena de monetización mediante *malvertising*, donde el identificador único permite el rastreo del usuario a través de múltiples sesiones de navegación.

---

<img width="886" height="39" alt="image" src="https://github.com/user-attachments/assets/60d02d7a-7b36-4b9b-bb84-3abd751a3131" />

Se observó una respuesta HTTP `303` proveniente del host:

```text
reffpa.com
(IP: 91.186.207.126)
```

La cual forzó una redirección del agente de usuario.

Durante esta interacción, se detectó la inyección de una cookie de rastreo:

```text
A_1599_v=0
```

Lo que confirma la ejecución de actividades de perfilamiento de usuario de forma automatizada y sin interacción directa del sujeto experimental.

---

# Publicidad Detectada

Nos redirigió a esta publicidad:

<img width="886" height="36" alt="image" src="https://github.com/user-attachments/assets/356b959f-84a3-4387-bc8b-6a943db06a5a" />

---

# 2. Análisis Técnico de la Evidencia

## Método POST

A diferencia del `GET` anterior, un `POST` significa que el dispositivo Android envió información hacia el servidor.

No solo se visitó una página; el navegador también reportó información al servidor remoto.

---

## Dominio bol.1xbet.com

Indica que el sitio de streaming tiene una integración profunda con plataformas de apuestas.

El uso de subdominios regionales:

```text
bol.1xbet.com
```

Sugiere que el sitio detectó la ubicación geográfica del usuario en Bolivia y personalizó el vector de publicidad o rastreo.

---

## Contenido JSON

El hecho de que la respuesta sea un objeto `JSON` y el endpoint mencione:

```text
event.json
```

Sugiere que se trata de un sistema de tracking de eventos.

Esto puede incluir:

- Clics
- Tiempo de permanencia
- Navegación
- Interacción del usuario

---

## IP 172.64.146.192

Esta IP pertenece a:

```text
Cloudflare
```

Es común que estos sitios utilicen CDNs para:

- Ocultar la infraestructura real
- Evadir bloqueos
- Distribuir contenido globalmente

---

# Redacción Técnica

El hallazgo de peticiones asíncronas vía `POST` hacia el endpoint:

```text
/fatman-api
```

Evidencia un mecanismo de monitorización activa del comportamiento del usuario.

La estructura de la solicitud, procesada bajo el estándar `JSON`, sugiere una recolección de metadatos del dispositivo que excede las necesidades funcionales de un servicio de streaming, posicionando a la plataforma como un nodo de recolección de inteligencia comercial o potencialmente maliciosa.

<img width="886" height="857" alt="image" src="https://github.com/user-attachments/assets/7bfe5f78-b47a-4c20-bb3f-0d6c048fa86a" />

# 1. Análisis Técnico del Payload (JSON)

El contenido enviado revela que el sitio no solo transmite video, sino que también realiza una inspección activa de las capacidades del hardware del dispositivo.

---

## Parámetros Detectados

### `"sw":411, "sh":734`

Representan:

- `Screen Width`
- `Screen Height`

Estos valores son típicos de un dispositivo móvil Android y son utilizados para técnicas de:

```text
Canvas Fingerprinting
```

Esto permite identificar de forma casi única al dispositivo entre miles de usuarios.

---

### `"w":114`

Probablemente representa:

- Tiempo de respuesta
- Parámetro de renderizado
- Métrica de rendimiento gráfico

Este tipo de dato suele utilizarse para enriquecer perfiles de seguimiento.

---

### `"m":{...}`

Los identificadores:

```text
i1, i2, i3
```

Suelen corresponder a:

- IDs de campañas publicitarias
- Trackers de comportamiento
- Identificadores regionales

Los mismos parecen estar vinculados al contexto geográfico del usuario en Bolivia.

---

# 2. Análisis de Cabeceras (Cookies y Seguridad)

## `fatman_uuid`

Corresponde a un identificador único persistente.

Aunque el usuario elimine las cookies del navegador, este identificador puede permanecer asociado al perfil almacenado en los servidores de la plataforma.

---

## `cf_clearance`

Indica el uso de:

```text
Cloudflare
```

Esto suele emplearse para:

- Protección contra ataques DDoS
- Filtrado automatizado
- Mitigación de bots
- Obstaculizar análisis automatizados

---

## `Sec-Fetch-Site: same-origin`

Este encabezado indica que el navegador interpreta la solicitud como proveniente del mismo origen.

Sin embargo, el tráfico observado demuestra el envío de telemetría de comportamiento hacia endpoints externos vinculados al sistema de rastreo.

---

# Redacción Técnica

Mediante la inspección del cuerpo de la petición (`Request Body`) hacia el endpoint:

```text
/event.json
```

Se confirmó la captura de dimensiones físicas de pantalla y metadatos de sesión estructurados en formato `JSON`.

La evidencia observada sugiere la implementación de mecanismos de creación de huella digital (*fingerprinting*) del dispositivo Android, permitiendo el rastreo persistente del usuario dentro de la plataforma:

```text
bol.1xbet.com
```

Todo ello sin requerir interacción consciente ni consentimiento explícito del sujeto experimental.

<img width="886" height="184" alt="image" src="https://github.com/user-attachments/assets/832da742-66e8-40e2-b701-7c748b3c0df7" />

# Hosts Detectados y Evaluación de Riesgo

| Prioridad | Host Detectado | Función Técnica | Riesgo para el Usuario |
|---|---|---|---|
| Alta | `reffpa.com` | Redirección (TDS) | Exposición a phishing o malware |
| Alta | `adexchangerapid.com` | Inyección de Scripts | Ejecución de código ofuscado |
| Media | `usrpubtrk.com` | Telemetría (Heartbeat) | Pérdida de privacidad y rastreo de hábitos |
| Baja | `gvt2.com` | Servicios de Google | Ruido de fondo del sistema Android |

---
<img width="886" height="16" alt="image" src="https://github.com/user-attachments/assets/75c0fb80-4231-4e1c-9123-924813191610" />

# Exfiltración de Metadatos y Perfilamiento de Hardware

Se identificó una petición de tipo `GET` hacia el dominio de terceros:

```text
adexchangerapid.com
```

La solicitud transportaba un payload de telemetría altamente detallado dentro de la URL.

Mediante el análisis de los parámetros de la cadena de consulta (*query strings*), se determinó que la plataforma recolecta, sin consentimiento explícito, variables críticas del entorno del usuario.

---

## Información Recolectada

### 1. Identificadores de Hardware

Se obtuvo el modelo exacto del dispositivo:

```text
SM-A105M
```

Además de información relacionada con la arquitectura del sistema.

---

### 2. Vulnerabilidad de Software

Se identificó la versión del sistema operativo:

```text
Android 9.0.0
```

Y detalles del motor del navegador utilizado.

---

### 3. Métricas de Estado

La plataforma recolectó:

- Nivel de batería
- Resolución de pantalla
- Parámetros de renderizado

---

Este nivel de detalle facilita la creación de una huella digital persistente (*device fingerprinting*), permitiendo el rastreo del usuario incluso después de eliminar cookies o identificadores tradicionales.

---
<img width="566" height="994" alt="image" src="https://github.com/user-attachments/assets/ce4a7f67-283f-4e34-9778-020d570a9756" />

# 1. Desglose de la Petición (Anatomía del Perfilamiento)

## Identificación de Hardware (`chmod=SM-A105M`)

El sitio identifica que el usuario utiliza un:

```text
Samsung Galaxy A10
```

Esto permite correlacionar vulnerabilidades específicas del hardware, firmware o procesador.

---

## Versión del Sistema (`chp=Android&chpv=9.0.0`)

La telemetría reporta que el dispositivo utiliza:

```text
Android 9 (Pie)
```

Desde una perspectiva de seguridad, esta versión presenta mayor exposición debido a la ausencia de parches recientes.

---

## Estado del Dispositivo (`atv=80.1`)

Este parámetro representa el porcentaje de batería del dispositivo:

```text
80.1%
```

El nivel de batería es utilizado frecuentemente en técnicas avanzadas de *fingerprinting* para diferenciar dispositivos similares.

---

## Contexto de Navegación (`cbtitle`, `cbpage`, `cbref`)

Estos parámetros permiten rastrear:

- Título de la página visitada
- URL exacta
- Sitio de procedencia (`google.com`)

Esto posibilita el mapeo del comportamiento de navegación del usuario.

---

# Tabla de Parámetros Capturados

| Parámetro | Valor Capturado | Significado Técnico | Implicación de Seguridad |
|---|---|---|---|
| `chmod` | `SM-A105M` | Modelo del dispositivo | Identificación de vulnerabilidades específicas |
| `chpv` | `9.0.0` | Versión de Android | Exposición por ausencia de parches de seguridad |
| `cbWidth/Height` | `411 x 734` | Resolución de pantalla | Creación de huella digital única |
| `cbref` | `google.com` | Referrer (Referencia) | Mapeo de hábitos de búsqueda |

---

# Interpretación Técnica

Como se observa en la tabla, el proceso de exfiltración de metadatos no se limita únicamente a cookies de sesión.

La plataforma intercepta activamente atributos del entorno de ejecución del dispositivo Android, incluyendo:

```text
Modelo: SM-A105M
Versión: Android 9.0.0
```

Esta técnica, conocida como:

```text
Device Fingerprinting
```

Permite a los operadores detrás de:

```text
adexchangerapid.com
```

Perfilar al usuario con un alto grado de precisión.

Esto facilita potenciales vectores de:

- Ingeniería social
- Rastreo persistente
- Entrega de payloads específicos
- Explotación dirigida a arquitecturas detectadas (`armv81`)

---

# Evidencia Temporal

Se identificó el parámetro:

```text
ts=1778466081616
```

El cual representa una marca temporal (*timestamp*) utilizada para registrar el momento exacto del evento.

Fecha traducida:

```text
Domingo, 10 de mayo de 2026, 22:15:15 UTC-4
```

Esto constituye evidencia temporal verificable de la actividad observada.

---

# Fingerprinting Profundo

El parámetro:

```text
ufp
```

Contiene información relacionada con:

- Arquitectura del procesador (`armv81`)
- Motor del navegador
- Capacidades internas del dispositivo

Esto corresponde a técnicas de:

```text
Deep Device Fingerprinting
```

---

# Reproducción de Contenido en Vivo

Posteriormente se procedió a la reproducción de un partido en vivo desde la misma plataforma.

<img width="886" height="86" alt="image" src="https://github.com/user-attachments/assets/995e1ad4-9901-4bc1-af3f-d1a6fb1eaa9e" />

---

# Redacción Técnica

Se identificó el uso del protocolo:

```text
HLS (HTTP Live Streaming)
```

Para la entrega del contenido multimedia.

Durante el análisis se observó la transferencia de segmentos de video:

```text
.ts
```

Desde servidores externos pertenecientes al dominio:

```text
envioslatam.org
```

Lo que confirma la utilización de una infraestructura CDN externa al dominio principal.

---

# Infraestructura Detectada

Se determinó que el host real utilizado para servir el contenido multimedia no corresponde a:

```text
futbol-libre.su
```

Sino al servidor:

```text
chrz.envioslatam.org
```

Con dirección IP:

```text
93.123.109.11
```

<img width="886" height="363" alt="image" src="https://github.com/user-attachments/assets/b6580f29-9092-4bcc-a10d-92def7a2a8d2" />

<br><br>

<img width="558" height="175" alt="image" src="https://github.com/user-attachments/assets/28a945a9-b3a5-4e2b-8bcc-020b9de93129" />

# 1. Desglose Técnico Forense (Análisis de la Petición)

La URL analizada contiene múltiples indicadores relacionados con rastreo, distribución de contenido y control de acceso.

---

# Identificación del Stream

```text
/fanatiz5/tracks-v1a1/mono.m3u8
```

El nombre del recurso sugiere el acceso a una pista de video tipo:

```text
mono
```

Posiblemente asociada a:

- Una única resolución
- Un bitrate específico
- Una variante simplificada del stream HLS

---

## Evidencia de Re-Streaming

El identificador:

```text
fanatiz5
```

Sugiere que la plataforma analizada realiza una retransmisión (*re-streaming*) de contenido perteneciente a servicios legítimos como:

```text
Fanatiz
```

Esto constituye un indicio técnico de vulneración de propiedad intelectual mediante redistribución no autorizada de señales multimedia.

---

# Exposición de la IP Pública

## Parámetro Detectado

```text
ip=181.115.171.86
```

Se identificó la inclusión directa de la dirección IP pública del usuario dentro de la URL del stream.

---

## Implicaciones

Esta práctica permite al servidor de distribución:

- Identificar geográficamente al usuario
- Asociar sesiones de reproducción
- Correlacionar actividad de navegación
- Detectar proveedor de internet (ISP)

Todo ello sin necesidad de mecanismos tradicionales de rastreo como cookies.

---

# Token de Sesión

## Parámetro Detectado

```text
token=97ae9c...
```

El hash corresponde a un mecanismo de autenticación temporal utilizado para proteger el acceso al contenido multimedia.

---

## Función Técnica

El token permite:

- Evitar hotlinking
- Controlar acceso al stream
- Validar sesiones activas
- Limitar reproducción externa

---

## Observación Importante

El token posee una validez efímera vinculada a la sesión activa del usuario.

Por tanto:

- El enlace no es permanente
- El token expira tras un período corto (TTL)
- La URL puede dejar de funcionar posteriormente

---

# Origen Cruzado (Cross-Site)

## Cabecera Detectada

```text
Sec-Fetch-Site: cross-site
```

El navegador confirma que el contenido multimedia proviene de un dominio distinto al sitio visualizado por el usuario.

---

# Relación Entre Dominios

| Rol | Dominio |
|---|---|
| Referer | `latamvidz1.com` |
| Content Provider | `chrz.envivoslatam.org` |

---

## Interpretación Técnica

La fragmentación de dominios constituye una táctica frecuente de evasión utilizada para:

- Distribuir responsabilidades
- Dificultar investigaciones
- Separar infraestructura de streaming
- Ocultar el origen real del contenido

---

# Redacción Técnica

Se identificó la fase de entrega de contenido multimedia mediante el protocolo:

```text
HLS (HTTP Live Streaming)
```

La solicitud del manifiesto:

```text
.m3u8
```

Reveló una vulnerabilidad de privacidad significativa: la inclusión de la dirección IP pública del dispositivo dentro de los parámetros de consulta.

---

## Impacto de Privacidad

La inclusión del parámetro:

```text
ip=181.115.171.86
```

Facilita el perfilamiento geográfico del usuario por parte de servidores de terceros sin requerir consentimiento explícito.

Esto permite correlacionar:

- Actividad de navegación
- Sesiones multimedia
- Identidad de red
- Ubicación aproximada

---
<img width="886" height="21" alt="image" src="https://github.com/user-attachments/assets/562e0133-1de9-4990-8754-29db5d17d282" />

<br><br>

<img width="886" height="391" alt="image" src="https://github.com/user-attachments/assets/0710a697-079c-4f97-851e-28e74b4274aa" />


# Análisis de Segmentos MPEG-TS

El análisis de los segmentos de transporte:

```text
.ts
```

Reveló una estructura de distribución basada en marcas de tiempo granulares con precisión a nivel de segundos.

---

# Validación Persistente de Sesión

Se confirmó que el acceso a la carga útil multimedia depende de la validación continua de un token de seguridad asociado a la infraestructura:

```text
chrz.envivoslatam.org
```

Esto vincula:

- Sesión del navegador
- Token activo
- Infraestructura CDN
- Flujo multimedia

---

# Volumen de Tráfico

El flujo de segmentos MPEG-TS representa el mayor volumen de tráfico capturado durante el análisis.

Este comportamiento puede actuar como:

```text
Canal de cobertura
```

Ocultando simultáneamente actividad secundaria de:

- Telemetría
- Rastreo
- Recolección de datos
- Comunicación con terceros

---

# El "Costo de lo Gratuito"

El análisis de los segmentos `.ts` permite estimar el consumo de ancho de banda asociado al servicio.

Ejemplo:

| Duración del Segmento | Tamaño |
|---|---|
| 2 segundos | 2.5 MB |

---

## Impacto

Esto implica un consumo elevado de datos móviles o ancho de banda mientras el usuario:

- Visualiza contenido no autorizado
- Expone información personal
- Es sometido a técnicas de rastreo
- Recibe publicidad invasiva

---

# Conclusión Técnica

El entorno analizado presenta un doble impacto para el usuario:

1. Consumo elevado de recursos de red.
2. Exposición persistente de información técnica y de comportamiento.

La combinación de:

- Fingerprinting
- Telemetría
- Tokens persistentes
- Infraestructura distribuida
- Cross-site streaming

Constituye un ecosistema orientado tanto a la monetización agresiva como al perfilamiento avanzado del usuario.

<img width="886" height="15" alt="image" src="https://github.com/user-attachments/assets/84954cd3-2ec5-4870-82a3-b8727ebc186f" />

<br><br>

<img width="886" height="485" alt="image" src="https://github.com/user-attachments/assets/6de0b9a1-b59a-470f-882a-3fbfef32b4ed" />

# Análisis Técnico de la Evidencia 

Para el análisis forense de la evidencia capturada, se realizó la disección de los parámetros y cabeceras involucradas en la redirección hacia plataformas de apuestas y servicios de rastreo.

---

# Identificación de Afiliado (`btag`)

## Parámetro Detectado

```text
btag=78ccfefe...
```

Este parámetro corresponde a un identificador único de afiliación entre el sitio de streaming y la plataforma de apuestas.

---

## Función Técnica

El identificador permite:

- Asociar conversiones publicitarias
- Registrar tráfico referido
- Generar comisiones automáticas
- Rastrear campañas activas

---

## Interpretación

Cada vez que un usuario es redirigido hacia la plataforma de apuestas, el sitio de streaming puede recibir una comisión económica.

Esto constituye evidencia técnica de una relación de monetización basada en redirecciones forzadas.

---

# Origen del Tráfico (`utm_source=ByAdsDSP`)

## Parámetro Detectado

```text
utm_source=ByAdsDSP
```

La cadena indica el uso de una:

```text
DSP (Demand Side Platform)
```

Denominada:

```text
ByAdsDSP
```

---

## Implicaciones Técnicas

Esto evidencia que la publicidad:

- No es aleatoria
- Está automatizada
- Utiliza segmentación geográfica
- Opera mediante infraestructura publicitaria profesional

---

## Segmentación

La plataforma parece adaptar la distribución publicitaria según:

- Región
- Dirección IP
- Tipo de dispositivo
- Comportamiento de navegación

---

# Persistencia de Sesión (`zillapage_session`)

## Cookie Detectada

```text
zillapage_session
```

La respuesta del servidor establece una cookie persistente vinculada a la sesión del navegador.

---

## Implicaciones

Esto permite:

- Mantener sesiones activas
- Asociar actividad al dispositivo
- Construir perfiles persistentes
- Correlacionar navegación futura

Incluso si el usuario cierra la pestaña o abandona temporalmente el sitio.

---

# Seguridad y Preparación de Sesión (`XSRF-TOKEN`)

## Token Detectado

```text
XSRF-TOKEN
```

Corresponde a un mecanismo de protección contra:

```text
Cross-Site Request Forgery (CSRF)
```

---

## Interpretación Técnica

La presencia de este token sugiere que la plataforma trata la conexión como una sesión legítima preparada para:

- Formularios
- Autenticación
- Acciones persistentes
- Potenciales transacciones financieras

---

# Punto Crítico: `Sec-Fetch-Dest: document`

## Cabecera Detectada

```text
Sec-Fetch-Dest: document
```

---

## Significado

Esto confirma que el navegador intentó cargar:

```text
Un documento completo
```

Y no simplemente:

- Un banner
- Un iframe pequeño
- Un recurso estático

---

## Manifestación en Android

En dispositivos Android esto suele provocar:

- Apertura automática de pestañas
- Ventanas emergentes (*pop-ups*)
- Redirecciones invasivas
- Interrupción de la navegación

---

# Redacción Técnica

Se identificó la ejecución de una petición `GET` hacia el dominio:

```text
doradobet.com
```

La solicitud transportaba múltiples parámetros de seguimiento asociados a campañas publicitarias (`UTM`).

---

## Infraestructura Publicitaria

El análisis de la cadena de consulta reveló el uso de la plataforma:

```text
ByAdsDSP
```

Como vector de distribución de tráfico y segmentación comercial.

---

## Persistencia de Sesión

La respuesta del servidor:

```text
HTTP 200 OK
```

Resultó en la inyección de cookies persistentes:

```text
zillapage_session
```

Lo que constituye un intento de establecer una relación de sesión continua con el dispositivo Android del usuario.

---

# Observación Técnica Adicional

La persistencia simultánea de:

- `zillapage_session`
- `XSRF-TOKEN`

Sugiere que la plataforma no solo persigue objetivos de marketing, sino también la preparación del entorno del navegador para operaciones persistentes asociadas a plataformas financieras o de apuestas.

Esto representa un potencial indicador de:

- Riesgo de fraude publicitario
- Perfilamiento avanzado
- Persistencia de sesión no consentida

---
<img width="886" height="13" alt="image" src="https://github.com/user-attachments/assets/dcb40785-e3d9-4e76-89b9-1197b2727305" />

<br><br>

<img width="886" height="403" alt="image" src="https://github.com/user-attachments/assets/ced67497-1fd4-4ac9-a06f-1c2ab4659fb2" />

# Análisis Forense del Servicio Microsoft Clarity

---

# 1. Identificación del Script

Se detectó la descarga del recurso:

```text
/tag/mnbfnxjzfx
```

El archivo corresponde al servicio de monitorización:

```text
Microsoft Clarity
```

---

## Función

El script actúa como un agente de monitoreo que se inyecta en el navegador Android para registrar interacción del usuario.

---

# 2. Decodificación del Identificador `CLID`

## Cookie Detectada

```text
CLID=8da72773...20260511.20270511
```

---

## Interpretación

Los valores finales representan:

| Valor | Significado |
|---|---|
| `20260511` | Fecha de creación |
| `20270511` | Fecha de expiración |

---

## Persistencia

Esto confirma una persistencia aproximada de:

```text
365 días
```

Permitiendo rastreo de largo plazo.

---

# 3. Acceso al Almacenamiento del Navegador

## Cabecera Detectada

```text
Sec-Fetch-Storage-Access: active
```

---

## Implicaciones Técnicas

El valor:

```text
active
```

Indica que el script posee permisos para:

- Leer almacenamiento local
- Escribir identificadores persistentes
- Acceder a cookies
- Mantener correlación de usuario

---

# Punto Crítico: Cross-Site Tracking

## Observación

El encabezado `Referer` apunta al dominio:

```text
doradobet.com
```

---

## Implicación

Esto permite correlacionar:

- Sitio de origen
- Plataforma de apuestas
- Comportamiento de usuario
- Flujo de navegación

---

## Técnica Detectada

Este comportamiento corresponde a:

```text
Cross-Site Tracking
```

---

# Redacción Técnica

Se detectó la ejecución del servicio de monitorización:

```text
Microsoft Clarity
(host: www.clarity.ms)
```

Activado posteriormente a la redirección hacia:

```text
doradobet.com
```

---

## Persistencia del Identificador

El análisis de la cabecera `Cookie` reveló la asignación de un identificador persistente:

```text
CLID
```

Con una validez aproximada de:

```text
365 días
```

Representada por el identificador temporal:

```text
1778468287917
```

---

# Impacto en Privacidad

La implementación observada permite potencialmente:

- Reconstrucción visual de sesiones
- Captura de desplazamientos (*scroll*)
- Registro de eventos táctiles
- Monitoreo de interacción

Todo ello sin mediar consentimiento informado del usuario dentro del ecosistema móvil Android.

# Conclusiones

El análisis realizado evidencia que múltiples plataformas de streaming no oficiales implementan mecanismos avanzados de rastreo y perfilamiento sobre dispositivos Android.

La captura de tráfico reveló:

- Uso extensivo de técnicas de fingerprinting
- Exfiltración de metadatos del dispositivo
- Integración con redes de publicidad automatizada
- Persistencia de identificadores de sesión
- Redirecciones hacia plataformas de apuestas
- Uso de infraestructura CDN distribuida

Asimismo, se observó la utilización de servicios de terceros para la monitorización activa del comportamiento del usuario, incluyendo herramientas de analítica avanzada y telemetría persistente.

Los hallazgos demuestran que este tipo de plataformas no solo representan riesgos relacionados con contenido no autorizado, sino también amenazas significativas para la privacidad, seguridad y trazabilidad digital del usuario final.
