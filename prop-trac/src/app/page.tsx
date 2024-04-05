import LoginComponent from "./Components/LoginComponent";

export default function Home() {
  return (
    <>
      <div className="background w-screen h-screen flex">
        <div className="w-1/3 text-center pl-20 pt-20">
          <h1 className="text-9xl text-[#5A5A5A]">
            PROP
            <br />
            TRAC
          </h1>
          <p className="">Property management at your fingertips</p>
        </div>
        <div className="w-[400px] m-auto">
          <LoginComponent/>
        </div>
      </div>
    </>
  );
}
