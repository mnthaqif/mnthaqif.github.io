import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../../data/resumeData';
import avatar from '../../assets/thaqif.jpg';

/** Simple typing component used for the name */
function Typing({ text, speed = 70, className = '' }) {
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
        className="inline-block ml-1 w-1.5 h-6 align-middle bg-sky-700 dark:bg-white animate-pulse"
        aria-hidden="true"
      />
    </span>
  );
}

const container = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, when: 'beforeChildren' } },
};
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

export default function Hero() {
  const { personal } = resumeData;

  return (
    <section
      aria-label="Hero"
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        height: '100vh',
        // clear vertical light-blue gradient (top -> bottom)
        background: 'linear-gradient(180deg, #dff6ff 0%, #c6eefe 45%, #eaf9ff 100%)',
      }}
    >
      {/* remove the centered oval entirely (no ellipse here) */}

      {/* soft blurred background blobs (kept low contrast) */}
      <svg
        className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id="b" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="56" />
          </filter>
        </defs>

        <motion.g
          filter="url(#b)"
          animate={{ x: [0, -14, 0], opacity: [0.18, 0.24, 0.18] }}
          transition={{ duration: 14, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <ellipse cx="140" cy="220" rx="300" ry="160" fill="#cfeeff" opacity="0.18" />
        </motion.g>

        <motion.g
          filter="url(#b)"
          animate={{ y: [0, -10, 0], opacity: [0.14, 0.18, 0.14] }}
          transition={{ duration: 16, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <ellipse cx="980" cy="260" rx="340" ry="200" fill="#e6fff0" opacity="0.14" />
        </motion.g>
      </svg>

      <div className="max-w-4xl w-full px-6 mx-auto text-center">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Avatar with outer wave/ring + blinking lights */}
          <div className="relative inline-block mx-auto mb-6" style={{ width: '176px', height: '176px' }}>
            {/* outer ring 1 - subtle expanding ring */}
            <motion.span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 176,
                height: 176,
                boxSizing: 'border-box',
                border: '2px solid rgba(99, 102, 241, 0.12)', // soft indigo ring
              }}
              initial={{ scale: 1, opacity: 0.22 }}
              animate={{ scale: [1, 1.9], opacity: [0.22, 0], rotate: 0 }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut' }}
            />

            {/* outer ring 2 - delayed */}
            <motion.span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 176,
                height: 176,
                boxSizing: 'border-box',
                border: '2px solid rgba(6, 182, 212, 0.10)', // soft cyan ring
              }}
              initial={{ scale: 1, opacity: 0.16 }}
              animate={{ scale: [1, 1.6], opacity: [0.16, 0], rotate: 0 }}
              transition={{ duration: 4.4, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
            />

            {/* small blinking lights around avatar (positioned absolutely) */}
            {/* light A */}
            <motion.span
              aria-hidden="true"
              className="absolute rounded-full"
              style={{
                width: 10,
                height: 10,
                left: '78%',
                top: '12%',
                backgroundColor: '#06b6d4',
                boxShadow: '0 0 12px rgba(6,182,212,0.9)',
              }}
              initial={{ opacity: 0.2, scale: 0.8 }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatType: 'mirror', delay: 0.2 }}
            />

            {/* light B */}
            <motion.span
              aria-hidden="true"
              className="absolute rounded-full"
              style={{
                width: 8,
                height: 8,
                left: '88%',
                top: '46%',
                backgroundColor: '#3b82f6',
                boxShadow: '0 0 10px rgba(59,130,246,0.85)',
              }}
              initial={{ opacity: 0.18, scale: 0.8 }}
              animate={{ opacity: [0.18, 1, 0.18], scale: [0.8, 1.3, 0.8] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatType: 'mirror', delay: 0.6 }}
            />

            {/* light C */}
            <motion.span
              aria-hidden="true"
              className="absolute rounded-full"
              style={{
                width: 9,
                height: 9,
                left: '48%',
                top: '96%',
                transform: 'translateX(-50%)',
                backgroundColor: '#60a5fa',
                boxShadow: '0 0 10px rgba(96,165,250,0.7)',
              }}
              initial={{ opacity: 0.16, scale: 0.8 }}
              animate={{ opacity: [0.16, 1, 0.16], scale: [0.8, 1.35, 0.8] }}
              transition={{ duration: 2.1, repeat: Infinity, repeatType: 'mirror', delay: 1.1 }}
            />

            {/* Avatar image */}
            <motion.img
              src={avatar}
              alt={personal.name}
              className="relative z-10 rounded-full shadow-2xl border-4 border-white"
              style={{ width: 128, height: 128, objectFit: 'cover' }}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, y: [0, -6, 0], scale: [1, 1.03, 1] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.08, y: -6 }}
            />
          </div>

          {/* Name: blue in light mode, white in dark mode */}
          <motion.h1 variants={item} className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-2">
            <Typing text={personal.name} speed={70} className="text-sky-700 dark:text-white" />
          </motion.h1>

          {/* larger title/location/about */}
          <motion.p variants={item} className="text-2xl md:text-3xl text-slate-700 dark:text-slate-300 mb-3">
            {personal.title}
          </motion.p>

          <motion.p variants={item} className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-4">
            {personal.location}
          </motion.p>

          <motion.p variants={item} className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 mb-6 text-lg md:text-xl">
            I build web applications with JavaScript and React. I enjoy solving practical problems and improving my skills.
          </motion.p>

          {/* social icons: larger circular backgrounds, brand-colored icons */}
          <motion.div variants={item} className="flex justify-center gap-6 flex-wrap">
            {/* GitHub */}
            <motion.a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-md dark:bg-slate-800"
              aria-label="GitHub"
              whileHover={{ scale: 1.06, y: -3 }}
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#181717" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd"/>
              </svg>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-md dark:bg-slate-800"
              aria-label="LinkedIn"
              whileHover={{ scale: 1.06, y: -3 }}
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </motion.a>

            {/* Email */}
            <motion.a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-md dark:bg-slate-800"
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
}
