import React from 'react';
import { motion } from 'framer-motion';
import avatar from '../../assets/thaqif.jpg'; // ensure file exists at src/assets/thaqif.jpg

const Hero = () => {
  return (
    <section
      aria-label="Hero"
      className="relative flex items-center justify-center overflow-hidden bg-black/5"
      style={{ minHeight: '60vh' }} // shorter than full screen to reduce empty space
    >
      {/* decorative SVG background (vibrant gradients + blurred blobs) */}
      <svg
        className="absolute inset-0 w-full h-full -z-10"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="bgA" x1="0" x2="1">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="1" />
            <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="bgB" x1="0" x2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.06" />
          </linearGradient>
          <filter id="bigBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="60" />
          </filter>
          <filter id="softBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="30" />
          </filter>
          <radialGradient id="vignette" cx="50%" cy="35%">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.18" />
          </radialGradient>
        </defs>

        {/* Big colorful blurred shape */}
        <g filter="url(#bigBlur)" transform="translate(-60,-40)">
          <path
            d="M300 50 C 420 10, 620 10, 760 90 C 900 170, 980 320, 820 420 C 660 520, 420 560, 260 480 C 100 400, 180 200, 300 50 Z"
            fill="url(#bgA)"
            opacity="0.95"
          />
        </g>

        {/* Secondary soft overlay */}
        <g filter="url(#softBlur)" transform="translate(-120,20)">
          <path
            d="M950 200 C 1020 80, 1180 60, 1250 170 C 1320 280, 1210 380, 1080 430 C 950 480, 870 420, 820 340 C 770 260, 880 320, 950 200 Z"
            fill="url(#bgB)"
            opacity="0.9"
          />
        </g>

        {/* subtle vignette */}
        <rect width="100%" height="100%" fill="url(#vignette)" />
      </svg>

      {/* content card: semi-transparent glass to focus content and reduce perceived empty space */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-3xl mx-4 sm:mx-6 md:mx-0 bg-white/6 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl py-8 px-6 sm:px-10"
      >
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <motion.img
            src={avatar}
            alt="Muhammad Nur Thaqif avatar"
            initial={{ y: -4 }}
            animate={{ y: [ -4, 4, -4 ] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white/30 shadow-2xl"
          />

          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Muhammad Nur Thaqif
            </h1>
            <p className="mt-1 text-sm sm:text-base text-white/90">
              Melaka, Malaysia • Full‑Stack Developer
            </p>

            <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <a
                href="https://www.linkedin.com/in/thaqif-rajab/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600/95 hover:bg-indigo-500 text-white text-sm font-medium transition-shadow shadow-md"
              >
                LinkedIn
              </a>

              <a
                href="mailto:thaqif_rajab@yahoo.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/10 text-sm"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm sm:text-base text-white/80 max-w-2xl mx-auto text-center sm:text-left">
          I build web apps with JavaScript and React. I enjoy solving practical problems, learning new
          tools, and improving the quality of my code. This site shows some of my projects and skills.
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
