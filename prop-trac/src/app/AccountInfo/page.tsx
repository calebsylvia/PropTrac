"use client";
import React, { useEffect, useState } from "react";
import SideNav from "../Components/SideNav";
import Image from "next/image";
import houseInTrees from "@/app/Assets/Landscape nature.png";
import { MagnifyingGlass, Note, NotePencil } from "@phosphor-icons/react";
import TopNav from "../Components/TopNav";
import { editAccount, getAccountInfo } from "@/Utils/DataService";
import { IAccount } from "@/Interfaces/Interfaces";
import { Button, Label, Select, TextInput } from "flowbite-react";
import languages from '@/app/Data/languages.json'
import states from '@/app/Data/states.json'
import { useToast } from "@/components/ui/use-toast";

const AccountInfo = () => {
  const [userId, setUserId] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [propCount, setPropCount] = useState<number>(1);
  const [language, setLanguage] = useState<string>("English");

  const [first, setFirst] = useState<string>('')
  const [last, setLast] = useState<string>('')
  const [re, setRe] = useState<string>('')

  const { toast } = useToast()

  let id: any;
  let userID: any;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      id = localStorage.getItem("ID");
    }
  },[isOpen])

  useEffect(() => {

    const getAccount = async () => {
      const user: IAccount = await getAccountInfo(parseInt(id!));
      setName(`${user.firstName} ${user.lastName}`);
      setEmail(user.email);
      setPhone(user.phone);
      setRole(user.role);
      setLocation(user.location);
      setLanguage(user.language);
    };
    getAccount();
  }, [isOpen]);


  const handleSubmit = async() => {

    if (typeof window !== undefined) {
      userID = parseInt(localStorage.getItem("ID")!);
    }

      let info: IAccount = {
        id: userID,
        email: email,
        firstName: first,
        lastName: last,
        phone: phone,
        role: 'Manager',
        location: location,
        language: language
      }

        let success = await editAccount(info)

        if(!success){
          return toast({description: 'Something went wrong try again!', variant:"destructive"})
        }else{
          setIsOpen(false)
          setRe(' ')
          toast({description:'Changes Saved'})
        }
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className={isOpen ? "block" : "hidden"}>
        <div className="bg-black bg-opacity-25 z-50 w-full h-full fixed">
          <div className=" bg-white rounded-xl w-11/12 md:w-3/5 lg:w-1/2 xl:w-1/3 min-h-[350px] mx-auto left-5 md:left-[20%] lg:left-[25%] xl:left-[35%] top-[10%] md:top-[20%] fixed">
              <p className="text-2xl text-center pt-3">Edit Account</p>
              <form onSubmit={handleSubmit} className="px-4">
                <div className="flex max-md:flex-col md:justify-between">
                <div className='mb-2 block max-md:mx-auto max-md:w-full'>
                    <Label htmlFor='firstName' value='First Name'/>
                    <TextInput max={20} className='w-full md:w-48 lg:w-52' id='firstName' defaultValue={first} placeholder='First Name' type='text' onChange={(e) => {setFirst(e.target.value)}} required/>
                  </div>
                  <div className='mb-2 block max-md:mx-auto max-md:w-full'>
                    <Label htmlFor='lastName' value='Last Name'/>
                    <TextInput max={20} className='w-full md:w-48 lg:w-52' id='lastName' defaultValue={last} placeholder='Last Name' type='text' onChange={(e) => {setLast(e.target.value)}} required/>
                  </div>
                </div>

                <div className="flex max-md:flex-col md:justify-between">
                <div className='mb-2 block max-md:mx-auto max-md:w-full'>
                    <Label htmlFor='email' value='Email'/>
                    <TextInput max={20} className='w-full md:w-48 lg:w-52' id='email' defaultValue={email} placeholder='Email' type='text' onChange={(e) => {setEmail(e.target.value)}} required/>
                  </div>
                  <div className='mb-2 block max-md:mx-auto max-md:w-full'>
                    <Label htmlFor='phone' value='Phone Number'/>
                    <TextInput max={20} className='w-full md:w-48 lg:w-52' id='phone' defaultValue={phone} placeholder='Phone' type='text' onChange={(e) => {setPhone(e.target.value)}} required/>
                  </div>
                </div>

                <div className="flex max-md:flex-col md:justify-between">
                <div className='mb-2 block max-md:mx-auto max-md:w-full'>
                    <Label htmlFor='language' value='Language'/>
                    <Select id="language" className="w-full md:w-48 lg:w-52" onChange={(e) => setLanguage(e.target.value)} required>
                      <option defaultValue={'Select Language'} selected disabled>Select Language</option>
                      {
                          languages.map((lang, idx) => 
                            <option key={idx} value={lang.name}>{lang.name}</option>
                          )
                      }
                    </Select>
                  </div>
                  <div className='mb-2 block max-md:mx-auto max-md:w-full'>
                    <Label htmlFor='location' value='Location'/>
                    <Select id="location" className="w-full md:w-48 lg:w-52" onChange={(e) => setLocation(e.target.value)}>
                      {
                          states.map((state, idx) => 
                          <option key={idx} value={state.name}>{state.name}</option>
                          )
                      }
                    </Select>
                  </div>
                </div>
                <div className="flex justify-between mt-5 mx-auto max-md:mb-4">
                <Button color='light' onClick={handleClose}>Cancel</Button>
                <Button color='light' className="" onClick={handleSubmit}>Save Changes</Button>
                </div>
              </form>
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <SideNav />
      </div>
      <div className="block lg:hidden">
        <TopNav />
      </div>
      <div className="bg-[#FEFFF6] w-full h-full">
        <p className="text-3xl lg:text-4xl py-8 ml-10 lg:ml-60">Account Info</p>
        <div className="w-full lg:w-3/4 mx-auto lg:mx-0 lg:ml-60 flex justify-evenly text-xl">
          <div className="w-11/12 md:w-full h-full mx-auto md:mx-10 lg:mx-0 bg-white rounded-xl border-black border-2 space-y-8 px-4 md:px-12 xl:pl-16 xl:pr-20 py-10 text-base lg:text-sm xl:text-base">
            <p className="">{`Name: ${name}`}</p>
            <p>{`Email: ${email}`}</p>
            <p>{`Phone: ${phone}`}</p>
            <div className="grid grid-cols-2 gap-0 md:gap-16 xl:gap-24">
              <p>{`Role: ${role}`}</p>
              <p>{`Location: ${location}`}</p>
            </div>
            <div className="grid grid-cols-2 gap-0 md:gap-16 xl:gap-24">
              <p>{`Total Properties: ${propCount}`}</p>
              <p>{`Language: ${language}`}</p>
            </div>
            <div className="pt-10">
              <button className="flex" onClick={() => setIsOpen(true)}>
                <NotePencil size={32} className="hidden xl:block" />
                <NotePencil size={20} className="block xl:hidden" />
                <p className="my-auto pl-2">Edit Profile</p>
              </button>
            </div>
          </div>
          <div className="w-full lg:flex justify-center hidden">
            <Image
              className="w-[450px] m-auto"
              src={houseInTrees}
              alt="House in the woods image"
            />
          </div>
        </div>
        <div className="mx-auto md:mx-10 lg:ml-60 mt-4 mb-5 w-11/12 md:w-[90%] lg:w-3/4 min-h-60 rounded-xl bg-white border-black border-2">
          <div className="flex justify-between mx-4 pt-3">
            <p className="text-lg lg:text-xl">Documentation</p>
            <div className="relative">
              <input
                type="search"
                className="rounded-2xl border-0 bg-gray-200 h-9 w-44 lg:h-10 lg:w-56"
                placeholder="Search"
              />
              <MagnifyingGlass
                className="absolute top-1 lg:top-[5px] right-2 opacity-65"
                size={30}
              />
            </div>
          </div>
          <div className="overflow-x-auto">{}</div>
        </div>
      </div>
    </>
  );
};

export default AccountInfo;
