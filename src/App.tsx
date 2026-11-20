import { useEffect, useLayoutEffect, useState } from 'react';
import { BackToTopButton } from './components/BackToTopButton';
import { ContactView } from './components/ContactView';
import { EducationView } from './components/EducationView';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { Navbar } from './components/Navbar';
import { ProjectModal } from './components/ProjectModal';
import { ProjectsView } from './components/ProjectsView';
import { SpatialBackground3D } from './components/SpatialBackground3D';
import { NavRoute, ProjectItem } from './data/portfolioData';
import { SiteLanguage, TRANSLATIONS } from './data/translations';
import {
  TimePhase,
  TimeThemePreference,
  applyTimePhaseToDocument,
  resolveTimePhaseFromHour,
} from './utils/timeTheme';

const THEME_PREF_KEY = 'arina_time_theme_pref';
const SITE_LANG_KEY = 'arina_site_lang';

function getInitialRoute(): NavRoute {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (hash === 'education' || hash === 'projects' || hash === 'contact' || hash === 'index') {
    return hash;
  }
  return 'index';
}

function getInitialTimePreference(): TimeThemePreference {
  try {
    const saved = window.localStorage.getItem(THEME_PREF_KEY);
    if (saved === 'auto' || saved === 'day' || saved === 'night') {
      return saved;
    }
  } catch {
    // Ignore storage read errors
  }
  return 'auto';
}

function getInitialLanguage(): SiteLanguage {
  try {
    const saved = window.localStorage.getItem(SITE_LANG_KEY);
    if (saved === 'en' || saved === 'ky' || saved === 'ru' || saved === 'cs') {
      return saved;
    }
  } catch {
    // Ignore storage read errors
  }
  return 'en';
}

export default function App() {
  const [activeRoute, setActiveRoute] = useState<NavRoute>(getInitialRoute);
  const [timePreference, setTimePreference] = useState<TimeThemePreference>(
    getInitialTimePreference
  );
  const [siteLanguage, setSiteLanguage] = useState<SiteLanguage>(getInitialLanguage);
  const [clockHour, setClockHour] = useState<number>(() => new Date().getHours());
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [skeletonMounted, setSkeletonMounted] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<{
    project: ProjectItem;
    modalTitle?: string;
  } | null>(null);

  const activePhase: TimePhase =
    timePreference === 'auto' ? resolveTimePhaseFromHour(clockHour) : timePreference;
  const t = TRANSLATIONS[siteLanguage];

  useLayoutEffect(() => {
    applyTimePhaseToDocument(activePhase);
  }, [activePhase]);

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
  }, [t.htmlLang]);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => {
      setIsInitialLoading(false);
    }, 320);
    const unmountTimer = window.setTimeout(() => {
      setSkeletonMounted(false);
    }, 840);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(unmountTimer);
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setClockHour(new Date().getHours());
    }, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveRoute(getInitialRoute());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTimePreferenceChange = (pref: TimeThemePreference) => {
    setTimePreference(pref);
    try {
      window.localStorage.setItem(THEME_PREF_KEY, pref);
    } catch {
      // Ignore storage write errors
    }
  };

  const handleLanguageChange = (lang: SiteLanguage) => {
    setSiteLanguage(lang);
    try {
      window.localStorage.setItem(SITE_LANG_KEY, lang);
    } catch {
      // Ignore storage write errors
    }
  };

  const handleNavigate = (route: NavRoute) => {
    setActiveRoute(route);
    window.history.replaceState(null, '', `#${route}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {skeletonMounted && (
        <LoadingSkeleton activeRoute={activeRoute} fadingOut={!isInitialLoading} />
      )}

      <div
        className={`min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)] relative transition-all duration-500 ease-out ${
          isInitialLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <SpatialBackground3D activeRoute={activeRoute} timePhase={activePhase} />
        <Navbar
          activeRoute={activeRoute}
          onNavigate={handleNavigate}
          timePreference={timePreference}
          activePhase={activePhase}
          onChangeTimePreference={handleTimePreferenceChange}
          t={t}
        />

        <main className="flex-1 w-full pt-16 sm:pt-20 cyber-grid relative z-10 overflow-x-hidden">
          {/* Subtle Ambient Background Fields */}
          <div className="pointer-events-none absolute -top-24 left-1/4 w-[540px] h-[300px] bg-cyan-500/8 blur-[130px] rounded-full" />
          <div className="pointer-events-none absolute top-[36rem] -right-24 w-[480px] h-[300px] bg-emerald-500/8 blur-[140px] rounded-full" />

          {activeRoute === 'index' && (
            <HomeView
              onNavigate={handleNavigate}
              onSelectProject={(project, modalTitle) =>
                setSelectedProject({ project, modalTitle })
              }
              siteLanguage={siteLanguage}
              onChangeLanguage={handleLanguageChange}
              t={t}
            />
          )}
          {activeRoute === 'education' && (
            <EducationView
              onNavigate={handleNavigate}
              siteLanguage={siteLanguage}
              onChangeLanguage={handleLanguageChange}
              t={t}
            />
          )}
          {activeRoute === 'projects' && (
            <ProjectsView
              onSelectProject={(project, modalTitle) =>
                setSelectedProject({ project, modalTitle })
              }
              t={t}
            />
          )}
          {activeRoute === 'contact' && <ContactView t={t} />}
        </main>

        <div className="relative z-10">
          <Footer
            onNavigate={handleNavigate}
            siteLanguage={siteLanguage}
            onChangeLanguage={handleLanguageChange}
            t={t}
          />
        </div>

        <BackToTopButton label={t.footer.backToTop} />

        <ProjectModal
          project={selectedProject?.project ?? null}
          modalTitle={selectedProject?.modalTitle}
          onClose={() => setSelectedProject(null)}
          t={t}
        />
      </div>
    </>
  );
}
