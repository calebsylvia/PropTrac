"use client";
import React, { useEffect, useState } from "react";
import { TextInput, Label, Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { answerCheck, changePassword, passwordRequest } from "@/Utils/DataService";
import { IForgot } from "@/Interfaces/Interfaces";

const ForgotPassword = () => {
  const [input, setInput] = useState<string>("");
  const [securityQuestion, setSecurityQuestion] = useState<string>("");
  const [securityAnswer, setSecurityAnswer] = useState<string>("");
  const [newTestPass, setNewTestPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [showNewPass, setShowNewPass] = useState<boolean>(false);

  const router = useRouter();

  const handleAnswer = async() => {
    let answer = {
      UsernameOrEmail: input,
      SecurityAnswer: securityAnswer
    }

    let result = await answerCheck(answer);
    console.log(result)
    if(result === true){
      setShowNewPass(true);
    }else{
      alert('Incorrect Answer. Try again')
    }
  }

  const handleNewPass = async() => {
    let newPassword = {
      UsernameOrEmail: input,
      SecurityAnswer: securityAnswer,
      NewPassword: newPass
    }

    let result = await changePassword(newPassword);

    if(result === true){
      router.push('/')
    }else{
      alert('Something went wrong')
    }
  }

  const UsernameOrEmail = {
    UsernameOrEmail: input
  }

  const getQuestion = async() => {
    let question = await passwordRequest(UsernameOrEmail)
    setSecurityQuestion(question)
  }

  const handleSecure = () => {
    getQuestion()
    setShowQuestion(true);
  };


  const handleCancel = () => {
    router.push("/");
  };

  const firstBack = () => {
    setShowQuestion(false);
  };

  const secondBack = () => {
    setShowNewPass(false);
  };


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
        <div className="w-[400px] min-h-2/5 m-auto bg-white rounded-xl">
          <p className="text-center text-2xl pt-6">Reset Password</p>
          <div className="mb-2 block w-2/3 m-auto pt-8">
            <Label
              className={`${showQuestion || showNewPass ? "hidden" : "block"}`}
              htmlFor="usernameOrEmail"
              value="Enter Username or Email"
            />
            <TextInput
              className={`${showQuestion || showNewPass ? "hidden" : "block"}`}
              id="usernameOrEmail"
              type="text"
              onChange={(e) => setInput(e.target.value)}
            />
            <Label
              className={`${!showQuestion || showNewPass ? "hidden" : "block"}`}
              htmlFor="securityAns"
              value={securityQuestion}
            />
            <TextInput
              className={`${!showQuestion || showNewPass ? "hidden" : "block"}`}
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
                !showQuestion || !showNewPass ? "hidden" : "block"
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

          <div className="flex justify-evenly pt-8">
            <Button
              className={`${showQuestion ? "hidden" : "block"}`}
              onClick={handleCancel}
              color="light"
            >
              Cancel
            </Button>
            <Button
              className={`${showQuestion ? "hidden" : "block"}`}
              onClick={handleSecure}
              color="light"
            >
              Next
            </Button>
            <Button
              className={`${!showQuestion || showNewPass ? "hidden" : "block"}`}
              onClick={firstBack}
              color="light"
            >
              Back
            </Button>
            <Button
              className={`${!showQuestion || showNewPass ? "hidden" : "block"}`}
              onClick={handleAnswer}
              color="light"
            >
              Next
            </Button>
            <Button
              className={`${showNewPass ? "block" : "hidden"}`}
              onClick={secondBack}
              color="light"
            >
              Back
            </Button>
            <Button
              className={`${showNewPass ? "block" : "hidden"}`}
              onClick={handleNewPass}
              color="light"
              disabled={newPass ? false : true}
            >
              Confirm Password
            </Button>
          </div>

          <p className="text-sm pt-8 text-center pb-4">
            Remember password?{" "}
            <a className="underline text-[#0744A0]" onClick={handleCancel}>Login Here</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;