import { Download, Loader2 } from 'lucide-react';
import { useResumeDownload } from '../hooks/useResumeDownload.js';

// Two download buttons backed by GET /api/resume/pdf and /api/resume/docx on the Express server.
export default function ResumeButtons({ align = 'start' }) {
  const { download, busy, error } = useResumeDownload();
  const base = 'inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition disabled:opacity-60';
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      <div className={`flex flex-wrap gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
        <button type="button" onClick={() => download('pdf')} disabled={!!busy} className={`${base} border border-accent text-accent hover:bg-accent hover:text-onaccent`}>
          {busy === 'pdf' ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} Download Resume (PDF)
        </button>
        <button type="button" onClick={() => download('docx')} disabled={!!busy} className={`${base} border border-line text-ink hover:border-accent hover:text-accent`}>
          {busy === 'docx' ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} Word (.docx)
        </button>
      </div>
      {error && <p role="alert" className="mt-3 text-sm text-red-500">{error}</p>}
    </div>
  );
}
