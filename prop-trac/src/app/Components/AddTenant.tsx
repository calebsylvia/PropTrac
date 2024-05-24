"use client";
import React, { useEffect, useState } from "react";
import { TextInput, Label, Select, Button } from "flowbite-react";
import { IProperties } from "@/Interfaces/Interfaces";
import { getProperties } from "@/Utils/DataService";

const AddTenant = (props: { open: boolean; onClose: () => void }) => {
  const [prop, setProps] = useState<IProperties[]>([]);
  const [fullProp, setFullProp] = useState<IProperties[]>([])
  const [id, setId] = useState<number>()

  const [selectedProp, setSelect] = useState<number>()
  const [type, setType] = useState<string>('')

  let iD: any;

  useEffect(() => {
    if(typeof window !== undefined){
        iD = localStorage.getItem("ID")
    }
  })

  useEffect(() => {

    setId(parseInt(iD))
    const getProps = async() => {
        const properties: IProperties[] = await getProperties(iD!)
        let filteredProps = properties.filter((elem, index) => index === properties.findIndex((element) => element.id === elem.id))
        console.log(filteredProps)
        console.log(properties)
        setProps(filteredProps)
        setFullProp(properties)
    }

    getProps()
  }, []);


  return (
    <>
      <div className={`${props.open ? "" : "hidden"}`}>
        <div className="bg-black bg-opacity-25 z-50 w-full h-full fixed">
          <div className="bg-white rounded-xl w-11/12 md:w-3/5 lg:w-1/2 xl:w-1/3 min-h-[300px] mx-auto left-5 md:left-[20%] lg:left-[25%] xl:left-[35%] top-[25%] md:top-[20%] fixed">
            <p className="text-center text-xl font-medium my-3">Add Tenant</p>
            <div className="flex justify-between mx-6">
              <div className="block mb-2">
                <Label value="First Name" htmlFor="tenantFirst" />
                <TextInput
                  id="tenantFirst"
                  type="text"
                  placeholder="First Name"
                  className="w-36 md:w-48 border-black"
                />
              </div>
              <div className="block mb-2">
                <Label value="Last Name" htmlFor="tenantLast" />
                <TextInput
                  id="tenantLast"
                  type="text"
                  placeholder="Last Name"
                  className="w-36 md:w-48 border-black"
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
                />
              </div>
              <div className="block mb-2">
                <Label value="Email" htmlFor="email" />
                <TextInput
                  className="w-36 md:w-48 border-black"
                  type="email"
                  placeholder="Tenant Email"
                />
              </div>
            </div>
            <div className="flex justify-between mx-6">
                <div className="block mb-2">
                    <Label value="Lease Type" htmlFor="type"/>
                    <Select id="type" className="w-36 md:w-48" onChange={(e) => setType(e.target.value)}>
                        <option value="Annually">Annually</option>
                        <option value="Monthly">Monthly</option>
                    </Select>
                </div>
                <div>
                    <Label value="Lease Dates" htmlFor="dates"/>
                </div>
            </div>
            <div className="flex justify-between mx-6">
              <div className="block mb-2">
                <Label value="Location" htmlFor="loc" />
                <Select id="loc" className="w-36 md:w-48" onChange={(e) => setSelect(parseInt(e.target.value))}>
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
                            selectedProp === x.id
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
              <Button color="light">Add Tenant</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTenant;
