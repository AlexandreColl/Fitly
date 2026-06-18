import { useEffect } from 'react';
import { useSettings } from './useSettings';

export function useTheme() {
  const { settings } = useSettings();

  useEffect(() => {
    const root = document.documentElement;

    if (settings.theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else if (settings.theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      const mq = window.matchMedia('(prefers-color-scheme: light)');
      root.classList.toggle('light', mq.matches);
      root.classList.toggle('dark', !mq.matches);
      const handler = (e: MediaQueryListEvent) => {
        root.classList.toggle('light', e.matches);
        root.classList.toggle('dark', !e.matches);
      };
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, [settings.theme]);
}
