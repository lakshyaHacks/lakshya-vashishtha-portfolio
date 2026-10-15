import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { profile } from '../data/content.js';
import { useTypewriter } from '../hooks/useTypewriter.js';
import ResumeButtons from './ResumeButtons.jsx';

// The orbit shows the four MERN technologies circling a monogram core.
// ring = size (inset %), dur = seconds per turn, nodes = labels pinned to the ring.
const RINGS = [
  { inset: '30%', dur: 30, nodes: [{ label: 'React', left: '50%', top: '0%' }] },
  { inset: '15%', dur: 46, nodes: [{ label: 'Node.js', left: '50%', top: '0%' }, { label: 'Express', left: '50%', top: '100%' }] },
  { inset: '0%', dur: 70, nodes: [{ label: 'MongoDB', left: '0%', top: '50%' }] },
];

function Orbit() {
  return (
    <div className="relative aspect-square w-full max-w-[520px]" aria-hidden="true">
      {RINGS.map((r) => (
        <div key={r.inset} className="ring" style={{ inset: r.inset, '--dur': `${r.dur}s` }}>
          {r.nodes.map((n) => (
            <div key={n.label} className="ring-node" style={{ left: n.left, top: n.top }}>
              <span className="whitespace-nowrap rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink shadow-sm">
                <i className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
                {n.label}
              </span>
            </div>
          ))}
        </div>
      ))}
      <div className="absolute inset-[42%] grid place-items-center rounded-full border border-accent/60 bg-surface">
        <span className="core-pulse absolute inset-[-14%] rounded-full border border-accent/40" />
        <span className="font-display text-3xl text-accent md:text-4xl">LV</span>
      </div>
    </div>
  );
}

const line = { hidden: { y: '110%' }, show: { y: 0 } };

export default function Hero() {
  const reduce = useReducedMotion();
  const role = useTypewriter(profile.roles);
  const ref = useRef(null);

  // Pointer position (-1..1) drives a springy 3D tilt of the orbit and a soft glow behind it.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 70, damping: 16 });
  const rotateX = useSpring(useTransform(my, [-1, 1], [12, -12]), { stiffness: 70, damping: 16 });

  function onPointerMove(e) {
    if (reduce || e.pointerType === 'touch' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    mx.set(x * 2 - 1);
    my.set(y * 2 - 1);
    ref.current.style.setProperty('--mx', `${x * 100}%`);
    ref.current.style.setProperty('--my', `${y * 100}%`);
  }

  const init = reduce ? false : 'hidden';

  return (
    <section ref={ref} onPointerMove={onPointerMove} aria-label="Introduction" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div className="pointer-glow absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-6 pb-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mb-6 font-mono text-sm text-muted"
          >
            {profile.status} at {profile.university}, {profile.location}
          </motion.p>

          <h1 className="font-display text-[clamp(3.25rem,10vw,8.5rem)] leading-[0.92] tracking-tight">
            <span className="block overflow-hidden pb-2">
              <motion.span className="block" variants={line} initial={init} animate="show" transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>
                {profile.firstName}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span className="block text-accent" variants={line} initial={init} animate="show" transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}>
                {profile.lastName}
              </motion.span>
            </span>
          </h1>

          <p className="mt-6 h-9 text-2xl text-ink" aria-live="off">
            <span className="sr-only">{profile.roles.join(', ')}</span>
            <span aria-hidden="true">
              {role}
              <span className="caret ml-0.5 inline-block h-6 w-0.5 translate-y-1 bg-accent" />
            </span>
          </p>
          <p className="mt-4 max-w-xl text-lg text-muted">{profile.tagline}</p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-10 flex flex-col gap-5"
          >
            <div>
              <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-onaccent transition hover:brightness-110">
                Explore My Work <ArrowDown size={18} />
              </a>
            </div>
            <ResumeButtons />
          </motion.div>
        </div>

        <div className="flex justify-center [perspective:1100px]">
          <motion.div style={reduce ? undefined : { rotateX, rotateY }} className="w-full max-w-[520px] [transform-style:preserve-3d]">
            <Orbit />
          </motion.div>
        </div>
      </div>

      <a href="#about" aria-label="Scroll to About" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted sm:flex">
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-accent" />
        </span>
      </a>
    </section>
  );
}
