"use client";
import Link from "next/link";
import Image from "next/image";
import AuthLayout from "@/components/auth/AuthLayout";
import { AuthInput } from "@/components/auth/AuthInput";
import { SubmitButton } from "@/components/auth/SubmitButton";

import googleIcon from "@/public/assets/images/googleIcon.svg";
import { useEffect, useState } from "react";
import {
  ValidateEmail,
  ValidatePassword,
  activateButton,
} from "@/utils/Validators";
import { useRouter } from "next/router";
import { loginUser } from "@/services/authService";
import { SuccessSlideIn } from "@/components/SuccessSlideIn";
import { FailureSlideIn } from "@/components/FailureSlideIn";
import LoadingScreen from "@/components/modals/LoadingScreen";
import { updateSignUpUser } from "@/config";
import { useSearchParams } from "next/navigation";
// import { googleLogout, useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";

export default function Login() {
  const navigate = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errMessage, setErrMessage] = useState({
    email: "",
    password: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [successRes, setSuccessRes] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [errorColour, setErrorColour] = useState(false);

  const [validateSuccess, setValidateSuccess] = useState({
    email: false,
    password: false,
  });
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const searchParams = useSearchParams();
  const lastPart = searchParams.get("prevpage");

  const handleInput = (input: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = input.target;
    const addColour = (elem: React.ChangeEvent<HTMLInputElement>) => {
      elem.target.classList.add("border-cs-error-500");
      elem.target.classList.add("placeholder:text-cs-error-500");
      elem.target.classList.remove("bg-cs-grey-55");
      setErrMessage((prevState) => ({
        ...prevState,
        [name]: `Invalid ${name}`,
      }));
    };
    const removeColour = (elem: React.ChangeEvent<HTMLInputElement>) => {
      elem.target.classList.remove("border-cs-error-500");
      elem.target.classList.remove("placeholder:text-cs-error-500");
      elem.target.classList.add("bg-cs-grey-55");
      setErrMessage((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    };
    if (value.length === 0) {
      // setErrorColour(true)
      setErrMessage((prevState) => ({
        ...prevState,
        [name]: `Enter your ${name}`,
      }));
    } else if (name === "email") {
      if (!ValidateEmail(value)) {
        addColour(input);
        setValidateSuccess((prevState) => ({
          ...prevState,
          [name]: false,
        }));
      } else {
        removeColour(input);
        setValidateSuccess((prevState) => ({
          ...prevState,
          [name]: true,
        }));
      }
    } else if (name === "password") {
      if (!ValidatePassword(value)) {
        addColour(input);
        setValidateSuccess((prevState) => ({
          ...prevState,
          [name]: false,
        }));
      } else {
        removeColour(input);
        setValidateSuccess((prevState) => ({
          ...prevState,
          [name]: true,
        }));
      }
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginPayload = {
    email: formData.email,
    password: formData.password,
  };

  const handleSignUpSubmit = async () => {
    setLoading(true);
    const clearAll = () => {
      setLoading(false);
      setTimeout(() => {
        setSuccessRes("");
        setOpenModal(false);
      }, 2000);
    };
    try {
      const data = await loginUser(loginPayload);
      setLoading(true);
      setSuccessRes(data);
      setOpenModal(true);
      setTimeout(() => {
        updateSignUpUser(loginPayload.email);
        if (data?.response?.statusCode && data?.response?.statusCode === 200) {
          if (lastPart !== null) {
            navigate.push(`/${lastPart}`);
          } else {
            navigate.push(`/`);
          }
        }
      }, 3000);
    } catch (error) {
      console.log(error);
      setLoading(true);
      setOpenModal(true);
    } finally {
      clearAll();
    }
  };

  // const login = useGoogleLogin({
  //   onSuccess: (codeResponse) => setUser(codeResponse),
  //   onError: (error) => console.log("Login Failed:", error),
  // });

  // useEffect(() => {
  //   if (user) {
  //     axios
  //       .get(
  //         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${user.access_token}`,
  //             Accept: "application/json",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         setProfile(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [user]);

  // // log out function to log the user out of google and set the profile array to null
  // const logOut = () => {
  //   googleLogout();
  //   setProfile(null);
  // };

  return (
    <AuthLayout>
      <h3 className=" text-2xl font-semibold text-cs-grey-dark mb-1 metro-medium">
        Sign in
      </h3>
      <p className=" text-cs-grey-100 text-sm">
        Welcome back, sign in to your account
      </p>
      <form>
        <AuthInput
          label="Email"
          action={handleInput}
          errorMessage={errMessage.email}
          inputName="email"
          inputType="email"
          placeHolder="example@mail.com"
        />
        <AuthInput
          label="Password"
          action={handleInput}
          errorMessage={errMessage.password}
          inputName="password"
          inputType="password"
          placeHolder="password"
        />
        <div className="text-right">
          <Link
            href={"/auth/forgot-password"}
            className=" text-cs-purple-650 text-sm"
          >
            Forgot password
          </Link>
        </div>
        <SubmitButton
          text="Sign in"
          action={handleSignUpSubmit}
          activate={activateButton(validateSuccess)}
        />
      </form>
      <div className="grid my-6 grid-cols-7 items-center">
        <div className=" h-[1px] bg-cs-grey-55 col-start-1 col-end-4"></div>
        <span className=" text-center text-cs-grey-400 text-sm">or</span>
        <div className=" h-[1px] bg-cs-grey-55 col-start-5 col-end-8"></div>
      </div>
      <div className="border border-solid border-cs-grey-150 rounded-lg flex items-center justify-center w-full py-[10px] text-cs-grey-dark font-medium">
        <Image src={googleIcon} alt="google" className=" mr-2" /> Sign in with
        Google
      </div>

      <SuccessSlideIn
        openModal={openModal}
        response={
          successRes &&
          successRes?.response &&
          successRes?.response.statusCode === 200
        }
        successActionResponse={
          successRes &&
          successRes?.response &&
          successRes?.response.body.message
        }
        closeModal={() => {}}
      />
      <FailureSlideIn
        openModal={openModal}
        response={
          successRes &&
          successRes?.response &&
          successRes?.response.statusCode !== 200
        }
        errResponse={
          successRes &&
          successRes?.response &&
          successRes?.response.body.message
        }
        closeModal={() => {}}
      />
      {loading && <LoadingScreen />}
    </AuthLayout>
  );
}
