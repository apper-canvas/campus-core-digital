// CourseService.js - Service for course data operations

const TABLE_NAME = 'course';

// Get ApperClient instance
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Get all courses
export const fetchCourses = async () => {
  const client = getApperClient();
  
  const params = {
    fields: ["Name", "code", "credits", "department", "instructor", "schedule", "maxEnrollment", "status"],
  };
  
  const response = await client.fetchRecords(TABLE_NAME, params);
  return response.data;
};

// Get a course by ID
export const getCourseById = async (id) => {
  const client = getApperClient();
  
  const params = {
    fields: ["Name", "code", "credits", "department", "instructor", "schedule", "maxEnrollment", "status"],
  };
  
  const response = await client.getRecordById(TABLE_NAME, id, params);
  return response.data;
};

// Create a new course
export const createCourse = async (courseData) => {
  const client = getApperClient();
  
  // Only include updateable fields
  const params = {
    records: [{
      Name: courseData.name,
      code: courseData.code,
      credits: parseInt(courseData.credits),
      department: courseData.department,
      instructor: courseData.instructor,
      schedule: courseData.schedule,
      maxEnrollment: parseInt(courseData.maxEnrollment) || 0,
      status: courseData.status
    }]
  };
  
  const response = await client.createRecord(TABLE_NAME, params);
  return response;
};

// Update a course
export const updateCourse = async (id, courseData) => {
  const client = getApperClient();
  
  // Only include updateable fields
  const params = {
    records: [{
      Id: id,
      Name: courseData.name,
      code: courseData.code,
      credits: parseInt(courseData.credits),
      department: courseData.department,
      instructor: courseData.instructor,
      schedule: courseData.schedule,
      maxEnrollment: parseInt(courseData.maxEnrollment) || 0,
      status: courseData.status
    }]
  };
  
  const response = await client.updateRecord(TABLE_NAME, params);
  return response;
};