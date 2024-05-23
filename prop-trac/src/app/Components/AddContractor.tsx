'use client'
import React, { useState } from 'react'

const AddContractor = (props: { open: boolean, setOpen: (value: boolean) => void}) => {

    const [open, setOpen] = useState<boolean>(false)

  return (
    <>
        <div className={`${open ? '' : 'hidden'}`}>
        <div className='bg-black bg-opacity-25 z-50 w-full h-full fixed'>
            <div className='bg-white rounded-xl w-11/12 md:w-3/5 lg:w-1/2 xl:w-1/3 min-h-[400px] mx-auto left-5 md:left-[20%] lg:left-[25%] xl:left-[35%] top-[25%] md:top-[20%] fixed'>
                    
            </div>
        </div>
        </div>
    </>
  )
}

export default AddContractor