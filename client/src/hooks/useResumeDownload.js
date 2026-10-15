import { useState } from 'react';

export const API_URL = import.meta.env.VITE_API_URL || '';

// Fetches the file from Express, then triggers a browser save. Shows an error if the backend is down.
export function useResumeDownload() {
  const [busy, setBusy] = useState(null); // 'pdf' | 'docx' | null
  const [error, setError] = useState('');

  async function download(format) {
    setBusy(format);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/resume/${format}`);
      if (!res.ok) throw new Error('not ok');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Lakshya_Vashishtha_Resume.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError('Could not download the resume right now. Please try again in a moment.');
    } finally {
      setBusy(null);
    }
  }
  return { download, busy, error };
}
