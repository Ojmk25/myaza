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
import { SuccessSlideIn } from "@/app/components/SuccessSlideIn";
import { FailureSlideIn } from "@/app/components/FailureSlideIn";

export default function NewPassword() {
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
  const [openModal, setOpenModal] = useState(true)
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
    }

    if (input.target.value.length === 0) {
      setErrMessage(prevState => ({
        ...prevState,
        [name]: `Enter your ${name}`
      }));
      setAllowSubmit(false)
    } else {
      setAuthData(prevState => ({
        ...prevState,
        [name]: value
      }));
      setAllowSubmit(true)
    }
  }

  const closeSlider = () => {
    setSuccessRes("");
    setOpenModal(false)
  }

  return (
    <>
      <h3 className=" text-2xl font-semibold text-cs-grey-dark mb-1">New password</h3>
      <p className=" text-cs-grey-100 text-sm">Set up your new password</p>
      <form>
        <AuthInput label="Password" action={handleInput} errorMessage={errMessage.password} inputName="password" inputType="password" placeHolder="password" />
        <AuthInput label="Confirm password" action={handleInput} errorMessage={errMessage.password} inputName="Confirm" inputType="password" placeHolder="password" />
        <SubmitButton text="Set password" action={() => { }} activate={allowSubmit} />
        <div className="text-center  mt-8">
          <Link href={"/auth/login"} className=" text-cs-purple-650 text-sm font-medium">Back to sign in</Link>
        </div>
      </form>
      <SuccessSlideIn openModal={openModal} successRes={successRes} closeModal={closeSlider} />
      <FailureSlideIn openModal={openModal} successRes={successRes} closeModal={closeSlider} />
    </>
  )
}