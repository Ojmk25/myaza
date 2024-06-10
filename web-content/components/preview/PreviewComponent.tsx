'use client'
import { ConsoleLogger, DefaultDeviceController } from "amazon-chime-sdk-js"
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useToggleLocalMute } from "amazon-chime-sdk-component-library-react";
import { useRouter } from "next/navigation";
import { AppCtx } from "@/context/StoreContext";
import { ToggleVideoButton } from "@/components/meetingComponents/meetingControlButtons/ToggleVideo";
import { ToggleAudio } from "@/components/meetingComponents/meetingControlButtons/ToggleAudio";

import { getNameAbbreviation, IsAuthenticated, logOutUser } from "@/services/authService";
import GuestNameInput from "./GuestNameInput";
import Header from "../Header";


export default function PreviewComponent() {
  const ctx = useContext(AppCtx);
  const [loggedIn, setLoggedIn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null)
  const navigate = useRouter()
  const { muted, toggleMute } = useToggleLocalMute();
  let videoStatus = true;


  const audioLevelDisplayRef = useRef(null);

  const logger = new ConsoleLogger("MyLogger");

  useEffect(() => {
    setLoggedIn(IsAuthenticated())
    getNameAbbreviation()
  }, [])

  //Initialize DefaultDeviceController
  // const deviceController = new DefaultDeviceController(logger, { enableWebAudio: true });
  const deviceController = new DefaultDeviceController(logger);



  useLayoutEffect(() => {
    return () => {
      const videoElement = videoRef.current as HTMLVideoElement;
      if (videoElement) {
        deviceController.stopVideoPreviewForVideoInput(videoElement);
        deviceController.stopVideoInput()
        deviceController.stopAudioInput();
      }
    };
  }, []);

  useEffect(() => {
    const init = async () => {

      //List the device list
      const deviceList = await deviceController.listVideoInputDevices();
      const audioList = await deviceController.listAudioInputDevices();
      // Choose video/audio device
      await deviceController.startVideoInput(deviceList[0].deviceId)
      await deviceController.startAudioInput(audioList[0].deviceId)

      // //Grab the video element
      const videoElement = videoRef.current as HTMLVideoElement;

      //Start video/audio preview
      deviceController.startVideoPreviewForVideoInput(videoElement);
      deviceController.chooseAudioOutput(audioList[0].deviceId);
    }

    init()
    return () => {
      const videoElement = videoRef.current as HTMLVideoElement;
      if (videoElement) {
        deviceController.stopVideoInput()
        deviceController.stopAudioInput();
        deviceController.stopVideoPreviewForVideoInput(videoElement);
      }

      // window.location.reload();
    }
  }, [deviceController])




  async function toggleVideo() {
    const videoElement = videoRef.current as HTMLVideoElement;
    if (deviceController['activeDevices'].video && deviceController['activeDevices'].video.groupId.length > 1) {
      await deviceController.stopVideoInput()
      videoStatus = false
    } else {
      const videoList = await deviceController.listVideoInputDevices();
      await deviceController.startVideoInput(videoList[0].deviceId)
      deviceController.startVideoPreviewForVideoInput(videoElement);
      videoStatus = true
    }

  }
  return (
    <>{loggedIn !== null &&
      <main className="pb-7 md:pb-10 pt-7 md:pt-10">

        <Header />

        <div className="md:grid px-4 md:px-20 gap-x-16 items-center grid-cols-2 mt-2 bg-cs-bg py-4">
          <div className="basis-full col-start-2 col-span-3">
            <h3 className=" text-2xl font-medium text-cs-grey-dark mb-1 text-center py-2 md:hidden">Join Meeting</h3>
            {/* <Image src={avatar} alt="hero" height={490} width={600} className="w-[600px] h-[490px]" /> */}
            <div className=" relative">
              <div className=" relative bg-cs-black-200 rounded-[4px] md:rounded-[31px]">
                <video id="video-preview" autoPlay className="rounded-[4px] md:rounded-[31px] w-full object-cover h-[302px] sm:h-[342px] md:h-[200px] lg:h-[261px] xl:h-[378px] " ref={videoRef}></video>
                <div className="" ref={audioLevelDisplayRef}>
                </div>
              </div>

              {/* Video controls */}
              <div className=" flex justify-center my-6">
                <div className=" flex gap-x-6">
                  <ToggleAudio audioLevelDisplayRef={audioLevelDisplayRef} />
                  <ToggleVideoButton toggleVideo={toggleVideo} />
                  <div className=" bg-cs-red text-center rounded-lg py-3 md:py-4 px-5 md:px-6 text-white font-bold text-sm h-fit cursor-pointer" onClick={() => navigate.push('/')}>
                    <span>End</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <GuestNameInput />
        </div>
      </main>
    }

    </>)
}

{/* <video id="video-preview" className="w-[400px] h-[400px]"></video> */ }