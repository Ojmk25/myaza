"use client";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import { AuthInput } from "@/components/auth/AuthInput";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { useEffect, useState } from "react";
import { activateButton, ValidatePassword } from "@/utils/Validators";
import { useCountdown } from "@/hooks/useTimeCountDown";
import { AppCtx } from "@/context/StoreContext";
import { SuccessSlideIn } from "@/components/SuccessSlideIn";
import { FailureSlideIn } from "@/components/FailureSlideIn";
import { forgotPassword, resetPassword } from "@/services/authService";
import { useRouter } from "next/router";
import { getSignUpUser } from "@/config";
import LoadingScreen from "@/components/modals/LoadingScreen";

export default function NewPassword() {
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    password: "",
    "confirm-password": "",
  });
  const [errMessage, setErrMessage] = useState({
    code: "",
    password: "",
    "confirm-password": "",
  });
  const [validateSuccess, setValidateSuccess] = useState({
    code: false,
    password: false,
    "confirm-password": false,
  });
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(true);
  const [successRes, setSuccessRes] = useState<any>();
  const [errorColour, setErrorColour] = useState(false);
  const [extendTimer, setExtendTimer] = useState(false);

  const handleInput = (input: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = input.target;
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
    if (name === "password") {
      if (!ValidatePassword(value)) {
        addColour(input);
        setValidateSuccess((prevState) => ({
          ...prevState,
          [name]: false,
        }));
        setErrMessage((prevState) => ({
          ...prevState,
          [name]: `password should be 8 characters with at least a capital letter, number, and special character`,
        }));
      } else {
        setValidateSuccess((prevState) => ({
          ...prevState,
          [name]: true,
        }));
        removeColour(input);
      }
    }
    if (name === "code") {
      if (value.length !== 6) {
        addColour(input);
        setValidateSuccess((prevState) => ({
          ...prevState,
          [name]: false,
        }));
      } else {
        setValidateSuccess((prevState) => ({
          ...prevState,
          [name]: true,
        }));
        removeColour(input);
      }
    }
    if (name === "confirm-password") {
      if (value !== formData.password) {
        addColour(input);
        setValidateSuccess((prevState) => ({
          ...prevState,
          [name]: false,
        }));
        setErrMessage((prevState) => ({
          ...prevState,
          [name]: `passwords must match`,
        }));
      } else {
        setValidateSuccess((prevState) => ({
          ...prevState,
          [name]: true,
        }));
        removeColour(input);
      }
    }

    if (input.target.value.length === 0) {
      setErrMessage((prevState) => ({
        ...prevState,
        [name]: `Enter your ${name}`,
      }));
      setAllowSubmit(false);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setAllowSubmit(true);
    }
  };

  useEffect(() => {
    if (formData["confirm-password"] !== formData.password) {
      setValidateSuccess((prevState) => ({
        ...prevState,
        ["confirm-password"]: false,
      }));
    } else {
      setValidateSuccess((prevState) => ({
        ...prevState,
        ["confirm-password"]: true,
      }));
    }
  }, [formData.password, formData]);

  const handleResetPassword = async () => {
    const email = getSignUpUser();
    if (!email) {
      throw new Error("No email found in session storage");
    }
    const resetPasswordPayload = {
      email: email,
      code: formData.code,
      password: formData.password,
    };
    setLoading(true);
    const clearAll = () => {
      setLoading(false);
      setTimeout(() => {
        setSuccessRes("");
        setOpenModal(false);
      }, 2000);
    };
    try {
      const data = await resetPassword(resetPasswordPayload);
      setLoading(true);
      setSuccessRes(data?.data);
      setOpenModal(true);
      setTimeout(() => {
        data?.data &&
          data?.data.statusCode === 200 &&
          navigate.push("/auth/login");
      }, 3000);
    } catch (error) {
      console.log(error);
      setLoading(true);
      setOpenModal(true);
    } finally {
      clearAll();
    }
  };

  const handleForgotPassword = async (e: any) => {
    e.preventDefault();
    const email = getSignUpUser();
    const forgotPasswordPayload = {
      email: email as string,
    };
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
        New password
      </h3>
      <p className=" text-cs-grey-100 text-sm">Set up your new password</p>
      <form onSubmit={handleForgotPassword}>
        <AuthInput
          label="Code"
          action={handleInput}
          errorMessage={errMessage.code}
          inputName="code"
          inputType="number"
          placeHolder="code"
        />
        <AuthInput
          label="Password"
          action={handleInput}
          errorMessage={errMessage.password}
          inputName="password"
          inputType="password"
          placeHolder="password"
        />
        <AuthInput
          label="Confirm password"
          action={handleInput}
          errorMessage={errMessage["confirm-password"]}
          inputName="confirm-password"
          inputType="password"
          placeHolder="password"
        />
        <SubmitButton
          text="Set password"
          action={handleResetPassword}
          activate={activateButton(validateSuccess)}
        />
        <div className="text-center  mt-8 ">
          <Link
            href={"/auth/login"}
            className=" text-cs-purple-650 text-sm font-medium"
          >
            Back to sign in
          </Link>

          <button
            className=" text-cs-purple-650 text-sm font-medium ml-5"
            type="submit"
          >
            Resend code
          </button>
        </div>
      </form>
      <SuccessSlideIn
        openModal={openModal}
        response={successRes && successRes?.statusCode === 200}
        successActionResponse={
          successRes && successRes?.body && successRes?.body.message
        }
        closeModal={() => {}}
      />
      <FailureSlideIn
        openModal={openModal}
        response={successRes && successRes?.statusCode !== 200}
        errResponse={successRes && successRes?.body && successRes?.body.message}
        closeModal={() => {}}
      />
      {loading && <LoadingScreen />}
    </AuthLayout>
  );
}
