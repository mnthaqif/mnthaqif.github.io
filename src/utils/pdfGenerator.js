import jsPDF from 'jspdf';
import { resumeData } from '../data/resumeData';

export const generatePDF = () => {
  const pdf = new jsPDF();
  const { personal, about, skills, experience, education, projects } = resumeData;
  
  // Set font - Helvetica is ATS-friendly
  pdf.setFont('helvetica');
  
  let yPosition = 20;
  const lineHeight = 7;
  const margin = 20;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const maxWidth = pageWidth - 2 * margin;

  // Helper function to add text with word wrap
  const addText = (text, fontSize = 10, isBold = false) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    const lines = pdf.splitTextToSize(text, maxWidth);
    lines.forEach(line => {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
  };

  const addSpace = (space = 6) => {
    yPosition += space;
  };

  const addLine = () => {
    yPosition += 3;
    pdf.setDrawColor(100, 100, 100);
    pdf.setLineWidth(0.3);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;
  };

  // Header - Name and Contact Information (ATS Priority)
  pdf.setFontSize(22);
  pdf.setFont('helvetica', 'bold');
  pdf.text(personal.name.toUpperCase(), margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(13);
  pdf.setFont('helvetica', 'bold');
  pdf.text(personal.title, margin, yPosition);
  yPosition += 8;

  // Contact information - all on separate lines for better ATS parsing
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Email: ${personal.email}`, margin, yPosition);
  yPosition += 6;
  pdf.text(`Phone: ${personal.phone}`, margin, yPosition);
  yPosition += 6;
  pdf.text(`Location: ${personal.location}`, margin, yPosition);
  yPosition += 6;
  pdf.text(`LinkedIn: ${personal.linkedin}`, margin, yPosition);
  yPosition += 6;
  pdf.text(`GitHub: ${personal.github}`, margin, yPosition);
  yPosition += 6;
  if (personal.gitlab) {
    pdf.text(`GitLab: ${personal.gitlab}`, margin, yPosition);
    yPosition += 6;
  }
  if (personal.website) {
    pdf.text(`Website: ${personal.website}`, margin, yPosition);
    yPosition += 6;
  }
  yPosition += 2;

  addLine();

  // Professional Summary (ATS Priority - use "PROFESSIONAL SUMMARY" heading)
  addText('PROFESSIONAL SUMMARY', 13, true);
  addSpace(3);
  addText(about.summary, 10, false);
  addSpace(6);

  // Skills Section (ATS Priority - placed early in resume)
  addLine();
  addText('TECHNICAL SKILLS', 13, true);
  addSpace(3);
  
  // Use standard category labels for ATS parsing
  addText('Programming Languages: ' + skills.languages.join(', '), 10, false);
  addSpace(2);
  addText('Frontend Technologies: ' + skills.frontend.join(', '), 10, false);
  addSpace(2);
  addText('Backend Technologies: ' + skills.backend.join(', '), 10, false);
  addSpace(2);
  addText('Databases: ' + skills.databases.join(', '), 10, false);
  addSpace(2);
  addText('DevOps & CI/CD: ' + skills.devops.join(', '), 10, false);
  addSpace(2);
  addText('Tools & Platforms: ' + skills.tools.join(', '), 10, false);
  addSpace(6);

  // Professional Experience (ATS Priority)
  addLine();
  addText('PROFESSIONAL EXPERIENCE', 13, true);
  addSpace(3);
  
  experience.forEach((exp, index) => {
    // Job title and company on separate lines for better ATS parsing
    addText(exp.position, 11, true);
    addSpace(2);
    addText(`${exp.company}, ${exp.location}`, 10, false);
    addSpace(1);
    addText(`${exp.startDate} - ${exp.endDate}`, 10, false);
    addSpace(3);
    // Use standard bullet point (hyphen) which is ATS-friendly
    exp.description.forEach(item => {
      addText('- ' + item, 10, false);
      addSpace(1);
    });
    if (index < experience.length - 1) addSpace(5);
  });
  addSpace(6);

  // Education
  addLine();
  addText('EDUCATION', 13, true);
  addSpace(3);
  
  education.forEach((edu, index) => {
    addText(edu.degree, 11, true);
    addSpace(2);
    addText(edu.institution, 10, false);
    addSpace(1);
    addText(`${edu.startDate} - ${edu.endDate}`, 10, false);
    if (edu.location) {
      addSpace(1);
      addText(edu.location, 10, false);
    }
    if (edu.gpa) {
      addSpace(1);
      addText(`GPA: ${edu.gpa}`, 10, false);
    }
    if (edu.achievements && edu.achievements.length > 0) {
      addSpace(3);
      edu.achievements.forEach(achievement => {
        addText('- ' + achievement, 10, false);
        addSpace(1);
      });
    }
    if (index < education.length - 1) addSpace(5);
  });
  addSpace(6);

  // Projects
  addLine();
  addText('PROJECTS', 13, true);
  addSpace(3);
  
  projects.forEach((project, index) => {
    addText(project.name, 11, true);
    addSpace(2);
    addText(project.description, 10, false);
    addSpace(2);
    addText('Technologies: ' + project.technologies.join(', '), 10, false);
    addSpace(3);
    project.highlights.forEach(highlight => {
      addText('- ' + highlight, 10, false);
      addSpace(1);
    });
    if (index < projects.length - 1) addSpace(5);
  });

  // Save PDF with ATS-friendly filename (no special characters)
  const filename = personal.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
  pdf.save(`${filename}_Resume.pdf`);
};
