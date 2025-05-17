import { useState, useEffect, createContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, clearUser } from './store/userSlice'

// Protected Route component
import ProtectedRoute from './components/ProtectedRoute'
import { getIcon } from './utils/iconUtils.js'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import Students from './pages/Students.jsx'
import Courses from './pages/Courses.jsx'
import Analytics from './pages/Analytics.jsx'
import Schedule from './pages/Schedule.jsx'
import Attendance from './pages/Attendance.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Callback from './pages/Callback.jsx'
import ErrorPage from './pages/ErrorPage.jsx'

// Create auth context
export const AuthContext = createContext(null);

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  // Get authentication status with proper error handling
  const userState = useSelector((state) => state.user);
  const isAuthenticated = userState?.isAuthenticated || false;

  // Initialize ApperUI once when the app loads
  useEffect(() => {
    const { ApperClient, ApperUI } = window.ApperSDK;
    const client = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    // Initialize but don't show login yet
    ApperUI.setup(client, {
      target: '#authentication',
      clientId: import.meta.env.VITE_APPER_PROJECT_ID,
      view: 'both',
      onSuccess: function (user) {
        setIsInitialized(true);
        // CRITICAL: This exact currentPath logic must be preserved in all implementations
        // DO NOT simplify or modify this pattern as it ensures proper redirection flow
        let currentPath = window.location.pathname + window.location.search;
        let redirectPath = new URLSearchParams(window.location.search).get('redirect');
        const isAuthPage = currentPath.includes('/login') || currentPath.includes('/signup') || currentPath.includes(
            '/callback') || currentPath.includes('/error');
        if (user) {
            // User is authenticated
            if (redirectPath) {
                navigate(redirectPath);
            } else if (!isAuthPage) {
                if (!currentPath.includes('/login') && !currentPath.includes('/signup')) {
                    navigate(currentPath);
                } else {
                    navigate('/');
                }
            } else {
                navigate('/');
            }
            // Store user information in Redux
            dispatch(setUser(JSON.parse(JSON.stringify(user))));
        } else {
            // User is not authenticated
            if (!isAuthPage) {
                navigate(
                    currentPath.includes('/signup')
                     ? `/signup?redirect=${currentPath}`
                     : currentPath.includes('/login')
                     ? `/login?redirect=${currentPath}`
                     : '/login');
            } else if (redirectPath) {
                if (
                    ![
                        'error',
                        'signup',
                        'login',
                        'callback'
                    ].some((path) => currentPath.includes(path)))
                    navigate(`/login?redirect=${redirectPath}`);
                else {
                    navigate(currentPath);
                }
            } else if (isAuthPage) {
                navigate(currentPath);
            } else {
                navigate('/login');
            }
            dispatch(clearUser());
        }
      },
      onError: function(error) {
        console.error("Authentication failed:", error);
      }
    });
  }, [dispatch, navigate]);
  
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
  
  // Authentication methods to share via context
  const authMethods = {
    isInitialized,
    logout: async () => {
      try {
        const { ApperUI } = window.ApperSDK;
        await ApperUI.logout();
        dispatch(clearUser());
        navigate('/login');
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };
  
  // Don't render routes until initialization is complete
  if (!isInitialized) {
    return <div className="loading flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      <div className="ml-4 text-xl">Initializing application...</div>
    </div>;
  }
  
  return (
    <AnimatePresence mode="wait">
      <AuthContext.Provider value={authMethods}>
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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/error" element={<ErrorPage />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } />
            <Route path="/students" element={
              <ProtectedRoute>
                <Students />
              </ProtectedRoute>
            } />
            <Route path="/courses" element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            } />
            <Route path="/schedule" element={
              <ProtectedRoute>
                <Schedule />
              </ProtectedRoute>
            } />
            <Route path="/attendance" element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            } />
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
          <div id="authentication" style={{display: 'none'}} />
        </div>
      </AuthContext.Provider>
    </AnimatePresence>
  )
}

export default App