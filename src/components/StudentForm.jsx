import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils.js';
import { generateId } from '../data/studentsData.js';

const StudentForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    department: '',
    year: '',
    gpa: '',
    status: 'Active'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const SaveIcon = getIcon('Save');
  const XIcon = getIcon('X');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }
    
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }
    
    if (!formData.year.trim()) {
      newErrors.year = 'Year is required';
    }
    
    if (formData.gpa && (isNaN(formData.gpa) || Number(formData.gpa) < 0 || Number(formData.gpa) > 4.0)) {
      newErrors.gpa = 'GPA must be a number between 0 and 4.0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create a new student object with generated ID
      const newStudent = {
        ...formData,
        id: generateId()
      };
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      onSubmit(newStudent);
      toast.success('Student added successfully!');
    } catch (error) {
      toast.error('Failed to add student. Please try again.');
      console.error('Error adding student:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="card mb-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Add New Student</h3>
        <button 
          onClick={onCancel}
          className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="label" htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className={`input ${errors.name ? 'border-red-500 dark:border-red-400' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className={`input ${errors.email ? 'border-red-500 dark:border-red-400' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="label" htmlFor="studentId">Student ID</label>
            <input 
              type="text" 
              id="studentId" 
              name="studentId" 
              value={formData.studentId} 
              onChange={handleChange} 
              className={`input ${errors.studentId ? 'border-red-500 dark:border-red-400' : ''}`}
            />
            {errors.studentId && <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>}
          </div>
          
          <div>
            <label className="label" htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`input ${errors.department ? 'border-red-500 dark:border-red-400' : ''}`}
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Business Administration">Business Administration</option>
              <option value="Psychology">Psychology</option>
              <option value="Mathematics">Mathematics</option>
            </select>
            {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
          </div>
          
          <div>
            <label className="label" htmlFor="year">Year</label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className={`input ${errors.year ? 'border-red-500 dark:border-red-400' : ''}`}
            >
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
              <option value="Graduate">Graduate</option>
            </select>
            {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
          </div>
          
          <div>
            <label className="label" htmlFor="gpa">GPA</label>
            <input 
              type="text" 
              id="gpa" 
              name="gpa" 
              value={formData.gpa} 
              onChange={handleChange} 
              className={`input ${errors.gpa ? 'border-red-500 dark:border-red-400' : ''}`}
              placeholder="0.0 - 4.0"
            />
            {errors.gpa && <p className="text-red-500 text-sm mt-1">{errors.gpa}</p>}
          </div>
          
          <div>
            <label className="label" htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input"
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Graduated">Graduated</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button 
            type="button" 
            onClick={onCancel}
            className="btn btn-outline"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              <span className="flex items-center">
                <SaveIcon className="w-4 h-4 mr-1" />
                Save Student
              </span>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default StudentForm;