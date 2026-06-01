# Análisis técnico de la infraestructura de telemetría y publicidad observada en Fútbol Libre

## Resumen ejecutivo

Durante una sesión experimental controlada se analizó el comportamiento de Fútbol Libre mediante interceptación de tráfico HTTPS, revisión de payloads transmitidos por el navegador y análisis estático del código JavaScript descargado durante la navegación.

La investigación permitió identificar la ejecución automática de un script de terceros denominado `aclib.js`, responsable de recopilar información relacionada con la navegación del usuario y transmitirla hacia infraestructura externa asociada al dominio `usrpubtrk.com`.

Asimismo, se observaron interacciones con componentes vinculados a redes publicitarias externas, incluyendo configuraciones de tipo `tabover` y redirecciones asociadas a campañas publicitarias.

---

# Metodología

Las pruebas fueron realizadas en un entorno controlado utilizando:

- Firefox
- Kali Linux
- mitmproxy
- Visual Studio Code
- Webcrack
- VirusTotal

El procedimiento consistió en capturar el tráfico generado al acceder a Fútbol Libre, identificar los recursos JavaScript descargados por el navegador y extraer aquellos relacionados con las comunicaciones observadas hacia dominios de terceros.

Posteriormente, el archivo `aclib.js` fue extraído desde la captura de tráfico y sometido a un proceso de desofuscación mediante Webcrack, con el objetivo de analizar su funcionamiento interno y correlacionar el comportamiento observado en red con el código efectivamente ejecutado por el navegador.

## Desofuscación del código JavaScript

Durante el análisis se observó que `aclib.js` utilizaba técnicas de ofuscación destinadas a dificultar la lectura y comprensión del código fuente.

Para facilitar su análisis se empleó la herramienta de código abierto **Webcrack**, especializada en la desofuscación y reconstrucción de código JavaScript minimizado u ofuscado.

La herramienta fue ejecutada sobre el archivo extraído mediante el siguiente comando:

```bash
npx webcrack aclib.js > aclib_deobf.js
```

Como resultado se obtuvo una versión desofuscada del script (`aclib_deobf.js`), permitiendo identificar funciones relacionadas con:

- recopilación de telemetría;
- generación de identificadores de sesión;
- fingerprinting del navegador;
- apertura de ventanas publicitarias;
- transmisión de datos mediante `navigator.sendBeacon()`.

La revisión posterior del código se realizó utilizando Visual Studio Code, facilitando la localización de cadenas, funciones y referencias a dominios externos observados durante la captura de tráfico.
![[img/webcrack_output.png]]

*Figura 0. Proceso de desofuscación de `aclib.js` mediante Webcrack.*

---

# Hallazgo 1: Descarga y análisis de aclib.js

Durante la carga inicial del sitio se observó la descarga automática del archivo:

```text
https://acscdn.com/script/aclib.js
```

Este recurso fue descargado y ejecutado por el navegador sin interacción adicional por parte del usuario.

Con el objetivo de determinar su comportamiento, el archivo fue extraído desde la captura de tráfico generada por mitmproxy y posteriormente sometido a un proceso de desofuscación utilizando la herramienta Webcrack.

La desofuscación permitió recuperar una versión legible del código JavaScript, facilitando la identificación de funciones relacionadas con la recopilación de telemetría, generación de identificadores de sesión, fingerprinting del navegador y transmisión de datos hacia dominios externos.

![[img/aclib_download.png]]

*Figura 1. Descarga automática del archivo `aclib.js` observada durante la carga inicial del sitio.*

---

# Hallazgo 2: Comunicación automática con usrpubtrk.com

Durante la navegación se identificaron solicitudes HTTP POST generadas automáticamente hacia:

```text
https://usrpubtrk.com/ut/hb.php
```

Ejemplo observado:

```text
POST https://usrpubtrk.com/ut/hb.php?cb=0.01109088826662663&v=1
```

