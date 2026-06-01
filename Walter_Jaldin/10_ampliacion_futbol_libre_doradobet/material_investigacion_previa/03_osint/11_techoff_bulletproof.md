# 1.11 — TECHOFF SRV LIMITED: infraestructura de hosting bulletproof

**Fecha de análisis:** 14 de mayo de 2026  
**Investigador:** Walter Jaldín  
**Fuentes:** IPInfo (AS48090), Shodan InternetDB, RIPE WHOIS, Team Cymru, Scamalytics

---

## Identificación

TECHOFF SRV LIMITED es la empresa que provee los servidores HLS de streaming para el ecosistema de futbol-libre.su (a través de `envivoslatam.org`) y para sitios relacionados (a través de `fubohd.com`). Su clasificación como proveedor de **hosting bulletproof** tiene implicaciones directas para la resiliencia del ecosistema ante intentos de takedown.

---

## Datos corporativos

| Campo | Valor |
|---|---|
| Nombre | TECHOFF SRV LIMITED |
| País de registro | Reino Unido (UK) |
| Estructura | Virtual office — sin storefront público |
| Empresa relacionada | PPTECHNOLOGY LIMITED (misma dirección registrada) |
| ASN | AS48090 |
| Servicio público | **dmzhost.co** |
| Registro RIPE | 5 de septiembre de 2019 |
| Última actualización RIPE | 26 de noviembre de 2024 |

---

## Infraestructura de red

### Bloques IP propios (AS48090)

| Bloque CIDR | IPs | Validación RPKI |
|---|---|---|
| 45.148.10.0/24 | 256 | — |
| 93.123.109.0/24 | 256 | Válido |
| 195.178.110.0/24 | 256 | Válido |

**Total: 768 IPs IPv4 propias.**

### Conectividad

- **Upstream único:** AS57717 (FiberXpress BV, Países Bajos)
- **Localización operativa:** Amsterdam, Países Bajos
- **Sin IPv6:** No tiene bloques IPv6 propios

La dependencia de un único upstream (FiberXpress BV) es una vulnerabilidad estructural — si el upstream corta la sesión BGP, todo AS48090 queda aislado. Sin embargo, esto requeriría acción directa del ISP holandés.

---

## Política de hosting bulletproof — dmzhost.co

El servicio público de TECHOFF SRV LIMITED opera bajo la marca **dmzhost.co**:

### Características documentadas

1. **Ignorar solicitudes DMCA:** dmzhost.co publicita explícitamente su política de no atender Digital Millennium Copyright Act takedown requests. Esto permite a los sitios de streaming pirata mantener sus servidores de video activos indefinidamente frente a demandas de ESPN, Fox Sports, DIRECTV, etc.

2. **Servidores offshore:** Las IPs están asignadas a una entidad UK pero operan físicamente desde Países Bajos, creando ambigüedad jurisdiccional.

3. **Apariencia de legitimidad:** La estructura corporativa UK proporciona credenciales legales mínimas para registros en RIPE pero sin operar un negocio legítimo visible.

### Indicadores de actividad maliciosa

| Indicador | Dato |
|---|---|
| IP 195.178.110.160 en AbuseIPDB | **117,660 reportes de abuso** |
| Tags del AS | **BitTorrent, Tor, VPN** |
| Clasificación IPInfo | "ISP, Business or Hosting" |
| Clasificación Scamalytics | Alto riesgo de fraude |

La IP 195.178.110.160 del mismo bloque /24 que `envivoslatam.org` (195.178.110.11) tiene más de 117,000 reportes de abuso en AbuseIPDB — uno de los niveles más altos documentados en la base de datos.

---

## Inventario de dominios identificados en TECHOFF

### Bloque 93.123.109.0/24 (identificados vía Shodan)

| IP | Hostname | Función |
|---|---|---|
| 93.123.109.9 | komur.uwucdn.sbs | CDN/streaming (desconocido) |
| 93.123.109.10 | cc324.streamingtv339.com | Servidor HLS (streamingtv339.com) |
| 93.123.109.11 | chrz.envivoslatam.org | Servidor HLS (envivoslatam) |
| 93.123.109.12 | dtkb.envivoslatam.org | Servidor HLS (envivoslatam) |
| 93.123.109.145 | wp9xqedt.fubohd.com | Servidor HLS (fubohd.com) |

### Bloque 195.178.110.0/24 (identificados vía Shodan)

| IP | Hostname | Función |
|---|---|---|
| 195.178.110.11 | (sin hostname) | envivoslatam.org (futbol-libre.su) |
| 195.178.110.100 | a5.kora-plus.dad | Streaming deportivo árabe |

### Bloque 45.148.10.0/24

No identificado aún en el contexto del estudio. Pendiente de análisis posterior.

---

## Análisis del software Streamer 24.03

### Identificación

El software "Streamer 24.03" fue detectado en los headers HTTP de los servidores HLS:

```
Server: Streamer 24.03
```

Aparece en:
- `vg7ie.envivoslatam.org` (futbol-libre.su → envivoslatam.org)
- `wp9xqedt.fubohd.com` (la14hd.com → fubohd.com)

### Comportamiento observado

```
GET / → HTTP 302 → /admin/
```

El servidor expone un panel `/admin/` que requiere autenticación. El nombre "Streamer 24.03" sugiere software de streaming de video específico, posiblemente comercial o de desarrollo custom, con número de versión 24.03 (posiblemente 2024, mes 3 = marzo 2024).

### Puerto RTMP

En el análisis de Jornada 6 se confirmó que `envivoslatam.org` tiene el **puerto 1935 (RTMP) abierto**, usado para recibir el stream del origen. El servidor Streamer recibe la señal por RTMP y la distribuje como HLS.

---

## Implicaciones para el estudio

### Resiliencia ante takedowns

El uso de hosting bulletproof con política de ignorar DMCA es el mecanismo técnico que permite al ecosistema de streaming pirata mantenerse operativo:

```
ESPN/Fox Sports/DIRECTV → takedown notice → TECHOFF → IGNORADO
```

Sin embargo, existen mecanismos alternativos de enforcement que sí pueden afectar la infraestructura:
- Acciones legales directas contra el ISP upstream (FiberXpress BV, AS57717)
- Bloqueos a nivel de resolución DNS en ISPs
- Bloqueo de IPs por operadores de telecomunicaciones
- Acciones en RIPE para revocación del ASN

### Vector de riesgo para el usuario

Si la infraestructura TECHOFF fuera comprometida por un actor malicioso (o si un actor con acceso completa el panel `/admin/` del Streamer), podría inyectar contenido malicioso directamente en el stream HLS recibido por millones de usuarios:

```
Atacante → Compromiso Streamer 24.03 en TECHOFF → Inyección en .m3u8 → 
→ Fragment HLS modificado → Browser del usuario → Ejecución de código
```

Este vector teórico es altamente grave dada la escala del ecosistema.

---

## Relación con dmzhost.co

dmzhost.co (la marca pública de TECHOFF SRV LIMITED) según investigación de Team Cymru:

- Usa **virtual offices** para crear apariencia de legitimidad corporativa ante registros en RIPE
- No tiene presencia física real ni storefront comercial público
- Comparte dirección con PPTECHNOLOGY LIMITED
- El modelo de negocio es proveer infraestructura a operadores que necesitan evitar DMCA y otros enforcement

Esta estructura es característica de lo que la industria de seguridad denomina **"bulletproof hosting"** — un servicio que deliberadamente aloja contenido ilegal o borderline garantizando continuidad ante denuncias legales.

---
