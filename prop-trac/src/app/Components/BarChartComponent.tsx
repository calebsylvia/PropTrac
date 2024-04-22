'use client'
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, Tooltip, Legend, Title, LinearScale, CategoryScale, BarElement } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { getPrevMonths, projectMonths } from '@/Utils/DataService'
import { IPrev, PrevArr } from '@/Interfaces/Interfaces'

const BarChartComponent = () => {

   const [previous, setPrevious] = useState<IPrev []>([])
   const [next, setNext] = useState<IPrev []>([])



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
    let year = new Date().getFullYear()
    let ID = localStorage.getItem("ID")

    const getMonth = (month: number, number: number) => {
        if(date + number < 0){
            return 12 + ((date + number) % 12)
        }else{
            return date + number
        }
    }

    

    useEffect(() => {

        let date = new Date().getMonth()
        let year = new Date().getFullYear()
        let ID = localStorage.getItem("ID")
        
        const getPrevious = async(userId: number, month: number, year: number) => {
            const data = await getPrevMonths(userId, month, year)
            console.log(data)
            setPrevious(data)
        }

        const getNext = async(userId: number, month: number, year: number) => {
            const data = await projectMonths(userId, month, year)
            console.log(data)
            setNext(data)
        }

        getPrevious(parseInt(ID!), date, year)
        getNext(parseInt(ID!), date, year)

        console.log(previous)
    }, [])



    const labels = [ months[getMonth(date, - 6)], months[getMonth(date, - 5)], months[getMonth(date, - 4)], months[getMonth(date, - 3)], months[getMonth(date, - 2)], months[getMonth(date, - 1)]]

    const data = {
        labels: [ months[getMonth(date, - 6)], months[getMonth(date, - 5)], months[getMonth(date, - 4)], months[getMonth(date, - 3)], months[getMonth(date, - 2)], months[getMonth(date, - 1)]],
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