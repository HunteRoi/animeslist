import { useEffect, useState } from 'react';

export const useDarkMode = () => {
  const [theme, setTheme] = useState('light');
  const [themeMounted, setThemeMounted] = useState(false);
  const setMode = (mode: string) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
      document.body.classList.add('bootstrap-dark');
    } else {
      setMode('light');
      document.body.classList.remove('bootstrap-dark');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark').matches && !localTheme) setMode('dark');
    else if (localTheme) setTheme(localTheme);
    else setMode('light');

    setThemeMounted(true);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('bootstrap-dark');
    } else {
      document.body.classList.remove('bootstrap-dark');
    }
  }, [theme]);

  return [theme, toggleTheme, themeMounted] as const;
};
