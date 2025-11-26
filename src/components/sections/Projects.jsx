import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Configuration constants
const GITHUB_USERNAME = 'mnthaqif';
// Personal Access Token for private repos - should be set as environment variable
const GITHUB_PAT = import.meta.env.VITE_GITHUB_PAT || '';

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

/**
 * Generate a meaningful description based on repo name if no description is provided.
 * Uses pattern matching to create context-aware descriptions.
 */
const generateDescription = (name, language, topics = []) => {
  const formattedName = formatRepoName(name);
  const langPart = language ? ` Built with ${language}.` : '';
  const topicsPart = topics.length > 0 ? ` Features: ${topics.slice(0, 3).join(', ')}.` : '';
  const lowerName = name.toLowerCase();
  
  // Generate description based on detected pattern in name
  if (lowerName.includes('portfolio')) {
    return `Personal portfolio website showcasing projects and skills.${langPart}`;
  }
  if (lowerName.includes('api')) {
    return `RESTful API service for ${formattedName.replace(/api/i, '').trim()}.${langPart}`;
  }
  if (lowerName.includes('bot')) {
    return `Automated bot for ${formattedName.replace(/bot/i, '').trim()}.${langPart}`;
  }
  if (lowerName.includes('cli')) {
    return `Command-line tool for ${formattedName.replace(/cli/i, '').trim()}.${langPart}`;
  }
  if (lowerName.includes('app') || lowerName.includes('web')) {
    return `Web application: ${formattedName}.${langPart}${topicsPart}`;
  }
  
  // Default description
  return `${formattedName} - A software project.${langPart}${topicsPart}`;
};

// Format date for display
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Skeleton loading card component
const SkeletonCard = () => (
  <div
    className="relative h-full rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 overflow-hidden p-6 animate-pulse"
    aria-hidden="true"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="h-5 w-2/3 rounded-lg bg-slate-200 dark:bg-slate-700" />
      <div className="h-5 w-5 rounded bg-slate-200 dark:bg-slate-700" />
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
      <div className="h-4 w-11/12 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
    </div>
    <div className="flex gap-2 mb-4">
      <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="h-6 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="h-6 w-14 rounded-full bg-slate-200 dark:bg-slate-700" />
    </div>
    <div className="flex items-center justify-between mt-auto pt-4">
      <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="h-9 w-32 rounded-xl bg-slate-200 dark:bg-slate-700" />
    </div>
  </div>
);

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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Lock icon component for private repos
const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400 dark:text-slate-500">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// GitHub icon component
const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let cancelled = false;
    
    const fetchRepos = async () => {
      setLoading(true);
      setErrorMsg('');
      
      try {
        const headers = {
          Accept: 'application/vnd.github+json',
        };
        
        // Add authorization header if PAT is available (for private repos)
        if (GITHUB_PAT) {
          headers.Authorization = `Bearer ${GITHUB_PAT}`;
        }

        // Fetch repos - use /user/repos endpoint if authenticated (includes private repos)
        const endpoint = GITHUB_PAT 
          ? 'https://api.github.com/user/repos?per_page=100&sort=created&direction=desc&affiliation=owner'
          : `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=created&direction=desc`;

        const res = await fetch(endpoint, { headers });
        
        if (!res.ok) {
          throw new Error(`GitHub API error ${res.status}`);
        }
        
        const data = await res.json();
        if (cancelled) return;

        // Filter repos: private only and not forks (show all private projects)
        const filtered = data
          .filter(r => r.private && !r.fork)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        // Fetch languages for each repo (with fallback on error)
        const reposWithLanguages = await Promise.all(
          filtered.map(async (repo) => {
            // Base repo data structure
            const baseRepoData = {
              id: repo.id,
              name: repo.name,
              description: repo.description || generateDescription(repo.name, repo.language, repo.topics),
              html_url: repo.html_url,
              language: repo.language,
              stargazers_count: repo.stargazers_count,
              forks_count: repo.forks_count,
              topics: repo.topics || [],
              created_at: repo.created_at,
              updated_at: repo.updated_at,
              isPrivate: repo.private,
            };
            
            try {
              const langRes = await fetch(repo.languages_url, { headers });
              const languages = langRes.ok ? await langRes.json() : {};
              return {
                ...baseRepoData,
                languages: Object.keys(languages),
              };
            } catch (langError) {
              // Fallback to primary language if languages API fails
              // This can happen due to rate limiting or network issues
              console.warn(`Failed to fetch languages for ${repo.name}:`, langError.message);
              return {
                ...baseRepoData,
                languages: repo.language ? [repo.language] : [],
              };
            }
          })
        );

        setRepos(reposWithLanguages);
      } catch (e) {
        if (!cancelled) {
          setErrorMsg(e.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchRepos();
    return () => { cancelled = true; };
  }, []);

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
            Private Projects
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-800 dark:text-slate-100 mb-4">
            Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Explore my private projects — personal work I&apos;ve built and developed
          </p>
          {!loading && repos.length > 0 && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
              {repos.length} project{repos.length !== 1 ? 's' : ''} found
            </p>
          )}
        </motion.div>

        {/* Loading skeleton grid */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="min-h-[320px]">
                <SkeletonCard />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && repos.length === 0 && !errorMsg && (
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
              No private repositories found. Please ensure you have the correct GitHub Personal Access Token configured.
            </p>
          </motion.div>
        )}

        {/* Error state */}
        {errorMsg && (
          <motion.div 
            className="flex flex-col items-center justify-center py-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-red-500 dark:text-red-400">
                <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">Unable to load projects</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              {errorMsg}
            </p>
          </motion.div>
        )}

        {/* Projects grid */}
        {!loading && repos.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {repos.map((repo) => {
              const displayLanguages = repo.languages?.slice(0, 4) || [];
              
              return (
                <motion.article
                  key={repo.id}
                  variants={cardVariants}
                  className="group relative flex flex-col h-full min-h-[320px] rounded-2xl border border-slate-200/70 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 shadow-sm hover:shadow-xl dark:shadow-slate-900/30 transition-all duration-300 overflow-hidden"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  
                  {/* Header */}
                  <div className="relative flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {formatRepoName(repo.name)}
                        </h3>
                        {repo.isPrivate && (
                          <span title="Private repository">
                            <LockIcon />
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-2 flex-shrink-0">
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
                  <p className="relative text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {repo.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="relative flex flex-wrap gap-2 mb-4">
                    {displayLanguages.map((lang) => {
                      const style = languageColors[lang] || languageColors.default;
                      return (
                        <span
                          key={lang}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
                        >
                          <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                          {lang}
                        </span>
                      );
                    })}
                    {repo.topics?.slice(0, 2).map((topic) => (
                      <span
                        key={topic}
                        className="px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-sky-50 dark:from-indigo-900/40 dark:to-sky-900/40 text-xs font-medium text-indigo-600 dark:text-indigo-300 border border-indigo-100/50 dark:border-indigo-800/30"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="relative flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50 mt-auto">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Updated {formatDate(repo.updated_at)}
                    </span>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors duration-200 z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GitHubIcon />
                      View Repository
                    </a>
                  </div>

                  {/* Full card link overlay (below button) */}
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-0"
                    aria-label={`Open ${repo.name} on GitHub`}
                  />
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
