"use client";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { useEffect, useState } from "react";
import PinInput from "react-pin-input";
import style from "./authStyle.module.css";
import AuthLayout from "@/components/auth/AuthLayout";
import {
  confirmSignUpOpt,
  resendVerificationOTP,
} from "@/services/authService";
import { getSignUpUser, updateSignUpUser } from "@/config";
import { useRouter } from "next/router";
import { SuccessSlideIn } from "@/components/SuccessSlideIn";
import { FailureSlideIn } from "@/components/FailureSlideIn";
import LoadingScreen from "@/components/modals/LoadingScreen";
import Link from "next/link";

export default function Verify() {
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [countDown, setCountDown] = useState(60);
  const [signUpCode, setSignUpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [successRes, setSuccessRes] = useState<any>();
  const navigate = useRouter();

  const padZero = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };

  useEffect(() => {
    countDown > 0 && setTimeout(() => setCountDown(countDown - 1), 1000);
  }, [countDown]);

  const minutes = Math.floor(countDown / 60);
  const seconds = countDown % 60;

  const handleAllowSubmit = (value: string, index: number) => {
    if (value.length === 6) {
      setAllowSubmit(true);
      setSignUpCode(value);
    } else {
      setAllowSubmit(false);
    }
  };

  const handleResendVerifyPassword = async () => {
    setLoading(true);
    const clearAll = () => {
      setLoading(false);
      setTimeout(() => {
        setSuccessRes("");
        setOpenModal(false);
      }, 2000);
    };
    try {
      const email = getSignUpUser();
      if (!email) {
        throw new Error("No email found in session storage");
      }

      const payload = { email: email };

      const { data } = await resendVerificationOTP(payload);
      setLoading(true);
      setSuccessRes(data);
      setOpenModal(true);
    } catch (error) {
      console.log(error);
      setLoading(true);
      setOpenModal(true);
    } finally {
      clearAll();
      setCountDown(120);
    }
  };

  const handleConfirmSIgnUp = async () => {
    setLoading(true);
    const confirmSignUpPayload = {
      user_name: getSignUpUser(),
      code: signUpCode,
    };
    const clearAll = () => {
      setLoading(false);
      setTimeout(() => {
        setSuccessRes("");
        setOpenModal(false);
      }, 2000);
    };
    try {
      const { data } = await confirmSignUpOpt(confirmSignUpPayload);
      setLoading(true);
      setSuccessRes(data);
      setOpenModal(true);
      setTimeout(() => {
        data.body.status === "Success" && navigate.push("/auth/login");
      }, 3000);
    } catch (error) {
      console.log(error);
      setLoading(true);
    } finally {
      clearAll();
    }
  };

  return (
    <AuthLayout>
      <h3 className=" text-2xl font-semibold text-cs-grey-dark mb-1 metro-medium">
        Verify your account
      </h3>
      <p className=" text-cs-grey-100 text-sm">
        We sent a verification code to your email.
      </p>
      <form>
        <div id={style.customInput}>
          <PinInput
            length={6}
            initialValue=""
            // secret={true}
            // secretDelay={100}
            onChange={(value, index) => handleAllowSubmit(value, index)}
            type="numeric"
            inputMode="number"
            style={{
              marginTop: "48px",
              display: "flex",
              justifyContent: "space-between",
            }}
            inputStyle={{
              borderColor: "#9F9F9F",
              borderRadius: "10px",
              fontSize: "47px",
              fontWeight: "600",
            }}
            inputFocusStyle={{ borderColor: "blue" }}
            onComplete={(value, index) => {
              value.length === 6 && setAllowSubmit(true);
            }}
            autoSelect={false}
            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
          />
        </div>

        <SubmitButton
          text="Verify account"
          action={handleConfirmSIgnUp}
          activate={allowSubmit}
        />

        <p className=" text-cs-grey-100 font-medium text-sm text-center mt-8 metro-medium">
          Didn’t see code?{" "}
          {minutes === 0 && seconds === 0 ? (
            <span
              className=" text-cs-purple-650 cursor-pointer"
              onClick={handleResendVerifyPassword}
            >
              Resend now
            </span>
          ) : (
            `Resend in ${padZero(minutes)}:${padZero(seconds)}`
          )}
        </p>
        <div className="text-center  mt-8">
          <Link href={"/"} className=" text-cs-purple-650 text-sm font-medium">
            Back to Home
          </Link>
        </div>
      </form>

      <SuccessSlideIn
        openModal={openModal}
        response={successRes?.body && successRes?.body.status === "Success"}
        successActionResponse="Password confirmed"
        closeModal={() => {}}
      />
      <FailureSlideIn
        openModal={openModal}
        response={successRes?.body && successRes?.body.status === "Error"}
        errResponse={successRes?.body && successRes?.body.message}
        closeModal={() => {}}
      />
      {loading && <LoadingScreen />}
    </AuthLayout>
  );
}
