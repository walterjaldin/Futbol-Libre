# Análisis Forense de Tráfico y Perfilamiento de `bol.1xbet.com`

## Paso 1: Reconocimiento Pasivo e Infraestructura de Red

Para determinar la arquitectura técnica que soporta el subdominio regionalizado bajo estudio, se realizaron consultas DNS directas y un análisis de asignación de red IP desde un entorno controlado.

### Consulta WHOIS


<img width="886" height="70" alt="image" src="https://github.com/user-attachments/assets/8fb3ef71-5606-4140-809c-86cc1c17493a" />



### Resolución DNS

Al interrogar el sistema de nombres de dominio para el host objetivo, el comando siguiente devolvió dos direcciones IPv4:

<img width="520" height="86" alt="image" src="https://github.com/user-attachments/assets/3d031442-73f4-4db7-a779-06aa849dad78" />


### Consulta CNAME

<img width="886" height="303" alt="image" src="https://github.com/user-attachments/assets/ac86a905-b3c7-4eca-8532-b1fb9439d1c0" />


### Interpretación Técnica

Los resultados indican que:

- `bol.1xbet.com` no expone directamente la infraestructura de origen.
- El dominio se encuentra detrás de la red CDN y Proxy Reverso de Cloudflare.
- Las IPs observadas (`172.64.146.192` y `104.18.41.64`) corresponden a nodos perimetrales (*Edge Servers*).
- La infraestructura real permanece oculta detrás de la capa de protección de Cloudflare.

---

## Paso 2: Intercepción de Tráfico Dinámico (Análisis en Caliente)
<img width="886" height="36" alt="image" src="https://github.com/user-attachments/assets/9f3c1d10-2a0f-4867-afd5-e0ecd6efcc39" />
<br> <br>
<img width="886" height="857" alt="image" src="https://github.com/user-attachments/assets/e180c406-c37b-4a8e-b3d0-d11905b35049" />

### Solicitud HTTP Interceptada

```http
POST /fatman-api/a6f69e4388362d761ee5bb073edb23ae3d9341fb/event.json HTTP/2
Host: bol.1xbet.com
Cookie: platform_type=mobile;
        auid=wju0020BPfMal27qE7kbAg==;
        cf_clearance=...;
        fatman_uuid=d47871c4-b7fl-lec9-8eb8-5ba947c631a4;

Content-Length: 89
Sec-Ch-Ua-Platform: "Android"
Content-Type: application/json
X-Uuid: d47871c4-b7fl-lec9-8eb8-5ba947c631a4
Origin: https://bol.1xbet.com
Referer: https://bol.1xbet.com/es?tag=d_5525992m_1599c_
```

### A. Mecanismo de Comunicación Asíncrona

La interacción observada no corresponde únicamente a la descarga de contenido web.

El uso del método `POST` hacia el endpoint:

```text
/fatman-api/.../event.json
```

evidencia la existencia de un canal de comunicación donde el navegador transmite eventos hacia la infraestructura remota.

### B. Recolección de Metadatos del Entorno

La carga JSON observada incluye variables relacionadas con el entorno gráfico del cliente:

```json
{
  "sw": 411,
  "sh": 734
}
```

Estas variables representan:

| Campo | Descripción |
|---------|-------------|
| sw | Ancho lógico de pantalla |
| sh | Alto lógico de pantalla |

Su utilización puede servir para adaptar la interfaz, medir compatibilidad o caracterizar el entorno del dispositivo.

### C. Persistencia Mediante Identificadores

Se observó la utilización del identificador:

```text
fatman_uuid
```

Este valor funciona como identificador persistente asociado a la sesión del navegador y permite correlacionar eventos sucesivos enviados por el cliente.

---

## Matriz de Clasificación de Riesgos

| Parámetro Tecnológico | Indicador Capturado | Propósito Técnico | Implicación de Seguridad / Privacidad |
|----------------------|--------------------|------------------|---------------------------------------|
| Host Regionalizado | `bol.1xbet.com` | Segmentación geográfica de tráfico | Infraestructura orientada a usuarios de Bolivia |
| Endpoint Crítico | `/fatman-api/.../event.json` | Recolección de telemetría | Monitorización de eventos del cliente |
| Variables de Pantalla | `sw: 411` / `sh: 734` | Caracterización del entorno gráfico | Potencial contribución a mecanismos de identificación |
| Token de Sesión | `fatman_uuid` | Correlación de eventos y sesiones | Persistencia de identificación entre solicitudes |

---

## Paso 3: Auditoría de Reputación y Análisis de Amenazas (Threat Intelligence)

Se utilizó **VirusTotal** y **Cisco Talos Intelligence** para evaluar la reputación del dominio analizado.

### VirusTotal

