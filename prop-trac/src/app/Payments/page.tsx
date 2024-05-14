'use client'
import React, { useEffect, useState } from 'react'
import SideNav from '../Components/SideNav'
import PieChartComponent from '../Components/PieChartComponent'
import {Table, TableHeader, TableBody, TableHead, TableRow} from '@/components/ui/table'
import { checkToken } from '@/Utils/DataService'
import { useRouter } from 'next/navigation'
import TopNav from '../Components/TopNav'

const Payments = () => {

  const [manager, setManager] = useState<string>("Baleb")
  const [active, setActive] = useState<number>(20)

  const router = useRouter()

  
  useEffect(() => {
    if(typeof window !== undefined){
      if(!checkToken()){
        router.push('/')
      }
    }
  },[])

  
  return (
    <>
   <div className='hidden lg:block'>
      <SideNav/>
   </div>
   <div className='block lg:hidden'>
      <TopNav/>
   </div>
    <div className='bg-[#FEFFF6] w-full h-full'>
        <div className='w-5/6 mx-auto lg:ml-60'>
              <div className='flex justify-evenly h-1/3 pt-6'>
                <div className='bg-white rounded-xl border-black border-2 w-2/3 lg:w-1/2 h-[200px] lg:h-[300px] my-auto text-xl lg:text-2xl pl-5 pt-2 lg:pt-12 space-y-10'>
                    <p>{`Manager: ${manager}`}</p>
                    <p>{`Active Tenants: ${active}`}</p>
                    <p>Stripe Dashboard:<a href='#'>url.com</a></p>
                </div>
                <div className='lg:h-96 w-2/5 flex items-center ml-10 lg:ml-20 xl:ml-40 mt-3 lg:mt-0'>
                  <PieChartComponent/>
                </div>
              </div>
              <div className='bg-white rounded-xl border-black border-2 w-full mb-10 lg:w-11/12 h-[400px] overflow-y-auto'>
              <Table>   
                  <TableHeader>
                    <TableRow>
                      <TableHead className='lg:w-[250px]'>Tenant</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead className='lg:w-[250px]'>Due By</TableHead>
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