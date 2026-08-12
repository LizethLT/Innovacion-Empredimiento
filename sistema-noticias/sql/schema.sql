-- Ejecutar esto en Supabase: Project > SQL Editor > New query > pegar y RUN

create table suscriptores (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

create table noticias (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descripcion text,
  link text not null,
  tipo text default 'noticia', -- 'noticia' o 'video'
  created_at timestamptz default now()
);
