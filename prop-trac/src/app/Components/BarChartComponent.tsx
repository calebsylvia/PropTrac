'use client'
import React from 'react'
import { Chart as ChartJS, Tooltip, Legend, Title, LinearScale, CategoryScale, BarElement } from 'chart.js'
import { Bar } from 'react-chartjs-2'

const BarChartComponent = () => {



    ChartJS.register(
        Tooltip,
        Legend,
        Title,
        LinearScale,
        CategoryScale,
        BarElement
    )

    let months =['January', 'February', 'March', 'April','May', 'June', 'July', 'August','September', 'October', 'November', 'December'];
    let date = new Date().getMonth()

    const getMonth = (month: number, number: number) => {
        if(date + number < 0){
            return 12 + ((date + number) % 12)
        }else{
            return date + number
        }
    }

    const labels = [ months[getMonth(date, - 5)], months[getMonth(date, - 4)], months[getMonth(date, - 3)], months[getMonth(date, - 2)], months[getMonth(date, - 1)], months[getMonth(date, - 0)]]

    const data = {
        labels,
        datasets: [
            {
                label: 'Money In',
                data: labels.map(() => '0'),
                backgroundColor: 'rgb(141, 211, 148)'
            },
            {
                label: 'Money Out',
                data: labels.map(() => '0'),
                backgroundColor: 'rgb(222, 118, 118)'
            }
        ]
    }

    const options = {
        responsive: true,
        plugins:{
            title: {
                display: true,
                text: 'Property Revenue Overview',
                color: 'black',
                font: {
                    size: 18
                }
            },
            legend: {
                position: 'right' as const,
                labels: {
                    boxHeight: 30,
                    boxWidth: 30,
                    padding: 30,
                    font: {
                        size: 16
                    }
                }
            }
        }
    }
  return (
    <>
    <Bar data={data} options={options}/>
    </>
  )
}

export default BarChartComponent