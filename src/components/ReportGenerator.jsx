import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { getIcon } from '../utils/iconUtils.js'

const ReportGenerator = ({ onClose }) => {
  const [formData, setFormData] = useState({
    reportName: '',
    reportType: 'performance',
    department: '',
    course: '',
    timeframe: 'semester',
    includeCharts: true,
    includeRawData: false,
    format: 'pdf'
  })
  
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Icons
  const XIcon = getIcon('X')
  const FileTextIcon = getIcon('FileText')
  const CheckIcon = getIcon('Check')
  const RefreshCwIcon = getIcon('RefreshCw')
  
  // Department options
  const departments = [
    'All Departments',
    'Computer Science',
    'Mathematics',
    'Engineering',
    'Physics',
    'Chemistry',
    'Biology',
    'Business',
    'Psychology',
    'English'
  ]
  
  // Course options based on selected department
  const getCourseOptions = () => {
    if (formData.department === 'All Departments' || formData.department === '') {
      return ['All Courses']
    }
    
    const courseMap = {
      'Computer Science': ['All CS Courses', 'CS101: Intro to Programming', 'CS201: Data Structures', 'CS301: Algorithms', 'CS401: AI Fundamentals'],
      'Mathematics': ['All Math Courses', 'MATH101: Calculus I', 'MATH201: Calculus II', 'MATH301: Linear Algebra', 'MATH401: Abstract Algebra'],
      'Engineering': ['All Eng Courses', 'ENG101: Intro to Engineering', 'ENG201: Mechanics', 'ENG301: Thermodynamics'],
      'Physics': ['All Physics Courses', 'PHYS101: Intro to Physics', 'PHYS201: Electricity & Magnetism', 'PHYS301: Quantum Mechanics'],
      'Chemistry': ['All Chemistry Courses', 'CHEM101: General Chemistry', 'CHEM201: Organic Chemistry', 'CHEM301: Biochemistry'],
      'Biology': ['All Biology Courses', 'BIO101: General Biology', 'BIO201: Cell Biology', 'BIO301: Genetics'],
      'Business': ['All Business Courses', 'BUS101: Business Administration', 'BUS201: Marketing', 'BUS301: Finance'],
      'Psychology': ['All Psychology Courses', 'PSY101: Intro to Psychology', 'PSY201: Cognitive Psychology', 'PSY301: Abnormal Psychology'],
      'English': ['All English Courses', 'ENG101: Composition', 'ENG201: Literature', 'ENG301: Creative Writing']
    }
    
    return courseMap[formData.department] || ['All Courses']
  }
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      // Reset course selection when department changes
      ...(name === 'department' ? { course: '' } : {})
    }))
  }
  
  const handleGenerateReport = (e) => {
    e.preventDefault()
    
    if (!formData.reportName) {
      toast.error("Please provide a report name")
      return
    }
    
    setIsGenerating(true)
    
    // Simulate report generation with a delay
    setTimeout(() => {
      setIsGenerating(false)
      toast.success(`Report "${formData.reportName}" generated successfully`)
      onClose()
    }, 1500)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 25 }}
        className="bg-white dark:bg-surface-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center">
            <FileTextIcon className="w-5 h-5 mr-2 text-primary" />
            Generate Custom Report
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
            aria-label="Close form"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleGenerateReport} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label htmlFor="reportName" className="label">Report Name <span className="text-red-500">*</span></label>
              <input
                id="reportName"
                name="reportName"
                type="text"
                placeholder="e.g. Spring 2023 Performance Overview"
                value={formData.reportName}
                onChange={handleInputChange}
                className="input"
                required
              />
            </div>
            
            <div>
              <label htmlFor="reportType" className="label">Report Type</label>
              <select
                id="reportType"
                name="reportType"
                value={formData.reportType}
                onChange={handleInputChange}
                className="input"
              >
                <option value="performance">Performance Summary</option>
                <option value="grades">Grade Distribution</option>
                <option value="comparison">Course Comparison</option>
                <option value="progression">Student Progression</option>
                <option value="comprehensive">Comprehensive Analysis</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="timeframe" className="label">Time Period</label>
              <select
                id="timeframe"
                name="timeframe"
                value={formData.timeframe}
                onChange={handleInputChange}
                className="input"
              >
                <option value="semester">Current Semester</option>
                <option value="year">Academic Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="department" className="label">Department</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="input"
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="course" className="label">Course</label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className="input"
                disabled={!formData.department}
              >
                <option value="">Select Course</option>
                {getCourseOptions().map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="label">Report Options</label>
              <div className="space-y-3 mt-1">
                <div className="flex items-center">
                  <input
                    id="includeCharts"
                    name="includeCharts"
                    type="checkbox"
                    checked={formData.includeCharts}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary border-surface-300 dark:border-surface-700 rounded focus:ring-primary"
                  />
                  <label htmlFor="includeCharts" className="ml-2 text-sm text-surface-600 dark:text-surface-400">
                    Include visualizations and charts
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="includeRawData"
                    name="includeRawData"
                    type="checkbox"
                    checked={formData.includeRawData}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary border-surface-300 dark:border-surface-700 rounded focus:ring-primary"
                  />
                  <label htmlFor="includeRawData" className="ml-2 text-sm text-surface-600 dark:text-surface-400">
                    Include raw data tables
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="format" className="label">Output Format</label>
              <div className="flex space-x-2">
                {['pdf', 'excel', 'html'].map(format => (
                  <label key={format} className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                    formData.format === format
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'border-surface-300 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}>
                    <input
                      type="radio"
                      name="format"
                      value={format}
                      checked={formData.format === format}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">
                      {format.toUpperCase()}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-surface-200 dark:border-surface-700 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline"
              disabled={isGenerating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary min-w-[120px]"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <RefreshCwIcon className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Generate
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default ReportGenerator