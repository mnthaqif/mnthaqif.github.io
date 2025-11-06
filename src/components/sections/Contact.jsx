import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { resumeData } from '../../data/resumeData';
import { generatePDF } from '../../utils/pdfGenerator';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { personal } = resumeData;

  const handleDownloadPDF = () => {
    generatePDF();
  };

  return (
    <section id="contact" className="section-padding bg-white dark:bg-gray-900" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>
        
        <motion.p
          className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          I'm always open to new opportunities and collaborations. Feel free to reach out!
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href={`mailto:${personal.email}`}
            className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
          >
            Send Email
          </a>
          <button
            onClick={handleDownloadPDF}
            className="px-8 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume PDF
          </button>
        </motion.div>
        
        <motion.div
          className="grid md:grid-cols-3 gap-6 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Email</h3>
            <p className="text-gray-600 dark:text-gray-400">{personal.email}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Phone</h3>
            <p className="text-gray-600 dark:text-gray-400">{personal.phone}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Location</h3>
            <p className="text-gray-600 dark:text-gray-400">{personal.location}</p>
          </div>
        </motion.div>
      </div>
      
      <motion.footer
        className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <p>&copy; {new Date().getFullYear()} {personal.name}. All rights reserved.</p>
      </motion.footer>
    </section>
  );
};

export default Contact;
