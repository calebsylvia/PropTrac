'use client'
import React, { useState } from 'react'
import { Label, TextInput, Select, Button } from 'flowbite-react'
import { createAccount } from '@/Utils/DataService'
import { useRouter } from 'next/navigation'

const CreateAccount = () => {

  const [username, setUsername] = useState<string>("")
  const [testPass, setTestPass] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isManager, setIsManager] = useState<boolean>(true)
  const [email, setEmail] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [securityId, setSecurityId] = useState<number>(1)
  const [securityAns, setSecurityAns] = useState<string>("")

  const router = useRouter()

  const handleCreate = () => {
    
    let userInfo = {
      Username: username,
      Password: password,
      Email: email,
      IsManager: isManager,
      FirstName: firstName,
      LastName: lastName,
      SecurityAnswer: securityAns,
      SecurityQuestion: securityId
    }

    console.log(userInfo)
    createAccount(userInfo)

    // if(isManager){
    //   router.push('/pages/AdminDash')
    // }else{
    //   router.push('/page/TenantDash')
    // }

  }


  return (
    <>
      <div className='background h-screen w-screen flex'>
        <div className='bg-white w-2/5 h-3/4 m-auto rounded-xl'>
            <p className='text-2xl text-center py-6'>Create Account</p>
            <div>
              <form className='px-8 space-y-2'>

                <div className='flex justify-between'>
                  <div className='mb-2 block'>
                  <Label htmlFor='accountType' value='Account Type'/>
                  <Select className='w-56' id='accountType' onChange={(e) => {e.target.value === "manager" ? setIsManager(true) : setIsManager(false)}}  required>
                    <option value="manager">Manager</option>
                    <option value="tenant">Tenant</option>
                  </Select>
                  </div>
                  <div className='mb-2 block'>
                    <Label htmlFor='username' value='Username'/>
                    <TextInput className='w-56' id='username' placeholder='Username' type='text' onChange={(e) => {setUsername(e.target.value)}} required/>
                  </div>
                </div>

                <div className='flex justify-between'>
                <div className='mb-2 block'>
                    <Label htmlFor='firstName' value='First Name'/>
                    <TextInput className='w-56' id='firstName' placeholder='First Name' type='text' onChange={(e) => {setFirstName(e.target.value)}} required/>
                  </div>
                  <div className='mb-2 block'>
                    <Label htmlFor='lastName' value='Last Name'/>
                    <TextInput className='w-56' id='lastName' placeholder='Last Name' type='text' onChange={(e) => {setLastName(e.target.value)}} required/>
                  </div>
                </div>

                <div className='mb-2 block'>
                    <Label htmlFor='email' value='Email'/>
                    <TextInput id='email' placeholder='Email' type='email' onChange={(e) => {setEmail(e.target.value)}} required/>
                </div>

                <div className='flex justify-between'>
                <div className='mb-2 block'>
                    <Label htmlFor='password' value='Password'/>
                    <TextInput className='w-56' id='password' placeholder='Password' type='password' onChange={(e) => {setTestPass(e.target.value)}} required/>
                </div>
                <div className='mb-2 block'>
                <Label htmlFor='confirmPass' value='Confirm Password'/>
                
                    <TextInput className='w-56' id='confirmPass' placeholder='Confirm Password' type='password' onChange={(e) => {e.target.value === testPass ? setPassword(e.target.value) : console.log("Password does not match")}} required/>
                </div>
                </div>

                <div className='flex justify-between'>
                  <div className='mb-2 block'>
                  <Label htmlFor='securityQ' value='Security Question'/>
                  <Select className='w-56' id='securityQ' onChange={(e) => {setSecurityId(parseInt(e.target.value))}} required>
                    <option value={1}>What is the name of your first pet?</option>
                    <option value={2}>What was your favorite teacher&apos;s name?</option>
                    <option value={3}>What was the name of your first stuffed animal?</option>
                  </Select>
                  </div>
                  <div className='mb-2 block'>
                    <Label htmlFor='securityA' value='Security Answer'/>
                    <TextInput className='w-56' id='securityA' placeholder='Security Answer' type='text' onChange={(e) => {setSecurityAns(e.target.value)}} required/>
                  </div>
                </div>

                <div className='flex justify-center'>
                  <Button className='mt-3' color="light" onClick={handleCreate}>
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