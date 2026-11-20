import { FormEvent, useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  AtSign,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Loader2,
  Lock,
  Mail,
  Phone,
  Send,
  Share2,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';
import { SiteTranslation } from '../data/translations';

interface ContactViewProps {
  t: SiteTranslation;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ContactView({ t }: ContactViewProps) {
  const prefersReducedMotion = useReducedMotion();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [scopeIndex, setScopeIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [botcheck, setBotcheck] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedNote, setSubmittedNote] = useState<{
    name: string;
    scope: string;
  } | null>(null);

  const scopeOptions = t.contact.scopeOptions;
  const activeScope = scopeOptions[scopeIndex] ?? scopeOptions[0];

  useEffect(() => {
    if (scopeIndex >= scopeOptions.length) {
      setScopeIndex(0);
    }
  }, [scopeIndex, scopeOptions.length]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      setCopiedEmail(false);
    }
  };

  const buildMailtoFallback = () => {
    const subject = encodeURIComponent(
      `[Portfolio] ${activeScope}${name.trim() ? ` — ${name.trim()}` : ''}`
    );
    const bodyLines = [
      name.trim() ? `Name: ${name.trim()}` : '',
      email.trim() ? `Reply-To: ${email.trim()}` : '',
      `Scope: ${activeScope}`,
      '',
      message.trim(),
    ]
      .filter((line, idx, arr) => line !== '' || (idx > 0 && arr[idx - 1] !== ''))
      .join('\n');
    return `mailto:${PROFILE.email}?subject=${subject}&body=${encodeURIComponent(bodyLines)}`;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || !name.trim() || !email.trim() || !message.trim()) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    // Silently ignore automated bot submissions that fill the hidden honeypot
    if (botcheck.trim().length > 0) {
      setSubmittedNote({
        name: trimmedName,
        scope: activeScope,
      });
      setName('');
      setEmail('');
      setMessage('');
      setBotcheck('');
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();
    if (!accessKey) {
      setSubmittedNote(null);
      setSubmitError(t.contact.errorBody);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmittedNote(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: trimmedName,
          email: trimmedEmail,
          subject: `[Portfolio] ${activeScope} — ${trimmedName}`,
          from_name: trimmedName,
          scope: activeScope,
          message: trimmedMessage,
          botcheck: '',
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !data.success) {
        setSubmitError(data.message || t.contact.errorBody);
        return;
      }

      setSubmittedNote({
        name: trimmedName,
        scope: activeScope,
      });
      setName('');
      setEmail('');
      setMessage('');
      setBotcheck('');
    } catch {
      setSubmitError(t.contact.errorBody);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEntranceProps = (delay: number, yOffset = 14) =>
    prefersReducedMotion
      ? { initial: false }
      : {
          initial: { opacity: 0, y: yOffset },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.42, delay, ease: EASE_OUT },
        };

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full pb-20 sm:pb-24">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          {/* Clean Header */}
          <motion.section
            {...getEntranceProps(0, 12)}
            className="pt-10 sm:pt-14 pb-8 sm:pb-10 flex flex-col items-start gap-3"
          >
            <p className="font-mono text-xs tracking-wider text-cyan-700 dark:text-[#7bd0ff]">
              {t.contact.eyebrow}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-[var(--text-primary)] leading-tight">
              {t.contact.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 font-mono text-xs text-slate-700 dark:text-[var(--text-secondary)] tabular-nums">
              <span>{t.contact.availability[0]}</span>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-500">
                ·
              </span>
              <span>{t.contact.availability[1]}</span>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-500">
                ·
              </span>
              <span className="text-cyan-700 dark:text-[#7bd0ff]">{t.contact.availability[2]}</span>
            </div>
          </motion.section>

          {/* Main 2-Column Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Animated Social & Channel Cards */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Direct Email Card */}
              <motion.div
                {...getEntranceProps(0.06, 14)}
                className="group bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-cyan-500/40 p-6 rounded-2xl shadow-sm transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <motion.div
                      {...getEntranceProps(0.12, 8)}
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.08, y: -2 }}
                      className="w-11 h-11 rounded-full bg-[var(--bg-surface-card)] border border-[var(--border-subtle)] group-hover:border-cyan-500/40 flex items-center justify-center text-cyan-600 dark:text-[#7bd0ff] shrink-0 transition-colors"
                    >
                      <AtSign className="w-5 h-5" />
                    </motion.div>
                    <div className="min-w-0">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-slate-600 dark:text-[var(--text-muted)] block">
                        {t.contact.directMail}
                      </span>
                      <p className="font-mono text-sm sm:text-base font-medium text-slate-900 dark:text-[var(--text-primary)] truncate select-all">
                        {PROFILE.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <motion.button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label={t.contact.copyTitle}
                      title={copiedEmail ? t.contact.copiedTitle : t.contact.copyTitle}
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.06, y: -1 }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
                      className={`p-2.5 rounded-full transition-colors cursor-pointer ${
                        copiedEmail
                          ? 'bg-cyan-600 dark:bg-[#7bd0ff] text-white dark:text-[#00354a]'
                          : 'bg-[var(--bg-surface-card)] text-slate-600 dark:text-[var(--text-secondary)] hover:text-cyan-700 dark:hover:text-[#7bd0ff]'
                      }`}
                    >
                      {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </motion.button>

                    <motion.a
                      href={`mailto:${PROFILE.email}`}
                      aria-label={t.contact.sendEmailTitle}
                      title={t.contact.sendEmailTitle}
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.06, y: -1 }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
                      className="p-2.5 rounded-full bg-[var(--bg-surface-card)] text-slate-600 dark:text-[var(--text-secondary)] hover:text-cyan-700 dark:hover:text-[#7bd0ff] transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              {/* Phone / WhatsApp Card */}
              <motion.div
                {...getEntranceProps(0.12, 14)}
                className="group bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-indigo-400/40 p-6 rounded-2xl shadow-sm transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <motion.div
                      {...getEntranceProps(0.18, 8)}
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.08, y: -2 }}
                      className="w-11 h-11 rounded-full bg-[var(--bg-surface-card)] border border-[var(--border-subtle)] group-hover:border-indigo-400/40 flex items-center justify-center text-indigo-600 dark:text-[#b8c4ff] shrink-0 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                    </motion.div>
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-slate-600 dark:text-[var(--text-muted)] block">
                        {t.contact.phoneWhatsapp}
                      </span>
                      <p className="font-mono text-sm sm:text-base font-medium text-slate-900 dark:text-[var(--text-primary)] tabular-nums select-all">
                        {PROFILE.phone}
                      </p>
                    </div>
                  </div>

                  <motion.a
                    href={PROFILE.phoneHref}
                    aria-label={t.contact.directDialTitle}
                    title={t.contact.directDialTitle}
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.06, y: -1 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
                    className="p-2.5 rounded-full bg-[var(--bg-surface-card)] text-slate-600 dark:text-[var(--text-secondary)] hover:text-indigo-700 dark:hover:text-[#b8c4ff] transition-colors shrink-0"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>

              {/* LinkedIn Card */}
              <motion.div
                {...getEntranceProps(0.18, 14)}
                className="group bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-indigo-400/40 p-6 rounded-2xl shadow-sm transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <motion.div
                      {...getEntranceProps(0.24, 8)}
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.08, y: -2 }}
                      className="w-11 h-11 rounded-full bg-[var(--bg-surface-card)] border border-[var(--border-subtle)] group-hover:border-indigo-400/40 flex items-center justify-center text-indigo-600 dark:text-[#c0c1ff] shrink-0 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.div>
                    <div className="min-w-0">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-slate-600 dark:text-[var(--text-muted)] block">
                        {t.contact.professionalNetwork}
                      </span>
                      <p className="font-mono text-sm sm:text-base font-medium text-slate-900 dark:text-[var(--text-primary)] truncate">
                        {PROFILE.linkedinDisplay}
                      </p>
                    </div>
                  </div>

                  <motion.a
                    href={PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.contact.openLinkedinTitle}
                    title={t.contact.openLinkedinTitle}
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.06, y: -1 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
                    className="p-2.5 rounded-full bg-[var(--bg-surface-card)] text-slate-600 dark:text-[var(--text-secondary)] hover:text-indigo-700 dark:hover:text-[#c0c1ff] transition-colors shrink-0"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>

              {/* Timezone Stamp */}
              <motion.div
                {...getEntranceProps(0.24, 12)}
                className="p-4 rounded-xl bg-[var(--bg-surface-lowest)] border border-[var(--border-subtle)] font-mono text-[11px] text-slate-600 dark:text-[var(--text-muted)] flex items-center justify-between"
              >
                <span>
                  {t.contact.timezoneLabel}: {PROFILE.timezone}
                </span>
                <span className="text-indigo-700 dark:text-[#b8c4ff] font-semibold">
                  {PROFILE.hubCode}
                </span>
              </motion.div>
            </div>

            {/* Right Column: Interactive Message Form with Staggered Field Entrances */}
            <motion.div
              {...getEntranceProps(0.1, 16)}
              className="lg:col-span-7 bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 sm:p-10 rounded-2xl shadow-lg"
            >
              <motion.div {...getEntranceProps(0.14, 10)} className="flex flex-col gap-1.5 mb-7">
                <p className="font-mono text-xs tracking-wider text-cyan-700 dark:text-[#7bd0ff]">
                  {t.contact.formEyebrow}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-[var(--text-primary)]">
                  {t.contact.formTitle}
                </h2>
              </motion.div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Hidden Web3Forms spam honeypot field */}
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="contact-botcheck">Leave blank</label>
                  <input
                    id="contact-botcheck"
                    name="botcheck"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={botcheck}
                    onChange={(e) => setBotcheck(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <motion.div {...getEntranceProps(0.18, 12)} className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-name"
                      className="text-xs tracking-wide text-slate-700 dark:text-[var(--text-secondary)] font-medium"
                    >
                      {t.contact.nameLabel}{' '}
                      <span className="text-cyan-600 dark:text-[#7bd0ff]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      maxLength={120}
                      disabled={isSubmitting}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full bg-[var(--bg-surface-lowest)] border border-[var(--border-subtle)] text-slate-900 dark:text-[var(--text-primary)] placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all disabled:opacity-60"
                    />
                  </motion.div>

                  <motion.div {...getEntranceProps(0.22, 12)} className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-email"
                      className="text-xs tracking-wide text-slate-700 dark:text-[var(--text-secondary)] font-medium"
                    >
                      {t.contact.emailLabel}{' '}
                      <span className="text-cyan-600 dark:text-[#7bd0ff]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      maxLength={254}
                      disabled={isSubmitting}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full bg-[var(--bg-surface-lowest)] border border-[var(--border-subtle)] text-slate-900 dark:text-[var(--text-primary)] placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all disabled:opacity-60"
                    />
                  </motion.div>
                </div>

                <motion.div {...getEntranceProps(0.26, 12)} className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-scope"
                    className="text-xs tracking-wide text-slate-700 dark:text-[var(--text-secondary)] font-medium"
                  >
                    {t.contact.scopeLabel}{' '}
                    <span className="text-cyan-600 dark:text-[#7bd0ff]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="contact-scope"
                      disabled={isSubmitting}
                      value={scopeIndex}
                      onChange={(e) => setScopeIndex(Number(e.target.value))}
                      className="w-full bg-[var(--bg-surface-lowest)] border border-[var(--border-subtle)] text-slate-900 dark:text-[var(--text-primary)] text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all appearance-none cursor-pointer pr-10 disabled:opacity-60"
                    >
                      {scopeOptions.map((option, idx) => (
                        <option
                          key={option}
                          value={idx}
                          className="bg-white dark:bg-[#060e20] text-slate-900 dark:text-slate-100"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none w-4 h-4 text-slate-500 dark:text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </motion.div>

                <motion.div {...getEntranceProps(0.3, 12)} className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="text-xs tracking-wide text-slate-700 dark:text-[var(--text-secondary)] font-medium"
                  >
                    {t.contact.messageLabel}{' '}
                    <span className="text-cyan-600 dark:text-[#7bd0ff]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    maxLength={4000}
                    disabled={isSubmitting}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full bg-[var(--bg-surface-lowest)] border border-[var(--border-subtle)] text-slate-900 dark:text-[var(--text-primary)] placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-y disabled:opacity-60"
                  />
                </motion.div>

                <motion.div
                  {...getEntranceProps(0.34, 12)}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2"
                >
                  <div className="flex items-center gap-2 font-mono text-[11px] text-slate-600 dark:text-[var(--text-muted)]">
                    <Lock className="w-3.5 h-3.5 text-cyan-600 dark:text-[#7bd0ff]" />
                    <span>{t.contact.httpsNote}</span>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={
                      prefersReducedMotion || isSubmitting ? undefined : { scale: 1.02, y: -1 }
                    }
                    whileTap={
                      prefersReducedMotion || isSubmitting ? undefined : { scale: 0.98 }
                    }
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-cyan-600 hover:bg-cyan-700 dark:bg-[#7bd0ff] dark:hover:bg-[#a6e0ff] text-white dark:text-[#00354a] text-sm font-semibold tracking-wide transition-colors shadow-[0_8px_20px_rgba(6,182,212,0.22)] whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed"
                  >
                    <span>
                      {isSubmitting ? t.contact.sendingButton : t.contact.submitButton}
                    </span>
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </motion.button>
                </motion.div>

                {submitError && (
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                    role="alert"
                    className="p-4 rounded-xl bg-[var(--bg-surface-card)] border border-amber-500/40 text-amber-700 dark:text-amber-300 flex flex-col gap-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold">{t.contact.errorTitle}</span>
                          <span className="text-xs text-slate-700 dark:text-[var(--text-secondary)] mt-0.5">
                            {submitError}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSubmitError(null)}
                        className="text-xs font-mono text-slate-500 dark:text-[var(--text-muted)] hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer shrink-0"
                      >
                        {t.contact.dismissButton}
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pl-8">
                      <a
                        href={buildMailtoFallback()}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-600 hover:bg-cyan-700 dark:bg-[#7bd0ff] dark:hover:bg-[#a6e0ff] text-white dark:text-[#00354a] text-xs font-semibold transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{t.contact.openMailAppButton}</span>
                      </a>
                    </div>
                  </motion.div>
                )}

                {submittedNote && (
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                    role="status"
                    className="p-4 rounded-xl bg-[var(--bg-surface-card)] border border-cyan-500/35 text-cyan-700 dark:text-[#7bd0ff] flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold">{t.contact.submittedTitle}</span>
                        <span className="text-xs text-slate-700 dark:text-[var(--text-secondary)] mt-0.5">
                          {t.contact.submittedBodyPrefix} {submittedNote.name}.{' '}
                          {t.contact.submittedBodyMiddle} {submittedNote.scope}{' '}
                          {t.contact.submittedBodySuffix}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSubmittedNote(null)}
                      className="text-xs font-mono text-slate-500 dark:text-[var(--text-muted)] hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer shrink-0"
                    >
                      {t.contact.dismissButton}
                    </button>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
}
