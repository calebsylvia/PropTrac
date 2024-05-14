'use client'
import {
  AddressBook,
  ChartLine,
  CreditCard,
  House,
  Power,
  SignOut,
  Toolbox,
  User,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter()


  const handleLog = () => {
    router.push('/')

    if(typeof window !== undefined){
      localStorage.removeItem("ID")
    }
  }

  return (
    <>
      <div
        className={`fixed bg-[#A2D7E2] h-full transition-all duration-200 ${
          isOpen ? "w-[11rem]" : "w-24"
        }`}
        onMouseOver={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <p className="text-xl text-center text-[#5A5A5A] pt-5">
          PROP
          <br />
          TRAC
        </p>
        <div className="flex flex-col pt-16 space-y-12">
          <div className={`flex ${isOpen ? 'justify-start pl-4' : 'justify-center'} hover:cursor-pointer`} onClick={() => router.push('/AdminDash')}>
            <div className="w-12 justify-center">
            <ChartLine className="mx-auto" size={30} />
            </div>
            <p className={`my-auto text-sm ${isOpen ? 'block' : 'hidden'}`}>Dashboard</p>
          </div>
          <div className={`flex ${isOpen ? 'justify-start pl-4' : 'justify-center'} hover:cursor-pointer`} onClick={() => router.push('/Properties')}>
          <div className="w-12 justify-center">
            <House className="mx-auto" size={30} />
            </div>
            <p className={`my-auto text-sm ${isOpen ? 'block' : 'hidden'}`}>Properties</p>
          </div>
          <div className={`flex ${isOpen ? 'justify-start pl-4' : 'justify-center'} hover:cursor-pointer`} onClick={() => router.push('/Tenants')}>
          <div className="w-12 justify-center">
            <AddressBook className="mx-auto" size={30} />
            </div>
            <p className={`my-auto text-sm ${isOpen ? 'block' : 'hidden'}`}>Tenants</p>
          </div>
          <div className={`flex ${isOpen ? 'justify-start pl-4' : 'justify-center'} hover:cursor-pointer`} onClick={() => router.push('/Payments')}>
          <div className="w-12 justify-center">
            <CreditCard className="mx-auto" size={30} />
            </div>
            <p className={`my-auto text-sm ${isOpen ? 'block' : 'hidden'}`}>Payments</p>
          </div>
          <div className={`flex ${isOpen ? 'justify-start pl-4' : 'justify-center'} hover:cursor-pointer`} onClick={() => router.push('/AccountInfo')}>
          <div className="w-12 justify-center">
            <User className="mx-auto" size={30} />
            </div>
            <p className={`my-auto text-sm ${isOpen ? 'block' : 'hidden'}`}>Account</p>
          </div>
          <div className={`flex ${isOpen ? 'justify-start pl-4' : 'justify-center'} hover:cursor-pointer`} onClick={() => router.push('/Maintenance')}>
            <div className="w-12 justify-center">
            <Toolbox className="mx-auto" size={30} />
            </div>
            <p className={`my-auto text-sm ${isOpen ? 'block' : 'hidden'}`}>Maintenance</p>
          </div>
          <div className={`flex ${isOpen ? 'justify-start pl-4' : 'justify-center'} hover:cursor-pointer`} onClick={handleLog}>
          <div className="w-12 justify-center">
          <SignOut className="mx-auto" size={30} />
            </div>
            <p className={`my-auto text-sm ${isOpen ? 'block' : 'hidden'}`}>Log Out</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
