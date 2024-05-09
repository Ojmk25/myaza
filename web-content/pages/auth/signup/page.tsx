"use client"
import Link from "next/link";
import Image from "next/image";

import { AuthInput } from "@/app/components/auth/AuthInput";
import { SubmitButton } from "@/app/components/auth/SubmitButton";

import appleIcon from "@/public/assets/images/appleIcon.svg"
import googleIcon from "@/public/assets/images/googleIcon.svg"
import { useState } from "react";
import { ValidateEmail, ValidatePassword } from "@/app/utils/Validators";
import { joinMeeting, postUserData, getAPI } from "@/app/utils/apiCall";

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
  const [openModal, setOpenModal] = useState(false)
  const [successRes, setSuccessRes] = useState("")
  const [errorColour, setErrorColour] = useState(false)

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
    } else if (name === "First name") {
      if ((!ValidatePassword(value))) {
        addColour(input)
      } else {
        removeColour(input)
      }
    } else if (name === "Last name") {
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
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  }

  // console.log(formData);
  // const testData = {
  //   email: "abc",
  //   password: "abc",
  //   first_name: "xgfwtt3",
  //   last_name: "xgfwtt3"
  // }
  // const joinMeeting = async () => {
  //   const response = await fetch('http://api.dev.cecurecast.com/open/v1/sign-up',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       mode: 'no-cors',
  //       body: JSON.stringify(testData),
  //       // body: testData,

  //     });
  //   // const data = await response.json();

  //   console.log(typeof response);

  // };

  // const joinMeeting = async () => {
  //   // URL to which the request is sent
  //   const apiUrl = "https://example.com/api/register";

  //   // Create the fetch options specifying the method, headers, and body
  //   const fetchOptions = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'  // Indicates the body format is JSON
  //     },
  //     body: JSON.stringify(testData)  // Convert the JavaScript object to a JSON string
  //     // mode: 'no-cors',
  //   };

  //   // Use fetch to send the POST request
  //   fetch(apiUrl, fetchOptions)
  //     .then(response => {
  //       if (!response.ok) {
  //         // Handle non-200 responses
  //         throw new Error('Network response was not ok: ' + response.statusText);
  //       }
  //       return response.json();  // Parse the JSON response body
  //     })
  //     .then(data => {
  //       console.log('Success:', data);  // Process the success response
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);  // Handle errors
  //     });

  // }


  return (
    <>
      <button onClick={getAPI}>get api</button>
      <h3 className=" text-2xl font-semibold text-cs-grey-dark mb-1">Sign up</h3>
      <p className=" text-cs-grey-100 text-sm">Create your account to get started</p>
      <form>
        <AuthInput label="First name" action={handleInput} errorMessage={errMessage["First name"]} inputName="First name" inputType="text" placeHolder="First name" />
        <AuthInput label="Last name" action={handleInput} errorMessage={errMessage["Last name"]} inputName="Last name" inputType="text" placeHolder="Last name" />
        <AuthInput label="Email" action={handleInput} errorMessage={errMessage.email} inputName="email" inputType="email" placeHolder="example@mail.com" />
        <AuthInput label="Password" action={handleInput} errorMessage={errMessage.password} inputName="password" inputType="password" placeHolder="password" />
        <div className="text-right">
        </div>
        <SubmitButton text="Sign in" action={postUserData} activate={true} />
      </form>
      <div className="grid my-6 grid-cols-7 items-center">
        <div className=" h-[1px] bg-cs-grey-55 col-start-1 col-end-4"></div>
        <span className=" text-center text-cs-grey-400 text-sm">or </span>
        <div className=" h-[1px] bg-cs-grey-55 col-start-5 col-end-8"></div>
      </div>
      <div className="border border-solid border-cs-grey-150 rounded-lg flex items-center justify-center w-full py-[10px] text-cs-grey-dark font-medium text-sm lg:text-base"><Image src={googleIcon} alt="google" className=" mr-2" />  Sign in with Google</div>

    </>
  )
}
