import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { prefersReducedMotion } from '../utils/webglUtils';

interface BackToTopButtonProps {
  label: string;
  thresholdPx?: number;
}

export function BackToTopButton({ label, thresholdPx = 320 }: BackToTopButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setVisible(window.scrollY > thresholdPx);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, [thresholdPx]);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={handleScrollTop}
      aria-label={label}
      title={label}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-cyan-500/60 text-slate-800 dark:text-cyan-300 hover:text-cyan-600 dark:hover:text-cyan-200 shadow-xl flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto hover:-translate-y-0.5'
          : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