La comunicación fue iniciada por el script sin necesidad de interacción explícita del usuario.

![[img/mitmproxy_usrpubtrk.png]]

_Figura 2. Solicitud POST observada hacia `usrpubtrk.com` durante la carga de la página._

---

# Hallazgo 3: Mecanismo de transmisión identificado

El análisis del código desofuscado permitió localizar la construcción de la URL de destino y el uso de la API `navigator.sendBeacon()` para transmitir información hacia `usrpubtrk.com`.

La URL identificada en el código coincide exactamente con la observada durante la captura de tráfico.

![[img/aclib_sendbeacon.png]]

*Figura 3. Fragmento de código desofuscado donde se identifica la construcción de la URL utilizada para transmitir información hacia `usrpubtrk.com`.*

### Construcción de la URL de destino

```javascript
function _0x47bd72() {
  var _0xbd6a65 = "https://usrpubtrk.com/ut/hb.php?cb=" + Math.random();
  _0xbd6a65 += "&v=1";
  return _0xbd6a65;
}
```

La función anterior construye dinámicamente la URL utilizada para enviar información de telemetría. La dirección generada coincide con la observada durante la captura de tráfico mediante mitmproxy.

![[img/sendbeacon_code.png]]

*Figura 4. Uso de la API `navigator.sendBeacon()` para transmitir el payload generado por el script.*

### Envío del payload

```javascript
function _0x12fca0(_0x19ac61, _0x448486) {
  let _0x1af5f6 = new Blob([_0x448486], {
    type: "text/plain; charset=UTF-8"
  });

  navigator.sendBeacon(_0x19ac61, _0x1af5f6);
}
```

Posteriormente, el script serializa el objeto de telemetría y lo transmite utilizando `navigator.sendBeacon()`, una API diseñada para enviar datos al servidor de forma asíncrona sin interrumpir la navegación del usuario.

La presencia de estas funciones dentro del código desofuscado proporciona una explicación directa del tráfico observado hacia `usrpubtrk.com`.

---

# Hallazgo 4: Telemetría recopilada

El script genera un objeto de telemetría que incluye información relacionada con:

- Identificadores de sesión.
    
- Duración de la visita.
    
- Actividad del usuario dentro de la página.
    
- Características del navegador y del dispositivo.
    
- Metadatos de la página visitada.
    
- Información estructural del documento.
    

La estructura identificada en el código coincide con el contenido del payload capturado durante la sesión experimental.

![[img/payload_usrpubtrk.png]]

_Figura 5. Payload JSON capturado durante la transmisión de datos._
_

---

# Hallazgo 5: Identificadores y fingerprinting

El análisis del tráfico de red y del código desofuscado permitió identificar un objeto de telemetría utilizado por `aclib.js` para recopilar información relacionada con la sesión de navegación.

Entre los datos observados se encuentran identificadores de sesión, duración de la visita, actividad del usuario dentro de la página, características del navegador, dimensiones de la ventana, metadatos de la página visitada e información estructural del documento.

La estructura identificada dentro del código coincide con el contenido del payload transmitido posteriormente hacia `usrpubtrk.com`, proporcionando una correlación directa entre la información recopilada y los datos efectivamente enviados por el navegador.

![[img/payload_usrpubtrk.png]]

_Figura 5. Payload JSON capturado durante la transmisión de datos hacia `usrpubtrk.com`._

### Extracto del payload capturado

```json
{
  "totalClicks": 0,
  "sessionLength": 0,
  "isScrolled": 1,
  "isMouseMoved": 1,
  "pagePercentageSeen": 26,
  "sessionId": "8712f808efcf114af678e40d8943c6c8",
  "pUrl": "https://futbol-libre.su/",
  "pTitle": "Fútbol Libre - Ver Partidos de Fútbol...",
  "pHasIframes": 1,
  "ufp": "Win32/Mozilla/Netscape/true/false/1534x701240es-ESunknown424 bits"
}
```

