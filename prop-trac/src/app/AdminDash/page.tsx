'use client'
import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import downGreen from '@/app/Assets/downGreen.png'
import downRed from '@/app/Assets/downRed.png'
import upGreen from '@/app/Assets/upGreen.png'
import upRed from '@/app/Assets/upRed.png'
import house from '@/app/Assets/propHouse.png'
import BarChartComponent from '../Components/BarChartComponent'
import SideNav from '../Components/SideNav'
import { IMaintenance, IProfOrLoss, IPropStats } from '@/Interfaces/Interfaces'
import { checkToken, getListingStats, getMaintenance, getMonthly } from '@/Utils/DataService'

const AdminDash = () => {

  let iD;

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

  const router = useRouter()
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if(!checkToken()){
    router.push('/')
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      iD = localStorage.getItem("ID")
      setId(parseInt(iD!))
    }
  },[])

  useEffect(() => {

    const getPropStats = async (userId: number) => {
      const propStats: IPropStats = await getListingStats(userId);
      setActiveTenants(propStats.activeTenants)
      setOpenListing(propStats.openListings)
      setPropertyCount(propStats.properties)
      setName(propStats.firstName)
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
      <div className='hidden lg:block'>
        <SideNav/>
      </div>
      <div className='block lg:hidden'>

      </div>
      <div className='bg-[#FEFFF6] w-screen h-screen'>
        <div className='w-3/4 lg:w-2/3 max-lg:mx-auto lg:ml-56'>
          <div className='flex justify-between items-baseline pt-12 pb-9'>
            <p className='text-3xl'>{`Welcome, ${name}!`}</p>
            <p className='text-lg text-[#5A5A5A]'>{formattedDate}</p>
          </div>
          {/* Chart */}
          <div className='w-full h-3/5 bg-white border-black border-2 rounded-2xl px-8 py-4'>
            <BarChartComponent />
          </div>

          <div className='grid grid-cols-3 grid-flow-row gap-3 lg:gap-6 pt-6 pb-20 h-96 lg:h-[675px]'>
            <div className='row-span-4 lg:row-span-2 bg-white border-black border-2 rounded-2xl'>
              <p className='text-center text-base lg:text-xl pt-3 pb-5'>Maintenance Request:</p>
              <div>
                {
                  mainReqArr && mainReqArr.map((req, idx) =>
                    <div className='max-lg:text-xs py-2 lg:py-3 mx-2 lg:mx-10' key={idx}>
                      <div className='flex justify-between'>
                        <p>{`Property ID: ${req.propertyInfoID}`}</p>
                        <p>{req.status}</p>
                      </div>
                      <div className='flex justify-between pb-2 lg:pb-3'>
                        <p>{req.category}</p>
                        <p>{req.priority}</p>
                      </div>
                      <hr className='mx-auto border-gray-400' />
                    </div>

                  )
                }
              </div>
            </div>
            <div className='bg-white border-black border-2 rounded-2xl max-lg:row-span-2'>
              <p className='pl-5 pt-2'>Monthly Profit:</p>
              <div className='flex justify-center max-lg:pt-7 lg:py-6 pl-5'>
                <p className='text-4xl lg:text-5xl text-center'>{`$${profit}`}</p>
                <Image className='my-auto' src={profArrow} alt='Profit Arrow Indicator' />
              </div>
            </div>
            <div className='row-span-4 lg:row-span-2 bg-white border-black border-2 rounded-2xl'>
              <Image className='max-lg:w-32 mx-auto pb-3 pt-2' src={house} alt='White house with Red Roof' />
              <hr className='w-5/6 mx-auto border-gray-400 py-1 lg:py-3' />
              <div className='grid grid-flow-row grid-col-2 lg:flex lg:justify-evenly'>
                <div className='text-center'>
                  <p className='max-lg:text-sm'>Active Tenants</p>
                  <p className='font-semibold text-xl'>{activeTenants}</p>
                </div>
                <div className='text-center'>
                  <p className='max-lg:text-sm'>Open Listings</p>
                  <p className='font-semibold text-xl'>{openListing}</p>
                </div>
                <div className='text-center'>
                  <p className='max-lg:text-sm'>Properties</p>
                  <p className='font-semibold text-xl'>{propertyCount}</p>
                </div>
              </div>
            </div>
            <div className='bg-white border-black border-2 rounded-2xl max-lg:row-span-2'>
              <p className='pl-5 pt-2'>Monthly Expenses:</p>
              <div className='flex justify-center max-lg:pt-7 lg:py-6 pl-5'>
                <p className='text-4xl lg:text-5xl text-center'>{`$${expenses}`}</p>
                <Image className='my-auto' src={expArrow} alt='Expense Arrow Indicator' />
              </div>
            </div>
            <div className='col-span-3 h-[250px]'>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDash