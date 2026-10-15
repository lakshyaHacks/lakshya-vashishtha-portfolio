const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const contactRoutes = require('./routes/contact');
const resumeRoutes = require('./routes/resume');
const { notFound, errorHandler } = require('./middleware/errorHandler');

function createApp() {
  const app = express();

  // Render/Railway sit behind a proxy; needed so rate limiting sees the real client IP.
  app.set('trust proxy', 1);

  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

  const allowed = (process.env.CLIENT_ORIGINS || 'http://localhost:5173')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin(origin, cb) {
        // no Origin header = curl / server-to-server, allow
        if (!origin || allowed.includes(origin)) return cb(null, true);
        cb(new Error(`CORS: origin ${origin} is not allowed`));
      },
      exposedHeaders: ['Content-Disposition'],
    })
  );

  app.use(express.json({ limit: '10kb' }));

  app.get('/api/health', (req, res) => {
    const mongoose = require('mongoose');
    res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
  });

  app.use('/api/contact', contactRoutes);
  app.use('/api/resume', resumeRoutes);

  app.use(notFound);
  app.use(errorHandler);
  return app;
}

module.exports = createApp;
