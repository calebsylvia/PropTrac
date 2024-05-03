"use client";
import React, { useEffect, useState } from "react";
import "./properties.css";
import SideNav from "../Components/SideNav";
import { CaretRight, MagnifyingGlass, PlusSquare } from "@phosphor-icons/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { IAddProp, IProperties, PropInfo, RoomsList } from "@/Interfaces/Interfaces";
import { addProperty, checkToken, getProperties } from "@/Utils/DataService";
import { useRouter } from "next/navigation";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { useToast } from "@/components/ui/use-toast";
import { PropContext } from "../Context/PropContext";
import Link from "next/link";

const Properties = () => {

  const [properties, setProperties] = useState<IProperties[]>([]);
  const [value, setValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false)

  
  const { toast } = useToast()

    const [houseNumber, setHouseNumber] = useState<string>('')
    const [street, setStreet] = useState<string>('')
    const [city, setCity] = useState<string>('AL')
    const [zip, setZip] = useState<string>('')
    const [state, setState] = useState<string>('')
    const [houseOrRoomType, setHouseOrRoomType] = useState<string>('House')
    const [houseRent, setHouseRent] = useState<number>(0)
    const [rooms, setRooms] = useState<number>(0)
    const [baths, setBaths] = useState<number>(0)
    const [sqft, setSqft] = useState<number>(0)
    const [amenFeatList, setAmenFeatList] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [roomRent, setRoomRent] = useState<RoomsList[]>([])
    const [userID, setUserID] = useState<number>(0)

    const [isRooms, setIsRooms] = useState<boolean>(false)

    const [first, setFirst] = useState<boolean>(false)
    const [second, setSecond] = useState<boolean>(false)

    const [re, setRe] = useState<string>("")
    const [propInfo, setPropInfo] = useState<IProperties[]>()

    const states: string[] = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

    let id: any;

  const router = useRouter();

  useEffect(() => {
    if(typeof window !== undefined){
      if(!checkToken()){
        router.push('/')
      }
    }
  },[])


  let roomsArr: RoomsList[] = []

  useEffect(() => {
    if (typeof window !== 'undefined') {
      id = localStorage.getItem("ID")
    }
  },[])

  useEffect(() => {
    const getPropertyList = async () => {
      setUserID(parseInt(id!))
      let props = await getProperties(id);
      console.log(props);
      setProperties(props);
      setIsOpen(false)
    };

    getPropertyList();
  }, [re]);

  useEffect(() => {
    console.log(propInfo)
    
    if(propInfo === undefined){
      return
    }else{
      
    }
  },[propInfo])

  const handleDetails = () => {
    if(street.length < 1 || state.length < 1 || zip.length < 1 || houseRent <= 0){
      return toast({description: 'Please make sure all fields are filled out accordingly', variant: 'destructive'})
    }else{
      setFirst(true)
    }
}

const handleFinance = () => {
  if(rooms <= 0 || baths <= 0 || sqft <= 0){
    return toast({description: 'Please make sure all fields are filled out accordingly', variant: 'destructive'})
  }else{
    setSecond(true)
  }
}

const addProp = async() => {

  setRoomRent(roomsArr)

  let prop: IAddProp = {
    id: 0,
    houseNumber: houseNumber,
    street: street,
    city: city,
    zip: zip,
    state: state,
    houseOrRoomType: houseOrRoomType,
    houseRent: houseRent,
    rooms: rooms,
    baths: baths,
    sqft: sqft,
    amenFeatList: amenFeatList,
    description: description,
    userID: userID,
    roomsList: roomsArr
  }

  console.log(prop)

  let result = await addProperty(prop)

  if(result === false){
    return toast({description: 'Something went wrong. Try again!', variant:'destructive'})
  }else{
    setIsOpen(false)
    setRe(" ")
    return toast({description:'Property Added Successfully'})
  }
}

  return (
    <PropContext.Provider value={propInfo}>
              <div className={`${isOpen ? 'block' : 'hidden'}`}>
              <div className='bg-black bg-opacity-25 z-50 w-screen h-screen absolute'>
            <div className=' bg-white rounded-xl w-1/3 min-h-[400px] mx-auto mt-40'>
                <p className={`${first || second ? 'hidden' : 'block'} text-center text-xl py-4`}>Add Property</p>
                <p className={`${first && !second ? 'block' : 'hidden'} text-center text-xl py-4`}>Property Details</p>
                <p className={`${second ? 'block' : 'hidden'} text-center text-xl py-4`}>Financial Information</p>

                <div className={`${first ? 'hidden' : 'block'} flex flex-col space-y-3`}>
                  <div className='mx-auto w-5/6'>
                    <div className='block mb-2'>
                        <Label value="Street Address" htmlFor='address'/>
                        <TextInput id='address' placeholder='Address' type='text' onChange={(e) => {
                          let splitAdd = e.target.value.split(" "); setHouseNumber(splitAdd[0]);
                          let addr = "";
                          for(let i = 1; i < splitAdd.length; i++){
                              addr += splitAdd[i] + " "
                          }
                          setStreet(addr);
                        }} required/>
                    </div>
                    </div>
                    <div className='flex mx-auto space-x-4 w-5/6'>
                        <div className='block mb-2 w-2/5'>
                          <Label value="City" htmlFor='city'/>
                          <TextInput className='' placeholder='City' id='city' type='text' onChange={((e) => setCity(e.target.value))} required/>
                        </div>
                        <div className='block mb-2 w-2/5'>
                          <Label value="ZIP" htmlFor='city'/>
                          <TextInput id='city' type='number' placeholder='ZIP' onChange={((e) => setZip(e.target.value))} required/>
                        </div>
                        <div className='block mb-2'>
                          <Label value="City" htmlFor='city'/>
                          <Select onChange={(e) => setState(e.target.value)} required>
                            {
                              states.map((state, idx) => 
                                <option key={idx} value={state}>{state}</option>
                              )
                            }
                          </Select>
                        </div>
                    </div>
                    <div className='flex mx-auto w-5/6 space-x-4'>
                        <div className='block mb-2 w-full'>
                          <Label value='Property Type' htmlFor='type'/>
                          <Select onChange={(e) => {setHouseOrRoomType(e.target.value);
                              e.target.value === 'Rooms' ? setIsRooms(true) : setIsRooms(false)
                          }} required>
                            <option value='House'>Whole House</option>
                            <option value='Rooms'>Rooms</option>
                          </Select>
                        </div>
                        <div className='block mb-2 w-full'>
                          <Label value='Mortgage/Rent' htmlFor='houseRent'/>
                          <TextInput id='houseRent' placeholder='Amount' type='number' onChange={((e) => setHouseRent(parseInt(e.target.value)))} required/>
                        </div>
                    </div>
                    <div className='flex justify-end w-5/6 mx-auto pt-2'>
                        <Button color='light' className='flex' onClick={handleDetails}>
                          <p className='my-auto'>Property Details</p>
                          <CaretRight size={18} className='my-auto' />
                        </Button>
                    </div>
                </div>

                <div className={`${first && !second ? 'block' : 'hidden'} flex flex-col space-y-3`}>
                      <div className='flex mx-auto w-5/6 space-x-4'>
                          <div className='block mb-2'>
                              <Label value='Room(s)' htmlFor='rooms'/>
                              <TextInput placeholder='Rooms' id='rooms' type='number' onChange={(e) => setRooms(parseInt(e.target.value))} onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}/>
                          </div>
                          <div className='block mb-2'>
                              <Label value='Bath(s)' htmlFor='baths'/>
                              <TextInput placeholder='Baths' id='baths' type='number' onChange={(e) => setBaths(parseInt(e.target.value))} onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}/>
                          </div>
                          <div className='block mb-2'>
                              <Label value='Square Ft.' htmlFor='sqft'/>
                              <TextInput placeholder='Square Ft.' id='sqft' type='number' onChange={(e) => setSqft(parseInt(e.target.value))} onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}/>
                          </div>
                      </div>
                      <div>
                          <div>

                          </div>
                      </div>
                      <div className='flex w-5/6 mx-auto min-h-36'>
                          <div className='block mb-2 w-full'>
                              <Label value='Description (optional)' htmlFor='desc'/>
                              <Textarea className='min-h-28' id='desc' value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)}/>
                          </div>
                      </div>
                      <div className='flex mx-auto justify-end w-5/6'>
                        <Button color='light' onClick={handleFinance}>
                          <p className='my-auto'>Financial Info</p>
                          <CaretRight size={18} className='my-auto' />
                        </Button>
                      </div>
                </div>

                <div className={`${second ? 'block' : 'hidden'}`}>
                      <div className='flex mx-auto w-5/6 space-x-3'>
                          <div className='block mb-2 w-1/2'>
                              <Label value='Average Water Bill' htmlFor='water'/>
                              <TextInput placeholder='Enter Amount' id='water' type='number' onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}/>
                          </div>
                          <div className='block mb-2 w-1/2'>
                              <Label value='Average Electricity/Gas Bill' htmlFor='elec'/>
                              <TextInput placeholder='Enter Amount' id='elec' type='number' onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}/>
                          </div>
                      </div>
                      <div className='grid grid-flow-row grid-cols-2 mx-auto w-5/6 gap-3 pb-5'>
                          {
                            houseOrRoomType === 'Rooms' && Array.from({ length: rooms! }).map((it, index) => 
                              <div className='mb-2 block' key={index}>
                                <Label htmlFor={`${index}`} value={`Room #${index+1}`}/>
                                <TextInput type='number' id={`${index}`} placeholder='Enter Amount' onChange={(e) => {
                                  let number = parseInt(e.target.value); 
                                  roomsArr[index] = {roomRent: number}
                                }} onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}/>
                              </div>
                            )
                          }
                      </div>
                      <div className="flex mx-auto justify-end w-5/6">
                      <Button color='light' onClick={addProp}>
                          <p className='my-auto'>Add Property</p>
                          <CaretRight size={18} className='my-auto' />
                        </Button>
                      </div>
                </div>
            </div>
        </div>
              </div>
      <div className="hidden lg:block">
        <SideNav />
      </div>
      <div className="bg-[#FEFFF6] w-full h-full">
        <div className="max-md:mx-2 max-lg::mx-10 lg:ml-52">
          <div className="flex justify-between pt-5 lg:pr-10 max-lg:mx-7">
            <div>
              <button className="flex" onClick={() => setIsOpen(true)}>
                <PlusSquare size={32} />
                <p className="my-auto">Add Property</p>
              </button>
            </div>
            <div className="max-lg:flex max-lg:justify-end relative w-72">
              <input
                type="search"
                className="w-56 lg:w-72 h-10 border-0 rounded-xl bg-gray-200 text-sm"
                value={value}
                placeholder="Search Properties"
                onChange={(e) => setValue(e.target.value)}
              />
              <MagnifyingGlass
                className="absolute top-[10px] right-4 lg:right-3 opacity-65"
                size={20}
              />
            </div>
          </div>

        
          <div className="max-lg:mx-auto mt-10 min-h-[650px] w-11/12 pb-10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="lg:w-[250px]">Property</TableHead>
                  <TableHead className="lg:w-[150px]">Property ID</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Rooms</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {properties &&
                  properties
                    .filter((item) => {
                      if (!value) return true;
                      if (
                        item.street
                          .toLowerCase()
                          .includes(value.toLowerCase()) ||
                        item.houseNumber.includes(value)
                      ) {
                        return true;
                      }
                    })
                    .map((prop, idx) => (
                      <TableRow key={idx} className="max-lg:text-xs">
                        <TableCell>
                          <p>{`${prop.houseNumber} ${prop.street}`}</p>
                          <p className="text-xs">{`${prop.city}, ${prop.state} ${prop.zip}`}</p>
                        </TableCell>
                        <TableCell>{prop.id}</TableCell>
                        <TableCell>{`$${
                          prop.houseOrRoomType === "Rooms"
                            ? prop.roomRent
                            : prop.houseRent
                        }`}</TableCell>
                        <TableCell>{prop.houseOrRoomType}</TableCell>
                        <TableCell>{prop.rooms}</TableCell>
                        <TableCell>
                          <p
                            className={`${
                              prop.tenantAssigned
                                ? "bg-red-400 rounded-xl"
                                : "bg-green-300 w-10 rounded-xl"
                            } w-14 md:w-16 h-7 text-center pt-[6px] lg:pt-1`}
                          >
                            {prop.tenantAssigned ? "Booked" : "Vacant"}
                          </p>
                        </TableCell>
                        <TableCell>
                          <a className="underline text-[#4E8AFF] hover:cursor-pointer" onClick={() => {setPropInfo(properties && properties.filter((proper) => proper.id === prop.id));}}>
                            Details
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      </PropContext.Provider>
  );
};

export default Properties;
