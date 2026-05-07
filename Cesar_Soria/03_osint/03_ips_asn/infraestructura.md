# Infraestructura asociada al dominio

## IP principal identificada

- IP: 185.254.197.23
- ASN: AS30860
- Proveedor: Virtual Systems LLC (YURTEH-AS)
- Ubicación: Ucrania

## IP adicional observada

- IP: 194.42.205.18
- Observada en análisis OSINT (Shodan, Passive DNS)

## Servicios detectados

- Servidor web: nginx
- Servidor web adicional: Apache httpd

## Puertos abiertos

- 443 (HTTPS)
- 8443 (HTTPS alternativo)

## Certificados SSL

- Emisor: Let's Encrypt
- Subdominio asociado: cdn1.futbollibretv.su

## Comportamiento del servidor

- Redirección HTTP 301 hacia:
  https://futbollibretv.su/

## Observaciones

- La coexistencia de nginx y Apache sugiere una arquitectura en múltiples capas, posiblemente mediante el uso de un proxy reverso.
- La presencia de múltiples puertos HTTPS indica servicios adicionales expuestos.
- La infraestructura se encuentra asociada a proveedores internacionales, con ubicación principal en Ucrania.
- Los hallazgos son consistentes con el análisis DNS y el historial de resoluciones, lo que refuerza la validez de la información recopilada.
