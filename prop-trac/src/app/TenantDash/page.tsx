'use client'
import { Button, Textarea, Select, Label, FileInput } from 'flowbite-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import logout from '@/app/Assets/SignOut.png'
import house from '@/app/Assets/House 2.png'
import download from '@/app/Assets/FileArrowDown.png'
import wallet from '@/app/Assets/Vector 2.png'
import { ITenant } from '@/Interfaces/Interfaces'
import { addRequest, checkToken, getTenantInfo } from '@/Utils/DataService'
import {Table, TableHeader, TableBody, TableHead, TableRow} from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { Blob } from 'buffer'

const TenantDash = () => {

  const [name, setName] = useState<string>("Bob")
  const [address, setAddress] = useState<string>("1111 Dreary Lane Shrek Land, CA 95202")
  const [id, setId] = useState<number>(78665)
  const [leaseType, setLeaseType] = useState<string>("Annual")
  const [leaseStart, setLeaseStart] = useState<string>("11-11-11")
  const [leaseEnd, setLeaseEnd] = useState<string>("11-11-11")
  const [manager, setManager] = useState<string>("Caleb Sylvia")
  const [managerNumber, setManagerNumber] = useState<number>(1000)
  const [managerEmail, setManagerEmail] = useState<string>("csprop@codestack.co")
  const [balance, setBalance] = useState<number>(1000)
  const [dueDate, setDueDate] = useState<string>("Today")
  const [daysRemaining, setDaysRemaining] = useState<number>(9)

  const [userId, setUserId] = useState<number>(0)
  const [desc, setDesc] = useState<string>("")
  const [prio, setPrio] = useState<string>("")
  const [cate, setCate] = useState<string>("")
  const [image, setImage] = useState<string>("")
  

  const categories: string[] = ["Appliances", "Electricity", "Flooring", "HVAC", "Pests", "Plumbing", "Roofing", "Safety", "Utilities", "Windows/Doors", "Other"];

  const router = useRouter()
  const { toast } = useToast()

  
  if(!checkToken()){
    router.push('/')
  }

  useEffect(() => {
    const getTenant = async() => {
      let ID = localStorage.getItem("ID")
      let tenantInfo: ITenant = await getTenantInfo(parseInt(ID!))
      console.log(tenantInfo)
      setUserId(parseInt(ID!))
      setName(tenantInfo.firstName)
      if(tenantInfo.houseNumber === null){
        setAddress('Not Assigned')
      }else{
        setAddress(`${tenantInfo.houseNumber} ${tenantInfo.street}, ${tenantInfo.state} ${tenantInfo.zip}`)
      }
      setId(tenantInfo.id)
      setLeaseType(tenantInfo.leaseType)
      setLeaseStart((tenantInfo.leaseStart).substring(0,10))
      setLeaseEnd((tenantInfo.leaseEnd).substring(0,10))
      if(tenantInfo.managerFirst === null){
        setManager('Not Assigned')
      }else{
        setManager(`${tenantInfo.managerFirst} ${tenantInfo.managerLast}`)
      }
      setManagerEmail(tenantInfo.managerEmail)
      setManagerNumber(tenantInfo.managerPhone)
    }
    getTenant()
  },[])

  const handleLogout = () => {
    router.push('/')
  }

  const handleRequest = async() => {

    let request = {
      id: 0,
      description: desc,
      priority: prio,
      category: cate,
      image: image,
      userID: userId
    }

  console.log(request)
   addRequest(request)
   toast({description: "Maintenance Request Sent"})

   setDesc("")
   setCate("")
   setPrio("")
  }


  const handleImage = async(e:any) => {
    const file = e.target.files[0]
    const base = await convert64(file)
    console.log(base)
    setImage(`${base}`)
  }

  const convert64 = (file: any) => {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file)

      reader.onload = () => {
        res(reader.result)
      }

      reader.onerror = (error: any) => {
        rej(error)
      }
    })
  }

  



  return (
    <>
    <div className='bg-[#FEFFF6]'>
      <div className='flex justify-between px-44 pt-12 pb-10'>
        <p className='text-3xl'>{`Welcome, ${name}!`}</p>
        <button className='my-auto pr-3' onClick={handleLogout}>
            <Image className='w-8' src={logout} alt='Logout Button'/>
        </button>
      </div>


      <div className='flex px-44 space-x-14'>
        <div className='w-2/3 space-y-4'>
          <div className='flex bg-white rounded-2xl border-black border-2 p-8 w-full space-x-4'>
              <div className='w-1/2'>
                <p className='text-xl pb-4'>Address:</p>
                <p className='text-wrap pb-4 w-5/6'>{address === null ? 'N/A' : address}</p>
                <p className='pb-4'>{`Unit ID: ${id}`}</p>
                <div className='flex justify-between w-5/6'>
                  <p className=''>Lease:</p>
                  <div className='text-sm'>
                    <p>{`Type: ${leaseType === null ? 'N/A' : leaseType}`}</p>
                    <p>{`Start: ${leaseStart}`}</p>
                    <p>{`End: ${leaseEnd}`}</p>
                  </div>
                  <div>
                      <a>
                        <Image src={download} alt='Download File Icon'/>
                      </a>
                  </div>
                </div>
              </div>
              <div className=''>
                  <p className='text-xl pb-4'>Property Manager:</p>
                  <p className='pb-4'>{manager === null ? 'Not Assigned' : manager} <a className='underline text-[#0744A0]'>Contact</a></p>
                  <p className='pb-4'><a href={`tel:${managerNumber}`}>{`Phone: ${managerNumber === null ? 'N/A' : managerNumber}`}</a></p>
                  <p className='pb-4'>{`Email: ${managerEmail === null ? 'N/A' : managerEmail}`}</p>
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

      <div className='flex px-44 space-x-4 mt-4 pb-8 w-full'>
        <div className='bg-white rounded-2xl border-black border-2 w-[67%] p-4'>
          <p>Payment History</p>
          <Table>   
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[250px]'>Date Processed</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className='w-[250px]'>Amount</TableHead>
                      <TableHead>Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                      {

                      }
                  </TableBody>
                </Table>
        </div>
        <div className='bg-white rounded-2xl border-black border-2 w-[30%] px-6 py-4'>
            <p>Submit Maintenance Request</p>
            <div>
              <Textarea placeholder='Description' value={desc} onChange={(e) => setDesc(e.target.value)} required/>
              <div className='flex justify-between pt-2'>
              <div className='mb-2 block w-2/5'>
                <Label htmlFor='prio' value='Priority'/>
                <Select id='prio' value={prio} onChange={(e) => setPrio(e.target.value)} required>
                    <option value='Low'>Low</option>
                    <option value='Medium'>Medium</option>
                    <option value='High'>High</option>
                </Select>
              </div>
              <div className='mb-2 block w-1/2'>
                <Label htmlFor='category' value='Category'/>
                <Select id='category' value={cate} onChange={(e) => setCate(e.target.value)} required>
                {
                    categories.map((category, idx) => 
                      <option key={idx} value={idx}>{category}</option>
                    )
                  }
                </Select>
              </div>
              </div>
              <div>
                <div className='pb-5'>
                  <Label>
                    <div>
                      <p>Upload Image(s)</p>
                    </div>
                  </Label>
                  <FileInput disabled={true} id="file-upload" onChange={(e) => handleImage(e)}/>
                </div>
                <div className='flex justify-end'>
                  <button onClick={handleRequest} className='bg-[#A0E6EF] rounded-xl px-6 py-2'>
                      Submit
                  </button>
                  </div>
              </div>
            </div>
        </div> 
      </div>
      </div>
    </>
  )
}

export default TenantDash