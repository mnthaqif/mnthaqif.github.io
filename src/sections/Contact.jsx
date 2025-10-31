import { motion } from 'framer-motion'
import { fadeInUp } from '../utils/motion'
export default function Contact({ onDownload }) {
  return (
    <section id="contact" className="section">
      <motion.h2 className="section-title" initial={fadeInUp.initial} whileInView={fadeInUp.whileInView} transition={fadeInUp.transition} viewport={fadeInUp.viewport}>Contact</motion.h2>
      <motion.div initial={fadeInUp.initial} whileInView={fadeInUp.whileInView} transition={{ ...fadeInUp.transition, delay: 0.05 }} viewport={fadeInUp.viewport} className="card p-6">
        <p className="text-gray-700 dark:text-gray-300">Email: <a className="link" href="mailto:thaqif_rajab@yahoo.com">thaqif_rajab@yahoo.com</a></p>
        <p className="text-gray-700 dark:text-gray-300 mt-1">Website: <a className="link" href="https://mnthaqif.github.io" target="_blank" rel="noreferrer">mnthaqif.github.io</a></p>
        <p className="text-gray-700 dark:text-gray-300 mt-1">GitHub: <a className="link" href="https://github.com/mnthaqif" target="_blank" rel="noreferrer">github.com/mnthaqif</a></p>
        <div className="mt-4"><button className="btn btn-primary" onClick={onDownload}>Download Resume PDF</button></div>
      </motion.div>
    </section>
  )
}
