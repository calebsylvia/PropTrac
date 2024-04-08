'use client'
import { Button } from 'flowbite-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import logout from '@/app/Assets/SignOut.png'
import house from '@/app/Assets/House 2.png'

const TenantDash = () => {

  const [name, setName] = useState<string>("Bob")
  const [address, setAddress] = useState<string>("1111 Dreary Lane Shrek Land, CA 9520202")
  const [id, setId] = useState<number>(78665)
  const [leaseType, setLeaseType] = useState<string>("")
  const [leaseStart, setLeaseStart] = useState<Date>()
  const [leaseEnd, setLeaseEnd] = useState<Date>()
  const [manager, setManager] = useState<string>("")
  const [managerNumber, setManagerNumber] = useState<number>()
  const [managerEmail, setManagerEmail] = useState<string>("")
  const [balance, setBalance] = useState<number>()
  const [dueDate, setDueDate] = useState<Date>()
  const [daysRemaining, setDaysRemaining] = useState<number>()

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


      <div className='flex'>
        <div>
          <div>
              <div>
                <p className='text-xl'>Address:</p>
                <p className='text-wrap'>{address}</p>
                <p className=''>{`Unit ID: ${id}`}</p>
                <div>
                  <p>Lease:</p>
                  <div>

                  </div>
                  <div>
                    
                  </div>
                </div>
              </div>
              <div>

              </div>
          </div>
          <div>
            <div>

            </div>
            <div>

            </div>
          </div>
        </div>

        <div>
          <Image className='w-72' src={house} alt='House Image'/>
        </div>
      </div>

      <div>

      </div>
      </div>
    </>
  )
}

export default TenantDash