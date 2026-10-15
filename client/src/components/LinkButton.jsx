import { ExternalLink, Github } from 'lucide-react';

// Real link when a URL exists; otherwise a clearly disabled label (never a fake link).
export default function LinkButton({ href, kind, children }) {
  const Icon = kind === 'github' ? Github : ExternalLink;
  const cls = 'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition';
  if (!href) {
    return (
      <span aria-disabled="true" title="Link not added yet" className={`${cls} cursor-not-allowed border-dashed border-line text-muted`}>
        <Icon size={15} /> {children}: not added
      </span>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${cls} border-line hover:border-accent hover:text-accent`}>
      <Icon size={15} /> {children}
    </a>
  );
}
