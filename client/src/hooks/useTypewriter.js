import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// Types a word, pauses, deletes it, moves to the next. Static text if reduced motion.
export function useTypewriter(words, { type = 80, erase = 40, hold = 1400 } = {}) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return undefined;
    const word = words[i % words.length];
    let delay = deleting ? erase : type;
    if (!deleting && text === word) delay = hold;
    const id = setTimeout(() => {
      if (!deleting && text === word) return setDeleting(true);
      if (deleting && text === '') {
        setDeleting(false);
        return setI((n) => n + 1);
      }
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, i, words, reduce, type, erase, hold]);

  return reduce ? words[0] : text;
}
