"use client";
import React, { useState, useEffect, useContext } from "react";
import SideNav from "../SideNav";
import {
  Bathtub,
  Bed,
  CaretCircleLeft,
  CaretRight,
  MapPinSimple,
  NotePencil,
  Trash,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import downGreen from "@/app/Assets/downGreen.png";
import downRed from "@/app/Assets/downRed.png";
import upGreen from "@/app/Assets/upGreen.png";
import upRed from "@/app/Assets/upRed.png";
import test from "@/app/Assets/bg.png";
import { useSearchParams } from "next/navigation";
import {
  IAddProp,
  IGeo,
  IProperties,
  RoomsList,
} from "@/Interfaces/Interfaces";
import TopNav from "../TopNav";
import { deleteProp, editProperty } from "@/Utils/DataService";
import { useToast } from "@/components/ui/use-toast";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { AddressAutofill } from "@mapbox/search-js-react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const PropertyInfo = () => {
  const [houseNumber, setHouseNumber] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [houseOrRoomType, setHouseOrRoomType] = useState<string>("House");
  const [houseRent, setHouseRent] = useState<number>(0);
  const [amenFeatList, setAmenFeatList] = useState<string>("");
  const [roomRent, setRoomRent] = useState<RoomsList[]>([]);

  const [id, setId] = useState<number>();
  const [image, setImage] = useState<string | StaticImageData>(test);
  const [address, setAddress] = useState<string>("");
  const [cityState, setCityState] = useState<string>("");
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(500);
  const [profit, setProfit] = useState<number>(500);
  const [rooms, setRooms] = useState<number>(3);
  const [baths, setBaths] = useState<number>(2.5);
  const [sqft, setSqft] = useState<number>(1000);
  const [description, setDescription] = useState<string>("");
  const [featsAmen, setFeatsAmen] = useState<string[]>([]);
  const [roomCost, setRoomCost] = useState<RoomsList[] | null[]>([]);

  const states: string[] = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const [first, setFirst] = useState<boolean>(false);
  const [second, setSecond] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRooms, setIsRooms] = useState<boolean>(false);
  const [re, setRe] = useState<string>("");

  const [lat, setLat] = useState<number>(90);
  const [lng, setLng] = useState<number>(90);

  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  let total: number = 0;
  let roomsArr: RoomsList[] = [];
  let userID: number;

  const handleBack = () => {
    router.push("/Properties");
  };

  useEffect(() => {
    console.log(JSON.parse(searchParams.get("propInfo")!));
    const propData: IProperties[] = JSON.parse(searchParams.get("propInfo")!);

    const getCoords = async () => {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${
          propData[0].houseNumber
        }%20${propData[0].street.replace(
          " ",
          "%20"
        )}%20${propData[0].city}%20${propData[0].state}%20${propData[0].zip}.json?access_token=${process.env.NEXT_PUBLIC_MAP_KEY!}`
      );
      const data: IGeo = await res.json();
      console.log(data.features[0].geometry.coordinates);

      setLat(data.features[0].geometry.coordinates[1]);
      setLng(data.features[0].geometry.coordinates[0]);
    };

    getCoords();
    const feats = propData[0].amenFeatList.split(", ");
    const roomArr = propData.map((room) => room.roomRent);
    console.log(roomArr);

    if (roomArr && roomArr.length > 0) {
      for (let i = 0; i < roomArr.length; i++) {
        total += roomArr[i]!;
      }
      setIncome(total);
    } else {
      setIncome(propData[0].houseRent);
    }

    setId(propData[0].id);
    setAddress(`${propData[0].houseNumber} ${propData[0].street}`);
    setCity(propData[0].city);
    setZip(propData[0].zip);
    setState(propData[0].state);
    setCityState(
      `${propData[0].city}, ${propData[0].state} ${propData[0].zip}`
    );
    setRooms(propData[0].rooms);
    setBaths(propData[0].baths);
    setDescription(propData[0].description);
    setSqft(propData[0].sqft);
    setFeatsAmen(feats);
    setRoomCost(roomArr);
    setExpenses(propData[0].houseRent);
    setProfit(income - expenses);
  }, [re]);

  useEffect(() => {
    console.log(income);
  }, []);

  const editProp = async () => {
    if (typeof window !== undefined) {
      userID = parseInt(localStorage.getItem("ID")!);
    }

    setRoomRent(roomsArr);

    let prop: IAddProp = {
      id: id!,
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
      roomsList: roomsArr,
    };

    let result = await editProperty(prop);

    console.log(result);

    if (result === false) {
      return toast({
        description: "Something went wrong. Try again!",
        variant: "destructive",
      });
    } else {
      setIsOpen(false);
      setFirst(false);
      setSecond(false);
      setRe(" ");
      toast({ description: "Property Edited Successfully" });
      router.push("/Properties");
    }
  };

  const handleDelete = async () => {
    let propToDel = {
      propertyId: id!,
    };

    let success = await deleteProp(propToDel);

    if (!success) {
      return toast({
        description: "Something went wrong try again!",
        variant: "destructive",
      });
    } else {
      toast({
        description: "Property Successfully Deleted",
        variant: "default",
      });
      router.push("/Properties");
    }
  };

  const handleDetails = () => {
    if (
      street.length < 1 ||
      state.length < 1 ||
      zip.length < 1 ||
      houseRent <= 0
    ) {
      return toast({
        description: "Please make sure all fields are filled out accordingly",
        variant: "destructive",
      });
    } else {
      setFirst(true);
    }
  };

  const handleFinance = () => {
    if (rooms <= 0 || baths <= 0 || sqft <= 0) {
      return toast({
        description: "Please make sure all fields are filled out accordingly",
        variant: "destructive",
      });
    } else {
      setSecond(true);
    }
  };

  const handleExit = (e: any) => {
    e.preventDefault();
    setFirst(false);
    setSecond(false);
    setIsOpen(false);
  };

  return (
    <>
      <div className={`${isOpen ? "block" : "hidden"}`}>
        <div className="bg-black bg-opacity-25 z-50 w-full h-full md:h-[127vh] fixed">
          <div className=" bg-white rounded-xl w-11/12 md:w-3/5 lg:w-1/2 xl:w-1/3 min-h-[400px] mx-auto left-5 md:left-[20%] lg:left-[25%] xl:left-[35%] top-[10%] md:top-[20%] fixed">
            <p
              className={`${
                first || second ? "hidden" : "block"
              } text-center text-xl py-4`}
            >
              Edit Property
            </p>
            <p
              className={`${
                first && !second ? "block" : "hidden"
              } text-center text-xl py-4`}
            >
              Property Details
            </p>
            <p
              className={`${
                second ? "block" : "hidden"
              } text-center text-xl py-4`}
            >
              Financial Information
            </p>

            <div
              className={`${
                first ? "hidden" : "block"
              } flex flex-col space-y-3`}
            >
              <div className="mx-auto w-5/6">
                <div className="block mb-2">
                  <Label value="Street Address" htmlFor="address" />
                  <AddressAutofill
                    accessToken={process.env.NEXT_PUBLIC_MAP_KEY!}
                  >
                    <TextInput
                      id="address"
                      placeholder="Address"
                      defaultValue={address}
                      type="text"
                      onChange={(e) => {
                        let splitAdd = e.target.value.split(" ");
                        setHouseNumber(splitAdd[0]);
                        let addr = "";
                        for (let i = 1; i < splitAdd.length; i++) {
                          addr += splitAdd[i] + " ";
                        }
                        setStreet(addr.trim());
                      }}
                      required
                    />
                  </AddressAutofill>
                </div>
              </div>
              <div className="flex mx-auto space-x-4 w-5/6">
                <div className="block mb-2 w-2/5">
                  <Label value="City" htmlFor="city" />
                  <TextInput
                    className=""
                    placeholder="City"
                    id="city"
                    type="text"
                    defaultValue={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="block mb-2 w-2/5">
                  <Label value="ZIP" htmlFor="zip" />
                  <TextInput
                    id="zip"
                    type="number"
                    placeholder="ZIP"
                    defaultValue={zip}
                    onChange={(e) => setZip(e.target.value)}
                    required
                  />
                </div>
                <div className="block mb-2">
                  <Label value="State" htmlFor="state" />
                  <Select
                    id="state"
                    defaultValue={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  >
                    {states.map((state, idx) => (
                      <option key={idx} value={state}>
                        {state}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="flex mx-auto w-5/6 space-x-4">
                <div className="block mb-2 w-full">
                  <Label value="Property Type" htmlFor="type" />
                  <Select
                    onChange={(e) => {
                      setHouseOrRoomType(e.target.value);
                      e.target.value === "Rooms"
                        ? setIsRooms(true)
                        : setIsRooms(false);
                    }}
                    required
                  >
                    <option value="House">Whole House</option>
                    <option value="Rooms">Rooms</option>
                  </Select>
                </div>
                <div className="block mb-2 w-full">
                  <Label value="Mortgage/Rent" htmlFor="houseRent" />
                  <TextInput
                    id="houseRent"
                    placeholder="Amount"
                    defaultValue={houseRent}
                    type="number"
                    onChange={(e) => setHouseRent(parseInt(e.target.value))}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between w-5/6 mx-auto pt-2">
                <Button color="light" onClick={handleExit}>
                  <p>Cancel</p>
                </Button>
                <Button color="light" className="flex" onClick={handleDetails}>
                  <p className="my-auto">Property Details</p>
                  <CaretRight size={18} className="my-auto" />
                </Button>
              </div>
            </div>

            <div
              className={`${
                first && !second ? "block" : "hidden"
              } flex flex-col space-y-3`}
            >
              <div className="flex mx-auto w-5/6 space-x-4">
                <div className="block mb-2">
                  <Label value="Room(s)" htmlFor="rooms" />
                  <TextInput
                    max={8}
                    placeholder="Rooms"
                    id="rooms"
                    type="number"
                    defaultValue={rooms}
                    onChange={(e) => {
                      parseInt(e.target.value) <= 8
                        ? setRooms(parseInt(e.target.value))
                        : toast({
                            description: "Max Rooms is 8",
                            variant: "destructive",
                          });
                    }}
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-"].includes(evt.key) &&
                      evt.preventDefault()
                    }
                  />
                </div>
                <div className="block mb-2">
                  <Label value="Bath(s)" htmlFor="baths" />
                  <TextInput
                    placeholder="Baths"
                    id="baths"
                    type="number"
                    defaultValue={baths}
                    onChange={(e) => setBaths(parseInt(e.target.value))}
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-"].includes(evt.key) &&
                      evt.preventDefault()
                    }
                  />
                </div>
                <div className="block mb-2">
                  <Label value="Square Ft." htmlFor="sqft" />
                  <TextInput
                    placeholder="Square Ft."
                    id="sqft"
                    type="number"
                    defaultValue={sqft}
                    onChange={(e) => setSqft(parseInt(e.target.value))}
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-"].includes(evt.key) &&
                      evt.preventDefault()
                    }
                  />
                </div>
              </div>
              <div>
                <div></div>
              </div>
              <div className="flex w-5/6 mx-auto min-h-36">
                <div className="block mb-2 w-full">
                  <Label value="Description (optional)" htmlFor="desc" />
                  <Textarea
                    className="min-h-28"
                    id="desc"
                    placeholder="Description"
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex mx-auto justify-between w-5/6">
                <Button color="light" onClick={handleExit}>
                  <p>Cancel</p>
                </Button>
                <Button color="light" onClick={handleFinance}>
                  <p className="my-auto">Financial Info</p>
                  <CaretRight size={18} className="my-auto" />
                </Button>
              </div>
            </div>

            <div className={`${second ? "block" : "hidden"}`}>
              <div className="flex max-md:flex-col mx-auto w-5/6 md:space-x-3">
                <div className="block mb-2 w-2/3 md:w-1/2">
                  <Label value="Average Water Bill" htmlFor="water" />
                  <TextInput
                    placeholder="Enter Amount"
                    id="water"
                    type="number"
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-"].includes(evt.key) &&
                      evt.preventDefault()
                    }
                  />
                </div>
                <div className="block mb-2 w-2/3 md:w-1/2">
                  <Label value="Average Electricity/Gas Bill" htmlFor="elec" />
                  <TextInput
                    placeholder="Enter Amount"
                    id="elec"
                    type="number"
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-"].includes(evt.key) &&
                      evt.preventDefault()
                    }
                  />
                </div>
              </div>
              <div className="grid grid-flow-row grid-cols-2 mx-auto w-5/6 gap-3 pb-5">
                {houseOrRoomType === "Rooms" &&
                  Array.from({ length: rooms! }).map((it, index) => (
                    <div className="mb-2 block" key={index}>
                      <Label
                        htmlFor={`${index}`}
                        value={`Room #${index + 1}`}
                      />
                      <TextInput
                        type="number"
                        id={`${index}`}
                        placeholder="Enter Amount"
                        onChange={(e) => {
                          let number = parseInt(e.target.value);
                          roomsArr[index] = { roomRent: number };
                        }}
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-"].includes(evt.key) &&
                          evt.preventDefault()
                        }
                      />
                    </div>
                  ))}
              </div>
              <div className="flex mx-auto justify-between w-5/6 pb-5">
                <Button color="light" onClick={handleExit}>
                  <p>Cancel</p>
                </Button>
                <Button color="light" onClick={editProp}>
                  <p className="my-auto">Finish Edit</p>
                  <CaretRight size={18} className="my-auto" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <SideNav />
      </div>
      <div className="block lg:hidden">
        <TopNav />
      </div>
      <div className="bg-[#FEFFF6] w-screen h-screen">
        <div className="lg:ml-52 pt-6">
          <button className="flex max-lg:pl-4 pb-5" onClick={handleBack}>
            <CaretCircleLeft size={36} weight="fill" />
            <p className="my-auto">Back to Properties</p>
          </button>
          <div className="flex max-md:flex-col max-lg:justify-center md:space-x-6 max-lg:mx-auto xl:space-x-12">
            <div className="w-11/12 max-md:mx-4 md:w-2/5">
              <div className="pb-8 xl:pb-16">
                <Image
                  src={image}
                  alt="Property Image"
                  className="lg:w-11/12 xl:w-4/5 max-h-[200px] mb-3 rounded-xl shadow-[0_5px_5px_2px_rgba(60,60,60,0.4)]"
                />
                <p className="font-semibold text-lg">{address}</p>
                <p className="text-sm">{cityState}</p>
              </div>
              <div className="bg-white border-black border-2 rounded-xl w-full md:w-4/5 xl:w-3/5">
                <div className="py-2">
                  <p className="pl-2 xl:pt-1">Active Income:</p>
                  <div className="flex justify-center pb-3">
                    <p className="text-3xl xl:text-4xl">{`$${income}`}</p>
                    <Image className="my-auto" src={upGreen} alt="Up Arrow" />
                  </div>
                </div>
                <hr className="w-5/6 mx-auto" />
                <div className="py-2">
                  <p className="pl-2 pt-1">Total Expenses:</p>
                  <div className="flex justify-center pb-3">
                    <p className="text-3xl xl:text-4xl">{`$${expenses}`}</p>
                    <Image className="my-auto" src={downRed} alt="Up Arrow" />
                  </div>
                </div>
                <hr className="w-5/6 mx-auto" />
                <div className="py-2">
                  <p className="pl-2 pt-1">Net Profit:</p>
                  <div className="flex justify-center pb-3">
                    <p className="text-3xl xl:text-4xl">{`$${profit}`}</p>
                    <Image className="my-auto" src={upGreen} alt="Up Arrow" />
                  </div>
                </div>
              </div>
              <div className="flex max-md:mx-auto justify-between w-11/12 xl:w-4/5 pt-6 md:pt-10 max-md:pb-5">
                <button
                  className="flex bg-[#E5E5E5] px-3 py-2 rounded-xl"
                  onClick={() => setIsOpen(true)}
                >
                  <NotePencil size={24} className="my-auto mr-1" />
                  <p className="my-auto text-xs lg:text-sm xl:text-base">
                    Edit Property
                  </p>
                </button>
                <button
                  className="flex bg-[#DD7575] px-3 py-2 rounded-xl"
                  onClick={handleDelete}
                >
                  <Trash size={24} className="my-auto mr-1" />
                  <p className="my-auto text-xs lg:text-sm xl:text-base">
                    Delete Property
                  </p>
                </button>
              </div>
            </div>

            <div className="bg-[#EEE2D1] rounded-xl w-11/12 md:w-1/2 xl:w-[45%] max-md:mx-auto max-md:mb-5">
              <div className="bg-white border-black border-2 rounded-xl w-11/12 md:w-5/6 mx-auto mb-5 md:mb-10 xl:mb-8 mt-5 md:mt-10 min-h-80 xl:min-h-96">
                <div className="flex justify-between pt-5 mx-5">
                  <div>
                    <p>Room(s):</p>
                    <div className="flex justify-center">
                      <p>{rooms}</p>
                      <Bed className="my-auto pl-1" size={20} />
                    </div>
                  </div>
                  <div>
                    <p>Bath(s):</p>
                    <div className="flex justify-center">
                      <p>{baths}</p>
                      <Bathtub className="my-auto pl-1" size={20} />
                    </div>
                  </div>
                  <div>
                    <p>Sqaure Ft:</p>
                    <div className="text-center">
                      <p>{sqft}</p>
                    </div>
                  </div>
                </div>
                <div className="mx-5 py-6">
                  <p className="max-lg:text-sm">Description:</p>
                  <p className="text-xs lg:text-sm pl-2 lg:pb-5 xl:pb-0">
                    {description}
                  </p>
                </div>

                <div className="ml-5 flex justify-between">
                  <div>
                    <p className="max-lg:text-sm">Features and Amenities:</p>
                    <ul className="list-disc pl-5 pt-1 overflow-y-auto text-xs xl:text-sm">
                      {featsAmen &&
                        featsAmen.map((feat, idx) => <li key={idx}>{feat}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="max-lg:text-sm">Costs:</p>

                    <div className="flex flex-col pl-2 text-xs xl:text-sm mr-6 lg:mr-5 xl:mr-24">
                      {roomCost.length > 1 ? (
                        roomCost.map((room, idx) => (
                          <div key={idx}>
                            <p>{`Room ${idx + 1}: $${room}`}</p>
                          </div>
                        ))
                      ) : (
                        <div>
                          <p>{`Rent: $${income}`}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-black border-2 w-11/12 max-md:mb-5 md:w-5/6 h-[200px] mx-auto">
                <Map
                  mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_KEY!}
                  mapStyle="mapbox://styles/mapbox/standard"
                  {...{
                    longitude: lng,
                    latitude: lat,
                    zoom: 16,
                  }}
                  style={{ height: "100%" }}
                ></Map>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyInfo;
