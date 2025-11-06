import './App.css'
import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { useThemeStore } from '@/store/themeStore'
import { Routes } from '@/routes'
import { MainLayout } from './layouts'

function App() {
  const { theme, setTheme } = useThemeStore()

  useEffect(() => {
    setTheme(theme)
  }, [setTheme, theme])

  return (
    <BrowserRouter>
      <HelmetProvider>
        <MainLayout>
          <Routes />
        </MainLayout>
      </HelmetProvider>
    </BrowserRouter>
  )
}

export default App
