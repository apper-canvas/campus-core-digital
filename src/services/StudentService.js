// StudentService.js - Service for student data operations

const TABLE_NAME = 'student3';

// Get ApperClient instance
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Get all students with optional filtering
export const fetchStudents = async (filters = {}) => {
  const client = getApperClient();
  
  // Prepare filter conditions if any
  const conditions = [];
  if (filters.name) {
    conditions.push({
      fieldName: "Name",
      operator: "Contains",
      values: [filters.name]
    });
  }
  
  if (filters.department) {
    conditions.push({
      fieldName: "department",
      operator: "ExactMatch",
      values: [filters.department]
    });
  }
  
  const params = {
    fields: ["Name", "email", "studentId", "department", "year", "gpa", "status"],
    where: conditions,
  };
  
  const response = await client.fetchRecords(TABLE_NAME, params);
  return response.data;
};

// Create a new student
export const createStudent = async (studentData) => {
  const client = getApperClient();
  
  // Only include updateable fields
  const params = {
    records: [{
      Name: studentData.name,
      email: studentData.email,
      studentId: studentData.studentId,
      department: studentData.department,
      year: studentData.year,
      gpa: studentData.gpa,
      status: studentData.status
    }]
  };
  
  const response = await client.createRecord(TABLE_NAME, params);
  return response;
};

// Delete a student
export const deleteStudent = async (id) => {
  const client = getApperClient();
  
  const params = {
    RecordIds: [id]
  };
  
  const response = await client.deleteRecord(TABLE_NAME, params);
  return response;
};