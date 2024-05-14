'use client'
import React from 'react'
import SideNav from '../Components/SideNav'
import TopNav from '../Components/TopNav'

const Maintenance = () => {
  return (
    <>
    <div className='hidden lg:block'>
      <SideNav/>
    </div>
    <div className='block lg:hidden'>
      <TopNav/>
    </div>
         <div  className='bg-[#FEFFF6] w-full h-full'>

        </div>
    </>
  )
}

export default Maintenance