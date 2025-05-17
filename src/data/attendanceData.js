// Initial mock attendance data
export const attendanceData = [
  {
    id: 1,
    studentId: 101,
    studentName: "John Smith",
    courseId: 201,
    courseName: "Introduction to Computer Science",
    date: "2023-09-05",
    status: "Present",
    notes: "Participated actively in class discussion"
  },
  {
    id: 2,
    studentId: 102,
    studentName: "Emily Johnson",
    courseId: 202,
    courseName: "Calculus I",
    date: "2023-09-05",
    status: "Absent",
    notes: "Medical leave, doctor's note provided"
  },
  {
    id: 3,
    studentId: 103,
    studentName: "Michael Brown",
    courseId: 201,
    courseName: "Introduction to Computer Science",
    date: "2023-09-05",
    status: "Late",
    notes: "Arrived 15 minutes late"
  },
  {
    id: 4,
    studentId: 104,
    studentName: "Jessica Wilson",
    courseId: 203,
    courseName: "English Literature",
    date: "2023-09-06",
    status: "Present",
    notes: ""
  },
  {
    id: 5,
    studentId: 105,
    studentName: "David Miller",
    courseId: 204,
    courseName: "Physics I",
    date: "2023-09-06",
    status: "Present",
    notes: "Submitted extra assignment"
  },
  {
    id: 6,
    studentId: 101,
    studentName: "John Smith",
    courseId: 201,
    courseName: "Introduction to Computer Science",
    date: "2023-09-07",
    status: "Present",
    notes: ""
  },
  {
    id: 7,
    studentId: 102,
    studentName: "Emily Johnson",
    courseId: 202,
    courseName: "Calculus I",
    date: "2023-09-07",
    status: "Present",
    notes: ""
  }
];

// Function to add a new attendance record
export const addAttendance = (newAttendance) => {
  const attendance = {
    id: attendanceData.length > 0 ? Math.max(...attendanceData.map(a => a.id)) + 1 : 1,
    ...newAttendance
  };
  attendanceData.push(attendance);
  return attendance;
};

// Function to get all attendance records
export const getAllAttendance = () => {
  return [...attendanceData];
};