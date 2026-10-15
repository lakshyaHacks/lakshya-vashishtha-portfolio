import { Award, ExternalLink, Trophy } from 'lucide-react';
import Section, { Reveal } from './Section.jsx';
import { certificates, achievements } from '../data/content.js';

function CertCard({ c }) {
  if (c.placeholder) {
    return (
      <li className="flex min-h-[150px] flex-col justify-center rounded-sm border border-dashed border-line p-6 text-muted">
        <Award size={20} className="mb-3" />
        <p className="font-medium">{c.title}</p>
        <p className="mt-1 text-sm">Edit client/src/data/content.js to add a real certificate from {c.platform}.</p>
      </li>
    );
  }
  return (
    <li className="flex flex-col rounded-sm border border-line bg-surface/60 p-6">
      {c.image && <img src={c.image} alt={`${c.title} certificate`} loading="lazy" className="mb-4 aspect-[4/3] w-full rounded object-cover" />}
      <Award size={20} className="mb-3 text-accent" />
      <p className="text-sm text-muted">{c.platform}{c.year ? `, ${c.year}` : ''}</p>
      <h3 className="mt-1 font-display text-2xl">{c.title}</h3>
      {c.url && (
        <a href={c.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
          View certificate <ExternalLink size={14} />
        </a>
      )}
    </li>
  );
}

export default function Certifications() {
  return (
    <Section id="achievements" title="Certificates & achievements." className="bg-surface/40">
      <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
        <Reveal>
          <ul className="grid gap-5 sm:grid-cols-2">
            {certificates.map((c, i) => <CertCard key={c.title + i} c={c} />)}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <h3 className="mb-5 font-display text-3xl">Achievements</h3>
          <ul className="space-y-6">
            {achievements.map((a) => (
              <li key={a.title} className="flex gap-4">
                <Trophy size={20} className="mt-1 shrink-0 text-accent" />
                <div>
                  <p className="font-semibold">{a.title}</p>
                  <p className="mt-1 text-muted">{a.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
