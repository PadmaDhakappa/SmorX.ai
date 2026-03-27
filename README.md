# SmorX.ai — Full-Stack AI Company Website

A production-ready website for SmorX.ai built with React + Vite (frontend) and Django REST Framework (backend).

---

## Project Structure

```
SmorX.ai/
├── frontend/                   # React + Vite + Tailwind CSS
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Sticky navbar with blur on scroll
│   │   │   └── Footer.jsx      # Footer with links & socials
│   │   ├── sections/
│   │   │   ├── Hero.jsx        # Animated hero with rotating words
│   │   │   ├── Services.jsx    # 6 AI service cards
│   │   │   ├── About.jsx       # Mission, vision, stats
│   │   │   ├── Trust.jsx       # Testimonials + logos
│   │   │   └── Contact.jsx     # Form → Django API
│   │   ├── pages/
│   │   │   └── Home.jsx        # Lazy-loaded page assembly
│   │   ├── hooks/
│   │   │   └── useScrollAnimation.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css           # Tailwind + custom utilities
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js          # Proxy /api → Django :8000
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/                    # Django + DRF
│   ├── smorx/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── contact/
│   │   ├── models.py           # ContactMessage model
│   │   ├── serializers.py      # Input validation
│   │   ├── views.py            # POST /api/contact/
│   │   ├── urls.py
│   │   └── admin.py            # Django admin panel
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env                    # Dev env vars (gitignored in prod)
│   └── .env.example
│
└── README.md
```

---

## Quick Start

### 1. Backend (Django)

**Requirements:** Python 3.11+ (Anaconda or system Python)

```bash
cd backend

# Install dependencies into your active Python environment
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (for admin panel — optional)
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

> **Windows note:** Do not use `source`. If using a venv, activate with `venv\Scripts\activate` (CMD) or `venv\Scripts\Activate.ps1` (PowerShell). With Anaconda, just run `pip install` and `python` directly.

Backend runs at: **http://localhost:8000**
Admin panel: **http://localhost:8000/admin/**
API endpoint: **POST http://localhost:8000/api/contact/**

---

### 2. Frontend (React)

**Requirements:** Node.js 18+

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs at: **http://localhost:5173**

> The Vite dev server automatically proxies `/api/*` requests to Django at `http://localhost:8000`.

---

## API Reference

### `POST /api/contact/`

Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john@company.com",
  "message": "Tell us about your project..."
}
```

**Success Response (201):**
```json
{
  "message": "Thank you for reaching out! We'll get back to you within 24 hours.",
  "data": {
    "id": 1,
    "name": "John Smith",
    "email": "john@company.com",
    "message": "Tell us about your project...",
    "created_at": "2026-03-27T10:00:00Z"
  }
}
```

**Error Response (400):**
```json
{
  "errors": {
    "email": ["Enter a valid email address."]
  }
}
```

**Rate Limit:** 10 requests/hour per IP.

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `SECRET_KEY` | — | Django secret key (required) |
| `DEBUG` | `False` | Enable debug mode |
| `ALLOWED_HOSTS` | `localhost,127.0.0.1` | Comma-separated allowed hosts |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173` | Frontend origin(s) |

---

## Production Build

```bash
# Build frontend
cd frontend
npm run build
# Static files output to frontend/dist/

# Collect Django static files
cd backend
python manage.py collectstatic

# Run with Gunicorn
gunicorn smorx.wsgi:application --bind 0.0.0.0:8000
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, React Router |
| Icons | Lucide React |
| HTTP Client | Axios |
| Backend | Django 5, Django REST Framework |
| CORS | django-cors-headers |
| Config | python-decouple |
| Database | SQLite (dev) / PostgreSQL (prod) |
