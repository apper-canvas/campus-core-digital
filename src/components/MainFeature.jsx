import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { getIcon } from '../utils/iconUtils.js'

const MainFeature = () => {
  // Icons
  const SearchIcon = getIcon('Search')
  const CheckIcon = getIcon('Check')
  const XIcon = getIcon('X')
  const EditIcon = getIcon('Edit')
  const TrashIcon = getIcon('Trash')
  const PlusIcon = getIcon('Plus')
  const InfoIcon = getIcon('Info')
  const BookIcon = getIcon('Book')
  const UsersIcon = getIcon('Users')
  const ClockIcon = getIcon('Clock')
  const CalendarIcon = getIcon('Calendar')
  const RefreshCwIcon = getIcon('RefreshCw')
  const FilterIcon = getIcon('Filter')
  
  // State
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      code: 'CS101', 
      name: 'Introduction to Computer Science',
      credits: 3,
      department: 'Computer Science',
      instructor: 'Dr. Alan Turing',
      schedule: 'MWF 10:00 AM - 11:30 AM',
      enrollment: 42,
      maxEnrollment: 50,
      status: 'active'
    },
    { 
      id: 2, 
      code: 'MATH201', 
      name: 'Calculus II',
      credits: 4,
      department: 'Mathematics',
      instructor: 'Dr. Ada Lovelace',
      schedule: 'TR 1:00 PM - 3:00 PM',
      enrollment: 35,
      maxEnrollment: 40,
      status: 'active'
    },
    { 
      id: 3, 
      code: 'ENG105', 
      name: 'Creative Writing',
      credits: 3,
      department: 'English',
      instructor: 'Prof. George Orwell',
      schedule: 'MW 2:00 PM - 3:30 PM',
      enrollment: 28,
      maxEnrollment: 30,
      status: 'active'
    },
    { 
      id: 4, 
      code: 'CHEM202', 
      name: 'Organic Chemistry',
      credits: 4,
      department: 'Chemistry',
      instructor: 'Dr. Marie Curie',
      schedule: 'MWF 9:00 AM - 10:30 AM',
      enrollment: 32,
      maxEnrollment: 36,
      status: 'active'
    },
    { 
      id: 5, 
      code: 'PHYS101', 
      name: 'Introduction to Physics',
      credits: 4,
      department: 'Physics',
      instructor: 'Dr. Albert Einstein',
      schedule: 'TR 10:00 AM - 12:00 PM',
      enrollment: 45,
      maxEnrollment: 50,
      status: 'inactive'
    }
  ])
  
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    credits: '',
    department: '',
    instructor: '',
    schedule: '',
    maxEnrollment: '',
    status: 'active'
  })
  
  // Filters for courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (activeTab === 'all') return matchesSearch
    if (activeTab === 'active') return matchesSearch && course.status === 'active'
    if (activeTab === 'inactive') return matchesSearch && course.status === 'inactive'
    return matchesSearch
  })
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Validate form
    if (!formData.code || !formData.name || !formData.credits || !formData.department || 
        !formData.instructor || !formData.schedule || !formData.maxEnrollment) {
      toast.error("Please fill in all required fields")
      setIsLoading(false)
      return
    }
    
    // Simulate API request
    setTimeout(() => {
      if (selectedCourse) {
        // Update existing course
        setCourses(courses.map(course => 
          course.id === selectedCourse.id 
            ? { ...formData, id: course.id, enrollment: course.enrollment } 
            : course
        ))
        toast.success(`Course "${formData.name}" updated successfully`)
      } else {
        // Add new course
        const newCourse = {
          ...formData,
          id: courses.length + 1,
          enrollment: 0,
          credits: parseInt(formData.credits),
          maxEnrollment: parseInt(formData.maxEnrollment)
        }
        setCourses([...courses, newCourse])
        toast.success(`Course "${formData.name}" added successfully`)
      }
      
      // Reset form and state
      setFormData({
        code: '',
        name: '',
        credits: '',
        department: '',
        instructor: '',
        schedule: '',
        maxEnrollment: '',
        status: 'active'
      })
      setSelectedCourse(null)
      setShowForm(false)
      setIsLoading(false)
    }, 800)
  }
  
  // Handle edit course
  const handleEditCourse = (course) => {
    setSelectedCourse(course)
    setFormData({
      code: course.code,
      name: course.name,
      credits: course.credits.toString(),
      department: course.department,
      instructor: course.instructor,
      schedule: course.schedule,
      maxEnrollment: course.maxEnrollment.toString(),
      status: course.status
    })
    setShowForm(true)
  }
  
  // Handle delete course
  const handleDeleteCourse = (courseId) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter(course => course.id !== courseId))
      toast.success("Course deleted successfully")
    }
  }
  
  // Get progress percentage for enrollment
  const getEnrollmentPercentage = (enrolled, max) => {
    return (enrolled / max) * 100
  }
  
  // Get color based on enrollment percentage
  const getEnrollmentColor = (percentage) => {
    if (percentage < 50) return 'bg-green-500'
    if (percentage < 80) return 'bg-yellow-500'
    return 'bg-red-500'
  }
  
  // Effect to reset selection when form is closed
  useEffect(() => {
    if (!showForm) {
      setSelectedCourse(null)
      setFormData({
        code: '',
        name: '',
        credits: '',
        department: '',
        instructor: '',
        schedule: '',
        maxEnrollment: '',
        status: 'active'
      })
    }
  }, [showForm])
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-bold flex items-center">
          <BookIcon className="w-5 h-5 mr-2 text-primary" />
          Course Management
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pr-10"
            />
            <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-5 h-5" />
          </div>
          
          <button 
            onClick={() => setShowForm(true)} 
            className="btn btn-primary whitespace-nowrap"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Course
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-surface-200 dark:border-surface-700">
        <button
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'all' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-300'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All Courses
        </button>
        <button
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'active' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-300'
          }`}
          onClick={() => setActiveTab('active')}
        >
          Active
        </button>
        <button
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'inactive' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-300'
          }`}
          onClick={() => setActiveTab('inactive')}
        >
          Inactive
        </button>
      </div>
      
      {/* Course List */}
      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => {
              const enrollmentPercentage = getEnrollmentPercentage(course.enrollment, course.maxEnrollment)
              const progressColor = getEnrollmentColor(enrollmentPercentage)
              
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="card hover:shadow-lg group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center mb-1">
                        <h3 className="font-bold text-lg">{course.code}</h3>
                        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                          course.status === 'active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-surface-800 dark:text-surface-200 font-medium mb-1">
                        {course.name}
                      </p>
                    </div>
                    
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => handleEditCourse(course)}
                          className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                          aria-label="Edit course"
                        >
                          <EditIcon className="w-4 h-4 text-primary" />
                        </button>
                        <button 
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                          aria-label="Delete course"
                        >
                          <TrashIcon className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                      <UsersIcon className="w-4 h-4 mr-2" />
                      <span>Instructor: {course.instructor}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      <span>{course.schedule}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                      <InfoIcon className="w-4 h-4 mr-2" />
                      <span>{course.department} • {course.credits} Credits</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1.5 text-sm">
                      <span className="font-medium">Enrollment</span>
                      <span>{course.enrollment}/{course.maxEnrollment}</span>
                    </div>
                    <div className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${progressColor} transition-all duration-500 ease-out`}
                        style={{ width: `${enrollmentPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              )
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <SearchIcon className="w-16 h-16 text-surface-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No courses found</h3>
              <p className="text-surface-500 dark:text-surface-400 max-w-md mb-4">
                {searchTerm 
                  ? `No results found for "${searchTerm}". Try a different search term.` 
                  : "There are no courses in this category. Add a new course to get started."}
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('')
                  setActiveTab('all')
                }}
                className="btn btn-outline"
              >
                <RefreshCwIcon className="w-4 h-4 mr-2" />
                Reset filters
              </button>
            </div>
          )}
        </div>
      </AnimatePresence>
      
      {/* Add/Edit Course Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50"
            onClick={() => setShowForm(false)}
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
                <h2 className="text-xl font-bold">
                  {selectedCourse ? 'Edit Course' : 'Add New Course'}
                </h2>
                <button 
                  onClick={() => setShowForm(false)}
                  className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                  aria-label="Close form"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="code" className="label">Course Code <span className="text-red-500">*</span></label>
                    <input
                      id="code"
                      name="code"
                      type="text"
                      placeholder="e.g. CS101"
                      value={formData.code}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="credits" className="label">Credits <span className="text-red-500">*</span></label>
                    <input
                      id="credits"
                      name="credits"
                      type="number"
                      min="1"
                      max="6"
                      placeholder="e.g. 3"
                      value={formData.credits}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="name" className="label">Course Name <span className="text-red-500">*</span></label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="e.g. Introduction to Computer Science"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="department" className="label">Department <span className="text-red-500">*</span></label>
                    <input
                      id="department"
                      name="department"
                      type="text"
                      placeholder="e.g. Computer Science"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="instructor" className="label">Instructor <span className="text-red-500">*</span></label>
                    <input
                      id="instructor"
                      name="instructor"
                      type="text"
                      placeholder="e.g. Dr. Smith"
                      value={formData.instructor}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="schedule" className="label">Schedule <span className="text-red-500">*</span></label>
                    <input
                      id="schedule"
                      name="schedule"
                      type="text"
                      placeholder="e.g. MWF 10:00 AM - 11:30 AM"
                      value={formData.schedule}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="maxEnrollment" className="label">Max Enrollment <span className="text-red-500">*</span></label>
                    <input
                      id="maxEnrollment"
                      name="maxEnrollment"
                      type="number"
                      min="1"
                      placeholder="e.g. 30"
                      value={formData.maxEnrollment}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="status" className="label">Status</label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="input"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4 border-t border-surface-200 dark:border-surface-700 space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="btn btn-outline"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary min-w-[100px]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <RefreshCwIcon className="w-5 h-5 animate-spin" />
                    ) : selectedCourse ? (
                      <>
                        <CheckIcon className="w-4 h-4 mr-2" />
                        Update
                      </>
                    ) : (
                      <>
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Create
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature