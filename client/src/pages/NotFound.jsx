import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <h1 className="font-display text-7xl">404</h1>
        <p className="mt-4 text-muted">This page does not exist.</p>
        <Link to="/" className="mt-8 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-onaccent">Back to the portfolio</Link>
      </div>
    </section>
  );
}
