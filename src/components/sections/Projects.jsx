import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const truncate = (str = '', max = 110) => (str ? (str.length <= max ? str : str.slice(0, max - 1) + '…') : 'No description provided.');

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

  useEffect(() => {
    let cancelled = false;
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://api.github.com/users/mnthaqif/repos?per_page=50', {
          headers: { Accept: 'application/vnd.github+json' },
        });
        if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
        const data = await res.json();
        if (cancelled) return;

        const filtered = data
          .filter(r => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at));

        const mapped = filtered.map(r => ({
          id: r.id,
          name: r.name,
          description: r.description,
          html_url: r.html_url,
          language: r.language,
          stargazers_count: r.stargazers_count,
          topics: r.topics || [],
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

  const updateEdgeState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 12);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 12);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateEdgeState, { passive: true });
    updateEdgeState();
    return () => el.removeEventListener('scroll', updateEdgeState);
  }, [repos, loading]);

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
    const cardWidth = 300;
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft + direction * cardWidth,
      behavior: 'smooth',
    });
  }, []);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') scrollByAmount(1);
    else if (e.key === 'ArrowLeft') scrollByAmount(-1);
  };

  return (
    <section id="projects" aria-label="Projects" className="relative py-12 md:py-16 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-semibold mb-8 tracking-tight text-center text-slate-800 dark:text-slate-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>

        <div className="flex justify-end mb-4 gap-2">
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            aria-label="Scroll left"
            className="rounded-full p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-40"
            disabled={!canScrollLeft}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
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
            <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div
          ref={scrollRef}
          className="relative flex gap-5 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scrollbar-hide scroll-smooth select-none px-1 py-2"
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
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute top-0 left-0 h-full w-10 bg-gradient-to-r from-white dark:from-gray-900 to-transparent transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-white dark:from-gray-900 to-transparent transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0'}`}
          />

          {loading && (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}

          {!loading && repos.map(repo => {
            const topics = repo.topics?.slice(0, 3) || [];
            return (
              <motion.article
                key={repo.id}
                className="snap-start flex-shrink-0 w-[280px] sm:w-[300px] h-[210px] rounded-2xl border border-slate-200/70 dark:border-slate-700/60 bg-white dark:bg-slate-800 p-5 shadow-[0_2px_4px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_18px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_4px_18px_rgba(0,0,0,0.5)] transition-all focus:outline-none focus:ring-2 focus:ring-sky-500/60 relative"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug pr-2">
                    {repo.name}
                  </h3>
                  {repo.stargazers_count > 0 && (
                    <span
                      className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400"
                      title={`${repo.stargazers_count} stars`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.27 1.401-8.168L.132 9.211l8.2-1.193z"/>
                      </svg>
                      {repo.stargazers_count}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {truncate(repo.description)}
                </p>

                <div className="mt-auto flex flex-wrap gap-1.5">
                  {repo.language && (
                    <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-[10px] font-medium text-slate-700 dark:text-slate-200">
                      {repo.language}
                    </span>
                  )}
                  {topics.map(t => (
                    <span
                      key={t}
                      className="px-2 py-1 rounded-full bg-sky-50 dark:bg-sky-900/40 text-[10px] font-medium text-sky-700 dark:text-sky-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0"
                  aria-label={`Open ${repo.name} on GitHub`}
                />
              </motion.article>
            );
          })}
        </div>

        {errorMsg && (
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Using live GitHub data failed (reason: {errorMsg})
          </p>
        )}
      </div>
    </section>
  );
};

export default Projects;
