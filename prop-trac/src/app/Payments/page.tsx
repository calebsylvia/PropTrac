'use client'
import React, { useEffect, useState } from 'react'
import SideNav from '../Components/SideNav'
import PieChartComponent from '../Components/PieChartComponent'
import {Table, TableHeader, TableBody, TableHead, TableRow} from '@/components/ui/table'
import { checkToken } from '@/Utils/DataService'
import { useRouter } from 'next/navigation'
import TopNav from '../Components/TopNav'

const Payments = () => {

  const [manager, setManager] = useState<string>("")
  const [active, setActive] = useState<number>(0)

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
        <div className='w-5/6 mx-auto lg:ml-52 lg:pt-12'>
              <div className='flex max-lg:flex-col-reverse h-1/3 md:pt-6 lg:mx-4 xl:mx-0'>
              <div className='bg-white rounded-xl border-black border-2 w-full lg:w-2/3 max-lg:min-h-96  overflow-y-auto'>
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
            <div className='max-lg:flex max-md:block max-md:mb-5'>
              <div className='h-72 md:h-60 lg:h-80 xl:h-96 w-11/12 flex items-center md:mr-10 ml-5 md:ml-10 xl:ml-20 mt-3 lg:mt-0'>
                  <PieChartComponent/>
                </div>
                <div className='bg-white rounded-xl border-black border-2 w-full lg:w-4/5 h-[200px] lg:h-[250px] lg:ml-10 xl:m-auto text-base lg:text-xl pl-5  pt-5 lg:pt-10 space-y-8 lg:space-y-10 max-lg:my-auto'>
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