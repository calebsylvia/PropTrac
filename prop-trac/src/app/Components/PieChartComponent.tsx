'use client'
import React, { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

const PieChartComponent = () => {

  const [due, setDue] = useState<number>(1)
  const [late, setLate] = useState<number>(1)
  const [paid, setPaid] = useState<number>(1)

  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ['Due', 'Late', 'Paid'],
    datasets: [{
      label: '# of Tenants',
      data: [`${due}`, `${late}`, `${paid}`],
      backgroundColor: [
          'rgb(187, 209, 228)',
          'rgb(183, 249, 181)',
          'rgb(226, 100, 100)'
      ]
    }]
  }

  const options = {
    responsive: true,
    plugins:{
        legend: {
            position: 'right' as const,
            labels: {
                boxHeight: 20,
                boxWidth: 20,
                padding: 15,
                font: {
                    size: 16
                }
            }
        }
    }
}
  return (
    <>
      <Pie data={data} options={options}/>
    </>
  )
}

export default PieChartComponent