import { motion } from 'framer-motion'
import { fadeInUp } from '../utils/motion'
export default function About() {
  return (
    <section id="about" className="section">
      <motion.h2 className="section-title" initial={fadeInUp.initial} whileInView={fadeInUp.whileInView} transition={fadeInUp.transition} viewport={fadeInUp.viewport}>About Me</motion.h2>
      <motion.p className="text-gray-700 dark:text-gray-300 leading-7" initial={fadeInUp.initial} whileInView={fadeInUp.whileInView} transition={{ ...fadeInUp.transition, delay: 0.05 }} viewport={fadeInUp.viewport}>
        I’m a fullstack developer focused on crafting performant, accessible, and delightful web experiences. I specialize in React, TypeScript, Node.js, and design systems.
      </motion.p>
    </section>
  )
}
