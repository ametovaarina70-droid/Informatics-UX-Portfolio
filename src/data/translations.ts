import { NavRoute, ProjectCategory } from './portfolioData';
import { TimePhase } from '../utils/timeTheme';

export type SiteLanguage = 'en' | 'ky' | 'ru' | 'cs';

export interface LocalizedProjectCopy {
  categoryLabel: string;
  title: string;
  description: string;
  accessNote?: string;
  primaryLabel: string;
  secondaryLabel: string;
  secondaryModalTitle?: string;
  metricsHeadline?: string;
  metricsSampleSize?: string;
  materialLabels?: string[];
  caseStudy: {
    subtitle: string;
    role: string;
    overview: string;
    highlights: string[];
    technicalNotes: string;
  };
}

export interface LocalizedEducationCopy {
  period: string;
  status: string;
  location: string;
  title: string;
  institution?: string;
  description: string;
  fieldLabel?: string;
  fieldValue?: string;
  thesisTopic?: string;
  coursework?: string[];
}

export interface LocalizedLanguageCardCopy {
  name: string;
  nativeName: string;
  proficiency: string;
  context: string;
}

export interface SiteTranslation {
  langCode: SiteLanguage;
  htmlLang: string;
  nav: Record<NavRoute, string>;
  navBrowseGithub: string;
  theme: {
    auto: string;
    day: string;
    night: string;
    phaseLabels: Record<TimePhase, string>;
    groupAriaLabel: string;
  };
  footer: {
    affiliation: string;
    discipline: string;
    copyright: string;
    languageLabel: string;
    backToTop: string;
  };
  home: {
    availableForRoles: string;
    role: string;
    location: string;
    tagline: string;
    exploreCaseStudies: string;
    degreeBadge: string;
    universityShort: string;
    storyEyebrow: string;
    storyPara1: string;
    storyPara2: string;
    storyTagLeft: string;
    storyTagRight: string;
    cards: {
      educationLabel: string;
      educationTitle: string;
      portfolioLabel: string;
      portfolioTitle: string;
      contactLabel: string;
      contactTitle: string;
    };
    languagesEyebrow: string;
    languagesTitle: string;
    languagesHint: string;
    activeLanguageBadge: string;
    clickToSwitch: string;
    explorerEyebrow: string;
    explorerTitle: string;
    explorerHint: string;
  };
  explorer3d: {
    ariaLabel: string;
    contextLost: string;
    openCaseStudy: string;
    showControls: string;
    hideControls: string;
    play: string;
    pause: string;
    spin: string;
    resetCamera: string;
    allProjects: string;
  };
  education: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    thesisTopicLabel: string;
    spokenLanguagesTitle: string;
    spokenLanguagesHint: string;
    routeCoordinates: string;
    nextStepsEyebrow: string;
    nextStepsTitle: string;
    nextStepsDesc: string;
    nextStepsButton: string;
    globe: {
      routeTitle: string;
      dragHint: string;
      overview: string;
      cities: {
        kyrgyzstan: { label: string; sub: string };
        prague: { label: string; sub: string };
        seoul: { label: string; sub: string };
      };
    };
    entries: Record<string, LocalizedEducationCopy>;
  };
  projects: {
    eyebrow: string;
    periodTag: string;
    headingPrefix: string;
    headingAccent: string;
    description: string;
    specs: string[];
    filters: Record<ProjectCategory, string>;
    statusStrip: [string, string, string];
    thesisAbstractTitle: string;
    olsSummaryTitle: string;
    items: Record<string, LocalizedProjectCopy>;
  };
  modal: {
    closeAria: string;
    keyDeliverables: string;
    stackAndSource: string;
    projectMaterials: string;
    closeButton: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    availability: [string, string, string];
    directMail: string;
    phoneWhatsapp: string;
    professionalNetwork: string;
    timezoneLabel: string;
    copyTitle: string;
    copiedTitle: string;
    sendEmailTitle: string;
    directDialTitle: string;
    openLinkedinTitle: string;
    formEyebrow: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    scopeLabel: string;
    scopeOptions: string[];
    messageLabel: string;
    messagePlaceholder: string;
    httpsNote: string;
    submitButton: string;
    sendingButton: string;
    submittedTitle: string;
    submittedBodyPrefix: string;
    submittedBodyMiddle: string;
    submittedBodySuffix: string;
    activationTitle: string;
    activationBody: string;
    errorTitle: string;
    errorBody: string;
    openMailAppButton: string;
    dismissButton: string;
    calloutEyebrow: string;
    calloutQuote: string;
    quickPing: string;
  };
  languageCards: Record<SiteLanguage, LocalizedLanguageCardCopy>;
}

