import { motion, useReducedMotion } from 'framer-motion';
import Section from './Section.jsx';
import { skillGroups, levelLabel } from '../data/content.js';

// Tooltip appears on hover AND keyboard focus (the row is focusable).
function Tip({ skill }) {
  return (
    <span role="tooltip" className="pointer-events-none absolute -top-9 right-0 z-10 whitespace-nowrap rounded border border-line bg-surface px-2.5 py-1 text-xs opacity-0 shadow transition group-hover:opacity-100 group-focus:opacity-100">
      {levelLabel(skill.level)} &middot; {skill.level}%
    </span>
  );
}

function SkillBar({ skill }) {
  const reduce = useReducedMotion();
  return (
    <li className="group relative rounded outline-offset-8" tabIndex={0}>
      <Tip skill={skill} />
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium">{skill.name}</span>
        <span className="text-muted">{skill.level}%</span>
      </div>
      <div role="meter" aria-label={skill.name} aria-valuemin={0} aria-valuemax={100} aria-valuenow={skill.level} className="h-1.5 overflow-hidden rounded-full bg-line">
        <motion.div
          className="h-full origin-left rounded-full bg-accent"
          style={{ width: `${skill.level}%` }}
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </li>
  );
}

function SkillRing({ skill }) {
  const reduce = useReducedMotion();
  return (
    <li className="group relative flex flex-col items-center gap-2 rounded text-center outline-offset-8" tabIndex={0}>
      <Tip skill={skill} />
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90" role="meter" aria-label={skill.name} aria-valuemin={0} aria-valuemax={100} aria-valuenow={skill.level}>
          <circle cx="40" cy="40" r="34" fill="none" strokeWidth="5" className="stroke-line" />
          <motion.circle
            cx="40" cy="40" r="34" fill="none" strokeWidth="5" strokeLinecap="round" className="stroke-accent"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: skill.level / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-sm font-semibold">{skill.level}%</span>
      </div>
      <span className="text-sm font-medium">{skill.name}</span>
    </li>
  );
}

export default function Skills() {
  return (
    <Section id="skills" title="What I build with." intro="Hover or focus a skill to see its level. Bars and rings fill when they scroll into view." className="bg-surface/40">
      <div className="grid gap-8 lg:grid-cols-3">
        {skillGroups.map((g) => (
          <div key={g.id} className="rounded-sm border border-line bg-surface/60 p-7">
            <h3 className="mb-7 font-display text-3xl">{g.title}</h3>
            {g.style === 'rings' ? (
              <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-2">
                {g.skills.map((s) => <SkillRing key={s.name} skill={s} />)}
              </ul>
            ) : (
              <ul className="space-y-6">
                {g.skills.map((s) => <SkillBar key={s.name} skill={s} />)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
