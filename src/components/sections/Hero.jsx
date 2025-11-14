import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../../data/resumeData';
import avatar from '../../assets/thaqif.jpg';

const container = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, when: 'beforeChildren' } },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const Hero = () => {
  const { personal } = resumeData;

  return (
    <section
      aria-label="Hero"
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        // soft light-blue base with a very gentle gradient (low contrast)
        minHeight: '60vh',
        background: 'linear-gradient(180deg, #eaf7ff 0%, #f8feff 60%)',
      }}
    >
      {/* animated, subtle background blobs */}
      <svg
        className="absolute inset-0 w-full h-full -z-10"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id="blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="56" />
          </filter>
        </defs>

        {/* left blob drifting slowly */}
        <motion.g
          filter="url(#blur)"
          animate={{ x: [0, -18, 0], opacity: [0.18, 0.24, 0.18] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <ellipse cx="180" cy="220" rx="320" ry="180" fill="#cfeeff" opacity="0.22" />
        </motion.g>

        {/* right blob drifting slowly */}
        <motion.g
          filter="url(#blur)"
          animate={{ y: [0, -12, 0], opacity: [0.14, 0.18, 0.14] }}
          transition={{ duration: 14, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <ellipse cx="980" cy="260" rx="340" ry="200" fill="#e6fff2" opacity="0.18" />
        </motion.g>

        {/* faint center wash */}
        <rect width="100%" height="100%" fill="rgba(255,255,255,0.02)" />
      </svg>

      <div className="max-w-4xl w-full px-4 mx-auto">
        <motion.div variants={container} initial="hidden" animate="show" className="text-center">
          <motion.img
            variants={item}
            src={avatar}
            alt={personal.name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-5 shadow-lg border-4 border-white"
            // subtle floating animation + hover scale
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.06, rotate: 0.5 }}
          />

          <motion.h1
            variants={item}
            className="text-4xl md:text-5xl font-semibold mb-2 text-slate-900"
          >
            {personal.name}
          </motion.h1>

          <motion.p variants={item} className="text-lg md:text-xl text-slate-600 mb-3">
            {personal.title} — {personal.location}
          </motion.p>

          {/* simple about me */}
          <motion.p variants={item} className="max-w-2xl mx-auto text-slate-600 mb-6 text-base">
            I build web applications with JavaScript and React. I enjoy solving practical problems
            and learning new tools to improve my work.
          </motion.p>

          {/* social icons (original brand colors) */}
          <motion.div variants={item} className="flex items-center justify-center gap-3">
            <motion.a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              whileHover={{ scale: 1.05, y: -3 }}
              className="p-3 rounded-full bg-white shadow-sm"
            >
              {/* GitHub — original black */}
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#181717" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd"/>
              </svg>
            </motion.a>

            <motion.a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              whileHover={{ scale: 1.05, y: -3 }}
              className="p-3 rounded-full bg-white shadow-sm"
            >
              {/* LinkedIn — original blue */}
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </motion.a>

            <motion.a
              href={`mailto:${personal.email}`}
              className="p-3 rounded-full bg-white shadow-sm"
              aria-label="Email"
              whileHover={{ scale: 1.05, y: -3 }}
            >
              {/* Email — neutral slate color */}
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#334155" aria-hidden="true">
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
