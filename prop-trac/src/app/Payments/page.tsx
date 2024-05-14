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
        <div className='w-5/6 mx-auto lg:ml-60 lg:pt-12'>
              <div className='flex justify-between h-1/3 pt-6'>
              <div className='bg-white rounded-xl border-black border-2 w-full mb-10 lg:w-2/3 min-h-[685px] overflow-y-auto'>
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
              <div>
              <div className='lg:h-96 w-11/12 flex items-center mr-10 ml-20 mt-3 lg:mt-0'>
                  <PieChartComponent/>
                </div>
                <div className='bg-white rounded-xl border-black border-2 w-2/3 h-[200px] lg:h-[300px] m-auto text-xl lg:text-xl pl-5 pt-2 lg:pt-12 space-y-10'>
                    <p>{`Manager: ${manager}`}</p>
                    <p>{`Active Tenants: ${active}`}</p>
                    <p>Stripe Dashboard:<a href='#'>url.com</a></p>
                </div>
              </div>
              </div>
        </div>
    </div>
    </>
  )
}

export default Payments