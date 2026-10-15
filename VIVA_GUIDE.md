# Viva guide: NEXUS portfolio

## 1. Big picture
Browser (React SPA on Vercel/Netlify) -> HTTPS `fetch` -> Express API (Render/Railway) -> MongoDB Atlas.
The frontend is static files. Only two things need a server: saving contact messages and serving the resume files.

## 2. Folder structure
- `client/src/data/content.js`: all text, skills, projects. Components only render this data, so editing content never touches layout code.
- `client/src/components/`: one component per section (Hero, About, Skills, Projects, Timeline, Certifications, ResumeBand, Contact) plus shared ones (Section, Navbar, ThemeToggle, ResumeButtons, LinkButton).
- `client/src/pages/`: route-level components. `Home` stacks the sections, `ProjectPage` shows one project, `NotFound` is the 404.
- `server/src/app.js`: builds the Express app (middleware order matters). `index.js` loads env, connects to the database and starts listening. Keeping `app.js` separate lets tests start the app without a database.

## 3. React concepts used
- **Components and props:** `ProjectCard({ p })`, `SkillBar({ skill })`, `Section({ id, title, children })`.
- **State (`useState`):** project filter, menu open, form values/errors/status, theme.
- **Effects (`useEffect`):** typewriter timers, IntersectionObserver for the active nav link, writing `data-theme` to `<html>`.
- **Context:** `ThemeContext` shares theme + toggle with any component without prop drilling.
- **Custom hooks:** `useTypewriter`, `useResumeDownload` keep logic out of JSX.
- **Routing:** `BrowserRouter` in `main.jsx`; `Routes`/`Route` in `App.jsx`; `/projects/:slug` reads the slug with `useParams`; `Link` navigates without a page reload; `lazy` + `Suspense` loads the project page only when needed.

## 4. Animation
- **Typewriter:** a timeout types or deletes one letter per tick, pauses on a full word, then moves to the next role.
- **Hero orbit:** CSS `@keyframes spin` rotates each ring; labels counter-rotate so text stays upright. Mouse position goes into Framer Motion `useMotionValue`, becomes springy `rotateX/rotateY`, giving a 3D tilt.
- **Skill bars/rings:** `whileInView` animates `scaleX` / `pathLength` once when scrolled into view.
- **Timeline line:** `useScroll` gives scroll progress, mapped to `scaleY` of the accent line.
- **Reduced motion:** `useReducedMotion` and a CSS media query switch decorative motion off.

## 5. Theme switching
`index.html` sets `data-theme` before React loads (no flash). CSS variables in `index.css` hold colours for each theme; Tailwind classes like `bg-bg` and `text-ink` read those variables. `ThemeContext` toggles the attribute and saves the choice in `localStorage`.

## 6. Contact form data flow
1. User submits -> client validates (same rules as server).
2. `fetch POST /api/contact` with JSON.
3. Express: helmet, CORS check, `express.json` (10 kb limit), rate limiter (5 per 15 min per IP).
4. Route: honeypot check -> server validation (400 + field errors) -> database connected? (else 503) -> `Contact.create()` -> 201.
5. Mongoose validates against the schema again and inserts into the `contacts` collection.
6. React shows success or the specific error.

## 7. Resume downloads
`GET /api/resume/:format` looks the format up in a whitelist object (`pdf`/`docx`), checks the file exists, sets the MIME type and calls `res.download` with a friendly filename (`Content-Disposition: attachment`). Because the URL only chooses a key, never a path, path traversal is impossible. The frontend fetches a blob and triggers a save, and shows an error if the server is down.

## 8. Security choices
helmet (security headers), CORS allow-list from env, body size limit, rate limiting, honeypot, server-side validation, `.env` git-ignored, no secrets in code, generic error messages in production.

## 9. Deployment
Atlas (DB) <- Render (Express, env vars set in dashboard) <- Vercel/Netlify (static build, `VITE_API_URL` baked in at build time). `CLIENT_ORIGINS` on the server must equal the frontend URL.

## 10. Likely viva questions

