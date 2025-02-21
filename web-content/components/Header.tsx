import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import DateTimeDisplay from "@/utils/getDate";
import { Profile, LoginCurve, MessageQuestion, InfoCircle } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import cecureStream from "@/public/assets/images/cecurestream.svg";
import cecureStreamSmall from "@/public/assets/images/cecureStreamSmall.svg";
import {
  getClientInfo,
  getNameAbbreviation,
  IsAuthenticated,
  logOutUser,
} from "@/services/authService";
import Settings from "@/components/modals/Settings";
import WidgetButton from "./WidgetButton";
import { usePathname } from "next/navigation";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const currentTimeRef = useRef<HTMLDivElement>(null);
  const currentDateRef = useRef<HTMLDivElement>(null);
  const currentTimeRefSmall = useRef<HTMLDivElement>(null);
  const currentDateRefSmall = useRef<HTMLDivElement>(null);
  const navigate = useRouter();
  const [profileModal, setProfileModal] = useState(false);
  const [showModal, setShowModal] = useState("");
  const { picture } = getClientInfo();
  const widgetRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
const [showTerms,setShowTerms] = useState(false)

  useEffect(() => {
    setLoggedIn(IsAuthenticated());
    getNameAbbreviation();
  }, []);

  // useEffect(() => {
  //   // Function to update screenWidth state when the window is resized
  //   const handleResize = () => {
  //     setScreenWidth(window.innerWidth);
  //   };

  //   // Initial width when component mounts
  //   setScreenWidth(window.innerWidth);
  //   handleResize();
  //   // Add event listener to window resize event
  //   window.addEventListener("resize", handleResize);

  //   // Cleanup function to remove event listener when component unmounts
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

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
    const intervalId = setInterval(updateCurrentTime, 1000);

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
    const intervalId = setInterval(updateCurrentTime, 1000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // useEffect(() => {
  //   const appendWidget = () => {
  //     const widgetElement = document?.querySelector(
  //       "#atlwdg-trigger"
  //     ) as HTMLElement;

  //     widgetElement?.classList.add("w-full", "inset-0");
  //     if (widgetElement) {
  //       widgetElement.style.inset = "0";
  //       widgetElement.style.width = "100%";
  //     }
  //     if (widgetElement?.parentNode) {
  //       widgetElement.parentNode.removeChild(widgetElement);
  //     }
  //     if (widgetRef && widgetElement) {
  //       widgetRef.current?.append(widgetElement as Node);
  //     }
  //   };
  //   const timerId = setTimeout(() => {
  //     appendWidget();
  //   }, 3000);
  //   return () => {
  //     clearTimeout(timerId);
  //   };
  // }, [screenWidth]);

  useEffect(() => {
    const callback: MutationCallback = (mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          const scriptElement = document.querySelector("#atlwdg-trigger");
          if (scriptElement) {
            handleScriptLoaded();
            observer.disconnect(); // Stop observing once the script is found
            break;
          }
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect(); // Clean up the observer when the component unmounts
    };
  }, []);

  const handleScriptLoaded = () => {
    const widgetElement = document?.querySelector(
      "#atlwdg-trigger"
    ) as HTMLElement;

    widgetElement?.classList.add("w-full", "inset-0");
    if (widgetElement) {
      widgetElement.style.inset = "0";
      widgetElement.style.width = "100%";
    }
    if (widgetElement?.parentNode) {
      widgetElement.parentNode.removeChild(widgetElement);
    }
    if (widgetRef && widgetElement) {
      widgetRef.current?.append(widgetElement as Node);
    }
  };

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
        <div className="flex justify-between items-center w-full  px-6 pb-6 shadow-1xl mb-6">
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
              {picture && picture !== "" ? (
                <Image
                  src={picture}
                  width={32}
                  height={32}
                  alt="avatar"
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
              picture && picture !== "" && (
                <Image
                  src={picture}
                  width={32}
                  height={32}
                  alt="logo"
                  className={` cursor-pointer rounded-full w-8 h-8 md:w-10 md:h-10 object-cover ${
                    loggedIn ? "block md:hidden" : "hidden"
                  }`}
                  onClick={() => setProfileModal(!profileModal)}
                />
              )
            }
            {!picture && picture !== "" && loggedIn && (
              <div
                className=" bg-cs-grey-800 w-[38px] h-[38px] rounded-full flex justify-center items-center text-cs-grey-50 md:hidden cursor-pointer"
                onClick={() => setProfileModal(!profileModal)}
              >
                {getNameAbbreviation()}
              </div>
            )}
            {profileModal && (
              <div className=" bg-white border border-solid border-cs-grey-50 rounded-[10px] overflow-hidden absolute md:hidden right-0 z-10">
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

          {/* big screen auth buttons */}
          <div
            className={`  gap-x-4 ${loggedIn ? "hidden" : "hidden md:flex"}`}
          >
            <button
              className=" text-cs-grey-50 bg-cs-purple-650 rounded-md py-[14px] px-10 font-bold max-h-[52px] h-full"
              onClick={() => navigate.push(`/auth/signup`)}
            >
              Sign up
            </button>
            <button
              className=" text-cs-purple-650 font-bold py-3 px-10 border border-cs-purple-650 rounded hover:text-white hover:bg-cs-purple-650 max-h-[52px]"
              onClick={() =>
                navigate.push(`/auth/login?prevpage=${lastSegment}`)
              }
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
              ref={currentTimeRefSmall}
            ></div>
            <div
              className=" text-xs text-cs-grey-800 font-normal block md:hidden"
              id="small-screen-date"
              ref={currentDateRefSmall}
            ></div>
          </div>
        </div>
      )}
      {showModal === "settings" && <Settings onClose={handleCloseModal} />}
      
 {
        pathname !== "/user-guide" &&
        pathname !== "/acceptance-policy" &&
        pathname !== "/privacy-policy" &&
        pathname !== "/terms-of-service"
        &&
         <button onMouseEnter={()=>setShowTerms(!showTerms)} onMouseLeave={()=>setShowTerms(!showTerms)}  className="w-fit fixed bottom-3 right-14 md:right-40 z-50 flex items-center gap-[6px] p-[10px]">
             <InfoCircle
                      size="16"
                      color="#7133CF"
                      className="mx-auto max-w-5"
                    />
                <p className="text-cs-purple-500 text-[14px]  lg:text-base leading-[18px] font-medium border-b-[1px] border-dashed border-cs-purple-500">User Guide</p>
            {
              showTerms &&
              <div className=" bg-white  rounded-[10px] absolute  -top-32 right-0 text-left  z-50 flex flex-col w-max p-4 shadow-md">
              <Link href="/user-guide" className="mb-2 hover:text-cs-purple-500 hover:font-bold">
                  User Guide
                </Link>
                <Link href="/privacy-policy"  className="mb-2 hover:text-cs-purple-500 hover:font-bold">
                 Privacy Policy
              </Link><Link href="/terms-of-service"  className="mb-2 hover:text-cs-purple-500 hover:font-bold">
                 Terms of Service
              </Link><Link href="/acceptance-policy" className="hover:text-cs-purple-500 hover:font-bold">
                  Acceptance Policy
              </Link>
            </div>
        }
           

          </button>
      }
        
    <div
        className=" w-fit fixed bottom-5 right-4 z-50 text-white"
        ref={widgetRef}
      >
        <div     
className="bg-cs-purple-650 text-cs-grey-60-light p-[10px] rounded-lg font-semibold flex items-center md:gap-x-2 cursor-pointer">
          <MessageQuestion size="20" color="#FAF0FF" className="m-auto" />
          <p className="hidden md:block">Feedback?</p>
        </div>
      </div>
    </>
  );
}
