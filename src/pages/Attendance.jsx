import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils.js';
import BackButton from '../components/BackButton.jsx';
import { attendanceData, addAttendance } from '../data/attendanceData.js';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
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
  const BookIcon = getIcon('Book');

  // Status badges
  const statusBadges = {
    Present: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    Absent: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    Late: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    Excused: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
  };

  // Load attendance data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAttendance(attendanceData);
      setLoading(false);
    }, 500);
  }, []);

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

  // Apply filters to attendance data
  const filteredAttendance = attendance.filter(record => {
    return (
      (filters.student === '' || 
        record.studentName.toLowerCase().includes(filters.student.toLowerCase()) ||
        record.studentId.toString().includes(filters.student)) &&
      (filters.course === '' || 
        record.courseName.toLowerCase().includes(filters.course.toLowerCase()) ||
        record.courseId.toString().includes(filters.course)) &&
      (filters.date === '' || record.date === filters.date) &&
      (filters.status === '' || record.status === filters.status)
    );
  });

  // Add new attendance record
  const handleAddAttendance = (e) => {
    e.preventDefault();
    
    // Validation
    if (!newAttendance.studentId || !newAttendance.studentName || 
        !newAttendance.courseId || !newAttendance.courseName || 
        !newAttendance.date || !newAttendance.status) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // Add new attendance
    const added = addAttendance(newAttendance);
    setAttendance(prev => [...prev, added]);
    
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
    toast.success("Attendance record added successfully");
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
        <h2 className="text-lg font-semibold mb-4">Attendance Records</h2>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-r-transparent"></div>
            <p className="mt-2 text-surface-500">Loading attendance records...</p>
          </div>
        ) : filteredAttendance.length === 0 ? (
          <div className="text-center py-8 text-surface-500">
            <SearchIcon className="w-10 h-10 mx-auto mb-3 text-surface-400" />
            <p>No attendance records found matching your filters.</p>
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
                {filteredAttendance.map((record) => (
                  <tr key={record.id} className="hover:bg-surface-50 dark:hover:bg-surface-800/60">
                    <td className="px-4 py-3">
                      <div className="font-medium">{record.studentName}</div>
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

      {/* Add Attendance Modal - would be implemented here */}
      {/* For brevity, I'm not including the full modal implementation */}
      {/* The modal would contain a form similar to the fields in newAttendance state */}
      {/* with validation and the handleAddAttendance function */}
    </motion.div>
  );
};

export default Attendance;