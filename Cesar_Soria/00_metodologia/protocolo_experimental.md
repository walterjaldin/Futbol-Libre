# Protocolo experimental

---

## 1. Objetivo del protocolo

Establecer un procedimiento reproducible para la ejecución de sesiones experimentales orientadas al análisis de tráfico web, comportamiento de red y mecanismos de tracking presentes durante la navegación en el dominio analizado.

El protocolo busca garantizar:

- consistencia entre sesiones
- integridad de los datos recolectados
- aislamiento del entorno experimental
- reproducibilidad de los resultados

---

## 2. Preparación del entorno

Antes de iniciar cada sesión experimental se deben ejecutar las siguientes acciones:

### 2.1 Restauración del entorno

- Restaurar el snapshot base denominado:
  - `maquina_limpia`
- Verificar que la máquina virtual se encuentre en estado limpio y sin actividad previa.

### 2.2 Configuración de red

- Verificar que el adaptador de red de la máquina virtual esté configurado en modo:
  - NAT
- Confirmar conectividad a Internet.

### 2.3 Verificación de herramientas

Iniciar las herramientas necesarias para la captura y análisis:

| Herramienta | Propósito |
|---|---|
| Wireshark | Captura de tráfico de red |
| Burp Suite | Interceptación HTTP/HTTPS |
| Firefox | Navegación controlada |

### 2.4 Configuración de Burp Suite

- Verificar proxy local:
  - `127.0.0.1:8080`
- Confirmar instalación del certificado CA.
- Configurar:
  - `Intercept OFF`

### 2.5 Configuración del navegador

Antes de cada sesión:

- limpiar caché
- eliminar cookies
- cerrar sesiones previas
- verificar ausencia de extensiones

---

## 3. Inicio de captura

### 3.1 Captura de red

En Wireshark:

- iniciar captura sobre la interfaz de red activa
- verificar recepción de paquetes

### 3.2 Registro HTTP

En Burp Suite:

- confirmar registro de tráfico HTTP/HTTPS
- verificar funcionamiento del proxy

---

## 4. Ejecución experimental

Cada sesión experimental debe seguir un escenario previamente definido.

Las acciones pueden incluir:

- navegación pasiva
- interacción con enlaces
- apertura de streams
- interacción con iframes
- observación de publicidad
- reproducción multimedia

Durante la sesión:

- evitar actividades ajenas al experimento
- registrar observaciones relevantes
- mantener consistencia entre pruebas

---

## 5. Recolección de evidencia

Finalizada la sesión experimental:

### 5.1 Exportación de tráfico de red

Guardar captura Wireshark en formato:

```text
.pcapng
