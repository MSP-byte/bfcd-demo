-- Espejo documental de la migración aplicada en Supabase BFCD-DEMO.
create extension if not exists pgcrypto;

create table public.documentos (
  id uuid primary key default gen_random_uuid(),
  codigo text not null unique check (codigo ~ '^BFCD-[0-9]{4}$'),
  titulo text not null,
  coleccion text not null check (coleccion in ('Revistas BAP','Revistas Técnicas','Reglamentos e Itinerarios','Fotos Antiguas','Material Rodante - Locomotoras')),
  tipo_documental text not null check (tipo_documental in ('Revista','Boletín técnico','Manual técnico','Plano','Reglamento','Itinerario','Circular','Fotografía','Ficha técnica','Catálogo')),
  descripcion text,
  anio integer check (anio is null or (anio >= 1800 and anio <= 2100)),
  fecha_documento date,
  ferrocarril text,
  linea_ramal text,
  autor_organismo text,
  fabricante_modelo text,
  ubicacion text,
  palabras_clave text,
  fuente text,
  archivo_tipo text not null check (archivo_tipo in ('PDF','IMAGEN')),
  archivo_path text not null unique,
  miniatura_path text,
  created_at timestamptz not null default now()
);

create index documentos_coleccion_idx on public.documentos (coleccion);
create index documentos_tipo_documental_idx on public.documentos (tipo_documental);
create index documentos_ferrocarril_idx on public.documentos (ferrocarril);
create index documentos_anio_idx on public.documentos (anio);

alter table public.documentos enable row level security;
create policy "BFCD lectura publica" on public.documentos for select to anon, authenticated using (true);
grant select on public.documentos to anon, authenticated;

insert into storage.buckets (id,name,public)
values ('bfcd-archivos','bfcd-archivos',true)
on conflict (id) do update set public=excluded.public;
