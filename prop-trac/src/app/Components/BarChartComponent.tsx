'use client'
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, Tooltip, Legend, Title, LinearScale, CategoryScale, BarElement } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { getPrevMonths, projectMonths } from '@/Utils/DataService'
import { IPrev } from '@/Interfaces/Interfaces'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

const BarChartComponent = () => {

   const [previous, setPrevious] = useState<IPrev[]>()
   const [next, setNext] = useState<IPrev[]>()
   const [current, setCurrent] = useState<boolean>(true)

   let monthArr: string[] = []


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
    let ID;

    const getMonth = (month: number, number: number) => {
        if(date + number < 0){
            return 12 + ((date + number) % 12)
        }else{
            return date + number
        }
    }

    useEffect(() => {
        if(typeof window !== undefined){
            ID = localStorage.getItem("ID")
        }else{
            ID = "1"
        }
    },[])

    

    useEffect(() => {

        let date = new Date().getMonth()
        let year = new Date().getFullYear()
        
        const getPrevious = async(userId: number, month: number, year: number) => {
            const data: IPrev[] = await getPrevMonths(userId, month, year)
            console.log(data)
            setPrevious(data)
        }

        const getNext = async(userId: number, month: number, year: number) => {
            const data: IPrev[] = await projectMonths(userId, month, year)
            console.log(data)
            setNext(data)
        }

        getPrevious(parseInt(ID!), date + 1, year)
        getNext(parseInt(ID!), date + 1, year)

        console.log(previous)
    }, [])


    const handlePrev = () => {
        setCurrent(true)
    }

    const handleNext = () => {
        setCurrent(false)
    }
    

    const data = {
        labels: current ? [months[getMonth(date, - 6)], months[getMonth(date, - 5)], months[getMonth(date, - 4)], months[getMonth(date, - 3)], months[getMonth(date, - 2)], months[getMonth(date, - 1)]] : [ months[getMonth(date, + 0)], months[getMonth(date, + 1)], months[getMonth(date, + 2)], months[getMonth(date, + 3)], months[getMonth(date, + 4)], months[getMonth(date, + 5)]],
        datasets: [
            {
                label: 'Money In',
                data: current ? previous && previous.map((mon) => mon.revenueTotal) : next && next.map((mon) => mon.revenueTotal),
                backgroundColor: 'rgb(141, 211, 148)'
            },
            {
                label: 'Money Out',
                data: current ? previous && previous.map((mon) => mon.expenseTotal) : next && next.map((mon) => mon.expenseTotal),
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
        },
        scales: {
            y: {
                suggestedMax: 3000
            }
        }
    }
  return (
    <>
            <Bar data={data} options={options}/>
            <div className='flex justify-between mt-5 mb-2'>
                <button className={`flex ${current ? 'text-transparent' : ''}`} onClick={handlePrev} disabled={current ? true : false}>
                    <CaretLeft size={24} weight="bold" />
                    <p className='my-auto text-sm'>Past 6 Months</p>
                </button>
                <button className={`flex ${current ? '' : 'text-transparent'}`} onClick={handleNext} disabled={current ? false : true}>
                    <p className='my-auto text-sm'>Projected 6 Months</p>
                    <CaretRight size={24} weight="bold" />
                </button>
            </div>
    </>
  );
};

export default BarChartComponent