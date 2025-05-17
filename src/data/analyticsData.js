let analyticsData = [
  {
    id: '1',
    title: 'Student Progression Analysis Q1 2023',
    type: 'progression',
    description: 'Analysis of student academic progression during the first quarter of 2023',
    date: '2023-04-15',
    metrics: {
      average: 78,
      improvement: 15,
      samples: 45
    }
  },
  {
    id: '2',
    title: 'Course Performance Evaluation',
    type: 'performance',
    description: 'Evaluation of course effectiveness based on student outcomes',
    date: '2023-05-20',
    metrics: {
      passRate: 88,
      averageScore: 82,
      topPerformers: 12
    }
  },
  {
    id: '3',
    title: 'Semester Grade Distribution',
    type: 'distribution',
    description: 'Analysis of grade distribution across all courses for the Spring semester',
    date: '2023-06-10',
    metrics: {
      aCount: 18,
      bCount: 24,
      cCount: 15,
      dCount: 8,
      fCount: 5
    }
  }
];

// Add a new analytics
export function addAnalytics(analytics) {
  analyticsData.unshift(analytics);
      counts: [245, 386, 192, 63, 24],

// Export the analytics data
export { analyticsData };
      percentages: [26.9, 42.4, 21.1, 6.9, 2.7]
    },
    year: {
      counts: [510, 845, 402, 124, 58],
      percentages: [26.3, 43.5, 20.7, 6.4, 3.1]
    },
    all: {
      counts: [1845, 2932, 1438, 382, 213],
      percentages: [27.1, 43.0, 21.1, 5.6, 3.2]
    }
  }
  
  return distributions[timeframe] || distributions.semester
}

export const getCoursePerformance = (timeframe) => {
  const performances = {
    semester: [
      { courseName: 'CS101', avgGrade: 3.4, passRate: 94.2 },
      { courseName: 'MATH201', avgGrade: 3.1, passRate: 89.7 },
      { courseName: 'ENG105', avgGrade: 3.8, passRate: 98.1 },
      { courseName: 'CHEM202', avgGrade: 2.9, passRate: 84.3 },
      { courseName: 'PHYS101', avgGrade: 3.2, passRate: 91.5 }
    ],
    year: [
      { courseName: 'CS101', avgGrade: 3.5, passRate: 95.1 },
      { courseName: 'MATH201', avgGrade: 3.0, passRate: 88.6 },
      { courseName: 'ENG105', avgGrade: 3.7, passRate: 97.2 },
      { courseName: 'CHEM202', avgGrade: 3.1, passRate: 87.5 },
      { courseName: 'PHYS101', avgGrade: 3.3, passRate: 92.4 },
      { courseName: 'BIO101', avgGrade: 3.4, passRate: 93.8 }
    ],
    all: [
      { courseName: 'CS101', avgGrade: 3.3, passRate: 93.1 },
      { courseName: 'MATH201', avgGrade: 2.9, passRate: 86.4 },
      { courseName: 'ENG105', avgGrade: 3.6, passRate: 96.8 },
      { courseName: 'CHEM202', avgGrade: 3.0, passRate: 85.9 },
      { courseName: 'PHYS101', avgGrade: 3.2, passRate: 90.7 },
      { courseName: 'BIO101', avgGrade: 3.3, passRate: 91.9 },
      { courseName: 'PSY101', avgGrade: 3.5, passRate: 94.5 }
    ]
  }
  
  return performances[timeframe] || performances.semester
}

export const getStudentProgression = (timeframe) => {
  const progressions = {
    semester: {
      semesters: ['Fall 2022', 'Spring 2023'],
      honors: [3.8, 3.9],
      regular: [3.2, 3.3],
      atRisk: [2.2, 2.4]
    },
    year: {
      semesters: ['Fall 2021', 'Spring 2022', 'Fall 2022', 'Spring 2023'],
      honors: [3.7, 3.8, 3.8, 3.9],
      regular: [3.1, 3.2, 3.2, 3.3],
      atRisk: [2.0, 2.1, 2.2, 2.4]
    },
    all: {
      semesters: ['Fall 2020', 'Spring 2021', 'Fall 2021', 'Spring 2022', 'Fall 2022', 'Spring 2023'],
      honors: [3.6, 3.7, 3.7, 3.8, 3.8, 3.9],
      regular: [3.0, 3.1, 3.1, 3.2, 3.2, 3.3],
      atRisk: [1.8, 1.9, 2.0, 2.1, 2.2, 2.4]
    }
  }
  
  return progressions[timeframe] || progressions.semester
}

// Department report data
export const getDepartmentData = (department, timeframe) => {
  // Generate mock data for department reports
  const generateDepartmentStats = () => ({
    avgGPA: (3 + Math.random() * 1).toFixed(2),
    passRate: (85 + Math.random() * 15).toFixed(1),
    retentionRate: (80 + Math.random() * 15).toFixed(1),
    topPerformers: Math.floor(10 + Math.random() * 15),
    strugglingStudents: Math.floor(5 + Math.random() * 10),
    coursePerformance: [
      { courseName: `${department.substring(0, 3).toUpperCase()}101`, avgGrade: (3 + Math.random()).toFixed(1), passRate: (88 + Math.random() * 10).toFixed(1) },
      { courseName: `${department.substring(0, 3).toUpperCase()}201`, avgGrade: (2.7 + Math.random()).toFixed(1), passRate: (82 + Math.random() * 12).toFixed(1) },
      { courseName: `${department.substring(0, 3).toUpperCase()}301`, avgGrade: (2.9 + Math.random()).toFixed(1), passRate: (85 + Math.random() * 10).toFixed(1) }
    ],
    gradeDistribution: {
      A: Math.floor(15 + Math.random() * 20),
      B: Math.floor(30 + Math.random() * 20),
      C: Math.floor(15 + Math.random() * 15),
      D: Math.floor(5 + Math.random() * 10),
      F: Math.floor(2 + Math.random() * 5)
    }
  })
  
  // If no specific department is selected, return data for all departments
  if (!department || department === 'All Departments') {
    return {
      departmentName: 'All Departments',
      ...generateDepartmentStats()
    }
  }
  
  return {
    departmentName: department,
    ...generateDepartmentStats()
  }
}