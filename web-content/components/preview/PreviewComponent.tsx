"use client";
import {
  ConsoleLogger,
  DefaultDeviceController,
  MediaStreamBrokerObserver,
} from "amazon-chime-sdk-js";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useMeetingManager } from "amazon-chime-sdk-component-library-react";
import { useRouter } from "next/navigation";
import { ToggleVideoButton } from "@/components/meetingComponents/meetingControlButtons/ToggleVideo";
import { ToggleAudio } from "@/components/meetingComponents/meetingControlButtons/ToggleAudio";

import { getNameAbbreviation, IsAuthenticated } from "@/services/authService";
import GuestNameInput from "./GuestNameInput";
import Header from "../Header";
import LoadingScreen from "../modals/LoadingScreen";
import { FailureSlideIn } from "../FailureSlideIn";

export default function PreviewComponent() {
  const [loggedIn, setLoggedIn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useRouter();
  const videoCameraRef = useRef(true);
  const audioLevelDisplayRef = useRef(null);
  const meetingManager = useMeetingManager();

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
        // deviceController.stopVideoPreviewForVideoInput(videoElement);
        // deviceController.stopVideoInput();
        // deviceController.stopAudioInput();
        // meetingManager.meetingSession?.audioVideo.stop()
        // meetingManager.meetingSession?.audioVideo.chooseVideoInputDevice(null);

        // deviceController.stopVideoPreviewForVideoInput(videoElement);
        // deviceController.stopVideoInput();
        // deviceController.destroy();
        // meetingManager.meetingSession?.audioVideo.stopVideoInput();
        // meetingManager.meetingSession?.audioVideo.stopLocalVideoTile();
        // meetingManager.meetingSession?.audioVideo.stopVideoPreviewForVideoInput(
        //   videoElement
        // );

        // meetingManager.meetingSession?.audioVideo.stop();
        // deviceController.destroy();
        unMountCamera();
      }
    };
  }, []);

  useEffect(() => {
    // const init = async () => {
    //   //List the device list
    //   const deviceList = await deviceController.listVideoInputDevices();
    //   const audioList = await deviceController.listAudioInputDevices();

    //   if (!deviceList[0].deviceId || !audioList[0].deviceId) {
    //     setLoading(false);
    //     setErrMessage("We could not detect your microphone or camera!");
    //     setTimeout(() => {
    //       setErrMessage("");
    //     }, 2000);
    //   }
    //   // Choose video/audio device
    //   await deviceController.startVideoInput(deviceList[0].deviceId);
    //   await deviceController.startAudioInput(audioList[0].deviceId);

    //   // //Grab the video element
    //   // const videoElement = videoRef.current as HTMLVideoElement;
    //   const videoElement = document.querySelector(
    //     "#video-preview"
    //   ) as HTMLVideoElement;

    //   //Start video/audio preview
    //   if (videoElement) {
    //     deviceController?.startVideoPreviewForVideoInput(videoElement);
    //     setLoading(false);
    //   }
    //   deviceController.chooseAudioOutput(audioList[0].deviceId);
    // };

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
      };
      unMount();
      deviceController.stopVideoInput();
      deviceController.stopAudioInput();
      // window.location.reload();
    };
  }, [deviceController]);

  useEffect(() => {
    const init = async () => {
      //List the device list
      const deviceList = await deviceController.listVideoInputDevices();
      const audioList = await deviceController.listAudioInputDevices();

      // if (!deviceList[0].deviceId || !audioList[0].deviceId) {
      //   setLoading(false);
      //   setErrMessage("We could not detect your microphone or camera!");
      //   setTimeout(() => {
      //     setErrMessage("");
      //   }, 2000);
      // }

      // Choose video/audio device
      await deviceController.startVideoInput(deviceList[0].deviceId);
      await deviceController.startAudioInput(audioList[0].deviceId);
      // hasRunRef.current = true;

      // //Grab the video element
      // const videoElement = videoRef.current as HTMLVideoElement;
      const videoElement = document.querySelector(
        "#video-preview"
      ) as HTMLVideoElement;

      //Start video/audio preview
      if (videoElement) {
        deviceController?.startVideoPreviewForVideoInput(videoElement);
        // setLoading(false);
      }
      deviceController.chooseAudioOutput(audioList[0].deviceId);
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

  async function toggleVideo() {
    // const videoElement = videoRef.current as HTMLVideoElement;
    const videoElement = document.querySelector(
      "#video-preview"
    ) as HTMLVideoElement;
    if (
      (await deviceController["activeDevices"].video) &&
      (await deviceController["activeDevices"].video.groupId.length) > 1
    ) {
      deviceController.stopVideoPreviewForVideoInput(videoElement);
      await deviceController.stopVideoInput();
      videoCameraRef.current = false;
    } else {
      const videoList = await deviceController.listVideoInputDevices();
      await deviceController.startVideoInput(videoList[0].deviceId);
      deviceController.startVideoPreviewForVideoInput(videoElement);
      videoCameraRef.current = true;
    }
  }

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
                  className=" relative bg-cs-black-200 rounded-[4px] md:rounded-[31px]"
                  id="preview-container"
                >
                  <video
                    id="video-preview"
                    autoPlay
                    className="rounded-[4px] md:rounded-[31px] w-full object-cover h-[302px] sm:h-[342px] md:h-[200px] lg:h-[261px] xl:h-[358px] "
                    ref={videoRef}
                  ></video>
                  <div className="" ref={audioLevelDisplayRef}></div>
                </div>

                {/* Video controls */}
                <div className=" flex justify-center my-6">
                  <div className=" flex gap-x-6">
                    <ToggleAudio audioLevelDisplayRef={audioLevelDisplayRef} />
                    <ToggleVideoButton deviceController={deviceController} />
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
            <GuestNameInput />
          </div>
        </main>
      )}
    </>
  );
}

{
  /* <video id="video-preview" className="w-[400px] h-[400px]"></video> */
}
