'use client'
import React, { useState, useEffect } from 'react'
import SideNav from '../Components/SideNav'
import { Bathtub, Bed, CaretCircleLeft, NotePencil, Trash } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import Image, { StaticImageData } from 'next/image'
import downGreen from '@/app/Assets/downGreen.png'
import downRed from '@/app/Assets/downRed.png'
import upGreen from '@/app/Assets/upGreen.png'
import upRed from '@/app/Assets/upRed.png'
import MapComponent from '../Components/MapComponent'
import test from '@/app/Assets/bg.png'


const PropertyInfo = () => {

  const [image, setImage] = useState<string | StaticImageData>(test)
  const [address, setAddress] = useState<string>('')
  const [cityState, setCityState] = useState<string>('')
  const [income, setIncome] = useState<number>(1000)
  const [expenses, setExpenses] = useState<number>(500)
  const [profit, setProfit] = useState<number>(500)
  const [rooms, setRooms] = useState<number>(3)
  const [baths, setBaths] = useState<number>(2.5)
  const [sqft, setSqft] = useState<number>(1000)
  const [description, setDescription] = useState<string>('A random description of absolutely nothing just to fill up space so I can adjust the design of it')
  const [featsAmen, setFeatsAmen] = useState<string[]>()
  const [roomCost, setRoomCost] = useState<number[]>()
  
  const [lat, setLat] = useState<number>(0)
  const [lng, setLng] = useState<number>(0)

  const router = useRouter()

  const handleBack = () => {
    router.push('/Properties')
  }


  return (
    <>
      <SideNav/>
      <div className='bg-[#FEFFF6] w-screen h-screen'>
        <div className='ml-52 pt-6'>
          <button className='flex pb-5' onClick={handleBack}>
            <CaretCircleLeft size={36} weight="fill" />
            <p className='my-auto'>Back to Properties</p>
          </button>
          <div className='flex space-x-12'>
            <div className='w-2/5'>
              <div className='pb-16'>
                <Image src={image} alt='Property Image' className='w-4/5 max-h-[200px] mb-3 rounded-xl shadow-[0_5px_5px_2px_rgba(60,60,60,0.4)]'/>
                <p className='font-semibold text-lg'>123 Dreary Ln</p>
                <p className='text-sm'>Stockton, CA 95209</p>
              </div>
              <div className='bg-white border-black border-2 rounded-xl w-3/5'>
                  <div className='py-2'>
                    <p className='pl-2 pt-1'>Active Income:</p>
                    <div className='flex justify-center pb-3'>
                      <p className='text-4xl'>{`$${income}`}</p>
                      <Image className='my-auto' src={upGreen} alt='Up Arrow'/>
                    </div>
                  </div>
                  <hr className='w-5/6 mx-auto'/>
                  <div className='py-2'>
                  <p className='pl-2 pt-1'>Total Expenses:</p>
                    <div className='flex justify-center pb-3'>
                      <p className='text-4xl'>{`$${expenses}`}</p>
                      <Image className='my-auto' src={downRed} alt='Up Arrow'/>
                    </div>
                  </div>
                  <hr className='w-5/6 mx-auto'/>
                  <div className='py-2'>
                  <p className='pl-2 pt-1'>Net Profit:</p>
                    <div className='flex justify-center pb-3'>
                      <p className='text-4xl'>{`$${profit}`}</p>
                      <Image className='my-auto' src={upGreen} alt='Up Arrow'/>
                    </div>
                  </div>
              </div>
              <div className='flex justify-between w-4/5 pt-10'>
              <button className='flex bg-[#E5E5E5] px-2 py-1 rounded-xl'>
                <NotePencil size={28} />
                <p className='my-auto'>Edit Property</p>
              </button>
              <button className='flex bg-[#DD7575] px-2 py-1 rounded-xl'>
                <Trash size={28} />
                <p className='my-auto'>Delete Property</p>
              </button>
            </div>
            </div>

            <div className='bg-[#EEE2D1] rounded-xl w-[45%]'>
                <div className='bg-white border-black border-2 rounded-xl w-5/6 mx-auto mb-8 mt-10 min-h-96'>
                  <div className='flex justify-between pt-5 mx-5'>
                      <div>
                          <p>Room(s):</p>
                          <div className='flex justify-center'>
                              <p>{rooms}</p>
                              <Bed className='my-auto pl-1' size={20} />
                          </div>
                      </div>
                      <div>
                          <p>Bath(s):</p>
                          <div className='flex justify-center'>
                              <p>{baths}</p>
                              <Bathtub className='my-auto pl-1' size={20} />
                          </div>
                      </div>
                      <div>
                          <p>Sqaure Ft:</p>
                          <div className='text-center'>
                              <p>{sqft}</p>
                          </div>
                      </div>
                  </div>
                  <div className='mx-5 py-5'>
                    <p>Description:</p>
                    <p className='text-sm pl-2'>{description}</p>
                  </div>

                  <div className='mx-5 flex justify-between'>
                      <div>
                        <p>Features and Amenities:</p>
                          <ul>
                            {

                            }
                          </ul>
                      </div>
                      <div>
                        <p>Costs:</p>
                      </div>
                      <div>
                          {

                          }
                      </div>
                  </div>
                </div>
                <div className='border-black border-2 w-5/6 h-[200px] mx-auto'>
                  <MapComponent lat={lat} lng={lng}/>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PropertyInfo