import ThemeToggle from './ThemeToggle'
export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-gray-950/60 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <nav className="container-px max-w-5xl mx-auto h-14 flex items-center justify-between">
        <a href="#hero" className="font-semibold tracking-tight">Thaqif Rajab</a>
        <div className="flex items-center gap-2">
          <a href="#projects" className="btn btn-ghost text-sm">Projects</a>
          <a href="#contact" className="btn btn-primary text-sm">Contact</a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
