import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import closeIcon from "@/public/assets/images/closeIcon.svg";
import { AuthInput } from "../auth/AuthInput";
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
import LoadingScreen from "./LoadingScreen";
import { SuccessSlideIn } from "../SuccessSlideIn";
import { FailureSlideIn } from "../FailureSlideIn";
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
import VideoFilterPreviewControl from "../meetingComponents/meetingControlButtons/VideoFilterPreviewControl";

export interface UploadMediaPayload {
  media_type: File & { type: "image/jpeg" | "image/png" | "image/jpg" };
}
const VideoFilter = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const { first_name, surname, email, picture } = getClientInfo();
  const logger = new ConsoleLogger("MyLogger");
  const { setAppState } = useAppContext();
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

  const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      try {
        setLoading(true);
        const data = await uploadMediaFnc({
          media_type: extractAfterLastSlashOrFull(file?.type as string),
        });
        const { signed_url, photo_url } = data.data.body.data;
        const updatePayload = {
          given_name: `${first_name}`,
          family_name: `${surname}`,
          email: `${email}`,
          picture: photo_url,
        };
        await updateUserFnc(updatePayload);

        await uploadImageFile(signed_url, file);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("uploaded successfully");
        setNewFile(file);
        setLoading(false);
      }
    }
  };

  const handleInput = (input: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = input.target;
    const addColour = (elem: React.ChangeEvent<HTMLInputElement>) => {
      elem.target.classList.add("border-cs-error-500");
      elem.target.classList.add("placeholder:text-cs-error-500");
      elem.target.classList.remove("bg-cs-grey-55");
      setErrMessage((prevState) => ({
        ...prevState,
        [name]: `Invalid ${name}`,
      }));
    };
    const removeColour = (elem: React.ChangeEvent<HTMLInputElement>) => {
      elem.target.classList.remove("border-cs-error-500");
      elem.target.classList.remove("placeholder:text-cs-error-500");
      elem.target.classList.add("bg-cs-grey-55");
      setErrMessage((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    };
    if (value.length === 0) {
      // setErrorColour(true)
      setErrMessage((prevState) => ({
        ...prevState,
        [name]: `Enter your ${name}`,
      }));
    } else if (type === "text") {
      if (!ValidateText(value)) {
        addColour(input);
        setValidateSuccess((prevState) => ({
          ...prevState,
          [name]: false,
        }));
      } else {
        removeColour(input);
        setValidateSuccess((prevState) => ({
          ...prevState,
          [name]: true,
        }));
      }
    }
    if (name === "First name" || name === "Last name") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value && value[0].toUpperCase() + value.slice(1),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    if (ValidateText(formData["First name"] as string)) {
      setValidateSuccess((prevState) => ({
        ...prevState,
        "First name": true,
      }));
    }
    if (ValidateText(formData["Last name"] as string)) {
      setValidateSuccess((prevState) => ({
        ...prevState,
        "Last name": true,
      }));
    }
  };

  const updatePayload = {
    given_name: formData["First name"],
    family_name: formData["Last name"],
  };

  const handleUpdateSubmit = async () => {
    const clearAll = () => {
      setLoading(false);
      setTimeout(() => {
        setSuccessRes("");
        setOpenModal(false);
        onClose();
      }, 2000);
    };
    try {
      setLoading(true);
      const data = await updateUserFnc(updatePayload);
      setLoading(true);
      setSuccessRes(data.data.body);
      setOpenModal(true);
    } catch (error) {
      setLoading(true);
      console.log(error);
    } finally {
      clearAll();
    }
  };

  //Initialize DefaultDeviceController
  const deviceController = new DefaultDeviceController(logger, {
    enableWebAudio: false,
  });
  // const deviceController = new DefaultDeviceController(logger);

  // const videoFxConfig: VideoFxConfig = {
  //   backgroundBlur: {
  //     isEnabled: localVideoConfig.backgroundBlurEnabled,
  //     strength: "medium",
  //   },
  //   backgroundReplacement: {
  //     isEnabled: localVideoConfig.replacementImageEnabled,
  //     backgroundImageURL: localVideoConfig.imageUrl,
  //     defaultColor: undefined,
  //   },
  // };

  // const makeBlur = async () => {
  //   const logger = new ConsoleLogger("MyLogger");

  //   let videoFxProcessor: VideoFxProcessor | undefined = undefined;
  //   const videoList = await deviceController.listVideoInputDevices();

  //   if (!(await VideoFxProcessor.isSupported(logger))) {
  //     // logger is optional for isSupported
  //     console.log("This browser is not supported");
  //   } else {
  //     console.log("This browser is definetely supported");

  //     try {
  //       videoFxProcessor = await VideoFxProcessor.create(logger, videoFxConfig);
  //       // assuming that logger and videoInputDevice have already been set
  //       const videoTransformDevice = new DefaultVideoTransformDevice(
  //         logger,
  //         videoList[0].deviceId,
  //         [videoFxProcessor]
  //       );
  //       const videoElementTwo = document.querySelector(
  //         "#video-preview-two"
  //       ) as HTMLVideoElement;
  //       if (!videoElementTwo) {
  //         console.error("Video element not found!");
  //         // return;
  //       }

  //       // assuming that meetingSession has already been created
  //       await deviceController.startVideoInput(videoTransformDevice);
  //       await deviceController.startVideoPreviewForVideoInput(videoElementTwo);
  //       // setAppState((prevState) => ({
  //       //   ...prevState,
  //       //   sessionState: {
  //       //     ...prevState.sessionState,
  //       //     // new Date().toLocaleString()
  //       //   },
  //       // }));
  //     } catch (error) {
  //       //@ts-ignore
  //       logger.warn(error.toString());
  //     }
  //   }
  // };

  // const applyFilter = (
  //   backgroundBlurEnabled: boolean,
  //   replacementImageEnabled: boolean,
  //   imageUrl: string
  // ) => {
  //   setLocalVideoConfig({
  //     backgroundBlurEnabled,
  //     replacementImageEnabled,
  //     imageUrl,
  //   });
  //   makeBlur();
  // };

  // useLayoutEffect(() => {
  //   async function toggleOnVideo() {
  //     try {
  //       const videoList = await deviceController.listVideoInputDevices();
  //       const videoElement = document.querySelector(
  //         "#video-preview-two"
  //       ) as HTMLVideoElement;
  //       if (!videoElement) {
  //         console.error("Video element not found!");
  //         return;
  //       }

  //       if (
  //         (await deviceController["activeDevices"].video) &&
  //         (await deviceController["activeDevices"].video.groupId.length) > 1
  //       ) {
  //         deviceController.stopVideoPreviewForVideoInput(videoElement);
  //         await deviceController.stopVideoInput();
  //       } else {
  //         await deviceController.startVideoInput(videoList[0].deviceId);
  //         deviceController.startVideoPreviewForVideoInput(videoElement);
  //       }
  //     } catch (error) {
  //       console.error("Error in toggleVideo:", error);
  //     }
  //   }
  //   toggleOnVideo();
  //   return () => {
  //     const videoElement = document.querySelector(
  //       "#video-preview-two"
  //     ) as HTMLVideoElement;
  //     const unMountCamera = async () => {
  //       deviceController.stopVideoPreviewForVideoInput(videoElement);
  //       await deviceController.stopVideoInput();
  //       await deviceController.stopAudioInput();
  //     };
  //     if (videoElement) {
  //       unMountCamera();
  //     }
  //   };
  // }, []);
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto modal">
      <div className="flex items-center justify-center min-h-screen pt-4 pb-20 text-center">
        <div
          className="fixed inset-0 transition-opacity bg-cs-modal-100 cursor-pointer"
          onClick={onClose}
        ></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block pt-5 pb-4 text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:align-middle sm:w-full sm:max-w-[906px] md:max-h-[473px] px-4">
          <div className=" flex justify-between border-b border-solid border-cs-grey-55 pb-4">
            <h3 className=" text-2xl font-semibold text-cs-grey-dark mb-1">
              Background Effect
            </h3>
            <Image
              src={closeIcon}
              alt="close"
              onClick={onClose}
              className=" cursor-pointer"
            />
          </div>

          <div className=" flex md:flex-row flex-col">
            <div className=" flex-5 my-4 h-[350px] max-h-fit">
              <video
                id="video-preview-two"
                autoPlay
                className="rounded-[4px] md:rounded-[12px] w-full object-cover h-[302px] sm:h-[342px] md:h-[200px] lg:h-[261px] xl:h-[358px] "
              ></video>
            </div>

            <VideoFilterPreviewControl />
          </div>
        </div>
      </div>

      <SuccessSlideIn
        openModal={openModal}
        response={successRes?.status === "Success"}
        successActionResponse={successRes?.message}
        closeModal={() => {}}
      />
      <FailureSlideIn
        openModal={openModal}
        response={successRes?.status === "Error"}
        errResponse={successRes?.message}
        closeModal={() => {}}
      />
      {loading && <LoadingScreen />}
    </div>
  );
};

export default VideoFilter;
