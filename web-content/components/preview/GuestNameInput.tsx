import { useContext, useEffect, useState } from "react";
import { AuthInput } from "../auth/AuthInput";
import { ValidateText } from "@/utils/Validators";
import {
  IsAuthenticated,
  getClientInfo,
  getNameAbbreviation,
} from "@/services/authService";
import { SubmitButton } from "../auth/SubmitButton";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/StoreContext";
import { useSessionStorage } from "@/hooks/useStorage";
import Image from "next/image";

export default function GuestNameInput() {
  const [errMessage, setErrMessage] = useState({
    "First name": "",
    "Last name": "",
    link: "",
  });

  const [authData, setAuthData] = useState({
    "First name": "",
    "Last name": "",
    link: "",
  });
  const [activateButton, setActivateButton] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState(false);
  const { first_name, surname, picture } = getClientInfo();
  const navigate = useRouter();
  const [url, setUrl] = useState("");
  const { setAppState } = useAppContext();
  const [expressJoin, setExpressJoin] = useSessionStorage(
    "meetingJoiner",
    "yes"
  );
  useEffect(() => {
    setLoggedIn(IsAuthenticated());
    getNameAbbreviation();
  }, []);

  const handleInput = (input: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = input.target;
    const addError = () => {
      setErrMessage((prevState) => ({
        ...prevState,
        [name]: `Invalid ${name}`,
      }));
    };
    const removeError = () => {
      setErrMessage((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    };

    if (!ValidateText(value)) {
      addError();
    } else {
      removeError();
    }

    if (input.target.value.length === 0) {
      setErrMessage((prevState) => ({
        ...prevState,
        [name]: `Enter your ${name}`,
      }));
    }

    setAuthData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (authData["First name"].length > 2 && authData["Last name"].length > 2) {
      setActivateButton(true);
    } else {
      setActivateButton(false);
    }
  }, [authData]);
  // useEffect(() => {
  //   if (navigate.isReady) {
  //     const { query } = navigate;
  //     localStorage.getItem("meetingLink")
  //   }
  // }, [navigate.isReady, navigate.asPath]);

  const handleRoute = () => {
    setAppState((prevState) => ({
      ...prevState,
      sessionState: {
        ...prevState.sessionState,
        guestFirstName: authData["First name"],
        guestLastName: authData["Last name"],
      },
    }));
    // sessionStorage.setItem("meetingJoiner", "no");
    setExpressJoin("yes");
    navigate.push(`/meet/${localStorage.getItem("meetingLink")}`);
  };

  return (
    <>
      {loggedIn !== null && (
        <div className="basis-full col-start-1 row-start-1">
          <h3 className=" text-2xl font-semibold text-cs-grey-dark mb-1 hidden md:block">
            Join Meeting
          </h3>
          <form className=" lg:max-w-[415px]">
            <div className={` ${loggedIn ? "hidden" : "block"}`}>
              <AuthInput
                label="First name"
                action={handleInput}
                errorMessage={errMessage["First name"]}
                inputName="First name"
                inputType="text"
                placeHolder="Henry"
                value={authData["First name"]}
              />
              <AuthInput
                label="Last name"
                action={handleInput}
                errorMessage={errMessage["Last name"]}
                inputName="Last name"
                inputType="text"
                placeHolder="Kalu"
                value={authData["Last name"]}
              />
            </div>
            <div
              className={` ${
                loggedIn ? "block" : "hidden"
              } flex gap-x-4 items-center mt-[48px]`}
            >
              {/* <Image src={avatar} alt="logo" className="rounded-full w-10 h-10 object-cover" /> */}
              {!picture ? (
                <div className=" bg-cs-grey-800 w-[38px] h-[38px] rounded-full flex justify-center items-center text-cs-grey-50">
                  {getNameAbbreviation()}
                </div>
              ) : (
                <Image
                  src={picture}
                  width={40}
                  height={40}
                  alt="logo"
                  className="rounded-full w-10 h-10 object-cover"
                />
              )}
              <p className=" text-cs-grey-dark font-medium">
                Signed in as {first_name} {surname}
              </p>
            </div>
            {loggedIn ? (
              <SubmitButton
                text="Join meeting"
                action={handleRoute}
                activate={true}
              />
            ) : (
              <SubmitButton
                text="Join meeting"
                action={handleRoute}
                activate={activateButton}
              />
            )}

            <p
              className={`${
                loggedIn ? "hidden" : "block"
              } text-center my-6 text-base font-semibold text-cs-grey-dark`}
            >
              Already have an account?{" "}
              <Link href={"/auth/login"} className=" text-cs-purple-650">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
}
