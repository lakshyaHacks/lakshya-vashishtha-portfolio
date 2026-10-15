import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// After every navigation: jump to the #section if there is one, otherwise to the top.
export default function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      // wait one frame so the target exists after a route change
      const raf = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
      return () => cancelAnimationFrame(raf);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);
  return null;
}
