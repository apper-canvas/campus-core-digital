import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { BellIcon, UserCircleIcon, UsersIcon } from 'lucide-react'
import { getIcon } from '../utils/iconUtils.js'
import GradeDistributionChart from '../components/charts/GradeDistributionChart.jsx'
import CoursePerformanceChart from '../components/charts/CoursePerformanceChart.jsx'
import StudentProgressionChart from '../components/charts/StudentProgressionChart.jsx'
import { analyticsData, addAnalytics } from '../data/analyticsData'
import ReportGenerator from '../components/ReportGenerator.jsx'
import BackButton from '../components/BackButton.jsx'

function Analytics() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAnalytics, setNewAnalytics] = useState({
    id: '',
    title: '',
    type: 'progression',
    description: '',
    date: new Date().toISOString().split('T')[0],
    metrics: {}
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTimeframe, setSelectedTimeframe] = useState('semester')
  const [showReportGenerator, setShowReportGenerator] = useState(false)

  // Filter the analytics data based on search query
  const filteredAnalytics = analyticsData.filter(
    analytics => 
      analytics.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      analytics.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      analytics.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewAnalytics({
      ...newAnalytics,
      [name]: value
    })
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simple validation
    if (!newAnalytics.title.trim() || !newAnalytics.description.trim()) {
      toast.error("Please fill all required fields")
      return
    }
    
    // Generate a unique ID (in a real app, the backend would handle this)
    const analyticsWithId = {
      ...newAnalytics,
      id: Date.now().toString()
    }
    
    // Add metrics based on the type
    if (newAnalytics.type === 'progression') {
      analyticsWithId.metrics = {
        average: 75,
        improvement: 12,
        samples: 32
      }
    } else if (newAnalytics.type === 'performance') {
      analyticsWithId.metrics = {
        passRate: 85,
        averageScore: 78,
        topPerformers: 15
      }
    } else {
      analyticsWithId.metrics = {
        aCount: 12,
        bCount: 18,
        cCount: 8,
        dCount: 4,
        fCount: 2
      }
    }
    
    // Add the new analytics
    addAnalytics(analyticsWithId)
    
    // Reset form and close modal
    setNewAnalytics({
      id: '',
      title: '',
      type: 'progression',
      description: '',
      date: new Date().toISOString().split('T')[0],
      metrics: {}
    })
    setShowAddForm(false)
    
    // Show success message
    toast.success("New analytics added successfully")
  }

  // Icons
  const handleExportData = () => {
    // Implementation for exporting data
    toast.success('Data exported successfully')
  }

  // Icons
  const PlusIcon = getIcon('Plus')
  const SearchIcon = getIcon('Search')
  const XIcon = getIcon('X')
  
  const renderAddForm = () => (
    <div className="fixed inset-0 bg-surface-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Add New Analytics</h3>
          <button 
            onClick={() => setShowAddForm(false)}
            className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="label">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newAnalytics.title}
              onChange={handleInputChange}
              className="input"
              placeholder="Analytics Title"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="type" className="label">Type</label>
            <select
              id="type"
              name="type"
              value={newAnalytics.type}
              onChange={handleInputChange}
              className="input"
              required
            >
              <option value="progression">Student Progression</option>
              <option value="performance">Course Performance</option>
              <option value="distribution">Grade Distribution</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="label">Description</label>
            <textarea
              id="description"
              name="description"
              value={newAnalytics.description}
              onChange={handleInputChange}
              className="input min-h-[100px]"
              placeholder="Analytics Description"
              required
            ></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary w-full">Add Analytics</button>
        </form>
      </div>
    </div>
  )

  // Icons
  const GraduationCapIcon = getIcon('GraduationCap')
  const LineChartIcon = getIcon('LineChart')
  const TrendingUpIcon = getIcon('TrendingUp')
  const PercentIcon = getIcon('Percent')
  const AwardIcon = getIcon('Award')
  const DownloadIcon = getIcon('Download')
  const ClipboardIcon = getIcon('Clipboard')

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col"
    >
      {/* Header */}
      <header className="bg-white dark:bg-surface-800 shadow-sm border-b border-surface-200 dark:border-surface-700 sticky top-0 z-40">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-surface-600 dark:text-surface-400">
            View and manage all analytics reports
          </p>
        </div>
        
        <button 
          onClick={() => setShowAddForm(true)}
          className="btn btn-primary mt-4 sm:mt-0"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add New Analytics
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-surface-500" />
        </div>
        <input
          type="text"
          placeholder="Search analytics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input pl-10"
        />
      </div>
      
      {/* Analytics List */}
      <div className="mb-8 overflow-x-auto bg-white dark:bg-surface-800 rounded-xl shadow-card border border-surface-200 dark:border-surface-700">
        <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
          <thead className="bg-surface-50 dark:bg-surface-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">Description</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
            {filteredAnalytics.map((item) => (
              <tr key={item.id} className="hover:bg-surface-50 dark:hover:bg-surface-700">
                <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">{item.type}</td>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(item.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
            <BackButton label="Back to Dashboard" />
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
            <div className="mb-6">
            <GradeDistributionChart timeframe={selectedTimeframe} />
            
            {/* Course Performance Chart */}
            <CoursePerformanceChart timeframe={selectedTimeframe} />
          </div>
          
          {/* Student Progression Chart */}
          <StudentProgressionChart timeframe={selectedTimeframe} />
          </div>
          
          {/* Add Form Modal */}
          {showAddForm && renderAddForm()}
          
          
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