import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import projectsDataJson from '../../data/projectsData.json';

const truncate = (str = '', max = 120) => (str.length <= max ? str : str.slice(0, max - 1) + '…');

const SkeletonCard = () => (
  <div
    className="relative flex-shrink-0 w-[300px] h-[220px] rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-800 overflow-hidden p-5 animate-pulse"
    aria-hidden="true"
  >
    <div className="h-6 w-2/3 rounded bg-slate-200 dark:bg-slate-700 mb-4" />
    <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700 mb-2" />
    <div className="h-4 w-11/12 rounded bg-slate-200 dark:bg-slate-700 mb-2" />
    <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-700 mt-auto" />
  </div>
);

/**
 * Featured Projects Carousel
 * Now using local projectsData.json for featured projects
 */
const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const isPointerDown = useRef(false);
  const dragStartX = useRef(0);
  const initialScrollLeft = useRef(0);

  useEffect(() => {
    // Load projects from local JSON file
    const repos = projectsDataJson.repos || [];
    const mapped = repos.map(r => ({
      id: r.id,
      name: r.name,
      html_url: r.html_url,
      description: r.description,
      language: r.language,
      stargazers_count: r.stargazers_count,
      topics: r.topics || [],
      featured: true,
    }));
    setProjects(mapped);
    setLoading(false);
  }, []);

  // Drag scrolling
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

  // Wheel horizontal
  const onWheel = (e) => {
    if (!scrollRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollRef.current.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  // Keyboard navigation
  const scrollByAmount = useCallback((direction) => {
    if (!scrollRef.current) return;
    const cardWidth = 310;
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft + direction * cardWidth,
      behavior: 'smooth',
    });
  }, []);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') scrollByAmount(1);
    else if (e.key === 'ArrowLeft') scrollByAmount(-1);
  };

  // Edge fade visibility
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const updateScrollEdges = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 12);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 12);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollEdges, { passive: true });
    updateScrollEdges();
    return () => el.removeEventListener('scroll', updateScrollEdges);
  }, [projects]);

  return (
    <section aria-label="Featured Projects" className="relative py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <header className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-800 dark:text-slate-100">Featured Projects</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollByAmount(-1)}
              aria-label="Scroll left"
              className="rounded-full p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-40"
              disabled={!canScrollLeft}
            >
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
              <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </header>

        <div
          ref={scrollRef}
          className="relative flex gap-6 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scrollbar-hide scroll-smooth select-none px-1 py-2"
          style={{ WebkitOverflowScrolling: 'touch' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endPointerDrag}
          onPointerLeave={endPointerDrag}
          onWheel={onWheel}
          onKeyDown={onKeyDown}
          tabIndex={0}
          aria-label="Scrollable featured projects"
        >
          <div aria-hidden="true" className={`pointer-events-none absolute top-0 left-0 h-full w-10 bg-gradient-to-r from-white dark:from-slate-900 to-transparent transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
          <div aria-hidden="true" className={`pointer-events-none absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-white dark:from-slate-900 to-transparent transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

          {loading && (<><SkeletonCard /><SkeletonCard /><SkeletonCard /></>)}

          {!loading && projects.map(p => {
            const topics = p.topics?.slice(0, 3) || [];
            return (
              <motion.article
                key={p.id}
                className="snap-start flex-shrink-0 w-[300px] h-[220px] rounded-2xl border border-slate-200/70 dark:border-slate-700/60 bg-white dark:bg-slate-800 p-5 shadow-[0_2px_4px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_18px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_4px_18px_rgba(0,0,0,0.5)] transition-all focus:outline-none focus:ring-2 focus:ring-sky-500/60 relative"
                whileHover={{ y: -6 }}
                whileFocus={{ y: -3 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug pr-2">{p.name}</h3>
                  <div className="flex items-center gap-2">
                    {p.featured && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-[10px] font-semibold text-indigo-600 dark:text-indigo-300">Featured</span>
                    )}
                    {p.stargazers_count > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400" title={`${p.stargazers_count} stars`}> 
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.27 1.401-8.168L.132 9.211l8.2-1.193z" />
                        </svg>
                        {p.stargazers_count}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">{truncate(p.description || 'No description provided.', 115)}</p>
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {p.language && (<span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-[10px] font-medium text-slate-700 dark:text-slate-200">{p.language}</span>) }
                  {topics.map(t => (
                    <span key={t} className="px-2 py-1 rounded-full bg-sky-50 dark:bg-sky-900/40 text-[10px] font-medium text-sky-700 dark:text-sky-300">{t}</span>
                  ))}
                </div>
                <a href={p.html_url} target="_blank" rel="noopener noreferrer" className="absolute inset-0" aria-label={`Open ${p.name} on GitHub`} />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;