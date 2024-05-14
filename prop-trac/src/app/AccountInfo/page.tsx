'use client'
import React, { useEffect, useState } from 'react'
import SideNav from '../Components/SideNav'
import Image from 'next/image'
import houseInTrees from '@/app/Assets/Landscape nature.png'
import { MagnifyingGlass, Note, NotePencil } from '@phosphor-icons/react'
import TopNav from '../Components/TopNav'
import { getAccountInfo } from '@/Utils/DataService'
import { IAccount } from '@/Interfaces/Interfaces'

const AccountInfo = () => {

  const [userId, setUserId] = useState<number>(1)
  const [name, setName] = useState<string>("Markypoo")
  const [email, setEmail] = useState<string>("csprop@codestack.co")
  const [phone, setPhone] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const [location, setLocation] = useState<string>("United States")
  const [propCount, setPropCount] = useState<number>(10)
  const [language, setLanguage] = useState<string | string[]>("English")

  
  useEffect(() => {

    if(typeof window !== undefined){
      let id = localStorage.getItem("ID");

      setUserId(parseInt(id!))
    }
    const getAccount = async() => {
      const user: IAccount = await getAccountInfo(userId)
      setName(`${user.firstName} ${user.lastName}`)
      setEmail(user.email)
      setPhone(user.phone)
      setRole(user.role)
      setLocation(user.location)
      setLanguage(user.language)
    }
    getAccount()
  }, [])

  return (
    <>
    <div className='hidden lg:block'>
      <SideNav/>
    </div>
    <div className='block lg:hidden'>
      <TopNav/>
    </div>
      <div className='bg-[#FEFFF6] w-full h-full'>
      <p className='text-3xl lg:text-4xl py-8 ml-10 lg:ml-60'>Account Info</p>
          <div className='w-full lg:w-3/4 mx-auto lg:mx-0 lg:ml-60 flex justify-evenly text-xl'>
            <div className='w-11/12 md:w-full h-full mx-auto md:mx-10 lg:mx-0 bg-white rounded-xl border-black border-2 space-y-8 px-4 md:px-12 xl:pl-16 xl:pr-20 py-10 text-base lg:text-sm xl:text-base'>
                <p className=''>{`Name: ${name}`}</p>
                <p>{`Email: ${email}`}</p>
                <p>{`Phone: ${phone}`}</p>
                <div className='grid grid-cols-2 gap-0 md:gap-16 xl:gap-24'>
                    <p>{`Role: ${role}`}</p>
                    <p>{`Location: ${location}`}</p>
                </div>
                <div className='grid grid-cols-2 gap-0 md:gap-16 xl:gap-24'> 
                    <p>{`Total Properties: ${propCount}`}</p>
                    <p>{`Language: ${language}`}</p>
                </div>
                <div className='pt-10'>
                  <button className='flex'>
                    <NotePencil size={32} className='hidden xl:block'/>
                    <NotePencil size={20} className='block xl:hidden'/>
                    <p className='my-auto pl-2'>Edit Profile</p>
                  </button>
                </div>
            </div>
            <div className='w-full lg:flex justify-center hidden'>
              <Image className='w-[450px] m-auto' src={houseInTrees} alt='House in the woods image'/>
            </div>
          </div>
          <div className='mx-auto md:mx-10 lg:ml-60 mt-4 mb-5 w-11/12 md:w-[90%] lg:w-3/4 min-h-60 rounded-xl bg-white border-black border-2'>
              <div className='flex justify-between mx-4 pt-3'>
                <p className='text-lg lg:text-xl'>Documentation</p>
                <div className='relative'>
                <input type='search' className='rounded-2xl border-0 bg-gray-200 h-9 w-44 lg:h-10 lg:w-56' placeholder='Search'/>
                <MagnifyingGlass className='absolute top-1 lg:top-[5px] right-2 opacity-65' size={30} />
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