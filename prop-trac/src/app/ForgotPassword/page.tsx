"use client";
import React, { useEffect, useState } from "react";
import { TextInput, Label, Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { answerCheck, changePassword, passwordRequest } from "@/Utils/DataService";
import { IForgot } from "@/Interfaces/Interfaces";
import { useToast } from "@/components/ui/use-toast";

const ForgotPassword = () => {
  const [input, setInput] = useState<string>("");
  const [securityQuestion, setSecurityQuestion] = useState<string>("");
  const [securityAnswer, setSecurityAnswer] = useState<string>("");
  const [newTestPass, setNewTestPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [showNewPass, setShowNewPass] = useState<boolean>(false);
  const [successOne, setSuccessOne] = useState<boolean>()
  const [successTwo, setSuccessTwo] = useState<boolean>() 

  const router = useRouter();
  const { toast } = useToast()

  const handleAnswer = async() => {
    let answer = {
      UsernameOrEmail: input,
      SecurityAnswer: securityAnswer
    }

    let result = await answerCheck(answer);
    console.log(result)
    if(result === true){
      setSuccessTwo(true)
      setShowNewPass(true);
    }else{
      setSuccessTwo(false)
      setShowNewPass(false)
      return toast({description: "Invalid answer", variant: "destructive"})
    }
  }

  const handleNewPass = async() => {
    let newPassword = {
      UsernameOrEmail: input,
      SecurityAnswer: securityAnswer,
      NewPassword: newPass
    }

    let result = await changePassword(newPassword);

    if(result === true && newPass.length >= 8 && newTestPass.length >= 8){
      router.push('/')
      return toast({description: "Password Change Successful"})
    }
    else{
      return toast({description: "Something went wrong. Try Again!", variant: "destructive"})
    }
  }

  const UsernameOrEmail = {
    UsernameOrEmail: input
  }

  const getQuestion = async() => {
    let question = await passwordRequest(UsernameOrEmail)
    console.log(question)
    if(question === false || input === ""){
      setSuccessOne(false)
      return toast({description: "Invalid Username", variant: "destructive"})
    }else{
      setSuccessOne(true)
      setSecurityQuestion(question)
    }
  }

  const handleSecure = () => {
  getQuestion()
   console.log("pressed")
   setShowQuestion(true);
  };


  const handleCancel = () => {
    router.push("/");
  };

  const firstBack = () => {
    setSuccessOne(false)
    setShowQuestion(false);
  };

  const secondBack = () => {
    setSuccessTwo(false)
    setShowNewPass(false);
  };


  return (
    <>
      <div className="background w-screen h-screen lg:flex">
        <div className="lg:w-1/3 text-center lg:pl-20 pt-20">
          <h1 className="text-7xl lg:text-9xl text-[#5A5A5A]">
            PROP
            <br />
            TRAC
          </h1>
          <p className="max-lg:text-xs">Property management at your fingertips</p>
        </div>
        <div className="w-72 md:w-96 lg:w-[400px] max-lg:mt-8 min-h-2/5 m-auto bg-white rounded-xl">
          <p className="text-center text-lg lg:text-2xl pt-8">Reset Password</p>
          <div className="mb-2 block w-2/3 lg:w-4/5 m-auto pt-8">
            <Label
              className={`${(showQuestion && successOne) || showNewPass  ? "hidden" : "block"}`}
              htmlFor="usernameOrEmail"
              value="Username / Email"
            />
            <TextInput
              className={`${(showQuestion && successOne) || showNewPass  ? "hidden" : "block"}`}
              id="usernameOrEmail"
              type="text"
              onChange={(e) => setInput(e.target.value)}
            />
            <Label
              className={`${!showQuestion || !showNewPass && !successOne || successTwo ? "hidden" : "block"}`}
              htmlFor="securityAns"
              value={securityQuestion}
            />
            <TextInput
              className={`${!showQuestion || !showNewPass && !successOne || successTwo ? "hidden" : "block"}`}
              id="securityAns"
              type="text"
              onChange={(e) => setSecurityAnswer(e.target.value)}
            />
            <Label
              className={`${
                !showQuestion || !showNewPass ? "hidden" : "block"
              }`}
              htmlFor="newPass"
              value="Change Password"
            />
            <TextInput
              className={`${
                !showQuestion || !showNewPass ? "hidden" : "block"
              }`}
              id="newPass"
              type="password"
              onChange={(e) => setNewTestPass(e.target.value)}
            />
            <Label
              className={`${
                !showQuestion || !showNewPass ? "hidden" : "block pt-5"
              }`}
              htmlFor="confirmPass"
              value="Confirm Password"
            />
            <TextInput
              className={`${
                !showQuestion || !showNewPass ? "hidden" : "block"
              }`}
              id="confirmPass"
              type="password"
              onChange={(e) => e.target.value === newTestPass ? setNewPass(e.target.value) : console.log('Password does not match')}
            />
          </div>

          <div className="flex justify-end pr-16 lg:pr-10 gap-3 pt-5 lg:pt-10 pb-8">
            <Button
              className={`${(showQuestion && successOne) ? "hidden" : "block"}`}
              onClick={handleCancel}
              color="light"
            >
              Cancel
            </Button>
            <Button
              className={`${(showQuestion && successOne) ? "hidden" : "block"}`}
              onClick={handleSecure}
              color="light"
            >
              Next
            </Button>
            <Button
              className={`${!showQuestion || !showNewPass && !successOne || successTwo ? "hidden" : "block"}`}
              onClick={firstBack}
              color="light"
            >
              Back
            </Button>
            <Button
              className={`${!showQuestion || !showNewPass && !successOne || successTwo ? "hidden" : "block"}`}
              onClick={handleAnswer}
              color="light"
            >
              Next
            </Button>
            <Button
              className={`${showNewPass || successTwo  ? "block" : "hidden"}`}
              onClick={secondBack}
              color="light"
            >
              Back
            </Button>
            <Button
              className={`${showNewPass || successTwo ? "block" : "hidden"}`}
              onClick={handleNewPass}
              color="light"
              disabled={newPass == newTestPass && newPass.length >= 8 ? false : true}
            >
              Confirm Password
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
