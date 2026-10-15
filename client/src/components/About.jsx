import { MapPin, GraduationCap, Code2 } from 'lucide-react';
import Section, { Reveal } from './Section.jsx';
import { profile } from '../data/content.js';

export default function About() {
  const facts = [
    { icon: MapPin, label: 'Location', value: profile.location },
    { icon: GraduationCap, label: 'Current status', value: `${profile.status}, ${profile.university}` },
    { icon: Code2, label: 'Focus', value: 'MERN stack development and Python research' },
  ];
  return (
    <Section id="about" title="A student who ships.">
      <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <figure className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 rounded-sm border border-accent/40" aria-hidden="true" />
            <img
              src={profile.photo}
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/profile-placeholder.svg'; }}
              alt={`Portrait of ${profile.name}`}
              width="400"
              height="500"
              loading="lazy"
              className="relative aspect-[4/5] w-full rounded-sm object-cover"
            />
          </figure>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-5 text-lg leading-relaxed">
            {profile.bio.map((p) => <p key={p}>{p}</p>)}
            <p className="text-muted">{profile.goals}</p>
          </div>
          <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <dt className="mb-1 flex items-center gap-2 text-sm text-muted"><Icon size={16} className="text-accent" /> {label}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
