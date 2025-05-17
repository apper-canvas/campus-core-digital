import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { getIcon } from '../utils/iconUtils.js'
import BackButton from '../components/BackButton.jsx'
import { coursesData } from '../data/coursesData.js'

const Courses = () => {
  const [courses, setCourses] = useState(coursesData)
  const [isAddFormVisible, setIsAddFormVisible] = useState(false)
  const [newCourse, setNewCourse] = useState({
    code: '',
    name: '',
    credits: '',
    department: '',
    instructor: '',
    schedule: '',
    maxEnrollment: '',
    status: 'active'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Icons
  const PlusIcon = getIcon('Plus')
  const BookOpenIcon = getIcon('BookOpen')
  const SearchIcon = getIcon('Search')
  const ClockIcon = getIcon('Clock')
  const UserIcon = getIcon('User')
  const CalendarIcon = getIcon('Calendar')
  const BookmarkIcon = getIcon('Bookmark')
  const RefreshCwIcon = getIcon('RefreshCw')
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCourse(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleAddCourse = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Validate form data
    if (!newCourse.code || !newCourse.name || !newCourse.credits || !newCourse.department) {
      toast.error("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }
    
    // Simulate API call
    setTimeout(() => {
      const createdCourse = {
        ...newCourse,
        id: Date.now().toString(),
        enrollment: 0,
        credits: parseInt(newCourse.credits),
        maxEnrollment: parseInt(newCourse.maxEnrollment)
      }
      
      setCourses([...courses, createdCourse])
      
      // Reset form
      setNewCourse({
        code: '',
        name: '',
        credits: '',
        department: '',
        instructor: '',
        schedule: '',
        maxEnrollment: '',
        status: 'active'
      })
      
      setIsAddFormVisible(false)
      setIsSubmitting(false)
      toast.success(`Course ${createdCourse.code} has been added successfully!`)
    }, 800)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-surface-50 dark:bg-surface-900 pt-16 md:pt-24 pb-20"
    >
      <div className="container mx-auto px-4">
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center">
            <BackButton />
            <h1 className="text-2xl md:text-3xl font-bold ml-2">Course Management</h1>
          </div>
          <button
            onClick={() => setIsAddFormVisible(true)}
            className="btn btn-primary"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Course
          </button>
        </div>
        
        {/* Course list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-primary/10 rounded-lg mr-3">
                    <BookOpenIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{course.code}</h3>
                    <p className="text-surface-600 dark:text-surface-400">{course.name}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  course.status === 'active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <UserIcon className="w-4 h-4 mr-2 text-surface-500" />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center text-sm">
                  <CalendarIcon className="w-4 h-4 mr-2 text-surface-500" />
                  <span>{course.schedule}</span>
                </div>
                <div className="flex items-center text-sm">
                  <BookmarkIcon className="w-4 h-4 mr-2 text-surface-500" />
                  <span>{course.department} • {course.credits} Credits</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Add Course Form Modal */}
        {isAddFormVisible && (
          <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-surface-800 rounded-xl shadow-xl max-w-md w-full">
              <div className="p-4 border-b border-surface-200 dark:border-surface-700">
                <h2 className="text-xl font-bold">Add New Course</h2>
              </div>
              
              <form onSubmit={handleAddCourse} className="p-4 space-y-4">
                <div>
                  <label htmlFor="code" className="label">Course Code <span className="text-red-500">*</span></label>
                  <input id="code" name="code" type="text" className="input" value={newCourse.code} onChange={handleInputChange} required />
                </div>
                <div>
                  <label htmlFor="name" className="label">Course Name <span className="text-red-500">*</span></label>
                  <input id="name" name="name" type="text" className="input" value={newCourse.name} onChange={handleInputChange} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="credits" className="label">Credits <span className="text-red-500">*</span></label>
                    <input id="credits" name="credits" type="number" min="1" className="input" value={newCourse.credits} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <label htmlFor="department" className="label">Department <span className="text-red-500">*</span></label>
                    <input id="department" name="department" type="text" className="input" value={newCourse.department} onChange={handleInputChange} required />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4 border-t border-surface-200 dark:border-surface-700">
                  <button type="button" onClick={() => setIsAddFormVisible(false)} className="btn btn-outline" disabled={isSubmitting}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? <RefreshCwIcon className="w-5 h-5 animate-spin" /> : 'Add Course'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Courses