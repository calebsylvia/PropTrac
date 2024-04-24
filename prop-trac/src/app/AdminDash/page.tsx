'use client'
import Image, { StaticImageData } from 'next/image'
import React, { useEffect, useState } from 'react'
import downGreen from '@/app/Assets/downGreen.png'
import downRed from '@/app/Assets/downRed.png'
import upGreen from '@/app/Assets/upGreen.png'
import upRed from '@/app/Assets/upRed.png'
import house from '@/app/Assets/propHouse.png'
import BarChartComponent from '../Components/BarChartComponent'
import SideNav from '../Components/SideNav'
import { IMaintenance, IProfOrLoss, IPropStats } from '@/Interfaces/Interfaces'
import { getListingStats, getMaintenance, getMonthly } from '@/Utils/DataService'

const AdminDash = () => {

  const [id, setId] = useState<number>(1)
  const [name, setName] = useState<string>("Manager!")
  const [profit, setProfit] = useState<number>(0)
  const [expenses, setExpenses] = useState<number>(0)
  const [profArrow, setProfArrow] = useState<string | StaticImageData>(upGreen)
  const [expArrow, setExpArrow] = useState<string | StaticImageData>(upRed)
  const [activeTenants, setActiveTenants] = useState<number>(3)
  const [openListing, setOpenListing] = useState<number>(5)
  const [propertyCount, setPropertyCount] = useState<number>(7)
  const [mainReqArr, setMainReqArr] = useState<IMaintenance[]>([])

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let id = localStorage.getItem("ID")
      setId(parseInt(id!))
    }

    const getPropStats = async (userId: number) => {
      const propStats: IPropStats = await getListingStats(userId);
      setActiveTenants(propStats.activeTenants)
      setOpenListing(propStats.openListings)
      setPropertyCount(propStats.properties)
    }
    getPropStats(id)

    const getMainReq = async (userId: number) => {
      const mainReq = await getMaintenance(userId)

      setMainReqArr(mainReq)
      console.log(mainReqArr)
    }
    getMainReq(id)
  }, [])

  useEffect(() => {
    let month = new Date().getMonth()
    let year = new Date().getFullYear()
    let id = localStorage.getItem("ID")

    const getProfAndLoss = async (userId: number, month: number, year: number) => {
      const profAndLoss: IProfOrLoss = await getMonthly(userId, month, year)
      setProfit(profAndLoss.profitOrLossAmount)
      setExpenses(profAndLoss.expenseTotal)
    }

    getProfAndLoss(parseInt(id!), month, year)
  }, [])

  return (
    <>
      <SideNav />
      <div className='bg-[#FEFFF6] w-screen h-screen'>
        <div className='w-3/5 ml-80'>
          <div className='flex justify-between items-baseline pt-12 pb-9'>
            <p className='text-3xl'>{`Welcome, ${name}`}</p>
            <p className='text-lg text-[#5A5A5A]'>{formattedDate}</p>
          </div>
          {/* Chart */}
          <div className='w-full h-3/5 bg-white border-black border-2 rounded-2xl px-8 py-4'>
            <BarChartComponent />
          </div>

          <div className='grid grid-cols-3 grid-flow-row gap-6 pt-6 pb-20 h-[675px]'>
            <div className='row-span-3 bg-white border-black border-2 rounded-2xl'>
              <p className='text-center text-xl pt-3 pb-5'>Maintenance Request:</p>
              <div>
                {
                  mainReqArr && mainReqArr.map((req, idx) =>
                    <div className='py-3 mx-10' key={idx}>
                      <div className='flex justify-between'>
                        <p>{`Property ID: ${req.propertyInfoID}`}</p>
                        <p>{req.status}</p>
                      </div>
                      <div className='flex justify-between pb-3'>
                        <p>{req.category}</p>
                        <p>{req.priority}</p>
                      </div>
                      <hr className='mx-auto border-gray-400' />
                    </div>

                  )
                }
              </div>
              {/* <p className='underline text-[#A0B5EF] text-center  hover:cursor-pointer'>View all Requests</p> */}
            </div>
            <div className='bg-white border-black border-2 rounded-2xl'>
              <p className='pl-5 pt-2'>Monthly Profit:</p>
              <div className='flex justify-center py-4 pl-5'>
                <p className='text-5xl text-center'>{`$${profit}`}</p>
                <Image className='my-auto' src={profArrow} alt='Profit Arrow Indicator' />
              </div>
            </div>
            <div className='row-span-2 bg-white border-black border-2 rounded-2xl'>
              <Image className='mx-auto pb-3 pt-2' src={house} alt='White house with Red Roof' />
              <hr className='w-5/6 mx-auto border-gray-400 pb-4' />
              <div className='flex justify-evenly'>
                <div className='text-center'>
                  <p>Active Tenants</p>
                  <p className='font-semibold text-xl'>{activeTenants}</p>
                </div>
                <div className='text-center'>
                  <p>Open Listings</p>
                  <p className='font-semibold text-xl'>{openListing}</p>
                </div>
                <div className='text-center'>
                  <p>Properties</p>
                  <p className='font-semibold text-xl'>{propertyCount}</p>
                </div>
              </div>
            </div>
            <div className='bg-white border-black border-2 rounded-2xl'>
              <p className='pl-5 pt-2'>Monthly Expenses:</p>
              <div className='flex justify-center py-4 pl-5'>
                <p className='text-5xl text-center'>{`$${expenses}`}</p>
                <Image className='my-auto' src={expArrow} alt='Expense Arrow Indicator' />
              </div>
            </div>
            <div className='col-span-2 bg-white border-black border-2 rounded-2xl h-[250px]'>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDash