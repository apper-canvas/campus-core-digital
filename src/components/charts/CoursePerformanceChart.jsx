import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { getIcon } from '../../utils/iconUtils.js'
import { getCoursePerformance } from '../../data/analyticsData.js'

const CoursePerformanceChart = ({ timeframe }) => {
  const [selectedMetric, setSelectedMetric] = useState('avgGrade')
  const InfoIcon = getIcon('Info')
  
  const data = getCoursePerformance(timeframe)
  
  // Prepare data for the chart
  const courseData = {
    courses: data.map(item => item.courseName),
    avgGrade: data.map(item => item.avgGrade),
    passRate: data.map(item => item.passRate)
  }

  // Chart options
  const chartOptions = {
    chart: {
      type: 'bar',
      fontFamily: 'Inter, ui-sans-serif, system-ui',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '70%',
        borderRadius: 6,
        dataLabels: {
          position: 'top',
        },
      }
    },
    colors: selectedMetric === 'avgGrade' 
      ? ['#4f46e5'] // primary color for avg grade
      : ['#0ea5e9'], // secondary color for pass rate
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return selectedMetric === 'avgGrade' 
          ? val.toFixed(1)
          : val.toFixed(1) + '%'
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, ui-sans-serif, system-ui',
        fontWeight: 'medium',
        colors: ["#64748b"]
      }
    },
    xaxis: {
      categories: courseData.courses,
      position: 'bottom',
      labels: {
        style: {
          colors: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#64748b',
          fontFamily: 'Inter, ui-sans-serif, system-ui',
        },
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return selectedMetric === 'avgGrade' 
            ? val.toFixed(1)
            : val.toFixed(0) + '%'
        },
        style: {
          colors: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#64748b',
          fontFamily: 'Inter, ui-sans-serif, system-ui',
        },
      },
    },
    grid: {
      borderColor: document.documentElement.classList.contains('dark') ? '#334155' : '#e2e8f0',
    }
  }

  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center">
          Course Performance
          <div className="group relative ml-2">
            <InfoIcon className="w-4 h-4 text-surface-400 cursor-help" />
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-surface-800 text-white text-xs p-2 rounded shadow-lg w-48">
              Comparison of student performance across different courses.
            </div>
          </div>
        </h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setSelectedMetric('avgGrade')}
            className={`px-3 py-1 text-xs rounded-full ${selectedMetric === 'avgGrade' ? 'bg-primary text-white' : 'bg-surface-100 dark:bg-surface-700'}`}>Avg. Grade</button>
          <button 
            onClick={() => setSelectedMetric('passRate')}
            className={`px-3 py-1 text-xs rounded-full ${selectedMetric === 'passRate' ? 'bg-secondary text-white' : 'bg-surface-100 dark:bg-surface-700'}`}>Pass Rate</button>
        </div>
      </div>
      
      <ReactApexChart options={chartOptions} series={[{ name: selectedMetric === 'avgGrade' ? 'Average Grade' : 'Pass Rate', data: selectedMetric === 'avgGrade' ? courseData.avgGrade : courseData.passRate }]} type="bar" height={350} />
    </div>
  )
}

export default CoursePerformanceChart