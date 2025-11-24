import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * Utility: clamp string length with ellipsis
 */
const truncate = (str = '', max = 120) =>
  str.length <= max ? str : str.slice(0, max - 1) + '…';

/**
 * Skeleton placeholder card while loading
 */
const SkeletonCard = () => (
  <div
    className="relative flex-shrink-0 w-[280px] sm:w-[300px] h-[210px] rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-800 overflow-hidden p-5 animate-pulse"
    aria-hidden="true"
  >
    <div className="h-6 w-2/3 rounded bg-slate-200 dark:bg-slate-700 mb-4" />
    <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700 mb-2" />
    <div className="h-4 w-11/12 rounded bg-slate-200 dark:bg-slate-700 mb-2" />
    <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-700 mt-auto" />
  </div>
);

/**
 * Main component
 */
const SkillsCarousel = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const scrollRef = useRef(null);
  const isPointerDown = useRef(false);
  const dragStartX = useRef(0);
  const initialScrollLeft = useRef(0);

  // Fallback curated data (customize)
  const fallback = [
    {
      id: 'fallback-portfolio',
      name: 'Portfolio',
      html_url: 'https://github.com/mnthaqif/mnthaqif.github.io',
      description: 'Personal portfolio site built with modern React & animations.',
      language: 'JavaScript',
      stargazers_count: 0,
      topics: ['react', 'portfolio', 'framer-motion'],
    },
    {
      id: 'fallback-api',
      name: 'API Service',
      html_url: '#',
      description: 'Example API integration service showcasing clean architecture patterns.',
      language: 'TypeScript',
      stargazers_count: 0,
      topics: ['api', 'node', 'express'],
    },
    {
      id: 'fallback-auth',
      name: 'Auth Module',
      html_url: '#',
      description: 'Authentication module with JWT strategy and refresh token rotation.',
      language: 'TypeScript',
      stargazers_count: 0,
      topics: ['auth', 'security', 'jwt'],
    },
  ];

  useEffect(() => {
    let cancelled = false;
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://api.github.com/users/mnthaqif/repos?per_page=20', {
          headers: { Accept: 'application/vnd.github+json' },
        });
        if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
        const data = await res.json();

        if (cancelled) return;

        const sorted = [...data]
          .filter(r => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at));

        const mapped = sorted.map(r => ({
          id: r.id,
          name: r.name,
          html_url: r.html_url,
          description: r.description,
          language: r.language,
          stargazers_count: r.stargazers_count,
          topics: r.topics || [],
        }));

        setRepos(mapped.length ? mapped : fallback);
      } catch (e) {
        setErrorMsg(e.message);
        setRepos(fallback);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchRepos();
    return () => { cancelled = true; };
  }, []);

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

  const onKeyDown = (e) => {
    if (!scrollRef.current) return;
    if (e.key === 'ArrowRight') {
      scrollByAmount(1);
    } else if (e.key === 'ArrowLeft') {
      scrollByAmount(-1);
    }
  };

  const scrollByAmount = useCallback((direction) => {
    if (!scrollRef.current) return;
    const cardWidth = 300;
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft + direction * cardWidth,
      behavior: 'smooth',
    });
  }, []);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const updateScrollShadows = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 12);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 12);
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (!ref) return;
    ref.addEventListener('scroll', updateScrollShadows, { passive: true });
    updateScrollShadows();
    return () => ref.removeEventListener('scroll', updateScrollShadows);
  }, [repos]);

  return (
    <section aria-label="Skills & Projects" className="relative py-10 md:py-14"> 
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <header className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-800 dark:text-slate-100">Skills & Projects</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollByAmount(-1)}
              aria-label="Scroll left"
              className="rounded-full p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-40"
              disabled={!canScrollLeft}
            >
              <span className="sr-only">Left</span>
              <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(1)}
              aria-label="Scroll right"
              className="rounded-full p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-40"
              disabled={!canScrollRight}
            >
              <span className="sr-only">Right</span>
              <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </header>

        <div
          ref={scrollRef}
          className="relative flex gap-5 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scrollbar-hide scroll-smooth select-none group px-1 py-2"
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
          <div aria-hidden="true" className={`pointer-events-none absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-white dark:from-slate-900 to-transparent transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
          <div aria-hidden="true" className={`pointer-events-none absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white dark:from-slate-900 to-transparent transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

          {loading && (<><SkeletonCard /><SkeletonCard /><SkeletonCard /></>)}

          {!loading && repos.map(repo => {
            const topics = repo.topics?.slice(0, 3) || [];
            return (
              <motion.article
                key={repo.id}
                className="snap-start flex-shrink-0 w-[280px] sm:w-[300px] h-[210px] rounded-2xl border border-slate-200/70 dark:border-slate-700/60 bg-white dark:bg-slate-800 p-5 shadow-[0_2px_4px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_18px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_4px_18px_rgba(0,0,0,0.5)] transition-all focus:outline-none focus:ring-2 focus:ring-sky-500/60 relative"
                whileHover={{ y: -4 }}
                whileFocus={{ y: -2 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug pr-2">{repo.name}</h3>
                  {repo.stargazers_count > 0 && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400" title={`${repo.stargazers_count} ⭐`}> 
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.27 1.401-8.168L.132 9.211l8.2-1.193z" />
                      </svg>
                      {repo.stargazers_count}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">{truncate(repo.description || 'No description provided.', 110)}</p>
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {repo.language && (<span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-[10px] font-medium text-slate-700 dark:text-slate-200">{repo.language}</span>)}
                  {topics.map(t => (
                    <span key={t} className="px-2 py-1 rounded-full bg-sky-50 dark:bg-sky-900/40 text-[10px] font-medium text-sky-700 dark:text-sky-300">{t}</span>
                  ))}
                </div>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="absolute inset-0" aria-label={`Open ${repo.name} on GitHub`} />
              </motion.article>
            );
          })}
        </div>

        {errorMsg && (
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">Using fallback data (reason: {errorMsg})</p>
        )}
      </div>
    </section>
  );
};

export default SkillsCarousel;