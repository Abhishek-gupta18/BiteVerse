import { StrictMode } from 'react'
import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import './globals.css'
import App from './App.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Dashboard from './Dashboard.jsx'
import Chat from './components/sections/chat'

function ButtonClickFeedback() {
  useEffect(() => {
    const timers = new Map()

    const handleButtonClick = (event) => {
      if (!(event.target instanceof Element)) {
        return
      }

      const button = event.target.closest('button')
      if (!button || button.disabled) {
        return
      }

      const existingTimer = timers.get(button)
      if (existingTimer) {
        window.clearTimeout(existingTimer)
      }

      button.classList.remove('button-click-loading')
      void button.offsetWidth
      button.classList.add('button-click-loading')

      const timeoutId = window.setTimeout(() => {
        button.classList.remove('button-click-loading')
        timers.delete(button)
      }, 550)

      timers.set(button, timeoutId)
    }

    document.addEventListener('click', handleButtonClick, true)

    return () => {
      document.removeEventListener('click', handleButtonClick, true)
      timers.forEach((timeoutId) => {
        window.clearTimeout(timeoutId)
      })
    }
  }, [])

  return null
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ButtonClickFeedback />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard userRole="student" />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
