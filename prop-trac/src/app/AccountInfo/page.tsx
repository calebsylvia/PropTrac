'use client'
import React, { useState } from 'react'
import SideNav from '../Components/SideNav'
import Image from 'next/image'
import houseInTrees from '@/app/Assets/Landscape nature.png'
import { MagnifyingGlass, NotePencil } from '@phosphor-icons/react'

const AccountInfo = () => {

  const [name, setName] = useState<string>("Markypoo")
  const [email, setEmail] = useState<string>("csprop@codestack.co")
  const [phone, setPhone] = useState<number>(0-0)
  const [role, setRole] = useState<boolean>(true)
  const [location, setLocation] = useState<string>("United States")
  const [propCount, setPropCount] = useState<number>(10)
  const [language, setLanguage] = useState<string | string[]>("English")

  

  return (
    <>
    <SideNav/>
      <div className='bg-[#FEFFF6] w-screen h-screen'>
      <p className='text-5xl py-8 ml-60'>Account Info</p>
          <div className='ml-60 flex justify-evenly text-xl'>
            <div className='w-2/3 h-full bg-white rounded-xl border-black border-2 space-y-8 pl-16 pr-52 py-10'>
                <p className=''>{`Name: ${name}`}</p>
                <p>{`Email: ${email}`}</p>
                <p>{`Phone: ${phone}`}</p>
                <div className='grid grid-cols-2 gap-20'>
                    <p>{`Role: ${role ? "Manager" : "N/A"}`}</p>
                    <p>{`Location: ${location}`}</p>
                </div>
                <div className='grid grid-cols-2 gap-20'> 
                    <p>{`Total Properties: ${propCount}`}</p>
                    <p>{`Language: ${language}`}</p>
                </div>
                <div className='pt-10'>
                  <button className='flex'>
                    <NotePencil size={32} />
                    <p className='my-auto pl-2'>Edit Profile</p>
                  </button>
                </div>
            </div>
            <div>
              <Image className='w-[500px]' src={houseInTrees} alt='House in the woods image'/>
            </div>
          </div>
          <div className='ml-60 mt-4 w-4/5 min-h-60 rounded-xl bg-white border-black border-2'>
              <div className='flex justify-between mx-4 pt-3'>
                <p className='text-xl'>Documentation</p>
                <div className='relative'>
                <input type='search' className='rounded-2xl border-0 bg-gray-200 h-10 w-56' placeholder='Search'/>
                <MagnifyingGlass className='absolute top-[5px] right-2 opacity-65' size={30} />
                </div>
              </div>
              <div className='overflow-x-auto'>
                  {
                    
                  }
                </div>
          </div>
      </div>
    </>
  )
}

export default AccountInfo