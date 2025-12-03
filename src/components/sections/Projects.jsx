import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import projectsData from '../../data/projectsData.json';

/**
 * Format repo name for display by:
 * 1. Replacing dashes and underscores with spaces
 * 2. Capitalizing each word
 * 3. Converting .github.io suffix to "Portfolio"
 */
const formatRepoName = (name) => {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\.github\.io/gi, ' Portfolio');
};

// Format date for display
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Language color mapping with pastel/soft colors
const languageColors = {
  JavaScript: { bg: 'bg-amber-100 dark:bg-amber-900/40', text: 'text-amber-700 dark:text-amber-300', dot: 'bg-amber-400' },
  TypeScript: { bg: 'bg-blue-100 dark:bg-blue-900/40', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-500' },
  Python: { bg: 'bg-emerald-100 dark:bg-emerald-900/40', text: 'text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-500' },
  Java: { bg: 'bg-orange-100 dark:bg-orange-900/40', text: 'text-orange-700 dark:text-orange-300', dot: 'bg-orange-500' },
  HTML: { bg: 'bg-red-100 dark:bg-red-900/40', text: 'text-red-700 dark:text-red-300', dot: 'bg-red-500' },
  CSS: { bg: 'bg-purple-100 dark:bg-purple-900/40', text: 'text-purple-700 dark:text-purple-300', dot: 'bg-purple-500' },
  Go: { bg: 'bg-cyan-100 dark:bg-cyan-900/40', text: 'text-cyan-700 dark:text-cyan-300', dot: 'bg-cyan-500' },
  Rust: { bg: 'bg-orange-100 dark:bg-orange-900/40', text: 'text-orange-800 dark:text-orange-300', dot: 'bg-orange-600' },
  PHP: { bg: 'bg-indigo-100 dark:bg-indigo-900/40', text: 'text-indigo-700 dark:text-indigo-300', dot: 'bg-indigo-400' },
  Ruby: { bg: 'bg-rose-100 dark:bg-rose-900/40', text: 'text-rose-700 dark:text-rose-300', dot: 'bg-rose-500' },
  C: { bg: 'bg-slate-100 dark:bg-slate-700/40', text: 'text-slate-700 dark:text-slate-300', dot: 'bg-slate-500' },
  'C++': { bg: 'bg-pink-100 dark:bg-pink-900/40', text: 'text-pink-700 dark:text-pink-300', dot: 'bg-pink-500' },
  'C#': { bg: 'bg-violet-100 dark:bg-violet-900/40', text: 'text-violet-700 dark:text-violet-300', dot: 'bg-violet-600' },
  Swift: { bg: 'bg-orange-100 dark:bg-orange-900/40', text: 'text-orange-600 dark:text-orange-300', dot: 'bg-orange-400' },
  Kotlin: { bg: 'bg-violet-100 dark:bg-violet-900/40', text: 'text-violet-700 dark:text-violet-300', dot: 'bg-violet-500' },
  Dart: { bg: 'bg-sky-100 dark:bg-sky-900/40', text: 'text-sky-700 dark:text-sky-300', dot: 'bg-sky-400' },
  Vue: { bg: 'bg-emerald-100 dark:bg-emerald-900/40', text: 'text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-500' },
  Shell: { bg: 'bg-slate-100 dark:bg-slate-700/40', text: 'text-slate-700 dark:text-slate-300', dot: 'bg-slate-600' },
  default: { bg: 'bg-slate-100 dark:bg-slate-700/40', text: 'text-slate-600 dark:text-slate-300', dot: 'bg-slate-400' },
};

// Carousel configuration constants
const AUTOPLAY_INTERVAL = 5000; // Auto-advance interval in milliseconds

// 3D Carousel card position calculation - wheel rotation style
const getCardStyle = (position, repos) => {
  // Only show 3 cards: left (-1), center (0), right (1)
  if (Math.abs(position) > 1) {
    return { display: 'none' };
  }

  const angle = position * 35; // 35 degrees rotation between cards
  const translateZ = position === 0 ? 0 : -200; // Center card forward, side cards back
  const translateX = position * 45; // Horizontal spacing (percentage)
  const scale = position === 0 ? 1 : 0.85; // Center card larger
  const opacity = position === 0 ? 1 : 0.6; // Center card fully visible
  const zIndex = position === 0 ? 10 : 5 - Math.abs(position); // Center card on top

  return {
    transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${-angle}deg) scale(${scale})`,
    opacity,
    zIndex,
    pointerEvents: position === 0 ? 'auto' : 'none', // Only center card is interactive
    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
  };
};

// GitHub icon component
const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

// Navigation button component
const NavButton = ({ direction, onClick, totalProjects }) => {
  // Only disable when there's one or no projects (circular navigation is always enabled)
  const disabled = totalProjects <= 1;
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-1/2 -translate-y-1/2 ${direction === 'left' ? '-left-4 md:-left-16' : '-right-4 md:-right-16'} z-10 p-3 md:p-4 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 group`}
      aria-label={`${direction === 'left' ? 'Previous' : 'Next'} project`}
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ${direction === 'right' ? 'rotate-180' : ''}`}
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
};

const Projects = () => {
  const repos = projectsData.repos;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  // Calculate the actual index (wrap around)
  const projectIndex = ((currentIndex % repos.length) + repos.length) % repos.length;

  const paginate = useCallback((newDirection) => {
    setCurrentIndex(prev => prev + newDirection);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (repos.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      paginate(1);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [repos.length, isPaused, paginate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  // Get visible card indices (show 3 cards: left, center, right)
  const getVisibleCards = () => {
    const cards = [];
    for (let i = -1; i <= 1; i++) {
      const index = ((currentIndex + i) % repos.length + repos.length) % repos.length;
      cards.push({ index, position: i });
    }
    return cards;
  };

  if (repos.length === 0) {
    return (
      <section 
        id="projects" 
        aria-label="Projects" 
        className="relative py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden"
      >
        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <motion.div 
            className="flex flex-col items-center justify-center py-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400 dark:text-slate-500">
                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">No projects found</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              No projects available at the moment.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="projects" 
      aria-label="Projects" 
      className="relative py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-sky-200/20 to-cyan-200/20 dark:from-sky-900/10 dark:to-cyan-900/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-rose-200/10 to-orange-200/10 dark:from-rose-900/5 dark:to-orange-900/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-sm font-medium text-indigo-600 dark:text-indigo-300 mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            My Projects
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-800 dark:text-slate-100 mb-4">
            Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Explore my projects — personal work I&apos;ve built and developed
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
            {projectIndex + 1} of {repos.length} project{repos.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Buttons */}
          {repos.length > 1 && (
            <>
              <NavButton 
                direction="left" 
                onClick={() => paginate(-1)}
                totalProjects={repos.length}
              />
              <NavButton 
                direction="right" 
                onClick={() => paginate(1)}
                totalProjects={repos.length}
              />
            </>
          )}

          {/* 3D Carousel Container */}
          <div 
            className="relative h-[560px] md:h-[520px] flex items-center justify-center"
            style={{ 
              perspective: '2000px',
              perspectiveOrigin: 'center center'
            }}
          >
            <div 
              className="relative w-full h-full flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {getVisibleCards().map(({ index, position }) => {
                const repo = repos[index];
                const displayLanguages = repo.languages?.slice(0, 4) || [];
                const style = getCardStyle(position, repos);

                return (
                  <article
                    key={`${index}-${position}`}
                    className="absolute w-full max-w-2xl px-2 md:px-4"
                    style={style}
                  >
                    <div className="group relative flex flex-col h-full rounded-3xl border-2 border-slate-200/70 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-6 md:p-8 shadow-2xl hover:shadow-3xl dark:shadow-slate-900/50 transition-all duration-300">
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 rounded-3xl pointer-events-none" />
                      
                      {/* Header */}
                      <div className="relative flex items-start justify-between mb-4">
                        <div className="flex-1 min-w-0 pr-4">
                          <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 leading-tight mb-2">
                            {formatRepoName(repo.name)}
                          </h3>
                        </div>
                        
                        {/* Stats */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {repo.stargazers_count > 0 && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 text-xs font-semibold text-amber-600 dark:text-amber-400" title={`${repo.stargazers_count} stars`}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.27 1.401-8.168L.132 9.211l8.2-1.193z"/>
                              </svg>
                              {repo.stargazers_count}
                            </span>
                          )}
                          {repo.forks_count > 0 && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300" title={`${repo.forks_count} forks`}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                      <p className="relative text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                        {repo.description}
                      </p>

                      {/* Tech stack badges */}
                      <div className="relative flex flex-wrap gap-2 mb-4">
                        {displayLanguages.map((lang) => {
                          const langStyle = languageColors[lang] || languageColors.default;
                          return (
                            <span
                              key={lang}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${langStyle.bg} ${langStyle.text}`}
                            >
                              <span className={`w-2 h-2 rounded-full ${langStyle.dot}`} />
                              {lang}
                            </span>
                          );
                        })}
                        {repo.topics?.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-sky-50 dark:from-indigo-900/40 dark:to-sky-900/40 text-xs font-semibold text-indigo-600 dark:text-indigo-300 border border-indigo-100/50 dark:border-indigo-800/30"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t-2 border-slate-100 dark:border-slate-700/50 mt-auto">
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Updated {formatDate(repo.updated_at)}
                        </span>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-100 text-white dark:text-slate-900 text-sm font-semibold hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl z-10"
                        >
                          <GitHubIcon />
                          View Repository
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Pagination Dots */}
          {repos.length > 1 && (
            <div className="flex items-center justify-center gap-2.5 mt-8">
              {repos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === projectIndex
                      ? 'w-10 h-3 bg-gradient-to-r from-indigo-500 to-purple-500'
                      : 'w-3 h-3 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                  aria-current={index === projectIndex ? 'true' : 'false'}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
