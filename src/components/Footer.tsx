import { LANGUAGES, NavRoute, PROFILE } from '../data/portfolioData';
import { SiteLanguage, SiteTranslation } from '../data/translations';

interface FooterProps {
  onNavigate: (route: NavRoute) => void;
  siteLanguage: SiteLanguage;
  onChangeLanguage: (lang: SiteLanguage) => void;
  t: SiteTranslation;
}

export function Footer({ onNavigate, siteLanguage, onChangeLanguage, t }: FooterProps) {
  return (
    <footer className="w-full bg-[var(--bg-footer)] border-t border-[var(--border-subtle)] py-8 transition-colors duration-300">
      <div className="max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-600 dark:text-[var(--text-muted)]">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate('index')}
            className="font-display font-semibold text-slate-900 dark:text-[var(--text-primary)] text-sm hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors cursor-pointer"
          >
            {PROFILE.name}
          </button>
          <span aria-hidden="true">·</span>
          <span>{t.footer.affiliation}</span>
          <span aria-hidden="true">·</span>
          <span className="text-cyan-700 dark:text-cyan-300">{t.footer.discipline}</span>
        </div>

        {/* Quick Language Switcher */}
        <div
          role="group"
          aria-label={t.footer.languageLabel}
          className="inline-flex items-center gap-0.5 p-1 rounded-full bg-[var(--bg-surface-alt)] border border-[var(--border-subtle)]"
        >
          {LANGUAGES.map((lang) => {
            const isSelected = siteLanguage === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => onChangeLanguage(lang.code)}
                aria-pressed={isSelected}
                title={t.languageCards[lang.code].name}
                className={`px-2.5 py-1 rounded-full font-mono text-[11px] uppercase transition-colors cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950 font-semibold'
                    : 'text-slate-600 dark:text-[var(--text-muted)] hover:text-slate-900 dark:hover:text-[var(--text-primary)]'
                }`}
              >
                {lang.code}
              </button>
            );
          })}
        </div>

        <span className="text-slate-500 dark:text-[var(--text-muted)] text-center md:text-right">
          {t.footer.copyright}
        </span>
      </div>
    </footer>
  );
}
