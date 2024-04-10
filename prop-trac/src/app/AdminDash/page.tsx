'use client'
import Image, { StaticImageData } from 'next/image'
import React, { useState } from 'react'
import downGreen from '@/app/Assets/downGreen.png'
import downRed from '@/app/Assets/downRed.png'
import upGreen from '@/app/Assets/upGreen.png'
import upRed from '@/app/Assets/upRed.png'
import house from '@/app/Assets/propHouse.png'
import BarChartComponent from '../Components/BarChartComponent'
import SideNav from '../Components/SideNav'

const AdminDash = () => {

  const [name, setName] = useState<string>("Caleb")
  const [profit, setProfit] = useState<number>(0)
  const [expenses, setExpenses] = useState<number>(0)
  const [profArrow, setProfArrow] = useState<string | StaticImageData>(upGreen)
  const [expArrow, setExpArrow] = useState<string | StaticImageData>(upRed)
  const [activeTenants, setActiveTenants] = useState<number>(3)
  const [openListing, setOpenListing] = useState<number>(5)
  const [propertyCount, setPropertyCount] = useState<number>(7)

  return (
    <>
      <SideNav/>
      <div className='bg-[#FEFFF6] w-screen h-screen'>
          <div className='w-3/4 ml-52'>
          <p className='text-5xl'>{`Welcome, ${name}`}</p>
          {/* Chart */}
          <div className='w-full h-[400px] bg-white border-black border-2 rounded-2xl flex pl-8 py-4'>
            <BarChartComponent/>
          </div>

          <div className='grid grid-cols-3 grid-flow-row gap-6 pt-6 pb-20 h-[675px]'>
              <div className='row-span-3 bg-white border-black border-2 rounded-2xl'>
                  <p className='text-center text-xl pt-3'>Maintenance Request:</p>
                  <div>

                  </div>
              </div>
              <div className='bg-white border-black border-2 rounded-2xl'>
                  <p className='pl-5 pt-2'>Monthly Profit:</p>
                  <div className='flex justify-center py-4 pl-5'>
                    <p className='text-6xl text-center'>{`$${profit}`}</p>
                    <Image className='my-auto' src={profArrow} alt='Profit Arrow Indicator'/>
                  </div>
              </div>
              <div className='row-span-2 bg-white border-black border-2 rounded-2xl'>
                    <Image className='mx-auto pb-3' src={house} alt='White house with Red Roof'/>
                    <hr className='w-5/6 mx-auto border-black pb-4'/>
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
                    <p className='text-6xl text-center'>{`$${expenses}`}</p>
                    <Image className='my-auto' src={expArrow} alt='Expense Arrow Indicator'/>
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