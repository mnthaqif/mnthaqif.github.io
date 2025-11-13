import React from 'react';
import { motion } from 'framer-motion';
import avatar from '../assets/thaqif.jpg'; // place your thaqif.jpg in src/assets/

/**
 * Hero - uses a code-only background (SVG + gradient) so no external hero-bg image required.
 * - Avatar: imported from src/assets/thaqif.jpg (bundler will handle hashing and paths)
 * - Decorative SVG blobs + gradient overlay create a modern, "cool" background
 */
const Hero = () => {
  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      aria-label="Hero"
    >
      {/* SVG decorative background - code-only, responsive, accessible (aria-hidden) */}
      <svg
        className="absolute inset-0 w-full h-full -z-10"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="g2" x1="0" x2="1">
            <stop offset="0%" stopColor="#0ea5a4" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.08" />
          </linearGradient>
          <filter id="blurMe" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="40" />
          </filter>
        </defs>

        {/* Large blurred blob */}
        <g filter="url(#blurMe)">
          <path
            d="M300 50 C 420 10, 600 10, 740 80 C 880 150, 940 300, 820 420 C 700 540, 420 580, 260 500 C 100 420, 180 200, 300 50 Z"
            fill="url(#g1)"
            transform="translate(-60,-40) rotate(-6)"
            opacity="0.85"
          />
        </g>

        {/* Smaller soft overlay */}
        <g filter="url(#blurMe)">
          <path
            d="M950 200 C 1000 80, 1180 60, 1250 170 C 1320 280, 1210 380, 1080 430 C 950 480, 870 420, 820 340 C 770 260, 880 320, 950 200 Z"
            fill="url(#g2)"
            transform="translate(-140,20) rotate(10)"
            opacity="0.9"
          />
        </g>

        {/* subtle radial vignette for depth */}
        <rect width="100%" height="100%" fill="url(#g1)" opacity="0.06" />
      </svg>

      {/* dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/30 -z-5" aria-hidden="true" />

      <div className="relative z-10 text-center px-6 sm:px-8 lg:px-12 max-w-3xl">
        <img
          src={avatar}
          alt="Muhammad Nur Thaqif avatar"
          className="w-36 h-36 md:w-44 md:h-44 mx-auto rounded-full object-cover border-4 border-white/30 dark:border-teal-400 shadow-2xl"
        />

        <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-md">
          Muhammad Nur Thaqif
        </h1>

        <p className="mt-2 text-sm md:text-lg text-white/90">
          Melaka, Malaysia • Full‑Stack Developer
        </p>

        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://www.linkedin.com/in/thaqif-rajab/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition text-sm md:text-base"
          >
            LinkedIn
          </a>

          <a
            href="mailto:thaqif_rajab@yahoo.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition text-sm md:text-base"
          >
            Email
          </a>
        </div>

        <p className="mt-6 text-sm text-white/80 max-w-2xl mx-auto">
          Passionate about building clean, accessible user experiences with modern web technologies. Open to collaboration and new opportunities.
        </p>
      </div>
    </motion.section>
  );
};

export default Hero;
