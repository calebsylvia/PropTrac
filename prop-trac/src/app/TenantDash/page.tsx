'use client'
import { Button, Textarea, Select, Label, FileInput } from 'flowbite-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import logout from '@/app/Assets/SignOut.png'
import house from '@/app/Assets/House 2.png'
import download from '@/app/Assets/FileArrowDown.png'
import wallet from '@/app/Assets/Vector 2.png'

const TenantDash = () => {

  const [name, setName] = useState<string>("Bob")
  const [address, setAddress] = useState<string>("1111 Dreary Lane Shrek Land, CA 95202")
  const [id, setId] = useState<number>(78665)
  const [leaseType, setLeaseType] = useState<string>("Annual")
  const [leaseStart, setLeaseStart] = useState<string>("11-11-11")
  const [leaseEnd, setLeaseEnd] = useState<string>("11-11-11")
  const [manager, setManager] = useState<string>("Caleb Sylvia")
  const [managerNumber, setManagerNumber] = useState<number>()
  const [managerEmail, setManagerEmail] = useState<string>("csprop@codestack.co")
  const [balance, setBalance] = useState<number>(1000)
  const [dueDate, setDueDate] = useState<string>("Today")
  const [daysRemaining, setDaysRemaining] = useState<number>(9)

  const categories: string[] = ["Appliances", "Electricity", "Flooring", "HVAC", "Pests", "Plumbing", "Roofing", "Safety", "Utilities", "Windows/Doors", "Other"];

  const router = useRouter()

  const handleLogout = () => {
    router.push('/')
  }

  return (
    <>
    <div className='bg-[#FEFFF6] w-screen h-screen'>
      <div className='flex justify-between mx-20 pt-12 pb-10'>
        <p className='text-5xl'>{`Welcome, ${name}`}</p>
        <button className='my-auto' onClick={handleLogout}>
            <Image className='w-8' src={logout} alt='Logout Button'/>
        </button>
      </div>


      <div className='flex justify-evenly'>
        <div className='space-y-4'>
          <div className='flex bg-white rounded-2xl border-black border-2 p-8 w-full space-x-6'>
              <div className='w-1/2'>
                <p className='text-3xl pb-4'>Address:</p>
                <p className='text-wrap pb-4 w-5/6'>{address}</p>
                <p className='pb-4'>{`Unit ID: ${id}`}</p>
                <div className='flex justify-between w-5/6'>
                  <p className=''>Lease:</p>
                  <div className='text-sm'>
                    <p>{`Type- ${leaseType}`}</p>
                    <p>{`Start- ${leaseStart}`}</p>
                    <p>{`End- ${leaseEnd}`}</p>
                  </div>
                  <div>
                      <a>
                        <Image src={download} alt='Download File Icon'/>
                      </a>
                  </div>
                </div>
              </div>
              <div className=''>
                  <p className='text-3xl pb-4'>Property Manager:</p>
                  <p className='pb-4'>{manager} <a className='underline text-[#0744A0]'>Contact</a></p>
                  <p className='pb-4'>{`Phone: ${managerNumber}`}</p>
                  <p className='pb-4'>{`Email: ${managerEmail}`}</p>
              </div>
          </div>
          <div className='flex'>
            <div className='bg-white rounded-2xl border-black border-2 p-4 w-full mr-4'>
                <p>Outstanding Balance:</p>
                <p className='text-5xl text-center py-3'>{`$${balance}`}</p>
                <div className='flex justify-between mx-5'>
                  <p className='my-auto'>{`Due by: ${dueDate}`}</p>
                  <button className='bg-[#92DEDA] rounded-xl bg-opacity-50 px-5 py-2'>
                    <a className='flex'>Pay Now <Image className='h-4 w-5 my-auto ml-2' src={wallet} alt='Wallet Icon'/></a>
                  </button>
                </div>
            </div>
            <div className='bg-white rounded-2xl border-black border-2 p-4'>
                <p>Day(s) Left:</p>
                <p className='text-5xl text-center py-5'>{daysRemaining}</p>
                <p className='italic text-sm text-nowrap text-center'>*to make a payment</p>
            </div>
          </div>
        </div>

        <div>
          <Image className='w-72' src={house} alt='House Image'/>
        </div>
      </div>

      <div className='flex justify-evenly mt-4 pb-8'>
        <div className='bg-white rounded-2xl border-black border-2 w-1/2 p-4'>
          <p>Payment History</p>
          <table className='table-auto'>
              <thead className='font-normal'>
                <tr>
                  <th>Date Processed</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>4/8/24</td>
                  <td>Stripe</td>
                  <td>$1200</td>
                  <td>$0</td>
                </tr>
              </tbody>
          </table>
        </div>
        <div className='bg-white rounded-2xl border-black border-2 w-1/4 p-4'>
            <p>Submit Maintenance Request</p>
            <div>
              <Textarea placeholder='Description' required/>
              <div className='flex justify-between'>
              <div className='mb-2 block w-2/5'>
                <Label htmlFor='prio' value='Priority'/>
                <Select id='prio' required>
                    <option value='low'>Low</option>
                    <option value='medium'>Medium</option>
                    <option value='high'>High</option>
                </Select>
              </div>
              <div className='mb-2 block w-1/2'>
                <Label htmlFor='category' value='Category'/>
                <Select id='category' required>
                {
                    categories.map((category, idx) => 
                      <option key={idx} value={idx}>{category}</option>
                    )
                  }
                </Select>
              </div>
              </div>
              <div>
                <div>
                  <Label>
                    <div>
                      <p>Upload Image(s)</p>
                    </div>
                  </Label>
                  <FileInput className='' multiple/>
                </div>
                  <button className='bg-[#A0E6EF] rounded-xl px-6 py-2'>
                      Submit
                  </button>
              </div>
            </div>
        </div> 
      </div>
      </div>
    </>
  )
}

export default TenantDash