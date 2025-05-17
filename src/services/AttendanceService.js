// AttendanceService.js - Service for attendance data operations

const TABLE_NAME = 'attendance';

// Get ApperClient instance
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Get all attendance records with optional filtering
export const fetchAttendance = async (filters = {}) => {
  const client = getApperClient();
  
  // Build conditions based on filters
  const conditions = [];
  
  if (filters.student) {
    conditions.push({
      fieldName: "studentName",
      operator: "Contains",
      values: [filters.student]
    });
  }
  
  if (filters.course) {
    conditions.push({
      fieldName: "courseName",
      operator: "Contains",
      values: [filters.course]
    });
  }
  
  if (filters.date) {
    conditions.push({
      fieldName: "date",
      operator: "Equals",
      values: [filters.date]
    });
  }
  
  if (filters.status) {
    conditions.push({
      fieldName: "status",
      operator: "ExactMatch",
      values: [filters.status]
    });
  }
  
  const params = {
    fields: ["Name", "studentId", "studentName", "courseId", "courseName", "date", "status", "notes"],
    where: conditions
  };
  
  const response = await client.fetchRecords(TABLE_NAME, params);
  return response.data;
};

// Create a new attendance record
export const createAttendance = async (attendanceData) => {
  const client = getApperClient();
  
  // Generate a name for the record
  const name = `${attendanceData.studentName} - ${attendanceData.courseName} - ${attendanceData.date}`;
  
  // Only include updateable fields
  const params = {
    records: [{
      Name: name,
      studentId: attendanceData.studentId,
      studentName: attendanceData.studentName,
      courseId: attendanceData.courseId,
      courseName: attendanceData.courseName,
      date: attendanceData.date,
      status: attendanceData.status,
      notes: attendanceData.notes
    }]
  };
  
  const response = await client.createRecord(TABLE_NAME, params);
  return response;
};

// Update an attendance record
export const updateAttendance = async (id, attendanceData) => {
  const client = getApperClient();
  
  const name = `${attendanceData.studentName} - ${attendanceData.courseName} - ${attendanceData.date}`;
  
  const params = {
    records: [{
      Id: id,
      Name: name,
      studentId: attendanceData.studentId,
      studentName: attendanceData.studentName,
      courseId: attendanceData.courseId,
      courseName: attendanceData.courseName,
      date: attendanceData.date,
      status: attendanceData.status,
      notes: attendanceData.notes
    }]
  };
  
  const response = await client.updateRecord(TABLE_NAME, params);
  return response;
};