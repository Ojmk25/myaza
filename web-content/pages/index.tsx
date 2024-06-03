import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { ValidateLink } from "../utils/Validators";
import DateTimeDisplay from "../utils/getDate";
import heroImage from "@/public/assets/images/landingHero.svg"
import avatar from "@/public/assets/images/avatar.png"
import { Add, Calendar } from "iconsax-react";
import { setInterval } from "timers";
import ScheduleMeeting from "../components/modals/ScheduleMeeting";

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import JoinMeeting from "../components/modals/JoinMeeting";
import { IsAuthenticated, getNameAbbreviation } from "@/services/authService";


import LoadingScreen from "@/components/modals/LoadingScreen";
import { createInstantMeeting, setInstantMeeting } from "@/services/meetingServices";

export default function Home() {

  const currentTimeRef = useRef<HTMLDivElement>(null);
  const currentDateRef = useRef<HTMLDivElement>(null);
  const navigate = useRouter();
  const [linkData, setLinkData] = useState('');
  const [errMessage, setErrMessage] = useState('')
  const [errorColour, setErrorColour] = useState(false)
  const [showModal, setShowModal] = useState("");
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true)
  const [testData, setTestData] = useState<any>()
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null)
  const [profilePic, setProfilePic] = useState(false);

  useEffect(() => {
    setLoggedIn(IsAuthenticated())
    getNameAbbreviation()
  }, [])

  const handleInput = (input: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = input.target;
    if (value.length === 0) {
      setErrorColour(true)
      setDisableButton(true)
      setErrMessage("Enter your link");
    }
    else if (!ValidateLink(value)) {
      setErrorColour(true)
      setDisableButton(true)
      setErrMessage("Invalid meeting link")
    } else {
      setErrorColour(false)
      setDisableButton(false)
      setErrMessage("")
    }
    setLinkData(value);
  }

  useEffect(() => {
    const updateCurrentTime = () => {
      const smallTime = document.getElementById("small-screen-time")
      const smallDate = document.getElementById("small-screen-date")
      const displayDate = DateTimeDisplay;
      const { hours, minutes, ampm, day, dayOfWeek, month } = displayDate();
      if (currentTimeRef.current !== null && currentDateRef.current !== null) {
        currentTimeRef.current.textContent = `${hours < 10 ? ('0' + hours) : hours}:${minutes < 10 ? ('0' + minutes) : minutes} ${ampm}`;
        currentDateRef.current.textContent = `${dayOfWeek} ${month}. ${day}`;
      }
      if (smallTime && smallDate) {
        smallTime.innerHTML = `${hours < 10 ? ('0' + hours) : hours}:${minutes < 10 ? ('0' + minutes) : minutes} ${ampm}`;
        smallDate.innerHTML = `${dayOfWeek} ${month}. ${day}`;
      }
    };

    // Update the time initially
    updateCurrentTime()

    // Update the time every minute 
    const intervalId = setInterval(updateCurrentTime, 60000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [loggedIn]);

  const handleShowModal = (type: string) => {
    setShowModal(type);
    document.body.classList.add('overflow-hidden');
  };

  const handleCloseModal = () => {
    setShowModal("");
    document.body.classList.remove('overflow-hidden');
  };



  const handleSignInstantMeeting = async () => {
    setLoading(true)
    try {
      const data = await createInstantMeeting({})
      setTestData(data)
      setLoading(true)
      data?.data.body && data?.data.body.status === 'Success' && navigate.push(`/${data?.data.body.data.MeetingDetails.ExternalMeetingId}`)
      // console.log(data?.data.body && data?.data.body.status === 'Success', data?.data.body.data.MeetingDetails.ExternalMeetingId);
      setInstantMeeting(data?.data.body.data.MeetingDetails.ExternalMeetingId as string, data?.data.body.data)
    } catch (error) {
      console.log(error)
      setLoading(true)
    } finally {
      console.log('Finally');
      setLoading(false)

    }
  }


  return (<>
    {loggedIn !== null && <main className="md:pb-20 pt-6 md:pt-10">
      <div className="flex justify-between items-center px-6 md:px-20 pb-6 md:pb-7 shadow-1xl">
        <div className="flex gap-x-1 items-center">
          <h1 className=" text-xl md:text-3xl text-cs-purple-650 font-bold">CecureStream</h1>
          <div className=" text-xs text-cs-grey-700 font-medium border-[0.5px] border-cs-grey-700 md:pb-[2px] px-2 rounded-lg border-solid mt-2">Beta</div>
        </div>

        <div className={`${loggedIn ? 'md:flex hidden' : 'hidden'} justify-between gap-x-3 items-center `}>
          <div className=" text-cs-grey-800 font-normal hidden md:block" ref={currentTimeRef}></div>
          <div className=" w-[1px] bg-cs-grey-200 h-[24px] hidden md:block"></div>
          <div className=" text-cs-grey-800 font-normal hidden md:block" ref={currentDateRef}></div>
          {profilePic ?
            <Image src={avatar} alt="logo" className="rounded-full w-8 h-8 md:w-10 md:h-10 object-cover" />
            :
            <div className=" bg-cs-grey-800 w-[38px] h-[38px] rounded-full flex justify-center items-center text-cs-grey-50">{getNameAbbreviation()}</div>
          }
        </div>


        {profilePic && <Image src={avatar} alt="logo" className={`rounded-full w-8 h-8 md:w-10 md:h-10 object-cover ${loggedIn ? "block md:hidden" : "hidden"}`} />}
        {!profilePic && loggedIn && <div className=" bg-cs-grey-800 w-[38px] h-[38px] rounded-full flex justify-center items-center text-cs-grey-50 md:hidden">{getNameAbbreviation()}</div>}



        <div className={`  gap-x-4 ${loggedIn ? 'hidden' : 'hidden md:flex'}`}>
          <button className=" text-cs-grey-50 bg-cs-purple-650 rounded-md py-[14px] px-10 font-bold max-h-[52px] h-full" onClick={() => navigate.push("/auth/signup")}>Sign up</button>
          <button className=" text-cs-purple-650 font-bold py-3 px-10 border border-cs-purple-650 rounded hover:text-white hover:bg-cs-purple-650 max-h-[52px]" onClick={() => navigate.push("/auth/login")}>Sign in</button>
        </div>

        <div className={`${loggedIn ? 'hidden' : 'flex md:hidden'} justify-between gap-x-1 items-center `}>
          <div className=" text-xs text-cs-grey-800 font-normal block md:hidden" id="small-screen-time"></div>
          <div className=" text-xs text-cs-grey-800 font-normal block md:hidden" id="small-screen-date"></div>
        </div>
      </div>

      <div className="block md:grid px-6 md:px-20 gap-x-16 items-center grid-cols-2 mt-2 bg-cs-bg">
        <div className="basis-full">
          <h3 className=" text-[40px] md:text-[64px] text-cs-black-100 leading-[44px] md:leading-[70px] text-center md:text-left">Connect a team <br /> from <span className="text-cs-purple-650">anywhere!</span></h3>
          <p className=" text-cs-grey-100 text-lg text-center md:text-left md:text-2xl mt-4">With our secure video conferencing service, you can connect with your team with ease.</p>
          <div className={`  gap-x-4 py-6 ${loggedIn ? 'hidden' : 'flex'}`}>
            <button className=" text-cs-grey-50 bg-cs-purple-650 rounded-md py-[14px] px-10 font-bold max-h-[52px] h-full w-full md:w-fit" onClick={() => navigate.push("/auth/signup")}>Sign up</button>
            <button className=" text-cs-purple-650 font-bold py-3 px-10 border border-cs-purple-650 rounded hover:text-white hover:bg-cs-purple-650 max-h-[52px] w-full md:w-fit" onClick={() => navigate.push("/auth/login")}>Sign in</button>
          </div>
          <div className="flex flex-col md:flex-row gap-y-6 justify-between mt-4 md:mt-8 relative">
            <div className={` ${loggedIn ? 'flex' : 'hidden'} relative group `}>
              <button className="w-full h-12 md:w-[200px] text-cs-grey-50 bg-cs-purple-650 rounded-md py-2 px-4 font-bold max-h-[52px]">Create New Session</button>
              <div className="w-full absolute hidden group-hover:block top-12 shadow-2xl rounded-lg z-10 bg-white">
                <div className=" flex py-3 md:py-4 px-3 gap-x-2 hover:bg-cs-grey-55 rounded-t-lg cursor-pointer" onClick={handleSignInstantMeeting}>
                  {/* () => navigate.push("/preview") */}
                  <Add size={20} />
                  <button className=" text-cs-grey-dark">Instant meeting</button>
                </div>
                <div className=" flex py-4 px-3 gap-x-2 hover:bg-cs-grey-55 rounded-b-lg cursor-pointer" onClick={() =>
                  handleShowModal("schedule")
                }>
                  <Calendar size={20} />
                  <button className=" text-cs-grey-dark" >Schedule for later</button>
                </div>
              </div>
            </div>
            <div>
              <p className={` ${loggedIn ? 'hidden' : 'block'} text-cs-grey-dark font-normal py-3 text-base`}>Want to join a meeting? Paste the meeting link below.</p>
              <div className={`flex border ${errorColour ? "border-cs-error-600" : " border-cs-grey-55"}  rounded-md py-1 pr-1 pl-3 border-solid h-12`}>
                <input type="text" name="link" id="" placeholder="Meeting link E.g xap-ikl-eop" className="flex-1 placeholder:text-cs-grey-200 md:min-w-60 outline-none self-center" onChange={(e) => handleInput(e)} value={linkData} />
                <button className=" text-cs-purple-650 font-bold py-0 md:py-1 px-6 border border-cs-purple-650 rounded hover:text-white hover:bg-cs-purple-650" onClick={() => navigate.push("/preview")} disabled={disableButton}>Join</button>
              </div>
              <p className="text-sm text-cs-error-600 min-h-6">{errMessage}</p>
            </div>
          </div>
        </div>
        <div className="basis-full my-4 md:my-0">
          <Image src={heroImage} alt="hero" height={490} width={600} className="md:w-[600px] md:h-[490px]" />
        </div>
      </div>

      {showModal === "schedule" && <ScheduleMeeting onClose={handleCloseModal} />}
      {showModal === "joinMeeting" && <JoinMeeting onClose={handleCloseModal} />}
      {loading && <LoadingScreen />}
    </main>}
  </>);
}
