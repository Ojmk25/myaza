'use client'
import Image from "next/image";
import { ConsoleLogger, DefaultDeviceController, DefaultAudioVideoFacade, DefaultBrowserBehavior, DefaultEventController } from "amazon-chime-sdk-js"
import { useEffect, useRef, useState } from "react";
import DateTimeDisplay from "../utils/getDate";
import avatar from "@/public/assets/images/avatar.png"
import { Add, Calendar, MicrophoneSlash1, MoreCircle, VideoSlash } from "iconsax-react";
import { AuthInput } from "../components/auth/AuthInput";
import Link from "next/link";
import { SubmitButton } from "../components/auth/SubmitButton";
import { ValidateEmail, ValidatePassword } from "../utils/Validators";
import { DeviceLabels, useLocalVideo, useMeetingManager } from "amazon-chime-sdk-component-library-react";
import { useRouter } from "next/navigation";
// import { Meeting } from "amazon-chime-sdk-component-library-react";


export default function Preview() {
  const [loggedIn, setLoggedIn] = useState(true);
  const currentTimeRef = useRef<HTMLDivElement>(null);
  const currentDateRef = useRef<HTMLDivElement>(null);
  const [errorColour, setErrorColour] = useState(false);
  const videRef = useRef<HTMLVideoElement>(null)
  const navigate = useRouter()


  // States to track video and audio status
  const [videoEnabled, setVideoEnabled] = useState<boolean>();
  const [enableVideo, setEnableVideo] = useState<string>('');
  const [audioEnabled, setAudioEnabled] = useState<boolean>();

  const [authData, setAuthData] = useState({
    email: '',
    password: ''
  });
  const [errMessage, setErrMessage] = useState({
    email: '',
    password: '',
    link: '',
  })

  const logger = new ConsoleLogger("MyLogger");

  //Initialize DefaultDeviceController
  const deviceController = new DefaultDeviceController(logger, { enableWebAudio: true });
  useEffect(() => {
    const init = async () => {

      //List the device list
      const deviceList = await deviceController.listVideoInputDevices();
      const audioList = await deviceController.listAudioInputDevices();
      //Choose video/audio device
      await deviceController.startVideoInput(deviceList[0].deviceId)
      await deviceController.startAudioInput(audioList[0].deviceId)

      // //Grab the video element
      const videoElement = videRef.current as HTMLVideoElement;

      // //Start video/audio preview
      deviceController.startVideoPreviewForVideoInput(videoElement);
      deviceController.chooseAudioOutput(audioList[0].deviceId);

    }


    init()
  }, [])

  useEffect(() => {
    const updateCurrentTime = () => {
      const displayDate = DateTimeDisplay;
      const { hours, minutes, ampm, day, dayOfWeek, month } = displayDate();
      if (currentTimeRef.current !== null && currentDateRef.current !== null) {
        currentTimeRef.current.textContent = `${hours < 10 ? ('0' + hours) : hours}:${minutes < 10 ? ('0' + minutes) : minutes} ${ampm}`;
        currentDateRef.current.textContent = `${dayOfWeek} ${month}. ${day}`;
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


  // // Function to toggle audio stream on and off
  // function toggleAudio() {
  //   const audioTracks = videoElement.srcObject.getAudioTracks()[0];
  //   audioTracks.enabled = !audioTracks.enabled;
  // }

  //   function toggleAudio() {
  //     const muted = deviceController.realtimeMuteLocalAudio();
  //     console.log('Audio toggled:', !muted ? 'on' : 'off');
  // }

  async function toggleVideo() {
    const videoElement = videRef.current as HTMLVideoElement;
    if (deviceController['activeDevices'].video && deviceController['activeDevices'].video.groupId.length > 1) {
      await deviceController.stopVideoInput()

    } else {
      const videoList = await deviceController.listVideoInputDevices();
      await deviceController.startVideoInput(videoList[0].deviceId)
      deviceController.startVideoPreviewForVideoInput(videoElement);
    }

  }

  // Function to toggle audio
  const toggleAudio = async () => {
    if (audioEnabled) {
      await deviceController.stopAudioInput()
        .then(() => {
          console.log('Audio input stopped successfully');
          setAudioEnabled(false);
        })
        .catch(error => {
          console.error('Error stopping audio input:', error);
        });
    } else {
      const audioList = await deviceController.listAudioInputDevices();
      deviceController.startAudioInput(audioList[0].deviceId)
        .then(() => {
          console.log('Audio input started successfully');
          setAudioEnabled(true);
        })
        .catch(error => {
          console.error('Error starting audio input:', error);
        });
    }
  };


  return (
    <>
      <main className="pb-10 pt-10">
        <div className="flex justify-between items-center px-20 pb-7 shadow-1xl">
          <div className="flex gap-x-1 items-center">
            <h1 className=" text-3xl text-cs-purple-650 font-bold">CecureStream</h1>
            <div className=" text-xs text-cs-grey-700 font-medium border-[0.5px] border-cs-grey-700 py-[2px] px-2 rounded-lg">Beta</div>
          </div>
          <div className={`${loggedIn ? 'flex' : 'hidden'} justify-between gap-x-3 items-center `}>
            <div className=" text-cs-grey-800 font-normal" ref={currentTimeRef}></div>
            <div className=" w-[1px] bg-cs-grey-200 h-[24px]"></div>
            <div className=" text-cs-grey-800 font-normal" ref={currentDateRef}></div>
            <Image src={avatar} alt="logo" className="rounded-full w-10 h-10 object-cover" />
          </div>
          <div className={`  gap-x-4 ${loggedIn ? 'hidden' : 'flex'}`}>
            <button className=" text-cs-grey-50 bg-cs-purple-650 rounded-md py-5 px-10 font-bold max-h-[52px] h-full">Sign up</button>
            <button className=" text-cs-purple-650 font-bold py-5 px-10 border border-cs-purple-650 rounded hover:text-white hover:bg-cs-purple-650 max-h-[52px]">Sign in</button>
          </div>
        </div>
        <div className="grid px-20 gap-x-16 items-center grid-cols-2 mt-2 bg-cs-bg py-4">
          <div className="basis-full">
            <h3 className=" text-2xl font-semibold text-cs-grey-dark mb-1">Join Meeting</h3>
            <form className=" max-w-[415px]">
              <div className={` ${loggedIn ? 'hidden' : 'block'}`}>
                <AuthInput label="First name" action={handleInput} errorMessage={errMessage.email} inputName="firstName" inputType="text" placeHolder="Henry" />
                <AuthInput label="Last name" action={handleInput} errorMessage={errMessage.password} inputName="lastName" inputType="text" placeHolder="Kalu" />
              </div>
              <div className={` ${loggedIn ? 'block' : 'hidden'} flex gap-x-4 items-center mt-[48px]`}>
                <Image src={avatar} alt="logo" className="rounded-full w-10 h-10 object-cover" />
                <p className=" text-cs-grey-dark font-medium">Signed in as Henry Olakunle</p>
              </div>
              {/* <SubmitButton text="Join meeting" action={videoEnabled ? stopVideo : startVideo} activate={true} /> */}
              <SubmitButton text="Join meeting" action={() => navigate.push("/meeting")} activate={true} />
              <p className={`${loggedIn ? 'hidden' : 'block'} text-center my-6 text-base font-semibold text-cs-grey-dark`}>Already have an account? <Link href={'/auth/login'} className=" text-cs-purple-650">Sign in</Link></p>
            </form>

          </div>
          <div className="basis-full">
            {/* <Image src={avatar} alt="hero" height={490} width={600} className="w-[600px] h-[490px]" /> */}
            <div className=" relative">
              <div className=" w-[508px] h-[289px] relative bg-cs-black-200 rounded-[31px]">
                <video id="video-preview" autoPlay className=" rounded-[31px] min-w-[508px] min-h-[289px] h-full w-full object-cover" ref={videRef}></video>
                <div className="p-[6px] bg-[#333333] rounded-full absolute top-[10px] right-[10px]"><MicrophoneSlash1 size="18" color="#FAFAFA" /></div>
              </div>

              <div className=" flex justify-center my-6">
                <div className=" flex gap-x-6">
                  <div className="text-center cursor-pointer">
                    {/* <div className={`p-3 ${changeBg ? "bg-cs-purple-650" : "bg-[#E1C6FF4D]"} rounded-md max-w-12 relative`}> */}
                    <div className={`p-3 bg-cs-purple-650 bg-[#E1C6FF4D] rounded-md max-w-12 relative`}>

                      {/* <MicrophoneSlash1 size="24" color={`${changeBg ? "#FAFAFA" : "#5E29B7"}`} className="mx-auto" /> */}
                      <MicrophoneSlash1 size="24" color={`#FAFAFA`} className="mx-auto" />
                      {/* <span className="absolute -top-[5px] -right-[10px]  w-fit rounded-full"><MoreCircle size="24" color={`${changeBg ? "#5E29B7" : "#5E29B7"}`} className="mx-auto rounded-full border bg-white " variant="Outline" /></span> */}
                      <span className="absolute -top-[5px] -right-[10px]  w-fit rounded-full"><MoreCircle size="24" color={`#5E29B7`} className="mx-auto rounded-full border bg-white " variant="Outline" /></span>
                    </div>
                    <h6 className=" text-cs-grey-100 font-medium text-xs">Unmute</h6>
                  </div>

                  <div className="text-center cursor-pointer">
                    <div className="p-3 bg-[#E1C6FF4D] rounded-md max-w-12 mx-auto" onClick={toggleVideo}>
                      <VideoSlash size="24" color="#5E29B7" className="mx-auto" />
                    </div>
                    <h6 className=" text-cs-grey-100 font-medium text-xs">Video</h6>
                  </div>

                  <div className=" bg-cs-red text-center rounded-lg py-4 px-6 text-white font-bold text-sm h-fit cursor-pointer">
                    <span>End</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      {/* <button onClick={toggleAudio}>Toggle audio</button> */}
      {/* <video id="video-preview" className="w-[400px] h-[400px]"></video> */}
    </>
  )
}

