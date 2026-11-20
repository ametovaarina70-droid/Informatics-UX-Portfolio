export type NavRoute = 'index' | 'education' | 'projects' | 'contact';

export type ProjectCategory = 'all' | 'fullstack' | 'data' | 'ux';

export interface ProjectItem {
  id: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  title: string;
  description: string;
  stack: string[];
  imageUrl?: string;
  imageAlt?: string;
  livePreviewUrl?: string;
  accessNote?: string;
  accentColor: 'cyan' | 'indigo' | 'emerald';
  primaryAction: {
    label: string;
    href?: string;
    modalMode?: 'case-study';
  };
  secondaryAction: {
    label: string;
    href?: string;
    modalTitle?: string;
  };
  metrics?: {
    headline: string;
    sampleSize: string;
    significance: string;
    bars: number[];
  };
  materials?: {
    label: string;
    href: string;
  }[];
  caseStudy: {
    subtitle: string;
    year: string;
    role: string;
    overview: string;
    highlights: string[];
    technicalNotes: string;
  };
}

export interface EducationEntry {
  id: string;
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
  accent: 'cyan' | 'emerald';
}

export interface LanguageItem {
  code: 'ky' | 'ru' | 'en' | 'cs';
  name: string;
  nativeName: string;
  proficiency: string;
  context: string;
  accent: 'amber' | 'cyan' | 'emerald' | 'indigo';
}

