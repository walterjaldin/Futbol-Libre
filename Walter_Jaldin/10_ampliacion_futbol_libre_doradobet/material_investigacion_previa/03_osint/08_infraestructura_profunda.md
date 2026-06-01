# 1.8 — Infraestructura profunda: proveedores, PTR y cadena técnica

**Fecha de análisis:** 13 de mayo de 2026  
**Investigador:** Walter Jaldín  
**Herramientas:** dig (PTR), Shodan InternetDB, curl (headers), whois

---

## Resumen ejecutivo

Esta sub-fase profundiza en la cadena de proveedores de infraestructura del ecosistema futbol-libre.su, confirma las relaciones entre IPs y proveedores mediante registros PTR DNS inversos, e identifica tres nuevos dominios del ecosistema a través de los hostnames reportados por Shodan. El hallazgo más crítico es la confirmación de **17 CVEs en el servidor principal**, incluyendo CVE-2024-6387 (regreSSHion — OpenSSH RCE sin autenticación).

---

## Registros PTR — DNS inverso

El DNS inverso (PTR record) asocia una dirección IP con un nombre de dominio. Es configurado por el propietario de la IP y puede revelar el proveedor o el operador del servidor.

| IP | PTR Record | Proveedor implícito |
|---|---|---|
| **185.254.197.23** | `a1.configma.website.` | configma.website (hosting/panel) |
| **128.0.104.23** | *(sin PTR)* | Virtual Systems LLC (por ASN) |
| **138.226.244.112** | `dedicated.sollutium.com.` | SOLLUTIUM LLC |
| **91.218.49.105** | `dedicated.vsys.host` | Virtual Systems LLC |

### configma.website

- PTR `a1.configma.website` asignado a la IP principal del sitio (185.254.197.23)
- Dominio registrado por el operador del panel de hosting
- DNS forward de configma.website no resuelve (configuración parcial)
- Sugiere que el panel cPanel/WHM de ese servidor está bajo el dominio `configma.website`
- Relación: el operador usa configma.website como nombre de servidor ("a1" = servidor 1)

### sollutium.com

- PTR `dedicated.sollutium.com` en 138.226.244.112 (pelotalibretv.su)
- sollutium.com: registrado ~2013, NameCheap, protegido por Cloudflare
- Stack: PHP/7.4.32, cookie WHMCS (panel de gestión de hosting/VPS)
- Rol: revendedor o sub-proveedor de Virtual Systems LLC (IP ASN es VSYS-UA)
- SOLLUTIUM ofrece servidores dedicados en la infraestructura de Virtual Systems

### server.vivozly.com

- Hostname de Shodan para 128.0.104.23 (latamvidz1.com + futbollibretv.su)
- vivozly.com — dominio no investigado previamente
- El hostname `server.vivozly.com` indica que el servidor está bajo ese nombre técnico
- Puede ser otro sitio de streaming del mismo operador o proveedor alternativo

---

## Cadena completa de proveedores (actualizada)

```
OPERADOR (hassan.azmw@gmail.com / joezm5a@proton.me)
│
├── VIRTUAL SYSTEMS LLC (Kyiv, Ucrania — ASN 30860)
│   ├── IP 185.254.197.23 → futbol-libre.su
│   │   PTR: a1.configma.website
│   │   Stack: nginx + cPanel + Exim 4.99.1 + OpenSSH 8.7 (17 CVEs)
│   │   MySQL 3306 EXPUESTO
│   │
│   ├── IP 128.0.104.23 → latamvidz1.com, futbollibretv.su
│   │   PTR: (sin PTR / server.vivozly.com por hostname Shodan)
│   │   Stack: nginx + WHM + Exim + MariaDB
│   │   MySQL 3306 EXPUESTO
│   │
│   └── IP 91.218.49.105 → la14hd.com (stream backup)
│       PTR: dedicated.vsys.host
│       Stack: Ubuntu + nginx + OpenSSH 8.9p1
│
├── SOLLUTIUM LLC (revendedor, Cloudflare NS)
│   └── IP 138.226.244.112 → pelotalibretv.su (WordPress 6.9.4)
│       PTR: dedicated.sollutium.com
│       Stack: nginx + Apache + WordPress 6.9.4
│
└── TECHOFF SRV LIMITED (HLS server)
    └── IP 195.178.110.11 → envivoslatam.org (HLS .m3u8)
        PTR: (sin PTR / sin hostnames)
        Stack: Ubuntu + nginx + OpenSSH 8.9p1
        Puerto RTMP 1935 activo (Streamer 24.03)
```

