"use client";
import React, { useState, createContext } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { IToken } from "../../Interfaces/Interfaces";
import { getUserInfo, login } from "../../Utils/DataService";
import { toast, useToast } from "@/components/ui/use-toast";
import { Eye, EyeClosed } from "@phosphor-icons/react";

const LoginContext = createContext(null)

const LoginComponent = () => {

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [logged, setLogged] = useState<boolean>(false)

  const [showPass, setShowPass] = useState<boolean>(true)

  const router = useRouter();
  const { toast } = useToast()


  const handleLogin = async() => {

    let userData = {
      UsernameOrEmail: username,
      Password: password
    }


    let token = await login(userData);
    let data = await getUserInfo(username);

      console.log(token);

      //Check to see if logged in
      if(token.token != null && typeof window !== undefined){
        setLogged(true)
        localStorage.setItem("Token", token.token)
        
        if(data.isManager === true){
          localStorage.setItem("ID", data.id);
          router.push('/AdminDash')
        }else{
          localStorage.setItem("ID", data.id);
          router.push('/TenantDash')
        }
      }else if(!data || logged === false){
        return toast({
          variant: 'destructive',
          title: 'Invalid username or password',
          description: 'Please try again'
        })
      }
  }

  const handleCreate = () => {
    router.push('/CreateAccount')
  }

  const handleForgot = () => {
    router.push('/ForgotPassword')
  }


  return (
    <>
    <div className="max-sm:w-5/6 w-[400px] bg-white rounded-xl py-6"> 
      <p className="text-3xl text-center mt-4 pb-6 tracking-wide">Welcome Back</p>
      <hr className="pb-6"/>
      <form className="flex flex-col gap-4">
            <div className="mx-auto">
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Email / Username" />
              </div>
              <TextInput
                id="email1"
                type="text"
                className="w-48 md:w-72 border-black"
                onChange={(e) => {setUsername(e.target.value)}}
                required
              />
            </div>
            <div className="mb-3 md:mb-8 mx-auto">
              <div className="mb-2 mr-3 flex justify-between">
                <Label htmlFor="password1" value="Password" />
                <Eye size={24} className={`${showPass ? '' : 'hidden'} hover:cursor-pointer`} onClick={() => setShowPass(false)}/>
                <EyeClosed size={24} className={`${!showPass ? '' : 'hidden'} hover:cursor-pointer`} onClick={() => setShowPass(true)}/>
              </div>
              <TextInput
                id="password1"
                type={`${!showPass ? 'text' : 'password'}`}
                className="w-48 md:w-72 border-black"
                onChange={(e) => {setPassword(e.target.value)}}
                required
              />
            </div>

            <div className="md:flex md:space-x-6 mb-4 mx-auto">
              <Button
                className="w-28 md:w-36 max-sm:mb-3"
                color="light"
                onClick={handleLogin}
              >
                Log In
              </Button>
              <a onClick={handleForgot} className="underline text-sm my-auto hover:cursor-pointer">
                Forget Password?
              </a>
            </div>
            <div className="mx-auto mb-3">
              <a
                onClick={handleCreate}
                className="underline text-[#0744A0] text-sm text-center hover:cursor-pointer"
              >
                New User? Create an Account
              </a>
            </div>
          </form>
          </div>
    </>
  );
};

export default LoginComponent;
