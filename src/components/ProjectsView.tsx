import { useMemo, useState } from 'react';
import {
  BarChart3,
  Code2,
  Database,
  ExternalLink,
  FileText,
  Layers,
  PenTool,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { ProjectCategory, ProjectItem, PROJECTS } from '../data/portfolioData';
import { SiteTranslation } from '../data/translations';
import { TiltCard3D } from './TiltCard3D';

interface ProjectsViewProps {
  onSelectProject: (project: ProjectItem, modalTitle?: string) => void;
  t: SiteTranslation;
}

export function ProjectsView({ onSelectProject, t }: ProjectsViewProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filterOptions: { id: ProjectCategory; label: string; count: number }[] = useMemo(
    () => [
      { id: 'all', label: t.projects.filters.all, count: PROJECTS.length },
      {
        id: 'fullstack',
        label: t.projects.filters.fullstack,
        count: PROJECTS.filter((p) => p.category === 'fullstack').length,
      },
      {
        id: 'data',
        label: t.projects.filters.data,
        count: PROJECTS.filter((p) => p.category === 'data').length,
      },
      {
        id: 'ux',
        label: t.projects.filters.ux,
        count: PROJECTS.filter((p) => p.category === 'ux').length,
      },
    ],
    [t]
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return PROJECTS;
    return PROJECTS.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const renderCategoryIcon = (id: string) => {
    switch (id) {
      case 'atelier-luma':
        return <Sparkles className="w-5 h-5 text-cyan-600 dark:text-[#7bd0ff]" />;
      case 'personal-photo-gallery':
        return <Layers className="w-5 h-5 text-indigo-600 dark:text-[#b8c4ff]" />;
      case 'traffic-accident-analysis':
        return <BarChart3 className="w-5 h-5 text-cyan-600 dark:text-[#7bd0ff]" />;
      default:
        return <PenTool className="w-5 h-5 text-indigo-600 dark:text-[#c0c1ff]" />;
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-12 py-12 lg:py-16">
        {/* Clean Page Header */}
        <header className="flex flex-col gap-3 relative z-10 mb-8">
          <p className="font-mono text-xs text-cyan-700 dark:text-[#7bd0ff]">
            {t.projects.eyebrow}
          </p>
          <h1 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-[var(--text-primary)] text-balance">
            {t.projects.headingPrefix}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-indigo-600 to-emerald-600 dark:from-[#7bd0ff] dark:via-[#b8c4ff] dark:to-[#c0c1ff]">
              {t.projects.headingAccent}
            </span>
          </h1>
        </header>

        {/* Interactive Filter Controls */}
        <div className="relative z-10 mb-10 inline-flex flex-wrap items-center gap-1.5 p-2 rounded-2xl bg-[var(--bg-surface-alt)] border border-[var(--border-subtle)]">
          <div
            className="flex flex-wrap items-center gap-1.5"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {filterOptions.map((option) => {
              const isActive = activeFilter === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(option.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                    isActive
                      ? 'bg-indigo-600 dark:bg-[#c0c1ff] text-white dark:text-[#1000a9] shadow-md'
                      : 'text-slate-700 dark:text-[var(--text-secondary)] hover:text-slate-900 dark:hover:text-white hover:bg-[var(--bg-surface)]'
                  }`}
                >
                  <span>
                    {option.label} [{option.count}]
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid: 2 cards per row on tablet/desktop */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8">
          {filteredProjects.map((project) => {
            const hasImageError = failedImages[project.id];
            const copy = t.projects.items[project.id];
            const localizedTitle = copy?.title ?? project.title;
            const localizedCategory = copy?.categoryLabel ?? project.categoryLabel;
            const primaryLabel = copy?.primaryLabel ?? project.primaryAction.label;
            const secondaryLabel = copy?.secondaryLabel ?? project.secondaryAction.label;

            return (
              <TiltCard3D
                key={project.id}
                className="rounded-2xl flex"
                maxTilt={4}
                glowColor={
                  project.accentColor === 'indigo'
                    ? 'rgba(192, 193, 255, 0.14)'
                    : 'rgba(123, 208, 255, 0.14)'
                }
              >
                <article className="w-full group flex flex-col justify-between bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-cyan-500/45 rounded-2xl p-6 sm:p-7 transition-colors duration-200 shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-mono tracking-wider text-cyan-700 dark:text-[#7bd0ff]">
                        {localizedCategory}
                      </span>
                      <div className="p-2.5 rounded-xl bg-[var(--bg-surface-card)] border border-[var(--border-subtle)]">
                        {renderCategoryIcon(project.id)}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="text-left w-full cursor-pointer focus-visible:outline-none focus-visible:underline"
                    >
                      <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-[var(--text-primary)] group-hover:text-cyan-700 dark:group-hover:text-[#7bd0ff] transition-colors leading-snug">
                        {localizedTitle}
                      </h2>
                    </button>

                    {/* Media Preview or Interactive Regression Chart */}
                    {project.metrics ? (
                      <button
                        type="button"
                        onClick={() => onSelectProject(project, t.projects.olsSummaryTitle)}
                        className="w-full text-left relative h-56 sm:h-64 rounded-xl p-5 bg-[#0B1324] border border-slate-800/80 flex flex-col justify-between overflow-hidden cursor-pointer hover:border-cyan-500/40 transition-colors"
                      >
                        <div className="flex items-center justify-between text-xs font-mono text-slate-400 tabular-nums">
                          <span className="text-[#7bd0ff] flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            <span>{copy?.metricsHeadline ?? project.metrics.headline}</span>
                          </span>
                          <span>{copy?.metricsSampleSize ?? project.metrics.sampleSize}</span>
                        </div>

                        <div className="w-full flex-1 flex items-end gap-3 pt-4 pb-2">
                          {project.metrics.bars.map((heightPct, idx) => (
                            <div
                              key={idx}
                              style={{ height: `${heightPct}%` }}
                              className={`flex-1 rounded-t-md transition-opacity ${
                                idx === 2 ? 'bg-[#7bd0ff]' : 'bg-[#222a3d] group-hover:bg-[#2d3752]'
                              }`}
                            />
                          ))}
                        </div>

                        <div className="text-xs font-mono text-[#7bd0ff] truncate tabular-nums">
                          {project.metrics.significance}
                        </div>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="block w-full relative h-56 sm:h-64 rounded-xl overflow-hidden bg-[#0B1324] border border-[var(--border-subtle)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                      >
                        {project.livePreviewUrl ? (
                          <>
                            <iframe
                              src={project.livePreviewUrl}
                              title={`${localizedTitle} preview`}
                              loading="lazy"
                              tabIndex={-1}
                              className="w-[250%] h-[250%] origin-top-left scale-[0.4] border-0 pointer-events-none bg-[#FAF8F5]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                          </>
                        ) : project.imageUrl && !hasImageError ? (
                          <>
                            <img
                              src={project.imageUrl}
                              alt={project.imageAlt || localizedTitle}
                              referrerPolicy="no-referrer"
                              onError={() => handleImageError(project.id)}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          </>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1220] to-[#171f33] p-4 text-center">
                            {renderCategoryIcon(project.id)}
                            <span className="font-mono text-sm text-slate-300 mt-2">
                              {localizedTitle}
                            </span>
                          </div>
                        )}
                      </button>
                    )}

                    {/* Compact Stack Line */}
                    <div className="font-mono text-xs text-slate-600 dark:text-[var(--text-muted)]">
                      {project.stack.map((tech, idx) => (
                        <span key={tech}>
                          <span
                            className={
                              idx === 0
                                ? 'text-cyan-700 dark:text-[#7bd0ff]'
                                : 'text-slate-700 dark:text-[var(--text-secondary)]'
                            }
                          >
                            {tech}
                          </span>
                          {idx < project.stack.length - 1 && (
                            <span aria-hidden="true" className="mx-2 text-slate-400 dark:text-slate-500">
                              ·
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
                    {project.primaryAction.href ? (
                      <a
                        href={project.primaryAction.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-[#c0c1ff] dark:hover:bg-[#d5d6ff] text-white dark:text-[#1000a9] font-mono text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>{primaryLabel}</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onSelectProject(project, t.projects.thesisAbstractTitle)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-[#c0c1ff] dark:hover:bg-[#d5d6ff] text-white dark:text-[#1000a9] font-mono text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>{primaryLabel}</span>
                        <FileText className="w-4 h-4" />
                      </button>
                    )}

                    {project.secondaryAction.href ? (
                      <a
                        href={project.secondaryAction.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--bg-surface-card)] border border-[var(--border-subtle)] hover:border-cyan-500/45 text-slate-800 dark:text-[var(--text-primary)] font-mono text-xs transition-colors whitespace-nowrap shrink-0"
                      >
                        <Code2 className="w-4 h-4 text-cyan-600 dark:text-[#7bd0ff]" />
                        <span>{secondaryLabel}</span>
                      </a>
                    ) : project.secondaryAction.modalTitle ? (
                      <button
                        type="button"
                        onClick={() => onSelectProject(project, project.secondaryAction.modalTitle)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--bg-surface-card)] border border-[var(--border-subtle)] hover:border-cyan-500/45 text-slate-800 dark:text-[var(--text-primary)] font-mono text-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Database className="w-4 h-4 text-cyan-600 dark:text-[#7bd0ff]" />
                        <span>{secondaryLabel}</span>
                      </button>
                    ) : (
                      <span className="text-xs font-mono text-slate-600 dark:text-[var(--text-muted)] tabular-nums">
                        {secondaryLabel}
                      </span>
                    )}
                  </div>
                </article>
              </TiltCard3D>
            );
          })}
        </div>
      </div>
    </div>
  );
}