---

## Vulnerabilidades críticas — Servidor principal

### CVE-2024-6387: regreSSHion (CRÍTICO)

- **CVSS:** 8.1 (Remote Code Execution sin autenticación)
- **Software afectado:** OpenSSH < 8.8 con glibc (servidor tiene 8.7)
- **IP afectada:** 185.254.197.23 (servidor principal de futbol-libre.su)
- **Descripción:** Race condition en signal handler de `sshd`. Un atacante sin autenticación puede explotar la condición de carrera para ejecutar código arbitrario como root. Vulnerabilidad originalmente reportada en 2006 (CVE-2006-5051), reintroducida en versión moderna.
- **Estado:** ACTIVAMENTE EXPLOTABLE. Puerto 22 abierto según Shodan.
- **Relevancia para el estudio:** Si un actor malicioso compromete el servidor mediante esta vulnerabilidad, puede modificar el HTML servido a todos los usuarios del sitio, inyectando malware adicional en la cadena de distribución.

### CVE-2023-38408: OpenSSH ssh-agent RCE

- **CVSS:** 9.8 (máximo)
- **Software afectado:** OpenSSH (componente ssh-agent)
- **Descripción:** Si el ssh-agent del cliente está en forwarding y se conecta a un servidor comprometido, el servidor puede cargar una librería compartida arbitraria en el proceso del cliente.
- **Condición:** Requiere que el cliente tenga ssh-agent forwarding activo.

### CVE-2023-48795: Terrapin Attack

- **CVSS:** 5.9 — Protocol Downgrade
- **Descripción:** Ataque activo sobre el protocolo SSH durante el handshake. Permite que un MitM degrade extensiones de seguridad del protocolo (ext-info, strict KEX).
- **OpenSSH 8.7 está afectado.**

### MySQL 3306 expuesto — Configuración peligrosa

Dos IPs del ecosistema (185.254.197.23 y 128.0.104.23) tienen el puerto 3306 de MySQL/MariaDB accesible directamente desde Internet sin filtrado aparente. Esto expone:
- La base de datos de latamvidz1.com (tokens de streams, sesiones)
- La base de datos de cPanel (usuarios, configuraciones)
- Ataques de fuerza bruta directos al puerto MySQL

---

## Nuevos dominios descubiertos (Jornada 7)

### la14hd.com

- **Descubrimiento:** en código fuente de `pelotalibretv.su/espn-1/`
- **IP:** 91.218.49.105 → Virtual Systems LLC (PTR: dedicated.vsys.host)
- **Función:** Servidor de streams alternativo para pelotalibretv.su
- **Endpoint:** `https://la14hd.com/vivo/canal.php?stream=espn`
- **Estado:** Activo (HTTP 200, nginx, HSTS activo)
- **Registro del dominio:** Sep 2025 (last-modified del index)
- **Headers:**
  ```
  server: nginx
  strict-transport-security: max-age=31536000
  ```
- **Nota:** Tiene HSTS pero la comparación con latamvidz1.com (sin HSTS) es relevante

### streamtpcloud.com

- **Descubrimiento:** en código fuente de `pelotalibretv.su/espn-1/`
- **IP:** Sin resolución DNS activa al momento del análisis (13/05/2026)
- **Función:** Tercer servidor de streams en el código de pelotalibretv.su
- **Endpoint:** `https://streamtpcloud.com/global1.php?stream=espn`
- **Estado:** Dominio registrado pero sin DNS activo — posiblemente backup inactivo