export const PROFILE = {
  name: 'Arina Ametova',
  role: 'Informatics & UX Design',
  location: 'Prague, CZ',
  tagline:
    'Designing seamless digital experiences at the intersection of computer science and human-centered UX.',
  portraitUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDq1-PHmlnyiYDDBIYnMO67RYklkRLx_ZcQpod_illV1ZxzqLq7o7hysgA8Rpub6nszuTAjgnkPGO0tfdriH_QGyHiWnTbKxDp1-InuuJCb-MEAl26P6XA3zdyK8kR75lktvXYAwarF0lERF_OwXV3JYqZPPf_-nKhDIB5a4udLxvmFlO9HxCRuGMF8zjCLZ6SJsGv2M_qvGZmwEy5_-4GJhmJzDZuO3fs-fQQPJUOZ_xvcCup41Oxi',
  degreeBadge: 'B.Sc. Informatics',
  email: 'ametova.arina70@gmail.com',
  phone: '+420 773 462 528',
  phoneHref: 'tel:+420773462528',
  linkedinDisplay: 'linkedin.com/in/arinaametova',
  linkedinUrl: 'https://linkedin.com/in/arinaametova',
  githubUrl: 'https://github.com/ametovaarina70-droid',
  timezone: 'CET / UTC+1',
  hubCode: 'PRG-HUB',
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'atelier-luma',
    category: 'fullstack',
    categoryLabel: 'Software & AI',
    title: 'ATELIER LUMA',
    description:
      'Multilingual beauty salon web app with AI booking assistant powered by the Gemini API and continuous Vercel deployment.',
    stack: ['React 18', 'TypeScript', 'Gemini AI'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCv3mgcuiIYQQxb9zprGmQ1ksIYnHIWv3Dt1_nqnip7JoTSKDfYSaFTRI8bXUQNsxvqDWSyNaYH7X6I0X1PY7li-aqX-s4m3fQGAK-dEoVsf007REcBmoQ2rT0bTVMOyXDN40DHOt4XQvUQcLhEbFSuysmNe24iSHRVtCkn_VAsHnuFFmGTU3BvuX50VUK_Q6AoSf_MbRnnSX3OmrbuOy4QqGIooPv2IRQBO9BZ614',
    imageAlt: 'Interface mockup of the Atelier Luma beauty salon booking web application',
    livePreviewUrl: 'https://beauty-salon-six-opal.vercel.app',
    accentColor: 'cyan',
    primaryAction: {
      label: 'Live App',
      href: 'https://beauty-salon-ametovaarina70-droid.vercel.app',
    },
    secondaryAction: {
      label: 'Code',
      href: 'https://github.com/ametovaarina70-droid',
    },
    caseStudy: {
      subtitle: 'Multilingual AI Booking Platform · Production Web App',
      year: '2025',
      role: 'Full-Stack Developer & UX Designer',
      overview:
        'Designed and shipped a responsive multilingual salon web platform featuring an interactive Gemini-powered booking concierge that guides clients through treatment selection and appointment scheduling.',
      highlights: [
        'Localized user flows across Czech, English, and Russian with zero layout shift.',
        'Integrated Gemini API assistant to answer treatment questions and suggest suitable slots.',
        'Deployed with automated CI/CD previews and production builds on Vercel.',
      ],
      technicalNotes: 'Built with React 18, TypeScript, Tailwind CSS, and serverless Gemini API endpoints.',
    },
  },
  {
    id: 'personal-photo-gallery',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Web',
    title: 'Personal Photo Gallery',
    description:
      'Full-stack web application with secure user authentication, photo management, relational query search, and direct messaging.',
    accessNote: 'To view the content of this webpage, you must sign up or sign in first.',
    stack: ['Python', 'Flask', 'SQLite 3'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCZeccNi6lX1X7wMWj23R9VHLcrJsBvKWUbQI0O_vP6_nPLJdqCfYfxFw-Qbe5Fj4dtkcCspEipUuSuiKA8pNZd5K8F26-GcjN5kxAn1PYU5797Dnl99f3F7loPGrU-DK12kIfGGZxNi4rcxoSWjDsfzqvWWEwJFnWUNE-CV_zGzz8FVFRsAt98V4mpBV95N3bWPP2htoV1i9fbj3hcE7019OTQfcpoOdceK6VKvPw',
    imageAlt: 'Personal Photo Gallery and Social Stream dashboard interface',
    livePreviewUrl: 'https://photo-gallery-lilac-five.vercel.app/users',
    accentColor: 'indigo',
    primaryAction: {
      label: 'Live App',
      href: 'https://photo-gallery-lilac-five.vercel.app/users',
    },
    secondaryAction: {
      label: 'Code',
      href: 'https://github.com/ametovaarina70-droid/photo-gallery',
    },
    caseStudy: {
      subtitle: 'Relational Media & Messaging Platform · Backend Architecture',
      year: '2024',
      role: 'Backend & Full-Stack Engineer',
      overview:
        'A full-stack social photo curation platform engineered with Flask and normalized SQLite 3 schemas, supporting authenticated uploads, tag-based filtering, and direct user messaging. Access to gallery content and user streams is protected behind authentication—visitors must sign up or sign in on the live app to explore.',
      highlights: [
        'Authentication gate requiring users to sign up or sign in before viewing gallery content, profiles, or messages.',
        'Normalized SQLite 3 relational schema linking users, albums, photo metadata, and message threads.',
        'Parameterized SQL search queries across captions, tags, and upload timestamps.',
      ],
      technicalNotes: 'Python 3 · Flask Blueprints · Jinja2 · SQLite 3 with indexed foreign keys.',
    },
  },
  {
    id: 'traffic-accident-analysis',
    category: 'data',
    categoryLabel: 'Data & Analytics',
    title: 'Traffic Accident Analysis',
    description:
      'Statistical OLS regression modeling 2023 vs. 2024 traffic accident counts across 17 South Korean regions using Python, pandas, and statsmodels.',
    stack: ['Python', 'pandas', 'statsmodels'],
    accentColor: 'cyan',
    metrics: {
      headline: 'OLS Fit (R²=1.000)',
      sampleSize: 'N=17 regions',
      significance: 'p = 1.07e-26 (F = 3.518e+04)',
      bars: [42, 68, 92, 56, 78],
    },
    primaryAction: {
      label: 'Notebook',
      href: '/assets/aistudio/Traffic_Ac_Regression_93c13654.html',
    },
    secondaryAction: {
      label: 'Code',
      href: 'https://github.com/ametovaarina70-droid/traffic-accidents-regression',
    },
    materials: [
      {
        label: 'HTML Notebook',
        href: '/assets/aistudio/Traffic_Ac_Regression_93c13654.html',
      },
      {
        label: 'Final Paper (PDF)',
        href: '/assets/aistudio/Final_Paper_Arina_2026130147_6fd19e3f.pdf',
      },
      {
        label: 'Dataset (CSV)',
        href: '/assets/aistudio/traffic_accidents_cc7b5edf.csv',
      },
    ],
    caseStudy: {
      subtitle: 'Empirical Road Safety Modeling · 17 Korean Regions (2023–2024)',
      year: '2026',
      role: 'Data Analyst',
      overview:
        'Statistical evaluation of regional traffic collision counts across 17 South Korean provinces and metropolitan cities (2023 vs. 2024), fitting an Ordinary Least Squares (OLS) linear regression model (`accidents_2024 ~ accidents_2023`) alongside a formal research paper.',
      highlights: [
        'Processed regional 2023–2024 traffic collision CSV records (CP949 encoding) in Python and pandas.',
        'Fitted OLS regression model achieving R² = 1.000 (slope = 0.9809, F-statistic = 3.518e+04, p = 1.07e-26).',
        'Authored complete academic final paper with regression diagnostics and matplotlib visualizations.',
      ],
      technicalNotes: 'Python 3 · pandas · scipy.stats · statsmodels · matplotlib · Jupyter HTML.',
    },
  },
  {
    id: 'czu-uis-ux-thesis',
    category: 'ux',
    categoryLabel: 'UX Research',
    title: 'CZU UIS UX Thesis',
    description:
      'UX and usability evaluation of the CZU University Information System through cognitive walkthroughs and student user testing.',
    stack: ['Usability', 'Walkthrough', 'WCAG 2.2'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8fBkqPKo1ABouJE4RnfTOw6eY4c6uStdlFRKT1TQ5cJoRdAjP5oBu4WKsNSnx0fkOspBqEyE1tC16T_SIi7QERqDEvRyOJQIVSM3C55-74X7ivfF_JmHLOkFXnfXqYH_OJhTuScJiZQP2RmjTnx2nqq4MImQ3QW2UkJNfXARoDhg5ozCaXsVMlII9L4CcMQbrzazD5zE6XbzWBC1aZ7BuKC22cB9eG1SNTojuyig',
    imageAlt: 'UX design workspace displaying university student portal wireframes and heatmap analysis',
    accentColor: 'indigo',
    primaryAction: {
      label: 'Abstract',
      modalMode: 'case-study',
    },
    secondaryAction: {
      label: "CZU '26",
    },
    caseStudy: {
      subtitle: 'Bachelor Thesis · Human-Computer Interaction & Accessibility',
      year: '2025 – 2026',
      role: 'UX Researcher & Informatics Candidate',
      overview:
        'Comprehensive usability evaluation and redesign proposal for the Czech University of Life Sciences Prague (CZU) University Information System (UIS), combining empirical student testing with WCAG 2.2 compliance auditing.',
      highlights: [
        'Conducted structured cognitive walkthroughs across critical student workflows (course enrollment, exam registration, grade lookup).',
        'Ran moderated usability testing sessions measuring task completion rate, time-on-task, and friction hotspots.',
        'Proposed high-contrast, keyboard-accessible UI architecture aligned with WCAG 2.2 Level AA.',
      ],
      technicalNotes: 'Faculty of Economics and Management · CZU Prague · Expected Defense 2026/2027.',
    },
  },
];

export const EDUCATION_ENTRIES: EducationEntry[] = [
  {
    id: 'seoul-exchange',
    period: 'February – June 2026',
    status: 'Upcoming',
    location: 'Seoul, South Korea',
    title: 'Exchange Program in Information and Communication Engineering',
    description:
      'Selected for international exchange studies focusing on mobile network communications, interactive systems, and cross-cultural user interface design.',
    fieldLabel: 'Field',
    fieldValue: 'Information and Communication Engineering',
    accent: 'cyan',
  },
  {
    id: 'czu-bsc',
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
    accent: 'emerald',
  },
];

export const LANGUAGES: LanguageItem[] = [
  {
    code: 'ky',
    name: 'Kyrgyz',
    nativeName: 'Кыргызча',
    proficiency: 'Native',
    context: 'Mother tongue · Kyrgyzstan',
    accent: 'amber',
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    proficiency: 'Native / Bilingual',
    context: 'Academic & multilingual UI localization',
    accent: 'cyan',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    proficiency: 'Fluent (C1)',
    context: 'University coursework & technical engineering',
    accent: 'indigo',
  },
  {
    code: 'cs',
    name: 'Czech',
    nativeName: 'Čeština',
    proficiency: 'Proficient (B2+)',
    context: 'Daily life & CZU Prague environment',
    accent: 'emerald',
  },
];
