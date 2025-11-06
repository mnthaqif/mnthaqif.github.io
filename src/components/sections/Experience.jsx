import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { resumeData } from '../../data/resumeData';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { experience, education } = resumeData;

  return (
    <section id="experience" className="section-padding bg-gray-50 dark:bg-gray-800" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Experience & Education
        </motion.h2>
        
        {/* Experience */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-primary-600 dark:text-primary-400">
            Work Experience
          </h3>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-primary-500"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {exp.position}
                    </h4>
                    <p className="text-lg text-primary-600 dark:text-primary-400">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm mt-2 md:mt-0 md:text-right">
                    <p>{exp.startDate} - {exp.endDate}</p>
                    <p>{exp.location}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Education */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-primary-600 dark:text-primary-400">
            Education
          </h3>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-primary-500"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h4>
                    <p className="text-lg text-primary-600 dark:text-primary-400">
                      {edu.institution}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm mt-2 md:mt-0 md:text-right">
                    <p>{edu.startDate} - {edu.endDate}</p>
                    <p>{edu.location}</p>
                  </div>
                </div>
                {edu.achievements && (
                  <ul className="space-y-2 mt-4">
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                        <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
