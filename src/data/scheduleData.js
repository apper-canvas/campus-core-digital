// Initial sample schedule data
const scheduleData = [
  {
    id: 1,
    courseName: "Introduction to Computer Science",
    instructor: "Dr. Alan Turing",
    location: "Building A, Room 101",
    startTime: "09:00 AM",
    endTime: "10:30 AM",
    day: "Monday",
    startDate: "2023-09-05",
    endDate: "2023-12-15"
  },
  {
    id: 2,
    courseName: "Advanced Mathematics",
    instructor: "Dr. Katherine Johnson",
    location: "Building B, Room 205",
    startTime: "11:00 AM",
    endTime: "12:30 PM",
    day: "Tuesday",
    startDate: "2023-09-06",
    endDate: "2023-12-16"
  },
  {
    id: 3,
    courseName: "Biology Fundamentals",
    instructor: "Prof. Rosalind Franklin",
    location: "Science Building, Lab 3",
    startTime: "01:00 PM",
    endTime: "03:00 PM",
    day: "Wednesday",
    startDate: "2023-09-07",
    endDate: "2023-12-17"
  },
  {
    id: 4,
    courseName: "Modern Physics",
    instructor: "Dr. Richard Feynman",
    location: "Physics Building, Room 101",
    startTime: "02:00 PM",
    endTime: "03:30 PM",
    day: "Thursday",
    startDate: "2023-09-08",
    endDate: "2023-12-18"
  }
];

// Get all schedules
export const getAllSchedules = () => {
  return [...scheduleData];
};

// Get a schedule by ID
export const getScheduleById = (id) => {
  return scheduleData.find(schedule => schedule.id === id);
};

// Add a new schedule
export const addSchedule = (schedule) => {
  const newSchedule = {
    ...schedule,
    id: scheduleData.length > 0 ? Math.max(...scheduleData.map(s => s.id)) + 1 : 1
  };
  scheduleData.push(newSchedule);
  return newSchedule;
};

// Update an existing schedule
export const updateSchedule = (updatedSchedule) => {
  const index = scheduleData.findIndex(schedule => schedule.id === updatedSchedule.id);
  if (index !== -1) {
    scheduleData[index] = updatedSchedule;
    return true;
  }
  return false;
};

// Delete a schedule
export const deleteSchedule = (id) => {
  const index = scheduleData.findIndex(schedule => schedule.id === id);
  return index !== -1 ? scheduleData.splice(index, 1) : false;
};