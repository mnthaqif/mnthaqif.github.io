import jsPDF from 'jspdf';
import { resumeData } from '../data/resumeData';
import projectsData from '../data/projectsData.json';

export const generatePDF = () => {
  const pdf = new jsPDF();
  const { personal, about, skills, experience, education } = resumeData;
  
  // Set font - Helvetica is ATS-friendly
  pdf.setFont('helvetica');
  
  let yPosition = 20;
  const lineHeight = 6;  // Reduced for better density
  const margin = 20;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const maxWidth = pageWidth - 2 * margin;

  // Helper function to add text with word wrap and improved alignment
  const addText = (text, fontSize = 10, isBold = false) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    const lines = pdf.splitTextToSize(text, maxWidth);
    lines.forEach((line, index) => {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }
      pdf.text(line, margin, yPosition);
      // Use consistent line height
      yPosition += (index < lines.length - 1) ? lineHeight : lineHeight;
    });
  };

  const addSpace = (space = 5) => {  // Reduced default spacing
    yPosition += space;
  };

  const addLine = () => {
    yPosition += 2;  // Reduced spacing before line
    pdf.setDrawColor(100, 100, 100);
    pdf.setLineWidth(0.3);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 4;  // Reduced spacing after line
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

  // Contact information - all on separate lines for better ATS parsing with improved alignment
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const contactLineHeight = 5;
  pdf.text(`Email: ${personal.email}`, margin, yPosition);
  yPosition += contactLineHeight;
  pdf.text(`Phone: ${personal.phone}`, margin, yPosition);
  yPosition += contactLineHeight;
  pdf.text(`Location: ${personal.location}`, margin, yPosition);
  yPosition += contactLineHeight;
  pdf.text(`LinkedIn: ${personal.linkedin}`, margin, yPosition);
  yPosition += contactLineHeight;
  pdf.text(`GitHub: ${personal.github}`, margin, yPosition);
  yPosition += contactLineHeight;
  if (personal.gitlab) {
    pdf.text(`GitLab: ${personal.gitlab}`, margin, yPosition);
    yPosition += contactLineHeight;
  }
  if (personal.website) {
    pdf.text(`Website: ${personal.website}`, margin, yPosition);
    yPosition += contactLineHeight;
  }
  yPosition += 1;

  addLine();

  // Professional Summary (ATS Priority - use "PROFESSIONAL SUMMARY" heading) with improved alignment
  addText('PROFESSIONAL SUMMARY', 13, true);
  addSpace(2);
  addText(about.summary, 10, false);
  addSpace(4);

  // Skills Section (ATS Priority - placed early in resume) with improved alignment
  addLine();
  addText('TECHNICAL SKILLS', 13, true);
  addSpace(2);
  
  // Use standard category labels for ATS parsing with consistent spacing
  addText('Programming Languages: ' + skills.languages.join(', '), 10, false);
  addSpace(1);
  addText('Frontend Technologies: ' + skills.frontend.join(', '), 10, false);
  addSpace(1);
  addText('Backend Technologies: ' + skills.backend.join(', '), 10, false);
  addSpace(1);
  addText('Databases: ' + skills.databases.join(', '), 10, false);
  addSpace(1);
  addText('DevOps & CI/CD: ' + skills.devops.join(', '), 10, false);
  addSpace(1);
  addText('Tools & Platforms: ' + skills.tools.join(', '), 10, false);
  addSpace(4);

  // Professional Experience (ATS Priority) with improved alignment
  addLine();
  addText('PROFESSIONAL EXPERIENCE', 13, true);
  addSpace(2);
  
  experience.forEach((exp, index) => {
    // Job title and company on separate lines for better ATS parsing with consistent spacing
    addText(exp.position, 11, true);
    addSpace(1);
    addText(`${exp.company}, ${exp.location}`, 10, false);
    addSpace(1);
    addText(`${exp.startDate} - ${exp.endDate}`, 10, false);
    addSpace(2);
    // Use standard bullet point (hyphen) which is ATS-friendly
    exp.description.forEach((item, itemIndex) => {
      addText('- ' + item, 10, false);
      // Add minimal space between bullet points
      if (itemIndex < exp.description.length - 1) addSpace(0.5);
    });
    if (index < experience.length - 1) addSpace(4);
  });
  addSpace(4);

  // Education with improved alignment
  addLine();
  addText('EDUCATION', 13, true);
  addSpace(2);
  
  education.forEach((edu, index) => {
    addText(edu.degree, 11, true);
    addSpace(1);
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
      addSpace(2);
      edu.achievements.forEach((achievement, achievementIndex) => {
        addText('- ' + achievement, 10, false);
        if (achievementIndex < edu.achievements.length - 1) addSpace(0.5);
      });
    }
    if (index < education.length - 1) addSpace(4);
  });
  addSpace(4);

  // Projects - using data from projectsData.json with improved alignment
  addLine();
  addText('PROJECTS', 13, true);
  addSpace(2);
  
  // Transform projectsData.json format to match PDF requirements
  const projectsFromJson = projectsData.repos.map(repo => ({
    name: repo.name,
    description: repo.description,
    technologies: repo.languages || [],
    url: repo.html_url,
    topics: repo.topics || [],
    language: repo.language
  }));
  
  projectsFromJson.forEach((project, index) => {
    // Project name with better alignment
    addText(project.name, 11, true);
    addSpace(1);
    
    // Project description with consistent spacing
    addText(project.description, 10, false);
    addSpace(1);
    
    // Primary language
    if (project.language) {
      addText('Primary Language: ' + project.language, 10, false);
      addSpace(0.5);
    }
    
    // Technologies/Languages used
    if (project.technologies && project.technologies.length > 0) {
      addText('Technologies: ' + project.technologies.join(', '), 10, false);
      addSpace(0.5);
    }
    
    // Topics/Tags
    if (project.topics && project.topics.length > 0) {
      addText('Topics: ' + project.topics.join(', '), 10, false);
      addSpace(0.5);
    }
    
    // Project URL
    addText('URL: ' + project.url, 10, false);
    
    // Add consistent spacing between projects
    if (index < projectsFromJson.length - 1) addSpace(4);
  });

  // Save PDF with ATS-friendly filename (no special characters)
  const filename = personal.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
  pdf.save(`${filename}_Resume.pdf`);
};