<img width="886" height="135" alt="image" src="https://github.com/user-attachments/assets/5bef5a2f-2d13-497e-884f-ba6303069567" />
<br> <br>
<img width="817" height="273" alt="image" src="https://github.com/user-attachments/assets/10c8ea5a-982a-4595-8db0-bf95d5471b0b" />


#### Enfoque de investigación

Esto demuestra que los scripts inyectados en la página de streaming pirata (`futbollibretv.su`) no abren anuncios aleatorios, sino que conducen de forma dirigida a una infraestructura comercial de apuestas que evade regulaciones locales a través de proxies distribuidos.

#### Enfoque de investigación

El host detecta que estás inspeccionando o que el entorno no cumple con los requisitos limpios de un usuario común, y activa una regla de exclusión corporativa (`gw-blk`, cuyo valor Base64 descifra una regla técnica interna). Te redirige a un endpoint de bloqueo (`/block`) para denegar el acceso a la plataforma de apuestas real.

### Cisco Talos Intelligence

<img width="886" height="240" alt="image" src="https://github.com/user-attachments/assets/5312293a-e9ef-42d4-8b4f-e1a0b96413b4" />

Nos demuestra que no tiene mala reputacion

### intercepcion de trafico con burp   

A través de la intercepción de tráfico en un entorno móvil controlado se identificó la ejecución secuencial de un bucle activo de telemetría (*Heartbeat*) gestionado por el lado del cliente. Tras superar los desafíos analíticos de la infraestructura perimetral mediante el endpoint `/cdn-cgi/challenge-platform/`, el navegador inicia la invocación constante del servicio crítico `/fatman-api/.../event.json` utilizando peticiones asíncronas de tipo `POST`. La presencia de múltiples solicitudes consecutivas en un intervalo menor a dos segundos evidencia un mecanismo persistente de monitorización y recopilación de eventos.

<img width="886" height="125" alt="image" src="https://github.com/user-attachments/assets/28b2c52d-afae-447f-987e-baae5203329d" />


El análisis del contenido de la solicitud con ID **950** identificó un flujo abrasivo de recolección de datos técnicos que asciende a una carga útil de **16,733 bytes** transmitidos mediante el método `POST`. Este volumen de datos se vincula directamente con la ejecución de algoritmos de perfilamiento avanzado del entorno del cliente (*Device Fingerprinting*). Como consecuencia de esta transmisión, el servidor Cloudflare otorgó el token `cf_clearance` bajo atributos `SameSite=None` y `Secure`, estableciendo un periodo de persistencia de **365 días** en el almacenamiento local del dispositivo móvil para asegurar el seguimiento continuo a largo plazo.

<img width="886" height="781" alt="image" src="https://github.com/user-attachments/assets/a2c2643d-3a8d-400e-be02-1d092aa5e5d5" />

<br> <br>

<img width="886" height="449" alt="image" src="https://github.com/user-attachments/assets/6b4c1161-33e3-481c-9e7c-69c14b17c5ce" />


La inspección de la carga útil en la petición **960** hacia el endpoint `/fatman-api/.../ab.json` confirmó la transmisión estructurada de metadatos bajo el estándar JSON. El cuerpo de la solicitud transporta la variable serializada:

<img width="886" height="860" alt="image" src="https://github.com/user-attachments/assets/acb794d8-87c0-4850-b28e-0d8125375ad2" />

<br> <br>

<img width="886" height="499" alt="image" src="https://github.com/user-attachments/assets/744d7a9b-b20c-4b68-96b7-3311ab6476fc" />


```json
{"w":114,"state":[]}
```

la cual opera de forma síncrona con el identificador `fatman_uuid` inyectado previamente en las cabeceras de estado. El código de respuesta HTTP **200 OK** provisto por el host receptor ratifica el procesamiento exitoso de los parámetros del cliente, validando la persistencia y vinculación de la sesión analítica en segundo plano sin mediar interacción del usuario.

---

# Paso 4: EVALUACIÓN DE INVASIVIDAD Y RIESGO DE BOL.1XBET.COM

## 1. Delimitación del Riesgo: ¿Virus o Perfilamiento?

Tras el análisis forense de tráfico dinámico y la inspección de las cargas útiles (*payloads*) interceptadas, se determina que el host `bol.1xbet.com` no inyecta software malicioso binario (virus, troyanos o ransomware) en el dispositivo del usuario. Las respuestas del servidor bajo códigos HTTP **200 OK** y **204 No Content** con cuerpos JSON vacíos o de tamaño mínimo:

```json
{"w":114,"state":[]}
```

confirman que la plataforma no realiza descargas de archivos ejecutables orientados a corromper el sistema operativo Android.

Los motores de seguridad global (**BitDefender**, **Sophos** y **Dr.Web**) respaldan este hallazgo al clasificar unánimemente al host bajo la categoría regulada de *gambling* (apuestas) y no como una amenaza de código malicioso.

