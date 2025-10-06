import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from '@/routes'
import { MainLayout } from './layouts'

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes />
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
