# Marco G | Portfolio

Personal portfolio website with contact form integrated with n8n.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `node server.js` | Start production server |

## ⚙️ Configuration

Edit `src/data/config.json`:

```json
{
  "name": "Marco",
  "job": "Process Engineer",
  "jobEs": "Ingeniero de Procesos",
  "desc": "Developer, Engineer & always thinking in stuff",
  "descEs": "Desarrollador, Ingeniero y siempre pensando en cosas",
  "email": "marco@soul23.cloud",
  "status": "on",
  "hireMeLink": "https://calendly.com/alma_dev/30min",
  "contactWebhook": "https://your-n8n-webhook-url",
  "projects": [...],
  "social": [...]
}
```

### Config Options

| Field | Description |
|-------|-------------|
| `name` | Your name |
| `job` / `jobEs` | Job title (EN/ES) |
| `desc` / `descEs` | Description (EN/ES) |
| `email` | Contact email |
| `status` | `on` = available, `off` = busy |
| `contactWebhook` | n8n webhook URL for contact form |

## 🌐 Deployment (Coolify)

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3002 | Server port |
| `TIMEZONE` | UTC | Timezone for `/api/time` |

### Docker

```bash
docker-compose up -d
```

### Coolify Setup

- **Build Command**: `npm run build`
- **Start Command**: `node server.js`
- **Port**: 3002

## 🔌 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/time` | Get current time (respects TIMEZONE env) |
| `GET /api/quote` | Get random phrase |

### Time Response

```json
{
  "utc_iso": "2026-04-21T17:47:27.836Z",
  "unixtime": 1776793647,
  "datetime_human": "04/21/2026, 11:47:27",
  "timezone": "America/Monterrey"
}
```

## 🌎 Translations

The site supports English and Spanish. Switch by clicking the flag icon in the navbar.

## 📝 Contact Form

When clicking "Hire Me", a modal opens with fields:
- Name (required)
- Email (required)
- Phone (optional)
- Business (optional)
- Subject (required)
- Message (required)

Data is sent to `contactWebhook` URL as JSON.

---

Built with React + Tailwind CSS + Vite