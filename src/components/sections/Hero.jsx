import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../../data/resumeData';
import avatar from '../../assets/thaqif.jpg';

/** Typing with blinking cursor */
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
    <>
      {/* keyframes for blinking cursor */}
      <style>{`@keyframes blink { 0% { opacity: 1 } 50% { opacity: 0 } 100% { opacity: 1 } }`}</style>
      <span className={className} aria-label={text}>
        {display}
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: 12,
            marginLeft: 6,
            height: 20,
            verticalAlign: 'middle',
            backgroundColor: 'currentColor',
            borderRadius: 2,
            animation: 'blink 1s step-end infinite',
          }}
        />
      </span>
    </>
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
        // vertical light-blue gradient (top -> bottom)
        background: 'linear-gradient(180deg, #d8f2ff 0%, #c3ecff 45%, #e7fbff 100%)',
      }}
    >
      {/* soft blurred background blobs (no centered oval) */}
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
          <ellipse cx="140" cy="220" rx="300" ry="160" fill="#cfeeff" opacity="0.16" />
        </motion.g>

        <motion.g
          filter="url(#b)"
          animate={{ y: [0, -10, 0], opacity: [0.12, 0.16, 0.12] }}
          transition={{ duration: 16, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <ellipse cx="980" cy="260" rx="340" ry="200" fill="#e6fff0" opacity="0.12" />
        </motion.g>
      </svg>

      <div className="max-w-4xl w-full px-6 mx-auto text-center">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Avatar with outer rings + blinking lights (wave-like) */}
          <div className="relative inline-block mx-auto mb-6" style={{ width: 192, height: 192 }}>
            {/* expanding ring 1 */}
            <motion.span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 192,
                height: 192,
                boxSizing: 'border-box',
                border: '2px solid rgba(6,182,212,0.10)',
              }}
              initial={{ scale: 1, opacity: 0.22 }}
              animate={{ scale: [1, 2], opacity: [0.22, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeOut' }}
            />

            {/* expanding ring 2 (delayed) */}
            <motion.span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 192,
                height: 192,
                boxSizing: 'border-box',
                border: '2px solid rgba(99,102,241,0.08)',
              }}
              initial={{ scale: 1, opacity: 0.16 }}
              animate={{ scale: [1, 1.7], opacity: [0.16, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
            />

            {/* blinking lights (around the avatar) */}
            <motion.span
              aria-hidden="true"
              className="absolute rounded-full"
              style={{
                width: 10,
                height: 10,
                left: '78%',
                top: '12%',
                backgroundColor: '#06b6d4',
                boxShadow: '0 0 10px rgba(6,182,212,0.9)',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatType: 'mirror', delay: 0.2 }}
            />

            <motion.span
              aria-hidden="true"
              className="absolute rounded-full"
              style={{
                width: 9,
                height: 9,
                left: '88%',
                top: '46%',
                backgroundColor: '#3b82f6',
                boxShadow: '0 0 10px rgba(59,130,246,0.85)',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{ opacity: [0.16, 1, 0.16], scale: [0.8, 1.3, 0.8] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatType: 'mirror', delay: 0.6 }}
            />

            <motion.span
              aria-hidden="true"
              className="absolute rounded-full"
              style={{
                width: 8,
                height: 8,
                left: '48%',
                top: '96%',
                backgroundColor: '#60a5fa',
                boxShadow: '0 0 10px rgba(96,165,250,0.7)',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{ opacity: [0.16, 1, 0.16], scale: [0.8, 1.35, 0.8] }}
              transition={{ duration: 2.2, repeat: Infinity, repeatType: 'mirror', delay: 1.1 }}
            />

            {/* Avatar */}
            <motion.img
              src={avatar}
              alt={personal.name}
              className="relative z-10 rounded-full shadow-2xl border-4 border-white"
              style={{ width: 144, height: 144, objectFit: 'cover' }}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, y: [0, -8, 0], scale: [1, 1.04, 1] }}
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

          {/* social icons: circular backgrounds adapt to light/dark and icons in brand colors */}
          <motion.div variants={item} className="flex justify-center gap-6 flex-wrap">
            <motion.a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md dark:bg-slate-800"
              aria-label="GitHub"
              whileHover={{ scale: 1.06, y: -3 }}
            >
              <svg className="w-9 h-9" viewBox="0 0 24 24" fill="#181717" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd"/>
              </svg>
            </motion.a>

            <motion.a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md dark:bg-slate-800"
              aria-label="LinkedIn"
              whileHover={{ scale: 1.06, y: -3 }}
            >
              <svg className="w-9 h-9" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
