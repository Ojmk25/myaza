import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import DateTimeDisplay from "@/utils/getDate";
import avatar from "@/public/assets/images/avatar.png";
import { Profile, LoginCurve } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppCtx } from "@/context/StoreContext";

import cecureStream from "@/public/assets/images/cecurestream.svg";
import cecureStreamSmall from "@/public/assets/images/cecureStreamSmall.svg";
import {
  getNameAbbreviation,
  IsAuthenticated,
  logOutUser,
} from "@/services/authService";
import Settings from "@/components/modals/Settings";

export default function Header() {
  const ctx = useContext(AppCtx);
  const [loggedIn, setLoggedIn] = useState(false);
  const currentTimeRef = useRef<HTMLDivElement>(null);
  const currentDateRef = useRef<HTMLDivElement>(null);
  const currentTimeRefSmall = useRef<HTMLDivElement>(null);
  const currentDateRefSmall = useRef<HTMLDivElement>(null);
  const navigate = useRouter();

  const [profilePic, setProfilePic] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [showModal, setShowModal] = useState("");

  useEffect(() => {
    setLoggedIn(IsAuthenticated());
    getNameAbbreviation();
  }, []);

  useEffect(() => {
    const updateCurrentTime = () => {
      const displayDate = DateTimeDisplay;
      const { hours, minutes, ampm, day, dayOfWeek, month } = displayDate();
      if (currentTimeRef.current !== null && currentDateRef.current !== null) {
        currentTimeRef.current.textContent = `${
          hours < 10 ? "0" + hours : hours
        }:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
        currentDateRef.current.textContent = `${dayOfWeek} ${month}. ${day}`;
      }
    };

    // Update the time initially
    updateCurrentTime();

    // Update the time every minute
    const intervalId = setInterval(updateCurrentTime, 60000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const updateCurrentTime = () => {
      const displayDate = DateTimeDisplay;
      const { hours, minutes, ampm, day, dayOfWeek, month } = displayDate();
      if (
        currentTimeRefSmall.current !== null &&
        currentDateRefSmall.current !== null
      ) {
        currentTimeRefSmall.current.textContent = `${
          hours < 10 ? "0" + hours : hours
        }:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
        currentDateRefSmall.current.textContent = `${dayOfWeek} ${month}. ${day}`;
      }
    };

    // Update the time initially
    updateCurrentTime();

    // Update the time every minute
    const intervalId = setInterval(updateCurrentTime, 60000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const handleShowModal = (type: string) => {
    setShowModal(type);
    document.body.classList.add("overflow-hidden");
  };

  const logOut = async () => {
    logOutUser();
    setProfileModal(false);
    navigate.refresh();
    navigate.push("/");
  };

  const handleCloseModal = () => {
    setShowModal("");
    document.body.classList.remove("overflow-hidden");
  };
  return (
    <>
      {loggedIn !== null && (
        <div className="flex justify-between items-center w-full  px-6 pb-6 md:pb-7 shadow-1xl">
          <Link href={"/"} className=" md:hidden">
            <Image src={cecureStreamSmall} alt="logo" />
          </Link>
          <Link href={"/"} className="hidden md:block">
            <Image src={cecureStream} alt="logo" />
          </Link>

          <div
            className={`${
              loggedIn ? "md:flex hidden" : "hidden"
            } justify-between gap-x-3 items-center `}
          >
            <div
              className=" text-cs-grey-800 font-normal hidden md:block"
              ref={currentTimeRef}
            ></div>
            <div className=" w-[1px] bg-cs-grey-200 h-[24px] hidden md:block"></div>
            <div
              className=" text-cs-grey-800 font-normal hidden md:block"
              ref={currentDateRef}
            ></div>

            <div className=" cursor-pointer">
              {profilePic ? (
                <Image
                  src={avatar}
                  alt="logo"
                  className="rounded-full w-8 h-8 md:w-10 md:h-10 object-cover"
                  onClick={() => setProfileModal(!profileModal)}
                />
              ) : (
                <div
                  className=" bg-cs-grey-800 w-[38px] h-[38px] rounded-full flex justify-center items-center text-cs-grey-50"
                  onClick={() => setProfileModal(!profileModal)}
                >
                  {getNameAbbreviation()}
                </div>
              )}
              {profileModal && (
                <div className=" bg-white border border-solid border-cs-grey-50 rounded-[10px] overflow-hidden absolute right-[50px] hidden md:block z-50">
                  <div
                    className=" text-cs-grey-dark flex gap-x-2 items-center hover:bg-cs-grey-55 p-2 font-normal"
                    onClick={() => {
                      handleShowModal("settings");
                      setProfileModal(false);
                    }}
                  >
                    <Profile size="20" color="#080808" />
                    <span className=" inline-block">Profile</span>
                  </div>
                  <div
                    className=" text-cs-grey-dark flex gap-x-2 items-center hover:bg-cs-grey-55 p-2 font-normal"
                    onClick={logOut}
                  >
                    <LoginCurve size="20" color="#080808" variant="Bold" />
                    <span className=" inline-block">Logout</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className=" relative  md:hidden cursor-pointer">
            {
              // for bigger screens
              profilePic && (
                <Image
                  src={avatar}
                  alt="logo"
                  className={` cursor-pointer rounded-full w-8 h-8 md:w-10 md:h-10 object-cover ${
                    loggedIn ? "block md:hidden" : "hidden"
                  }`}
                  onClick={() => setProfileModal(!profileModal)}
                />
              )
            }
            {!profilePic && loggedIn && (
              <div
                className=" bg-cs-grey-800 w-[38px] h-[38px] rounded-full flex justify-center items-center text-cs-grey-50 md:hidden cursor-pointer"
                onClick={() => setProfileModal(!profileModal)}
              >
                {getNameAbbreviation()}
              </div>
            )}
            {profileModal && (
              <div className=" bg-white border border-solid border-cs-grey-50 rounded-[10px] overflow-hidden absolute md:hidden right-0">
                <div
                  className=" text-cs-grey-dark flex gap-x-2 items-center hover:bg-cs-grey-55 p-2 font-normal"
                  onClick={() => {
                    handleShowModal("settings");
                    setProfileModal(false);
                  }}
                >
                  <Profile size="20" color="#080808" />
                  <span className=" inline-block">Profile</span>
                </div>
                <div
                  className=" text-cs-grey-dark flex gap-x-2 items-center hover:bg-cs-grey-55 p-2 font-normal"
                  onClick={logOut}
                >
                  <LoginCurve size="20" color="#080808" variant="Bold" />
                  <span className=" inline-block">Logout</span>
                </div>
              </div>
            )}
          </div>

          <div
            className={`  gap-x-4 ${loggedIn ? "hidden" : "hidden md:flex"}`}
          >
            <button
              className=" text-cs-grey-50 bg-cs-purple-650 rounded-md py-[14px] px-10 font-bold max-h-[52px] h-full"
              onClick={() => navigate.push("/auth/signup")}
            >
              Sign up
            </button>
            <button
              className=" text-cs-purple-650 font-bold py-3 px-10 border border-cs-purple-650 rounded hover:text-white hover:bg-cs-purple-650 max-h-[52px]"
              onClick={() => navigate.push("/auth/login")}
            >
              Sign in
            </button>
          </div>

          <div
            className={`${
              loggedIn ? "hidden" : "flex md:hidden"
            } justify-between gap-x-1 items-center `}
          >
            <div
              className=" text-xs text-cs-grey-800 font-normal block md:hidden"
              id="small-screen-time"
            ></div>
            <div
              className=" text-xs text-cs-grey-800 font-normal block md:hidden"
              id="small-screen-date"
            ></div>
          </div>
        </div>
      )}
      {showModal === "settings" && <Settings onClose={handleCloseModal} />}
    </>
  );
}