---

## 2. El Factor de Invasividad: Desmitificando el "Comportamiento Normal"

Es un argumento común en el desarrollo web afirmar que la recolección de metadatos básicos (como el modelo del dispositivo o la resolución de pantalla) es una práctica estándar para optimizar la interfaz de usuario. Sin embargo, la evidencia recolectada demuestra que las operaciones de `bol.1xbet.com` exceden significativamente los criterios de optimización técnica legítima, transformándose en un entorno altamente invasivo debido a tres factores concurrentes:

### • Persistencia Coercitiva Temporal

A diferencia de un sitio web convencional cuyas cookies de sesión expiran al cerrar la pestaña, la infraestructura analizada (asociada al proxy reverso de Cloudflare) inyecta de forma automatizada tokens como `cf_clearance` con una vigencia estricta de **365 días** (1 año en el futuro).

### • Configuración de Rastreo Cruzado (Cross-Site Tracking)

La cookie de persistencia anual es distribuida bajo las directivas `SameSite=None` y `Secure`. Esta configuración técnica específica no tiene como objetivo proteger la sesión del usuario, sino garantizar que la identidad digital del dispositivo móvil pueda ser leída y rastreada de forma transparente mientras el sujeto navega en plataformas de terceros (como el sitio de origen `futbollibretv.su`).

### • Frecuencia de Exfiltración en Ráfaga (Heartbeat)

La captura cronológica demostró el procesamiento de múltiples peticiones `POST` consecutivas dirigidas al endpoint `/fatman-api/...` en intervalos inferiores a dos segundos. Esto confirma que el software del lado del cliente ejecuta un bucle activo de monitorización en segundo plano, reportando constantemente variables contextuales del entorno del usuario de manera oculta.

---

## 3. Conclusión de Peligrosidad para el Usuario Normal

### • Evaluación de la Integridad del Sistema

Se concluye de forma categórica que la interacción con el host regionalizado `bol.1xbet.com` no induce la descarga ni la ejecución de software malicioso binario convencional (troyanos, virus o ransomware) en el dispositivo móvil Android del usuario.

Los códigos de estado analizados (`HTTP/2 200 OK` y `204 No Content`) junto con las cargas útiles crudas recolectadas (que arrojaron un volumen de respuesta mínimo de hasta 2 bytes como `{"w":114,"state":[]}`) demuestran que el servidor no inyecta ejecutables, sino que opera exclusivamente como un nodo pasivo de ingesta de datos y telemetría en segundo plano.

### • Invasividad y Limitación de la Reacción del Usuario

Se determina que la acción común de cerrar de forma inmediata la ventana emergente (*pop-up*) o pestaña de navegación redirigida es completamente ineficaz como mecanismo de defensa proactivo.

Debido a que el intercambio de cabeceras de control y las peticiones asíncronas de tipo `POST` (como la solicitud inicial `/cdn-cgi/challenge-platform/` de **16,733 bytes**) toman un rango de ejecución de milisegundos, el perfilamiento de hardware y la exfiltración de metadatos del cliente ocurren de manera exitosa antes de que el usuario pueda ejercer una acción consciente de cancelación de la interfaz web.

### • Mecanismos de Persistencia Temporal y Rastreo Cruzado

Se demostró de manera empírica que el host implementa técnicas de persistencia abrasiva que vulneran severamente el anonimato digital del usuario.

La inyección automatizada de la cookie `cf_clearance` mediante la directiva `Set-Cookie` establece un periodo de vida útil (*Time-To-Live*) extremo de **365 días** (1 año de vigencia) en el almacenamiento local del navegador, operando bajo los atributos de seguridad alterados `SameSite=None` y `Secure`.

Esta configuración técnica específica garantiza de forma lesiva que la huella digital del hardware móvil (`fatman_uuid`) permanezca almacenada en el dispositivo y pueda ser leída transversalmente por redes de anuncios de terceros (*Cross-Site Tracking*) mucho tiempo después de haber cerrado la ventana de la casa de apuestas.

### • Determinación de Peligrosidad y Consecuencia Forense

El veredicto de ingeniería de seguridad clasifica el riesgo asociado a `bol.1xbet.com` como un **Peligro de Nivel Medio-Alto** centrado en la **Privacidad y Perfilamiento Automatizado**.

La recolección de variables físicas del entorno de ejecución, tales como:

- Modelo exacto del procesador: `SM-A105M`
- Sistema operativo: `Android 9.0.0`
- Dimensiones lógicas de renderizado:

$$
411 \times 734
$$

excede los propósitos de optimización de interfaz estándar.

Al correlacionar de manera oculta estos datos físicos con un identificador único global, la plataforma anula el derecho a la privacidad informática, transformando el dispositivo móvil del estudiante en un nodo exfiltrador de inteligencia comercial sin el debido consentimiento informado.
