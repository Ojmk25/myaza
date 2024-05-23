"use client"
import Image from "next/image";
import AuthLayout from "@/components/auth/AuthLayout";
import { AuthInput } from "@/components/auth/AuthInput";
import { SubmitButton } from "@/components/auth/SubmitButton";

import googleIcon from "@/public/assets/images/googleIcon.svg"
import { useEffect, useState } from "react";
import { ValidateEmail, ValidatePassword, ValidateText, activateButton } from "@/utils/Validators";
import { registerUser } from "@/services/authService";
import { subDomain } from "@/utils/getDomain";
import { envFn, updateSignUpUser } from "@/config";
import { SuccessSlideIn } from "@/components/SuccessSlideIn";
import { FailureSlideIn } from "@/components/FailureSlideIn";
import { useRouter } from "next/router";


export default function Signup() {
  const [formData, setFormData] = useState({
    "First name": "",
    "Last name": "",
    email: '',
    password: '',
  });
  const [errMessage, setErrMessage] = useState({
    "First name": "",
    "Last name": "",
    email: '',
    password: '',
  })

  const [validateSuccess, setValidateSuccess] = useState({
    "First name": false,
    "Last name": false,
    email: false,
    password: false,
  })
  const [subdomainLink, setSubdomainLink] = useState<string | null>(null);
  const navigate = useRouter()

  useEffect(() => {
    const subdomainString = subDomain();
    const setEnv = envFn();
    setSubdomainLink(subdomainString);
    console.log(setEnv);
  }, []);


  const [openModal, setOpenModal] = useState(false)
  const [successRes, setSuccessRes] = useState<any>()
  const [errorColour, setErrorColour] = useState(false)

  const handleInput = (input: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = input.target;
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
    if (value.length === 0) {
      // setErrorColour(true)
      setErrMessage(prevState => ({
        ...prevState,
        [name]: `Enter your ${name}`
      }));
    }
    else if (name === "email") {
      if ((!ValidateEmail(value))) {
        addColour(input)
        setValidateSuccess(prevState => ({
          ...prevState,
          [name]: false
        }))
      } else {
        removeColour(input)
        setValidateSuccess(prevState => ({
          ...prevState,
          [name]: true
        }))
      }
    } else if (name === "password") {
      if ((!ValidatePassword(value))) {
        addColour(input)
        setValidateSuccess(prevState => ({
          ...prevState,
          [name]: false
        }))
        setErrMessage(prevState => ({
          ...prevState,
          [name]: `password should be 8 characters with atleast a capital letter, number, and special character`
        }));
      } else {
        removeColour(input)
        setValidateSuccess(prevState => ({
          ...prevState,
          [name]: true
        }))
      }
    } else if (type === "text") {
      if ((!ValidateText(value))) {
        addColour(input)
        setValidateSuccess(prevState => ({
          ...prevState,
          [name]: false
        }))
      } else {
        removeColour(input)
        setValidateSuccess(prevState => ({
          ...prevState,
          [name]: true
        }))
      }
    }
    if (name === "First name" || name === "Last name") {
      setFormData(prevState => ({
        ...prevState,
        [name]: value && value[0].toUpperCase() + value.slice(1)
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));

    }

  }

  const registerPayload = {
    first_name: formData["First name"],
    last_name: formData["Last name"],
    email: formData.email,
    password: formData.password,
  }

  const handleSignUpSubmit = async () => {
    const clearAll = () => {
      // setLoading(false)
      setTimeout(() => {
        setSuccessRes("")
        setOpenModal(false)
      }, 2000)
    }
    try {
      const data = await registerUser(registerPayload)
      setSuccessRes(data.data.body)
      setOpenModal(true)
      setTimeout(() => {
        updateSignUpUser(registerPayload.email)
        data.data.body.status === 'Success' && navigate.push("/auth/verify");
      }, 3000)

    } catch (error) {
      console.log(error)
    } finally {
      clearAll()
    }
  }

  return (
    <AuthLayout>
      <h3 className=" text-2xl font-semibold text-cs-grey-dark mb-1">Sign up</h3>
      <p className=" text-cs-grey-100 text-sm mb-4">Create your account to get started</p>
      <form>
        <AuthInput label="First name" action={handleInput} errorMessage={errMessage["First name"]} inputName="First name" inputType="text" placeHolder="First name" value={formData["First name"]} />

        <AuthInput label="Last name" action={handleInput} errorMessage={errMessage["Last name"]} inputName="Last name" inputType="text" placeHolder="Last name" value={formData["Last name"]} />

        <AuthInput label="Email" action={handleInput} errorMessage={errMessage.email} inputName="email" inputType="email" placeHolder="example@mail.com" value={formData.email} />

        <AuthInput label="Password" action={handleInput} errorMessage={errMessage.password} inputName="password" inputType="password" placeHolder="123Abc%$" value={formData.password} />

        <div className="text-right">
        </div>
        <SubmitButton text="Sign up" action={handleSignUpSubmit} activate={activateButton(validateSuccess)} />
      </form>
      <div className="grid my-6 grid-cols-7 items-center">
        <div className=" h-[1px] bg-cs-grey-55 col-start-1 col-end-4"></div>
        <span className=" text-center text-cs-grey-400 text-sm">or </span>
        <div className=" h-[1px] bg-cs-grey-55 col-start-5 col-end-8"></div>
      </div>
      <div className="border border-solid border-cs-grey-150 rounded-lg flex items-center justify-center w-full py-[10px] text-cs-grey-dark font-medium text-sm lg:text-base"><Image src={googleIcon} alt="google" className=" mr-2" />  Sign in with Google</div>
      <SuccessSlideIn openModal={openModal} response={successRes?.status === 'Success'} successActionResponse="Signup successful" closeModal={() => { }} />
      <FailureSlideIn openModal={openModal} response={successRes?.status === 'Error'} errResponse={successRes?.message} closeModal={() => { }} />

    </AuthLayout>

  )
}
