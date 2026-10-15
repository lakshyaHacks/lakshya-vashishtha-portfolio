import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// In development, /api/* is forwarded to the Express server, so the browser
// sees one origin and CORS is not involved.
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:5000' } },
});
