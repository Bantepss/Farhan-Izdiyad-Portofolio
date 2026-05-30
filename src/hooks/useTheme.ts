import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
    return 'dark';
  }
  return 'light';
}

/**
 * Hook tema light/dark. Kelas `.dark` ditempel ke <html> dan dipersist ke
 * localStorage. Pemasangan awal class sudah dilakukan oleh inline script di
 * index.html agar tidak ada kedip (FOUC) sebelum React mount.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* abaikan: localStorage bisa diblok di mode privat */
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme };
}
