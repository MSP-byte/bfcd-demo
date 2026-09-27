# Biblioteca Ferroviaria Central Digital — BFCD

Demo / Prueba de Concepto desarrollada para la asignatura Seminario de Proyecto Final de la Tecnicatura en Gestión del Transporte Ferroviario — UdeMM.

## Objetivo

Demostrar conceptualmente un repositorio digital ferroviario centralizado que permita catalogar, clasificar, buscar, filtrar y consultar documentación ferroviaria histórica y técnica.

## Alcance de la Demo

La muestra inicial estará compuesta por 100 objetos digitales distribuidos en cinco colecciones:

- 10 Revistas BAP
- 15 Revistas Técnicas
- 15 Reglamentos e Itinerarios
- 30 Fotografías Antiguas
- 30 documentos de Material Rodante — Locomotoras

## Arquitectura

- HTML
- CSS
- JavaScript
- Supabase PostgreSQL
- Supabase Storage
- GitHub
- GitHub Pages

## Demo pública

https://msp-byte.github.io/bfcd-demo/

## Estado

**BFCD-DEMO v0.2 — Prueba de Concepto funcional (versión Seminario).**

- Catálogo conectado a Supabase PostgreSQL
- Objetos digitales servidos desde Supabase Storage
- Búsqueda y filtros por colección, tipo y año
- Ficha documental con metadatos
- Visualización de PDF e imágenes
- 74 objetos digitales actualmente disponibles en el lote piloto (carga prevista: 100)
- Publicación web mediante GitHub Pages

## Alcance académico de esta versión

BFCD-DEMO v0.2 constituye una prueba de concepto para validar la viabilidad técnica del Sistema Central de Gestión del Conocimiento Ferroviario. La versión demuestra el circuito completo desde el objeto digital almacenado hasta su recuperación mediante catalogación, búsqueda, filtrado y ficha documental.

Esta versión no pretende representar el sistema definitivo. Funciones como autenticación, perfiles, administración documental avanzada, preservación digital, carga asistida, auditoría y escalamiento institucional quedan fuera del alcance del MVP y se consideran líneas de evolución para el Proyecto Final.

## Evidencia de viabilidad

El prototipo implementa una arquitectura web desacoplada y de bajo costo basada en HTML/CSS/JavaScript, PostgreSQL y almacenamiento de objetos. Su publicación pública permite demostrar el funcionamiento del concepto con documentación ferroviaria real y no solamente mediante pantallas simuladas.
