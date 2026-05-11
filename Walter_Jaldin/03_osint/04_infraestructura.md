# 1.4 — Infraestructura ampliada

**Fecha de consulta:** 10 de mayo de 2026  
**Investigador:** Walter Jaldín  
**Herramientas:** curl, dig, openssl, nc, RIPE whois, HackerTarget Reverse IP

---

## Resumen ejecutivo

El análisis de infraestructura amplía los hallazgos de la sub-fase 1.3 (Censys). Se confirman y actualizan los datos del servidor: el mismo proveedor (Virtual Systems LLC) ahora aloja **tres IPs distintas** para futbollibretv.su, el servidor de streams `latamvidz1.com` también pertenece a la misma infraestructura, y el panel de administración cPanel/WHM con 20+ puertos abiertos sigue accesible directamente por IP.

---

## Servidor principal: 185.254.197.23 (Virtual Systems LLC)

### Stack completo identificado

```
Nginx (Engintron) → proxy reverso + cache
├── cPanel 2083 (HTTPS)  → panel administración hosting
├── WHM   2087 (HTTPS)  → panel administración servidor
├── Webmail 2096 (HTTPS) → correo web
├── Apache 8080          → servidor secundario
├── MySQL 3306           → base de datos
├── SSH   22             → acceso remoto
├── SMTP  25/465/587     → correo (envío)
└── IMAP/POP3 143/993/110/995 → correo (recepción)
```

### Puertos abiertos (port scan 10 mayo 2026)

20 puertos abiertos verificados: 22, 25, 53, 80, 110, 143, 443, 465, 587, 993, 995, 2082, 2083, 2086, 2087, 2095, 2096, 3306, 8080, 8443.

Este perfil es consistente con el de un **servidor de hosting compartido cPanel estándar** con todos los servicios por defecto habilitados. La exposición directa de MySQL (3306) desde Internet es un riesgo de seguridad documentado, aunque en cPanel esta configuración es habitual en servidores mal endurecidos.

---

## Expansión de IPs: 128.0.104.23 y 138.226.244.112

Ambas IPs pertenecen a Virtual Systems LLC (mismo propietario que 185.254.197.23):

| IP | Netname | ASN | Subred |
|---|---|---|---|
| 128.0.104.23 | VSYS-UA | 30860 | 128.0.104.0/24 |
| 138.226.244.112 | VSYS-UA-COLO12 | (SOLLUTIUM-EU-MNT) | 138.226.244.0/23 |
| 185.254.197.23 | YURTEH-AS | 30860 | 185.254.196.0/23 |

**Implicación:** el operador tiene presencia en múltiples subredes del mismo proveedor ucraniano, lo que sugiere un cliente de hosting con múltiples servicios contratados o un VPS dedicado con IPs adicionales asignadas.

---

## CDN de assets: BunnyCDN

```
cdn.futbol-libre.su → CNAME fltsu.b-cdn.net → 195.181.163.203
```

BunnyCDN (sede: Eslovenia) sirve desde Miami (BUNNYCDN_MIA):
- JavaScript: menu.js (662 bytes), canal.js (mínimo)
- Imágenes: logo, webp assets
- Cache máximo: 30 días

La elección de BunnyCDN (servicio de pago con buena reputación) para assets es coherente con una operación que busca rendimiento. El nombre del pull zone `fltsu` = futbol libre .su.

---

## Servidor de streams: latamvidz1.com

Descubierto en la sub-fase de reconocimiento activo. Es el **backend técnico de video** del sitio:

| Campo | Valor |
|---|---|
| IP | 128.0.104.23 (Virtual Systems LLC) |
| Registrador | SOLLUTIUM LLC |
| Fecha creación | 28 enero 2026 |
| NS | DNS10/11/12.VSYS.NAME + UNS13/14.VSYS.NAME |
| TLS | Let's Encrypt R12 |

El PHP endpoint `/canal.php?stream=espn` sirve el contenido de video para el canal ESPN dentro del iframe de futbol-libre.su. Al consultarlo directamente (sin parámetros stream), retorna HTTP 410 Gone, lo que indica que tiene lógica de validación de origen/parámetros.

---

## Relación con SOLLUTIUM LLC

SOLLUTIUM LLC aparece como:
1. Registrador de `latamvidz1.com`
2. Mantenedor (SOLLUTIUM-EU-MNT) de la subred 138.226.244.0/23

Esta empresa es una filial o socio comercial de Virtual Systems LLC, ambas con operaciones en Ucrania/Europa del Este.

---

## Evidencias adjuntas

Ver `04_reconocimiento_activo/evidencias/` para evidencias crudas:
- `dns/dns_ecosistema_10may2026.txt`
- `puertos/portscan_185254197023.txt`
