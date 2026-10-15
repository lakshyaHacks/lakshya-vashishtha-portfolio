import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Section, { Reveal } from './Section.jsx';
import { API_URL } from '../hooks/useResumeDownload.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Same rules as the server (server/src/routes/contact.js). The server re-checks everything.
function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Enter your name (at least 2 characters).';
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter a valid email address.';
  if (v.message.trim().length < 10) e.message = 'Message must be at least 10 characters.';
  return e;
}

const field = 'w-full rounded-sm border bg-bg px-4 py-3 text-ink outline-none transition placeholder:text-muted/70 focus:border-accent';

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '', website: '' });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({ status: 'idle', message: '' }); // idle | sending | success | error

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setState({ status: 'sending', message: '' });
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 201) {
        setState({ status: 'success', message: data.message || 'Message received. Thank you!' });
        setValues({ name: '', email: '', message: '', website: '' });
      } else if (res.status === 400 && data.errors) {
        setErrors(data.errors);
        setState({ status: 'error', message: data.message || 'Please fix the highlighted fields.' });
      } else {
        setState({ status: 'error', message: data.message || 'Something went wrong. Please try again.' });
      }
    } catch {
      setState({ status: 'error', message: 'Could not reach the server. Check your connection and try again.' });
    }
  }

  const sending = state.status === 'sending';

  return (
    <Section id="contact" title="Let's talk." intro="Send me a message about an internship, a project or a question. It is stored securely and I will read it.">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="max-w-sm text-lg text-muted">
            Prefer the short version? Fill in your name, email and a few lines about what you have in mind.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="space-y-6 rounded-sm border border-line bg-surface/60 p-6 sm:p-8">
            {/* Honeypot: hidden from people, bots fill it in. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} /></label>
            </div>

            {[
              { name: 'name', label: 'Name', type: 'text', auto: 'name' },
              { name: 'email', label: 'Email', type: 'email', auto: 'email' },
            ].map((f) => (
              <div key={f.name}>
                <label htmlFor={f.name} className="mb-2 block text-sm font-medium">{f.label}</label>
                <input
                  id={f.name} name={f.name} type={f.type} autoComplete={f.auto}
                  value={values[f.name]} onChange={onChange} maxLength={f.name === 'name' ? 80 : 120}
                  aria-invalid={!!errors[f.name]} aria-describedby={errors[f.name] ? `${f.name}-err` : undefined}
                  className={`${field} ${errors[f.name] ? 'border-red-500' : 'border-line'}`}
                />
                {errors[f.name] && <p id={`${f.name}-err`} className="mt-1.5 text-sm text-red-500">{errors[f.name]}</p>}
              </div>
            ))}

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">Message</label>
              <textarea
                id="message" name="message" rows={5} value={values.message} onChange={onChange} maxLength={2000}
                aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-err' : undefined}
                className={`${field} resize-y ${errors.message ? 'border-red-500' : 'border-line'}`}
              />
              <div className="mt-1.5 flex justify-between text-sm">
                <span id="message-err" className="text-red-500">{errors.message}</span>
                <span className="text-muted">{values.message.length}/2000</span>
              </div>
            </div>

            <button type="submit" disabled={sending} className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-onaccent transition hover:brightness-110 disabled:opacity-60">
              {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              {sending ? 'Sending...' : 'Send message'}
            </button>

            <div aria-live="polite">
              {state.status === 'success' && (
                <p className="flex items-center gap-2 text-sm text-accent"><CheckCircle2 size={18} /> {state.message}</p>
              )}
              {state.status === 'error' && (
                <p role="alert" className="flex items-center gap-2 text-sm text-red-500"><AlertCircle size={18} /> {state.message}</p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
