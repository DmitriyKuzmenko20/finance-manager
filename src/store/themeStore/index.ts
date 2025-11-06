import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Theme } from './models'
import { THEME_TYPE } from '@/constant'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      setTheme: (theme) => {
        set({ theme })
        if (theme === THEME_TYPE.DARK) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },
      toggleTheme: () => {
        const newTheme = get().theme === THEME_TYPE.LIGHT ? THEME_TYPE.DARK : THEME_TYPE.LIGHT
        get().setTheme(newTheme)
      },
    }),
    {
      name: 'theme-storage',
    }
  )
)
