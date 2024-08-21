"use client";

import { FailureSlideIn } from "@/components/FailureSlideIn";
import LoadingScreen from "@/components/modals/LoadingScreen";
import { useSessionStorage } from "@/hooks/useStorage";
import { DefaultDeviceController } from "amazon-chime-sdk-js";
import { Video, VideoSlash } from "iconsax-react";
import { useEffect, useRef, useState } from "react";

export const ToggleVideoButton = ({
  deviceController,
}: {
  deviceController: DefaultDeviceController;
}) => {
  const [video, setVideo] = useState(false);
  const hasRunRef = useRef(false);
  const toggleVideoRef = useRef<HTMLDivElement>(null);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [_, setVideoStatus] = useSessionStorage("videoStatus", "yes");

  useEffect(() => {
    if (video) {
      setVideoStatus("yes");
    } else {
      setVideoStatus("no");
    }
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
        await deviceController.stopVideoInput();
        setVideo(false);
      } else {
        await deviceController.startVideoInput(videoList[0].deviceId);
        deviceController.startVideoPreviewForVideoInput(videoElement);
        setVideo(true);
      }
    } catch (error) {
      console.error("Error in toggleVideo:", error);
    }
  }
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
