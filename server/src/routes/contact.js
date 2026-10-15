const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const Contact = require('../models/Contact');

const router = express.Router();

// Abuse protection: max 5 submissions per IP per 15 minutes.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many messages sent. Please try again in a few minutes.' },
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Server-side validation (never trust the browser). Returns { errors, clean }.
function validate(body = {}) {
  const clean = {
    name: typeof body.name === 'string' ? body.name.trim() : '',
    email: typeof body.email === 'string' ? body.email.trim().toLowerCase() : '',
    message: typeof body.message === 'string' ? body.message.trim() : '',
  };
  const errors = {};
  if (clean.name.length < 2 || clean.name.length > 80) errors.name = 'Name must be 2-80 characters.';
  if (!EMAIL_RE.test(clean.email) || clean.email.length > 120) errors.email = 'Enter a valid email address.';
  if (clean.message.length < 10 || clean.message.length > 2000) errors.message = 'Message must be 10-2000 characters.';
  return { errors, clean };
}

router.post('/', contactLimiter, async (req, res, next) => {
  try {
    // Honeypot: real users never fill this hidden field, bots do.
    // Reply 201 so bots think it worked, but store nothing.
    if (req.body && req.body.website) {
      return res.status(201).json({ success: true, message: 'Message received.' });
    }

    const { errors, clean } = validate(req.body);
    if (Object.keys(errors).length) {
      return res.status(400).json({ success: false, message: 'Please fix the highlighted fields.', errors });
    }

    // readyState 1 = connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, message: 'Message service is temporarily unavailable. Please try again later.' });
    }

    await Contact.create(clean);
    return res.status(201).json({ success: true, message: 'Message received. Thank you!' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
module.exports.validate = validate;
