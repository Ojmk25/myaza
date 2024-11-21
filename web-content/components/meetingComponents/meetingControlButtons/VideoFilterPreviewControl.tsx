import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import closeIcon from "@/public/assets/images/closeIcon.svg";
import { useAppContext } from "@/context/StoreContext";
import {
  getClientInfo,
  getNameAbbreviation,
  updateUserFnc,
  uploadImageFile,
  uploadMediaFnc,
} from "@/services/authService";
import {
  activateButton,
  extractAfterLastSlashOrFull,
  ValidateText,
} from "@/utils/Validators";

import {
  ConsoleLogger,
  DefaultDeviceController,
  DefaultVideoTransformDevice,
  VideoFxConfig,
  VideoFxProcessor,
} from "amazon-chime-sdk-js";
import cancelFilter from "@/public/assets/images/cancelFilter.svg";
import blurFilter from "@/public/assets/images/blurFilter.svg";
import { GalleryAdd } from "iconsax-react";

export interface UploadMediaPayload {
  media_type: File & { type: "image/jpeg" | "image/png" | "image/jpg" };
}

const VideoFilterPreviewControl = () => {
  const [loading, setLoading] = useState(false);
  const { first_name, surname, email, picture } = getClientInfo();
  const logger = new ConsoleLogger("MyLogger");
  const { setAppState } = useAppContext();
  const [deviceOk, setDeviceOk] = useState<any>();
  const [localVideoConfig, setLocalVideoConfig] = useState({
    backgroundBlurEnabled: false,
    replacementImageEnabled: false,
    imageUrl: "",
  });

  const [formData, setFormData] = useState({
    "First name": first_name,
    "Last name": surname,
  });
  const [errMessage, setErrMessage] = useState({
    "First name": "",
    "Last name": "",
  });
  const [validateSuccess, setValidateSuccess] = useState({
    "First name": false,
    "Last name": false,
  });
  const [openModal, setOpenModal] = useState(false);
  const [successRes, setSuccessRes] = useState<any>();

  const [newFile, setNewFile] = useState<File | null>();
  const { appState } = useAppContext();

  //Initialize DefaultDeviceController
  const deviceController = new DefaultDeviceController(logger, {
    enableWebAudio: false,
  });

  let videoFxProcessor: VideoFxProcessor | undefined = undefined;
  const makeBlur = async (
    backgroundBlurEnabled: boolean,
    replacementImageEnabled: boolean,
    imageUrl: string
  ) => {
    const videoFxConfig: VideoFxConfig = {
      backgroundBlur: {
        isEnabled: backgroundBlurEnabled,
        strength: "medium",
      },
      backgroundReplacement: {
        isEnabled: replacementImageEnabled,
        backgroundImageURL: imageUrl,
        defaultColor: undefined,
      },
    };
    if (!(await VideoFxProcessor.isSupported(logger))) {
      // logger is optional for isSupported
      console.log("This browser is not supported");
    } else {
      console.log("This browser is definetely supported", videoFxConfig);
      try {
        const videoList = await deviceController.listVideoInputDevices();
        videoFxProcessor = await VideoFxProcessor.create(logger, videoFxConfig);
        // assuming that logger and videoInputDevice have already been set
        const videoTransformDevice = new DefaultVideoTransformDevice(
          logger,
          videoList[0].deviceId,
          [videoFxProcessor]
        );
        const videoElementTwo = document.querySelector(
          "#video-preview-two"
        ) as HTMLVideoElement;
        if (!videoElementTwo) {
          console.error("Video element not found!");
          return;
        }

        // // assuming that meetingSession has already been created
        await deviceController.startVideoInput(videoTransformDevice);
        deviceController.startVideoPreviewForVideoInput(videoElementTwo);
      } catch (error) {
        //@ts-ignore
        logger.warn(error.toString());
      } finally {
        // setAppState((prevState) => ({
        //   ...prevState,
        //   sessionState: {
        //     ...prevState.sessionState,
        //     filterClick: new Date().toLocaleString(),
        //   },
        // }));
      }
    }
  };

  const applyFilter = (
    backgroundBlurEnabled: boolean,
    replacementImageEnabled: boolean,
    imageUrl: string
  ) => {
    setLocalVideoConfig({
      backgroundBlurEnabled,
      replacementImageEnabled,
      imageUrl,
    });
    setAppState((prevState) => ({
      ...prevState,
      sessionState: {
        ...prevState.sessionState,
        filterClick: new Date().toLocaleString(),
      },
    }));
  };

  useLayoutEffect(() => {
    async function toggleOnVideo() {
      try {
        const videoList = await deviceController.listVideoInputDevices();
        const videoElement = document.querySelector(
          "#video-preview-two"
        ) as HTMLVideoElement;
        if (!videoElement) {
          console.error("Video element not found!");
          return;
        }

        // if (
        //   (await deviceController["activeDevices"].video) &&
        //   (await deviceController["activeDevices"].video.groupId.length) > 1
        // ) {
        //   deviceController.stopVideoPreviewForVideoInput(videoElement);
        //   await deviceController.stopVideoInput();
        // } else {
        //   await deviceController.startVideoInput(videoList[0].deviceId);
        //   deviceController.startVideoPreviewForVideoInput(videoElement);
        //   setDeviceOk(videoList[0].deviceId);
        // }
        setDeviceOk(videoList[0].deviceId);
      } catch (error) {
        console.error("Error in toggleVideo:", error);
      }
    }
    // toggleOnVideo();
    return () => {
      const videoElement = document.querySelector(
        "#video-preview-two"
      ) as HTMLVideoElement;
      console.log(videoElement);

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
  // useEffect(() => {
  //   makeBlur(
  //     localVideoConfig.backgroundBlurEnabled,
  //     localVideoConfig.replacementImageEnabled,
  //     localVideoConfig.imageUrl
  //   );
  // }, [localVideoConfig]);

  return (
    <div className=" ml-4 overflow-y-scroll max-h-[350px] customeScrollBarTwo">
      <div>
        <div>
          <div>
            <h4 className=" font-semibold font-base metro-medium text-cs-grey-dark my-5">
              Blur and custom background
            </h4>
            <div className=" flex gap-4 flex-wrap">
              <div
                className="  bg-gradient-to-r from-[#E1C6FF4D] to-[#E1C6FF33] rounded-md border-[2px] border-[#7133CF] border-solid w-20 h-14 flex justify-center items-center cursor-pointer"
                onClick={() => makeBlur(false, false, "")}
              >
                <Image src={cancelFilter} alt="cancel-filter" />
              </div>
              <div
                className="  bg-gradient-to-r from-[#E1C6FF4D] to-[#E1C6FF33] rounded-md border-[2px] border-[#7133CF] border-solid w-20 h-14 flex justify-center items-center cursor-pointer"
                onClick={() => {
                  // setLocalVideoConfig({
                  //   backgroundBlurEnabled: true,
                  //   replacementImageEnabled: false,
                  //   imageUrl: "",
                  // });
                  setAppState((prevState) => ({
                    ...prevState,
                    sessionState: {
                      ...prevState.sessionState,
                      filterClick: new Date().toLocaleString(),
                      filterConfig: {
                        backgroundBlur: {
                          isEnabled: true,
                          strength: "medium",
                        },
                        backgroundReplacement: {
                          isEnabled: false,
                          backgroundImageURL: "",
                          defaultColor: undefined,
                        },
                      },
                    },
                  }));
                  makeBlur(true, false, "");
                }}
              >
                <Image src={blurFilter} alt="cancel-filter" />
              </div>
              <div
                className="  bg-gradient-to-r from-[#E1C6FF4D] to-[#E1C6FF33] rounded-md border-[2px] border-[#7133CF] border-solid w-20 h-14 flex justify-center items-center cursor-pointer"
                onClick={() => makeBlur}
              >
                <GalleryAdd size="20" color="#5E29B7" />
              </div>

              <div
                className="  bg-gradient-to-r from-[#E1C6FF4D] to-[#E1C6FF33] rounded-md border-[2px] border-[#7133CF] border-solid w-20 h-14 flex overflow-hidden"
                onClick={() => {
                  // setLocalVideoConfig({
                  //   backgroundBlurEnabled: false,
                  //   replacementImageEnabled: true,
                  //   imageUrl: "https://picsum.photos/id/20/3670/2462",
                  // });
                  makeBlur(
                    false,
                    true,
                    "https://picsum.photos/id/20/3670/2462"
                  );
                }}
              >
                <Image
                  src={"https://picsum.photos/id/20/3670/2462"}
                  alt="image-filter"
                  width={80}
                  height={66}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <h4 className=" font-semibold font-base metro-medium text-cs-grey-dark my-5">
              Office
            </h4>
            <div className=" flex gap-4 flex-wrap">
              <div className="  bg-gradient-to-r from-[#E1C6FF4D] to-[#E1C6FF33] rounded-md border-[2px] border-[#7133CF] border-solid w-20 h-14 flex overflow-hidden">
                <Image
                  src={"https://picsum.photos/id/10/2500/1667"}
                  alt="image-filter"
                  width={80}
                  height={66}
                />
              </div>
              <div className="  bg-gradient-to-r from-[#E1C6FF4D] to-[#E1C6FF33] rounded-md border-[2px] border-[#7133CF] border-solid w-20 h-14 flex justify-center items-center">
                <Image src={blurFilter} alt="cancel-filter" />
              </div>
              <div className="  bg-gradient-to-r from-[#E1C6FF4D] to-[#E1C6FF33] rounded-md border-[2px] border-[#7133CF] border-solid w-20 h-14 flex justify-center items-center">
                <GalleryAdd size="20" color="#5E29B7" />
              </div>
              <div className="  bg-gradient-to-r from-[#E1C6FF4D] to-[#E1C6FF33] rounded-md border-[2px] border-[#7133CF] border-solid w-20 h-14 flex justify-center items-center">
                <GalleryAdd size="20" color="#5E29B7" />
              </div>
              <div className="  bg-gradient-to-r from-[#E1C6FF4D] to-[#E1C6FF33] rounded-md border-[2px] border-[#7133CF] border-solid w-20 h-14 flex justify-center items-center">
                <GalleryAdd size="20" color="#5E29B7" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <h4 className=" font-semibold font-base metro-medium text-cs-grey-dark my-4">
              Home
            </h4>
            <div className=" flex gap-4 flex-wrap">
              <div className="  bg-gradient-to-r from-[#E1C6FF4D] to-[#E1C6FF33] rounded-md border-[2px] border-[#7133CF] border-solid w-20 h-14 flex justify-center items-center">
                <Image src={cancelFilter} alt="cancel-filter" />
              </div>
              <div className="  bg-gradient-to-r from-[#E1C6FF4D] to-[#E1C6FF33] rounded-md border-[2px] border-[#7133CF] border-solid w-20 h-14 flex justify-center items-center">
                <Image src={blurFilter} alt="cancel-filter" />
              </div>
              <div className="  bg-gradient-to-r from-[#E1C6FF4D] to-[#E1C6FF33] rounded-md border-[2px] border-[#7133CF] border-solid w-20 h-14 flex justify-center items-center">
                <GalleryAdd size="20" color="#5E29B7" />
              </div>
              <div className="  bg-gradient-to-r from-[#E1C6FF4D] to-[#E1C6FF33] rounded-md border-[2px] border-[#7133CF] border-solid w-20 h-14 flex justify-center items-center">
                <GalleryAdd size="20" color="#5E29B7" />
              </div>
              <div className="  bg-gradient-to-r from-[#E1C6FF4D] to-[#E1C6FF33] rounded-md border-[2px] border-[#7133CF] border-solid w-20 h-14 flex overflow-hidden">
                <Image
                  src={"https://picsum.photos/id/21/367/267"}
                  alt="image-filter"
                  width={80}
                  height={66}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoFilterPreviewControl;
