import { Github, Linkedin } from 'lucide-react';
import { profile } from '../data/content.js';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center">
        <p>&copy; {new Date().getFullYear()} {profile.name}. Built with MongoDB, Express, React and Node.js.</p>
        <div className="flex items-center gap-4">
          {profile.github && <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="hover:text-accent"><Github size={18} /></a>}
          {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="hover:text-accent"><Linkedin size={18} /></a>}
          {profile.email && <a href={`mailto:${profile.email}`} className="hover:text-accent">{profile.email}</a>}
        </div>
      </div>
    </footer>
  );
}
