'use client'
import React, { useEffect, useState } from 'react'
import { TextInput, Label, Select, Button } from 'flowbite-react'
import { IContractor } from '@/Interfaces/Interfaces';
import { addContractor } from '@/Utils/DataService';
import { useToast } from '@/components/ui/use-toast';

const AddContractor = (props:{ open: boolean, onClose: () => void, addCont: () => void}) => {

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [userId, setUserId] = useState<number>()

    let iD: any;
    const { toast } = useToast()

    const categories: string[] = ["Appliances", "Electricity", "Flooring", "HVAC", "Pests", "Plumbing", "Roofing", "Safety", "Utilities", "Windows/Doors", "Other"];

    useEffect(() => {
        if(typeof window !== undefined){
            iD = localStorage.getItem("ID")
        }
    },[])

    const handleAdd = async() => {

        let contractor: IContractor = {
            id: 0,
            name: name,
            email: email,
            phone: phone,
            category: category,
            userID: parseInt(iD!)
        }

        const result = await addContractor(contractor)

        if(result === false){
            return toast({description: 'Something went wrong. Try again!', variant:"destructive"})
         }else{
            return toast({description: 'Contractor Added Successfully', variant:'default'})
         }
    }


  return (
    <>
        <div className={`${props.open ? '' : 'hidden'}`}>
        <div className='bg-black bg-opacity-25 z-50 w-full h-full fixed'>
            <div className='bg-white rounded-xl w-11/12 md:w-3/5 lg:w-1/2 xl:w-1/3 min-h-[300px] mx-auto left-5 md:left-[20%] lg:left-[25%] xl:left-[35%] top-[25%] md:top-[20%] fixed'>
                <p className='text-center text-xl font-medium my-3'>Add Contractor</p>
                <div className='flex justify-between mx-6'>
                <div className='block mb-2'>
                    <Label value='Name' htmlFor='contName'/>
                    <TextInput id='contName' type='text' placeholder='Contractor Name' className='w-36 md:w-48 border-black' onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className='block mb-2'>
                    <Label value='Category' htmlFor='cate'/>
                    <Select id='cate' className='w-36 md:w-48' onChange={(e) => setCategory(e.target.value)}>
                        {
                            categories.map((category, idx) => 
                            <option key={idx} value={category}>
                                {category}
                            </option>
                            )
                        }
                    </Select>
                </div>
                </div>
                <div className='flex justify-between mx-6'>
                <div className='block mb-2'>
                    <Label value='Email' htmlFor='email'/>
                    <TextInput id='email' type='email' placeholder='Contractor Email' className='w-36 md:w-48 border-black' onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='block mb-2'>
                    <Label value='Phone #' htmlFor='phone'/>
                    <TextInput className='w-36 md:w-48 border-black' type='tel' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder='Contractor Number' onChange={(e) => setPhone(e.target.value)
                    }/>
                </div>
                </div>
                <div className='flex justify-evenly mt-7'>
                    <Button color='light' onClick={props.onClose}>
                        Cancel
                    </Button>
                    <Button color='light' onClick={() => {props.addCont;
                        handleAdd()}
                    }>
                        Add Contractor
                    </Button>
                </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default AddContractor