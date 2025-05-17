import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils.js';
import StudentForm from '../components/StudentForm.jsx';
import { initialStudents } from '../data/studentsData.js';

const Students = () => {
  const [students, setStudents] = useState(initialStudents);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Icons
  const UserPlusIcon = getIcon('UserPlus');
  const SearchIcon = getIcon('Search');
  const UserCircleIcon = getIcon('UserCircle');
  const EditIcon = getIcon('Edit');
  const TrashIcon = getIcon('Trash');
  const MailIcon = getIcon('Mail');
  const BuildingIcon = getIcon('Building');
  const GraduationCapIcon = getIcon('GraduationCap');
  const ActivityIcon = getIcon('Activity');

  const handleAddStudent = (newStudent) => {
    setStudents(prev => [newStudent, ...prev]);
    setShowForm(false);
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(prev => prev.filter(student => student.id !== id));
      toast.success('Student deleted successfully');
    }
  };

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
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Student Directory</h1>
          <p className="text-surface-600 dark:text-surface-400">
            Manage student records and information
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-surface-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
            disabled={showForm}
          >
            <UserPlusIcon className="w-4 h-4 mr-2" />
            Add New Student
          </button>
        </div>

        {/* Add Student Form */}
        {showForm && (
          <StudentForm 
            onSubmit={handleAddStudent} 
            onCancel={() => setShowForm(false)} 
          />
        )}

        {/* Students List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredStudents.length > 0 ? (
            filteredStudents.map(student => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card flex flex-col md:flex-row md:items-center"
              >
                <div className="flex items-center mb-4 md:mb-0 md:mr-6">
                  <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-white">
                    <UserCircleIcon className="w-8 h-8" />
                  </div>
                </div>
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div>
                    <h3 className="font-bold text-lg">{student.name}</h3>
                    <div className="flex items-center text-surface-600 dark:text-surface-400 text-sm">
                      <span className="font-medium mr-2">{student.studentId}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        student.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        student.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        student.status === 'Graduated' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {student.status}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center text-surface-600 dark:text-surface-400 text-sm mb-1">
                      <MailIcon className="w-4 h-4 mr-1" />
                      {student.email}
                    </div>
                    <div className="flex items-center text-surface-600 dark:text-surface-400 text-sm">
                      <BuildingIcon className="w-4 h-4 mr-1" />
                      {student.department}
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">
                    <div className="flex items-center text-surface-600 dark:text-surface-400 text-sm mb-2 md:mb-0">
                      <GraduationCapIcon className="w-4 h-4 mr-1" />
                      {student.year}
                      {student.gpa && (
                        <>
                          <span className="mx-1">•</span>
                          <ActivityIcon className="w-4 h-4 mr-1" />
                          GPA: {student.gpa}
                        </>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        className="btn btn-outline py-1 px-2"
                        onClick={() => toast.info('Edit functionality will be implemented in a future update')}
                      >
                        <EditIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="btn py-1 px-2 bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                        onClick={() => handleDeleteStudent(student.id)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="card text-center py-12">
              <h3 className="text-xl font-medium text-surface-600 dark:text-surface-400 mb-2">
                No students found
              </h3>
              <p className="text-surface-500 dark:text-surface-500 mb-4">
                {searchTerm ? "Try a different search term" : "Add a new student to get started"}
              </p>
              {!showForm && (
                <button 
                  onClick={() => setShowForm(true)}
                  className="btn btn-primary mx-auto"
                >
                  <UserPlusIcon className="w-4 h-4 mr-2" />
                  Add New Student
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </motion.div>
  );
};

export default Students;