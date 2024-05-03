'use client'
import LoginComponent from "./Components/LoginComponent";

export default function Home() {
  return (
    <>
      <div className="background w-screen h-screen lg:flex">
        <div className="w-full lg:w-1/3 text-center lg:pl-20 pt-10 lg:pt-20">
          <h1 className="text-7xl lg:text-9xl text-[#5A5A5A]">
            PROP
            <br />
            TRAC
          </h1>
          <p className="md:text-sm max-md:pb-8 md:pb-10">Property management at your fingertips</p>
        </div>
        <div className="max-sm:flex max-sm:justify-center max-sm:mx-auto max-w-[400px] md:m-auto">
          <LoginComponent/>
        </div>
      </div>
    </>
  );
}
