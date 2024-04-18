"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import heroImage from "@/public/assets/images/landingHero.svg"
import avatar from "@/public/assets/images/avatar.png"
import { Add, Calendar } from "iconsax-react";
import { useEffect, useReducer, useRef, useState } from "react";
import { ValidateEmail, ValidatePassword, } from "./utils/Validators";
import DateTimeDisplay from "./utils/getDate";
import { setInterval } from "timers";
import ScheduleMeeting from "./components/modals/ScheduleMeeting";

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import JoinMeeting from "./components/modals/JoinMeeting";
import { useLocalVideo, useMeetingManager, LocalVideo, useAudioVideo, VideoTileGrid, DeviceLabels, AudioInputControl, ControlBar, AudioOutputControl, VideoInputControl, ControlBarButton, Phone, VideoTile } from "amazon-chime-sdk-component-library-react";
import { MeetingSessionConfiguration, DefaultDeviceController, VideoSource, AudioVideoObserver } from "amazon-chime-sdk-js";


export default function Home() {
  const [loggedIn, setLoggedIn] = useState(true)
  // const [value, onChange] = useState < Value > (new Date());
  const currentTimeRef = useRef<HTMLDivElement>(null);
  const currentDateRef = useRef<HTMLDivElement>(null);
  const currentVideoRef = useRef(null);
  const navigate = useRouter();
  // const ctx = useContext(AppCtx);
  const [authData, setAuthData] = useState({
    email: '',
    password: ''
  });
  const [errMessage, setErrMessage] = useState({
    email: '',
    password: '',
    link: '',
  })
  const [openModal, setOpenModal] = useState(false)
  const [successRes, setSuccessRes] = useState("")
  const [errorColour, setErrorColour] = useState(false)
  // const navigate = useRouter();

  const videoRef = useRef(null);


  const handleInput = (input: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = input.target;
    const addColour = (elem: React.ChangeEvent<HTMLInputElement>) => {
      elem.target.classList.add('border-cil-error-red');
      elem.target.classList.add('placeholder:text-cil-error-red')
      elem.target.classList.remove('bg-cil-slate-200')
      setErrMessage(prevState => ({
        ...prevState,
        [name]: `Invalid ${name}`
      }));
    }
    const removeColour = (elem: React.ChangeEvent<HTMLInputElement>) => {
      elem.target.classList.remove('border-cil-error-red');
      elem.target.classList.remove('placeholder:text-cil-error-red')
      elem.target.classList.add('bg-cil-slate-200')
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
    } else if (name === "link") {
      if ((!ValidateEmail(value))) {
        setErrorColour(true)
        setErrMessage(prevState => ({
          ...prevState,
          link: "Invalid meeting link",
        }))

      } else {
        setErrorColour(false)
        setErrMessage(prevState => ({
          ...prevState,
          link: "",
        }))
      }
    }

    if (input.target.value.length === 0) {
      setErrMessage(prevState => ({
        ...prevState,
        [name]: `Enter your ${name}`
      }));
    } else {
      setAuthData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
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
  }, []);

  // useEffect(() => {
  //   const deviceController = new DefaultDeviceController();
  //   const audioVideo = new AudioVideo(meetingManager, deviceController);

  //   // Bind the video element to audioVideo
  //   if (videoRef.current) {
  //     audioVideo.bindVideoElement(videoRef.current);
  //   }

  //   // Clean up function
  //   return () => {
  //     // Stop audioVideo and clean up resources
  //     audioVideo.stop();
  //   };
  // }, [])

  const [showModal, setShowModal] = useState("");

  const handleShowModal = (type: string) => {
    setShowModal(type);
    document.body.classList.add('overflow-hidden');
  };

  const handleCloseModal = () => {
    setShowModal("");
    document.body.classList.remove('overflow-hidden');
  };

  const meetingManager = useMeetingManager();
  const { isVideoEnabled, setIsVideoEnabled } = useLocalVideo();

  const toggleCamera = async () => {
    if (isVideoEnabled || !meetingManager.selectedVideoInputDevice) {
      meetingManager.meetingSession?.audioVideo?.stopLocalVideoTile();
      // Change the state to hide the `LocalVideo` tile
      setIsVideoEnabled(false);
    } else {
      await meetingManager.meetingSession?.audioVideo?.startVideoInput(
        meetingManager.selectedVideoInputDevice
      );
      meetingManager.meetingSession?.audioVideo?.startLocalVideoTile();
      // Change the state to display the `LocalVideo` tile
      setIsVideoEnabled(true);
    }
  };

  // const joinMeeting = async () => {
  //   // Fetch the meeting and attendee data from your server application
  //   const response = await fetch('https://dibxzaa24vvschnzknjn7m65pe0dvnlh.lambda-url.us-east-1.on.aws/', {
  //     mode: 'no-cors',
  //   });

  //   const data = await response.json();


  //   //Initalize the `MeetingSessionConfiguration`
  //   const meetingSessionConfiguration = new MeetingSessionConfiguration(data.Meeting, data.Attendee);

  //   // Create a `MeetingSession` using `join()` function with the `MeetingSessionConfiguration`
  //   await meetingManager.join(meetingSessionConfiguration);

  //   // At this point you could let users setup their devices, or by default
  //   // the SDK will select the first device in the list for the kind indicated
  //   // by `deviceLabels` (the default value is DeviceLabels.AudioAndVideo)
  //   //...

  //   // Start the `MeetingSession` to join the meeting
  //   await meetingManager.start();
  // };

  const fetchData = async () => {
    try {
      const response = await fetch('https://dibxzaa24vvschnzknjn7m65pe0dvnlh.lambda-url.us-east-1.on.aws/',
        {
          mode: 'cors',
          // headers: {
          //   'Access-Control-Allow-Origin': '*'
          // }
        });

      const data = await response.json();



      const meetingSessionConfiguration = new MeetingSessionConfiguration(data.Meeting, data.Attendee);

      // Create a `MeetingSession` using `join()` function with the `MeetingSessionConfiguration`
      await meetingManager.join(meetingSessionConfiguration);
      meetingManager.invokeDeviceProvider(DeviceLabels.AudioAndVideo);
      // const options = {
      //   deviceLabels: DeviceLabels.Video,
      // };
      // At this point you could let users setup their devices, or by default
      // the SDK will select the first device in the list for the kind indicated
      // by `deviceLabels` (the default value is DeviceLabels.AudioAndVideo)
      //...
      // meetingSession.audioVideo.deviceController.activeDevices['video'].stream

      // Start the `MeetingSession` to join the meeting
      await meetingManager.start();

      const videoElement: HTMLVideoElement = document.getElementById('videoElement') as HTMLVideoElement;
      console.log('Before binding video element:', videoElement);
      meetingManager.audioVideo?.startVideoPreviewForVideoInput(videoElement);
      // meetingManager.audioVideo.bindVideoElement(videoElement);


      // meetingManager.meetingSession.audioVideo.deviceController.activeDevices['video'].stream
    } catch (error) {
      console.error("An exception occurred:", error);
      // Handle the exception here
    }
    console.log('After binding video element:', HTMLVideoElement);
  };

  // useEffect(() => {
  //   console.log(meetingManager);
  //   console.log(meetingManager.audioVideo);
  // }, [meetingManager.audioVideo])




  // const [state, dispatch] = useReducer(reducer, initialState);

  // const audioVideo = useAudioVideo();
  // useEffect(() => {
  //   if (!audioVideo) {
  //     return;
  //   }

  //   const localAttendeeId =
  //     meetingManager.meetingSession?.configuration.credentials?.attendeeId ||
  //     null;

  //   const observer: AudioVideoObserver = {
  //     remoteVideoSourcesDidChange: (videoSources: VideoSource[]): void => {
  //       // dispatch({
  //       //   type: VideoTileGridAction.UpdateVideoSources,
  //       //   payload: {
  //       //     videoSources,
  //       //     localAttendeeId,
  //       //   },
  //       // });
  //       console.log(videoSources);

  //     },
  //   };

  //   console.log(audioVideo);


  //   audioVideo.addObserver(observer);

  //   return (): void => audioVideo.removeObserver(observer);
  // }, [audioVideo]);

  // console.log(audioVideo);

  const leaveMeeting = async () => {
    await meetingManager.leave();
  };


  return (
    <main className="md:pb-20 pt-6 md:pt-10">
      <div className="flex justify-between items-center px-6 md:px-20 pb-6 md:pb-7 shadow-1xl">
        <div className="flex gap-x-1 items-center">
          <h1 className=" text-xl md:text-3xl text-cs-purple-650 font-bold">CecureStream</h1>
          <div className=" text-xs text-cs-grey-700 font-medium border-[0.5px] border-cs-grey-700 py-[2px] px-2 rounded-lg">Beta</div>
        </div>
        <div className={`${loggedIn ? 'md:flex hidden' : 'hidden'} justify-between gap-x-3 items-center `}>
          <div className=" text-cs-grey-800 font-normal hidden md:block" ref={currentTimeRef}></div>
          <div className=" w-[1px] bg-cs-grey-200 h-[24px] hidden md:block"></div>
          <div className=" text-cs-grey-800 font-normal hidden md:block" ref={currentDateRef}></div>
          <Image src={avatar} alt="logo" className="rounded-full w-8 h-8 md:w-10 md:h-10 object-cover" />
        </div>
        <Image src={avatar} alt="logo" className={`rounded-full w-8 h-8 md:w-10 md:h-10 object-cover ${loggedIn ? "block md:hidden" : "hidden"}`} />
        <div className={`  gap-x-4 ${loggedIn ? 'hidden' : 'hidden md:flex'}`}>
          <button className=" text-cs-grey-50 bg-cs-purple-650 rounded-md py-3 px-10 font-bold max-h-[52px] h-full">Sign up</button>
          <button className=" text-cs-purple-650 font-bold py-3 px-10 border border-cs-purple-650 rounded hover:text-white hover:bg-cs-purple-650 max-h-[52px]">Sign in</button>
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
            <button className=" text-cs-grey-50 bg-cs-purple-650 rounded-md py-3 px-10 font-bold max-h-[52px] h-full w-full md:w-fit">Sign up</button>
            <button className=" text-cs-purple-650 font-bold py-3 px-10 border border-cs-purple-650 rounded hover:text-white hover:bg-cs-purple-650 max-h-[52px] w-full md:w-fit">Sign in</button>
          </div>
          <div className="flex flex-col md:flex-row gap-y-6 justify-between mt-4 md:mt-8 relative">
            <div className={` ${loggedIn ? 'flex' : 'hidden'} relative group`}>
              <button className="w-full h-12 md:w-[200px] text-cs-grey-50 bg-cs-purple-650 rounded-md py-2 px-4 font-bold max-h-[52px]">Create New Session</button>
              <div className="w-full absolute hidden group-hover:block top-14 shadow-2xl rounded-lg z-10 bg-white">
                <div className=" flex py-3 md:py-4 px-3 gap-x-2 hover:bg-cs-grey-55 rounded-t-lg">
                  <Add size={20} />
                  <button className=" text-cs-grey-dark" onClick={() => navigate.push("/preview")}>Instant meeting</button>
                </div>
                <div className=" flex py-4 px-3 gap-x-2 hover:bg-cs-grey-55 rounded-b-lg">
                  <Calendar size={20} />
                  <button className=" text-cs-grey-dark" onClick={() => handleShowModal("schedule")}>Schedule for later</button>
                </div>
              </div>
            </div>
            <div>
              <p className={` ${loggedIn ? 'hidden' : 'block'} text-cs-grey-dark font-normal py-3 text-[13px]`}>Want to join a meeting? Paste the meeting link below.</p>
              <div className={`flex border ${errorColour ? "border-cs-error-600" : " border-cs-grey-55"}  rounded-md py-1 pr-1 pl-3 border-solid h-12`}>
                <input type="text" name="link" id="" placeholder="Meeting link E.g xap-ikl-eop" className="flex-1 placeholder:text-cs-grey-200 md:min-w-60 outline-none self-center" onChange={(e) => handleInput(e)} />
                <button className=" text-cs-purple-650 font-bold py-0 md:py-1 px-6 border border-cs-purple-650 rounded hover:text-white hover:bg-cs-purple-650" onClick={() => handleShowModal("joinMeeting")}>Join</button>
              </div>
              <p className="text-sm text-cs-error-600">{errMessage.link}</p>
            </div>
          </div>
        </div>
        <div className="basis-full my-4 md:my-0">
          <Image src={heroImage} alt="hero" height={490} width={600} className="md:w-[600px] md:h-[490px]" />
        </div>
      </div>
      {showModal === "schedule" && <ScheduleMeeting onClose={handleCloseModal} />}
      {showModal === "joinMeeting" && <JoinMeeting onClose={handleCloseModal} />}
    </main>
  );
}