El extracto anterior muestra algunos de los campos observados durante la captura. Entre ellos destacan el identificador de sesión, métricas de interacción del usuario, información sobre la página visitada y el valor utilizado como fingerprint del navegador.

La comparación entre el objeto definido en el código y el payload transmitido evidencia que el script recopila la información localmente, la estructura en formato JSON y posteriormente la envía al endpoint identificado durante la investigación.

---

# Hallazgo 6: Infraestructura publicitaria asociada

Además de la comunicación con `usrpubtrk.com`, se observaron interacciones con dominios asociados a publicidad, entre ellos:

- `adexchangerapid.com`
- `byads.co`

Las respuestas obtenidas incluían configuraciones de tipo `tabover`, mientras que el código analizado contenía múltiples llamadas a `window.open()`, compatibles con mecanismos de apertura de pestañas o ventanas publicitarias.

### Respuesta observada

```json
{
  "url": "https://v.byads.co/...",
  "iurl": "https://adexchangerapid.com/script/i.php?...",
  "delay": 0,
  "type": "tabover",
  "preventClick": false
}
```

El campo `type` indica una acción de tipo `tabover`, mientras que los campos `url` e `iurl` hacen referencia a infraestructura publicitaria asociada a `byads.co` y `adexchangerapid.com`. La presencia de esta configuración coincide con las llamadas a `window.open()` identificadas posteriormente dentro del código desofuscado de `aclib.js`.

---
## Origen de la investigación

La investigación se inició tras identificar comunicaciones automáticas hacia dominios de terceros durante la navegación en Fútbol Libre.

Una revisión preliminar de la reputación de estos dominios mediante VirusTotal mostró clasificaciones y detecciones asociadas a actividad potencialmente maliciosa o publicitaria agresiva, lo que motivó un análisis más detallado de la infraestructura involucrada.

A partir de este hallazgo se procedió a capturar el tráfico generado por el sitio, identificar los recursos JavaScript descargados por el navegador y analizar el código responsable de las comunicaciones observadas.

# Reputación de los dominios observados

La revisión mediante VirusTotal mostró que los dominios identificados durante la investigación presentan clasificaciones y asociaciones reportadas por distintos motores de seguridad.

Aunque estas clasificaciones no constituyen por sí mismas una prueba definitiva de comportamiento malicioso, resultan relevantes porque coinciden con los dominios observados durante la captura de tráfico y el análisis del código.

![[img/virustotal_usrpubtrk.png]]

_Figura 10. Resultado de VirusTotal para `usrpubtrk.com`._

![[img/virustotal_adexchangerapid.png]]

_Figura 11. Resultado de VirusTotal para `adexchangerapid.com`._

---

# Flujo observado

La evidencia recopilada permitió reconstruir el siguiente flujo:

```text
Usuario
   │
   ▼
futbol-libre.su
   │
   ▼
aclib.js
   │
   ├── usrpubtrk.com
   │      (telemetría)
   │
   └── adexchangerapid.com
           │
           ▼
         byads.co
```

---

# Conclusiones

La evidencia obtenida demuestra que Fútbol Libre carga y ejecuta automáticamente el script `aclib.js`, encargado de recopilar información relacionada con la navegación del usuario y transmitirla mediante `navigator.sendBeacon()` hacia infraestructura externa asociada a `usrpubtrk.com`.

El análisis del código permitió identificar los mecanismos responsables de generar identificadores de sesión, construir un fingerprint del navegador y recopilar métricas de interacción antes de transmitirlas al dominio externo.

Asimismo, se observó interacción con infraestructura publicitaria asociada a `adexchangerapid.com` y `byads.co`, utilizada para la distribución y configuración de mecanismos publicitarios como tabovers y aperturas de ventanas.

Los hallazgos se encuentran respaldados por tres fuentes independientes de evidencia: captura de tráfico, análisis de payloads transmitidos y revisión del código JavaScript desofuscado.





