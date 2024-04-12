'use client'
import React from 'react'
import './properties.css'
import SideNav from '../Components/SideNav'
import { MagnifyingGlass, PlusSquare } from '@phosphor-icons/react'
import {Table, TableHeader, TableBody, TableHead, TableRow} from '@/components/ui/table'

const Properties = () => {
  return (
    <>
    <SideNav/>
      <div className='bg-[#FEFFF6] w-screen h-screen'>
          <div className='ml-60'>
            <div className='flex justify-end pt-5 pr-10'>
              <div className='relative w-72 '>
              <input type="search" className='w-72 h-10 border-0 rounded-xl bg-gray-200' placeholder='Search Properties'/>
              <MagnifyingGlass className='absolute top-[5px] right-2 opacity-65' size={30} />
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