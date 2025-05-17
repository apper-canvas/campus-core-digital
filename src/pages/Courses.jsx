import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { getIcon } from '../utils/iconUtils.js'
import BackButton from '../components/BackButton.jsx'
import { fetchCourses, createCourse, updateCourse } from '../services/CourseService.js'

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [isAddFormVisible, setIsAddFormVisible] = useState(false)
  const [newCourse, setNewCourse] = useState({
    name: '',
    code: '',
    credits: '',
    department: '',
    instructor: '',
    schedule: '',
    maxEnrollment: '',
    status: 'active'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isEditFormVisible, setIsEditFormVisible] = useState(false)
  const [editFormData, setEditFormData] = useState({
    name: '',
    code: '',
    credits: '',
    department: '',
    instructor: '',
    schedule: '',
    maxEnrollment: '',
    status: 'active'
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load courses on component mount
  useEffect(() => {
    loadCourses()
  }, [])

  // Function to load courses from the database
  const loadCourses = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchCourses()
      setCourses(data || [])
    } catch (err) {
      console.error('Error loading courses:', err)
      setError('Failed to load courses. Please try again.')
      toast.error('Failed to load courses')
    } finally {
      setLoading(false)
    }
  }

  // Icons
  const PlusIcon = getIcon('Plus')
  const BookOpenIcon = getIcon('BookOpen')
  const SearchIcon = getIcon('Search')
  const ClockIcon = getIcon('Clock')
  const UserIcon = getIcon('User')
  const CalendarIcon = getIcon('Calendar')
  const BookmarkIcon = getIcon('Bookmark')
  const RefreshCwIcon = getIcon('RefreshCw')
  const PencilIcon = getIcon('Pencil')
  const TickIcon = getIcon('Check')
  const AlertCircleIcon = getIcon('AlertCircle')
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCourse(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleAddCourse = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Validate form data
    if (!newCourse.code || !newCourse.name || !newCourse.credits || !newCourse.department) {
      toast.error("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }
    
    try {
      const response = await createCourse(newCourse)
      
      if (response && response.success) {
        // Get the created course
        if (response.results && response.results.length > 0 && response.results[0].success) {
          const createdCourse = response.results[0].data
          
          // Update local state with the new course
          setCourses(prev => [...prev, createdCourse])
          toast.success(`Course ${newCourse.code} has been added successfully!`)
        } else {
          toast.warning('Course added but details not returned')
          // Reload all courses to get the updated list
          loadCourses()
        }
      } else {
        toast.error(response.message || 'Failed to add course')
      }
    } catch (err) {
      console.error('Error adding course:', err)
      toast.error('Failed to add course')
    } finally {
      // Reset form
      setNewCourse({
        name: '',
    code: '',
    credits: '',
    department: '',
    instructor: '',
    schedule: '',
    maxEnrollment: '',
    status: 'active'
      })
      
      setIsAddFormVisible(false)
      setIsSubmitting(false)
    }
  }

  const handleOpenEditForm = (course) => {
    setSelectedCourse(course)
    setEditFormData({
      name: course.Name,
      code: course.code,
      credits: course.credits,
      department: course.department,
      instructor: course.instructor || '',
      schedule: course.schedule || '',
      maxEnrollment: course.maxEnrollment || '',
      status: course.status || 'active'
    })
    setIsEditFormVisible(true)
  }

  const handleUpdateCourse = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Validate form data
    if (!editFormData.code || !editFormData.name || !editFormData.credits || !editFormData.department) {
      toast.error("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }
    
    try {
      const response = await updateCourse(selectedCourse.Id, editFormData)
      
      if (response && response.success) {
        toast.success(`Course ${editFormData.code} has been updated successfully!`)
        
        // Reload all courses to get the updated list
        loadCourses()
      } else {
        toast.error(response.message || 'Failed to update course')
      }
    } catch (err) {
      console.error('Error updating course:', err)
      toast.error('Failed to update course')
    } finally {
      // Reset form
      setSelectedCourse(null)
      setEditFormData({
        name: '', code: '', credits: '', department: '', instructor: '', schedule: '', maxEnrollment: '', status: 'active'
      })
      setIsEditFormVisible(false)
      setIsSubmitting(false)
    }
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
        
        {/* Loading/Error states */}
        {loading && (
          <div className="card flex items-center justify-center py-8">
            <div className="flex flex-col items-center">
              <RefreshCwIcon className="w-10 h-10 text-primary animate-spin mb-4" />
              <p>Loading courses...</p>
            </div>
          </div>
        )}
        
        {error && !loading && (
          <div className="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 flex items-center justify-center py-8">
            <div className="flex flex-col items-center">
              <AlertCircleIcon className="w-10 h-10 text-red-500 mb-4" />
              <p className="text-red-700 dark:text-red-400">{error}</p>
              <button 
                onClick={loadCourses}
                className="mt-4 btn bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-800/50 dark:text-red-300 dark:hover:bg-red-800/70"
              >
                <RefreshCwIcon className="w-4 h-4 mr-2" />
                Retry
              </button>
            </div>
          </div>
        )}
        
        {/* Course list */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.length > 0 ? (
              courses.map(course => (
                <div key={course.Id} className="card hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-primary/10 rounded-lg mr-3">
                        <BookOpenIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{course.code}</h3>
                        <p className="text-surface-600 dark:text-surface-400">{course.Name}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button 
                        onClick={() => handleOpenEditForm(course)}
                        className="text-surface-500 hover:text-primary mr-2 p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      course.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                    </span>
                    </div>
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
              ))
            ) : (
              <div className="col-span-full card flex flex-col items-center justify-center py-12">
                <BookOpenIcon className="w-16 h-16 text-surface-300 dark:text-surface-700 mb-4" />
                <h3 className="text-xl font-semibold text-surface-600 dark:text-surface-400 mb-2">No Courses Found</h3>
                <p className="text-surface-500 dark:text-surface-500 mb-6 text-center max-w-md">
                  There are no courses in the system yet. Click the button below to add your first course.
                </p>
                <button
                  onClick={() => setIsAddFormVisible(true)}
                  className="btn btn-primary"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add First Course
                </button>
              </div>
            )}
          </div>
        )}
        
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
                
                <div className="pt-2 flex justify-end space-x-3 border-t border-surface-200 dark:border-surface-700">
                  <button type="button" onClick={() => setIsAddFormVisible(false)} className="btn btn-outline" disabled={isSubmitting}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? <RefreshCwIcon className="w-5 h-5 animate-spin" /> : 'Add Course'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}        {/* Edit Course Form Modal */}        {isEditFormVisible && selectedCourse && (
          <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-surface-800 rounded-xl shadow-xl max-w-md w-full">
              <div className="p-4 border-b border-surface-200 dark:border-surface-700">
                <h2 className="text-xl font-bold">Edit Course</h2>
              </div>
              
              <form onSubmit={handleUpdateCourse} className="p-4 space-y-4">
                <div>
                  <label htmlFor="edit-code" className="label">Course Code <span className="text-red-500">*</span></label>
                  <input id="edit-code" name="code" type="text" className="input" value={editFormData.code} onChange={handleEditInputChange} required />
                </div>
                <div>
                  <label htmlFor="edit-name" className="label">Course Name <span className="text-red-500">*</span></label>
                  <input id="edit-name" name="name" type="text" className="input" value={editFormData.name} onChange={handleEditInputChange} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="edit-credits" className="label">Credits <span className="text-red-500">*</span></label>
                    <input id="edit-credits" name="credits" type="number" min="1" className="input" value={editFormData.credits} onChange={handleEditInputChange} required />
                  </div>
                  <div>
                    <label htmlFor="edit-department" className="label">Department <span className="text-red-500">*</span></label>
                    <input id="edit-department" name="department" type="text" className="input" value={editFormData.department} onChange={handleEditInputChange} required />
                  </div>
                </div>
                <div>
                  <label htmlFor="edit-instructor" className="label">Instructor</label>
                  <input id="edit-instructor" name="instructor" type="text" className="input" value={editFormData.instructor} onChange={handleEditInputChange} />
                </div>
                <div>
                  <label htmlFor="edit-schedule" className="label">Schedule</label>
                  <input id="edit-schedule" name="schedule" type="text" className="input" value={editFormData.schedule} onChange={handleEditInputChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="edit-maxEnrollment" className="label">Max Enrollment</label>
                    <input id="edit-maxEnrollment" name="maxEnrollment" type="number" min="0" className="input" value={editFormData.maxEnrollment} onChange={handleEditInputChange} />
                  </div>
                  <div>
                    <label htmlFor="edit-status" className="label">Status</label>
                    <select id="edit-status" name="status" className="input" value={editFormData.status} onChange={handleEditInputChange}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="pt-2 flex justify-end space-x-3 border-t border-surface-200 dark:border-surface-700">
                  <button type="button" onClick={() => setIsEditFormVisible(false)} className="btn btn-outline" disabled={isSubmitting}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? <RefreshCwIcon className="w-5 h-5 animate-spin" /> : 'Update Course'}
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