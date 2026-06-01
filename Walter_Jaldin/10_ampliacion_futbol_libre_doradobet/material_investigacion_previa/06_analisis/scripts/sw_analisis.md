# Análisis de sw.js — Service Worker de latamvidz1.com

**Fecha:** 24 de mayo de 2026  
**Fuente:** `https://latamvidz1.com/sw.js`  
**Tamaño:** 90 bytes  
**Contenido completo:**

```javascript
self.importScripts('https://cdn.jsdelivr.net/npm/swarmcloud-hls@latest/dist/hls-proxy.js')
```

---

## ¿Qué es?

Este Service Worker se descarga automáticamente cuando el iframe de `latamvidz1.com/canal.php` se carga en el navegador del usuario. Fue capturado en las sesiones experimentales:

| Sesión | sw.js descargado |
|---|---|
| A14-N-R1 | ✅ HTTP 200 |
| A14-D-R1 | ✅ HTTP 200 + 304 |
| A11-N-R1 | ❌ No observado |
| A11-D-R1 | ❌ No observado |

---

## Función: SwarmCloud P2P CDN

Importa `swarmcloud-hls` desde jsDelivr CDN. Esta biblioteca convierte el navegador del usuario en un **nodo P2P** que:

1. **Sirve fragmentos del stream HLS** a otros usuarios conectados al mismo canal
2. **Consume datos móviles** del usuario para distribuir contenido a terceros
3. **Expone la IP real** del usuario a otros pares en la red SwarmCloud
4. **Cachea contenido localmente** sin consentimiento explícito

### Mecanismo

```
Usuario A (Bolivia)
  → Visita futbol-libre.su
  → Iframe carga latamvidz1.com/canal.php
  → latamvidz1.com registra Service Worker (sw.js)
  → sw.js importa swarmcloud-hls-proxy.js
  → El navegador del usuario se convierte en PEER de la red P2P
  → Sirve fragmentos .ts del HLS a otros usuarios (Usuario B, C, D...)
```

---

## Riesgos

| Riesgo | Descripción | Severidad |
|---|---|---|
| **Consumo de datos** | El usuario paga por datos móviles que se usan para servir contenido a otros | ALTA |
| **Exposición de IP** | La IP real del usuario es visible para otros peers en la red SwarmCloud | ALTA |
| **Persistencia** | Service Worker persiste incluso después de cerrar el navegador | MEDIA |
| **Cacheo no consentido** | Contenido cacheado en el dispositivo sin autorización explícita | MEDIA |
| **Sin control** | El usuario no tiene forma de saber que su dispositivo es un nodo P2P | ALTA |

---

## Implicación legal

El Service Worker convierte al usuario en **distribuidor activo** de contenido protegido por derechos de autor, no solo en consumidor. Esto tiene implicaciones legales potenciales en jurisdicciones donde la distribución no autorizada de contenido es penalizada.
