// Initial student data
export const initialStudents = [
  {
    id: '1',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.edu',
    studentId: 'ST-2023-001',
    department: 'Computer Science',
    year: '3rd Year',
    gpa: '3.8',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@example.edu',
    studentId: 'ST-2023-042',
    department: 'Electrical Engineering',
    year: '2nd Year',
    gpa: '3.5',
    status: 'Active'
  }
];

// Function to generate a new unique ID
export const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;