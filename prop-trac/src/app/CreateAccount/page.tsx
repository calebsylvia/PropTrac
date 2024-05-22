'use client'
import React, { useEffect, useState } from 'react'
import { Label, TextInput, Select, Button } from 'flowbite-react'
import { createAccount, getSecurityQuestions } from '@/Utils/DataService'
import { useRouter } from 'next/navigation'
import {  ArrowBendUpLeft } from '@phosphor-icons/react'
import { toast, useToast } from '@/components/ui/use-toast'


const CreateAccount = () => {

  const [id, setId] = useState<number>(0)
  const [username, setUsername] = useState<string>("")
  const [testPass, setTestPass] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isManager, setIsManager] = useState<boolean>(true)
  const [email, setEmail] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [securityId, setSecurityId] = useState<number>(1)
  const [securityAns, setSecurityAns] = useState<string>("")
  const [securityArray, setSecurityArray] = useState<string[]>([])
  const [isEight, setIsEight] = useState<boolean>()
  const [match, setMatch] = useState<boolean>(true)
  const [disable, setDisable] = useState<boolean>(true)

  const [spec, setSpec] = useState<boolean>(false)

  const router = useRouter()
  const { toast} = useToast()



  useEffect(() => {
      const getQuestions = async() => {
        let questions = await getSecurityQuestions()
        setSecurityArray(questions)
      }

      console.log(username.length)
      getQuestions()
  }, [])

    const handleSubmit = async(e: any) => {
        e.preventDefault();

        if(password.length < 8 && testPass.length < 8){
          return toast({variant: "destructive", description: "Password must be 8 characters long"})
        }
          else{
          let userInfo = {
            ID: id,
            Username: username,
            Password: password,
            Email: email,
            IsManager: isManager,
            FirstName: firstName,
            LastName: lastName,
            SecurityAnswer: securityAns,
            SecurityQuestionID: securityId
          }
          let success: boolean = await createAccount(userInfo)
          
          if(success === true){
            toast({description: "Account creation successful!"})
            router.push('/')
          }else{
            toast({description: "Username or Email is already exists", variant: 'destructive'})
          }
        }
    }


  const handleBack = () => {
    router.push('/')
  }


  return (
    <>
      <div className='background h-full md:h-screen w-screen flex'>
        <div className='bg-white w-5/6 md:w-2/3 lg:w-2/5 min-h-2/3 m-auto rounded-xl relative max-md:my-6'>
            <button className='absolute top-5 left-8' onClick={handleBack}>
            <ArrowBendUpLeft size={28} />
            </button>
            <p className='text-xl lg:text-2xl text-center pt-10 pb-6'>Create Account</p>
            <div>
              <form className='px-8 md:space-y-2' onSubmit={handleSubmit}>

                <div className='flex max-md:flex-col md:justify-between'>
                  <div className='mb-2 block max-md:mx-auto max-md:w-full'>
                  <Label htmlFor='accountType' value='Account Type'/>
                  <Select className='w-full md:w-48 lg:w-56' id='accountType' onChange={(e) => {e.target.value === "manager" ? setIsManager(true) : setIsManager(false)}}  required>
                    <option value="manager">Manager</option>
                    <option value="tenant">Tenant</option>
                  </Select>
                  </div>
                  <div className='mb-2 block max-md:mx-auto max-md:w-full'>
                    <Label htmlFor='username' value='Username'/>
                    <TextInput max={20} className='w-full md:w-48 lg:w-56' id='username' placeholder='Username' type='text' value={username} onChange={(e) => {(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(e.target.value) ? setSpec(true) : setSpec(false)
                    setUsername(e.target.value)
                  }} required/>
                  <p className={`${spec ? '' : 'hidden'} text-red-500 text-sm`}>No special characters or spaces</p>
                  </div>
                </div>

                <div className='flex max-md:flex-col md:justify-between'>
                <div className='mb-2 block max-md:mx-auto max-md:w-full'>
                    <Label htmlFor='firstName' value='First Name'/>
                    <TextInput className='w-full md:w-48 lg:w-56' id='firstName' placeholder='First Name' type='text' onChange={(e) => {setFirstName(e.target.value)}} required/>
                  </div>
                  <div className='mb-2 block max-md:mx-auto max-md:w-full'>
                    <Label htmlFor='lastName' value='Last Name'/>
                    <TextInput className='w-full md:w-48 lg:w-56' id='lastName' placeholder='Last Name' type='text' onChange={(e) => {setLastName(e.target.value)}} required/>
                  </div>
                </div>

                <div className='mb-2 block pb-2 max-md:mx-auto max-md:w-full'>
                    <Label htmlFor='email' value='Email'/>
                    <TextInput id='email' placeholder='Email' type='email' onChange={(e) => {setEmail(e.target.value)}} required/>
                </div>

                <div className='flex max-md:flex-col md:justify-between'>
                <div className='mb-2 block max-md:mx-auto max-md:w-full'>
                    <Label htmlFor='password' value='Password'/>
                    <TextInput className='w-full md:w-48 lg:w-56' id='password' placeholder='Password' type='password' onChange={(e) => {setTestPass(e.target.value);
                    testPass.length < 7 ? setIsEight(false) : setIsEight(true)
                    }} required/>
                    <p className={`text-red-600 text-[10px] pl-1 pt-1 ${isEight ? "hidden" : ""}`}>Password must be 8 characters long</p>
                </div>
                <div className='mb-2 block max-md:mx-auto max-md:w-full'>
                <Label htmlFor='confirmPass' value='Confirm Password'/>
                
                    <TextInput className='md:w-48 lg:w-56' id='confirmPass' placeholder='Confirm Password' type='password' onChange={(e) => {
                      e.target.value === testPass ? (setPassword(e.target.value), setMatch(true)) : setMatch(false)}} required/>
                      <p className={`text-red-600 text-[10px] pl-1 pt-1 ${match ? "hidden" : ""}`}>Password does not match</p>
                </div>
                </div>

                <div className='flex max-md:flex-col md:justify-between'>
                  <div className='mb-2 block max-md:mx-auto max-md:w-full'>
                  <Label htmlFor='securityQ' value='Security Question'/>
                  <Select className='w-full md:w-48 lg:w-56' id='securityQ' onChange={(e) => {setSecurityId(parseInt(e.target.value))}} required>
                    {
                      securityArray && securityArray.map((question, idx) => 
                          <option key={idx} value={idx + 1}>{question}</option>
                      )
                    }
                  </Select>
                  </div>
                  <div className='mb-2 block max-md:mx-auto max-md:w-full'>
                    <Label htmlFor='securityA' value='Security Answer'/>
                    <TextInput className='w-full md:w-48 lg:w-56' id='securityA' placeholder='Security Answer' type='text' onChange={(e) => {
                      setSecurityAns(e.target.value)
                      }} required/>
                  </div>
                </div>

                <div className='flex justify-center md:justify-end pt-2 pb-7'>
                  <Button className='mt-3 w-36' color="light"  type='submit' disabled={isEight && spec ? false : true}>
                    Create Account
                  </Button>
                </div>

              </form>
            </div>
        </div>
      </div>
    </>
  )
}

export default CreateAccount