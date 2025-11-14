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

  // responsiveness: detect small screens (phone / small tablet)
  const [isSmall, setIsSmall] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 768px)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsSmall(e.matches);
    // older browsers
    if (mq.addEventListener) mq.addEventListener('change', handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler);
      else mq.removeListener(handler);
    };
  }, []);

  // star positions (percent-based)
  const stars = [
    { x: 4, y: 8, r: 1.1, d: 0.1 }, { x: 10, y: 18, r: 1.3, d: 0.4 },
    { x: 18, y: 6, r: 1.0, d: 0.2 }, { x: 26, y: 14, r: 1.6, d: 0.7 },
    { x: 34, y: 4, r: 1.2, d: 0.3 }, { x: 42, y: 10, r: 1.0, d: 0.9 },
    { x: 50, y: 6, r: 1.4, d: 0.6 }, { x: 58, y: 12, r: 1.1, d: 0.8 },
    { x: 66, y: 7, r: 1.0, d: 1.1 }, { x: 74, y: 20, r: 1.3, d: 0.5 },
    { x: 82, y: 9, r: 1.2, d: 0.9 }, { x: 90, y: 5, r: 0.9, d: 0.2 },
    { x: 8, y: 26, r: 0.9, d: 1.3 }, { x: 20, y: 24, r: 1.0, d: 0.5 },
    { x: 28, y: 22, r: 1.3, d: 0.3 }, { x: 36, y: 28, r: 0.9, d: 1.4 },
    { x: 46, y: 30, r: 1.2, d: 0.6 }, { x: 56, y: 26, r: 1.0, d: 0.8 },
    { x: 64, y: 32, r: 1.1, d: 1.0 }, { x: 72, y: 30, r: 0.8, d: 0.7 },
    { x: 80, y: 28, r: 1.0, d: 0.9 }, { x: 88, y: 26, r: 0.9, d: 0.4 },
    { x: 6, y: 40, r: 0.8, d: 1.0 }, { x: 16, y: 50, r: 0.7, d: 0.6 },
    { x: 34, y: 48, r: 0.9, d: 0.9 }, { x: 52, y: 44, r: 1.0, d: 0.3 },
    { x: 70, y: 46, r: 0.8, d: 0.7 }, { x: 86, y: 36, r: 0.9, d: 0.5 },
    { x: 12, y: 60, r: 0.6, d: 1.2 }, { x: 28, y: 64, r: 0.8, d: 0.8 },
    { x: 44, y: 62, r: 0.7, d: 0.4 }, { x: 60, y: 68, r: 0.6, d: 1.0 },
    { x: 76, y: 58, r: 0.9, d: 0.2 }, { x: 92, y: 52, r: 0.7, d: 0.6 },
  ];

  // small smoke-like cloud clusters (percent positions)
  const smallClouds = [
    { x: 8, y: 12, scale: 0.6, delay: 0 },
    { x: 18, y: 6, scale: 0.45, delay: 1.4 },
    { x: 28, y: 22, scale: 0.5, delay: 0.8 },
    { x: 38, y: 10, scale: 0.55, delay: 2.2 },
    { x: 48, y: 18, scale: 0.6, delay: 1.0 },
    { x: 58, y: 8, scale: 0.4, delay: 1.8 },
    { x: 68, y: 20, scale: 0.5, delay: 0.6 },
    { x: 78, y: 12, scale: 0.45, delay: 2.6 },
    { x: 88, y: 28, scale: 0.5, delay: 1.2 },
    { x: 14, y: 38, scale: 0.35, delay: 0.9 },
    { x: 34, y: 44, scale: 0.4, delay: 1.5 },
    { x: 54, y: 50, scale: 0.5, delay: 0.3 },
  ];

  // adjust opacities & scales for small screens so clouds read clearer
  const sharedCloudOpacity = isSmall ? 0.26 : 0.10; // shared overlay
  const sharedWispOpacity = isSmall ? 0.14 : 0.06;
  const darkCloudOpacity = isSmall ? 0.48 : 0.34;
  const smallCloudScaleBoost = isSmall ? 1.18 : 1.0; // slightly bigger small clouds on small screens

  return (
    <section
      aria-label="Hero"
      className="min-h-screen flex items-center justify-center relative transition-colors duration-300"
      style={{ height: '100vh', overflow: 'visible' }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-30 transition-colors duration-300 bg-gradient-to-b from-sky-300 via-sky-150 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-700"
      />

      {/* subtle blurred background blobs */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none -z-40"
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

      {/* Shared small smoke-like clouds layer (subtle, 3D-ish) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none -z-35"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* gradient gives a soft 3D feel (lighter top, darker bottom) */}
          <linearGradient id="smokeGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
            <stop offset="40%" stopColor="rgba(220,220,225,0.7)" />
            <stop offset="100%" stopColor="rgba(160,160,170,0.35)" />
          </linearGradient>

          {/* inner shadow to add some depth to clouds */}
          <filter id="smokeShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feOffset dx="0" dy="6" result="off" />
            <feGaussianBlur in="off" stdDeviation="12" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.05  0 0 0 0 0.05  0 0 0 0 0.06  0 0 0 0.5 0" result="shadow"/>
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* a few larger shared shapes for atmosphere (use sharedCloudOpacity) */}
        <g filter="url(#smokeShadow)" fill="url(#smokeGrad)" opacity={sharedCloudOpacity}>
          <motion.ellipse
            cx="320"
            cy="180"
            rx={isSmall ? 520 : 420}
            ry={isSmall ? 170 : 140}
            animate={{ x: [0, -30, 0] }}
            transition={{ duration: 36, repeat: Infinity, ease: 'easeInOut' }}
            opacity={1}
          />
          <motion.ellipse
            cx="920"
            cy="300"
            rx={isSmall ? 640 : 520}
            ry={isSmall ? 200 : 160}
            animate={{ x: [0, 30, 0] }}
            transition={{ duration: 44, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            opacity={1}
          />
          <motion.ellipse
            cx="1300"
            cy="140"
            rx={isSmall ? 460 : 360}
            ry={isSmall ? 160 : 120}
            animate={{ x: [0, -22, 0] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            opacity={1}
          />
        </g>

        {/* small wisps for texture */}
        <g filter="url(#smokeShadow)" fill="url(#smokeGrad)" opacity={sharedWispOpacity}>
          <motion.ellipse
            cx="480"
            cy="90"
            rx={isSmall ? 280 : 220}
            ry={isSmall ? 90 : 70}
            animate={{ x: [0, -18, 0], opacity: [0.04, 0.08, 0.04] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.ellipse
            cx="1100"
            cy="420"
            rx={isSmall ? 320 : 260}
            ry={isSmall ? 100 : 80}
            animate={{ x: [0, 18, 0], opacity: [0.04, 0.08, 0.04] }}
            transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
        </g>

        {/* small, distributed 3D-feel smoke puffs (not dense) */}
        {smallClouds.map((c, i) => {
          const cx = (c.x / 100) * 1200;
          const cy = (c.y / 100) * 700;
          const s = c.scale * smallCloudScaleBoost;
          const dur = 24 + (i % 5) * 6;
          return (
            <motion.g
              key={`smoke-${i}`}
              transform={`translate(${cx}, ${cy}) scale(${s})`}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: [0, -6 + (i % 3), 0], opacity: [0.0, 1, 0.95], rotate: [0, (i % 2) ? 1.4 : -1.2, 0] }}
              transition={{ duration: dur, repeat: Infinity, delay: c.delay * 0.6, ease: 'easeInOut' }}
              style={{ filter: 'url(#smokeShadow)', transformOrigin: 'center' }}
            >
              {/* 3 overlapping ellipses with slight offsets & gradient fill to simulate 3D puff */}
              <ellipse cx="-36" cy="0" rx="48" ry="20" fill="url(#smokeGrad)" opacity={0.88} />
              <ellipse cx="0" cy="-6" rx="64" ry="26" fill="url(#smokeGrad)" opacity={0.94} />
              <ellipse cx="44" cy="6" rx="40" ry="18" fill="url(#smokeGrad)" opacity={0.82} />
            </motion.g>
          );
        })}
      </svg>

      {/* Dark-sky: moon (SVG with crescent mask + glow), clouds, stars */}
      <div className="absolute inset-0 pointer-events-none -z-20">
        <div className="hidden dark:block w-full h-full">
          {/* crescent moon (SVG) */}
          <motion.svg
            aria-hidden="true"
            viewBox="0 0 120 120"
            className="absolute left-3 top-3 md:left-20 md:top-8 w-16 h-16 md:w-28 md:h-28"
            initial={{ x: -2 }}
            animate={{ x: [0, 3, 0], y: [0, -2, 0], rotate: [0, 0.6, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ zIndex: -18 }}
          >
            <defs>
              {/* moon surface gradient */}
              <radialGradient id="moonG2" cx="35%" cy="22%">
                <stop offset="0%" stopColor="#fffde6" stopOpacity="1" />
                <stop offset="60%" stopColor="#fff2ab" stopOpacity="1" />
                <stop offset="100%" stopColor="#f0d87f" stopOpacity="1" />
              </radialGradient>

              {/* mask for crescent phase */}
              <mask id="phaseMask">
                <rect x="0" y="0" width="120" height="120" fill="white" />
                <motion.circle
                  cx="82"
                  cy="60"
                  r="36"
                  fill="black"
                  animate={{ cx: [88, 82, 76, 82, 88] }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                />
              </mask>

              {/* glow filter for moon */}
              <filter id="moonGlow2" x="-120%" y="-120%" width="340%" height="340%">
                <feGaussianBlur stdDeviation="10" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* glow group (applies mask so only halo around visible crescent shows) */}
            <g style={{ filter: 'url(#moonGlow2)' }}>
              <circle cx="60" cy="60" r="40" fill="url(#moonG2)" mask="url(#phaseMask)" />
            </g>

            {/* pulsing halo (subtle, behind moon) */}
            <motion.circle
              cx="60"
              cy="60"
              r="48"
              fill="rgba(240,220,120,0.06)"
              animate={{ opacity: [0.04, 0.12, 0.04], scale: [1, 1.03, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* moon body with crescent mask applied */}
            <circle cx="60" cy="60" r="40" fill="url(#moonG2)" mask="url(#phaseMask)" />

            {/* subtle highlight arc for crescent depth */}
            <path
              d="M92 60 A32 32 0 0 1 52 92"
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1.2"
              opacity="0.22"
            />

            {/* small craters */}
            <circle cx="46" cy="62" r="4.2" fill="rgba(0,0,0,0.06)" opacity="0.95" />
            <circle cx="74" cy="78" r="3.2" fill="rgba(0,0,0,0.05)" opacity="0.95" />
            <circle cx="86" cy="54" r="2.8" fill="rgba(0,0,0,0.04)" opacity="0.95" />
          </motion.svg>

          {/* drifting cloud clusters (large, soft) */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0.0 }}
            animate={{ opacity: [0.0, darkCloudOpacity, 0.0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 -z-19"
            style={{ pointerEvents: 'none' }}
          >
            <svg viewBox="0 0 1600 900" className="w-full h-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="cloudBlurFull" x="-60%" y="-60%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="24" />
                </filter>
              </defs>

              <g filter="url(#cloudBlurFull)" fill="rgba(120,120,125,0.22)" opacity={darkCloudOpacity}>
                <motion.ellipse
                  cx="300"
                  cy="200"
                  rx="420"
                  ry="160"
                  animate={{ x: [0, -40, 0] }}
                  transition={{ duration: 36, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.ellipse
                  cx="900"
                  cy="320"
                  rx="520"
                  ry="200"
                  animate={{ x: [0, 40, 0] }}
                  transition={{ duration: 48, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
                />
                <motion.ellipse
                  cx="1300"
                  cy="180"
                  rx="360"
                  ry="140"
                  animate={{ x: [0, -30, 0] }}
                  transition={{ duration: 42, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                />
                <motion.ellipse
                  cx="700"
                  cy="520"
                  rx="640"
                  ry="220"
                  animate={{ x: [0, 30, 0] }}
                  transition={{ duration: 56, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
                />
              </g>
            </svg>
          </motion.div>

          {/* stars + layered cloud detail */}
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 700"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{ zIndex: -20 }}
          >
            <defs>
              <filter id="cloudBlur2" x="-60%" y="-60%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="10" />
              </filter>

              <linearGradient id="starGrad2" x1="0" x2="1">
                <stop offset="0%" stopColor="#fff9d9" />
                <stop offset="100%" stopColor="#ffe77a" />
              </linearGradient>
            </defs>

            <motion.g
              filter="url(#cloudBlur2)"
              initial={{ x: 0 }}
              animate={{ x: [0, -30, 0] }}
              transition={{ duration: 26, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              opacity="0.85"
            >
              <g transform="translate(120,100)" fill="rgba(100,100,108,0.54)">
                <ellipse cx="0" cy="0" rx="76" ry="30" />
                <ellipse cx="-54" cy="12" rx="64" ry="26" />
                <ellipse cx="84" cy="16" rx="58" ry="24" />
              </g>
            </motion.g>

            <motion.g
              filter="url(#cloudBlur2)"
              initial={{ x: 0 }}
              animate={{ x: [0, -18, 0] }}
              transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              opacity="0.62"
            >
              <g transform="translate(260,160)" fill="rgba(100,100,108,0.42)">
                <ellipse cx="0" cy="0" rx="140" ry="44" />
                <ellipse cx="-80" cy="12" rx="96" ry="34" />
                <ellipse cx="92" cy="10" rx="78" ry="30" />
              </g>
            </motion.g>

            <motion.g
              filter="url(#cloudBlur2)"
              initial={{ x: 0 }}
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 28, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              opacity="0.48"
            >
              <g transform="translate(920,110)" fill="rgba(100,100,108,0.36)">
                <ellipse cx="0" cy="0" rx="84" ry="28" />
                <ellipse cx="-46" cy="8" rx="64" ry="20" />
                <ellipse cx="58" cy="10" rx="52" ry="18" />
              </g>
            </motion.g>

            <motion.g
              filter="url(#cloudBlur2)"
              initial={{ x: 0 }}
              animate={{ x: [0, -12, 0] }}
              transition={{ duration: 30, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              opacity="0.34"
            >
              <g transform="translate(520,220)" fill="rgba(100,100,108,0.28)">
                <ellipse cx="0" cy="0" rx="150" ry="36" />
                <ellipse cx="-110" cy="10" rx="120" ry="32" />
                <ellipse cx="110" cy="12" rx="96" ry="28" />
              </g>
            </motion.g>

            {/* star field */}
            {stars.map((s, idx) => {
              const cx = (s.x / 100) * 1200;
              const cy = (s.y / 100) * 700;
              const jitterX = (idx % 3) * 0.9;
              const jitterY = (idx % 4) * -0.6;
              return (
                <motion.g
                  key={idx}
                  initial={{ opacity: 0.12, scale: 1 }}
                  animate={{ opacity: [0.12, 1, 0.12], scale: [1, 1.12, 1] }}
                  transition={{ duration: 1.4 + (s.d || 0.2), repeat: Infinity, delay: s.d, ease: 'easeInOut' }}
                >
                  <circle cx={cx + jitterX} cy={cy + jitterY} r={s.r * 0.9} fill="url(#starGrad2)" opacity={0.95} />
                </motion.g>
              );
            })}
          </svg>
        </div>
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
