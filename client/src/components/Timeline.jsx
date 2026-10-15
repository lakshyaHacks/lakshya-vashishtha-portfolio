import { useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { GraduationCap, Briefcase } from 'lucide-react';
import Section from './Section.jsx';
import { timeline } from '../data/content.js';

export default function Timeline() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  // The accent line grows as the section scrolls through the viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <Section id="journey" title="Where I have been." intro="Education and experience, newest first.">
      <ol ref={ref} className="relative ml-4 max-w-3xl border-l border-line pl-10 sm:ml-6">
        <motion.span aria-hidden="true" style={reduce ? { scaleY: 1 } : { scaleY }} className="absolute -left-px top-0 h-full w-px origin-top bg-accent" />
        {timeline.map((t) => {
          const Icon = t.kind === 'education' ? GraduationCap : Briefcase;
          return (
            <motion.li
              key={t.title}
              className="relative pb-14 last:pb-0"
              initial={reduce ? false : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <span className="absolute -left-[3.35rem] top-0 grid h-9 w-9 place-items-center rounded-full border border-accent bg-bg text-accent">
                <Icon size={16} />
              </span>
              <p className="font-mono text-sm text-accent">{t.period}</p>
              <h3 className="mt-1 font-display text-3xl">{t.title}</h3>
              <p className="mt-1 font-medium">{t.org}</p>
              {t.text && <p className="mt-3 text-muted">{t.text}</p>}
            </motion.li>
          );
        })}
      </ol>
    </Section>
  );
}
