'use client'
import React, { useEffect, useState } from 'react'
import './properties.css'
import SideNav from '../Components/SideNav'
import { MagnifyingGlass, PlusSquare } from '@phosphor-icons/react'
import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from '@/components/ui/table'
import { IProperties } from '@/Interfaces/Interfaces'
import { getProperties } from '@/Utils/DataService'

const Properties = () => {

  const [properties, setProperties] = useState<IProperties[]>([])

  useEffect(() => {
      const getPropertyList = async() => {
        let id = localStorage.getItem("ID")
        let props = await getProperties(parseInt(id!))
        console.log(props)
        setProperties(props)
      }

      getPropertyList()
  }, [])
  
  return (
    <>
    <SideNav/>
      <div className='bg-[#FEFFF6] w-screen h-screen'>
          <div className='ml-52'>
            <div className='flex justify-end pt-5 pr-10'>
              <div className='relative w-72 '>
              <input type="search" className='w-72 h-10 border-0 rounded-xl bg-gray-200 text-sm' placeholder='Search Properties'/>
              <MagnifyingGlass className='absolute top-[10px] right-3 opacity-65' size={20} />
            </div>
            </div>

            <div className='mt-10 min-h-[650px] w-11/12'>
                <Table>   
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[250px]'>Property</TableHead>
                      <TableHead className='w-[150px]'>Property ID</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Rooms</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                      {
                        properties && properties.map((prop, idx) => 
                            <TableRow key={idx}>
                                <TableCell>
                                  <p>{`${prop.houseNumber} ${prop.street}`}</p>
                                  <p className='text-xs'>{`${prop.city}, ${prop.state} ${prop.zip}`}</p>
                                </TableCell>
                                <TableCell>{prop.id}</TableCell>
                                <TableCell>{`$${prop.houseRent}`}</TableCell>
                                <TableCell>{prop.houseOrRoomType}</TableCell>
                                <TableCell>{prop.rooms}</TableCell>
                                <TableCell><p className={`${prop.tenantAssigned ? 'bg-red-400 rounded-xl' : 'bg-green-300 w-10 rounded-xl'} w-16 h-7 text-center pt-1`}>{prop.tenantAssigned ? 'Booked' : 'Vacant'}</p></TableCell>
                                <TableCell><a className='underline text-[#4E8AFF] hover:cursor-pointer'>Details</a></TableCell>
                            </TableRow>
                        )
                      }
                  </TableBody>
                </Table>
            </div>

            <button className='flex pt-10'>
              <PlusSquare size={32} />
              <p className='my-auto'>Add Property</p>
            </button>
          </div>
      </div>
    </>
  )
}

export default Properties