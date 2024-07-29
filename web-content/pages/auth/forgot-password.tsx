"use client";
import Link from "next/link";
import { AuthInput } from "@/components/auth/AuthInput";
import { SubmitButton } from "@/components/auth/SubmitButton";
import AuthLayout from "@/components/auth/AuthLayout";
import { useRouter } from "next/router";
import { useState } from "react";
import { ValidateEmail } from "@/utils/Validators";
import { forgotPassword } from "@/services/authService";
import { SuccessSlideIn } from "@/components/SuccessSlideIn";
import { FailureSlideIn } from "@/components/FailureSlideIn";
import LoadingScreen from "@/components/modals/LoadingScreen";
import { updateSignUpUser } from "@/config";

export default function ForgotPassword() {
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errMessage, setErrMessage] = useState({
    email: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [successRes, setSuccessRes] = useState<any>();
  const [errorColour, setErrorColour] = useState(false);
  const [extendTimer, setExtendTimer] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();

  const forgotPasswordPayload = {
    email: formData.email,
  };

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
    if (name === "email") {
      if (!ValidateEmail(value)) {
        addColour(input);
        setAllowSubmit(false);
      } else {
        removeColour(input);
        setAllowSubmit(true);
      }
    }

    if (input.target.value.length === 0) {
      setErrMessage((prevState) => ({
        ...prevState,
        [name]: `Enter your ${name}`,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    const clearAll = () => {
      setLoading(false);
      setTimeout(() => {
        setSuccessRes("");
        setOpenModal(false);
      }, 2000);
    };
    try {
      const data = await forgotPassword(forgotPasswordPayload);
      setLoading(true);
      setSuccessRes(data?.data);
      setOpenModal(true);
      setTimeout(() => {
        updateSignUpUser(forgotPasswordPayload.email);
        data?.data &&
          data?.data.statusCode === 200 &&
          navigate.push("/auth/new-password");
      }, 3000);
    } catch (error) {
      console.log(error);
      setLoading(true);
      setOpenModal(true);
    } finally {
      clearAll();
    }
  };

  return (
    <AuthLayout>
      <h3 className=" text-2xl font-semibold text-cs-grey-dark mb-1 metro-medium">
        Forgot password
      </h3>
      <p className=" text-cs-grey-100 text-sm">
        We are going to help you reset your password
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
        <SubmitButton
          text="Reset password"
          action={handleForgotPassword}
          activate={allowSubmit}
        />
        <div className="text-center  mt-8">
          <Link
            href={"/auth/login"}
            className=" text-cs-purple-650 text-sm font-medium"
          >
            Back to sign in
          </Link>
        </div>
      </form>

      <SuccessSlideIn
        openModal={openModal}
        response={successRes && successRes?.statusCode === 200}
        successActionResponse={successRes && successRes?.body.message}
        closeModal={() => {}}
      />
      <FailureSlideIn
        openModal={openModal}
        response={successRes && successRes?.statusCode !== 200}
        errResponse={successRes && successRes?.body.message}
        closeModal={() => {}}
      />
      {loading && <LoadingScreen />}
    </AuthLayout>
  );
}
