import React from 'react';
import { motion } from 'framer-motion';
import avatar from '../../assets/thaqif.jpg'; // ensure file exists at src/assets/thaqif.jpg

/**
 * Soft / clean Hero with GitHub + LinkedIn icons
 */
const Hero = () => {
  return (
    <section
      aria-label="Hero"
      className="relative flex items-center justify-center overflow-hidden bg-neutral-900"
      style={{ minHeight: '54vh' }}
    >
      {/* Soft decorative SVG background */}
      <svg
        className="absolute inset-0 w-full h-full -z-10"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id="blurSoft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="70" />
          </filter>
        </defs>

        {/* muted blurred shape (left) */}
        <g filter="url(#blurSoft)">
          <ellipse cx="220" cy="200" rx="320" ry="180" fill="#2b3344" opacity="0.28" />
        </g>

        {/* muted blurred shape (right, slightly teal) */}
        <g filter="url(#blurSoft)">
          <ellipse cx="980" cy="260" rx="340" ry="200" fill="#0ea5a450" opacity="0.22" />
        </g>

        {/* subtle dark overlay for focus */}
        <rect width="100%" height="100%" fill="#020617" opacity="0.12" />
      </svg>

      {/* content card: minimal, subtle contrast */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-2xl mx-4 sm:mx-6 md:mx-0 bg-neutral-900/60 border border-neutral-800 rounded-xl shadow-md py-6 px-5 sm:px-8"
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <motion.img
            src={avatar}
            alt="Muhammad Nur Thaqif avatar"
            initial={{ scale: 0.99 }}
            animate={{ scale: [0.99, 1.01, 0.99] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-neutral-800 shadow"
          />

          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-50 leading-tight">
              Muhammad Nur Thaqif
            </h1>
            <p className="mt-1 text-sm sm:text-base text-neutral-300">
              Melaka, Malaysia • Full‑Stack Developer
            </p>

            <div className="mt-3 flex items-center justify-center sm:justify-start gap-3">
              {/* GitHub */}
              <a
                href="https://github.com/mnthaqif"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-sm text-neutral-100 transition"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.58 2 12.22c0 4.5 2.87 8.33 6.84 9.68.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1.01.07 1.54 1.06 1.54 1.06.9 1.57 2.36 1.12 2.94.85.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.13-4.56-5.03 0-1.11.39-2.02 1.03-2.73-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.03A9.3 9.3 0 0112 6.8c.85.004 1.71.115 2.51.34 1.9-1.3 2.74-1.03 2.74-1.03.56 1.42.21 2.47.11 2.73.64.71 1.03 1.62 1.03 2.73 0 3.91-2.34 4.77-4.57 5.03.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.24 10.24 0 0022 12.22C22 6.58 17.52 2 12 2z" clipRule="evenodd"/>
                </svg>
                <span className="hidden sm:inline">GitHub</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/thaqif-rajab/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-transparent border border-neutral-800 text-sm text-neutral-200 hover:border-neutral-600 transition"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.555V14.8c0-1.345-.025-3.076-1.875-3.076-1.875 0-2.16 1.462-2.16 2.973v5.753H8.34V9h3.414v1.56h.049c.476-.9 1.636-1.848 3.368-1.848 3.6 0 4.266 2.37 4.266 5.455v6.783zM5.337 7.433a2.07 2.07 0 11.001-4.139 2.07 2.07 0 01-.001 4.139zM6.997 20.45H3.67V9h3.327v11.45z" />
                </svg>
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <p className="mt-5 text-sm sm:text-base text-neutral-300 max-w-xl mx-auto text-center sm:text-left">
          I build web applications with JavaScript and React. I solve practical problems and keep learning
          new tools to improve my work.
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
