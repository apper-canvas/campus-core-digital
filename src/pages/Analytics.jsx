import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getIcon } from '../utils/iconUtils.js'
import GradeDistributionChart from '../components/charts/GradeDistributionChart.jsx'
import CoursePerformanceChart from '../components/charts/CoursePerformanceChart.jsx'
import StudentProgressionChart from '../components/charts/StudentProgressionChart.jsx'
import ReportGenerator from '../components/ReportGenerator.jsx'

const Analytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('semester')
  const [showReportGenerator, setShowReportGenerator] = useState(false)
  
  // Icons
  const GraduationCapIcon = getIcon('GraduationCap')
  const LineChartIcon = getIcon('LineChart')
  const TrendingUpIcon = getIcon('TrendingUp')
  const PercentIcon = getIcon('Percent')
  const AwardIcon = getIcon('Award')
  const DownloadIcon = getIcon('Download')
  const ClipboardIcon = getIcon('Clipboard')
  const UsersIcon = getIcon('Users')
  const BellIcon = getIcon('Bell')
  const UserCircleIcon = getIcon('UserCircle')
  const ArrowLeftIcon = getIcon('ArrowLeft')
  
  const handleExportData = () => {
    toast.success("Analytics data exported successfully")
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
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary transition-colors">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center">
                <LineChartIcon className="w-7 h-7 mr-3 text-primary" />
                Student Performance Analytics
              </h1>
              <p className="text-surface-600 dark:text-surface-400 mt-1">
                Comprehensive insights into student academic performance
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={handleExportData}
                className="btn btn-outline"
              >
                <DownloadIcon className="w-4 h-4 mr-2" />
                Export Data
              </button>
              
              <button 
                onClick={() => setShowReportGenerator(true)}
                className="btn btn-primary"
              >
                <ClipboardIcon className="w-4 h-4 mr-2" />
                Generate Report
              </button>
            </div>
          </div>
          
          {/* Time Range Selection */}
          <div className="flex mb-6 border-b border-surface-200 dark:border-surface-700">
            {['semester', 'year', 'all'].map((timeframe) => (
              <button
                key={timeframe}
                className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                  selectedTimeframe === timeframe 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-300'
                }`}
                onClick={() => setSelectedTimeframe(timeframe)}
              >
                {timeframe === 'semester' ? 'Current Semester' : 
                 timeframe === 'year' ? 'Academic Year' : 'All Time'}
              </button>
            ))}
          </div>
          
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { 
                label: 'Average GPA', 
                value: '3.42', 
                change: '+0.08', 
                icon: AwardIcon, 
                color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
                trend: 'up'
              },
              { 
                label: 'Pass Rate', 
                value: '94.2%', 
                change: '+2.1%', 
                icon: PercentIcon, 
                color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
                trend: 'up'
              },
              { 
                label: 'Retention Rate', 
                value: '88.7%', 
                change: '-1.3%', 
                icon: UsersIcon, 
                color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
                trend: 'down'
              },
              { 
                label: 'Course Completion', 
                value: '92.5%', 
                change: '+3.8%', 
                icon: TrendingUpIcon, 
                color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
                trend: 'up'
              }
            ].map((metric, index) => {
              const MetricIcon = metric.icon
              return (
                <div key={index} className="card flex items-center p-5 hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 rounded-lg ${metric.color} flex items-center justify-center mr-4`}>
                    <MetricIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-surface-500 dark:text-surface-400 text-sm font-medium">{metric.label}</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold mr-2">{metric.value}</p>
                      <span className={`text-xs font-medium ${
                        metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Grade Distribution Chart */}
            <GradeDistributionChart timeframe={selectedTimeframe} />
            
            {/* Course Performance Chart */}
            <CoursePerformanceChart timeframe={selectedTimeframe} />
          </div>
          
          {/* Student Progression Chart */}
          <StudentProgressionChart timeframe={selectedTimeframe} />
          
          {/* Report Generator Modal */}
          {showReportGenerator && (
            <ReportGenerator 
              onClose={() => setShowReportGenerator(false)} 
            />
          )}
        </main>
      </div>
    </motion.div>
  )
}

export default Analytics