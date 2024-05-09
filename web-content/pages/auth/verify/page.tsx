"use client"
import Link from "next/link";
import Image from "next/image";

import { AuthInput } from "@/app/components/auth/AuthInput";
import { SubmitButton } from "@/app/components/auth/SubmitButton";

import appleIcon from "@/public/assets/images/appleIcon.svg"
import googleIcon from "@/public/assets/images/googleIcon.svg"
import { useContext, useEffect, useRef, useState } from "react";
import PinInput from "react-pin-input";
import { ValidateEmail, ValidatePassword } from "@/app/utils/Validators";
import { useCountdown } from "@/app/hooks/useTimeCountDown";
import { AppCtx } from "@/app/context/StoreContext";

import '../style.css'

export default function Verify() {
  const context = useContext(AppCtx)

  const [allowSubmit, setAllowSubmit] = useState(false)
  const [countDown, setCountDown] = useState(60)

  const padZero = (num: number) => {
    return num < 10 ? `0${num}` : num;
  }

  useEffect(() => {
    countDown > 0 && setTimeout(() => setCountDown(countDown - 1), 1000);
  }, [countDown])

  const minutes = Math.floor(countDown / 60)
  const seconds = countDown % 60;

  const handleAllowSubmit = (value: string, index: number) => {
    if (value.length === 6) {
      setAllowSubmit(true)
    } else {
      setAllowSubmit(false)
    }
  }

  const [authData, setAuthData] = useState({
    email: '',
    password: ''
  });
  const [errMessage, setErrMessage] = useState({
    email: '',
    password: '',
  })
  const [openModal, setOpenModal] = useState(false)
  const [successRes, setSuccessRes] = useState("")
  const [errorColour, setErrorColour] = useState(false)
  const [extendTimer, setExtendTimer] = useState(false)

  const handleInput = (input: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = input.target;
    const addColour = (elem: React.ChangeEvent<HTMLInputElement>) => {
      elem.target.classList.add('border-cs-error-500');
      elem.target.classList.add('placeholder:text-cs-error-500')
      elem.target.classList.remove('bg-cs-grey-55')
      setErrMessage(prevState => ({
        ...prevState,
        [name]: `Invalid ${name}`
      }));
    }
    const removeColour = (elem: React.ChangeEvent<HTMLInputElement>) => {
      elem.target.classList.remove('border-cs-error-500');
      elem.target.classList.remove('placeholder:text-cs-error-500')
      elem.target.classList.add('bg-cs-grey-55')
      setErrMessage(prevState => ({
        ...prevState,
        [name]: ''
      }));
    }
    if (name === "email") {
      if ((!ValidateEmail(value))) {
        addColour(input)
      } else {
        removeColour(input)
      }
    } else if (name === "password") {
      if ((!ValidatePassword(value))) {
        addColour(input)
      } else {
        removeColour(input)
      }
    }

    if (input.target.value.length === 0) {
      setErrMessage(prevState => ({
        ...prevState,
        [name]: `Enter your ${name}`
      }));
    } else {
      setAuthData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  }

  return (
    <>
      <h3 className=" text-2xl font-semibold text-cs-grey-dark mb-1">Verify you account</h3>
      <p className=" text-cs-grey-100 text-sm">We send a verification code to your email.</p>
      <form>
        {/* <AuthInput label="Email" action={handleInput} errorMessage={errMessage.email} inputName="email" inputType="email" placeHolder="example@mail.com" />
        <AuthInput label="Password" action={handleInput} errorMessage={errMessage.password} inputName="password" inputType="password" placeHolder="password" />
        <div className="text-right">
          <Link href={"/auth/forgotpassword"} className=" text-cs-purple-650 text-sm">Forgot password</Link>
        </div> */}

        <PinInput
          length={6}
          initialValue=""
          // secret={true}
          // secretDelay={100}
          onChange={(value, index) => handleAllowSubmit(value, index)}
          type="numeric"
          inputMode="number"
          style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between' }}
          inputStyle={{ borderColor: '#9F9F9F', borderRadius: '10px', fontSize: '47px', fontWeight: '600' }}
          inputFocusStyle={{ borderColor: 'blue' }}
          // onComplete={(value, index) => {
          //   console.log("onComplete", value, index)
          // }}
          autoSelect={false}
          regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}

        />
        <SubmitButton text="Verify account" action={() => { }} activate={allowSubmit} />
        {/* <CountdownTimer targetDate={context.appState.verificationState.afterFirstVerification ? dateTimeAfterTwoMinutes : dateTimeAfterThirtySeconds} /> */}
        <p className=" text-cs-grey-100 font-medium text-sm text-center mt-8">Didn’t see code? {minutes === 0 && seconds === 0 ? <span className=" text-cs-purple-650 cursor-pointer" onClick={() => { setCountDown(120) }}>Resend now</span> : `Resend in ${padZero(minutes)}:${padZero(seconds)}`}</p>
        {/* <p className=" text-cs-grey-100 font-medium text-sm text-center mt-8">Didn’t see code? <span className=" text-cs-purple-650 cursor-pointer">Resend now</span></p> */}
        {/* <div
          style={{ textAlign: "center", margin: "auto" }}>
          <h1 style={{ color: "green" }}>
            GeeksforGeeks
          </h1>
          <h3>Countdown Timer Using React JS</h3>
          <h2>{timer}</h2>
          <button onClick={onClickReset}>Reset</button>
        </div> */}
      </form>
      {/* <div className="grid my-6 grid-cols-7 items-center">
        <div className=" h-[1px] bg-cs-grey-55 col-start-1 col-end-4"></div>
        <span className=" text-center text-cs-grey-400 text-sm">or</span>
        <div className=" h-[1px] bg-cs-grey-55 col-start-5 col-end-8"></div>
      </div>
      <div className=" flex gap-x-8 my-8">
        <div className="border border-cs-grey-150 rounded-lg flex items-center justify-center w-full py-[10px]"><Image src={googleIcon} alt="google" /></div>
        <div className="border border-cs-grey-150 rounded-lg flex items-center justify-center w-full py-[10px]"><Image src={appleIcon} alt="apple" /></div>
      </div> */}
    </>
  )
}