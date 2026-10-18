# NEXUS // Beyond the Interface

Personal portfolio of **Lakshya Vashishtha**, a B.Tech CSE student at JK Lakshmipat University, built with the MERN stack for the MERN Stack course assignment.

> **Live site:** https://lakshya-vashishtha-portfolio.vercel.app
> **API:** https://nexus-portfolio-i98f.onrender.com
> **API health check:** https://nexus-portfolio-i98f.onrender.com/api/health

## Features

- Animated hero: typewriter roles, pointer-reactive orbital system (React, Node.js, Express, MongoDB around a monogram), scroll cue
- About, categorized skills (bars and rings, tooltips), filterable project gallery with case-study pages (React Router), animated education/experience timeline, certificates and achievements
- Resume download in **PDF and DOCX**, served by Express routes
- Contact form: client + server validation, saved to **MongoDB** with Mongoose, honeypot and rate limiting
- Working dark/light theme (saved in localStorage, follows system preference on first visit)
- Responsive, keyboard accessible, respects `prefers-reduced-motion`

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | React 18, Vite, React Router 6, Tailwind CSS 3, Framer Motion, Lucide |
| Backend | Node.js, Express 4, Mongoose 8, helmet, cors, express-rate-limit, dotenv |
| Database | MongoDB Atlas |

## Folder structure

```
client/                React app (Vite)
  src/components/      Hero, About, Skills, Projects, Timeline, Contact, ...
  src/pages/           Home, ProjectPage (/projects/:slug), NotFound
  src/context/         ThemeContext (dark/light)
  src/hooks/           useTypewriter, useResumeDownload
  src/data/content.js  ALL editable content (skills, projects, timeline, certificates)
server/                Express API
  src/app.js           middleware + routes
  src/routes/          contact.js, resume.js
  src/models/          Contact.js (Mongoose schema)
  src/middleware/      errorHandler.js
  files/               resume.pdf, resume.docx
  test/                API tests
```

## Run locally

Prerequisites: Node 18+, a free MongoDB Atlas cluster.

```bash
# 1. Backend
cd server
cp .env.example .env        # then fill in MONGODB_URI
npm install
npm run dev                 # http://localhost:5000

# 2. Frontend (new terminal)
cd client
npm install
npm run dev                 # http://localhost:5173 (proxies /api to :5000)
```

## Environment variables

**server/.env**

| Name | Purpose |
|---|---|
| `PORT` | Port to listen on (Render/Railway set this automatically) |
| `MONGODB_URI` | Atlas connection string. Never commit it. |
| `CLIENT_ORIGINS` | Comma-separated allowed frontend origins for CORS, e.g. `https://yourname.vercel.app` |
| `NODE_ENV` | `production` hides internal error messages |

**client/.env** (production only)

| Name | Purpose |
|---|---|
| `VITE_API_URL` | Deployed backend URL, e.g. `https://your-api.onrender.com` (no trailing slash) |

`.env` files are in `.gitignore`; only `.env.example` files are committed.

## API

| Method | Route | Description |
|---|---|---|
| GET | `/api/health` | `{ status, database }` |
| POST | `/api/contact` | Body `{ name, email, message }`. `201` saved, `400` validation errors, `429` rate limited (5 per 15 min per IP), `503` database unavailable |
| GET | `/api/resume/pdf` | Downloads `Lakshya_Vashishtha_Resume.pdf` |
| GET | `/api/resume/docx` | Downloads `Lakshya_Vashishtha_Resume.docx` |

## Customize (do this before submitting)

1. `client/src/data/content.js`: replace every `// EDIT` item (GitHub/LinkedIn URLs, project links, **skill levels**, certificates, timeline dates).
2. Put your photo at `client/public/profile.jpg`.
3. Replace `server/files/resume.pdf` and `resume.docx` with your final resume (keep the file names).

## Deployment

1. **MongoDB Atlas:** create a cluster and a database user. Under Network Access allow `0.0.0.0/0` (Render uses changing IPs). Copy the connection string.
2. **Backend on Render:** New Web Service from this repo, root directory `server`, build `npm install`, start `npm start`. Add env vars `MONGODB_URI`, `CLIENT_ORIGINS` (your frontend URL), `NODE_ENV=production`.
3. **Frontend on Vercel or Netlify:** root directory `client`, build `npm run build`, output `dist`. Add env var `VITE_API_URL` = the Render URL. SPA rewrites are included (`vercel.json`, `public/_redirects`).
4. Update `CLIENT_ORIGINS` if the frontend URL changes, then paste both live URLs at the top of this README.

## Screenshots

<img width="1917" height="982" alt="image" src="https://github.com/user-attachments/assets/d066c2c5-bcf4-4b83-95fa-e79601e0b0fc" />

<img width="1917" height="981" alt="image" src="https://github.com/user-attachments/assets/49566f01-4404-44e2-8054-807d75047a8a" />

<img width="1917" height="976" alt="image" src="https://github.com/user-attachments/assets/973b98c5-9500-4ddf-b71a-d38cecf0852e" />


## Tests

`cd server && npm test` runs API tests (health, validation, resume MIME types and filenames).
