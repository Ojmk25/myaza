"use client";
import VideoFilter from "@/components/modals/VideoFilter";
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
import bigModalOpener from "@/public/assets/images/openVideoBgModalBigScreen.svg";
import smallModalOpener from "@/public/assets/images/openVideoBgModal.svg";
import Image from "next/image";

export const ToggleVideoBgButton = ({
  deviceController,
  getVideoStatus,
}: {
  deviceController?: DefaultDeviceController;
  getVideoStatus?: (getVideoStatus: boolean) => void;
}) => {
  const [video, setVideo] = useState(false);
  const hasRunRef = useRef(false);
  const toggleVideoRef = useRef<HTMLDivElement>(null);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [_, setVideoStatus] = useSessionStorage("videoStatus", "yes");
  const [openVideoBg, setOpenVideoBg] = useState(false);

  useEffect(() => {
    if (video) {
      setVideoStatus("yes");
    } else {
      setVideoStatus("no");
    }
    // getVideoStatus(video);
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

  const handleOpenVideoBg = () => {
    setOpenVideoBg(true);
  };

  const handleCloseVideoBg = () => {
    setOpenVideoBg(false);
  };

  return (
    <>
      {openVideoBg && <VideoFilter onClose={handleCloseVideoBg} />}
      <div
        onClick={handleOpenVideoBg}
        className=" absolute bottom-[10px] right-[10px] cursor-pointer"
      >
        <div className=" ">
          <div className=" md:hidden">
            <Image src={smallModalOpener} alt="modal-opener" />
          </div>
          <div className="hidden md:block">
            <Image src={bigModalOpener} alt="modal-opener" />
          </div>
        </div>
      </div>
    </>
  );
};
