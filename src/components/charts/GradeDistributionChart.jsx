import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { getIcon } from '../../utils/iconUtils.js'
import { getGradeDistribution } from '../../data/analyticsData.js'

const GradeDistributionChart = ({ timeframe }) => {
  const [selectedView, setSelectedView] = useState('percentage')
  const InfoIcon = getIcon('Info')
  
  const gradeData = getGradeDistribution(timeframe)
  
  // Prepare data for the chart
  const grades = ['A', 'B', 'C', 'D', 'F']
  const data = selectedView === 'percentage' 
    ? gradeData.percentages 
    : gradeData.counts

  // Chart options
  const chartOptions = {
    chart: {
      type: 'pie',
      fontFamily: 'Inter, ui-sans-serif, system-ui',
      toolbar: {
        show: false
      }
    },
    labels: grades,
    colors: ['#10b981', '#3b82f6', '#f59e0b', '#f97316', '#ef4444'],
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return selectedView === 'percentage' 
          ? val.toFixed(1) + '%'
          : opts.w.globals.series[opts.seriesIndex]
      }
    },
    legend: {
      position: 'bottom',
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
    tooltip: {
      y: {
        formatter: function(value) {
          return selectedView === 'percentage' 
            ? value.toFixed(1) + '%'
            : value
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: 280
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    stroke: {
      width: 2,
      colors: ['#fff']
    }
  }

  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center">
          Grade Distribution
          <div className="group relative ml-2">
            <InfoIcon className="w-4 h-4 text-surface-400 cursor-help" />
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-surface-800 text-white text-xs p-2 rounded shadow-lg w-48">
              Distribution of grades across all courses for the selected time period.
            </div>
          </div>
        </h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setSelectedView('percentage')}
            className={`px-3 py-1 text-xs rounded-full ${selectedView === 'percentage' ? 'bg-primary text-white' : 'bg-surface-100 dark:bg-surface-700'}`}>Percentage</button>
          <button 
            onClick={() => setSelectedView('count')}
            className={`px-3 py-1 text-xs rounded-full ${selectedView === 'count' ? 'bg-primary text-white' : 'bg-surface-100 dark:bg-surface-700'}`}>Count</button>
        </div>
      </div>
      
      <ReactApexChart options={chartOptions} series={data} type="pie" height={350} />
    </div>
  )
}

export default GradeDistributionChart