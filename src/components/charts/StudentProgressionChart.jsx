import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { getIcon } from '../../utils/iconUtils.js'
import { getStudentProgression } from '../../data/analyticsData.js'

const StudentProgressionChart = ({ timeframe }) => {
  const [selectedData, setSelectedData] = useState('all')
  
  const InfoIcon = getIcon('Info')
  const FilterIcon = getIcon('Filter')
  
  const progressionData = getStudentProgression(timeframe)
  
  // Chart series based on selected data
  const series = selectedData === 'all' 
    ? [
        {
          name: 'Honors',
          data: progressionData.honors
        },
        {
          name: 'Regular',
          data: progressionData.regular
        },
        {
          name: 'At Risk',
          data: progressionData.atRisk
        }
      ]
    : [
        {
          name: selectedData.charAt(0).toUpperCase() + selectedData.slice(1),
          data: progressionData[selectedData]
        }
      ]
      
  // Chart options
  const chartOptions = {
    chart: {
      type: 'area',
      fontFamily: 'Inter, ui-sans-serif, system-ui',
      toolbar: {
        show: false
      },
      stacked: false,
    },
    colors: ['#10b981', '#3b82f6', '#f97316'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.1,
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      fontFamily: 'Inter, ui-sans-serif, system-ui',
      fontSize: '14px',
      labels: {
        colors: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#334155'
      },
      markers: {
        width: 12,
        height: 12,
        radius: 6
      },
      itemMargin: {
        horizontal: 10
      }
    },
    xaxis: {
      categories: progressionData.semesters,
      labels: {
        style: {
          colors: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#64748b',
          fontFamily: 'Inter, ui-sans-serif, system-ui',
        },
      },
    },
    yaxis: {
      title: {
        text: 'GPA',
        style: {
          fontFamily: 'Inter, ui-sans-serif, system-ui',
          fontWeight: 500,
          color: document.documentElement.classList.contains('dark') ? '#cbd5e1' : '#64748b'
        }
      },
      labels: {
        formatter: function (val) {
          return val.toFixed(1)
        },
        style: {
          colors: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#64748b',
          fontFamily: 'Inter, ui-sans-serif, system-ui',
        },
      },
    },
    grid: {
      borderColor: document.documentElement.classList.contains('dark') ? '#334155' : '#e2e8f0',
    },
    tooltip: {
      y: {
        formatter: function(value) {
          return value.toFixed(2) + ' GPA'
        }
      }
    }
  }

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <h3 className="text-lg font-bold flex items-center">
          Student Progression Through Curriculum
          <div className="group relative ml-2">
            <InfoIcon className="w-4 h-4 text-surface-400 cursor-help" />
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-surface-800 text-white text-xs p-2 rounded shadow-lg w-60 z-10">
              Shows how different student groups progress through their academic journey over time, measured by GPA.
            </div>
          </div>
        </h3>
        
        <div className="flex items-center">
          <FilterIcon className="w-4 h-4 mr-2 text-surface-500" />
          <select 
            value={selectedData}
            onChange={(e) => setSelectedData(e.target.value)}
            className="input py-1 px-3 !text-sm w-auto"
          >
            <option value="all">All Students</option>
            <option value="honors">Honors Students</option>
            <option value="regular">Regular Students</option>
            <option value="atRisk">At-Risk Students</option>
          </select>
        </div>
      </div>
      
      <div className="mt-2">
        <div className="bg-surface-50 dark:bg-surface-800 p-3 rounded-lg mb-4 text-sm text-surface-600 dark:text-surface-400">
          <strong>Note:</strong> This chart displays the average GPA progression of different student segments across semesters. 
          {selectedData === 'all' ? 
            ' Compare how honors, regular, and at-risk students perform over time.' : 
            ` Currently showing data for ${selectedData.charAt(0).toUpperCase() + selectedData.slice(1)} students.`}
        </div>
        
        <ReactApexChart options={chartOptions} series={series} type="area" height={380} />
      </div>
    </div>
  )
}

export default StudentProgressionChart