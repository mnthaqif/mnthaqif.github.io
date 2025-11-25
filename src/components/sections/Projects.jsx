import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const truncate = (str = '', max = 90) => (str ? (str.length <= max ? str : str.slice(0, max - 1) + '…') : 'No description provided.');

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const SkeletonCard = () => (
  <div
    className="relative flex-shrink-0 w-[320px] sm:w-[340px] h-[240px] rounded-3xl border border-slate-200/60 dark:border-slate-700/60 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 overflow-hidden p-6 animate-pulse"
    aria-hidden="true"
  >
    <div className="h-5 w-2/3 rounded-lg bg-slate-200 dark:bg-slate-700 mb-4" />
    <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700 mb-2" />
    <div className="h-4 w-11/12 rounded bg-slate-200 dark:bg-slate-700 mb-2" />
    <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-700 mt-auto" />
  </div>
);

// Language color mapping for visual distinction
const languageColors = {
  JavaScript: 'bg-yellow-400',
  TypeScript: 'bg-blue-500',
  Python: 'bg-green-500',
  Java: 'bg-orange-500',
  HTML: 'bg-red-500',
  CSS: 'bg-purple-500',
  Go: 'bg-cyan-500',
  Rust: 'bg-amber-600',
  PHP: 'bg-indigo-400',
  Ruby: 'bg-red-600',
  C: 'bg-gray-500',
  'C++': 'bg-pink-500',
  'C#': 'bg-purple-600',
  Swift: 'bg-orange-400',
  Kotlin: 'bg-violet-500',
  Dart: 'bg-sky-400',
  Vue: 'bg-emerald-500',
  Shell: 'bg-gray-600',
  default: 'bg-slate-400',
};

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const scrollRef = useRef(null);

  const isPointerDown = useRef(false);
  const dragStartX = useRef(0);
  const initialScrollLeft = useRef(0);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://api.github.com/users/mnthaqif/repos?per_page=100&sort=created&direction=desc', {
          headers: { Accept: 'application/vnd.github+json' },
        });
        if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
        const data = await res.json();
        if (cancelled) return;

        // Filter repos created from 2024 onwards and not forks
        const startDate = new Date('2024-01-01T00:00:00Z');
        const filtered = data
          .filter(r => !r.fork && new Date(r.created_at) >= startDate)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        const mapped = filtered.map(r => ({
          id: r.id,
          name: r.name,
          description: r.description,
          html_url: r.html_url,
          language: r.language,
          stargazers_count: r.stargazers_count,
          forks_count: r.forks_count,
          topics: r.topics || [],
          created_at: r.created_at,
          updated_at: r.updated_at,
        }));

        setRepos(mapped);
      } catch (e) {
        setErrorMsg(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchRepos();
    return () => { cancelled = true; };
  }, []);

  const updateEdgeState = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 12);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 12);
    
    // Calculate active index for dot indicators
    const cardWidth = 356; // card width + gap
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(newIndex, repos.length - 1));
  }, [repos.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateEdgeState, { passive: true });
    updateEdgeState();
    return () => el.removeEventListener('scroll', updateEdgeState);
  }, [repos, loading, updateEdgeState]);

  const onPointerDown = (e) => {
    if (!scrollRef.current) return;
    isPointerDown.current = true;
    dragStartX.current = e.clientX;
    initialScrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.classList.add('grabbing');
  };
  const onPointerMove = (e) => {
    if (!isPointerDown.current || !scrollRef.current) return;
    const dx = e.clientX - dragStartX.current;
    scrollRef.current.scrollLeft = initialScrollLeft.current - dx;
  };
  const endPointerDrag = () => {
    if (!scrollRef.current) return;
    isPointerDown.current = false;
    scrollRef.current.classList.remove('grabbing');
  };

  const onWheel = (e) => {
    if (!scrollRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollRef.current.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  const scrollByAmount = useCallback((direction) => {
    if (!scrollRef.current) return;
    const cardWidth = 356; // card width + gap
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft + direction * cardWidth,
      behavior: 'smooth',
    });
  }, []);

  const scrollToIndex = useCallback((index) => {
    if (!scrollRef.current) return;
    const cardWidth = 356;
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
  }, []);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') scrollByAmount(1);
    else if (e.key === 'ArrowLeft') scrollByAmount(-1);
  };

  return (
    <section id="projects" aria-label="Projects" className="relative py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-sky-200/30 to-cyan-200/30 dark:from-sky-900/20 dark:to-cyan-900/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-sm font-medium text-indigo-600 dark:text-indigo-300 mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Since 2024
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-800 dark:text-slate-100 mb-4">
            Featured Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore my recent work — projects I&apos;ve built and contributed to since 2024
          </p>
        </motion.div>

        {/* Navigation controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {!loading && repos.length > 0 && (
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {repos.length} project{repos.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scrollByAmount(-1)}
              aria-label="Previous project"
              className="group rounded-full p-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={!canScrollLeft}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" className="text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(1)}
              aria-label="Next project"
              className="group rounded-full p-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={!canScrollRight}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" className="text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel container */}
        <div
          ref={scrollRef}
          className="relative flex gap-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scrollbar-hide scroll-smooth select-none py-4 -mx-4 px-4"
          style={{ WebkitOverflowScrolling: 'touch' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endPointerDrag}
          onPointerLeave={endPointerDrag}
          onWheel={onWheel}
          onKeyDown={onKeyDown}
          tabIndex={0}
          aria-label="Scrollable list of project cards"
        >
          {/* Edge gradients */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-slate-50 dark:from-gray-900 to-transparent z-10 transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-slate-50 dark:from-gray-900 to-transparent z-10 transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Loading skeletons */}
          {loading && (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}

          {/* Empty state */}
          {!loading && repos.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full py-16 text-center">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-300 dark:text-slate-600 mb-4">
                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-slate-500 dark:text-slate-400">No projects found from 2024 onwards</p>
            </div>
          )}

          {/* Project cards */}
          {!loading && repos.map((repo, index) => {
            const topics = repo.topics?.slice(0, 4) || [];
            const langColor = languageColors[repo.language] || languageColors.default;
            
            return (
              <motion.article
                key={repo.id}
                className="snap-start flex-shrink-0 w-[320px] sm:w-[340px] h-[260px] rounded-3xl border border-slate-200/70 dark:border-slate-700/50 bg-white dark:bg-slate-800/90 backdrop-blur-sm p-6 shadow-lg hover:shadow-2xl dark:shadow-slate-900/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 relative group overflow-hidden"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                
                {/* Header section */}
                <div className="relative flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0 pr-3">
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-tight truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {repo.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      {repo.language && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                          <span className={`w-2.5 h-2.5 rounded-full ${langColor}`} />
                          {repo.language}
                        </span>
                      )}
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        •
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {formatDate(repo.created_at)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Stats badges */}
                  <div className="flex items-center gap-2">
                    {repo.stargazers_count > 0 && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 text-xs font-medium text-amber-600 dark:text-amber-400" title={`${repo.stargazers_count} stars`}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.27 1.401-8.168L.132 9.211l8.2-1.193z"/>
                        </svg>
                        {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300" title={`${repo.forks_count} forks`}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="18" r="3"/>
                          <circle cx="6" cy="6" r="3"/>
                          <circle cx="18" cy="6" r="3"/>
                          <path d="M18 9v1a2 2 0 01-2 2H8a2 2 0 01-2-2V9M12 12v3"/>
                        </svg>
                        {repo.forks_count}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="relative text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2">
                  {truncate(repo.description)}
                </p>

                {/* Topics */}
                <div className="relative mt-auto flex flex-wrap gap-2">
                  {topics.map(t => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-sky-50 dark:from-indigo-900/40 dark:to-sky-900/40 text-xs font-medium text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* GitHub icon overlay */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-slate-400 dark:text-slate-500">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>

                {/* Link overlay */}
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                  aria-label={`Open ${repo.name} on GitHub`}
                />
              </motion.article>
            );
          })}
        </div>

        {/* Dot indicators */}
        {!loading && repos.length > 0 && (
          <div className="flex justify-center gap-2 mt-8">
            {repos.slice(0, Math.min(repos.length, 10)).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollToIndex(index)}
                aria-label={`Go to project ${index + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-indigo-500 scale-125'
                    : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                }`}
              />
            ))}
            {repos.length > 10 && (
              <span className="text-xs text-slate-400 dark:text-slate-500 ml-2">+{repos.length - 10} more</span>
            )}
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Unable to load projects from GitHub ({errorMsg})
          </p>
        )}
      </div>
    </section>
  );
};

export default Projects;
