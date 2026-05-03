<p align="center">
  <img src="https://raw.githubusercontent.com/marcogll/mg_data_storage/refs/heads/main/soul23/logo/soul23_logo.svg" width="110" alt="Soul23">
</p>

<h1 align="center">Portfolio Mg</h1>

<p align="center">
  Sitio web corporativo para presencia digital 🌐
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Docker-3a3a3a?style=flat-square&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/Python-3a3a3a?style=flat-square&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/React-3a3a3a?style=flat-square&logo=react&logoColor=white" alt="React">
</p>

  Sitio web corporativo para presencia digital 🌐
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Docker-3a3a3a?style=flat-square&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/Python-3a3a3a?style=flat-square&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/React-3a3a3a?style=flat-square&logo=react&logoColor=white" alt="React">
</p>

## Quick Start

```bash
npm install
npm run dev
```

Para correr el servidor Express en local:

```bash
node server.js
```

Si quieres frontend y backend al mismo tiempo:

```bash
npm run dev:all
```

## Scripts de npm

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia Vite en desarrollo |
| `npm run build` | Genera el build de producción |
| `npm run preview` | Previsualiza el build generado |
| `npm run start` | Inicia `server.js` |
| `npm run dev:all` | Levanta frontend y backend al mismo tiempo |

## Configuración

Edita `src/data/config.json`:

```json
{
  "name": "Marco",
  "job": "Process Engineer",
  "jobEs": "Ingeniero de Procesos",
  "desc": "Developer, Engineer & always thinking in stuff",
  "descEs": "Desarrollador, Ingeniero y siempre pensando en cosas",
  "email": "marco@soul23.mx",
  "status": "on",
  "hireMeLink": "https://calendly.com/alma_dev/30min",
  "projects": [],
  "social": []
}
```

### Campos importantes

| Campo | Descripción |
|-------|-------------|
| `name` | Nombre mostrado en el sitio |
| `job` / `jobEs` | Puesto en inglés y Español |
| `desc` / `descEs` | Descripción corta en inglés y Español |
| `email` | Correo para copiar desde el sitio |
| `status` | `on` para disponible, `off` para ocupado |
| `hireMeLink` | URL del botón con icono de calendario |
| `projects` | Tarjetas del listado de proyectos |
| `social` | Redes sociales del bloque de contacto |

## Variables de entorno

`server.js` usa estas variables:

| Variable | Default | Descripción |
|----------|---------|-------------|
| `PORT` | `3002` | Puerto del servidor Express |
| `TIMEZONE` | `UTC` | Zona horaria usada por `/api/time` |
| `CONTACT_WEBHOOK` | vacío | Webhook para `POST /api/contact` |
| `VITE_API_PASSWORD` | vacío | Contraseña opcional para flujos frontend heredados |
| `SCRIPTS_BASIC_USER` | vacío | Usuario para proteger `/api/scripts` y archivos publicados |
| `SCRIPTS_BASIC_PASSWORD` | vacío | Password para proteger `/api/scripts` y archivos publicados |

Ejemplo de `.env`:

```env
PORT=3002
TIMEZONE=America/Monterrey
CONTACT_WEBHOOK=
VITE_API_PASSWORD=
SCRIPTS_BASIC_USER=
SCRIPTS_BASIC_PASSWORD=
```

## API

La API vive bajo `/api`.

### `GET /api/time`

Regresa la fecha y hora actual según `TIMEZONE`.

Ejemplo de respuesta:

```json
{
  "utc_iso": "2026-04-21T17:47:27.836Z",
  "unixtime": 1776793647,
  "datetime_human": "04/21/2026, 11:47:27",
  "timezone": "America/Monterrey"
}
```

### `GET /api/quote`

Regresa una frase aleatoria tomada de `src/info/quotes.json`.

Ejemplo:

```json
{
  "phrase": "Lo que hoy parece lento es profundo."
}
```

### `POST /api/contact`

Reenvía el payload al webhook configurado en `CONTACT_WEBHOOK`.

Payload esperado:

```json
{
  "name": "Marco",
  "email": "marco@soul23.mx",
  "phone": "8112345678",
  "business": "Soul23",
  "subject": "Nuevo proyecto",
  "message": "Quiero una landing page."
}
```

Respuesta exitosa:

```json
{
  "success": true
}
```

Si `CONTACT_WEBHOOK` no existe, responde `500`.

## Publicación de scripts

El proyecto publica el contenido del directorio `scripts/` desde el backend.
Las rutas quedan protegidas con HTTP Basic Auth cuando `SCRIPTS_BASIC_USER` y `SCRIPTS_BASIC_PASSWORD` están configurados. Si faltan, el backend responde `404`.

### Rutas disponibles

| Ruta | Descripción |
|------|-------------|
| `GET /api/scripts-manifest` | Lista scripts disponibles con nombre, extensión, tamaño y fecha |
| `GET /api/scripts/files/:filename` | Sirve el archivo solicitado |
| `GET /api/scripts` | Vista frontend que consume el manifiesto y muestra los scripts publicados |

Ejemplo de `GET /api/scripts-manifest`:

```json
{
  "scripts": [
    {
      "name": "deploy.sh",
      "extension": "sh",
      "size": 697,
      "modifiedAt": "2026-04-21T22:43:00.000Z",
      "url": "/api/scripts/files/deploy.sh"
    }
  ]
}
```

## Scripts del proyecto

Los scripts físicos viven en `scripts/`.

### `scripts/setup.sh`

Prepara una instalación básica del proyecto:

```bash
./scripts/setup.sh [domain] [port] [timezone]
```

Ejemplo:

```bash
./scripts/setup.sh marco.soul23.mx 3002 America/Monterrey
```

Qué hace:

- Verifica que `node` y `npm` existan
- Instala dependencias si falta `node_modules`
- Ejecuta `npm run build`
- Genera un archivo `.env`

### `scripts/deploy.sh`

Hace un despliegue simple por git en el servidor:

```bash
./scripts/deploy.sh
```

Qué hace:

- Hace `git pull origin main`
- Ejecuta `npm install`
- Ejecuta `npm run build`
- Reinicia `pm2` si está disponible

## Deployment

### Docker

```bash
docker-compose up -d
```

### Coolify

- Build command: `npm run build`
- Start command: `node server.js`
- Port: `3002`

## Idiomas

El sitio soporta inglés y Español. El cambio se hace desde el botón de bandera en el navbar.

## Footer

---

Built with React + Tailwind CSS + Vite + Express




