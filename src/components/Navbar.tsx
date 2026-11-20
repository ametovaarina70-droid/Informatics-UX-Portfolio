import { useState } from 'react';
import { Menu, Terminal, X } from 'lucide-react';
import { NavRoute, PROFILE } from '../data/portfolioData';
import { SiteTranslation } from '../data/translations';
import { TimePhase, TimeThemePreference } from '../utils/timeTheme';
import { TimeThemeSwitcher } from './TimeThemeSwitcher';

interface NavbarProps {
  activeRoute: NavRoute;
  onNavigate: (route: NavRoute) => void;
  timePreference: TimeThemePreference;
  activePhase: TimePhase;
  onChangeTimePreference: (pref: TimeThemePreference) => void;
  t: SiteTranslation;
}

const NAV_ROUTE_IDS: NavRoute[] = ['index', 'education', 'projects', 'contact'];

export function Navbar({
  activeRoute,
  onNavigate,
  timePreference,
  activePhase,
  onChangeTimePreference,
  t,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (route: NavRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-nav)] backdrop-blur-xl border-b border-[var(--border-subtle)] transition-colors duration-300">
      <div className="h-16 sm:h-20 max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('index')}
          className="text-lg font-display font-bold tracking-tight text-slate-900 dark:text-[var(--text-primary)] hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-md px-1 py-0.5 cursor-pointer"
        >
          {PROFILE.name}
        </button>

        {/* Zone 2: Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-1 bg-[var(--bg-surface-alt)] border border-[var(--border-subtle)] p-1.5 rounded-full"
        >
          {NAV_ROUTE_IDS.map((routeId) => {
            const isActive = activeRoute === routeId;
            return (
              <button
                key={routeId}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handleNavClick(routeId)}
                className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                  isActive
                    ? 'bg-cyan-600/15 dark:bg-cyan-950/70 text-cyan-700 dark:text-cyan-300 border border-cyan-600/35 dark:border-cyan-500/35 font-semibold'
                    : 'text-slate-600 dark:text-[var(--text-muted)] hover:text-slate-900 dark:hover:text-[var(--text-primary)] hover:bg-slate-200/70 dark:hover:bg-white/10 border border-transparent'
                }`}
              >
                {t.nav[routeId]}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Day/Night Switcher + GitHub + Mobile Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="hidden sm:flex items-center">
            <TimeThemeSwitcher
              preference={timePreference}
              activePhase={activePhase}
              onChange={onChangeTimePreference}
              t={t.theme}
            />
          </div>

          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[var(--bg-surface-card)] border border-[var(--border-subtle)] hover:border-cyan-600/50 dark:hover:border-cyan-500/50 text-slate-800 dark:text-[var(--text-primary)] hover:text-cyan-700 dark:hover:text-cyan-300 font-mono text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>GitHub</span>
          </a>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--bg-surface-card)] border border-[var(--border-subtle)] text-slate-800 dark:text-[var(--text-primary)] hover:border-cyan-500/50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-4 space-y-2.5">
          {NAV_ROUTE_IDS.map((routeId) => {
            const isActive = activeRoute === routeId;
            return (
              <button
                key={routeId}
                type="button"
                onClick={() => handleNavClick(routeId)}
                className={`w-full text-left px-4 py-2.5 rounded-lg font-mono text-sm transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-cyan-600/15 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 font-medium'
                    : 'text-slate-700 dark:text-[var(--text-secondary)] hover:bg-slate-200/60 dark:hover:bg-white/10'
                }`}
              >
                {t.nav[routeId]}
              </button>
            );
          })}

          <div className="sm:hidden pt-1">
            <TimeThemeSwitcher
              preference={timePreference}
              activePhase={activePhase}
              onChange={onChangeTimePreference}
              t={t.theme}
            />
          </div>

          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-sm text-slate-700 dark:text-[var(--text-secondary)] hover:bg-slate-200/60 dark:hover:bg-white/10 border border-[var(--border-subtle)]"
          >
            <Terminal className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>{t.navBrowseGithub}</span>
          </a>
        </div>
      )}
    </header>
  );
}
