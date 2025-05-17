import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import { getIcon } from './utils/iconUtils.js'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import Students from './pages/Students.jsx'
import Courses from './pages/Courses.jsx'
import Analytics from './pages/Analytics.jsx'
import Schedule from './pages/Schedule.jsx'
import Attendance from './pages/Attendance.jsx'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode) {
      setIsDarkMode(savedMode === 'true')
    }
    
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev
      localStorage.setItem('darkMode', newValue.toString())
      document.documentElement.classList.toggle('dark', newValue)
      return newValue
    })
  }
  
  // Get appropriate icon for dark mode toggle
  const MoonIcon = getIcon('Moon')
  const SunIcon = getIcon('Sun')
  
  return (
    <AnimatePresence mode="wait">
      <div className="relative min-h-screen">
        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleDarkMode}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full 
                     bg-surface-200 dark:bg-surface-700 shadow-md hover:shadow-lg
                     transition-all duration-300 ease-in-out"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? 
            <SunIcon className="w-5 h-5 text-yellow-400" /> : 
            <MoonIcon className="w-5 h-5 text-surface-700" />
          }
        </button>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={isDarkMode ? "dark" : "light"}
          className="mt-16 md:mt-20"
        />
      </div>
    </AnimatePresence>
  )
}

export default App