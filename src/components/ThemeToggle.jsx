import { useEffect, useState } from 'react'
import { useTheme } from '../hooks/useTheme'
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  const next = theme === 'light' ? 'dark' : 'light'
  const label = theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
  return (
    <button className="btn btn-ghost" onClick={() => setTheme(next)} aria-label={label} title={label}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
