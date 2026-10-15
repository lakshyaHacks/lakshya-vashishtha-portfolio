import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { projects } from '../data/content.js';
import ProjectPreview from '../components/ProjectPreview.jsx';
import LinkButton from '../components/LinkButton.jsx';
import NotFound from './NotFound.jsx';

// Route: /projects/:slug  (useParams reads the slug from the URL)
export default function ProjectPage() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  const d = p.details;

  return (
    <article className="mx-auto max-w-5xl px-6 pb-24 pt-32">
      <Link to={{ pathname: '/', hash: '#projects' }} className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent">
        <ArrowLeft size={16} /> All projects
      </Link>

      <p className="mt-10 text-muted">{p.kind}</p>
      <h1 className="mt-2 font-display text-5xl leading-tight md:text-7xl">{p.title}</h1>
      <p className="mt-6 max-w-2xl text-xl text-muted">{p.description}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <LinkButton href={p.github} kind="github">GitHub</LinkButton>
        {p.live !== undefined && <LinkButton href={p.live} kind="live">Live demo</LinkButton>}
      </div>

      <div className="mt-12 h-[320px] rounded-sm border border-line bg-surface/60 p-5 md:h-[420px]">
        <ProjectPreview type={p.preview} />
      </div>

      <div className="mt-16 grid gap-12 md:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="font-display text-3xl">Stack</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.tech.map((t) => <li key={t} className="rounded-full border border-line px-3 py-1 text-sm">{t}</li>)}
          </ul>
          <h2 className="mt-10 font-display text-3xl">My role</h2>
          <p className="mt-3 text-muted">{d.role}</p>
        </div>
        <div className="space-y-12">
          <section>
            <h2 className="font-display text-3xl">What I built</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-lg marker:text-accent">
              {d.built.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-3xl">The hard part</h2>
            <p className="mt-4 text-lg">{d.challenge}</p>
          </section>
          <section>
            <h2 className="font-display text-3xl">What I learned</h2>
            <p className="mt-4 text-lg">{d.learned}</p>
          </section>
        </div>
      </div>
    </article>
  );
}
