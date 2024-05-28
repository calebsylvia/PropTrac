"use client";
import React, { useEffect, useState } from "react";
import { TextInput, Label, Select, Button, Datepicker } from "flowbite-react";
import { IAddTenant, IProperties } from "@/Interfaces/Interfaces";
import { addTenant, getProperties } from "@/Utils/DataService";
import { PhoneIncoming } from "@phosphor-icons/react";
import { useToast } from "@/components/ui/use-toast";

const AddTenant = (props: { open: boolean; onClose: () => void, addProp: () => void}) => {
  const [prop, setProps] = useState<IProperties[]>([]);
  const [fullProp, setFullProp] = useState<IProperties[]>([])
  const [id, setId] = useState<number>()
  let current = new Date()

  const [selectedProp, setSelect] = useState<number | null>()
  const [type, setType] = useState<string>('Annually')
  const [start, setStart] = useState<any>(current.toString())
  const [end, setEnd] = useState<any>(current.toString())

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')

  let iD: any;
  const {toast} = useToast()

  useEffect(() => {
    if(typeof window !== undefined){
        iD = localStorage.getItem("ID")
    }
  },[])

  useEffect(() => {

    setId(parseInt(iD))
    const getProps = async() => {
        const properties: IProperties[] = await getProperties(parseInt(iD!))
        let filteredProps = properties.filter((elem, index) => index === properties.findIndex((element) => element.id === elem.id))
        setProps(filteredProps)
        setFullProp(properties)
    }

    getProps()
  }, []);


  const handleAdd = async() => {

    let tenant:IAddTenant = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      leaseType: type,
      leaseStart: start,
      leaseEnd: end,
      propertyInfoID: selectedProp!,
      roomInfoID: null,
      documentsType: null,
      documentsContent: null,
      documentsName: null
    }

    const result = await addTenant(tenant)

     if(result === false){
        return toast({description: 'Something went wrong. Try again!', variant:"destructive"})
     }else{
        return toast({description: 'Tenant Added Successfully', variant:'default'})
     }
  }

  return (
    <>
      <div className={`${props.open ? "" : "hidden"}`}>
        <div className="bg-black bg-opacity-25 z-50 w-full h-full fixed">
          <div className="bg-white rounded-xl w-11/12 md:w-3/5 lg:w-1/2 xl:w-1/3 min-h-[300px] mx-auto max-md:pb-3 left-5 md:left-[20%] lg:left-[25%] xl:left-[35%] top-[4%] md:top-[8%] md:fixed">
            <p className="text-center text-xl font-medium max-md:pt-2 my-3">Add Tenant</p>
            <div className="flex justify-between mx-6">
              <div className="block mb-2">
                <Label value="First Name" htmlFor="tenantFirst" />
                <TextInput
                  id="tenantFirst"
                  type="text"
                  placeholder="First Name"
                  className="w-36 md:w-48 border-black"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="block mb-2">
                <Label value="Last Name" htmlFor="tenantLast" />
                <TextInput
                  id="tenantLast"
                  type="text"
                  placeholder="Last Name"
                  className="w-36 md:w-48 border-black"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex justify-between mx-6">
              <div className="block mb-2">
                <Label value="Phone #" htmlFor="phone" />
                <TextInput
                  className="w-36 md:w-48 border-black"
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder="Tenant Number"
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="block mb-2">
                <Label value="Email" htmlFor="email" />
                <TextInput
                  className="w-36 md:w-48 border-black"
                  type="email"
                  placeholder="Tenant Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex max-md:flex-col md:justify-between mx-6">
                <div className="block mb-2">
                    <Label value="Lease Type" htmlFor="type"/>
                    <Select id="type" className="w-36 md:w-48" onChange={(e) => setType(e.target.value)} required>
                        <option selected disabled>Select Type</option>
                        <option value="Annually">Annually</option>
                        <option value="Monthly">Monthly</option>
                    </Select>
                </div>
            </div>
            <div className="flex max-md:flex-col md:justify-between mx-6">
                <div className="block mb-2">
                    <Label value="Lease Start" htmlFor="dates"/>
                    <Datepicker className="w-36 md:w-48" id="dates" defaultValue={current.toString()} onSelectedDateChanged={(date) => setStart(date)} required/>
                </div>
                <div className="block mb-2">
                    <Label value="Lease End" htmlFor="date"/>
                    <Datepicker className="w-36 md:w-48" id="date" defaultValue={current.toString()} onSelectedDateChanged={(date) => setEnd(date)} required/>
                </div>
            </div>
            <div className="flex justify-between mx-6">
              <div className="block mb-2">
                <Label value="Location" htmlFor="loc" />
                <Select id="loc" className="w-36 md:w-48" onChange={(e) => setSelect(parseInt(e.target.value))}>
                  <option disabled selected>Select Property</option>
                  {prop.map((p, idx) => (
                    <option key={idx} value={p.id}>{`${p.houseNumber} ${p.street}, ${p.city} ${p.state}`}</option>
                  ))}
                </Select>
              </div>
              <div className="block mb-2">
                <Label value="Room" htmlFor="room"/>
                <Select id="room" className="w-36 md:w-48">
                    {
                        fullProp && fullProp.filter((x) => {
                            x.id === selectedProp
                        }).map((p, idx) => 
                            <option key={idx} value={p.roomID!}>{`Room ${p.roomID} - ${p.roomRent}`}</option>
                        )
                    }
                </Select>
              </div>
            </div>
            <div className="flex justify-evenly mt-7 mb-4">
              <Button color="light" onClick={props.onClose}>
                Cancel
              </Button>
              <Button color="light" onClick={() => {handleAdd().then(props.addProp!)
              }}>Add Tenant</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTenant;
