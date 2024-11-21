"use client";

import { FailureSlideIn } from "@/components/FailureSlideIn";
import LoadingScreen from "@/components/modals/LoadingScreen";
import { useAppContext } from "@/context/StoreContext";
import { useSessionStorage } from "@/hooks/useStorage";
import {
  ConsoleLogger,
  DefaultDeviceController,
  DefaultVideoTransformDevice,
  VideoFxConfig,
  VideoFxProcessor,
} from "amazon-chime-sdk-js";
import { Video, VideoSlash } from "iconsax-react";
import { useEffect, useRef, useState } from "react";

export const ToggleVideoButton = ({
  deviceController,
  getVideoStatus,
}: {
  deviceController: DefaultDeviceController;
  getVideoStatus: (getVideoStatus: boolean) => void;
}) => {
  const [video, setVideo] = useState(false);
  const hasRunRef = useRef(false);
  const toggleVideoRef = useRef<HTMLDivElement>(null);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [_, setVideoStatus] = useSessionStorage("videoStatus", "yes");
  const [deviceOk, setDeviceOk] = useState<any>();
  const { appState, setAppState } = useAppContext();

  const [videoFx, setVideoFx] = useState<any>(null);
  const localStateConfig = localStorage.getItem("videoFxConfig");

  useEffect(() => {
    if (video) {
      setVideoStatus("yes");
    } else {
      setVideoStatus("no");
    }
    getVideoStatus(video);
  }, [video]);

  useEffect(() => {
    const init = async () => {
      if (toggleVideoRef.current) {
        toggleVideoRef.current.click();
        hasRunRef.current = true;
      }
    };
    setTimeout(() => {
      init();
      setLoading(false);
    }, 5000);
  }, []);

  // async function toggleVideo() {
  //   try {
  //     const videoList = await deviceController.listVideoInputDevices();
  //     const videoElement = document.querySelector(
  //       "#video-preview"
  //     ) as HTMLVideoElement;
  //     if (!videoElement) {
  //       console.error("Video element not found!");
  //       return;
  //     }

  //     if (
  //       (await deviceController["activeDevices"].video) &&
  //       (await deviceController["activeDevices"].video.groupId.length) > 1
  //     ) {
  //       deviceController.stopVideoPreviewForVideoInput(videoElement);
  //       await deviceController.stopVideoInput();
  //       setVideo(false);
  //     } else {
  //       await deviceController.startVideoInput(videoList[0].deviceId);
  //       deviceController.startVideoPreviewForVideoInput(videoElement);
  //       setVideo(true);
  //     }
  //   } catch (error) {
  //     console.error("Error in toggleVideo:", error);
  //   }
  // }

  async function toggleVideo() {
    try {
      const videoList = await deviceController.listVideoInputDevices();
      const videoElement = document.querySelector(
        "#video-preview"
      ) as HTMLVideoElement;
      if (!videoElement) {
        console.error("Video element not found!");
        return;
      }

      if (
        (await deviceController["activeDevices"].video) &&
        (await deviceController["activeDevices"].video.groupId.length) > 1
      ) {
        deviceController.stopVideoPreviewForVideoInput(videoElement);
        // deviceController.stopVideoPreviewForVideoInput(videoElementTwo);
        await deviceController.stopVideoInput();
        setVideo(false);
      } else {
        setDeviceOk(videoList[0].deviceId);
        await deviceController.startVideoInput(videoList[0].deviceId);
        deviceController.startVideoPreviewForVideoInput(videoElement);
        // deviceController.startVideoPreviewForVideoInput(videoElementTwo);
        // makeBlur();
        setVideo(true);
      }
    } catch (error) {
      console.error("Error in toggleVideo:", error);
    }
  }

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
  const localFxConfig = JSON.parse(localStateConfig as string);

  const makeBlur = async () => {
    const logger = new ConsoleLogger("MyLogger");

    let videoFxProcessor: VideoFxProcessor | undefined = undefined;

    if (!(await VideoFxProcessor.isSupported(logger))) {
      // logger is optional for isSupported
      console.log("This browser is not supported");
    } else {
      console.log("This browser is definetely supported");

      try {
        videoFxProcessor = await VideoFxProcessor.create(logger, videoFxConfig);
        // assuming that logger and videoInputDevice have already been set
        const videoTransformDevice = new DefaultVideoTransformDevice(
          logger,
          deviceOk,
          [videoFxProcessor]
        );
        const videoElement = document.querySelector(
          "#video-preview"
        ) as HTMLVideoElement;
        // const videoElementTwo = document.querySelector(
        //   "#video-preview-two"
        // ) as HTMLVideoElement;
        if (!videoElement) {
          console.error("Video element not found!");
          return;
        }

        // assuming that meetingSession has already been created
        await deviceController.startVideoInput(videoTransformDevice);
        await deviceController.startVideoPreviewForVideoInput(videoElement);
      } catch (error) {
        //@ts-ignore
        logger.warn(error.toString());
      }
    }
  };

  return (
    <>
      <div
        className="text-center cursor-pointer"
        onClick={toggleVideo}
        ref={toggleVideoRef}
      >
        <div
          className={`p-2 md:p-3 ${
            video ? "bg-cs-purple-650" : "bg-[#E1C6FF4D]"
          } rounded-md max-w-12 mx-auto`}
        >
          {video ? (
            <Video size="24" color="#FAFAFA" className="mx-auto" />
          ) : (
            <VideoSlash size="24" color="#5E29B7" className="mx-auto" />
          )}
        </div>
        <h6 className=" text-cs-grey-100 font-medium text-xs">Video</h6>
      </div>
      {
        <FailureSlideIn
          openModal
          response={errMessage !== ""}
          closeModal={() => {}}
          errResponse={errMessage}
        />
      }
      {loading && <LoadingScreen />}
    </>
  );
};
