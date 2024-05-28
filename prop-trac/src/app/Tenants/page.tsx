'use client'
import React, { useEffect, useState } from 'react'
import SideNav from '../Components/SideNav'
import { MagnifyingGlass, PlusSquare } from '@phosphor-icons/react'
import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from '@/components/ui/table'
import TopNav from '../Components/TopNav'
import AddTenant from '../Components/AddTenant'
import { getTenants } from '@/Utils/DataService'
import { ITenants } from '@/Interfaces/Interfaces'

const Tenants = () => {

  const [open, setOpen] = useState<boolean>(false)
  const [id, setId] = useState<number>(1)
  const [tenArr, setTenArr] = useState<ITenants[]>([])
  const [value, setValue] = useState<string>('')
  const [re, setRe] = useState<string>('')

  let iD: any;

  useEffect(() => {
    if(typeof window !== undefined){
      iD = localStorage.getItem("ID")
      
    }
  },[open])

  useEffect(() => {
    setId(parseInt(iD!))
    const getAllTenants = async() => {
      const tenants: ITenants[] = await getTenants(id)
      setTenArr(tenants)
    }

    getAllTenants()
  }, [open])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleAdd = () => {
    setOpen(false)
  }


  return (
    <>
    <AddTenant open={open} onClose={handleClose} addProp={handleAdd}/>
    <div className='hidden lg:block'>
      <SideNav/>
    </div>
    <div className='block lg:hidden'>
      <TopNav/>
    </div>
    <div className='bg-[#FEFFF6] w-full h-full'>
      <div className='w-5/6 mx-auto lg:ml-60 pb-5'>
      <div className='flex justify-between pt-5 lg:pr-10'>
        <div>
        <button className='flex max-lg:mt-2' onClick={handleOpen}>
              <PlusSquare size={32} />
              <p className='my-auto max-md:text-sm'>Add Tenant</p>
            </button>
        </div>
              <div className='relative w-40 md:w-72 max-lg:mt-2'>
              <input type="search" className='w-40 md:w-72 h-8 border-0 rounded-xl bg-gray-200 text-sm' placeholder='Search Tenants' onChange={(e) => setValue(e.target.value)}/>
              <MagnifyingGlass className='absolute top-[6px] right-2 opacity-65' size={20} />
            </div>
            </div>

            <div className='mt-10 min-h-[650px] w-full lg:w-[95%] bg-white border-black border-2 rounded-xl py-6 px-1'>
                <Table>   
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-36'>Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Lease Type</TableHead>
                      <TableHead>Start</TableHead>
                      <TableHead>End</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                      {
                        Array.isArray(tenArr) && tenArr.filter((item) => {
                          if (!value) return true;
                          if (
                            item.firstName
                              .toLowerCase()
                              .includes(value.toLowerCase()) ||
                            item.lastName.toLowerCase().includes(value.toLowerCase())
                          ) {
                            return true;
                          }
                        }).map((tenant, idx) => 
                        <TableRow key={idx}>
                          <TableCell>{`${tenant.firstName} ${tenant.lastName}`}</TableCell>
                          <TableCell>{`${tenant.houseNumber} ${tenant.street}, ${tenant.city} ${tenant.zip}`}</TableCell>
                          <TableCell>{tenant.leaseType}</TableCell>
                          <TableCell>{tenant.leaseStart.substring(0, 10)}</TableCell>
                          <TableCell>{tenant.leaseEnd.substring(0, 10)}</TableCell>
                          <TableCell>{tenant.email}</TableCell>
                          <TableCell>{tenant.phone}</TableCell>
                          <TableCell>{tenant.documentContent}</TableCell>
                        </TableRow>
                        )
                      }
                  </TableBody>
                </Table>
            </div>
      </div>
    </div>
    </>
  )
}

export default Tenants