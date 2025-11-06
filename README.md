# Muhammad Nathaqif - Portfolio Website

A professional, clean, and minimalist online resume built with React, Tailwind CSS, and Framer Motion. Features a dark/light mode toggle and ATS-friendly PDF download capability.

## 🚀 Features

- **Modern Tech Stack**: Built with React 19, Tailwind CSS 3, and Framer Motion
- **Responsive Design**: Fully responsive across all devices
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Smooth Animations**: Elegant fade-in and slide-up animations using Framer Motion
- **PDF Export**: Download resume as ATS-friendly PDF using jsPDF
- **Professional Sections**:
  - Hero (Photo, Name, Title)
  - About Me
  - Skills & Technologies
  - Featured Projects
  - Work Experience & Education
  - Contact Information

## 🛠️ Tech Stack

- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **PDF Generation**: jsPDF
- **Deployment**: GitHub Pages
- **Linting**: ESLint

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/mnthaqif/mnthaqif.github.io.git

# Navigate to project directory
cd mnthaqif.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 Development

```bash
# Start dev server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📤 Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Manual Deployment

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

### GitHub Actions

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys the site when you push to the `main` branch.

## 🎨 Customization

To customize this portfolio for yourself:

1. **Personal Data**: Edit `src/data/resumeData.js` with your information
2. **Colors**: Modify the color scheme in `tailwind.config.js`
3. **Sections**: Add/remove sections in `src/App.jsx`
4. **Components**: Customize individual section components in `src/components/sections/`

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

Muhammad Nathaqif - mnthaqif@example.com

Project Link: [https://mnthaqif.github.io](https://mnthaqif.github.io)
