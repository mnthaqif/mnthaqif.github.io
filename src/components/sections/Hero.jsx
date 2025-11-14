import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../../data/resumeData';
import avatar from '../../assets/thaqif.jpg';

/** Simple typing component */
function Typing({ text, speed = 80, className = '' }) {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    setDisplay('');
    const id = setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <span className={className}>
      {display}
      <span
        className="inline-block ml-1 w-1.5 h-6 align-middle bg-slate-900 dark:bg-slate-200 animate-pulse"
        aria-hidden="true"
      />
    </span>
  );
}

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, when: 'beforeChildren', ease: 'easeOut' } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const Hero = () => {
  const { personal } = resumeData;

  return (
    <section
      aria-label="Hero"
      className="min-h-screen flex items-center justify-center section-padding relative transition-colors duration-300"
      style={{ height: '100vh' }}
    >
      {/* background gradient handled with Tailwind classes so dark mode works */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-sky-100 via-sky-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-800 transition-colors duration-300" />

      {/* subtle animated blurred shapes (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id="blurSoft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="56" />
          </filter>
        </defs>

        {/* left blob - float (keeps visible in both modes but low-contrast) */}
        <motion.g
          filter="url(#blurSoft)"
          animate={{ x: [0, -18, 0], opacity: [0.20, 0.26, 0.20] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <ellipse cx="160" cy="220" rx="320" ry="180" fill="#c7eaff" className="opacity-20 dark:opacity-10" />
        </motion.g>

        {/* right blob - float */}
        <motion.g
          filter="url(#blurSoft)"
          animate={{ y: [0, -12, 0], opacity: [0.16, 0.20, 0.16] }}
          transition={{ duration: 14, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <ellipse cx="980" cy="260" rx="340" ry="200" fill="#e6fff0" className="opacity-18 dark:opacity-08" />
        </motion.g>

        {/* centered radial highlight: visible in light mode, hidden in dark mode */}
        <ellipse
          cx="600"
          cy="260"
          rx="260"
          ry="160"
          fill="#d2f4ff"
          className="opacity-12 transition-opacity duration-300 dark:opacity-0"
        />
      </svg>

      <div className="max-w-4xl mx-auto text-center w-full px-4">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mx-auto">
          {/* Avatar with wave-like expanding rings */}
          <div className="relative inline-block mx-auto mb-6">
            {/* wave 1 */}
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full"
              style={{ borderRadius: '9999px' }}
              initial={{ scale: 1, opacity: 0.28 }}
              animate={{ scale: [1, 1.9], opacity: [0.28, 0], rotate: 0 }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
            />
            {/* wave 2 (delayed) */}
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full"
              style={{ borderRadius: '9999px' }}
              initial={{ scale: 1, opacity: 0.18 }}
              animate={{ scale: [1, 1.6], opacity: [0.18, 0], rotate: 0 }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
            />

            <motion.img
              variants={itemVariant}
              src={avatar}
              alt={personal.name}
              className="relative z-10 w-36 h-36 md:w-44 md:h-44 rounded-full shadow-2xl border-4 border-white/80 dark:border-slate-700"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, y: [0, -10, 0], scale: [0.98, 1.06, 0.98] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.12, y: -6 }}
            />
          </div>

          {/* Name: blue in light mode, white in dark mode */}
          <motion.h1 variants={itemVariant} className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-2">
            <Typing text={personal.name} speed={70} className="text-sky-700 dark:text-white" />
          </motion.h1>

          {/* Increased sizes for title, location, about */}
          <motion.p variants={itemVariant} className="text-2xl md:text-3xl text-slate-700 dark:text-slate-300 mb-3">
            {personal.title}
          </motion.p>

          <motion.p variants={itemVariant} className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-4">
            {personal.location}
          </motion.p>

          <motion.p variants={itemVariant} className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 mb-6 text-lg md:text-xl">
            I build web applications with JavaScript and React. I enjoy solving practical problems and improving my skills.
          </motion.p>

          {/* Social icons: larger, brand colors */}
          <motion.div variants={itemVariant} className="flex justify-center gap-6 flex-wrap">
            <motion.a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full"
              aria-label="GitHub"
              whileHover={{ scale: 1.06, y: -3 }}
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#181717" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
              </svg>
            </motion.a>

            <motion.a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full"
              aria-label="LinkedIn"
              whileHover={{ scale: 1.06, y: -3 }}
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </motion.a>

            <motion.a
              href={`mailto:${personal.email}`}
              className="p-2.5 rounded-full"
              aria-label="Email"
              whileHover={{ scale: 1.06, y: -3 }}
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#0f172a" aria-hidden="true">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
