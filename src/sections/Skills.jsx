import { motion } from 'framer-motion'
import { fadeInUp } from '../utils/motion'
const skills = [
  { group: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'REST', 'PostgreSQL', 'MongoDB'] },
  { group: 'Tools', items: ['GitHub Actions', 'Jest', 'Playwright', 'Figma', 'Storybook'] }
]
export default function Skills() {
  return (
    <section id="skills" className="section">
      <motion.h2 className="section-title" initial={fadeInUp.initial} whileInView={fadeInUp.whileInView} transition={fadeInUp.transition} viewport={fadeInUp.viewport}>Skills</motion.h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {skills.map((group, i) => (
          <motion.div key={group.group} className="card p-5" initial={fadeInUp.initial} whileInView={fadeInUp.whileInView} transition={{ ...fadeInUp.transition, delay: i * 0.05 }} viewport={fadeInUp.viewport}>
            <h3 className="font-semibold mb-2">{group.group}</h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">{group.items.map(s => <li key={s}>• {s}</li>)}</ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
