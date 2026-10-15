import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle.jsx';
import { navItems, profile } from '../data/content.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const { pathname } = useLocation();
  const onHome = pathname === '/';

  // Close the mobile menu when the route changes or Escape is pressed.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Highlight the link of the section currently in view (home page only).
  useEffect(() => {
    if (!onHome) { setActive(''); return undefined; }
    const els = navItems.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome]);

  const linkClass = (id) =>
    `rounded px-3 py-2 text-sm transition ${active === id ? 'text-accent' : 'text-muted hover:text-ink'}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-bg/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3" aria-label={`${profile.name}, home`}>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-accent/60 font-display text-lg text-accent">LV</span>
          <span className="hidden font-display text-xl sm:block">{profile.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navItems.map((n) => (
            <Link key={n.id} to={{ pathname: '/', hash: `#${n.id}` }} className={linkClass(n.id)} aria-current={active === n.id ? 'true' : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line/60 bg-bg px-6 pb-4 pt-2 md:hidden">
          <ul className="flex flex-col">
            {navItems.map((n) => (
              <li key={n.id}>
                <Link to={{ pathname: '/', hash: `#${n.id}` }} className="block py-3 text-lg text-ink">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
