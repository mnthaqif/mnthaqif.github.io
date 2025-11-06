import jsPDF from 'jspdf';
import { resumeData } from '../data/resumeData';

export const generatePDF = () => {
  const pdf = new jsPDF();
  const { personal, about, skills, experience, education, projects } = resumeData;
  
  // Set font
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

  const addSpace = (space = 5) => {
    yPosition += space;
  };

  const addLine = () => {
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;
  };

  // Header
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text(personal.name, margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text(personal.title, margin, yPosition);
  yPosition += 8;

  pdf.setFontSize(10);
  pdf.text(`${personal.email} | ${personal.phone} | ${personal.location}`, margin, yPosition);
  yPosition += 6;
  pdf.text(`${personal.github} | ${personal.linkedin}`, margin, yPosition);
  yPosition += 10;

  addLine();

  // About
  addText('ABOUT', 14, true);
  addSpace(2);
  addText(about.summary);
  addSpace(5);

  // Skills
  addLine();
  addText('SKILLS', 14, true);
  addSpace(2);
  
  addText('Languages: ' + skills.languages.join(', '), 10, false);
  addText('Frontend: ' + skills.frontend.join(', '), 10, false);
  addText('Backend: ' + skills.backend.join(', '), 10, false);
  addText('Databases: ' + skills.databases.join(', '), 10, false);
  addText('DevOps: ' + skills.devops.join(', '), 10, false);
  addText('Tools: ' + skills.tools.join(', '), 10, false);
  addSpace(5);

  // Experience
  addLine();
  addText('WORK EXPERIENCE', 14, true);
  addSpace(2);
  
  experience.forEach((exp, index) => {
    addText(`${exp.position} - ${exp.company}`, 11, true);
    addText(`${exp.startDate} - ${exp.endDate} | ${exp.location}`, 9, false);
    addSpace(2);
    exp.description.forEach(item => {
      addText('• ' + item, 10, false);
    });
    if (index < experience.length - 1) addSpace(5);
  });
  addSpace(5);

  // Education
  addLine();
  addText('EDUCATION', 14, true);
  addSpace(2);
  
  education.forEach(edu => {
    addText(`${edu.degree}`, 11, true);
    addText(`${edu.institution} | ${edu.startDate} - ${edu.endDate}`, 10, false);
    if (edu.gpa) addText(`GPA: ${edu.gpa}`, 9, false);
    if (edu.achievements) {
      addSpace(2);
      edu.achievements.forEach(achievement => {
        addText('• ' + achievement, 10, false);
      });
    }
  });
  addSpace(5);

  // Projects
  addLine();
  addText('FEATURED PROJECTS', 14, true);
  addSpace(2);
  
  projects.forEach((project, index) => {
    addText(project.name, 11, true);
    addText(project.description, 10, false);
    addText('Technologies: ' + project.technologies.join(', '), 9, false);
    addSpace(2);
    project.highlights.forEach(highlight => {
      addText('• ' + highlight, 10, false);
    });
    if (index < projects.length - 1) addSpace(5);
  });

  // Save PDF
  pdf.save(`${personal.name.replace(/\s+/g, '_')}_Resume.pdf`);
};
