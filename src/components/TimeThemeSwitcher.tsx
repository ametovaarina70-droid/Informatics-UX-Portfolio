import { Clock, Moon, Sun } from 'lucide-react';
import { SiteTranslation } from '../data/translations';
import { TimePhase, TimeThemePreference, getTimeThemeInfo } from '../utils/timeTheme';

interface TimeThemeSwitcherProps {
  preference: TimeThemePreference;
  activePhase: TimePhase;
  onChange: (pref: TimeThemePreference) => void;
  t: SiteTranslation['theme'];
}

export function TimeThemeSwitcher({
  preference,
  activePhase,
  onChange,
  t,
}: TimeThemeSwitcherProps) {
  const activePhaseLabel = t.phaseLabels[activePhase];

  const options: { id: TimeThemePreference; label: string }[] = [
    { id: 'auto', label: t.auto },
    { id: 'day', label: t.day },
    { id: 'night', label: t.night },
  ];

  const renderIcon = (id: TimeThemePreference) => {
    switch (id) {
      case 'auto':
        return <Clock className="w-4 h-4" />;
      case 'day':
        return <Sun className="w-4 h-4" />;
      case 'night':
        return <Moon className="w-4 h-4" />;
    }
  };

  return (
    <div
      role="group"
      aria-label={t.groupAriaLabel}
      className="inline-flex items-center gap-1 p-1 rounded-full bg-[var(--bg-surface-alt)] border border-[var(--border-subtle)]"
    >
      {options.map((opt) => {
        const isActive = preference === opt.id;
        const tooltip =
          opt.id === 'auto'
            ? `${t.auto} · ${activePhaseLabel}`
            : `${t.phaseLabels[opt.id]} (${getTimeThemeInfo(opt.id).rangeLabel})`;

        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            aria-pressed={isActive}
            aria-label={tooltip}
            title={tooltip}
            className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
              isActive
                ? 'bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {renderIcon(opt.id)}
          </button>
        );
      })}
    </div>
  );
}
