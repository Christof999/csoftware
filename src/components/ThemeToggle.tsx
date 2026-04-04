import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../theme/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gallery-line bg-gallery-elevated text-gallery-ink transition hover:border-shell-muted"
      aria-label={theme === 'light' ? 'Dunkles Design aktivieren' : 'Helles Design aktivieren'}
      title={theme === 'light' ? 'Dunkelmodus' : 'Hellmodus'}
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      ) : (
        <Sun className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      )}
    </button>
  )
}
