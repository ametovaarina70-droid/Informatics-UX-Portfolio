import { NavRoute } from '../data/portfolioData';

interface LoadingSkeletonProps {
  activeRoute: NavRoute;
  fadingOut: boolean;
}

export function LoadingSkeleton({ activeRoute, fadingOut }: LoadingSkeletonProps) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading portfolio content"
      className={`fixed inset-0 z-50 bg-[var(--bg-canvas)] cyber-grid overflow-hidden transition-opacity duration-500 ease-out ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Navbar Skeleton */}
      <div className="h-16 sm:h-20 bg-[var(--bg-nav)] border-b border-[var(--border-subtle)]">
        <div className="h-full max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          <div className="h-6 w-36 rounded-md skeleton-shimmer" />
          <div className="hidden lg:flex items-center gap-2 p-1.5 rounded-full bg-[var(--bg-surface-alt)] border border-[var(--border-subtle)]">
            <div className="h-7 w-20 rounded-full skeleton-shimmer" />
            <div className="h-7 w-24 rounded-full skeleton-shimmer" />
            <div className="h-7 w-24 rounded-full skeleton-shimmer" />
            <div className="h-7 w-20 rounded-full skeleton-shimmer" />
          </div>
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:block h-9 w-28 rounded-full skeleton-shimmer" />
            <div className="hidden md:block h-9 w-24 rounded-lg skeleton-shimmer" />
            <div className="lg:hidden h-10 w-10 rounded-lg skeleton-shimmer" />
          </div>
        </div>
      </div>

      {/* Route-Matching Content Skeleton */}
      <div className="max-w-[1340px] mx-auto w-full px-5 sm:px-8 lg:px-12 py-8 md:py-12">
        {activeRoute === 'index' && (
          <div className="flex flex-col gap-10 md:gap-12">
            {/* Hero Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-4">
                <div className="h-4 w-48 rounded-md skeleton-shimmer" />
                <div className="h-12 sm:h-14 w-72 sm:w-96 rounded-xl skeleton-shimmer" />
                <div className="h-8 sm:h-9 w-60 sm:w-80 rounded-lg skeleton-shimmer" />
                <div className="h-11 w-48 rounded-lg skeleton-shimmer mt-2" />
              </div>
              <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end">
                <div className="w-full max-w-[260px] lg:max-w-[280px] p-2 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                  <div className="aspect-[4/5] w-full rounded-xl skeleton-shimmer" />
                </div>
              </div>
            </div>

            {/* Philosophy + Navigation Cards Skeleton */}
            <div className="pt-8 border-t border-[var(--border-subtle)] grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7 h-52 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 sm:p-8 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-3.5 w-32 rounded skeleton-shimmer" />
                  <div className="h-5 w-full rounded skeleton-shimmer" />
                  <div className="h-5 w-4/5 rounded skeleton-shimmer" />
                </div>
                <div className="h-4 w-56 rounded skeleton-shimmer" />
              </div>
              <div className="md:col-span-5 flex flex-col gap-3.5">
                {[0, 1, 2].map((item) => (
                  <div
                    key={item}
                    className="h-16 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-4 flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg skeleton-shimmer shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-3 w-20 rounded skeleton-shimmer" />
                      <div className="h-4 w-44 rounded skeleton-shimmer" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages Grid Skeleton */}
            <div className="pt-8 border-t border-[var(--border-subtle)] space-y-5">
              <div className="h-8 w-56 rounded-lg skeleton-shimmer" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-28 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-5 flex flex-col justify-between"
                  >
                    <div className="flex justify-between">
                      <div className="h-5 w-24 rounded skeleton-shimmer" />
                      <div className="h-5 w-10 rounded skeleton-shimmer" />
                    </div>
                    <div className="h-3.5 w-28 rounded skeleton-shimmer" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeRoute === 'education' && (
          <div className="space-y-8">
            <div className="space-y-3 pt-4">
              <div className="h-3.5 w-32 rounded skeleton-shimmer" />
              <div className="h-12 w-64 rounded-xl skeleton-shimmer" />
              <div className="h-6 w-80 rounded-lg skeleton-shimmer" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                {[0, 1].map((item) => (
                  <div
                    key={item}
                    className="h-52 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 sm:p-8 space-y-4"
                  >
                    <div className="flex justify-between">
                      <div className="h-4 w-40 rounded skeleton-shimmer" />
                      <div className="h-4 w-28 rounded skeleton-shimmer" />
                    </div>
                    <div className="h-7 w-3/4 rounded-lg skeleton-shimmer" />
                    <div className="h-4 w-1/2 rounded skeleton-shimmer" />
                    <div className="h-4 w-2/3 rounded skeleton-shimmer" />
                  </div>
                ))}
              </div>
              <div className="lg:col-span-5 h-[360px] sm:h-[400px] rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-2">
                <div className="w-full h-full rounded-xl skeleton-shimmer" />
              </div>
            </div>
          </div>
        )}

        {activeRoute === 'projects' && (
          <div className="space-y-8">
            <div className="space-y-3 pt-4">
              <div className="h-3.5 w-44 rounded skeleton-shimmer" />
              <div className="h-12 w-80 sm:w-[28rem] rounded-xl skeleton-shimmer" />
            </div>
            <div className="h-12 w-full max-w-xl rounded-2xl skeleton-shimmer" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8">
              {[0, 1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 sm:p-7 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-28 rounded skeleton-shimmer" />
                    <div className="w-10 h-10 rounded-xl skeleton-shimmer" />
                  </div>
                  <div className="h-7 w-52 rounded-lg skeleton-shimmer" />
                  <div className="h-56 sm:h-64 w-full rounded-xl skeleton-shimmer" />
                  <div className="h-4 w-48 rounded skeleton-shimmer" />
                  <div className="pt-3 border-t border-[var(--border-subtle)] flex justify-between">
                    <div className="h-9 w-28 rounded-lg skeleton-shimmer" />
                    <div className="h-9 w-24 rounded-lg skeleton-shimmer" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeRoute === 'contact' && (
          <div className="space-y-8">
            <div className="space-y-3 pt-4">
              <div className="h-3.5 w-44 rounded skeleton-shimmer" />
              <div className="h-12 w-72 sm:w-96 rounded-xl skeleton-shimmer" />
              <div className="h-4 w-64 rounded skeleton-shimmer" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-4">
                {[0, 1, 2].map((item) => (
                  <div
                    key={item}
                    className="h-24 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 flex items-center gap-4"
                  >
                    <div className="w-11 h-11 rounded-full skeleton-shimmer shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-3 w-24 rounded skeleton-shimmer" />
                      <div className="h-5 w-44 rounded skeleton-shimmer" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-7 h-[430px] rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 sm:p-10 space-y-6">
                <div className="h-7 w-48 rounded-lg skeleton-shimmer" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="h-12 rounded-lg skeleton-shimmer" />
                  <div className="h-12 rounded-lg skeleton-shimmer" />
                </div>
                <div className="h-12 rounded-lg skeleton-shimmer" />
                <div className="h-32 rounded-lg skeleton-shimmer" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
