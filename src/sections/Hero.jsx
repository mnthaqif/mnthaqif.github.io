import { motion } from 'framer-motion'
import { fadeInUp } from '../utils/motion'
export default function Hero() {
  return (
    <section id="hero" className="section">
      <motion.div className="flex flex-col sm:flex-row items-center gap-8" initial={fadeInUp.initial} whileInView={fadeInUp.whileInView} viewport={fadeInUp.viewport} transition={fadeInUp.transition}>
        <img src="https://avatars.githubusercontent.com/u/16253645?v=4" alt="Portrait of Thaqif Rajab" className="h-28 w-28 rounded-full object-cover ring-2 ring-brand/30" />
        <div className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Thaqif Rajab</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Fullstack Web Developer & UI/UX Designer</p>
          <div className="mt-4 flex items-center justify-center sm:justify-start gap-3">
            <a className="btn btn-primary" href="#contact">Get in touch</a>
            <a className="btn btn-ghost" href="#projects">See projects</a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