export const TRANSLATIONS: Record<SiteLanguage, SiteTranslation> = {
  en: {
    langCode: 'en',
    htmlLang: 'en',
    nav: {
      index: '~/index',
      education: '~/education',
      projects: '~/projects',
      contact: '~/contact',
    },
    navBrowseGithub: 'Browse GitHub',
    theme: {
      auto: 'Auto',
      day: 'Day',
      night: 'Night',
      phaseLabels: {
        day: 'Daylight',
        night: 'Night',
      },
      groupAriaLabel: 'Time of day theme mode',
    },
    footer: {
      affiliation: "CZU Prague '25",
      discipline: 'Informatics & UX',
      copyright: '© 2026 Arina Ametova. All rights reserved.',
      languageLabel: 'Language',
      backToTop: 'Back to top',
    },
    home: {
      availableForRoles: 'Available for Roles',
      role: 'Informatics & UX Design',
      location: 'Prague, CZ',
      tagline:
        'Designing seamless digital experiences at the intersection of computer science and human-centered UX.',
      exploreCaseStudies: 'Explore Case Studies',
      degreeBadge: 'B.Sc. Informatics',
      universityShort: 'CZU Prague',
      storyEyebrow: 'Story & Philosophy',
      storyPara1:
        'Rooted in Kyrgyzstan and thriving in Prague, my journey started with a leap across borders at age 16. Today, I study Informatics at the Czech University of Life Sciences Prague (CZU), focusing on the nexus of computational systems and usability.',
      storyPara2:
        'I believe outstanding design is never merely visual decoration—it is structural clarity, accessibility compliance, and empathy engineered into everyday interaction flows.',
      storyTagLeft: 'CZU Prague Informatics',
      storyTagRight: 'UX Architecture & Code',
      cards: {
        educationLabel: 'Education',
        educationTitle: 'Academic & Education Journey',
        portfolioLabel: 'Portfolio',
        portfolioTitle: 'Selected Projects & Case Studies',
        contactLabel: 'Contact',
        contactTitle: 'Get in Touch & Inquiries',
      },
      languagesEyebrow: 'Multilingual Communication',
      languagesTitle: 'Languages I Speak',
      languagesHint: 'Click any language card to switch the website language',
      activeLanguageBadge: 'Active',
      clickToSwitch: 'Switch site',
      explorerEyebrow: '3D Project Explorer',
      explorerTitle: 'Explore My Projects in 3D',
      explorerHint: 'Drag to rotate · Click any floating project label to preview or open its case study',
    },
    explorer3d: {
      ariaLabel: 'Interactive 3D Project Map',
      contextLost: '3D graphics context paused. Restoring project map...',
      openCaseStudy: 'Open Case Study',
      showControls: 'Show Controls',
      hideControls: 'Hide Controls',
      play: 'Play',
      pause: 'Pause',
      spin: 'Spin',
      resetCamera: 'Reset Camera',
      allProjects: 'All Projects',
    },
    education: {
      eyebrow: '02 · Academics',
      title: 'Education',
      subtitle: 'Informatics & Academic Mobility',
      description:
        'Formal computer science foundations and international academic mobility with a focus on user experience and interactive systems.',
      thesisTopicLabel: 'Thesis Topic:',
      spokenLanguagesTitle: 'Spoken Languages (Click to switch site language)',
      spokenLanguagesHint: 'Interactive language switcher',
      routeCoordinates:
        'Kyrgyzstan (42.87°N, 74.57°E) → Prague (50.08°N, 14.44°E) → Seoul (37.57°N, 126.98°E)',
      nextStepsEyebrow: 'Next Steps',
      nextStepsTitle: 'Explore real-world projects and design work',
      nextStepsDesc: 'Browse case studies, interface systems, and frontend prototypes.',
      nextStepsButton: 'Explore Case Studies',
      globe: {
        routeTitle: 'Kyrgyzstan → Prague → Seoul',
        dragHint: 'Drag to spin · Click a city to focus',
        overview: 'Overview',
        cities: {
          kyrgyzstan: { label: 'Kyrgyzstan', sub: 'Home' },
          prague: { label: 'Prague', sub: 'CZU' },
          seoul: { label: 'Seoul', sub: 'Exchange' },
        },
      },
      entries: {
        'seoul-exchange': {
          period: 'February – June 2026',
          status: 'Upcoming',
          location: 'Seoul, South Korea',
          title: 'Exchange Program in Information and Communication Engineering',
          description:
            'Selected for international exchange studies focusing on mobile network communications, interactive systems, and cross-cultural user interface design.',
          fieldLabel: 'Field',
          fieldValue: 'Information and Communication Engineering',
        },
        'czu-bsc': {
          period: '2023 – 2027 (Expected)',
          status: 'Current Degree',
          location: 'Prague, Czech Republic',
          title: 'BSc in Informatics',
          institution: 'Czech University of Life Sciences Prague (CZU)',
          description:
            'Undergraduate computer science and information systems curriculum bridging software engineering, data analysis, and human-centered interface design.',
          thesisTopic: 'User Experience (UX)',
          coursework: [
            'Object-Oriented Programming',
            'Relational Databases & SQL',
            'UX Architecture',
            'Distributed Web Systems',
          ],
        },
      },
    },
    projects: {
      eyebrow: '03 · Technical Work & Case Studies',
      periodTag: 'Selected Works 2024–2026',
      headingPrefix: 'Engineered Systems &',
      headingAccent: 'UX Case Studies',
      description:
        'Full-stack web applications, Gemini AI integrations, and empirical UX/data analysis built with end-to-end craft and mathematical rigor.',
      specs: ['4 Production Works', 'React & TypeScript', 'Python & Data Science', 'Gemini AI API'],
      filters: {
        all: 'All Projects',
        fullstack: 'Software & Full-Stack',
        data: 'Data Analysis & ML',
        ux: 'UX Research & Systems',
      },
      statusStrip: ['Live Ready', 'Research Grade', '2024–2026'],
      thesisAbstractTitle: 'Thesis Abstract',
      olsSummaryTitle: 'OLS Regression Summary',
      items: {
        'atelier-luma': {
          categoryLabel: 'Software & AI',
          title: 'ATELIER LUMA',
          description:
            'Multilingual beauty salon web app with AI booking assistant powered by the Gemini API and continuous Vercel deployment.',
          primaryLabel: 'Live App',
          secondaryLabel: 'Code',
          caseStudy: {
            subtitle: 'Multilingual AI Booking Platform · Production Web App',
            role: 'Full-Stack Developer & UX Designer',
            overview:
              'Designed and shipped a responsive multilingual salon web platform featuring an interactive Gemini-powered booking concierge that guides clients through treatment selection and appointment scheduling.',
            highlights: [
              'Localized user flows across Czech, English, and Russian with zero layout shift.',
              'Integrated Gemini API assistant to answer treatment questions and suggest suitable slots.',
              'Deployed with automated CI/CD previews and production builds on Vercel.',
            ],
            technicalNotes:
              'Built with React 18, TypeScript, Tailwind CSS, and serverless Gemini API endpoints.',
          },
        },
        'personal-photo-gallery': {
          categoryLabel: 'Full-Stack Web',
          title: 'Personal Photo Gallery',
          description:
            'Full-stack web application with secure user authentication, photo management, relational query search, and direct messaging.',
          accessNote: 'To view the content of this webpage, you must sign up or sign in first.',
          primaryLabel: 'Live App',
          secondaryLabel: 'Code',
          caseStudy: {
            subtitle: 'Relational Media & Messaging Platform · Backend Architecture',
            role: 'Backend & Full-Stack Engineer',
            overview:
              'A full-stack social photo curation platform engineered with Flask and normalized SQLite 3 schemas, supporting authenticated uploads, tag-based filtering, and direct user messaging. Access to gallery content and user streams is protected behind authentication—visitors must sign up or sign in on the live app to explore.',
            highlights: [
              'Authentication gate requiring users to sign up or sign in before viewing gallery content, profiles, or messages.',
              'Normalized SQLite 3 relational schema linking users, albums, photo metadata, and message threads.',
              'Parameterized SQL search queries across captions, tags, and upload timestamps.',
            ],
            technicalNotes:
              'Python 3 · Flask Blueprints · Jinja2 · SQLite 3 with indexed foreign keys.',
          },
        },
        'traffic-accident-analysis': {
          categoryLabel: 'Data & Analytics',
          title: 'Traffic Accident Analysis',
          description:
            'Statistical OLS regression modeling 2023 vs. 2024 traffic accident counts across 17 South Korean regions using Python, pandas, and statsmodels.',
          primaryLabel: 'Notebook',
          secondaryLabel: 'Code',
          metricsHeadline: 'OLS Fit (R²=1.000)',
          metricsSampleSize: 'N=17 regions',
          materialLabels: ['HTML Notebook', 'Final Paper (PDF)', 'Dataset (CSV)'],
          caseStudy: {
            subtitle: 'Empirical Road Safety Modeling · 17 Korean Regions (2023–2024)',
            role: 'Data Analyst',
            overview:
              'Statistical evaluation of regional traffic collision counts across 17 South Korean provinces and metropolitan cities (2023 vs. 2024), fitting an Ordinary Least Squares (OLS) linear regression model alongside a formal research paper.',
            highlights: [
              'Processed regional 2023–2024 traffic collision CSV records (CP949 encoding) in Python and pandas.',
              'Fitted OLS regression model achieving R² = 1.000 (slope = 0.9809, F-statistic = 3.518e+04, p = 1.07e-26).',
              'Authored complete academic final paper with regression diagnostics and matplotlib visualizations.',
            ],
            technicalNotes:
              'Python 3 · pandas · scipy.stats · statsmodels · matplotlib · Jupyter HTML.',
          },
        },
        'czu-uis-ux-thesis': {
          categoryLabel: 'UX Research',
          title: 'CZU UIS UX Thesis',
          description:
            'UX and usability evaluation of the CZU University Information System through cognitive walkthroughs and student user testing.',
          primaryLabel: 'Abstract',
          secondaryLabel: "CZU '26",
          caseStudy: {
            subtitle: 'Bachelor Thesis · Human-Computer Interaction & Accessibility',
            role: 'UX Researcher & Informatics Candidate',
            overview:
              'Comprehensive usability evaluation and redesign proposal for the Czech University of Life Sciences Prague (CZU) University Information System (UIS), combining empirical student testing with WCAG 2.2 compliance auditing.',
            highlights: [
              'Conducted structured cognitive walkthroughs across critical student workflows (course enrollment, exam registration, grade lookup).',
              'Ran moderated usability testing sessions measuring task completion rate, time-on-task, and friction hotspots.',
              'Proposed high-contrast, keyboard-accessible UI architecture aligned with WCAG 2.2 Level AA.',
            ],
            technicalNotes:
              'Faculty of Economics and Management · CZU Prague · Expected Defense 2026/2027.',
          },
        },
      },
    },
    modal: {
      closeAria: 'Close modal',
      keyDeliverables: 'Key Deliverables & Findings',
      stackAndSource: 'Stack & Source:',
      projectMaterials: 'Project Materials',
      closeButton: 'Close',
    },
    contact: {
      eyebrow: '04 · Channels & Collaboration',
      title: 'Contact & Collaboration',
      intro:
        'Open for junior roles and technical internships in software development and data analysis in Prague or remote. Authorized to work in the Czech Republic (full-time student status).',
      availability: ['Response: < 24h', 'Prague, CZ (GMT+1)', 'CZ Work Authorized'],
      directMail: 'Direct Mail',
      phoneWhatsapp: 'Phone / WhatsApp',
      professionalNetwork: 'Professional Network',
      timezoneLabel: 'Timezone',
      copyTitle: 'Copy address',
      copiedTitle: 'Copied!',
      sendEmailTitle: 'Send email',
      directDialTitle: 'Direct Dial',
      openLinkedinTitle: 'Open LinkedIn Profile',
      formEyebrow: 'Direct Inquiry Form',
      formTitle: 'Send a Message',
      formSubtitle: 'Have a project, role opening, or technical question? Leave a note below.',
      nameLabel: 'Name / Organisation',
      namePlaceholder: 'Your Name or Company',
      emailLabel: 'Email Address',
      emailPlaceholder: 'your.email@domain.com',
      scopeLabel: 'Inquiry Scope',
      scopeOptions: [
        'Junior Software Engineering Role',
        'Data Analysis / BI Internship',
        'UX Design & Frontend Prototyping',
        'Project Collaboration / Freelance',
        'General Technical Inquiry',
      ],
      messageLabel: 'Message Content',
      messagePlaceholder: 'Tell me about your project, timeline, or open technical role...',
      httpsNote: 'Encrypted transit via HTTPS',
      submitButton: 'Send Message',
      sendingButton: 'Sending...',
      submittedTitle: 'Message Sent to Email',
      submittedBodyPrefix: 'Thank you,',
      submittedBodyMiddle: 'Your inquiry regarding',
      submittedBodySuffix: 'was delivered directly to my email inbox.',
      activationTitle: 'One-Time Email Verification Triggered',
      activationBody:
        'A verification link was sent to the inbox to activate automatic form forwarding. You can also message me directly via your mail app below.',
      errorTitle: 'Automatic Delivery Unavailable',
      errorBody:
        'Could not send automatically right now. Click below to open your email app with your message pre-filled.',
      openMailAppButton: 'Open Mail App',
      dismissButton: 'Dismiss',
      calloutEyebrow: 'Collaboration Note',
      calloutQuote: '“Looking forward to engineering robust systems and data workflows together.”',
      quickPing: 'Quick Ping',
    },
    languageCards: {
      ky: {
        name: 'Kyrgyz',
        nativeName: 'Кыргызча',
        proficiency: 'Native',
        context: 'Mother tongue · Kyrgyzstan',
      },
      ru: {
        name: 'Russian',
        nativeName: 'Русский',
        proficiency: 'Native / Bilingual',
        context: 'Academic & multilingual UI localization',
      },
      en: {
        name: 'English',
        nativeName: 'English',
        proficiency: 'Fluent (C1)',
        context: 'University coursework & technical engineering',
      },
      cs: {
        name: 'Czech',
        nativeName: 'Čeština',
        proficiency: 'Proficient (B2+)',
        context: 'Daily life & CZU Prague environment',
      },
    },
  },

  ky: {
    langCode: 'ky',
    htmlLang: 'ky',
    nav: {
      index: '~/башкы',
      education: '~/билим',
      projects: '~/долбоорлор',
      contact: '~/байланыш',
    },
    navBrowseGithub: 'GitHub баракчасы',
    theme: {
      auto: 'Авто',
      day: 'Күндүз',
      night: 'Түн',
      phaseLabels: {
        day: 'Күндүзгү жарык',
        night: 'Түнкү режим',
      },
      groupAriaLabel: 'Убакыт боюнча тема режими',
    },
    footer: {
      affiliation: "CZU Prague '25",
      discipline: 'Информатика & UX',
      copyright: '© 2026 Arina Ametova. Бардык укуктар корголгон.',
      languageLabel: 'Тил',
      backToTop: 'Жогоруга',
    },
    home: {
      availableForRoles: 'Ишке жана стажировкага даярмын',
      role: 'Информатика & UX Дизайн',
      location: 'Прага, Чехия',
      tagline:
        'Компьютердик илимдер менен адамга багытталган UX дизайндын кесилишинде ыңгайлуу санарип тажрыйбаларды жаратам.',
      exploreCaseStudies: 'Долбоорлорду көрүү',
      degreeBadge: 'B.Sc. Информатика',
      universityShort: 'CZU Прага',
      storyEyebrow: 'Тарых & Философия',
      storyPara1:
        'Кыргызстанда өсүп, учурда Прагада окуп жатам. Менин жолум 16 жашымда чек араларды ашкан чоң кадамдан башталган. Бүгүн Чех жаратылыш таануу университетинде (CZU) Информатика боюнча билим алып, программалык системалар менен колдонуучуга ыңгайлуулукту айкалыштыруудамын.',
      storyPara2:
        'Мыкты дизайн — бул жөн гана кооздук эмес; ал түзүмдүк тактык, жеткиликтүүлүк стандарттары жана күнүмдүк колдонуучу агымдарына сиңирилген камкордук.',
      storyTagLeft: 'CZU Прага Информатика',
      storyTagRight: 'UX Архитектура & Код',
      cards: {
        educationLabel: 'Билим берүү',
        educationTitle: 'Академиялык жолум & Билимим',
        portfolioLabel: 'Портфолио',
        portfolioTitle: 'Тандалган долбоорлор & Кейстер',
        contactLabel: 'Байланыш',
        contactTitle: 'Байланышуу & Сунуштар',
      },
      languagesEyebrow: 'Көп тилдүү баарлашуу',
      languagesTitle: 'Мен билген тилдер',
      languagesHint: 'Сайттын тилин өзгөртүү үчүн каалаган тилди басыңыз',
      activeLanguageBadge: 'Тандалды',
      clickToSwitch: 'Өзгөртүү',
      explorerEyebrow: '3D Долбоорлор Картасы',
      explorerTitle: 'Долбоорлорду 3D форматта изилдеңиз',
      explorerHint: 'Айлантуу үчүн сүйрөңүз · Алдын ала көрүү үчүн каалаган долбоорду басыңыз',
    },
    explorer3d: {
      ariaLabel: 'Интерактивдүү 3D долбоорлор картасы',
      contextLost: '3D графика тыныгууда. Долбоорлор картасы калыбына келтирилүүдө...',
      openCaseStudy: 'Кейсти ачуу',
      showControls: 'Башкарууну ачуу',
      hideControls: 'Жашыруу',
      play: 'Ойнотуу',
      pause: 'Токтотуу',
      spin: 'Айлантуу',
      resetCamera: 'Камераны баштапкы абалга келтирүү',
      allProjects: 'Бардык долбоорлор',
    },
    education: {
      eyebrow: '02 · Академиялык билим',
      title: 'Билим берүү',
      subtitle: 'Информатика & Эл аралык академиялык алмашуу',
      description:
        'Колдонуучу тажрыйбасына (UX) жана интерактивдүү системаларга багытталган компьютердик илимдердин негиздери жана эл аралык тажрыйба.',
      thesisTopicLabel: 'Дипломдук иштин темасы:',
      spokenLanguagesTitle: 'Сүйлөгөн тилдерим (Сайттын тилин өзгөртүү үчүн басыңыз)',
      spokenLanguagesHint: 'Интерактивдүү тил тандоо',
      routeCoordinates:
        'Кыргызстан (42.87°N, 74.57°E) → Прага (50.08°N, 14.44°E) → Сеул (37.57°N, 126.98°E)',
      nextStepsEyebrow: 'Кийинки кадам',
      nextStepsTitle: 'Реалдуу долбоорлор жана дизайн иштери менен таанышыңыз',
      nextStepsDesc: 'Кейстерди, интерфейс системаларын жана фронтенд прототиптерин көрүңүз.',
      nextStepsButton: 'Долбоорлорду көрүү',
      globe: {
        routeTitle: 'Кыргызстан → Прага → Сеул',
        dragHint: 'Айлантуу үчүн сүйрөңүз · Фокустоо үчүн шаарды басыңыз',
        overview: 'Жалпы көрүнүш',
        cities: {
          kyrgyzstan: { label: 'Кыргызстан', sub: 'Мекеним' },
          prague: { label: 'Прага', sub: 'CZU' },
          seoul: { label: 'Сеул', sub: 'Алмашуу' },
        },
      },
      entries: {
        'seoul-exchange': {
          period: 'Февраль – Июнь 2026',
          status: 'Алдыда',
          location: 'Сеул, Түштүк Корея',
          title: 'Маалыматтык жана байланыш инженериясы боюнча алмашуу программасы',
          description:
            'Мобилдик тармак коммуникацияларына, интерактивдүү системаларга жана маданияттар аралык интерфейс дизайнына багытталган эл аралык алмашуу программасына тандалдым.',
          fieldLabel: 'Багыт',
          fieldValue: 'Маалыматтык жана байланыш инженериясы',
        },
        'czu-bsc': {
          period: '2023 – 2027 (Күтүлүүдө)',
          status: 'Учурдагы даража',
          location: 'Прага, Чехия',
          title: 'Информатика боюнча бакалавр (BSc)',
          institution: 'Чех жаратылыш таануу университети Прага (CZU)',
          description:
            'Программалык инженерияны, маалыматтарды анализдөөнү жана адамга багытталган интерфейс дизайнын бириктирген информатика программасы.',
          thesisTopic: 'Колдонуучу тажрыйбасы (UX)',
          coursework: [
            'Объектке багытталган программалоо',
            'Реляциялык базалар & SQL',
            'UX Архитектура',
            'Бөлүштүрүлгөн веб системалар',
          ],
        },
      },
    },
    projects: {
      eyebrow: '03 · Техникалык иштер & Кейстер',
      periodTag: 'Тандалган иштер 2024–2026',
      headingPrefix: 'Инженердик системалар &',
      headingAccent: 'UX Кейстер',
      description:
        'Full-stack веб тиркемелер, Gemini AI интеграциялары жана математикалык тактык менен аткарылган UX/маалымат анализдери.',
      specs: ['4 Даяр долбоор', 'React & TypeScript', 'Python & Data Science', 'Gemini AI API'],
      filters: {
        all: 'Баары',
        fullstack: 'Программалоо & Full-Stack',
        data: 'Маалымат анализи & ML',
        ux: 'UX Изилдөө & Системалар',
      },
      statusStrip: ['Ишке даяр', 'Изилдөө деңгээли', '2024–2026'],
      thesisAbstractTitle: 'Дипломдук аннотация',
      olsSummaryTitle: 'OLS регрессия жыйынтыгы',
      items: {
        'atelier-luma': {
          categoryLabel: 'Программа & AI',
          title: 'ATELIER LUMA',
          description:
            'Gemini API жардамчысы менен жабдылган жана Vercel аркылуу үзгүлтүксүз жайгаштырылган көп тилдүү сулуулук салонунун веб тиркемеси.',
          primaryLabel: 'Тиркемени ачуу',
          secondaryLabel: 'Код',
          caseStudy: {
            subtitle: 'Көп тилдүү AI брондоо платформасы · Продакшн веб тиркеме',
            role: 'Full-Stack Иштеп чыгуучу & UX Дизайнер',
            overview:
              'Кардарларга процедураларды тандоого жана убакыт белгилөөгө жардам берген Gemini AI консьержи бар ыңгайлашуучу көп тилдүү салон платформасын иштеп чыктым.',
            highlights: [
              'Чех, англис жана орус тилдеринде бирдей так иштеген локализацияланган интерфейстер.',
              'Процедуралар боюнча суроолорго жооп берүүчү Gemini API жардамчысы интеграцияланды.',
              'Vercel платформасында автоматташтырылган CI/CD алдын ала кароо жана жарыялоо.',
            ],
            technicalNotes:
              'React 18, TypeScript, Tailwind CSS жана серверсиз Gemini API негизинде курулган.',
          },
        },
        'personal-photo-gallery': {
          categoryLabel: 'Full-Stack Веб',
          title: 'Personal Photo Gallery',
          description:
            'Коопсуз аутентификация, сүрөт башкаруу, реляциялык издөө жана түз билдирүү алмашуусу бар full-stack веб тиркеме.',
          accessNote: 'Бул баракчанын мазмунун көрүү үчүн алгач катталып же киришиңиз керек.',
          primaryLabel: 'Тиркемени ачуу',
          secondaryLabel: 'Код',
          caseStudy: {
            subtitle: 'Реляциялык медиа & билдирүү платформасы · Бэкенд архитектурасы',
            role: 'Бэкенд & Full-Stack Инженер',
            overview:
              'Flask жана нормалдаштырылган SQLite 3 схемалары аркылуу курулган социалдык сүрөт галереясы. Сүрөт жүктөө, тег боюнча издөө жана түз билдирүүлөр аутентификация аркылуу корголгон.',
            highlights: [
              'Галереяны, профилдерди жана билдирүүлөрдү көрүү үчүн милдеттүү катталуу/кирүү системасы.',
              'Колдонуучуларды, альбомдорду, метадайындарды жана чаттарды байланыштырган SQLite 3 схемасы.',
              'Сүрөттөмөлөр, тегдер жана убакыт боюнча параметрленген SQL издөө сурамдары.',
            ],
            technicalNotes: 'Python 3 · Flask Blueprints · Jinja2 · Индекстелген SQLite 3.',
          },
        },
        'traffic-accident-analysis': {
          categoryLabel: 'Маалымат & Аналитика',
          title: 'Traffic Accident Analysis',
          description:
            'Python, pandas жана statsmodels колдонуу менен Түштүк Кореянын 17 аймагындагы 2023–2024 жол кырсыктарынын статистикалык OLS регрессиялык модели.',
          primaryLabel: 'Ноутбук',
          secondaryLabel: 'Код',
          metricsHeadline: 'OLS Модели (R²=1.000)',
          metricsSampleSize: 'N=17 аймак',
          materialLabels: ['HTML Ноутбук', 'Изилдөө иши (PDF)', 'Маалымат (CSV)'],
          caseStudy: {
            subtitle: 'Жол коопсуздугун эмпирикалык моделдөө · Кореянын 17 аймагы (2023–2024)',
            role: 'Маалымат аналитиги',
            overview:
              'Түштүк Кореянын 17 провинциясы жана шаарлары боюнча 2023–2024 жол кырсыктарын статистикалык баалоо, OLS сызыктуу регрессия моделин куруу жана академиялык макала даярдоо.',
            highlights: [
              'Python жана pandas аркылуу 2023–2024 аймактык CSV маалыматтары иштелип чыкты.',
              'R² = 1.000 тактыктагы OLS регрессия модели түзүлдү (F = 3.518e+04, p = 1.07e-26).',
              'Регрессия диагностикасы жана matplotlib графиктери камтылган толук академиялык иш жазылды.',
            ],
            technicalNotes:
              'Python 3 · pandas · scipy.stats · statsmodels · matplotlib · Jupyter HTML.',
          },
        },
        'czu-uis-ux-thesis': {
          categoryLabel: 'UX Изилдөө',
          title: 'CZU UIS UX Thesis',
          description:
            'Когнитивдик талдоо жана студенттер менен колдонуучу тестирлөө аркылуу CZU Университеттик маалымат системасынын (UIS) UX баалоосу.',
          primaryLabel: 'Аннотация',
          secondaryLabel: "CZU '26",
          caseStudy: {
            subtitle: 'Бакалаврдык дипломдук иш · Адам-компьютер өз ара аракеттенүүсү & WCAG 2.2',
            role: 'UX Изилдөөчү & Информатика студенти',
            overview:
              'Прагадагы Чех жаратылыш таануу университетинин (CZU) Маалыматтык системасын (UIS) студенттик тестирлөө жана WCAG 2.2 аудити аркылуу комплекстүү баалоо жана жакшыртуу сунушу.',
            highlights: [
              'Студенттердин негизги сценарийлери (курстарга жазылуу, экзамендер, баалар) боюнча когнитивдик талдоо.',
              'Тапшырмаларды аткаруу ылдамдыгын жана кыйынчылыктарды өлчөөчү юзабилити-тестирлөө.',
              'WCAG 2.2 Level AA стандартына жооп берген жогорку контрасттуу, баскычтопко ыңгайлуу UI сунушталды.',
            ],
            technicalNotes: 'Экономика жана менеджмент факультети · CZU Прага · 2026/2027.',
          },
        },
      },
    },
    modal: {
      closeAria: 'Терезени жабуу',
      keyDeliverables: 'Негизги жыйынтыктар & Табылгалар',
      stackAndSource: 'Технологиялар & Булак:',
      projectMaterials: 'Долбоор материалдары',
      closeButton: 'Жабуу',
    },
    contact: {
      eyebrow: '04 · Байланыш & Кызматташуу',
      title: 'Байланыш & Кызматташуу',
      intro:
        'Прагада же алыстан программалоо жана маалымат анализи боюнча junior кызматтарга жана стажировкаларга ачыкмын. Чехияда расмий иштөө укугу бар (күндүзгү бөлүмдүн студенти).',
      availability: ['Жооп: < 24 саат', 'Прага, CZ (GMT+1)', 'Чехияда иштөө уруксаты бар'],
      directMail: 'Түз Почта',
      phoneWhatsapp: 'Телефон / WhatsApp',
      professionalNetwork: 'Кесиптик тармак',
      timezoneLabel: 'Убакыт алкагы',
      copyTitle: 'Даректи көчүрүү',
      copiedTitle: 'Көчүрүлдү!',
      sendEmailTitle: 'Кат жөнөтүү',
      directDialTitle: 'Түз чалуу',
      openLinkedinTitle: 'LinkedIn профилин ачуу',
      formEyebrow: 'Түз кайрылуу формасы',
      formTitle: 'Билдирүү жөнөтүү',
      formSubtitle: 'Долбоор, бош орун же техникалык сурооңуз барбы? Төмөндө жазыңыз.',
      nameLabel: 'Аты-жөнү / Уюм',
      namePlaceholder: 'Атыңыз же компания',
      emailLabel: 'Электрондук почта',
      emailPlaceholder: 'sizdin.pochta@domain.com',
      scopeLabel: 'Кайрылуу багыты',
      scopeOptions: [
        'Junior Программист кызматы',
        'Маалымат анализи / BI стажировка',
        'UX Дизайн & Фронтенд прототиптөө',
        'Биргелешкен долбоор / Фриланс',
        'Жалпы техникалык суроо',
      ],
      messageLabel: 'Билдирүү мазмуну',
      messagePlaceholder: 'Долбооруңуз, мөөнөтү же бош орун тууралуу жазыңыз...',
      httpsNote: 'HTTPS аркылуу корголгон байланыш',
      submitButton: 'Билдирүү жөнөтүү',
      sendingButton: 'Жөнөтүлүүдө...',
      submittedTitle: 'Кат почтага жөнөтүлдү',
      submittedBodyPrefix: 'Рахмат,',
      submittedBodyMiddle: 'Сиздин',
      submittedBodySuffix: 'боюнча кайрылууңуз менин электрондук почтама түз жөнөтүлдү.',
      activationTitle: 'Почтаны активдештирүү каты жөнөтүлдү',
      activationBody:
        'Форманы автоматтык түрдө иштетүү үчүн почтага бир жолку тастыктоо шилтемеси жөнөтүлдү. Кааласаңыз, төмөндөгү баскыч аркылуу да түз жазсаңыз болот.',
      errorTitle: 'Автоматтык жөнөтүү мүмкүн болгон жок',
      errorBody:
        'Азыр сервер аркылуу жөнөтүү ишке ашкан жок. Даяр текст менен почта тиркемесин ачуу үчүн төмөнкү баскычты басыңыз.',
      openMailAppButton: 'Почтаны ачуу',
      dismissButton: 'Жабуу',
      calloutEyebrow: 'Кызматташуу эскертмеси',
      calloutQuote: '«Биргелешип ишенимдүү системаларды жана маалымат агымдарын курууга кубанычтамын.»',
      quickPing: 'Тез байланыш',
    },
    languageCards: {
      ky: {
        name: 'Кыргызча',
        nativeName: 'Kyrgyz',
        proficiency: 'Эне тили',
        context: 'Эне тилим · Кыргызстан',
      },
      ru: {
        name: 'Орусча',
        nativeName: 'Русский',
        proficiency: 'Эне тилиндей / Билингвал',
        context: 'Академиялык & көп тилдүү UI локализация',
      },
      en: {
        name: 'Англисче',
        nativeName: 'English',
        proficiency: 'Эркин (C1)',
        context: 'Университеттик окуу & техникалык инженерия',
      },
      cs: {
        name: 'Чехче',
        nativeName: 'Čeština',
        proficiency: 'Жакшы (B2+)',
        context: 'Күнүмдүк турмуш & CZU Прага чөйрөсү',
      },
    },
  },

  ru: {
    langCode: 'ru',
    htmlLang: 'ru',
    nav: {
      index: '~/главная',
      education: '~/образование',
      projects: '~/проекты',
      contact: '~/контакты',
    },
    navBrowseGithub: 'Открыть GitHub',
    theme: {
      auto: 'Авто',
      day: 'День',
      night: 'Ночь',
      phaseLabels: {
        day: 'Дневной свет',
        night: 'Ночной режим',
      },
      groupAriaLabel: 'Выбор темы по времени суток',
    },
    footer: {
      affiliation: "CZU Prague '25",
      discipline: 'Информатика и UX',
      copyright: '© 2026 Arina Ametova. Все права защищены.',
      languageLabel: 'Язык',
      backToTop: 'Наверх',
    },
    home: {
      availableForRoles: 'Открыта к предложениям',
      role: 'Информатика и UX-дизайн',
      location: 'Прага, Чехия',
      tagline:
        'Проектирую продуманные цифровые продукты на стыке компьютерных наук и человекоцентричного UX-дизайна.',
      exploreCaseStudies: 'Смотреть проекты',
      degreeBadge: 'B.Sc. Информатика',
      universityShort: 'CZU Прага',
      storyEyebrow: 'История и философия',
      storyPara1:
        'Родом из Кыргызстана, сейчас живу и учусь в Праге. Мой путь начался с переезда за границу в 16 лет. Сегодня я изучаю информатику в Чешском аграрном университете в Праге (CZU), объединяя инженерные системы и удобство интерфейсов.',
      storyPara2:
        'Я убеждена, что сильный дизайн — это не просто визуальный декор, а структурная ясность, доступность и эмпатия, заложенные в каждый сценарий взаимодействия.',
      storyTagLeft: 'CZU Прага · Информатика',
      storyTagRight: 'UX-архитектура и код',
      cards: {
        educationLabel: 'Образование',
        educationTitle: 'Академический путь и мобильность',
        portfolioLabel: 'Портфолио',
        portfolioTitle: 'Избранные проекты и кейсы',
        contactLabel: 'Контакты',
        contactTitle: 'Связаться и обсудить сотрудничество',
      },
      languagesEyebrow: 'Мультиязычная коммуникация',
      languagesTitle: 'Языки, которыми я владею',
      languagesHint: 'Нажмите на карточку языка, чтобы переключить язык сайта',
      activeLanguageBadge: 'Выбран',
      clickToSwitch: 'Выбрать',
      explorerEyebrow: '3D-карта проектов',
      explorerTitle: 'Исследуйте проекты в 3D',
      explorerHint: 'Потяните, чтобы вращать · Нажмите на проект для просмотра или открытия кейса',
    },
    explorer3d: {
      ariaLabel: 'Интерактивная 3D-карта проектов',
      contextLost: '3D-контекст приостановлен. Восстановление сцены...',
      openCaseStudy: 'Открыть кейс',
      showControls: 'Показать управление',
      hideControls: 'Скрыть управление',
      play: 'Старт',
      pause: 'Пауза',
      spin: 'Ускорить',
      resetCamera: 'Сбросить камеру',
      allProjects: 'Все проекты',
    },
    education: {
      eyebrow: '02 · Академическая база',
      title: 'Образование',
      subtitle: 'Информатика и международный обмен',
      description:
        'Фундаментальное образование в области компьютерных наук и международная академическая мобильность с фокусом на UX и интерактивные системы.',
      thesisTopicLabel: 'Тема диплома:',
      spokenLanguagesTitle: 'Владение языками (нажмите, чтобы сменить язык сайта)',
      spokenLanguagesHint: 'Переключатель языка',
      routeCoordinates:
        'Кыргызстан (42.87°N, 74.57°E) → Прага (50.08°N, 14.44°E) → Сеул (37.57°N, 126.98°E)',
      nextStepsEyebrow: 'Следующий шаг',
      nextStepsTitle: 'Изучите реальные проекты и дизайн-системы',
      nextStepsDesc: 'Посмотрите подробные кейсы, интерфейсы и фронтенд-прототипы.',
      nextStepsButton: 'Смотреть проекты',
      globe: {
        routeTitle: 'Кыргызстан → Прага → Сеул',
        dragHint: 'Вращайте глобус · Нажмите на город для фокуса',
        overview: 'Обзор',
        cities: {
          kyrgyzstan: { label: 'Кыргызстан', sub: 'Родина' },
          prague: { label: 'Прага', sub: 'CZU' },
          seoul: { label: 'Сеул', sub: 'Обмен' },
        },
      },
      entries: {
        'seoul-exchange': {
          period: 'Февраль – Июнь 2026',
          status: 'Предстоит',
          location: 'Сеул, Южная Корея',
          title: 'Программа обмена по информационной и коммуникационной инженерии',
          description:
            'Отобрана для международного семестра по обмену с фокусом на мобильные сети, интерактивные системы и кросс-культурный UI-дизайн.',
          fieldLabel: 'Направление',
          fieldValue: 'Информационная и коммуникационная инженерия',
        },
        'czu-bsc': {
          period: '2023 – 2027 (Ожидается)',
          status: 'Текущая степень',
          location: 'Прага, Чехия',
          title: 'Бакалавр информатики (BSc)',
          institution: 'Чешский аграрный университет в Праге (CZU)',
          description:
            'Программа бакалавриата по компьютерным наукам и информационным системам, объединяющая разработку ПО, анализ данных и UX-дизайн.',
          thesisTopic: 'Пользовательский опыт (UX)',
          coursework: [
            'Объектно-ориентированное программирование',
            'Реляционные базы данных и SQL',
            'UX-архитектура',
            'Распределённые веб-системы',
          ],
        },
      },
    },
    projects: {
      eyebrow: '03 · Технические работы и кейсы',
      periodTag: 'Избранные проекты 2024–2026',
      headingPrefix: 'Инженерные системы и',
      headingAccent: 'UX-исследования',
      description:
        'Full-stack веб-приложения, интеграции с Gemini AI и эмпирический UX/анализ данных с вниманием к деталям и математической точностью.',
      specs: ['4 готовых проекта', 'React и TypeScript', 'Python и Data Science', 'Gemini AI API'],
      filters: {
        all: 'Все проекты',
        fullstack: 'Разработка и Full-Stack',
        data: 'Анализ данных и ML',
        ux: 'UX-исследования и системы',
      },
      statusStrip: ['Готово к запуску', 'Научный подход', '2024–2026'],
      thesisAbstractTitle: 'Аннотация диплома',
      olsSummaryTitle: 'Сводка OLS-регрессии',
      items: {
        'atelier-luma': {
          categoryLabel: 'ПО и ИИ',
          title: 'ATELIER LUMA',
          description:
            'Мультиязычное веб-приложение салона красоты с AI-консультантом записи на базе Gemini API и деплоем на Vercel.',
          primaryLabel: 'Открыть сайт',
          secondaryLabel: 'Код',
          caseStudy: {
            subtitle: 'Мультиязычная AI-платформа записи · Продакшн-приложение',
            role: 'Full-Stack разработчик и UX-дизайнер',
            overview:
              'Спроектировала и запустила адаптивную мультиязычную веб-платформу с интерактивным AI-ассистентом на базе Gemini API, помогающим клиентам подобрать процедуры и время визита.',
            highlights: [
              'Полная локализация пользовательских сценариев на чешский, английский и русский языки.',
              'Интегрирован Gemini API ассистент для ответов по услугам и подбора слотов записи.',
              'Настроены автоматические CI/CD-сборки и предпросмотры на Vercel.',
            ],
            technicalNotes:
              'React 18, TypeScript, Tailwind CSS и серверные маршруты Gemini API.',
          },
        },
        'personal-photo-gallery': {
          categoryLabel: 'Full-Stack Веб',
          title: 'Personal Photo Gallery',
          description:
            'Full-stack веб-приложение с авторизацией пользователей, управлением фото, SQL-поиском и личными сообщениями.',
          accessNote: 'Для просмотра содержимого сайта необходимо зарегистрироваться или войти.',
          primaryLabel: 'Открыть сайт',
          secondaryLabel: 'Код',
          caseStudy: {
            subtitle: 'Реляционная медиа- и чат-платформа · Бэкенд-архитектура',
            role: 'Backend и Full-Stack инженер',
            overview:
              'Социальная фотогалерея на Flask и нормализованной базе данных SQLite 3 с защищённой загрузкой снимков, поиском по тегам и личными сообщениями.',
            highlights: [
              'Обязательная аутентификация перед доступом к галерее, профилям и перепискам.',
              'Нормализованная схема SQLite 3 для пользователей, альбомов, фото и сообщений.',
              'Параметризованный SQL-поиск по описаниям, тегам и датам загрузки.',
            ],
            technicalNotes: 'Python 3 · Flask Blueprints · Jinja2 · SQLite 3 с индексами.',
          },
        },
        'traffic-accident-analysis': {
          categoryLabel: 'Данные и аналитика',
          title: 'Traffic Accident Analysis',
          description:
            'Статистическая OLS-регрессия аварийности за 2023–2024 гг. по 17 регионам Южной Кореи на Python, pandas и statsmodels.',
          primaryLabel: 'Ноутбук',
          secondaryLabel: 'Код',
          metricsHeadline: 'OLS модель (R²=1.000)',
          metricsSampleSize: 'N=17 регионов',
          materialLabels: ['HTML-ноутбук', 'Итоговая работа (PDF)', 'Датасет (CSV)'],
          caseStudy: {
            subtitle: 'Эмпирическое моделирование безопасности дорог · 17 регионов Кореи',
            role: 'Аналитик данных',
            overview:
              'Статистическая оценка числа дорожно-транспортных происшествий в 17 провинциях и мегаполисах Южной Кореи (2023 vs. 2024) с построением линейной регрессии МНК (OLS) и оформлением научной статьи.',
            highlights: [
              'Обработаны региональные CSV-данные 2023–2024 гг. (кодировка CP949) в Python и pandas.',
              'Построена OLS-модель с R² = 1.000 (коэффициент 0.9809, F = 3.518e+04, p = 1.07e-26).',
              'Подготовлена полноценная академическая работа с диагностикой и графиками matplotlib.',
            ],
            technicalNotes:
              'Python 3 · pandas · scipy.stats · statsmodels · matplotlib · Jupyter HTML.',
          },
        },
        'czu-uis-ux-thesis': {
          categoryLabel: 'UX-исследование',
          title: 'CZU UIS UX Thesis',
          description:
            'UX-оценка и анализ юзабилити информационной системы университета CZU (UIS) с когнитивным аудитом и тестированием студентов.',
          primaryLabel: 'Аннотация',
          secondaryLabel: "CZU '26",
          caseStudy: {
            subtitle: 'Бакалаврская работа · HCI и доступность интерфейсов',
            role: 'UX-исследователь',
            overview:
              'Комплексная оценка юзабилити и концепция редизайна университетской системы UIS в CZU Прага на основе пользовательского тестирования студентов и аудита WCAG 2.2.',
            highlights: [
              'Проведены когнитивные инспекции ключевых сценариев (запись на курсы, экзамены, оценки).',
              'Выполнены модерируемые юзабилити-тесты с замером успешности и времени выполнения задач.',
              'Предложена контрастная и доступная с клавиатуры архитектура UI уровня WCAG 2.2 AA.',
            ],
            technicalNotes:
              'Факультет экономики и менеджмента · CZU Прага · Защита 2026/2027.',
          },
        },
      },
    },
    modal: {
      closeAria: 'Закрыть окно',
      keyDeliverables: 'Ключевые результаты и выводы',
      stackAndSource: 'Стек и источники:',
      projectMaterials: 'Материалы проекта',
      closeButton: 'Закрыть',
    },
    contact: {
      eyebrow: '04 · Каналы связи',
      title: 'Контакты и сотрудничество',
      intro:
        'Открыта к позициям junior-разработчика и техническим стажировкам в сфере разработки ПО и анализа данных в Праге или удалённо. Имею право на работу в Чехии (статус студента очной формы).',
      availability: ['Ответ: < 24ч', 'Прага, CZ (GMT+1)', 'Право на работу в ЧР'],
      directMail: 'Электронная почта',
      phoneWhatsapp: 'Телефон / WhatsApp',
      professionalNetwork: 'LinkedIn',
      timezoneLabel: 'Часовой пояс',
      copyTitle: 'Скопировать адрес',
      copiedTitle: 'Скопировано!',
      sendEmailTitle: 'Написать письмо',
      directDialTitle: 'Позвонить',
      openLinkedinTitle: 'Открыть профиль LinkedIn',
      formEyebrow: 'Форма обратной связи',
      formTitle: 'Отправить сообщение',
      formSubtitle: 'Есть проект, вакансия или технический вопрос? Напишите ниже.',
      nameLabel: 'Имя / Организация',
      namePlaceholder: 'Ваше имя или компания',
      emailLabel: 'Электронная почта',
      emailPlaceholder: 'your.email@domain.com',
      scopeLabel: 'Тема обращения',
      scopeOptions: [
        'Позиция Junior Software Engineer',
        'Стажировка в анализе данных / BI',
        'UX-дизайн и прототипирование',
        'Совместный проект / Фриланс',
        'Общий технический вопрос',
      ],
      messageLabel: 'Текст сообщения',
      messagePlaceholder: 'Расскажите о проекте, сроках или открытой вакансии...',
      httpsNote: 'Защищённая передача по HTTPS',
      submitButton: 'Отправить',
      sendingButton: 'Отправка...',
      submittedTitle: 'Сообщение отправлено на почту',
      submittedBodyPrefix: 'Спасибо,',
      submittedBodyMiddle: 'Ваше обращение по теме',
      submittedBodySuffix: 'успешно отправлено прямо на мою электронную почту.',
      activationTitle: 'Отправлено письмо для активации формы',
      activationBody:
        'На почту отправлена одноразовая ссылка для подтверждения приёма сообщений с формы. Вы также можете открыть почтовый клиент кнопкой ниже.',
      errorTitle: 'Не удалось отправить автоматически',
      errorBody:
        'Автоматическая отправка сейчас недоступна. Нажмите кнопку ниже, чтобы открыть почтовый клиент с уже заполненным письмом.',
      openMailAppButton: 'Открыть почту',
      dismissButton: 'Скрыть',
      calloutEyebrow: 'О сотрудничестве',
      calloutQuote: '«Буду рада вместе создавать надёжные системы и понятные интерфейсы.»',
      quickPing: 'Написать сразу',
    },
    languageCards: {
      ky: {
        name: 'Кыргызский',
        nativeName: 'Кыргызча',
        proficiency: 'Родной',
        context: 'Родной язык · Кыргызстан',
      },
      ru: {
        name: 'Русский',
        nativeName: 'Русский',
        proficiency: 'Родной / Билингв',
        context: 'Академическая среда и локализация UI',
      },
      en: {
        name: 'Английский',
        nativeName: 'English',
        proficiency: 'Свободный (C1)',
        context: 'Обучение в вузе и техническая разработка',
      },
      cs: {
        name: 'Чешский',
        nativeName: 'Čeština',
        proficiency: 'Уверенный (B2+)',
        context: 'Повседневное общение и жизнь в Праге',
      },
    },
  },

  cs: {
    langCode: 'cs',
    htmlLang: 'cs',
    nav: {
      index: '~/úvod',
      education: '~/vzdělání',
      projects: '~/projekty',
      contact: '~/kontakt',
    },
    navBrowseGithub: 'Otevřít GitHub',
    theme: {
      auto: 'Auto',
      day: 'Den',
      night: 'Noc',
      phaseLabels: {
        day: 'Denní světlo',
        night: 'Noční režim',
      },
      groupAriaLabel: 'Režim motivu podle denní doby',
    },
    footer: {
      affiliation: "ČZU Praha '25",
      discipline: 'Informatika & UX',
      copyright: '© 2026 Arina Ametova. Všechna práva vyhrazena.',
      languageLabel: 'Jazyk',
      backToTop: 'Zpět nahoru',
    },
    home: {
      availableForRoles: 'Otevřená nabídkám',
      role: 'Informatika & UX Design',
      location: 'Praha, ČR',
      tagline:
        'Navrhuji přehledné digitální produkty na pomezí informatiky a uživatelsky zaměřeného UX designu.',
      exploreCaseStudies: 'Prohlédnout projekty',
      degreeBadge: 'Bc. Informatika',
      universityShort: 'ČZU Praha',
      storyEyebrow: 'Příběh & Filozofie',
      storyPara1:
        'Pocházím z Kyrgyzstánu a působím v Praze. Moje cesta začala odvážným krokem do zahraničí v 16 letech. Dnes studuji Informatiku na České zemědělské univerzitě v Praze (ČZU) se zaměřením na propojení softwarových systémů a použitelnosti.',
      storyPara2:
        'Věřím, že skvělý design není jen vizuální dekorace — je to strukturální jasnost, přístupnost a empatie promítnutá do každodenní interakce.',
      storyTagLeft: 'ČZU Praha Informatika',
      storyTagRight: 'UX Architektura & Kód',
      cards: {
        educationLabel: 'Vzdělání',
        educationTitle: 'Akademická cesta & Vzdělání',
        portfolioLabel: 'Portfolio',
        portfolioTitle: 'Vybrané projekty & Případové studie',
        contactLabel: 'Kontakt',
        contactTitle: 'Spojte se se mnou',
      },
      languagesEyebrow: 'Vícejazyčná komunikace',
      languagesTitle: 'Jazyky, kterými mluvím',
      languagesHint: 'Kliknutím na kartu jazyka přepnete jazyk celého webu',
      activeLanguageBadge: 'Aktivní',
      clickToSwitch: 'Přepnout',
      explorerEyebrow: '3D Průzkumník projektů',
      explorerTitle: 'Prozkoumejte mé projekty ve 3D',
      explorerHint: 'Tažením otáčejte · Kliknutím na popisek projekt zobrazíte nebo otevřete',
    },
    explorer3d: {
      ariaLabel: 'Interaktivní 3D mapa projektů',
      contextLost: '3D grafika pozastavena. Obnovuji mapu projektů...',
      openCaseStudy: 'Otevřít studii',
      showControls: 'Zobrazit ovládání',
      hideControls: 'Skrýt ovládání',
      play: 'Spustit',
      pause: 'Pozastavit',
      spin: 'Roztočit',
      resetCamera: 'Resetovat kameru',
      allProjects: 'Všechny projekty',
    },
    education: {
      eyebrow: '02 · Studium',
      title: 'Vzdělání',
      subtitle: 'Informatika & Akademická mobilita',
      description:
        'Pevné základy počítačových věd a mezinárodní akademická mobilita se zaměřením na UX a interaktivní systémy.',
      thesisTopicLabel: 'Téma bakalářské práce:',
      spokenLanguagesTitle: 'Jazykové znalosti (kliknutím přepnete jazyk webu)',
      spokenLanguagesHint: 'Přepínač jazyka',
      routeCoordinates:
        'Kyrgyzstán (42.87°N, 74.57°E) → Praha (50.08°N, 14.44°E) → Soul (37.57°N, 126.98°E)',
      nextStepsEyebrow: 'Další krok',
      nextStepsTitle: 'Prohlédněte si reálné projekty a designovou práci',
      nextStepsDesc: 'Prozkoumejte případové studie, návrhy rozhraní a frontendové prototypy.',
      nextStepsButton: 'Prohlédnout projekty',
      globe: {
        routeTitle: 'Kyrgyzstán → Praha → Soul',
        dragHint: 'Tažením otáčejte · Klikněte na město',
        overview: 'Přehled',
        cities: {
          kyrgyzstan: { label: 'Kyrgyzstán', sub: 'Domov' },
          prague: { label: 'Praha', sub: 'ČZU' },
          seoul: { label: 'Soul', sub: 'Výměnný pobyt' },
        },
      },
      entries: {
        'seoul-exchange': {
          period: 'Únor – Červen 2026',
          status: 'Nadcházející',
          location: 'Soul, Jižní Korea',
          title: 'Výměnný studijní program Information and Communication Engineering',
          description:
            'Vybrána pro mezinárodní studijní pobyt zaměřený na mobilní komunikační sítě, interaktivní systémy a mezikulturní UX design.',
          fieldLabel: 'Obor',
          fieldValue: 'Information and Communication Engineering',
        },
        'czu-bsc': {
          period: '2023 – 2027 (Očekáváno)',
          status: 'Probíhající studium',
          location: 'Praha, Česká republika',
          title: 'Bc. v oboru Informatika',
          institution: 'Česká zemědělská univerzita v Praze (ČZU)',
          description:
            'Bakalářský studijní program propojující softwarové inženýrství, datovou analýzu a návrh uživatelských rozhraní.',
          thesisTopic: 'Uživatelská zkušenost (UX)',
          coursework: [
            'Objektově orientované programování',
            'Relační databáze & SQL',
            'UX Architektura',
            'Distribuované webové systémy',
          ],
        },
      },
    },
    projects: {
      eyebrow: '03 · Technická práce & Studie',
      periodTag: 'Vybrané práce 2024–2026',
      headingPrefix: 'Softwarové systémy &',
      headingAccent: 'UX Případové studie',
      description:
        'Full-stack webové aplikace, integrace Gemini AI a empirické UX i datové analýzy s důrazem na řemeslné zpracování a přesnost.',
      specs: ['4 Hotové projekty', 'React & TypeScript', 'Python & Data Science', 'Gemini AI API'],
      filters: {
        all: 'Všechny projekty',
        fullstack: 'Software & Full-Stack',
        data: 'Datová analýza & ML',
        ux: 'UX Výzkum & Systémy',
      },
      statusStrip: ['Připraveno k nasazení', 'Výzkumná úroveň', '2024–2026'],
      thesisAbstractTitle: 'Abstrakt bakalářské práce',
      olsSummaryTitle: 'Souhrn OLS regrese',
      items: {
        'atelier-luma': {
          categoryLabel: 'Software & AI',
          title: 'ATELIER LUMA',
          description:
            'Vícejazyčná webová aplikace kosmetického salonu s AI rezervačním asistentem přes Gemini API a nasazením na Vercel.',
          primaryLabel: 'Živá aplikace',
          secondaryLabel: 'Kód',
          caseStudy: {
            subtitle: 'Vícejazyčná AI rezervační platforma · Produkční web',
            role: 'Full-Stack vývojářka & UX designérka',
            overview:
              'Navrhla a vytvořila jsem responzivní vícejazyčnou webovou platformu s interaktivním Gemini AI asistentem, který provází klienty výběrem procedur a rezervací termínu.',
            highlights: [
              'Lokalizované uživatelské toky v češtině, angličtině a ruštině bez posunů rozvržení.',
              'Integrace Gemini API asistenta pro dotazy ke službám a doporučení vhodných termínů.',
              'Automatizované CI/CD náhledy a produkční nasazení na platformě Vercel.',
            ],
            technicalNotes:
              'Vytvořeno pomocí React 18, TypeScript, Tailwind CSS a serverless Gemini API.',
          },
        },
        'personal-photo-gallery': {
          categoryLabel: 'Full-Stack Web',
          title: 'Personal Photo Gallery',
          description:
            'Full-stack webová aplikace s bezpečnou autentizací uživatelů, správou fotografií, SQL vyhledáváním a přímými zprávami.',
          accessNote: 'Pro zobrazení obsahu této stránky se musíte nejprve zaregistrovat nebo přihlásit.',
          primaryLabel: 'Živá aplikace',
          secondaryLabel: 'Kód',
          caseStudy: {
            subtitle: 'Relační galerie a chatovací platforma · Backend architektura',
            role: 'Backend & Full-Stack vývojářka',
            overview:
              'Full-stack sociální fotogalerie postavená na Flasku a normalizované databázi SQLite 3 s chráněným nahráváním fotek, filtrováním podle tagů a zprávami.',
            highlights: [
              'Povinná autentizace před zobrazením obsahu galerie, profilů a soukromých zpráv.',
              'Normalizované relační schéma SQLite 3 pro uživatele, alba, metadata a vlákna zpráv.',
              'Parametrizované SQL dotazy pro vyhledávání podle popisků, tagů a času nahrání.',
            ],
            technicalNotes: 'Python 3 · Flask Blueprints · Jinja2 · SQLite 3 s indexovanými klíči.',
          },
        },
        'traffic-accident-analysis': {
          categoryLabel: 'Data & Analytika',
          title: 'Traffic Accident Analysis',
          description:
            'Statistická OLS regrese dopravních nehod za roky 2023 a 2024 v 17 regionech Jižní Koreje v Pythonu, pandas a statsmodels.',
          primaryLabel: 'Notebook',
          secondaryLabel: 'Kód',
          metricsHeadline: 'OLS Model (R²=1.000)',
          metricsSampleSize: 'N=17 regionů',
          materialLabels: ['HTML Notebook', 'Závěrečná práce (PDF)', 'Dataset (CSV)'],
          caseStudy: {
            subtitle: 'Empirické modelování nehodovosti · 17 korejských regionů',
            role: 'Datová analytička',
            overview:
              'Statistické vyhodnocení počtu dopravních nehod v 17 jihokorejských provinciích a městech (2023 vs. 2024) pomocí lineární regrese nejmenších čtverců (OLS) a odborné studie.',
            highlights: [
              'Zpracování regionálních CSV dat z let 2023–2024 (kódování CP949) v Pythonu a pandas.',
              'Sestavení OLS regresního modelu s R² = 1.000 (směrnice 0.9809, F = 3.518e+04, p = 1.07e-26).',
              'Vypracování kompletní akademické zprávy s diagnostikou a grafy v matplotlib.',
            ],
            technicalNotes:
              'Python 3 · pandas · scipy.stats · statsmodels · matplotlib · Jupyter HTML.',
          },
        },
        'czu-uis-ux-thesis': {
          categoryLabel: 'UX Výzkum',
          title: 'CZU UIS UX Thesis',
          description:
            'Hodnocení UX a použitelnosti Univerzitního informačního systému ČZU (UIS) pomocí kognitivního průchodu a testování se studenty.',
          primaryLabel: 'Abstrakt',
          secondaryLabel: "ČZU '26",
          caseStudy: {
            subtitle: 'Bakalářská práce · Interakce člověk–počítač & Přístupnost',
            role: 'UX výzkumnice & studentka informatiky',
            overview:
              'Komplexní evaluace použitelnosti a návrh redesignu Univerzitního informačního systému ČZU v Praze (UIS) kombinující studentské testování a audit přístupnosti WCAG 2.2.',
            highlights: [
              'Kognitivní průchody klíčových scénářů (zápis předmětů, přihlašování ke zkouškám, známky).',
              'Moderované testování použitelnosti s měřením úspěšnosti a času dokončení úkolů.',
              'Návrh vysoce kontrastní architektury rozhraní v souladu s WCAG 2.2 Level AA.',
            ],
            technicalNotes: 'Provozně ekonomická fakulta · ČZU Praha · Obhajoba 2026/2027.',
          },
        },
      },
    },
    modal: {
      closeAria: 'Zavřít okno',
      keyDeliverables: 'Klíčové výstupy & Zjištění',
      stackAndSource: 'Technologie & Zdroje:',
      projectMaterials: 'Materiály k projektu',
      closeButton: 'Zavřít',
    },
    contact: {
      eyebrow: '04 · Kontakty & Spolupráce',
      title: 'Kontakt & Spolupráce',
      intro:
        'Jsem otevřená juniorským pozicím a technickým stážím v oblasti vývoje softwaru a datové analýzy v Praze nebo na dálku. Mám volný přístup na trh práce v ČR (studentka prezenčního studia).',
      availability: ['Odpověď: < 24h', 'Praha, ČR (GMT+1)', 'Pracovní oprávnění v ČR'],
      directMail: 'E-mail',
      phoneWhatsapp: 'Telefon / WhatsApp',
      professionalNetwork: 'LinkedIn',
      timezoneLabel: 'Časové pásmo',
      copyTitle: 'Kopírovat adresu',
      copiedTitle: 'Zkopírováno!',
      sendEmailTitle: 'Odeslat e-mail',
      directDialTitle: 'Zavolat',
      openLinkedinTitle: 'Otevřít profil LinkedIn',
      formEyebrow: 'Kontaktní formulář',
      formTitle: 'Napsat zprávu',
      formSubtitle: 'Máte projekt, volnou pozici nebo technický dotaz? Zanechte zprávu níže.',
      nameLabel: 'Jméno / Organizace',
      namePlaceholder: 'Vaše jméno nebo firma',
      emailLabel: 'E-mailová adresa',
      emailPlaceholder: 'vas.email@domena.cz',
      scopeLabel: 'Téma dotazu',
      scopeOptions: [
        'Pozice Junior Software Engineer',
        'Stáž v datové analýze / BI',
        'UX design & Frontend prototypování',
        'Projektová spolupráce / Freelance',
        'Obecný technický dotaz',
      ],
      messageLabel: 'Text zprávy',
      messagePlaceholder: 'Popište svůj projekt, časový harmonogram nebo nabízenou pozici...',
      httpsNote: 'Šifrovaný přenos přes HTTPS',
      submitButton: 'Odeslat zprávu',
      sendingButton: 'Odesílám...',
      submittedTitle: 'Zpráva odeslána na e-mail',
      submittedBodyPrefix: 'Děkuji,',
      submittedBodyMiddle: 'Váš dotaz k tématu',
      submittedBodySuffix: 'byl úspěšně doručen přímo do mé e-mailové schránky.',
      activationTitle: 'Odeslán jednorázový ověřovací e-mail',
      activationBody:
        'Do schránky byl odeslán potvrzovací odkaz pro aktivaci automatického doručování z formuláře. Níže můžete také otevřít svou e-mailovou aplikaci.',
      errorTitle: 'Automatické odeslání se nezdařilo',
      errorBody:
        'Zprávu se nepodařilo odeslat automaticky. Kliknutím níže otevřete e-mailového klienta s předvyplněným textem.',
      openMailAppButton: 'Otevřít e-mail',
      dismissButton: 'Skrýt',
      calloutEyebrow: 'Poznámka ke spolupráci',
      calloutQuote: '„Těším se na společné navrhování spolehlivých systémů a přehledných datových toků.“',
      quickPing: 'Rychlý kontakt',
    },
    languageCards: {
      ky: {
        name: 'Kyrgyzština',
        nativeName: 'Кыргызча',
        proficiency: 'Rodilá mluvčí',
        context: 'Mateřský jazyk · Kyrgyzstán',
      },
      ru: {
        name: 'Ruština',
        nativeName: 'Русский',
        proficiency: 'Rodilá / Bilingvní',
        context: 'Akademické prostředí & lokalizace UI',
      },
      en: {
        name: 'Angličtina',
        nativeName: 'English',
        proficiency: 'Plynulá (C1)',
        context: 'Univerzitní výuka & technické inženýrství',
      },
      cs: {
        name: 'Čeština',
        nativeName: 'Čeština',
        proficiency: 'Pokročilá (B2+)',
        context: 'Každodenní život & prostředí ČZU Praha',
      },
    },
  },
};
