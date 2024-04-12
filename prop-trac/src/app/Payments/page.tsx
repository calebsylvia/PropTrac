'use client'
import React, { useState } from 'react'
import SideNav from '../Components/SideNav'
import PieChartComponent from '../Components/PieChartComponent'
import {Table, TableHeader, TableBody, TableHead, TableRow} from '@/components/ui/table'

const Payments = () => {

  const [manager, setManager] = useState<string>("Baleb")
  const [active, setActive] = useState<number>(20)
  return (
    <>
    <SideNav/>
    <div className='bg-[#FEFFF6] w-screen h-screen'>
        <div className='ml-60'>
              <div className='flex justify-evenly pt-6'>
                <div className='bg-white rounded-xl border-black border-2 w-1/2 h-[300px] my-auto text-2xl pl-5 pt-12 space-y-10'>
                    <p>{`Manager: ${manager}`}</p>
                    <p>{`Active Tenants: ${active}`}</p>
                    <p>Stripe Dashboard:<a href='#'>url.com</a></p>
                </div>
                <div className='h-96 w-2/5 mx-auto ml-40'>
                  <PieChartComponent/>
                </div>
              </div>
              <div className='bg-white rounded-xl border-black border-2 w-11/12 h-[400px] overflow-y-auto'>
              <Table>   
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[250px]'>Tenant</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead className='w-[250px]'>Due By</TableHead>
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
        </div>
    </div>
    </>
  )
}

export default Payments