1. **What is the MERN stack?** MongoDB, Express.js, React, Node.js: JavaScript across database, server and UI.
2. **What is a SPA?** One HTML page; React swaps content on the client, so navigation has no full reload.
3. **Why React Router?** It maps URLs to components and handles navigation in a SPA (`/projects/:slug`).
4. **What does `useParams` do?** Reads dynamic URL parts, such as the project slug.
5. **`useState` vs `useEffect`?** State stores changing data; effects run side effects (timers, subscriptions) after render.
6. **Why a dependency array in `useEffect`?** It decides when the effect re-runs; cleanup prevents leaks.
7. **What is Context?** A way to share data (theme) with deep children without passing props at every level.
8. **What is a custom hook?** A function starting with `use` that reuses stateful logic, e.g. `useTypewriter`.
9. **What is Vite?** A fast dev server and bundler; `npm run build` produces optimized static files in `dist`.
10. **Why Tailwind?** Utility classes keep styling next to markup; theme colours come from CSS variables.
11. **How does dark/light mode work?** `data-theme` attribute on `<html>` switches CSS variable values; saved in localStorage.
12. **How is responsiveness done?** Tailwind breakpoints (`md:`, `lg:`), flex/grid, and `clamp()` for fluid type.
13. **What is Framer Motion?** An animation library; `whileInView`, `useScroll`, springs.
14. **How do you respect accessibility?** Semantic landmarks, labels, focus styles, skip link, `aria-*`, reduced-motion support.
15. **What is Express middleware?** A function `(req, res, next)` that runs between request and response (cors, json parser, rate limiter).
16. **Why does middleware order matter?** They run top to bottom; error handler must come last.
17. **What is CORS and why needed?** Browsers block cross-origin requests unless the server allows the origin; ours allows only `CLIENT_ORIGINS`.
18. **What is Mongoose?** An ODM that gives MongoDB schemas, validation and models.
19. **What is a schema vs model?** Schema defines fields and rules; model is the class used to create/query documents.
20. **Why validate on both client and server?** Client validation is for UX; the server must never trust the browser.
21. **What HTTP codes do you use?** 201 created, 400 invalid, 404 not found, 429 too many requests, 503 database unavailable, 500 server error.
22. **What is rate limiting?** Limits requests per IP to stop spam; ours allows 5 contact posts per 15 minutes.
23. **What is a honeypot field?** A hidden input that humans never fill; bots do, so we silently drop those.
24. **How are resume files served safely?** Whitelist lookup, existence check, fixed MIME and filename, no user-supplied paths.
25. **Why environment variables?** Keep secrets (MongoDB URI) out of Git and change config per environment.
26. **Why is `.env` in `.gitignore`?** Exposed credentials get abused and cost marks.
27. **Difference between `npm install` and `npm run build`?** Install downloads dependencies; build compiles the app for production.
28. **Why is `VITE_API_URL` needed in production?** The frontend and backend are on different domains; Vite inlines the value at build time.
29. **What happens if MongoDB is down?** API still serves health and resumes; contact returns 503 and the UI shows a friendly error.
30. **How would you add email notifications?** Install Nodemailer and call it after `Contact.create()` using SMTP credentials from env vars.
31. **Why separate `app.js` and `index.js`?** So tests can import the app without opening a DB connection or fixed port.
32. **What is `trust proxy`?** Behind Render's proxy it lets Express see the real client IP, which rate limiting needs.

## 11. Requirement checklist

Legend: **Tested** = actually run in my environment; **Code only** = implemented but needs your run; **Yours** = needs your action.

| Requirement | Where | Status |
|---|---|---|
| React + React Router (SPA) | `client/src/App.jsx`, `pages/` | Production build succeeds; all routes server-render without errors; not clicked in a real browser |
| Express REST backend | `server/src/` | Tested with curl and `npm test` (5/5) |
| MongoDB + Mongoose storage | `models/Contact.js`, `routes/contact.js` | Code only: no MongoDB available here, so a real insert was not run. Verified: returns 503 when DB is not connected |
| Hero, typewriter, CV button | `Hero.jsx`, `useTypewriter.js` | Rendered server-side; animation not viewed in a browser |
| About + photo + status | `About.jsx` | Placeholder photo until you add `public/profile.jpg` |
| Skills (grouped, animated, tooltips) | `Skills.jsx` | Levels are placeholders: Yours |
| 3+ projects, badges, GitHub + live links | `Projects.jsx`, `content.js` | GitHub/live URLs are empty: Yours |
| Tech filter (optional) | `Projects.jsx` | Code only |
| PDF + DOCX via Express | `routes/resume.js` | Tested: 200, correct MIME and filename, 404 for unknown/traversal |
| Timeline | `Timeline.jsx` | Add school entries: Yours |
| Certifications and achievements | `Certifications.jsx` | Placeholders until you add real ones: Yours |
| Contact form to Express to MongoDB | `Contact.jsx`, `routes/contact.js` | Validation (400), honeypot, rate limit (429), CORS (403), bad JSON (400) tested; DB write: Yours to confirm |
| Animations | Hero, Skills, Timeline | Code only |
| Responsive | Tailwind breakpoints | Code only: not tested on real devices |
| Dark/light toggle | `ThemeContext.jsx`, `index.css` | Code only |
| Deployment (Vercel/Netlify + Render/Railway) | README | Yours: no accounts used here, no live URLs exist yet |
| Env vars, `.env` ignored, README, `.gitignore` | `.env.example`, `.gitignore` | Done |
