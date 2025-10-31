import { motion } from 'framer-motion'
import { fadeInUp } from '../utils/motion'
const projects = [
  { title: 'Project One', description: 'Impact and tech stack.', tech: ['React','Node','Tailwind'], link: '#' },
  { title: 'Project Two', description: 'Outcome-focused summary.', tech: ['TypeScript','Express','Postgres'], link: '#' },
  { title: 'Project Three', description: 'Problem solved and your role.', tech: ['Next.js','Framer Motion'], link: '#' }
]
export default function Projects() {
  return (
    <section id="projects" className="section">
      <motion.h2 className="section-title" initial={fadeInUp.initial} whileInView={fadeInUp.whileInView} transition={fadeInUp.transition} viewport={fadeInUp.viewport}>Projects</motion.h2>
      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((p, i) => (
          <motion.article key={p.title} className="card p-5 flex flex-col" initial={fadeInUp.initial} whileInView={fadeInUp.whileInView} transition={{ ...fadeInUp.transition, delay: i * 0.05 }} viewport={fadeInUp.viewport}>
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 flex-1">{p.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">{p.tech.map(t => <span key={t} className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">{t}</span>)}</div>
            <a href={p.link} className="link mt-4 text-sm" target="_blank" rel="noreferrer">View project</a>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
