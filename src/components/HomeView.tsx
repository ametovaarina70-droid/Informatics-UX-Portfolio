import { useState } from 'react';
import { ArrowRight, Check, FolderOpen, GraduationCap, Mail, User } from 'lucide-react';
import { LANGUAGES, NavRoute, PROFILE, ProjectItem } from '../data/portfolioData';
import { SiteLanguage, SiteTranslation } from '../data/translations';
import { KineticSculpture3D } from './KineticSculpture3D';
import { TiltCard3D } from './TiltCard3D';

interface HomeViewProps {
  onNavigate: (route: NavRoute) => void;
  onSelectProject?: (project: ProjectItem, modalTitle?: string) => void;
  siteLanguage: SiteLanguage;
  onChangeLanguage: (lang: SiteLanguage) => void;
  t: SiteTranslation;
}

export function HomeView({
  onNavigate,
  onSelectProject,
  siteLanguage,
  onChangeLanguage,
  t,
}: HomeViewProps) {
  const [portraitError, setPortraitError] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1340px] mx-auto w-full px-5 sm:px-8 lg:px-12 py-8 md:py-12 relative z-10 flex flex-col gap-10 md:gap-12">
        {/* 1. Clean Hero Section: Identity & Primary Action */}
        <section
          id="hero"
          className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          <div className="md:col-span-7 lg:col-span-8 flex flex-col items-start">
            <p className="font-mono text-xs text-cyan-700 dark:text-cyan-300 tracking-wide mb-3">
              {t.home.location} <span aria-hidden="true">·</span> {t.home.availableForRoles}
            </p>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-[var(--text-primary)] tracking-tight leading-[1.08] mb-3 text-balance">
              {PROFILE.name}
            </h1>

            <p className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 dark:from-cyan-400 dark:via-teal-300 dark:to-emerald-400 mb-7">
              {t.home.role}
            </p>

            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-mono text-xs font-semibold px-6 py-3 rounded-lg shadow-[0_8px_24px_rgba(6,182,212,0.22)] transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              <span>{t.home.exploreCaseStudies}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end">
            <div className="relative w-full max-w-[260px] lg:max-w-[280px]">
              <div className="corner-bracket p-2 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-xl relative">
                <div className="relative overflow-hidden rounded-xl bg-slate-950 aspect-[4/5] border border-cyan-500/20">
                  {!portraitError ? (
                    <img
                      src={PROFILE.portraitUrl}
                      alt="Arina Ametova portrait"
                      referrerPolicy="no-referrer"
                      onError={() => setPortraitError(true)}
                      className="w-full h-full object-cover object-center grayscale contrast-125 hover:grayscale-0 transition-all duration-700 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1220] via-[#132038] to-[#080C14] p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 mb-3">
                        <User className="w-7 h-7" />
                      </div>
                      <p className="font-display font-bold text-lg text-slate-100">{PROFILE.name}</p>
                      <p className="font-mono text-xs text-cyan-400 mt-1">{t.home.role}</p>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px] text-slate-100 bg-[#0B1220]/90 px-3 py-1.5 rounded-lg border border-slate-700/80">
                    <span className="text-cyan-300">{t.home.degreeBadge}</span>
                    <span className="text-slate-300">{t.home.universityShort}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Concise Philosophy + Three Navigation Cards */}
        <section
          id="about"
          className="pt-8 border-t border-[var(--border-subtle)]"
          aria-label={t.home.storyEyebrow}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            <TiltCard3D className="md:col-span-7 rounded-2xl" maxTilt={4}>
              <div className="h-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-cyan-500/35 p-6 sm:p-8 rounded-2xl shadow-lg transition-colors flex flex-col justify-between gap-6">
                <div className="space-y-3">
                  <p className="font-mono text-xs text-cyan-700 dark:text-cyan-400">
                    {t.home.storyEyebrow}
                  </p>
                  <p className="text-slate-900 dark:text-[var(--text-primary)] text-base sm:text-lg font-medium leading-relaxed">
                    {t.home.storyPara2}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-3 font-mono text-xs text-slate-600 dark:text-[var(--text-muted)]">
                  <span className="text-cyan-700 dark:text-cyan-300">{t.home.storyTagLeft}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700 dark:text-emerald-400">
                    {t.home.storyTagRight}
                  </span>
                </div>
              </div>
            </TiltCard3D>

            <div className="md:col-span-5 flex flex-col gap-3.5 justify-between">
              <TiltCard3D className="flex-1 rounded-2xl" maxTilt={5}>
                <button
                  type="button"
                  onClick={() => onNavigate('education')}
                  className="w-full h-full group text-left bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-cyan-500/50 transition-all duration-150 cursor-pointer p-4 sm:p-5 rounded-2xl shadow-sm flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--bg-surface-card)] border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-mono text-[11px] text-cyan-700 dark:text-cyan-400 tracking-wider mb-0.5">
                        {t.home.cards.educationLabel}
                      </div>
                      <div className="text-slate-900 dark:text-[var(--text-primary)] font-semibold text-sm group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                        {t.home.cards.educationTitle}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              </TiltCard3D>

              <TiltCard3D
                className="flex-1 rounded-2xl"
                maxTilt={5}
                glowColor="rgba(16, 185, 129, 0.15)"
              >
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className="w-full h-full group text-left bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-emerald-500/50 transition-all duration-150 cursor-pointer p-4 sm:p-5 rounded-2xl shadow-sm flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--bg-surface-card)] border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                      <FolderOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400 tracking-wider mb-0.5">
                        {t.home.cards.portfolioLabel}
                      </div>
                      <div className="text-slate-900 dark:text-[var(--text-primary)] font-semibold text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                        {t.home.cards.portfolioTitle}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              </TiltCard3D>

              <TiltCard3D className="flex-1 rounded-2xl" maxTilt={5}>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="w-full h-full group text-left bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-cyan-500/50 transition-all duration-150 cursor-pointer p-4 sm:p-5 rounded-2xl shadow-sm flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--bg-surface-card)] border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-mono text-[11px] text-cyan-700 dark:text-cyan-400 tracking-wider mb-0.5">
                        {t.home.cards.contactLabel}
                      </div>
                      <div className="text-slate-900 dark:text-[var(--text-primary)] font-semibold text-sm group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                        {t.home.cards.contactTitle}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              </TiltCard3D>
            </div>
          </div>
        </section>

        {/* 3. Spoken Languages (Interactive: click to switch site language) */}
        <section
          id="languages"
          className="pt-8 border-t border-[var(--border-subtle)] space-y-5"
          aria-label={t.home.languagesTitle}
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-[var(--text-primary)]">
            {t.home.languagesTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LANGUAGES.map((lang) => {
              const cardCopy = t.languageCards[lang.code];
              const isSelected = siteLanguage === lang.code;
              const accentText =
                lang.accent === 'amber'
                  ? 'text-amber-700 dark:text-amber-300'
                  : lang.accent === 'emerald'
                    ? 'text-emerald-700 dark:text-emerald-300'
                    : lang.accent === 'indigo'
                      ? 'text-indigo-700 dark:text-indigo-300'
                      : 'text-cyan-700 dark:text-cyan-300';

              return (
                <TiltCard3D key={lang.code} className="rounded-2xl" maxTilt={5}>
                  <button
                    type="button"
                    onClick={() => onChangeLanguage(lang.code)}
                    aria-pressed={isSelected}
                    className={`w-full h-full text-left rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between gap-2.5 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                      isSelected
                        ? 'bg-[var(--bg-surface)] border-cyan-500 ring-1 ring-cyan-500/30'
                        : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-cyan-500/45'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 w-full">
                      <div>
                        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-[var(--text-primary)]">
                          {cardCopy.name}
                        </h3>
                        <span className="font-mono text-xs text-slate-500 dark:text-[var(--text-muted)]">
                          {cardCopy.nativeName}
                        </span>
                      </div>

                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[10px] font-semibold shrink-0 bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950">
                          <Check className="w-3 h-3" />
                          <span>{t.home.activeLanguageBadge}</span>
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] text-slate-500 dark:text-[var(--text-muted)] uppercase">
                          {lang.code}
                        </span>
                      )}
                    </div>

                    <p className={`font-mono text-xs font-semibold ${accentText}`}>
                      {cardCopy.proficiency}
                    </p>
                  </button>
                </TiltCard3D>
              );
            })}
          </div>
        </section>

        {/* 4. Interactive 3D Project Explorer */}
        <section
          id="spatial-lab"
          className="pt-8 border-t border-[var(--border-subtle)] space-y-4"
          aria-label={t.home.explorerTitle}
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-[var(--text-primary)]">
            {t.home.explorerTitle}
          </h2>

          <KineticSculpture3D
            onNavigate={onNavigate}
            onSelectProject={
              onSelectProject ? (project) => onSelectProject(project) : undefined
            }
            t={t}
          />
        </section>
      </div>
    </div>
  );
}
