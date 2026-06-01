# Futbol Libre / DoradoBet - Investigacion de ciberseguridad

Este repositorio contiene una investigacion defensiva sobre exposicion de usuarios al visitar sitios de streaming pirata y apuestas en linea.

## Entregables principales

- `Articulo_Evidencias_FutbolLibre_DoradoBet.docx`: informe para articulo con pruebas numeradas y capturas.
- `Articulo_Evidencias_FutbolLibre_DoradoBet.md`: version Markdown del informe.
- `Analisis_Ampliado_FutbolLibre_DoradoBet.docx`: informe ampliado de ciberseguridad.
- `Analisis_Ampliado_FutbolLibre_DoradoBet.md`: version Markdown del informe ampliado.
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
