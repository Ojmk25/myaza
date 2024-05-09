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

export default function ForgotPassword() {
  const context = useContext(AppCtx)

  const [allowSubmit, setAllowSubmit] = useState(false)

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
        setAllowSubmit(false)
      } else {
        removeColour(input)
        setAllowSubmit(true)
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
      <h3 className=" text-2xl font-semibold text-cs-grey-dark mb-1">Forgot password</h3>
      <p className=" text-cs-grey-100 text-sm">We are going to help you reset your password</p>
      <form>
        <AuthInput label="Email" action={handleInput} errorMessage={errMessage.email} inputName="email" inputType="email" placeHolder="example@mail.com" />
        <SubmitButton text="Reset password" action={() => { }} activate={allowSubmit} />
        <div className="text-center  mt-8">
          <Link href={"/auth/login"} className=" text-cs-purple-650 text-sm font-medium">Back to sign in</Link>
        </div>
      </form>

    </>
  )
}