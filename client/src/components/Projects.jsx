import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Section from './Section.jsx';
import ProjectPreview from './ProjectPreview.jsx';
import LinkButton from './LinkButton.jsx';
import { projects } from '../data/content.js';

function ProjectCard({ p }) {
  const wide = p.featured;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35 }}
      className={`group overflow-hidden rounded-sm border border-line bg-surface/60 transition-colors hover:border-accent/60 ${wide ? 'lg:col-span-2 lg:grid lg:grid-cols-[1.1fr_0.9fr]' : ''}`}
    >
      <Link to={`/projects/${p.slug}`} tabIndex={-1} aria-hidden="true" className="block border-b border-line p-5 transition-transform duration-500 group-hover:[&>div]:-translate-y-1 lg:border-b-0 lg:border-r">
        <div className="transition-transform duration-500">
          <ProjectPreview type={p.preview} />
        </div>
      </Link>

      <div className="flex flex-col p-7">
        <p className="text-sm text-muted">{p.kind}</p>
        <h3 className="mt-1 font-display text-3xl leading-tight">{p.title}</h3>
        <p className="mt-4 text-muted">{p.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {p.tech.map((t) => (
            <li key={t} className="rounded-full border border-line px-3 py-1 text-xs">{t}</li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
          <LinkButton href={p.github} kind="github">GitHub</LinkButton>
          {p.live !== undefined && <LinkButton href={p.live} kind="live">Live demo</LinkButton>}
          <Link to={`/projects/${p.slug}`} className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
            Case study <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const techs = useMemo(() => ['All', ...Array.from(new Set(projects.flatMap((p) => p.tech)))], []);
  const shown = filter === 'All' ? projects : projects.filter((p) => p.tech.includes(filter));

  return (
    <Section id="projects" title="Selected work." intro="Each project has its own case study page. Filter by technology to see where I have used it.">
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by technology">
        {techs.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={filter === t}
            onClick={() => setFilter(t)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${filter === t ? 'border-accent bg-accent text-onaccent' : 'border-line text-muted hover:border-accent hover:text-ink'}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => <ProjectCard key={p.slug} p={p} />)}
        </AnimatePresence>
      </div>
      <p className="sr-only" role="status">{shown.length} projects shown</p>
    </Section>
  );
}
