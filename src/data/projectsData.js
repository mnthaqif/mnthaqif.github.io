/**
 * Hardcoded project data for the Projects section
 * Add your private repository details here
 * 
 * Each project should have:
 * - id: unique identifier
 * - name: project name (will be formatted for display)
 * - description: project description
 * - languages: array of programming languages used
 * - topics: array of topics/tags (optional)
 * - updated_at: last update date (ISO format)
 * - isPrivate: whether the project is private
 */
export const projectsData = [
  {
    id: 1,
    name: "mnthaqif.github.io",
    description: "Personal portfolio website showcasing projects and skills. Built with React.js and Tailwind CSS with modern UI/UX design.",
    languages: ["JavaScript", "CSS", "HTML"],
    topics: ["portfolio", "react", "tailwindcss"],
    updated_at: "2025-11-26T07:07:13Z",
    isPrivate: false,
  },
  {
    id: 2,
    name: "nextjs-tailwind-template",
    description: "A modern Next.js starter template with Tailwind CSS, TypeScript, and best practices for building scalable web applications.",
    languages: ["TypeScript", "JavaScript", "CSS"],
    topics: ["nextjs", "tailwindcss", "template"],
    updated_at: "2025-11-25T06:26:22Z",
    isPrivate: false,
  },
  // Add more private projects below
  // Example:
  // {
  //   id: 3,
  //   name: "my-private-project",
  //   description: "Description of your private project",
  //   languages: ["TypeScript", "React"],
  //   topics: ["api", "backend"],
  //   updated_at: "2024-06-15T10:30:00Z",
  //   isPrivate: true,
  // },
];
