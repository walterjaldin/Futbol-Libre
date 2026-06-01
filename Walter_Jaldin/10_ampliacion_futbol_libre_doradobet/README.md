# Futbol Libre / DoradoBet - Investigacion de ciberseguridad

Este directorio contiene una sola investigacion integrada de Walter Jaldin sobre exposicion de usuarios al visitar sitios de streaming pirata y apuestas en linea. La ampliacion de DoradoBet queda incorporada dentro de la misma estructura de fases, no como una investigacion separada.

## Estructura integrada

- `01_bitacora/`: diario de investigacion.
- `02_registro_tecnico/`: entorno, configuraciones y certificados.
- `03_osint/`: reconocimiento pasivo, DNS, WHOIS, reputacion e infraestructura.
- `04_reconocimiento_activo/`: headers, codigo fuente, scripts y streams.
- `05_sesiones/`: sesiones controladas y capturas de trafico.
- `06_analisis/`: analisis tecnico, scripts e informes.
- `07_owasp/`: mapeo de riesgos.
- `08_articulo/`: borradores y entregables para articulo.
- `09_referencias/`: referencias consultadas.
- `evidencias/`: evidencias de la ampliacion Futbol Libre / DoradoBet.
- `tools/`: herramientas usadas para recolectar y regenerar evidencias.

## Entregables principales

- `08_articulo/entregables/Articulo_Evidencias_FutbolLibre_DoradoBet.docx`: informe para articulo con pruebas numeradas y capturas.
- `08_articulo/entregables/Articulo_Evidencias_FutbolLibre_DoradoBet.md`: version Markdown del informe.
- `06_analisis/informes/Analisis_Ampliado_FutbolLibre_DoradoBet.docx`: informe ampliado de ciberseguridad.
- `06_analisis/informes/Analisis_Ampliado_FutbolLibre_DoradoBet.md`: version Markdown del informe ampliado.
- `06_analisis/informes/Analisis_Ciberseguridad_FutbolLibre.docx`: informe inicial de la investigacion.
- `evidencias/publicable/ANEXO_EVIDENCIAS.md`: anexo de evidencias redactadas.

## Evidencias

- `evidencias/publicable/`: JSON, CSV y resumen redactados para uso en articulo.
- `evidencias/extended/`: capturas y resultados de escenarios dinamicos.
- `evidencias/doradobet/`: HTML/configuraciones recolectadas durante el analisis.
- `evidencias/aclib.js` y `evidencias/suv5.js`: scripts publicitarios conservados como evidencia.

## Herramientas

- `tools/site_probe.mjs`: automatiza escenarios de navegacion y recolecta dominios, popups, descargas y estado del sitio.
- `tools/build_evidence_pack.py`: genera evidencias redactadas y CSV publicables.
- `tools/build_article_evidence_report.py`: genera el informe para articulo en DOCX y Markdown.
- `tools/build_security_report.py`: genera el informe ampliado.

## Resumen de hallazgos

- Futbol Libre no descargo malware automaticamente en las pruebas, pero si expuso al usuario a publicidad ofuscada, iframes externos, pop-under y hosts rotativos.
- DoradoBet no descargo malware automaticamente en las pruebas, pero mostro rastreo intensivo, fingerprinting, carga de muchos terceros, formulario con datos sensibles y riesgo de dominios similares.
- En escenarios mobile/PWA de DoradoBet se observaron solicitudes hacia una cadena de publicidad adulta/afiliada.

## Nota de seguridad

Las evidencias redactadas en `evidencias/publicable/` son las recomendadas para publicar. Las evidencias crudas se conservan para auditoria interna y deben revisarse antes de compartirse en repositorios publicos.
