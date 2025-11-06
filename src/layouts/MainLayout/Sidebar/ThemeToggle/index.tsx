import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'
import { THEME_TYPE } from '@/constant'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore()

  const isLightTheme = theme === THEME_TYPE.LIGHT

  return (
    <button
      className="flex items-center gap-3 w-full h-9 px-2.5 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      {isLightTheme ? (
        <>
          <Moon className="w-5 h-5 text-foreground" />
          <span className="text-sm font-medium text-foreground">Dark</span>
        </>
      ) : (
        <>
          <Sun className="w-5 h-5 text-foreground" />
          <span className="text-sm font-medium text-foreground">Light</span>
        </>
      )}
    </button>
  )
}
