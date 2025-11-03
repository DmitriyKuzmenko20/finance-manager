import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Routes } from '@/routes'
import { MainLayout } from './layouts'

function App() {
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
