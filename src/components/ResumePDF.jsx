import React, { forwardRef } from 'react'
const ResumePDF = forwardRef(function ResumePDF(_, ref) {
  return (
    <div ref={ref} className="absolute -left-[10000px] top-0 w-[794px] bg-white text-black" style={{ padding: '32px', lineHeight: 1.5, fontSize: '12px' }}>
      <header>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>Thaqif Rajab</h1>
        <div style={{ fontSize: '12px', color: '#374151' }}>Johor · thaqif_rajab@yahoo.com · mnthaqif.github.io · github.com/mnthaqif</div>
      </header>
      <section style={{ marginTop: '16px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 700, borderBottom: '1px solid #e5e7eb', paddingBottom: '4px' }}>Summary</h2>
        <p style={{ marginTop: '8px' }}>Fullstack developer specializing in React, TypeScript, Node.js, and UI/UX. Passionate about performant, accessible products and robust design systems.</p>
      </section>
      <section style={{ marginTop: '16px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 700, borderBottom: '1px solid #e5e7eb', paddingBottom: '4px' }}>Skills</h2>
        <ul style={{ marginTop: '8px' }}>
          <li><strong>Frontend:</strong> React, TypeScript, Tailwind CSS, Framer Motion</li>
          <li><strong>Backend:</strong> Node.js, Express, REST, PostgreSQL, MongoDB</li>
          <li><strong>Tools:</strong> GitHub Actions, Jest, Playwright, Figma</li>
        </ul>
      </section>
      <section style={{ marginTop: '16px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 700, borderBottom: '1px solid #e5e7eb', paddingBottom: '4px' }}>Experience</h2>
        <article style={{ marginTop: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}><strong>Senior Fullstack Developer · Company A</strong><span>2022 — Present</span></div>
          <ul style={{ marginTop: '6px', paddingLeft: '18px' }}>
            <li>Led design system; improved delivery speed by 40%.</li>
            <li>Architected React/Node platform serving 1M+ monthly users.</li>
          </ul>
        </article>
        <article style={{ marginTop: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}><strong>Frontend Engineer · Company B</strong><span>2020 — 2022</span></div>
          <ul style={{ marginTop: '6px', paddingLeft: '18px' }}>
            <li>Built accessible UI components with zero a11y regressions.</li>
            <li>Optimized performance; reduced LCP by 35%.</li>
          </ul>
        </article>
      </section>
      <section style={{ marginTop: '16px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 700, borderBottom: '1px solid #e5e7eb', paddingBottom: '4px' }}>Projects</h2>
        <ul style={{ marginTop: '8px', paddingLeft: '18px' }}>
          <li><strong>Project One</strong> — React, Node, Tailwind.</li>
          <li><strong>Project Two</strong> — TypeScript, Express, Postgres.</li>
        </ul>
      </section>
      <section style={{ marginTop: '16px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 700, borderBottom: '1px solid #e5e7eb', paddingBottom: '4px' }}>Education</h2>
        <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', gap: '8px' }}><strong>B.Sc. in Computer Science · University Name</strong><span>2016 — 2020</span></div>
      </section>
    </div>
  )
})
export default ResumePDF
