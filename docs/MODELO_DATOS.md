# Modelo de datos

Tabla principal: `public.documentos`.

Cada fila representa un objeto documental o fotográfico del universo piloto. Los archivos binarios se almacenan en Supabase Storage y la tabla conserva su ruta mediante `archivo_path`.

## Colecciones
- Revistas BAP
- Revistas Técnicas
- Reglamentos e Itinerarios
- Fotos Antiguas
- Material Rodante - Locomotoras

El código humano sigue el patrón `BFCD-0001`. El identificador técnico es UUID.
