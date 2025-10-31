import { motion } from 'framer-motion'
import { fadeInUp } from '../utils/motion'
const experience = [
  { role: 'Senior Fullstack Developer', company: 'Company A', period: '2022 — Present', bullets: ['Led design system (+40% delivery).','Architected platform (1M+ MAU).'] },
  { role: 'Frontend Engineer', company: 'Company B', period: '2020 — 2022', bullets: ['A11y components (0 regressions).','Improved LCP by 35%.'] }
]
const education = [{ degree: 'B.Sc. in Computer Science', school: 'University Name', period: '2016 — 2020' }]
export default function Experience() {
  return (
    <section id="experience" className="section">
      <motion.h2 className="section-title" initial={fadeInUp.initial} whileInView={fadeInUp.whileInView} transition={fadeInUp.transition} viewport={fadeInUp.viewport}>Experience & Education</motion.h2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={fadeInUp.initial} whileInView={fadeInUp.whileInView} transition={fadeInUp.transition} viewport={fadeInUp.viewport} className="space-y-4">
          <h3 className="font-semibold">Experience</h3>
          {experience.map(e => (
            <article key={e.role} className="card p-5">
              <div className="flex items-center justify-between gap-2"><h4 className="font-medium">{e.role} · {e.company}</h4><span className="text-xs text-gray-500">{e.period}</span></div>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">{e.bullets.map(b => <li key={b}>{b}</li>)}</ul>
            </article>
          ))}
        </motion.div>
        <motion.div initial={fadeInUp.initial} whileInView={fadeInUp.whileInView} transition={{ ...fadeInUp.transition, delay: 0.05 }} viewport={fadeInUp.viewport} className="space-y-4">
          <h3 className="font-semibold">Education</h3>
          {education.map(ed => (
            <article key={ed.degree} className="card p-5">
              <div className="flex items-center justify-between gap-2"><h4 className="font-medium">{ed.degree}</h4><span className="text-xs text-gray-500">{ed.period}</span></div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{ed.school}</p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
