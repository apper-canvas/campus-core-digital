import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getIcon } from '../utils/iconUtils.js'
import MainFeature from '../components/MainFeature.jsx'

const Home = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showWelcome, setShowWelcome] = useState(true)
  
  // Icons
  const GraduationCapIcon = getIcon('GraduationCap')
  const BookOpenIcon = getIcon('BookOpen')
  const UsersIcon = getIcon('Users')
  const CalendarIcon = getIcon('Calendar')
  const ClipboardListIcon = getIcon('ClipboardList')
  const ChartBarIcon = getIcon('BarChart')
  const XIcon = getIcon('X')
  const PanelsTopLeftIcon = getIcon('PanelsTopLeft')
  const LineChartIcon = getIcon('LineChart')
  const BellIcon = getIcon('Bell')
  const UserCircleIcon = getIcon('UserCircle')
  
  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: PanelsTopLeftIcon },
    { id: 'courses', label: 'Courses', icon: BookOpenIcon },
    { id: 'students', label: 'Students', icon: UsersIcon },
    { id: 'schedule', label: 'Schedule', icon: CalendarIcon },
    { id: 'attendance', label: 'Attendance', icon: ClipboardListIcon },
    { id: 'analytics', label: 'Analytics', icon: LineChartIcon },
    { id: 'reports', label: 'Reports', icon: ChartBarIcon },
  ]
  
  const dismissWelcome = () => {
    setShowWelcome(false)
    toast.success("Welcome banner dismissed successfully")
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col"
    >
      {/* Header */}
      <header className="bg-white dark:bg-surface-800 shadow-sm border-b border-surface-200 dark:border-surface-700 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCapIcon className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold text-surface-800 dark:text-white">
              Campus<span className="text-primary">Core</span>
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700">
              <BellIcon className="w-5 h-5 text-surface-600 dark:text-surface-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-white">
                <UserCircleIcon className="w-6 h-6" />
              </div>
              <span className="hidden sm:block text-sm font-medium">Admin</span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}>
                  {item.id === 'students' ? (
                    <Link
                      to="/students"
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                                border-transparent text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ) : item.id === 'analytics' ? (
                    <Link
                      to="/analytics"
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                                border-transparent text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ) : item.id === 'courses' ? (
                    <Link
                      to="/courses" 
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                                border-transparent text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700"
                    >
                      <Icon className="w-5 h-5" /> 
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ) : item.id === 'schedule' ? (
                    <Link
                      to="/schedule"
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                                border-transparent text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700"
                    >
                      <Icon className="w-5 h-5" /> 
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ) : item.id === 'attendance' ? (
                    <Link
                      to="/attendance"
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                                border-transparent text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700"
                    >
                      <Icon className="w-5 h-5" /> 
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ) : (
                    <div onClick={() => setActiveTab(item.id)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${activeTab === item.id ? 'bg-primary text-white' : 'border-transparent text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'}`}><Icon className="w-5 h-5" /><span className="font-medium">{item.label}</span></div>
                  )}
                </button>
              )
            })}
          </nav>
        </aside>
        
        {/* Mobile Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700">
          <div className="grid grid-cols-6 h-16">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}>
                  {item.id === 'students' ? (
                    <Link
                      to="/students"
                      className="flex flex-col items-center justify-center space-y-1
                                text-surface-600 dark:text-surface-400"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{item.label}</span>
                    </Link>
                  ) : item.id === 'analytics' ? (
                    <Link
                      to="/analytics"
                      className="flex flex-col items-center justify-center space-y-1
                                text-surface-600 dark:text-surface-400"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{item.label}</span>
                    </Link>
                  ) : item.id === 'courses' ? (
                    <Link
                      to="/courses"
                      className="flex flex-col items-center justify-center space-y-1 
                                text-surface-600 dark:text-surface-400"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{item.label}</span>
                    </Link>
                  ) : item.id === 'schedule' ? (
                    <Link
                      to="/schedule"
                      className="flex flex-col items-center justify-center space-y-1
                                text-surface-600 dark:text-surface-400"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{item.label}</span>
                    </Link>
                  ) : item.id === 'attendance' ? (
                    <Link
                      to="/attendance"
                      className="flex flex-col items-center justify-center space-y-1
                                text-surface-600 dark:text-surface-400"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{item.label}</span>
                    </Link>
                  ) : (
                    <div 
                      className={`flex flex-col items-center justify-center space-y-1 cursor-pointer ${activeTab === item.id ? 'text-primary font-medium' : 'text-surface-600 dark:text-surface-400'}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{item.label}</span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
          {/* Welcome Message */}
          {showWelcome && (
            <div className="mb-6 bg-gradient-to-r from-primary-light to-primary rounded-lg p-4 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2">
                <button 
                  onClick={dismissWelcome}
                  className="text-white/80 hover:text-white"
                  aria-label="Dismiss welcome message"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-start space-x-4">
                <GraduationCapIcon className="w-10 h-10 mt-1" />
                <div>
                  <h2 className="font-bold text-xl mb-1">Welcome to CampusCore</h2>
                  <p className="text-white/90">
                    Your comprehensive college management system. Explore the dashboard to access all features.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {activeTab === 'dashboard' ? 'Dashboard' : 
               activeTab === 'courses' ? 'Course Management' :
               activeTab === 'students' ? 'Student Directory' :
               activeTab === 'schedule' ? 'Class Schedule' :
               activeTab === 'attendance' ? 'Attendance Tracker' :
               'Reports & Analytics'}
            </h1>
            <p className="text-surface-600 dark:text-surface-400">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Students', value: '2,543', icon: UsersIcon, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' },
              { label: 'Active Courses', value: '128', icon: BookOpenIcon, color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
              { label: 'Faculty Members', value: '86', icon: GraduationCapIcon, color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' },
              { label: 'Departments', value: '12', icon: ClipboardListIcon, color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' }
            ].map((stat, index) => {
              const StatIcon = stat.icon
              return (
                <div key={index} className="card flex items-center p-5 hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mr-4`}>
                    <StatIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-surface-500 dark:text-surface-400 text-sm font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Main Feature */}
          <MainFeature />
        </main>
      </div>
    </motion.div>
  )
}

export default Home