### server.envivolibre.com

- **Descubrimiento:** Hostname Shodan de 185.254.197.23
- **Dominio:** envivolibre.com
- **Relación:** El servidor principal de futbol-libre.su también responde bajo envivolibre.com
- **Posible rol:** Marca alternativa de streaming (en vivo + libre)
- **Pendiente:** Verificar si envivolibre.com/su es un dominio activo de cara al usuario

### server.vivozly.com

- **Descubrimiento:** Hostname Shodan de 128.0.104.23
- **Dominio:** vivozly.com
- **Relación:** El servidor de latamvidz1.com tiene este hostname técnico
- **Pendiente:** Verificar si vivozly.com es un sitio de cara al usuario o solo nombre técnico

---

## Análisis de sollutium.com

```
Dominio:      sollutium.com
Registrador:  NameCheap (registrado ~2013)
DNS:          Cloudflare NS (protección anti-DDoS)
Stack:        PHP/7.4.32 (versión antigua — PHP 7.4 EOL desde 2022)
Cookie:       WHMCShpOU0C5N0hQs (WHMCS — panel de hosting)
Headers de seguridad:
  - Referrer-Policy: no-referrer ✓
  - X-Frame-Options: SAMEORIGIN ✓
  - Strict-Transport-Security: (vía Cloudflare) ✓
  - Content-Security-Policy: [AUSENTE] ✗
```

WHMCS confirma que SOLLUTIUM opera como empresa de hosting/VPS que revende
la infraestructura de Virtual Systems LLC. El cliente `dedicated.sollutium.com`
corresponde a un servidor dedicado gestionado bajo su panel WHMCS.

**PHP/7.4.32 es una versión EOL (End of Life desde noviembre 2022)**, indicando
que la plataforma WHMCS de SOLLUTIUM no ha sido actualizada desde hace más de 3 años.

---

## Cruce confirmado: ZoneId Adsterra '10652966'

El ZoneId de Adsterra `10652966` aparece en **ambos sitios del operador**:

```
futbol-libre.su  → aclib.runPop({ zoneId: '10652966' })
pelotalibretv.su → zoneId: '10652966' (confirmado en análisis HTML 13/05/2026)
```

Este es el identificador único de la cuenta Adsterra del operador. El hecho de que
sea idéntico en ambos dominios constituye **evidencia técnica directa de autoría común**,
más allá de los indicios de infraestructura compartida.

---

## WordPress pelotalibretv.su — REST API expuesto

La API REST de WordPress en pelotalibretv.su expone información de usuarios:

```
GET https://pelotalibretv.su/wp-json/wp/v2/users

Respuesta:
[{
  "id": 1,
  "name": "admin",
  "slug": "futbollibre"
}]
```

**El slug "futbollibre" es consistente con la marca "futbol libre"**, confirmando
la autoría del sitio. La exposición del endpoint de usuarios facilita:
- Ataques de fuerza bruta (conociendo el nombre de usuario)
- Enumeración de autores para campañas de phishing/spear phishing

---

## Arquitectura de streams de pelotalibretv.su

```
pelotalibretv.su/espn-1/
    │
    ├── OPCIÓN 1: latamvidz1.com/canal.php?stream=espn
    │   (misma IP 128.0.104.23 — Virtual Systems LLC)
    │
    ├── OPCIÓN 2: la14hd.com/vivo/canal.php?stream=espn
    │   (91.218.49.105 — Virtual Systems LLC)
    │
    └── OPCIÓN 3: streamtpcloud.com/global1.php?stream=espn
        (sin DNS activo — backup inactivo)
```

pelotalibretv.su tiene **redundancia de servidores de stream** con 3 backends,
todos aparentemente bajo control del mismo operador o en infraestructura de Virtual
Systems LLC. Esto contrasta con futbol-libre.su que solo usa latamvidz1.com.

---
