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
        <div className="flex flex-col pt-10 space-y-8">
          <div className='flex justify-center'>
            <ChartLine size={48} />
            <p className={`hover:cursor-pointer my-auto ${isOpen ? 'block' : 'hidden'}`} onClick={() => router.push('/AdminDashboard')}>Dashboard</p>
          </div>
          <div className='flex justify-center'>
            <House size={48} />
            <p className={`hover:cursor-pointer my-auto ${isOpen ? 'block' : 'hidden'}`} onClick={() => router.push('/Properties')}>Properties</p>
          </div>
          <div className='flex justify-center'>
            <AddressBook size={48} />
            <p className={`hover:cursor-pointer my-auto ${isOpen ? 'block' : 'hidden'}`} onClick={() => router.push('/Tenants')}>Tenants</p>
          </div>
          <div className='flex justify-center'>
            <CreditCard size={48} />
            <p className={`hover:cursor-pointer my-auto ${isOpen ? 'block' : 'hidden'}`} onClick={() => router.push('/Payments')}>Payments</p>
          </div>
          <div className='flex justify-center'>
            <User size={48} />
            <p className={`hover:cursor-pointer my-auto ${isOpen ? 'block' : 'hidden'}`} onClick={() => router.push('/AccountInfo')}>Account</p>
          </div>
          <div className='flex justify-center'>
            <Power size={48} />
            <p className={`hover:cursor-pointer my-auto ${isOpen ? 'block' : 'hidden'}`} onClick={() => router.push('/')}>Log Out</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
