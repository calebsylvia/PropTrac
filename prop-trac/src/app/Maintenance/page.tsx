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
            <div className='lg:ml-52 pt-20 w-3/4'>
                <div className='bg-white border-2 border-black rounded-xl grid grid-cols-3'>
                    <div>

                    </div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
                <div className='bg-[#EEE2D1] rounded-xl py-5 px-4'>
                    <div className='bg-white rounded-xl w-72 h-36'>
                      
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Maintenance