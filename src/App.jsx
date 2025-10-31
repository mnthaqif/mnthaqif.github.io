import { usePDF } from 'react-to-pdf'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import ResumePDF from './components/ResumePDF'
function App() {
  const { toPDF, targetRef } = usePDF({ filename: 'Thaqif_Rajab_Resume.pdf' })
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact onDownload={toPDF} />
      </main>
      <ResumePDF ref={targetRef} />
    </>
  )
}
export default App
