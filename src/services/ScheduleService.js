// ScheduleService.js - Service for schedule data operations

const TABLE_NAME = 'schedule';

// Get ApperClient instance
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Get all schedules
export const fetchSchedules = async () => {
  const client = getApperClient();
  
  const params = {
    fields: ["Name", "courseName", "instructor", "location", "startTime", "endTime", "day", "startDate", "endDate"],
  };
  
  const response = await client.fetchRecords(TABLE_NAME, params);
  return response.data;
};

// Get a schedule by ID
export const getScheduleById = async (id) => {
  const client = getApperClient();
  
  const params = {
    fields: ["Name", "courseName", "instructor", "location", "startTime", "endTime", "day", "startDate", "endDate"],
  };
  
  const response = await client.getRecordById(TABLE_NAME, id, params);
  return response.data;
};

// Create a new schedule
export const createSchedule = async (scheduleData) => {
  const client = getApperClient();
  
  // Only include updateable fields
  const params = {
    records: [{
      Name: `${scheduleData.courseName} - ${scheduleData.day}`,
      courseName: scheduleData.courseName,
      instructor: scheduleData.instructor,
      location: scheduleData.location,
      startTime: scheduleData.startTime,
      endTime: scheduleData.endTime,
      day: scheduleData.day,
      startDate: scheduleData.startDate,
      endDate: scheduleData.endDate
    }]
  };
  
  const response = await client.createRecord(TABLE_NAME, params);
  return response;
};

// Update a schedule
export const updateSchedule = async (id, scheduleData) => {
  const client = getApperClient();
  
  const params = {
    records: [{
      Id: id,
      Name: `${scheduleData.courseName} - ${scheduleData.day}`,
      courseName: scheduleData.courseName,
      instructor: scheduleData.instructor,
      location: scheduleData.location,
      startTime: scheduleData.startTime,
      endTime: scheduleData.endTime,
      day: scheduleData.day,
      startDate: scheduleData.startDate,
      endDate: scheduleData.endDate
    }]
  };
  
  const response = await client.updateRecord(TABLE_NAME, params);
  return response;
};

// Delete a schedule
export const deleteSchedule = async (id) => {
  const client = getApperClient();
  
  const params = {
    RecordIds: [id]
  };
  
  const response = await client.deleteRecord(TABLE_NAME, params);
  return response;
};