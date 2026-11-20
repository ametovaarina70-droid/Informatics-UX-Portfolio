import { useEffect } from 'react';
import { ExternalLink, FileText, Lock, X } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { SiteTranslation } from '../data/translations';

interface ProjectModalProps {
  project: ProjectItem | null;
  modalTitle?: string;
  onClose: () => void;
  t: SiteTranslation;
}

export function ProjectModal({ project, modalTitle, onClose, t }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const copy = t.projects.items[project.id];
  const categoryLabel = copy?.categoryLabel ?? project.categoryLabel;
  const title = copy?.title ?? project.title;
  const accessNote = copy?.accessNote ?? project.accessNote;
  const caseStudy = copy?.caseStudy ?? project.caseStudy;
  const primaryLabel = copy?.primaryLabel ?? project.primaryAction.label;
  const secondaryLabel = copy?.secondaryLabel ?? project.secondaryAction.label;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 sm:px-8 pt-6 pb-4 border-b border-[var(--border-subtle)]">
          <div>
            <p className="font-mono text-xs text-cyan-700 dark:text-cyan-400 mb-1">
              {modalTitle || categoryLabel} · {project.caseStudy.year}
            </p>
            <h2
              id="project-modal-title"
              className="font-display font-bold text-2xl text-slate-900 dark:text-[var(--text-primary)]"
            >
              {title}
            </h2>
            <p className="text-xs font-mono text-slate-600 dark:text-[var(--text-muted)] mt-1">
              {caseStudy.subtitle}
            </p>
          </div>
          <button
            type="button"
            aria-label={t.modal.closeAria}
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-[var(--bg-surface-card)] border border-[var(--border-subtle)] flex items-center justify-center text-slate-700 dark:text-[var(--text-secondary)] hover:text-cyan-700 dark:hover:text-cyan-300 hover:border-cyan-500/40 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 sm:px-8 py-6 space-y-6 max-h-[75vh] overflow-y-auto">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-600 dark:text-[var(--text-muted)]">
            <span className="text-slate-900 dark:text-[var(--text-primary)] font-medium">
              {caseStudy.role}
            </span>
            <span aria-hidden="true">·</span>
            <span>{project.stack.join(' · ')}</span>
          </div>

          <p className="text-sm sm:text-base text-slate-700 dark:text-[var(--text-secondary)] leading-relaxed">
            {caseStudy.overview}
          </p>

          {accessNote && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[var(--bg-surface-alt)] border border-cyan-500/30 text-xs font-mono text-indigo-700 dark:text-[#b8c4ff]">
              <Lock className="w-4 h-4 text-cyan-600 dark:text-[#7bd0ff] shrink-0 mt-0.5" />
              <span>{accessNote}</span>
            </div>
          )}

          <div className="space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
              {t.modal.keyDeliverables}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-700 dark:text-[var(--text-secondary)]">
              {caseStudy.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-cyan-600 dark:text-cyan-400 font-mono mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-surface-alt)] border border-[var(--border-subtle)] font-mono text-xs text-slate-700 dark:text-[var(--text-secondary)]">
            <span className="text-slate-500 dark:text-[var(--text-muted)]">
              {t.modal.stackAndSource}{' '}
            </span>
            <span>{caseStudy.technicalNotes}</span>
          </div>

          {project.materials && project.materials.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                {t.modal.projectMaterials}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {project.materials.map((item, idx) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[var(--bg-surface-card)] border border-[var(--border-subtle)] hover:border-cyan-500/50 text-slate-800 dark:text-[var(--text-primary)] hover:text-cyan-700 dark:hover:text-cyan-300 font-mono text-xs transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>{copy?.materialLabels?.[idx] ?? item.label}</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-6 sm:px-8 py-4 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-alt)] flex flex-wrap items-center justify-end gap-3">
          {project.primaryAction.href && (
            <a
              href={project.primaryAction.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-mono text-xs font-semibold transition-colors"
            >
              <span>{primaryLabel}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.secondaryAction.href && (
            <a
              href={project.secondaryAction.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--bg-surface-card)] border border-[var(--border-subtle)] hover:border-cyan-500/40 text-slate-800 dark:text-[var(--text-primary)] font-mono text-xs font-medium transition-colors"
            >
              <span>{secondaryLabel}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-[var(--bg-surface-card)] dark:hover:bg-[var(--bg-surface-elevated)] text-slate-800 dark:text-[var(--text-primary)] font-mono text-xs font-medium transition-colors cursor-pointer"
          >
            {t.modal.closeButton}
          </button>
        </div>
      </div>
    </div>
  );
}
