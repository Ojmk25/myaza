import {
  LocalVideo,
  RemoteVideo,
  useAttendeeStatus,
  useLocalVideo,
  MeetingManager,
} from "amazon-chime-sdk-component-library-react";
import Image from "next/image";
import { MicrophoneSlash1, Microphone } from "iconsax-react";
import avatar from "@/public/assets/images/avatar.png";
import dottedLine from "@/public/assets/images/dottedLine.svg";
import { useEffect } from "react";
import { getNameAbbreviation } from "@/services/authService";
import { getRemoteInitials, processString } from "@/utils/meetingFunctions";
import ReactionEmoji from "./ReactionEmoji";
import { useAppContext } from "@/context/StoreContext";
import RaisedHand from "./RaisedHand";

export const LocalAttendeeCard = ({
  name,
  attendeeId,
  videoTildId,
  nameID,
  audioState,
  meetingManager,
}: {
  name: string | undefined;
  attendeeId: any;
  videoTildId: number;
  nameID: string;
  audioState: JSX.Element;
  meetingManager?: MeetingManager;
}) => {
  const { isVideoEnabled } = useLocalVideo();
  const { appState, setAppState } = useAppContext();
  const { videoEnabled, sharingContent, muted } = useAttendeeStatus(attendeeId);

  useEffect(() => {
    getNameAbbreviation();
  }, []);

  return (
    <div
      className={`wrapperDiv bg-cs-black-200 flex-1 h-full w-full ${
        isVideoEnabled ? "" : "p-3"
      } rounded flex flex-col relative overflow-hidden `}
    >
      <div
        className={` ${
          isVideoEnabled ? "absolute right-3 z-10 top-3" : "flex justify-end"
        }`}
      >
        {audioState}
      </div>
      <div className={` ${isVideoEnabled ? "left-3 top-3" : ""} z-10 absolute`}>
        <ReactionEmoji attendeeId={attendeeId} />
      </div>
      <div
        className={` ${
          isVideoEnabled ? "right-8 bottom-3" : "right-8 bottom-3"
        } z-10 absolute`}
      >
        <RaisedHand attendeeId={attendeeId} />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className=" w-full h-full ">
          <LocalVideo
            className=" rounded relative bg-slate-800 capitalize"
            nameplate={processString(name as string)}
            id={`remotevideo-${videoTildId}`}
            css=" relative"
          />

          <div className=" flex w-full h-full justify-center items-center @container/imageWrapper">
            <div>
              {!isVideoEnabled && (
                // <Image src={avatar} alt="" className=" max-w-[50px] @[300px]/imageWrapper:max-w-[100px] max-h-[297px] rounded-full m-auto" />
                <div className=" bg-cs-grey-800 @[230px]/meetingCard:w-[80px] @[230px]/meetingCard:h-[80px]  rounded-full flex justify-center items-center text-cs-grey-55 font-semibold  m-auto @[100px]/meetingCard:w-[40px] @[100px]/meetingCard:h-[40px] @[100px]/meetingCard:text-xl @[230px]/meetingCard:text-[28px]">
                  {getRemoteInitials(processString(name as string))}
                </div>
              )}
              {/* w-[100px] h-[100px] max-w-[150px] max-h-[150px] */}

              {!isVideoEnabled && (
                <h3 className=" font-medium text-cs-grey-50 text-center @[100px]/meetingCard:mt-0 @[230px]/meetingCard:mt-2 capitalize @[100px]/meetingCard:text-xs @[230px]/meetingCard:text-base">
                  {processString(name as string)}
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${
          isVideoEnabled ? "absolute right-4 bottom-4 z-10" : "flex justify-end"
        }`}
      >
        <div className=" @[100px]/meetingCard:py-0 @[230px]/meetingCard:p-[6px]">
          <Image src={dottedLine} alt="" className=" w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
