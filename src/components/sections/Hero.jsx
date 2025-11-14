import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../../data/resumeData';
import avatar from '../../assets/thaqif.jpg';

/** Typing with thin blinking caret sized to the name */
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
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
      <span>{display}</span>
      <motion.span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: '0.12ch',
          height: '1em',
          borderRadius: '1px',
          backgroundColor: 'currentColor',
          verticalAlign: 'middle',
        }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
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
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay } }),
};

const Hero = () => {
  const { personal } = resumeData;

  // expanded star positions for denser, subtle night sky
  const stars = [
    { x: 4, y: 8, r: 1.1, d: 0.1 },
    { x: 10, y: 18, r: 1.3, d: 0.4 },
    { x: 18, y: 6, r: 1.0, d: 0.2 },
    { x: 26, y: 14, r: 1.6, d: 0.7 },
    { x: 34, y: 4, r: 1.2, d: 0.3 },
    { x: 42, y: 10, r: 1.0, d: 0.9 },
    { x: 50, y: 6, r: 1.4, d: 0.6 },
    { x: 58, y: 12, r: 1.1, d: 0.8 },
    { x: 66, y: 7, r: 1.0, d: 1.1 },
    { x: 74, y: 20, r: 1.3, d: 0.5 },
    { x: 82, y: 9, r: 1.2, d: 0.9 },
    { x: 90, y: 5, r: 0.9, d: 0.2 },

    { x: 8, y: 26, r: 0.9, d: 1.3 },
    { x: 20, y: 24, r: 1.0, d: 0.5 },
    { x: 28, y: 22, r: 1.3, d: 0.3 },
    { x: 36, y: 28, r: 0.9, d: 1.4 },
    { x: 46, y: 30, r: 1.2, d: 0.6 },
    { x: 56, y: 26, r: 1.0, d: 0.8 },
    { x: 64, y: 32, r: 1.1, d: 1.0 },
    { x: 72, y: 30, r: 0.8, d: 0.7 },
    { x: 80, y: 28, r: 1.0, d: 0.9 },
    { x: 88, y: 26, r: 0.9, d: 0.4 },

    // a few lower stars for depth
    { x: 12, y: 40, r: 0.8, d: 1.0 },
    { x: 44, y: 46, r: 0.9, d: 1.2 },
    { x: 68, y: 44, r: 1.0, d: 0.6 },
    { x: 92, y: 38, r: 0.8, d: 0.7 },
  ];

  return (
    <section
      aria-label="Hero"
      className="min-h-screen flex items-center justify-center relative transition-colors duration-300 overflow-visible"
      style={{ height: '100vh' }}
    >
      {/* Background gradient: light-blue in light mode, darker gentle gradient in dark mode */}
      <div
        className={
          'absolute inset-0 -z-30 transition-colors duration-300 ' +
          'bg-gradient-to-b from-sky-300 via-sky-150 to-white ' +
          'dark:from-slate-900 dark:via-slate-800 dark:to-slate-700'
        }
      />

      {/* subtle blurred background blobs (kept soft) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: -40 }}
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

        <motion.g
          filter="url(#blurSoft)"
          animate={{ x: [0, -12, 0], opacity: [0.12, 0.16, 0.12] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <ellipse cx="140" cy="240" rx="300" ry="150" fill="#c7eaff" opacity="0.12" />
        </motion.g>

        <motion.g
          filter="url(#blurSoft)"
          animate={{ y: [0, -8, 0], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 14, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <ellipse cx="980" cy="300" rx="340" ry="180" fill="#e6fff0" opacity="0.10" />
        </motion.g>
      </svg>

      {/* Dark-sky: moon, improved clouds and more twinkling stars (visible only in dark mode) */}
      <div className="absolute inset-0 pointer-events-none -z-20 dark:block hidden">
        {/* Moon as CSS-backed, responsive element so it is always visible on small screens */}
        <motion.div
          aria-hidden="true"
          initial={{ x: -2 }}
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-4 top-4 md:left-20 md:top-12"
          style={{ zIndex: -19 }}
        >
          <div
            // responsive sizes: small screens show smaller moon but still visible; md+ larger moon
            className="rounded-full shadow-[0_0_40px_rgba(255,220,90,0.12)]"
            style={{
              width: '4.25rem',
              height: '4.25rem',
              background: 'radial-gradient(circle at 30% 30%, #fffde6 0%, #fff2ab 60%, #f0d87f 100%)',
              boxShadow: '0 0 50px rgba(250, 235, 130, 0.12)',
            }}
          >
            {/* Craters: positioned using absolute divs inside moon */}
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <div style={{
                position: 'absolute', left: '10%', top: '18%', width: '10%',
                height: '10%', borderRadius: '50%', background: 'rgba(0,0,0,0.06)'
              }} />
              <div style={{
                position: 'absolute', left: '58%', top: '30%', width: '8%',
                height: '8%', borderRadius: '50%', background: 'rgba(0,0,0,0.05)'
              }} />
              <div style={{
                position: 'absolute', left: '40%', top: '10%', width: '6%',
                height: '6%', borderRadius: '50%', background: 'rgba(0,0,0,0.04)'
              }} />
            </div>
          </div>
        </motion.div>

        {/* Stars + Clouds SVG layer */}
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ zIndex: -20 }}
        >
          <defs>
            <filter id="cloudBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
            <linearGradient id="starGrad" x1="0" x2="1">
              <stop offset="0%" stopColor="#fff8bf" />
              <stop offset="100%" stopColor="#ffe77a" />
            </linearGradient>
          </defs>

          {/* clouds group: several clusters with blur and opacity for natural look */}
          <motion.g
            filter="url(#cloudBlur)"
            initial={{ x: 0 }}
            animate={{ x: [0, -22, 0] }}
            transition={{ duration: 22, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            opacity="0.95"
          >
            <g transform="translate(160,120)" fill="rgba(7,12,20,0.56)">
              <ellipse cx="0" cy="0" rx="48" ry="20" />
              <ellipse cx="-36" cy="8" rx="40" ry="18" />
              <ellipse cx="44" cy="12" rx="34" ry="14" />
            </g>

            <g transform="translate(260,170)" fill="rgba(7,12,20,0.36)">
              <ellipse cx="0" cy="0" rx="90" ry="30" />
              <ellipse cx="-50" cy="10" rx="66" ry="22" />
              <ellipse cx="60" cy="8" rx="48" ry="18" />
            </g>

            <g transform="translate(900,110)" fill="rgba(7,12,20,0.30)">
              <ellipse cx="0" cy="0" rx="64" ry="20" />
              <ellipse cx="-40" cy="6" rx="46" ry="16" />
              <ellipse cx="44" cy="8" rx="36" ry="14" />
            </g>

            <g transform="translate(520,220)" fill="rgba(7,12,20,0.22)">
              <ellipse cx="0" cy="0" rx="120" ry="28" />
              <ellipse cx="-80" cy="10" rx="84" ry="22" />
              <ellipse cx="84" cy="12" rx="72" ry="20" />
            </g>
          </motion.g>

          {/* render many stars with slight twinkle and scale */}
          {stars.map((s, idx) => {
            // convert percent positions to viewBox coordinates (1200 x 700)
            const cx = (s.x / 100) * 1200;
            const cy = (s.y / 100) * 700;
            return (
              <motion.g
                key={idx}
                initial={{ opacity: 0.18, scale: 1 }}
                animate={{ opacity: [0.18, 1, 0.18], scale: [1, 1.12, 1] }}
                transition={{ duration: 1.5 + (s.d || 0.2), repeat: Infinity, delay: s.d, ease: 'easeInOut' }}
              >
                <circle cx={cx} cy={cy} r={s.r * 0.9} fill="url(#starGrad)" opacity={0.95} />
                {/* add tiny sparkle cross for a subset to give variety */}
                {s.r > 1.15 && (
                  <g transform={`translate(${cx}, ${cy})`}>
                    <line x1={-s.r * 0.9} y1={0} x2={s.r * 0.9} y2={0} stroke="#fff7b6" strokeWidth={0.6} strokeLinecap="round" />
                    <line x1={0} y1={-s.r * 0.9} x2={0} y2={s.r * 0.9} stroke="#fff7b6" strokeWidth={0.6} strokeLinecap="round" />
                  </g>
                )}
              </motion.g>
            );
          })}
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center w-full px-4 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mx-auto">
          {/* Avatar with animated rings */}
          <div className="relative inline-block mx-auto mb-6">
            <motion.span
              aria-hidden="true"
              className="absolute rounded-full"
              style={{
                inset: 0,
                borderRadius: '9999px',
                boxSizing: 'border-box',
                border: '2px solid rgba(59,130,246,0.14)',
              }}
              initial={{ scale: 1, opacity: 0.26 }}
              animate={{ scale: [1, 1.9], opacity: [0.26, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.span
              aria-hidden="true"
              className="absolute rounded-full"
              style={{
                inset: 0,
                borderRadius: '9999px',
                boxSizing: 'border-box',
                border: '2px solid rgba(59,130,246,0.09)',
              }}
              initial={{ scale: 1, opacity: 0.16 }}
              animate={{ scale: [1, 1.6], opacity: [0.16, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
            />

            <motion.img
              variants={itemVariant}
              custom={0}
              src={avatar}
              srcSet={`${avatar} 1x, ${avatar} 2x`}
              sizes="(max-width: 768px) 9rem, 11rem"
              alt={personal.name}
              className="relative z-10 w-36 h-36 md:w-44 md:h-44 rounded-full shadow-2xl border-4 border-white/85 dark:border-slate-700 object-cover"
              style={{ imageRendering: 'auto' }}
              fetchPriority="high"
              loading="eager"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, y: [0, -12, 0], scale: [0.98, 1.06, 0.98] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.12, y: -6 }}
            />
          </div>

          {/* Name */}
          <motion.h1 variants={itemVariant} custom={0.1} className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-2">
            <Typing text={personal.name} speed={70} className="text-sky-700 dark:text-white" />
          </motion.h1>

          {/* Full-Stack Developer: fade-in */}
          <motion.p
            variants={itemVariant}
            custom={0.2}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-2xl md:text-3xl text-slate-700 dark:text-slate-300 mb-3"
          >
            {personal.title}
          </motion.p>

          {/* location */}
          <motion.p variants={itemVariant} custom={0.25} className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-4">
            {personal.location}
          </motion.p>

          {/* about */}
          <motion.p variants={itemVariant} custom={0.3} className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 mb-6 text-lg md:text-xl">
            I build web applications with JavaScript and React. I enjoy solving practical problems and improving my skills.
          </motion.p>

          {/* Social icons (kept same) */}
          <motion.div variants={itemVariant} custom={0.4} className="flex justify-center gap-6 flex-wrap">
            <motion.a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 md:p-4 rounded-full bg-white border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700 flex items-center justify-center"
              aria-label="GitHub"
              whileHover={{ scale: 1.06, y: -3 }}
            >
              <svg className="w-9 h-9 md:w-10 md:h-10" viewBox="0 0 24 24" fill="#181717" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
              </svg>
            </motion.a>

            <motion.a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 md:p-4 rounded-full bg-white border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700 flex items-center justify-center"
              aria-label="LinkedIn"
              whileHover={{ scale: 1.06, y: -3 }}
            >
              <svg className="w-9 h-9 md:w-10 md:h-10" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
