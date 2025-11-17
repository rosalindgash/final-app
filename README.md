# Final — Digital Pre-Planning MVP

Final is a secure digital pre-planning service that helps individuals organize, store, and document their end-of-life information in one place. The MVP focuses on privacy, simplicity, and security while providing a foundation for future expansion into a full-scale subscription platform.

> **Note:** This project is not currently in production. It is maintained as a portfolio project to showcase architecture, security-aware design, and full-stack implementation.

This repository contains both the **frontend** and **backend** for the Final MVP.

---
## 📁 Project Structure

```text
final/
├── frontend/        # Frontend app (React / Vercel-exported)
└── backend/         # Backend API (Django / Python-based)
```

- **frontend/** — user-facing interface, landing page, authentication screens, dashboard UI.
- **backend/** — API logic, user provisioning, tier limits, file storage, backups, Stripe integration (pre-wired).

---

## 🚀 Features (MVP)

### Core
- Secure user authentication
- User tier provisioning (Free, Basic, Premium)
- Storage limits per tier
- Upload & manage documents (PDF, images, etc.)
- S3 or compatible object storage
- Automatic backups (cron-ready)
- Email collection (Formspree on website)
- Fully private: no social features, no public pages

### Security
- HTTPS-by-design for production deploys
- No public document links
- Tier-based access controls
- Manual Stripe payouts (configured for MVP)
- Strong separation of frontend and backend concerns

---

## 🧩 Tech Stack

### Frontend
- React (generated via v0 by Vercel)
- Component-based layout with modern styling
- Formspree integration for waitlist / contact
- Responsive design (desktop + mobile)

### Backend
- Django (primary API framework)
- Python 3.x
- S3-compatible storage (AWS S3, Backblaze B2, Wasabi, etc.)
- Stripe integration (pre-wired for subscriptions)
- Cron-ready backup system
- REST API endpoints for:
  - Authentication
  - Uploads
  - Storage tracking
  - Tier management

---

## 🔐 Environment Variables

Create a `.env` file in both **frontend** and **backend** folders.

### Frontend `.env`

```bash
REACT_APP_API_URL=<backend-api-url>
REACT_APP_FORMSPREE_URL=<formspree-endpoint>
```

### Backend `.env`

```bash
SECRET_KEY=<django-secret-key>
DEBUG=False

# S3 Storage
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_STORAGE_BUCKET_NAME=<bucket>
AWS_S3_REGION_NAME=<region>
AWS_S3_ENDPOINT_URL=<optional-for-non-AWS-providers>

# Stripe
STRIPE_PUBLIC_KEY=<public>
STRIPE_SECRET_KEY=<secret>
STRIPE_WEBHOOK_SECRET=<webhook>

# Database
DB_HOST=<host>
DB_NAME=<name>
DB_USER=<user>
DB_PASSWORD=<password>

# Backup System
BACKUP_CRON_SCHEDULE="0 2 * * *"
BACKUP_BUCKET=<optional>
```

---

## 🧭 Running Locally

### Backend

From `/backend`:

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The backend will start at:

```text
http://127.0.0.1:8000
```

---

### Frontend

From `/frontend`:

```bash
npm install
npm start
```

The frontend will start at:

```text
http://localhost:3000
```

Update `REACT_APP_API_URL` in the frontend `.env` file so it points to your local or deployed backend URL.

---

## ☁️ Deployment

### Frontend Deployment Options
- Vercel (recommended if using the original v0 code)
- Netlify
- GitHub Pages (as a static export)
- Traditional shared hosting (build → upload static files)

### Backend Deployment Options
- AWS EC2
- DigitalOcean Droplets
- Render.com
- Railway (with proper build/runtime config)
- Docker-based deployment
- Self-hosted VPS

S3 (or S3-compatible) object storage must be configured and the bucket created in advance.

---

## 💾 Storage Limits (MVP Logic)

| Tier       | Storage | Trusted Contacts | Beneficiaries |
|------------|---------|------------------|----------------|
| Free       | 500 MB  | 1                | 0–1            |
| Basic      | 2 GB    | 5                | 3              |
| Premium    | 5 GB    | Unlimited        | Unlimited      |

Planned add-on storage (for a future live version):

- +5GB → $5/month  
- +10GB → $10/month  

These limits are enforced at the backend level and reflected in the UI.

---

## 🔧 Automated Backups (Planned)

The backend is designed to support scheduled backups (via cron or a scheduler):

- Dumps user metadata (database)
- Copies object storage files
- Encrypts backup archive
- Pushes to a dedicated backup bucket or storage location

This is part of the architectural design for a production-ready launch, even though the project is currently portfolio-only.

---

## 👩‍💻 About the Creator

Final was created by **Rosalind R. Gash**, a sociologist by training and an engineer by practice. The project reflects her focus on building practical, security-conscious tools for real people with real-world constraints, especially around planning and peace of mind.

---

## 📄 License

This project is currently archived as a portfolio example.  
If you intend to reuse or adapt significant portions of the code, please contact the author.

---

## 📬 Contact

For questions about this project, portfolio review, or collaboration:

- Email: rrgash@protonmail.com  
- Personal site: https://rosalindgash.org
