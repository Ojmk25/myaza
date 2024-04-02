"use client"
import { Coffee, EmojiHappy, InfoCircle, Messages1, Microphone, MicrophoneSlash1, Monitor, MoreCircle, ProfileAdd, RecordCircle, Setting2, Video, VideoSlash } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import DateTimeDisplay from "../../utils/getDate";
import { useLocalVideo, useToggleLocalMute } from "amazon-chime-sdk-component-library-react";

export default function MeetingControl({ bgColor, onOpen }: { bgColor: boolean, onOpen: () => void }) {
  const currentTimeRef = useRef<HTMLDivElement>(null);
  const [changeBg, setChangeBg] = useState(true)
  const { muted, toggleMute } = useToggleLocalMute();
  const { isVideoEnabled, toggleVideo } = useLocalVideo();

  useEffect(() => {
    const updateCurrentTime = () => {
      const displayDate = DateTimeDisplay;
      const { hours, minutes, ampm } = displayDate();
      if (currentTimeRef.current !== null) {
        currentTimeRef.current.textContent = `${hours < 10 ? ('0' + hours) : hours}:${minutes < 10 ? ('0' + minutes) : minutes} ${ampm}`;
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

  console.log(muted);

  return (
    <div className="flex justify-between items-center py-4">
      <div className="flex gap-x-3 flex-2">
        <div className=" text-cs-grey-800 font-normal text-[20px]" ref={currentTimeRef}></div>
        <div className=" w-[1px] bg-cs-grey-200"></div>
        <h3 className=" text-cs-grey-800 font-normal text-[20px]">AWS Conference</h3>
      </div>

      <div className=" flex justify-center flex-3">
        <div className=" flex gap-x-6">
          <div className="text-center cursor-pointer" onClick={toggleMute}>
            <div className={`p-3 ${muted ? "bg-[#E1C6FF4D]" : "bg-cs-purple-650"} rounded-md max-w-12 relative`}>
              {muted ? (
                <MicrophoneSlash1 size="24" color="#5E29B7" className="mx-auto" />
              ) : (
                <Microphone size="24" color="#FAFAFA" className="mx-auto" />
              )}
              {!muted && <MoreCircle size="24" color="#5E29B7" className="mx-auto rounded-full absolute -top-[5px] -right-[10px]" style={{ fill: "#ffffff" }} />}
            </div>
            <h6 className=" text-cs-grey-100 font-medium text-xs">{muted ? "Unmute" : "Mute"}</h6>
          </div>

          <div className="text-center cursor-pointer" onClick={toggleVideo}>
            <div className={`p-3 ${isVideoEnabled ? "bg-cs-purple-650" : "bg-[#E1C6FF4D]"} rounded-md max-w-12 mx-auto`}>
              {isVideoEnabled ? (
                <Video size="24" color="#FAFAFA" className="mx-auto" />
              ) : (
                <VideoSlash size="24" color="#5E29B7" className="mx-auto" />
              )}

            </div>
            <h6 className=" text-cs-grey-100 font-medium text-xs">Video</h6>
          </div>

          <div className="text-center cursor-pointer" onClick={onOpen}>
            <div className="p-3 bg-[#E1C6FF4D] rounded-md max-w-12 mx-auto">
              <Monitor size="24" color="#5E29B7" className="mx-auto" />
            </div>
            <h6 className=" text-cs-grey-100 font-medium text-xs">Share</h6>
          </div>

          <div className="text-center cursor-pointer">
            <div className="p-3 bg-[#E1C6FF4D] rounded-md max-w-12 mx-auto">
              <RecordCircle size="24" color="#5E29B7" className="mx-auto" />
            </div>
            <h6 className=" text-cs-grey-100 font-medium text-xs">Record</h6>
          </div>

          <div className="text-center cursor-pointer">
            <div className="p-3 bg-[#E1C6FF4D] rounded-md max-w-12 mx-auto">
              <EmojiHappy size="24" color="#5E29B7" className="mx-auto" />
            </div>
            <h6 className=" text-cs-grey-100 font-medium text-xs">React</h6>
          </div>

          <div className="text-center cursor-pointer">
            <div className="p-3 bg-[#E1C6FF4D] rounded-md max-w-12 mx-auto">
              <MicrophoneSlash1 size="24" color="#5E29B7" className="mx-auto" />
            </div>
            <h6 className=" text-cs-grey-100 font-medium text-xs">Raise hand</h6>
          </div>

          <div className=" bg-cs-red text-center rounded-lg py-4 px-6 text-white font-bold text-sm h-fit cursor-pointer">
            <span>End</span>
          </div>
        </div>
      </div>

      <div className=" flex gap-x-6 flex-2 justify-end">
        <div className="text-center">
          <div className="p-3 bg-[#E1C6FF4D] rounded-md max-w-12  mx-auto">
            <ProfileAdd size="24" color="#5E29B7" className="mx-auto" />
          </div>
          <h6 className=" text-cs-grey-100 font-medium text-xs">Participants</h6>
        </div>

        <div className="text-center">
          <div className="p-3 bg-[#E1C6FF4D] rounded-md max-w-12 mx-auto">
            <Messages1 size="24" color="#5E29B7" className="mx-auto" />
          </div>
          <h6 className=" text-cs-grey-100 font-medium text-xs">Chat</h6>
        </div>

        <div className="text-center">
          <div className="p-3 bg-[#E1C6FF4D] rounded-md max-w-12 mx-auto">
            <Coffee size="24" color="#5E29B7" className="mx-auto" />
          </div>
          <h6 className=" text-cs-grey-100 font-medium text-xs">Activity</h6>
        </div>
      </div>
    </div>
  )
}