import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils.js';
import BackButton from '../components/BackButton.jsx';
import { 
  fetchSchedules, 
  createSchedule, 
  updateSchedule, 
  deleteSchedule 
} from '../services/ScheduleService.js';

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [formData, setFormData] = useState({
    courseName: '',
    instructor: '',
    location: '',
    startTime: '',
    endTime: '',
    day: '',
    startDate: '',
    endDate: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Icons
  const CalendarIcon = getIcon('Calendar');
  const PlusIcon = getIcon('Plus');
  const EditIcon = getIcon('Edit');
  const TrashIcon = getIcon('Trash');
  const ClockIcon = getIcon('Clock');
  const MapPinIcon = getIcon('MapPin');
  const UserIcon = getIcon('User');
  const BookOpenIcon = getIcon('BookOpen');
  const XIcon = getIcon('X');
  const AlertCircleIcon = getIcon('AlertCircle');
  const RefreshIcon = getIcon('RefreshCw');
  
  // Load schedules on component mount
  useEffect(() => {
    loadSchedules();
  }, []);
  
  // Function to load schedules from the database
  const loadSchedules = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchSchedules();
      setSchedules(data || []);
    } catch (err) {
      console.error('Error loading schedules:', err);
      setError('Failed to load schedules. Please try again.');
      toast.error('Failed to load schedules');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Open add schedule modal
  const openAddModal = () => {
    setFormData({
      courseName: '',
      instructor: '',
      location: '',
      startTime: '',
      endTime: '',
      day: '',
      startDate: '',
      endDate: ''
    });
    setIsAddModalOpen(true);
  };
  
  // Open edit schedule modal
  const openEditModal = (schedule) => {
    setCurrentSchedule(schedule);
    setFormData({
      courseName: schedule.courseName,
      instructor: schedule.instructor,
      location: schedule.location,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      day: schedule.day,
      startDate: schedule.startDate,
      endDate: schedule.endDate
    });
    setIsEditModalOpen(true);
  };
  
  // Open delete confirmation modal
  const openDeleteModal = (schedule) => {
    setCurrentSchedule(schedule);
    setIsDeleteModalOpen(true);
  };
  
  // Handle add schedule submission
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.courseName || !formData.instructor || !formData.day) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      const response = await createSchedule(formData);
      
      if (response && response.success) {
        // Get the created schedule
        if (response.results && response.results.length > 0 && response.results[0].success) {
          const createdSchedule = response.results[0].data;
          
          // Update local state with the new schedule
          setSchedules(prev => [...prev, createdSchedule]);
          toast.success("Schedule added successfully");
        } else {
          toast.warning('Schedule added but details not returned');
          // Reload all schedules to get the updated list
          loadSchedules();
        }
      } else {
        toast.error(response.message || 'Failed to add schedule');
      }
    } catch (err) {
      console.error('Error adding schedule:', err);
      toast.error('Failed to add schedule');
    } finally {
      setIsAddModalOpen(false);
    }
  };
  
  // Handle edit schedule submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.courseName || !formData.instructor || !formData.day) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Update schedule
    try {
      const response = await updateSchedule(currentSchedule.Id, formData);
      
      if (response && response.success) {
        // Get the updated schedule
        if (response.results && response.results.length > 0 && response.results[0].success) {
          const updatedSchedule = response.results[0].data;
          
          // Update local state with the updated schedule
          setSchedules(prev => 
            prev.map(schedule => 
              schedule.Id === currentSchedule.Id ? updatedSchedule : schedule
            )
          );
          
          toast.success("Schedule updated successfully");
        } else {
          toast.warning('Schedule updated but details not returned');
          // Reload all schedules to get the updated list
          loadSchedules();
        }
      } else {
        toast.error(response.message || 'Failed to update schedule');
      }
    } catch (err) {
      console.error('Error updating schedule:', err);
      toast.error('Failed to update schedule');
    } finally {
      setIsEditModalOpen(false);
    }
  };
  
  // Handle delete schedule
  const handleDelete = async () => {
    try {
      const response = await deleteSchedule(currentSchedule.Id);
      
      if (response && response.success) {
        setSchedules(prev => prev.filter(schedule => schedule.Id !== currentSchedule.Id));
        toast.success("Schedule deleted successfully");
      } else {
        toast.error(response.message || 'Failed to delete schedule');
      }
    } catch (err) {
      console.error('Error deleting schedule:', err);
      toast.error('Failed to delete schedule');
    }
    setIsDeleteModalOpen(false);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-surface-50 dark:bg-surface-900 p-4 md:p-6"
    >
      <div className="max-w-7xl mx-auto">
        <BackButton />
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center">
              <CalendarIcon className="w-8 h-8 mr-2 text-primary" />
              Class Schedule
            </h1>
            <p className="text-surface-600 dark:text-surface-400 mt-1">
              Manage your course schedules and class timings
            </p>
          </div>
          
          <button 
            onClick={openAddModal}
            className="btn btn-primary flex items-center"
          >
            <PlusIcon className="w-5 h-5 mr-1" />
            Add Schedule
          </button>
        </div>
        
        {/* Schedule List */}
        {loading && (
          <div className="card flex items-center justify-center py-8">
            <div className="flex flex-col items-center">
              <RefreshIcon className="w-10 h-10 text-primary animate-spin mb-4" />
              <p>Loading schedules...</p>
            </div>
          </div>
        )}
        
        {error && !loading && (
          <div className="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 flex items-center justify-center py-8">
            <div className="flex flex-col items-center">
              <AlertCircleIcon className="w-10 h-10 text-red-500 mb-4" />
              <p className="text-red-700 dark:text-red-400">{error}</p>
              <button 
                onClick={loadSchedules}
                className="mt-4 btn bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-800/50 dark:text-red-300 dark:hover:bg-red-800/70"
              >
                <RefreshIcon className="w-4 h-4 mr-2" />
                Retry
              </button>
            </div>
          </div>
        )}
        
        {!loading && !error && (
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-md overflow-hidden border border-surface-200 dark:border-surface-700">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
                <thead className="bg-surface-50 dark:bg-surface-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Instructor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Day</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
                  {schedules.map((schedule) => (
                    <tr key={schedule.Id} className="hover:bg-surface-50 dark:hover:bg-surface-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{schedule.courseName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600 dark:text-surface-400">{schedule.instructor}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600 dark:text-surface-400">{schedule.day}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600 dark:text-surface-400">{`${schedule.startTime} - ${schedule.endTime}`}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600 dark:text-surface-400">{schedule.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => openEditModal(schedule)} 
                          className="text-primary hover:text-primary-dark mr-3"
                        >
                          <EditIcon className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => openDeleteModal(schedule)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {schedules.length === 0 && (
                  <tr>
                    <td className="px-6 py-4 text-center text-sm text-surface-500 dark:text-surface-400" colSpan="6">
                      No schedules found. Add a new schedule to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            </div>
          </div>
        )}
      </div>
      
      {/* Add/Edit Schedule Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {isAddModalOpen ? 'Add New Schedule' : 'Edit Schedule'}
              </h3>
              <button 
                onClick={() => isAddModalOpen ? setIsAddModalOpen(false) : setIsEditModalOpen(false)}
                className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={isAddModalOpen ? handleAddSubmit : handleEditSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="courseName" className="label flex items-center"><BookOpenIcon className="w-4 h-4 mr-1" /> Course Name*</label>
                  <input type="text" id="courseName" name="courseName" value={formData.courseName} onChange={handleInputChange} className="input" required />
                </div>
                <div>
                  <label htmlFor="instructor" className="label flex items-center"><UserIcon className="w-4 h-4 mr-1" /> Instructor*</label>
                  <input type="text" id="instructor" name="instructor" value={formData.instructor} onChange={handleInputChange} className="input" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="day" className="label flex items-center"><CalendarIcon className="w-4 h-4 mr-1" /> Day*</label>
                    <select id="day" name="day" value={formData.day} onChange={handleInputChange} className="input" required>
                      <option value="">Select Day</option>
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="location" className="label flex items-center"><MapPinIcon className="w-4 h-4 mr-1" /> Location</label>
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} className="input" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startTime" className="label flex items-center"><ClockIcon className="w-4 h-4 mr-1" /> Start Time</label>
                    <input type="time" id="startTime" name="startTime" value={formData.startTime} onChange={handleInputChange} className="input" />
                  </div>
                  <div>
                    <label htmlFor="endTime" className="label flex items-center"><ClockIcon className="w-4 h-4 mr-1" /> End Time</label>
                    <input type="time" id="endTime" name="endTime" value={formData.endTime} onChange={handleInputChange} className="input" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="label flex items-center"><CalendarIcon className="w-4 h-4 mr-1" /> Start Date</label>
                    <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleInputChange} className="input" />
                  </div>
                  <div>
                    <label htmlFor="endDate" className="label flex items-center"><CalendarIcon className="w-4 h-4 mr-1" /> End Date</label>
                    <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleInputChange} className="input" />
                  </div>
                </div>
                
                <div className="pt-2 flex justify-end space-x-3">
                  <button 
                    type="button"
                    onClick={() => isAddModalOpen ? setIsAddModalOpen(false) : setIsEditModalOpen(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {isAddModalOpen ? 'Add Schedule' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6 text-surface-600 dark:text-surface-400">
              Are you sure you want to delete the schedule for <span className="font-semibold">{currentSchedule?.courseName || 'this course'}</span>? This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="btn bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Schedule;