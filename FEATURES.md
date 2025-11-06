# Features & Implementation Details

## ✨ Core Features

### 1. Hero Section
- Circular profile photo with shadow and border
- Large gradient text for name
- Professional title display
- Location information
- Social media links (GitHub, LinkedIn, Email)
- Smooth fade-in animations

### 2. About Me Section
- Professional summary
- Key highlights with checkmark icons
- Responsive grid layout
- Fade-in animations on scroll

### 3. Skills & Technologies
- Organized by category (Languages, Frontend, Backend, Databases, DevOps, Tools)
- Pill-style skill tags
- Color-coded categories
- Responsive grid (1-3 columns based on screen size)
- Staggered animations

### 4. Featured Projects
- Project cards with hover effects
- Technology tags
- Project highlights with bullet points
- External links to GitHub repositories
- Responsive 3-column grid

### 5. Experience & Education
- Timeline-style layout
- Company/Institution names with dates
- Location information
- Detailed bullet points for responsibilities/achievements
- Left border accent for visual hierarchy

### 6. Contact Section
- Email button (opens default email client)
- PDF download button
- Contact information cards (Email, Phone, Location)
- Footer with copyright

## 🎨 Design Features

### Dark/Light Mode
- Toggle button in top-right corner
- Smooth color transitions (300ms)
- Preference saved to localStorage
- Respects system preference on first visit
- Sun/moon icons for visual feedback

### Animations (Framer Motion)
- **Hero Section**: Fade-in with upward motion
- **Section Headings**: Fade-in when scrolling into view
- **Content Cards**: Staggered fade-in animations
- **Interactive Elements**: Scale on hover, tap feedback
- **Project Cards**: Lift effect on hover (-5px translation)

### Color Scheme
- **Primary**: Blue gradient (#0ea5e9 to #0284c7)
- **Light Mode**: White background, gray text
- **Dark Mode**: Dark gray background (#1f2937, #111827), light text
- **Accents**: Primary blue for headings and CTAs

### Typography
- **Font Family**: Inter (imported from Google Fonts)
- **Heading Sizes**: 
  - H1: 5xl-7xl (responsive)
  - H2: 4xl-5xl (responsive)
  - H3: xl-2xl
  - Body: base-xl (responsive)

## 📄 PDF Export

### ATS-Friendly Features
- Single-column layout
- No graphics or animations in PDF
- Web-safe fonts (Helvetica)
- Proper text hierarchy
- Clean section separation with lines
- Contact info at the top
- Bullet points for lists
- Text wrapping for long content
- Multi-page support with auto pagination

### PDF Sections (in order)
1. Header (Name, Title, Contact Info)
2. About
3. Skills (by category)
4. Work Experience
5. Education
6. Featured Projects

### PDF Generation
- Uses jsPDF library
- File name: `{Name}_Resume.pdf`
- A4 size
- 20px margins
- 7px line height
- Automatic page breaks

## 📱 Responsive Design

### Breakpoints (Tailwind)
- **Mobile**: Default (< 768px)
- **Tablet**: md (768px+)
- **Desktop**: lg (1024px+)
- **Large Desktop**: xl (1280px+)

### Responsive Features
- Flexible grid layouts
- Stack vertically on mobile
- Larger touch targets on mobile
- Optimized font sizes
- Responsive padding and spacing

## ⚡ Performance

### Optimization
- Vite for fast builds and HMR
- Code splitting
- Minified CSS and JS
- Optimized images (using SVGs and external CDN)
- Lazy loading for animations (Framer Motion)

### Build Output
- Gzipped CSS: ~3.31 kB
- Gzipped JS: ~231.92 kB (main bundle)
- Total initial load: < 300 kB gzipped

## 🛠️ Development Features

### Code Quality
- ESLint configured with React rules
- Consistent code formatting
- Component-based architecture
- Modular file structure
- Separation of concerns (data, UI, logic)

### Customization
- Single data file (`resumeData.js`) for easy content updates
- Theme colors in `tailwind.config.js`
- Component-level customization
- Easy to add/remove sections

## 🚀 Deployment

### GitHub Pages
- Automatic deployment via GitHub Actions
- Builds on push to main
- Deploys to `https://<username>.github.io`
- Manual deployment option via `npm run deploy`

### Workflow Features
- Node.js 20
- Dependency caching
- Automated builds
- Pages artifact upload
- Deployment status tracking

## 🔒 Security

- No security vulnerabilities (CodeQL checked)
- No sensitive data in code
- External links use `rel="noopener noreferrer"`
- HTTPS enforced on GitHub Pages
