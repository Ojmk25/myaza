import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  ValidateLink,
  extractAfterLastSlashOrFull,
  isValidUUID,
} from "../utils/Validators";
import heroImage from "@/public/assets/images/hero_shrink_one.svg";
import { Add, Calendar } from "iconsax-react";
import ScheduleMeeting from "../components/modals/ScheduleMeeting";

// import 'react-datetime-picker/dist/DateTimePicker.css';
// import 'react-calendar/dist/Calendar.css';
// import 'react-clock/dist/Clock.css';

import {
  IsAuthenticated,
  getNameAbbreviation,
  logOutUser,
} from "@/services/authService";

import LoadingScreen from "@/components/modals/LoadingScreen";
import {
  createInstantMeeting,
  setInstantMeeting,
} from "@/services/meetingServices";
import Header from "@/components/Header";
// import { subDomain } from "@/utils/getDomain";
import { SuccessSlideIn } from "@/components/SuccessSlideIn";
import { FailureSlideIn } from "@/components/FailureSlideIn";
import { validateMeetingIdString } from "@/utils/meetingFunctions";
import { useSessionStorage } from "@/hooks/useStorage";

export default function Home() {
  const navigate = useRouter();
  const [linkData, setLinkData] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [errorColour, setErrorColour] = useState(false);
  const [showModal, setShowModal] = useState("");
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [meetingData, setMeetingData] = useState<any>();
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [profilePic, setProfilePic] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [expressJoin, setExpressJoin] = useSessionStorage(
    "meetingJoiner",
    "yes"
  );

  useEffect(() => {
    setLoggedIn(IsAuthenticated());
    getNameAbbreviation();
  }, []);

  //shows loading screen, when you use navigate.push()
  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== navigate.asPath) {
        setLoading(true);
      }
    };
    const handleComplete = () => {
      setLoading(false);
    };

    navigate.events.on("routeChangeStart", handleStart);
    navigate.events.on("routeChangeComplete", handleComplete);
    navigate.events.on("routeChangeError", handleComplete);

    return () => {
      navigate.events.off("routeChangeStart", handleStart);
      navigate.events.off("routeChangeComplete", handleComplete);
      navigate.events.off("routeChangeError", handleComplete);
    };
  }, [navigate]);

  const handleInput = (input: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = input.target;
    const extractedLink = extractAfterLastSlashOrFull(value);
    if (value.length === 0) {
      setErrorColour(true);
      setDisableButton(true);
      setErrMessage("Enter your link");
    } else if (!validateMeetingIdString(extractedLink)) {
      setErrorColour(true);
      setDisableButton(true);
      setErrMessage("Invalid meeting link");
    } else {
      setErrorColour(false);
      setDisableButton(false);
      setErrMessage("");
    }
    setLinkData(value);
  };

  const handleShowModal = (type: string) => {
    setShowModal(type);
    document.body.classList.add("overflow-hidden");
  };

  const handleCloseModal = () => {
    setShowModal("");
    document.body.classList.remove("overflow-hidden");
  };

  const handleSignInstantMeeting = async () => {
    setLoading(true);
    const clearAll = () => {
      setLoading(false);
      setTimeout(() => {
        setMeetingData("");
        setOpenModal(false);
      }, 2000);
    };
    try {
      const data = await createInstantMeeting({});
      console.log(data);

      // sessionStorage.setItem("meetingJoiner", "no");
      setExpressJoin("yes");
      const extractedLink = extractAfterLastSlashOrFull(
        data?.data.body.data.meeting_link
      );
      setMeetingData(data);
      setLoading(true);
      setOpenModal(true);
      data?.data.body &&
        data?.data.body.status === "Success" &&
        navigate.push(`/meet/${extractedLink}`);

      `/meet/${data?.data.body.data.MeetingDetails.ExternalMeetingId}`;

      // setInstantMeeting(data?.data.body.data.MeetingDetails.MeetingId as string, data?.data.body.data)
    } catch (error) {
      console.log(error);
      setLoading(true);
      setOpenModal(true);
    } finally {
      console.log("Finally");
      clearAll();
    }
  };

  const joinMeeting = (input: string) => {
    const extractedLink = extractAfterLastSlashOrFull(input);
    navigate.push(`/meet/${extractedLink}`);
  };

  return (
    <div className=" ">
      {loggedIn !== null && (
        <main className=" pt-6 lg:pt-7 w-full flex items-center justify-center flex-col mx-auto ">
          <Header />

          <div className="flex justify-center items-center ">
            <div className="block lg:grid px-6 gap-x-16 items-center grid-cols-2  bg-cs-bg max-auto w-full max-w-[1392px]">
              <div className="basis-full">
                <h3 className=" text-[40px] md:text-[64px] text-cs-black-100 leading-[44px] md:leading-[70px] text-center lg:text-left font-medium metro-medium">
                  Connect a team <br /> from{" "}
                  <span className="text-cs-purple-650">anywhere!</span>
                </h3>
                <p className=" text-cs-grey-100 text-lg text-center lg:text-left md:text-2xl mt-4">
                  With our secure video conferencing service, you can connect
                  with your team with ease.
                </p>
                <div
                  className={`  gap-x-4 py-6  ${
                    loggedIn ? "hidden" : "flex justify-center lg:justify-start"
                  }`}
                >
                  <button
                    className=" text-cs-grey-50 bg-cs-purple-650 rounded-md py-[14px] px-10 font-bold max-h-[52px] h-full w-full md:w-fit"
                    onClick={() => navigate.push("/auth/signup")}
                  >
                    Sign up
                  </button>
                  <button
                    className=" text-cs-purple-650 font-bold py-3 px-10 border border-cs-purple-650 rounded hover:text-white hover:bg-cs-purple-650 max-h-[52px] w-full md:w-fit"
                    onClick={() => navigate.push("/auth/login")}
                  >
                    Sign in
                  </button>
                </div>
                <div className="flex justify-center flex-col md:flex-row gap-y-6 lg:justify-between mt-4 md:mt-8 relative">
                  <div
                    className={` ${
                      loggedIn ? "flex " : "hidden"
                    } relative group `}
                  >
                    <button className="w-full h-12 md:w-[200px] text-cs-grey-50 bg-cs-purple-650 rounded-md py-2 px-4 font-bold max-h-[52px]">
                      Create New Session
                    </button>
                    <div className="w-full absolute hidden group-hover:block top-12 shadow-2xl rounded-lg z-10 bg-white">
                      <div
                        className=" flex py-3 md:py-4 px-3 gap-x-2 hover:bg-cs-grey-55 rounded-t-lg cursor-pointer"
                        onClick={handleSignInstantMeeting}
                      >
                        <Add size={20} />
                        <button className=" text-cs-grey-dark">
                          Instant meeting
                        </button>
                      </div>
                      <div
                        className=" flex py-4 px-3 gap-x-2 hover:bg-cs-grey-55 rounded-b-lg cursor-pointer"
                        onClick={() => handleShowModal("schedule")}
                      >
                        <Calendar size={20} />
                        <button className=" text-cs-grey-dark">
                          Schedule for later
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p
                      className={` ${
                        loggedIn ? "hidden" : "block"
                      } text-cs-grey-dark font-normal py-3 text-base`}
                    >
                      Want to join a meeting? Paste the meeting link below.
                    </p>
                    <div
                      className={`flex border ${
                        errorColour
                          ? "border-cs-error-600"
                          : " border-cs-grey-55"
                      }  rounded-md py-1 pr-1 pl-3 border-solid h-12`}
                    >
                      <input
                        type="text"
                        name="link"
                        id=""
                        placeholder="Meeting link E.g xap-ikl-eop"
                        className="flex-1 placeholder:text-cs-grey-200 md:min-w-60 outline-none self-center"
                        onChange={(e) => handleInput(e)}
                        value={linkData}
                      />
                      <button
                        className=" text-cs-purple-650 font-bold py-0 md:py-1 px-6 border border-cs-purple-650 rounded hover:text-white hover:bg-cs-purple-650"
                        onClick={() => joinMeeting(linkData)}
                        disabled={disableButton}
                      >
                        Join
                      </button>
                    </div>
                    <p className="text-sm text-cs-error-600 min-h-6">
                      {errMessage}
                    </p>
                  </div>
                </div>
              </div>
              <div className="basis-full my-4 md:my-0 px-6 lg:px-0">
                <Image
                  src={heroImage}
                  alt="hero"
                  className="w-full h-full max-h-[480px] aspect-auto"
                />
              </div>
            </div>
          </div>

          {showModal === "schedule" && (
            <ScheduleMeeting onClose={handleCloseModal} />
          )}
          <SuccessSlideIn
            openModal={openModal}
            response={meetingData && meetingData?.data.statusCode === 200}
            successActionResponse={
              meetingData && meetingData?.data.body.message
            }
            closeModal={() => {}}
          />

          <FailureSlideIn
            openModal={openModal}
            response={meetingData && meetingData?.data.statusCode !== 200}
            errResponse={meetingData && meetingData?.data.body.message}
            closeModal={() => {}}
          />

          {loading && <LoadingScreen />}
        </main>
      )}
    </div>
  );
}
