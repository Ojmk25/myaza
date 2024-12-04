"use client";
import {
  ConsoleLogger,
  DefaultDeviceController,
  DefaultVideoTransformDevice,
  MediaStreamBrokerObserver,
  VideoFxConfig,
  VideoFxProcessor,
} from "amazon-chime-sdk-js";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  useMeetingManager,
  useRosterState,
} from "amazon-chime-sdk-component-library-react";
import { useRouter } from "next/navigation";
import { ToggleVideoButton } from "@/components/meetingComponents/meetingControlButtons/ToggleVideo";
import { ToggleAudio } from "@/components/meetingComponents/meetingControlButtons/ToggleAudio";

import {
  getClientInfo,
  getNameAbbreviation,
  IsAuthenticated,
} from "@/services/authService";
import GuestNameInput from "./GuestNameInput";
import Header from "../Header";
import LoadingScreen from "../modals/LoadingScreen";
import { FailureSlideIn } from "../FailureSlideIn";
import Image from "next/image";
import guestAvatar from "@/public/assets/images/avatar_setup.png";
import { ToggleVideoBgButton } from "../meetingComponents/meetingControlButtons/ToggleVideoBg";
import { getRemoteInitials } from "@/utils/meetingFunctions";

export default function PreviewComponent() {
  const [loggedIn, setLoggedIn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useRouter();
  const audioLevelDisplayRef = useRef<HTMLDivElement | null>(null);
  const recordingConsentTextRef = useRef<HTMLDivElement | null>(null);
  const meetingManager = useMeetingManager();
  const profileRef = useRef<HTMLDivElement | null>(null);
  const { picture, first_name, surname } = getClientInfo();
  const { roster } = useRosterState();

  const logger = new ConsoleLogger("MyLogger");

  useEffect(() => {
    setLoggedIn(IsAuthenticated());
    getNameAbbreviation();
  }, []);

  //Initialize DefaultDeviceController
  const deviceController = new DefaultDeviceController(logger, {
    enableWebAudio: false,
  });
  // const deviceController = new DefaultDeviceController(logger);

  useLayoutEffect(() => {
    return () => {
      const videoElement = videoRef.current as HTMLVideoElement;
      const unMountCamera = async () => {
        deviceController.stopVideoPreviewForVideoInput(videoElement);
        await deviceController.stopVideoInput();
        await deviceController.stopAudioInput();
      };
      if (videoElement) {
        unMountCamera();
      }
    };
  }, []);

  const videoFxConfig: VideoFxConfig = {
    backgroundBlur: {
      isEnabled: true,
      strength: "medium",
    },
    backgroundReplacement: {
      isEnabled: false,
      backgroundImageURL: "space.jpg",
      defaultColor: undefined,
    },
  };

  // useEffect(() => {
  //   return () => {
  //     // const videoElement = videoRef.current as HTMLVideoElement;
  //     const videoElement = document.querySelector(
  //       "#video-preview"
  //     ) as HTMLVideoElement;
  //     if (videoElement) {
  //       deviceController.stopVideoInput();
  //       deviceController.stopAudioInput();
  //       deviceController.stopVideoPreviewForVideoInput(videoElement);
  //       // meetingManager.meetingSession?.audioVideo.chooseVideoInputDevice(null);
  //       meetingManager.meetingSession?.audioVideo.stopVideoInput();
  //       meetingManager.meetingSession?.audioVideo.stopLocalVideoTile();
  //       meetingManager.meetingSession?.audioVideo.stopVideoPreviewForVideoInput(
  //         videoElement
  //       );
  //       meetingManager.meetingSession?.audioVideo.stop();
  //     }
  //     const unMount = async () => {
  //       if (!videoElement) return;
  //       deviceController.stopVideoPreviewForVideoInput(videoElement);
  //       await deviceController.stopVideoInput();
  //       deviceController.stopAudioInput();
  //     };
  //     unMount();
  //     deviceController.stopVideoInput();
  //     deviceController.stopAudioInput();
  //   };
  // }, [deviceController]);

  useEffect(() => {
    const init = async () => {
      // //List the device list
      // const deviceList = await deviceController.listVideoInputDevices();
      // const audioList = await deviceController.listAudioInputDevices();
      // // Choose video/audio device
      // await deviceController.startVideoInput(deviceList[0].deviceId);
      // await deviceController.startAudioInput(audioList[0].deviceId);
      // // hasRunRef.current = true;
      // // //Grab the video element
      // // const videoElement = videoRef.current as HTMLVideoElement;
      // const videoElement = document.querySelector(
      //   "#video-preview"
      // ) as HTMLVideoElement;
      // //Start video/audio preview
      // if (videoElement) {
      //   deviceController?.startVideoPreviewForVideoInput(videoElement);
      //   // setLoading(false);
      // }
      // deviceController.chooseAudioOutput(audioList[0].deviceId);
    };

    // init();
    return () => {
      // const videoElement = videoRef.current as HTMLVideoElement;
      const videoElement = document.querySelector(
        "#video-preview"
      ) as HTMLVideoElement;
      if (videoElement) {
        deviceController.stopVideoInput();
        deviceController.stopAudioInput();
        deviceController.stopVideoPreviewForVideoInput(videoElement);
        // meetingManager.meetingSession?.audioVideo.chooseVideoInputDevice(null);
        meetingManager.meetingSession?.audioVideo.stopVideoInput();
        meetingManager.meetingSession?.audioVideo.stopLocalVideoTile();
        meetingManager.meetingSession?.audioVideo.stopVideoPreviewForVideoInput(
          videoElement
        );
        meetingManager.meetingSession?.audioVideo.stop();
      }
      const unMount = async () => {
        if (!videoElement) return;
        deviceController.stopVideoPreviewForVideoInput(videoElement);
        await deviceController.stopVideoInput();
        deviceController.stopAudioInput();
        deviceController.destroy();
      };
      unMount();
      deviceController.stopVideoInput();
      deviceController.stopAudioInput();
      // window.location.reload();
    };
  }, [deviceController]);

  const getVideoStatus = (videoStatus: boolean) => {
    const targetElement = profileRef.current;

    if (!targetElement) return;
    if (videoStatus) {
      targetElement.style.display = "none";
    } else {
      targetElement.style.display = "block";
    }
  };

  return (
    <>
      {loggedIn !== null && (
        // <main className="pb-7 md:pb-10 pt-7 md:pt-10">
        <main className=" pt-6 w-full flex items-center flex-col ">
          <Header />
          <div className="md:grid px-6 gap-x-16 items-center grid-cols-2 mt-2 bg-cs-bg py-4 max-auto w-full max-w-[1392px]">
            <div className="basis-full col-start-2 col-span-3">
              <h3 className=" text-2xl font-medium text-cs-grey-dark mb-1 text-center py-2 md:hidden">
                Join Meeting
              </h3>
              {/* <Image src={avatar} alt="hero" height={490} width={600} className="w-[600px] h-[490px]" /> */}
              <div className=" relative">
                <div
                  className=" relative bg-cs-black-200 rounded-[4px] md:rounded-[31px] overflow-hidden"
                  id="preview-container"
                >
                  <video
                    id="video-preview"
                    autoPlay
                    className="rounded-[4px] md:rounded-[31px] w-full object-cover h-[302px] sm:h-[342px] md:h-[200px] lg:h-[261px] xl:h-[358px] "
                    ref={videoRef}
                  ></video>
                  <div
                    className=" absolute inset-0 bg-cs-black-200"
                    ref={profileRef}
                  >
                    <div className=" relative flex items-center justify-center h-full ">
                      {loggedIn ? (
                        <>
                          {picture && picture !== "" ? (
                            <Image
                              src={picture as string}
                              alt="avatar"
                              className=" w-[150px] rounded-full"
                              width={100}
                              height={100}
                            />
                          ) : (
                            <div className=" bg-cs-grey-800 rounded-full flex justify-center items-center text-cs-grey-55 font-semibold m-auto uppercase w-[150px] h-[150px]">
                              <h4 className=" text-[50px] leading-[60px]">
                                {getRemoteInitials(`${first_name} ${surname}`)}
                              </h4>
                            </div>
                          )}
                        </>
                      ) : (
                        <Image
                          src={guestAvatar}
                          alt="avatar"
                          className=" w-[150px] rounded-full"
                          width={100}
                          height={100}
                        />
                      )}
                    </div>
                  </div>
                  {/* <ToggleVideoBgButton /> */}
                  <div className="" ref={audioLevelDisplayRef}></div>
                </div>
                <div ref={recordingConsentTextRef}></div>

                {/* Video controls */}
                <div className=" flex justify-center my-6">
                  <div className=" flex gap-x-6">
                    <ToggleAudio audioLevelDisplayRef={audioLevelDisplayRef} />
                    <ToggleVideoButton
                      deviceController={deviceController}
                      getVideoStatus={getVideoStatus}
                    />
                    <div
                      className=" bg-cs-red text-center rounded-lg py-3 md:py-4 px-5 md:px-6 text-white font-bold text-sm h-fit cursor-pointer"
                      onClick={() => navigate.push("/")}
                    >
                      <span>End</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <GuestNameInput recordingConsentTextRef={recordingConsentTextRef} />
          </div>
        </main>
      )}
    </>
  );
}
