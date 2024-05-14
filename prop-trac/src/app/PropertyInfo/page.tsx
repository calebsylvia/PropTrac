'use client'
import React, { useState, useEffect, useContext } from 'react'
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
import { useSearchParams } from 'next/navigation'
import { IProperties, RoomsList } from '@/Interfaces/Interfaces'
import TopNav from '../Components/TopNav'


const PropertyInfo = () => {

  
  const [image, setImage] = useState<string | StaticImageData>(test)
  const [address, setAddress] = useState<string>('')
  const [cityState, setCityState] = useState<string>('')
  const [income, setIncome] = useState<number>(0)
  const [expenses, setExpenses] = useState<number>(500)
  const [profit, setProfit] = useState<number>(500)
  const [rooms, setRooms] = useState<number>(3)
  const [baths, setBaths] = useState<number>(2.5)
  const [sqft, setSqft] = useState<number>(1000)
  const [description, setDescription] = useState<string>('A random description of absolutely nothing just to fill up space so I can adjust the design of it')
  const [featsAmen, setFeatsAmen] = useState<string[]>([])
  const [roomCost, setRoomCost] = useState<RoomsList[] | null[]>([])
  
  const [lat, setLat] = useState<number>(0)
  const [lng, setLng] = useState<number>(0)

  const router = useRouter()
  const searchParams = useSearchParams()

  let total: number = 0;

  const handleBack = () => {
    router.push('/Properties')
  }

  useEffect(() => {
    console.log(JSON.parse(searchParams.get('propInfo')!))
    const propData: IProperties[] = JSON.parse(searchParams.get("propInfo")!)

    const feats = propData[0].amenFeatList.split(', ')
    const roomArr = propData.map((room) => room.roomRent)
    console.log(roomArr)

    if(roomArr && roomArr.length > 0){
      for(let i = 0; i < roomArr.length; i++){
        total += roomArr[i]!
      }
      setIncome(total)
    }else{
    setIncome(propData[0].houseRent)
    }

    setAddress(`${propData[0].houseNumber} ${propData[0].street}`)
    setCityState(`${propData[0].city}, ${propData[0].state} ${propData[0].zip}`)
    setRooms(propData[0].rooms)
    setBaths(propData[0].baths)
    setDescription(propData[0].description)
    setSqft(propData[0].sqft)
    setFeatsAmen(feats)
    setRoomCost(roomArr)
    setExpenses(propData[0].houseRent)
    setProfit(income - expenses)
  },[income])

  useEffect(() => {
    console.log(income)
  },[])

  return (
    <>
    <div className='hidden lg:block'>
    <SideNav/>
    </div>
    <div className='block lg:hidden'>
      <TopNav/>
    </div>
      <div className='bg-[#FEFFF6] w-screen h-screen'>
        <div className='lg:ml-52 pt-6'>
          <button className='flex max-lg:pl-4 pb-5' onClick={handleBack}>
            <CaretCircleLeft size={36} weight="fill" />
            <p className='my-auto'>Back to Properties</p>
          </button>
          <div className='flex max-md:flex-col max-lg:justify-center md:space-x-6 max-lg:mx-auto xl:space-x-12'>
            <div className='w-11/12 max-md:mx-4 md:w-2/5'>
              <div className='pb-8 xl:pb-16'>
                <Image src={image} alt='Property Image' className='lg:w-11/12 xl:w-4/5 max-h-[200px] mb-3 rounded-xl shadow-[0_5px_5px_2px_rgba(60,60,60,0.4)]'/>
                <p className='font-semibold text-lg'>{address}</p>
                <p className='text-sm'>{cityState}</p>
              </div>
              <div className='bg-white border-black border-2 rounded-xl w-full md:w-4/5 xl:w-3/5'>
                  <div className='py-2'>
                    <p className='pl-2 xl:pt-1'>Active Income:</p>
                    <div className='flex justify-center pb-3'>
                      <p className='text-3xl xl:text-4xl'>{`$${income}`}</p>
                      <Image className='my-auto' src={upGreen} alt='Up Arrow'/>
                    </div>
                  </div>
                  <hr className='w-5/6 mx-auto'/>
                  <div className='py-2'>
                  <p className='pl-2 pt-1'>Total Expenses:</p>
                    <div className='flex justify-center pb-3'>
                      <p className='text-3xl xl:text-4xl'>{`$${expenses}`}</p>
                      <Image className='my-auto' src={downRed} alt='Up Arrow'/>
                    </div>
                  </div>
                  <hr className='w-5/6 mx-auto'/>
                  <div className='py-2'>
                  <p className='pl-2 pt-1'>Net Profit:</p>
                    <div className='flex justify-center pb-3'>
                      <p className='text-3xl xl:text-4xl'>{`$${profit}`}</p>
                      <Image className='my-auto' src={upGreen} alt='Up Arrow'/>
                    </div>
                  </div>
              </div>
              <div className='flex max-md:mx-auto justify-between w-11/12 xl:w-4/5 pt-6 md:pt-10 max-md:pb-5'>
              <button className='flex bg-[#E5E5E5] px-3 py-2 rounded-xl'>
                <NotePencil size={24} className='my-auto mr-1'/>
                <p className='my-auto text-xs lg:text-sm xl:text-base'>Edit Property</p>
              </button>
              <button className='flex bg-[#DD7575] px-3 py-2 rounded-xl'>
                <Trash size={24} className='my-auto mr-1'/>
                <p className='my-auto text-xs lg:text-sm xl:text-base'>Delete Property</p>
              </button>
            </div>
            </div>

            <div className='bg-[#EEE2D1] rounded-xl w-11/12 md:w-1/2 xl:w-[45%] max-md:mx-auto max-md:mb-5'>
                <div className='bg-white border-black border-2 rounded-xl w-11/12 md:w-5/6 mx-auto mb-5 md:mb-10 xl:mb-8 mt-5 md:mt-10 min-h-80 xl:min-h-96'>
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
                  <div className='mx-5 py-6'>
                    <p className='max-lg:text-sm'>Description:</p>
                    <p className='text-xs lg:text-sm pl-2 lg:pb-5 xl:pb-0'>{description}</p>
                  </div>

                  <div className='ml-5 flex justify-between'>
                      <div>
                        <p className='max-lg:text-sm'>Features and Amenities:</p>
                          <ul className='list-disc pl-5 pt-1 overflow-y-auto text-xs xl:text-sm'>
                            {
                              featsAmen && featsAmen.map((feat, idx) => 
                              <li key={idx}>{feat}</li>) 
                            }
                          </ul>
                      </div>
                      <div>
                        <p className='max-lg:text-sm'>Costs:</p>
                      
                      <div className='flex flex-col pl-2 text-xs xl:text-sm mr-6 lg:mr-5 xl:mr-24'>
                          {
                            roomCost.length > 1 ? roomCost.map((room, idx) => 
                            <div key={idx}>
                                <p>{`Room ${idx+1}: $${room}`}</p>
                            </div>
                            )
                            :
                            <div>
                              <p>{`Rent: $${income}`}</p>
                            </div>
                          }
                      </div>
                      </div>
                  </div>
                </div>
                <div className='border-black border-2 w-11/12 max-md:mb-5 md:w-5/6 h-[200px] mx-auto'>
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