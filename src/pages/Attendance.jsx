import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils.js';
import BackButton from '../components/BackButton.jsx';
import { fetchAttendance, createAttendance } from '../services/AttendanceService.js';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filters, setFilters] = useState({
    student: '',
    course: '',
    date: '',
    status: ''
  });

  // New attendance form state
  const [newAttendance, setNewAttendance] = useState({
    studentId: '',
    studentName: '',
    courseId: '',
    courseName: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present',
    notes: ''
  });

  // Icons
  const PlusIcon = getIcon('Plus');
  const FilterIcon = getIcon('Filter');
  const CheckIcon = getIcon('Check');
  const XIcon = getIcon('X');
  const ClockIcon = getIcon('Clock');
  const SearchIcon = getIcon('Search');
  const CalendarIcon = getIcon('Calendar');
  const UserIcon = getIcon('User');
  const AlertCircleIcon = getIcon('AlertCircle');
  const RefreshIcon = getIcon('RefreshCw');
  const BookIcon = getIcon('Book');

  // Status badges
  const statusBadges = {
    Present: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    Absent: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    Late: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    Excused: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
  };
  
  // Load attendance data
  const loadAttendance = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchAttendance(filters);
      setAttendance(data || []);
    } catch (err) {
      console.error('Error loading attendance records:', err);
      setError('Failed to load attendance records. Please try again.');
      toast.error('Failed to load attendance records');
    } finally {
      setLoading(false);
    }
  };
  
  // Load attendance on component mount
  useEffect(() => {
    loadAttendance();
  }, []);
  
  // Reload attendance when filters change
  useEffect(() => {
    if (!loading) {
      loadAttendance();
    }
  }, [filters, loading]);
  

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAttendance(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAttendance = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!newAttendance.studentId || !newAttendance.studentName || 
        !newAttendance.courseId || !newAttendance.courseName || 
        !newAttendance.date || !newAttendance.status) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      const response = await createAttendance(newAttendance);
      
      if (response && response.success) {
        // Get the created attendance record
        if (response.results && response.results.length > 0 && response.results[0].success) {
          const createdAttendance = response.results[0].data;
          
          // Update local state with the new attendance record
          setAttendance(prev => [...prev, createdAttendance]);
          toast.success("Attendance record added successfully");
        } else {
          toast.warning('Attendance record added but details not returned');
          // Reload all attendance records to get the updated list
          loadAttendance();
        }
      } else {
        toast.error(response.message || 'Failed to add attendance record');
      }
    } catch (err) {
      console.error('Error adding attendance record:', err);
      toast.error('Failed to add attendance record');
    }
    
    // Reset form and hide it
    setNewAttendance({
      studentId: '',
      studentName: '',
      courseId: '',
      courseName: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Present',
      notes: ''
    });
    setShowAddForm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-6 flex justify-between items-center">
        <div>
          <BackButton />
          <h1 className="text-2xl md:text-3xl font-bold mt-4">Attendance Management</h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            Track and manage student attendance records
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn btn-primary"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Attendance
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 card">
        <div className="flex items-center mb-4">
          <FilterIcon className="w-5 h-5 text-primary mr-2" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="student" className="label">Student</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-4 h-4" />
              <input
                type="text"
                id="student"
                name="student"
                placeholder="Search by name or ID"
                className="input pl-10"
                value={filters.student}
                onChange={handleFilterChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="course" className="label">Course</label>
            <div className="relative">
              <BookIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-4 h-4" />
              <input
                type="text"
                id="course"
                name="course"
                placeholder="Search by course name or ID"
                className="input pl-10"
                value={filters.course}
                onChange={handleFilterChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="date" className="label">Date</label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-4 h-4" />
              <input
                type="date"
                id="date"
                name="date"
                className="input pl-10"
                value={filters.date}
                onChange={handleFilterChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="status" className="label">Status</label>
            <select
              id="status"
              name="status"
              className="input"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">All Statuses</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
              <option value="Excused">Excused</option>
            </select>
          </div>
        </div>
      </div>

      {/* Attendance Records Table */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Attendance Records</h2>
          {!loading && !error && (
            <button 
              onClick={loadAttendance}
              className="text-primary hover:text-primary-dark p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
              title="Refresh data"
            >
              <RefreshIcon className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <RefreshIcon className="inline-block animate-spin h-8 w-8 text-primary mb-2" />
            <p className="mt-2 text-surface-500">Loading attendance records...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            <AlertCircleIcon className="w-10 h-10 mx-auto mb-3" />
            <p>{error}</p>
            <button onClick={loadAttendance} className="mt-4 btn bg-red-100 text-red-600 hover:bg-red-200">Retry</button>
          </div>
        ) : attendance.length === 0 ? (
          <div className="text-center py-8 text-surface-500">
            <SearchIcon className="w-10 h-10 mx-auto mb-3 text-surface-400" />
            <p>No attendance records found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-100 dark:bg-surface-800">
                <tr>
                  <th className="px-4 py-3 text-sm font-medium">Student</th>
                  <th className="px-4 py-3 text-sm font-medium">Course</th>
                  <th className="px-4 py-3 text-sm font-medium">Date</th>
                  <th className="px-4 py-3 text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-sm font-medium">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                {attendance.map((record) => (
                  <tr key={record.Id} className="hover:bg-surface-50 dark:hover:bg-surface-800/60">
                    <td className="px-4 py-3">
                      <div>{record.studentName}</div>
                      <div className="text-sm text-surface-500">ID: {record.studentId}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div>{record.courseName}</div>
                      <div className="text-sm text-surface-500">ID: {record.courseId}</div>
                    </td>
                    <td className="px-4 py-3">{record.date}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusBadges[record.status]}`}>
                        {record.status === 'Present' && <CheckIcon className="w-3 h-3 mr-1" />}
                        {record.status === 'Absent' && <XIcon className="w-3 h-3 mr-1" />}
                        {record.status === 'Late' && <ClockIcon className="w-3 h-3 mr-1" />}
                        {record.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 max-w-xs truncate">
                      {record.notes || <span className="text-surface-400 italic">No notes</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Add Attendance Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-xl max-w-md w-full">
            <div className="p-4 border-b border-surface-200 dark:border-surface-700">
              <h2 className="text-xl font-bold">Add New Attendance Record</h2>
            </div>
            
            <form onSubmit={handleAddAttendance} className="p-4 space-y-4">
              <div>
                <label htmlFor="studentName" className="label">Student Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  id="studentName" 
                  name="studentName" 
                  value={newAttendance.studentName} 
                  onChange={handleInputChange} 
                  className="input" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="studentId" className="label">Student ID <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  id="studentId" 
                  name="studentId" 
                  value={newAttendance.studentId} 
                  onChange={handleInputChange} 
                  className="input" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="courseName" className="label">Course Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  id="courseName" 
                  name="courseName" 
                  value={newAttendance.courseName} 
                  onChange={handleInputChange} 
                  className="input" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="courseId" className="label">Course ID <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  id="courseId" 
                  name="courseId" 
                  value={newAttendance.courseId} 
                  onChange={handleInputChange} 
                  className="input" 
                  required 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="label">Date <span className="text-red-500">*</span></label>
                  <input 
                    type="date" 
                    id="date" 
                    name="date" 
                    value={newAttendance.date} 
                    onChange={handleInputChange} 
                    className="input" 
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="status" className="label">Status <span className="text-red-500">*</span></label>
                  <select 
                    id="status" 
                    name="status" 
                    value={newAttendance.status} 
                    onChange={handleInputChange} 
                    className="input" 
                    required
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                    <option value="Excused">Excused</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="notes" className="label">Notes</label>
                <textarea 
                  id="notes" 
                  name="notes" 
                  value={newAttendance.notes} 
                  onChange={handleInputChange} 
                  className="input min-h-[80px]"
                ></textarea>
              </div>
              
              <div className="pt-2 flex justify-end space-x-3 border-t border-surface-200 dark:border-surface-700">
                <button 
                  type="button" 
                  onClick={() => setShowAddForm(false)} 
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Attendance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </motion.div>
  );
};

export default Attendance;