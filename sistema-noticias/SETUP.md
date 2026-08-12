# Guía de instalación — Sistema de noticias con notificación automática

Esto se hace **una sola vez**. Después de configurado, cualquier persona sin
conocimientos técnicos puede publicar noticias desde `/admin` y el sistema
notifica solo a los suscriptores.

## 1. Instalar dependencias

En la carpeta del proyecto:

```bash
npm install @supabase/supabase-js nodemailer
npm install -D @types/nodemailer
```

## 2. Crear la base de datos (Supabase — gratis)

1. Entra a https://supabase.com y crea una cuenta / proyecto nuevo.
2. Ve a **SQL Editor > New query**, pega el contenido de `sql/schema.sql`
   y dale **RUN**. Esto crea las tablas `suscriptores` y `noticias`.
3. Ve a **Project Settings > API** y copia:
   - **Project URL** → esto va en `SUPABASE_URL`
   - **service_role key** (no la "anon" key) → esto va en
     `SUPABASE_SERVICE_ROLE_KEY`

## 3. Generar la contraseña de aplicación de Gmail

Como se va a enviar correo desde `comision.economica.concejo@gmail.com`,
Gmail exige una "contraseña de aplicación" (no la contraseña normal):

1. En esa cuenta de Gmail, activa la **verificación en dos pasos** si no
   está activa (Configuración de la cuenta de Google > Seguridad).
2. Busca **Contraseñas de aplicaciones** (o entra directo a
   https://myaccount.google.com/apppasswords).
3. Genera una nueva, ponle un nombre como "Sitio web noticias".
4. Copia el código de 16 caracteres que te da → eso va en
   `GMAIL_APP_PASSWORD`.

## 4. Configurar las variables de entorno en Vercel

En Vercel: **Project > Settings > Environment Variables**, agrega:

| Nombre | Valor |
|---|---|
| `SUPABASE_URL` | el que copiaste en el paso 2 |
| `SUPABASE_SERVICE_ROLE_KEY` | el que copiaste en el paso 2 |
| `GMAIL_USER` | comision.economica.concejo@gmail.com |
| `GMAIL_APP_PASSWORD` | el código de 16 caracteres del paso 3 |
| `ADMIN_PASSWORD` | una contraseña que solo conozcan las personas que van a publicar noticias |

Guarda y haz un **Redeploy** del proyecto para que tome las variables nuevas.

(Para probarlo en tu computadora antes de subirlo, copia `.env.example`
como `.env.local` y pon ahí los mismos valores.)

## 5. Subir los archivos

Copia estos archivos a las mismas rutas dentro de tu proyecto de Next.js:

```
lib/supabase.ts
lib/email.ts
app/api/subscribe/route.ts
app/api/admin/login/route.ts
app/api/admin/noticias/route.ts
app/admin/page.tsx
components/Contact.tsx   (reemplaza el que ya tienes)
```

Haz commit y push a GitHub como siempre — Vercel se encarga del resto.

## 6. Cómo se usa (para quien quede a cargo)

1. Entra a `tudominio.com/admin`
2. Escribe la contraseña definida en `ADMIN_PASSWORD`
3. Llena título, descripción y el link de la noticia o video
4. Dale **"Publicar y notificar"**

Eso es todo — no necesita tocar código, GitHub ni Vercel.

## Nota sobre límites de Gmail

Gmail permite enviar hasta ~500 correos por día desde una cuenta normal.
Para una comisión/secretaría con una lista de suscriptores modesta esto es
más que suficiente. Si en el futuro la lista de suscriptores crece mucho
(varios miles), se puede migrar el envío a un servicio como Resend o Brevo
sin tener que cambiar nada más del sistema.
