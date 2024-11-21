import { forwardRef, useState } from "react";
import {
  LocalVideo,
  useAttendeeStatus,
  useLocalVideo,
  MeetingManager,
} from "amazon-chime-sdk-component-library-react";
import Image from "next/image";
import dottedLine from "@/public/assets/images/dottedLine.svg";

import { getRemoteInitials } from "@/utils/meetingFunctions";
import ReactionEmoji from "./ReactionEmoji";
import { useAppContext } from "@/context/StoreContext";
import RaisedHand from "./RaisedHand";
import { MicrophoneSlash1 } from "iconsax-react";
export const LocalAttendeeCard = forwardRef<
  HTMLDivElement,
  {
    name: string | undefined;
    attendeeId: any;
    videoTildId: number;
    nameID: string;
    // audioState: JSX.Element;
    meetingManager?: MeetingManager;
    sideView: string | undefined;
    // userOject: any;
  }
>(function LocalAttendeeCard(props, ref) {
  const { isVideoEnabled } = useLocalVideo();
  const { appState, setAppState } = useAppContext();
  const { videoEnabled, sharingContent, muted } = useAttendeeStatus(
    props.attendeeId
  );

  const attendeeDetailItems = appState.sessionState.meetingAttendees.find(
    (att: any) => att.user_id === props.nameID
  );
  const audioStatusFromState = appState.sessionState.audioState.find(
    (att) => att.externalUserId === props.nameID
  );

  console.log(appState.sessionState.meetingAttendees);

  const AudioComp = () => {
    return (
      <>
        {audioStatusFromState?.mute ||
        audioStatusFromState?.mute === undefined ? (
          <div
            className={`flex justify-center items-end p-[6px] bg-[#333333] rounded-full w-[30px] h-[30px]`}
          >
            <MicrophoneSlash1 size="18" color="#FAFAFA" />
          </div>
        ) : (
          <div className="flex justify-center items-center p-[6px] bg-[#6c3ec2] rounded-full w-[30px] h-[30px] gap-x-[2px]">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="bar bg-cs-grey-50 transition-all"
                style={{ width: "4px", height: "3px" }}
              />
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div
      className={`wrapperDiv bg-cs-black-200 flex-1 h-full w-full ${
        isVideoEnabled ? "" : "p-3"
      } rounded flex flex-col relative overflow-hidden local-attendee-card ${
        videoEnabled || !muted ? "device_Enabled" : ""
      }`}
      ref={ref}
    >
      <div
        className={` ${
          isVideoEnabled ? "absolute right-3 z-10 top-3" : "flex justify-end"
        }`}
      >
        <div className={`tileVisualizer-${props.attendeeId}`}>
          <AudioComp />
        </div>
      </div>
      <div className={` ${isVideoEnabled ? "left-3 top-3" : ""} z-10 absolute`}>
        <ReactionEmoji attendeeId={props.attendeeId} />
      </div>
      <div
        className={` ${
          isVideoEnabled ? "right-8 bottom-3" : "right-8 bottom-3"
        } z-10 absolute`}
      >
        <RaisedHand attendeeId={props.attendeeId} externalId={props.nameID} />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className=" w-full h-full ">
          <LocalVideo
            className=" rounded relative bg-slate-800 capitalize localVideo"
            nameplate={attendeeDetailItems?.full_name}
            id={`localvideo-${props.videoTildId}`}
            css=" relative"
          />
          <div className=" flex w-full h-full justify-center items-center @container/imageWrapper">
            <div className=" max-w-full whitespace-nowrap">
              {!isVideoEnabled && (
                <>
                  {attendeeDetailItems?.picture &&
                  attendeeDetailItems?.picture !== "" ? (
                    <div>
                      <img
                        src={attendeeDetailItems.picture}
                        alt={attendeeDetailItems.full_name}
                        className="w-[50px] h-[50px] @[300px]/imageWrapper:w-[100px] @[300px]/imageWrapper:h-[100px]  rounded-full m-auto object-cover"
                      />
                    </div>
                  ) : (
                    <div className=" bg-cs-grey-800 @[230px]/meetingCard:w-[80px] @[230px]/meetingCard:h-[80px]  rounded-full flex justify-center items-center text-cs-grey-55 font-semibold  m-auto @[100px]/meetingCard:w-[40px] @[100px]/meetingCard:h-[40px] @[100px]/meetingCard:text-xl @[230px]/meetingCard:text-[28px] uppercase">
                      {attendeeDetailItems &&
                        getRemoteInitials(
                          attendeeDetailItems &&
                            (attendeeDetailItems.full_name as string)
                        )}
                    </div>
                  )}
                </>
              )}

              {!isVideoEnabled && (
                <h3 className=" font-medium text-cs-grey-50 text-center @[100px]/meetingCard:mt-0 @[230px]/meetingCard:mt-2 capitalize @[100px]/meetingCard:text-xs @[230px]/meetingCard:text-base overflow-hidden text-ellipsis">
                  {attendeeDetailItems?.full_name}
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
});
