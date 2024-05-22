"use client";
import React, { useEffect, useState } from "react";
import SideNav from "../Components/SideNav";
import TopNav from "../Components/TopNav";
import { IMaintenance } from "@/Interfaces/Interfaces";
import { checkToken, getMaintenance } from "@/Utils/DataService";
import { useRouter } from "next/navigation";

const Maintenance = () => {

  const [mainArr, setMainArr] = useState<IMaintenance[]>([]);
  const [id, setId] = useState<number>(1);

  const router = useRouter();

  let iD: any;

  useEffect(() => {
    if (typeof window !== undefined) {
      if (!checkToken()) {
        router.push("/");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      iD = localStorage.getItem("ID")
      setId(parseInt(iD!))
    }
  },[])

  useEffect(() => {
    const getMainReq = async(userId: number) => {
      const mainReq = await getMaintenance(userId)

      setMainArr(mainReq)
      console.log(mainArr)
    }
    getMainReq(id)
  },[])

  useEffect(() => {
    console.log(mainArr);
  }, []);

  return (
    <>
      <div className="hidden lg:block">
        <SideNav />
      </div>
      <div className="block lg:hidden">
        <TopNav />
      </div>

      <div className="bg-[#FEFFF6] w-full h-full">
        <div className="max-lg:mx-auto lg:ml-56 w-11/12 lg:w-3/4">
          <p className="text-3xl py-7">Maintenance Requests</p>
          <div className="flex flex-col">
            <div className="bg-white border-2 border-black rounded-xl grid grid-rows-3 min-h-[450px] mb-5">
              <div className="">
                <p className="text-lg md:text-2xl pl-4 pt-2">To-Do</p>
                <div className="flex overflow-x-auto mx-5 my-3 space-x-5">
                  {
                    mainArr && mainArr.filter((main) => 
                      main.status === 'To Do'
                    ).map((maint, idx) => 
                      <div className="border-2 border-black rounded-xl w-48 md:w-56 px-4 py-4" key={idx}>
                          <p className="text-base md:text-lg font-semibold">{maint.category}</p>
                          <div className="flex justify-between text-sm md:text-base">
                          <p>{(maint.dateRequested).substring(0,10)}</p>
                          <p>{`Prop ID: ${maint.propertyInfoID}`}</p>
                          </div>
                          <p className="text-sm md:text-base">{maint.priority}</p>
                      </div>
                    )
                }
                </div>
                <hr className="w-full  border-black" />
              </div>
              <div className="">
                <p className="text-lg md:text-2xl pl-4 pt-2">In Progress</p>
                <div className="flex overflow-x-auto mx-5 my-3 space-x-5">
                  {
                    mainArr && mainArr.filter((main) => 
                      main.status === 'In Progress'
                    ).map((maint, idx) => 
                      <div className="border-2 border-black rounded-xl w-48 md:w-56 px-4 py-4" key={idx}>
                          <p className="text-base md:text-lg font-semibold">{maint.category}</p>
                          <div className="flex justify-between text-sm md:text-base">
                          <p>{(maint.dateRequested).substring(0,10)}</p>
                          <p>{`Prop ID: ${maint.propertyInfoID}`}</p>
                          </div>
                          <p className="text-sm md:text-base">{maint.priority}</p>
                      </div>
                    )
                }
                </div>
                <hr className="w-full  border-black" />
              </div>
              <div className="">
                <p className="text-lg lg:text-2xl pl-4 pt-2">Completed</p>
                <div className="flex overflow-x-auto mx-5 my-3 space-x-5">
                  {
                    mainArr && mainArr.filter((main) => 
                      main.status === 'Completed'
                    ).map((maint, idx) => 
                      <div className="border-2 border-black rounded-xl w-48 md:w-56 px-4 py-4" key={idx}>
                          <p className="text-base md:text-lg font-semibold">{maint.category}</p>
                          <div className="flex justify-between text-sm md:text-base">
                          <p>{(maint.dateRequested).substring(0,10)}</p>
                          <p>{`Prop ID: ${maint.propertyInfoID}`}</p>
                          </div>
                          <p className="text-sm md:text-base">{maint.priority}</p>
                      </div>
                    )
                }
                </div>
              </div>
            </div>
            <div className="bg-[#EEE2D1] rounded-xl py-5 px-6 border-black border-2 overflow-y-auto md:overflow-x-auto">
              <p className="font-semibold text-lg">Contractors</p>
              <div>
                {

                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Maintenance;
