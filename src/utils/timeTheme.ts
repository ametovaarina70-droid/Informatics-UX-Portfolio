export type TimePhase = 'day' | 'night';
export type TimeThemePreference = 'auto' | TimePhase;

export interface TimeThemeInfo {
  phase: TimePhase;
  label: string;
  rangeLabel: string;
  isDark: boolean;
}

export function resolveTimePhaseFromHour(hour: number): TimePhase {
  return hour >= 6 && hour < 19 ? 'day' : 'night';
}

export function getTimeThemeInfo(phase: TimePhase): TimeThemeInfo {
  switch (phase) {
    case 'day':
      return {
        phase: 'day',
        label: 'Daylight',
        rangeLabel: '06:00–19:00',
        isDark: false,
      };
    case 'night':
      return {
        phase: 'night',
        label: 'Night',
        rangeLabel: '19:00–06:00',
        isDark: true,
      };
  }
}

export function applyTimePhaseToDocument(phase: TimePhase): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.setAttribute('data-time-theme', phase);
  if (phase === 'day') {
    root.classList.remove('dark');
  } else {
    root.classList.add('dark');
  }
}
