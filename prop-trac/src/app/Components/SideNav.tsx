import {
  AddressBook,
  ChartLine,
  CreditCard,
  House,
  Power,
  User,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter()



  return (
    <>
      <div
        className={`fixed bg-[#A2D7E2] h-screen transition-all duration-200 ${
          isOpen ? "w-56" : "w-32"
        }`}
        onMouseOver={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <p className="text-4xl text-center text-[#5A5A5A] pt-3">
          PROP
          <br />
          TRAC
        </p>
        <div className="flex flex-col pt-20 space-y-16">
          <div className='flex justify-center hover:cursor-pointer' onClick={() => router.push('/AdminDash')}>
            <div className="w-12 justify-center">
            <ChartLine className="mx-auto" size={48} />
            </div>
            <p className={`my-auto ${isOpen ? 'block' : 'hidden'}`}>Dashboard</p>
          </div>
          <div className='flex justify-center hover:cursor-pointer' onClick={() => router.push('/Properties')}>
          <div className="w-12 justify-center">
            <House className="mx-auto" size={48} />
            </div>
            <p className={`my-auto ${isOpen ? 'block' : 'hidden'}`}>Properties</p>
          </div>
          <div className='flex justify-center hover:cursor-pointer' onClick={() => router.push('/Tenants')}>
          <div className="w-12 justify-center">
            <AddressBook className="mx-auto" size={48} />
            </div>
            <p className={`my-auto ${isOpen ? 'block' : 'hidden'}`}>Tenants</p>
          </div>
          <div className='flex justify-center hover:cursor-pointer' onClick={() => router.push('/Payments')}>
          <div className="w-12 justify-center">
            <CreditCard className="mx-auto" size={48} />
            </div>
            <p className={`my-auto ${isOpen ? 'block' : 'hidden'}`}>Payments</p>
          </div>
          <div className='flex justify-center hover:cursor-pointer' onClick={() => router.push('/AccountInfo')}>
          <div className="w-12 justify-center">
            <User className="mx-auto" size={48} />
            </div>
            <p className={`my-auto ${isOpen ? 'block' : 'hidden'}`}>Account</p>
          </div>
          <div className='flex justify-center hover:cursor-pointer' onClick={() => router.push('/')}>
          <div className="w-12 justify-center">
            <Power className="mx-auto" size={48} />
            </div>
            <p className={`my-auto ${isOpen ? 'block' : 'hidden'}`}>Log Out</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
