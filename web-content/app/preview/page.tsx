'use client'
// import Image from "next/image";
// import { ConsoleLogger, DefaultDeviceController, DefaultAudioVideoFacade, DefaultBrowserBehavior, DefaultEventController } from "amazon-chime-sdk-js"
// import { useEffect, useRef, useState } from "react";
// import DateTimeDisplay from "../utils/getDate";
// import avatar from "@/public/assets/images/avatar.png"
// import { Add, Calendar, MicrophoneSlash1, MoreCircle, VideoSlash } from "iconsax-react";
// import { AuthInput } from "../components/auth/AuthInput";
// import Link from "next/link";
// import { SubmitButton } from "../components/auth/SubmitButton";
// import { ValidateEmail, ValidatePassword } from "../utils/Validators";
// import { DeviceLabels, useLocalVideo, useMeetingManager } from "amazon-chime-sdk-component-library-react";
// import { Meeting } from "amazon-chime-sdk-component-library-react";


export default function Preview() {
  // const [loggedIn, setLoggedIn] = useState(true);
  // const currentTimeRef = useRef<HTMLDivElement>(null);
  // const currentDateRef = useRef<HTMLDivElement>(null);
  // const [errorColour, setErrorColour] = useState(false);
  // const videRef = useRef<HTMLVideoElement>(null)


  // // States to track video and audio status
  // const [videoEnabled, setVideoEnabled] = useState<boolean>();
  // const [enableVideo, setEnableVideo] = useState<string>('');
  // const [audioEnabled, setAudioEnabled] = useState<boolean>();

  // const [authData, setAuthData] = useState({
  //   email: '',
  //   password: ''
  // });
  // const [errMessage, setErrMessage] = useState({
  //   email: '',
  //   password: '',
  //   link: '',
  // })

  // const logger = new ConsoleLogger("MyLogger");

  // //Initialize DefaultDeviceController
  // const deviceController = new DefaultDeviceController(logger, { enableWebAudio: true });
  // useEffect(() => {
  //   const init = async () => {

  //     //List the device list
  //     const deviceList = await deviceController.listVideoInputDevices();
  //     const audioList = await deviceController.listAudioInputDevices();
  //     //Choose video/audio device
  //     await deviceController.startVideoInput(deviceList[0].deviceId)
  //     await deviceController.startAudioInput(audioList[0].deviceId)

  //     // //Grab the video element
  //     const videoElement = videRef.current as HTMLVideoElement;

  //     // //Start video/audio preview
  //     deviceController.startVideoPreviewForVideoInput(videoElement);
  //     deviceController.chooseAudioOutput(audioList[0].deviceId);

  //   }


  //   init()
  // }, [deviceController])

  // useEffect(() => {
  //   const updateCurrentTime = () => {
  //     const displayDate = DateTimeDisplay;
  //     const { hours, minutes, ampm, day, dayOfWeek, month } = displayDate();
  //     if (currentTimeRef.current !== null && currentDateRef.current !== null) {
  //       currentTimeRef.current.textContent = `${hours < 10 ? ('0' + hours) : hours}:${minutes < 10 ? ('0' + minutes) : minutes} ${ampm}`;
  //       currentDateRef.current.textContent = `${dayOfWeek} ${month}. ${day}`;
  //     }

  //   };

  //   // Update the time initially
  //   updateCurrentTime()

  //   // Update the time every minute 
  //   const intervalId = setInterval(updateCurrentTime, 60000);

  //   // Clear the interval when the component unmounts
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  // const handleInput = (input: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = input.target;
  //   const addColour = (elem: React.ChangeEvent<HTMLInputElement>) => {
  //     elem.target.classList.add('border-cil-error-red');
  //     elem.target.classList.add('placeholder:text-cil-error-red')
  //     elem.target.classList.remove('bg-cil-slate-200')
  //     setErrMessage(prevState => ({
  //       ...prevState,
  //       [name]: `Invalid ${name}`
  //     }));
  //   }
  //   const removeColour = (elem: React.ChangeEvent<HTMLInputElement>) => {
  //     elem.target.classList.remove('border-cil-error-red');
  //     elem.target.classList.remove('placeholder:text-cil-error-red')
  //     elem.target.classList.add('bg-cil-slate-200')
  //     setErrMessage(prevState => ({
  //       ...prevState,
  //       [name]: ''
  //     }));
  //   }
  //   if (name === "email") {
  //     if ((!ValidateEmail(value))) {
  //       addColour(input)
  //     } else {
  //       removeColour(input)
  //     }
  //   } else if (name === "password") {
  //     if ((!ValidatePassword(value))) {
  //       addColour(input)
  //     } else {
  //       removeColour(input)
  //     }
  //   } else if (name === "link") {
  //     if ((!ValidateEmail(value))) {
  //       setErrorColour(true)
  //       setErrMessage(prevState => ({
  //         ...prevState,
  //         link: "Invalid meeting link",
  //       }))

  //     } else {
  //       setErrorColour(false)
  //       setErrMessage(prevState => ({
  //         ...prevState,
  //         link: "",
  //       }))
  //     }
  //   }

  //   if (input.target.value.length === 0) {
  //     setErrMessage(prevState => ({
  //       ...prevState,
  //       [name]: `Enter your ${name}`
  //     }));
  //   } else {
  //     setAuthData(prevState => ({
  //       ...prevState,
  //       [name]: value
  //     }));
  //   }
  // }


  // // // Function to toggle audio stream on and off
  // // function toggleAudio() {
  // //   const audioTracks = videoElement.srcObject.getAudioTracks()[0];
  // //   audioTracks.enabled = !audioTracks.enabled;
  // // }

  // //   function toggleAudio() {
  // //     const muted = deviceController.realtimeMuteLocalAudio();
  // //     console.log('Audio toggled:', !muted ? 'on' : 'off');
  // // }

  // async function toggleVideo() {
  //   const videoElement = videRef.current as HTMLVideoElement;
  //   if (deviceController['activeDevices'].video && deviceController['activeDevices'].video.groupId.length > 1) {
  //     await deviceController.stopVideoInput()

  //   } else {
  //     const videoList = await deviceController.listVideoInputDevices();
  //     await deviceController.startVideoInput(videoList[0].deviceId)
  //     deviceController.startVideoPreviewForVideoInput(videoElement);
  //   }

  // }

  // // Function to toggle audio
  // const toggleAudio = async () => {
  //   if (audioEnabled) {
  //     await deviceController.stopAudioInput()
  //       .then(() => {
  //         console.log('Audio input stopped successfully');
  //         setAudioEnabled(false);
  //       })
  //       .catch(error => {
  //         console.error('Error stopping audio input:', error);
  //       });
  //   } else {
  //     const audioList = await deviceController.listAudioInputDevices();
  //     deviceController.startAudioInput(audioList[0].deviceId)
  //       .then(() => {
  //         console.log('Audio input started successfully');
  //         setAudioEnabled(true);
  //       })
  //       .catch(error => {
  //         console.error('Error starting audio input:', error);
  //       });
  //   }
  // };


  return (
    <>
      <main className="pb-10 pt-10">
        Preview
      </main>

    </>
  )
}

