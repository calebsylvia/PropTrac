"use client";
import React, { useState } from "react";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { AddressBook, ChartLine, CreditCard, House, List, SignOut, Toolbox, User } from "@phosphor-icons/react";

const TopNav = () => {

    const [open, setOpen] = useState<boolean>(false)


    const router = useRouter()

    const handleHome = () => {
        router.push('/')
        
        if(typeof window !== undefined){
          localStorage.removeItem("ID")
        }
    }

    const openMenu = () => {
      setOpen(!open)
    }

  return (
    <>
      <div className="bg-[#A2D7E2] h-24 w-full flex justify-between px-8">
        <div onClick={handleHome}>
            <p className="text-2xl text-center text-[#5A5A5A] pt-4">PROP<br/>TRAC</p>
        </div>

        <div className="flex">
            <button className="bg-transparent my-auto transition-transform duration-1000" onClick={openMenu}>
                <List size={40} weight="bold" />
            </button>
        </div>
      </div>
      <div className={`${open ? 'block' : 'hidden'} bg-[#A2D7E2] w-full flex flex-col justify-center space-y-2 text-xl py-3 font-medium transition-transform duration-200`}>
          <div className="flex justify-center" onClick={() => router.push('/AdminDash')}>
            
            <p>Dashboard</p>
          </div>
          <div className="flex justify-center" onClick={() => router.push('/Properties')}>
            
            <p>Properties</p>
          </div>
          <div className="flex justify-center" onClick={() => router.push('/Tenants')}>
            
            <p>Tenants</p>
          </div>
          <div className="flex justify-center" onClick={() => router.push('/Payments')}>
            
            <p>Payments</p>
          </div>
          <div className="flex justify-center" onClick={() => router.push('/AccountInfo')}>
            
            <p>Account</p>
          </div>
          <div className="flex justify-center" onClick={() => router.push('Maintenance')}>
            
            <p>Maintenance</p>
          </div>
          <div className="flex justify-center" onClick={() => router.push('/')}>
            
            <p>Log Out</p>
          </div>
      </div>
    </>
  );
};

export default TopNav;
