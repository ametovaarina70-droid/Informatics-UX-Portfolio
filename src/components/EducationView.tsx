import { Check, Languages, MapPin } from 'lucide-react';
import { EDUCATION_ENTRIES, LANGUAGES, NavRoute } from '../data/portfolioData';
import { SiteLanguage, SiteTranslation } from '../data/translations';
import { MobilityGlobe3D } from './MobilityGlobe3D';
import { TiltCard3D } from './TiltCard3D';

interface EducationViewProps {
  onNavigate?: (route: NavRoute) => void;
  siteLanguage: SiteLanguage;
  onChangeLanguage: (lang: SiteLanguage) => void;
  t: SiteTranslation;
}

export function EducationView({
  siteLanguage,
  onChangeLanguage,
  t,
}: EducationViewProps) {
  return (
    <div className="flex flex-col w-full">
      {/* Clean Page Header */}
      <section className="relative w-full max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-12 pt-12 pb-8">
        <div className="flex flex-col items-start max-w-3xl">
          <p className="font-mono text-xs text-cyan-700 dark:text-cyan-300 tracking-wide mb-3">
            {t.education.eyebrow}
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-slate-900 dark:text-[var(--text-primary)] tracking-tight leading-[1.1] mb-2">
            {t.education.title}
          </h1>
          <p className="text-lg sm:text-xl font-display font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 dark:from-cyan-400 dark:via-teal-300 dark:to-emerald-400">
            {t.education.subtitle}
          </p>
        </div>
      </section>

      {/* Vertical Timeline + 3D Mobility Globe Section */}
      <section className="w-full max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-12 py-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-7 flex flex-col gap-6 relative">
            {/* Continuous Rail Line */}
            <div className="hidden md:block absolute left-4 top-8 bottom-8 w-px bg-[var(--border-subtle)]" />

            {EDUCATION_ENTRIES.map((entry) => {
              const isCyan = entry.accent === 'cyan';
              const localized = t.education.entries[entry.id];
              const courseworkList = localized?.coursework ?? entry.coursework;
              const thesisValue = localized?.thesisTopic ?? entry.thesisTopic;
              const fieldLabel = localized?.fieldLabel ?? entry.fieldLabel;
              const fieldValue = localized?.fieldValue ?? entry.fieldValue;

              return (
                <div key={entry.id} className="relative flex flex-col md:flex-row gap-6 items-start">
                  {/* Timeline Node Marker */}
                  <div
                    className={`hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-[var(--bg-surface-card)] border shrink-0 z-10 mt-6 ${
                      isCyan
                        ? 'border-cyan-500/45 shadow-[0_0_12px_rgba(6,182,212,0.22)]'
                        : 'border-emerald-500/45 shadow-[0_0_12px_rgba(16,185,129,0.22)]'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isCyan
                          ? 'bg-cyan-500 dark:bg-cyan-400'
                          : 'bg-emerald-500 dark:bg-emerald-400'
                      }`}
                    />
                  </div>

                  {/* Milestone Card */}
                  <TiltCard3D
                    className="flex-1 w-full rounded-2xl"
                    maxTilt={4}
                    glowColor={isCyan ? 'rgba(6, 182, 212, 0.14)' : 'rgba(16, 185, 129, 0.14)'}
                  >
                    <article
                      className={`w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8 shadow-lg transition-colors ${
                        isCyan ? 'hover:border-cyan-500/45' : 'hover:border-emerald-500/45'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 font-mono text-xs">
                        <span
                          className={
                            isCyan
                              ? 'text-cyan-700 dark:text-cyan-300'
                              : 'text-emerald-700 dark:text-emerald-300'
                          }
                        >
                          {localized?.period ?? entry.period} <span aria-hidden="true">·</span>{' '}
                          {localized?.status ?? entry.status}
                        </span>
                        <span className="text-slate-600 dark:text-[var(--text-muted)] flex items-center gap-1.5">
                          <MapPin
                            className={`w-3.5 h-3.5 ${
                              isCyan
                                ? 'text-cyan-600 dark:text-cyan-400'
                                : 'text-emerald-600 dark:text-emerald-400'
                            }`}
                          />
                          <span>{localized?.location ?? entry.location}</span>
                        </span>
                      </div>

                      <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-[var(--text-primary)] mb-1.5">
                        {localized?.title ?? entry.title}
                      </h2>

                      {(localized?.institution || entry.institution) && (
                        <p className="font-mono text-xs text-slate-600 dark:text-[var(--text-muted)] mb-4">
                          {localized?.institution ?? entry.institution}
                        </p>
                      )}

                      {fieldValue && (
                        <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-2 font-mono text-xs">
                          <span className="font-semibold text-cyan-700 dark:text-cyan-400">
                            {fieldLabel}:
                          </span>
                          <span className="text-slate-800 dark:text-[var(--text-primary)]">
                            {fieldValue}
                          </span>
                        </div>
                      )}

                      {thesisValue && (
                        <div className="mb-4 font-mono text-xs text-slate-700 dark:text-[var(--text-secondary)]">
                          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                            {t.education.thesisTopicLabel}{' '}
                          </span>
                          <span>{thesisValue}</span>
                        </div>
                      )}

                      {courseworkList && courseworkList.length > 0 && (
                        <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-slate-700 dark:text-[var(--text-secondary)]">
                          {courseworkList.map((course, idx) => (
                            <span key={course} className="inline-flex items-center gap-3">
                              <span
                                className={
                                  idx % 2 === 0
                                    ? 'text-cyan-700 dark:text-cyan-300'
                                    : 'text-slate-700 dark:text-[var(--text-secondary)]'
                                }
                              >
                                {course}
                              </span>
                              {idx < courseworkList.length - 1 && (
                                <span
                                  aria-hidden="true"
                                  className="text-slate-400 dark:text-slate-500"
                                >
                                  ·
                                </span>
                              )}
                            </span>
                          ))}
                        </div>
                      )}
                    </article>
                  </TiltCard3D>
                </div>
              );
            })}

            {/* Interactive Languages Strip */}
            <div className="md:pl-14">
              <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-md">
                <p className="font-mono text-xs text-cyan-700 dark:text-cyan-400 mb-3 flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5" />
                  <span>{t.home.languagesTitle}</span>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {LANGUAGES.map((lang) => {
                    const cardCopy = t.languageCards[lang.code];
                    const isSelected = siteLanguage === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => onChangeLanguage(lang.code)}
                        aria-pressed={isSelected}
                        className={`text-left p-3 rounded-xl border transition-all cursor-pointer space-y-0.5 ${
                          isSelected
                            ? 'bg-[var(--bg-surface-alt)] border-cyan-500'
                            : 'bg-[var(--bg-surface-alt)]/50 border-[var(--border-subtle)] hover:border-cyan-500/45'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <p className="font-display font-bold text-sm text-slate-900 dark:text-[var(--text-primary)]">
                            {cardCopy.name}
                          </p>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 shrink-0 text-cyan-600 dark:text-cyan-300" />
                          )}
                        </div>
                        <p className="font-mono text-[11px] text-cyan-700 dark:text-cyan-300">
                          {cardCopy.proficiency}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <MobilityGlobe3D t={t.education.globe} />
          </div>
        </div>
      </section>
    </div>
  );
}
