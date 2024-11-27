"use client";
import {
  MeetingManager,
  RemoteVideo,
  useAttendeeStatus,
  useLocalVideo,
  useRemoteVideoTileState,
} from "amazon-chime-sdk-component-library-react";
import Image from "next/image";
import dottedLine from "@/public/assets/images/dottedLine.svg";
import { forwardRef, useEffect } from "react";
import { getNameAbbreviation } from "@/services/authService";
import { getRemoteInitials } from "@/utils/meetingFunctions";
import ReactionEmoji from "./ReactionEmoji";
import RaisedHand from "./RaisedHand";
import { useAppContext } from "@/context/StoreContext";
import { MicrophoneSlash1 } from "iconsax-react";

export const RemoteAttendeeCard = forwardRef<
  HTMLDivElement,
  {
    name: string | undefined;
    attendeeId: any;
    videoTildId: number;
    nameID: string;
    // audioState: JSX.Element;
    meetingManager?: MeetingManager;
    sideView: string | undefined;
  }
>(function RemoteAttendeeCard(props, ref) {
  const { tiles, tileIdToAttendeeId, attendeeIdToTileId, size } =
    useRemoteVideoTileState();
  const { appState, setAppState } = useAppContext();
  const { videoEnabled, sharingContent, muted } = useAttendeeStatus(
    props.attendeeId
  );

  useEffect(() => {
    getNameAbbreviation();
    console.log("");
  }, [appState.sessionState.meetingAttendees]);
  const attendeeDetailItems = appState.sessionState.meetingAttendees.find(
    (att) => att.user_id === props.nameID
  );

  const audioStatusFromState = appState.sessionState.audioState.find(
    (att) => att.externalUserId === props.nameID
  );
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
                className="bar bg-cs-grey-50 transition-all remote"
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
      className={`wrapperDiv bg-cs-black-200 flex-1 h-full ${
        videoEnabled ? "" : "p-3"
      } rounded flex flex-col relative overflow-hidden ${
        videoEnabled || !muted ? "device_Enabled" : ""
      }`}
      ref={ref}
    >
      <div
        className={` ${
          videoEnabled ? "absolute right-3 top-3 z-10" : "flex justify-end"
        }`}
      >
        <div className={`tileVisualizer-${props.attendeeId}`}>
          <AudioComp />
        </div>
      </div>
      <div
        className={` ${
          videoEnabled
            ? "absolute left-3 top-3 z-10"
            : "absolute left-3 top-3 z-10"
        }`}
      >
        <ReactionEmoji attendeeId={props.attendeeId} />
      </div>
      <div
        className={` ${
          videoEnabled
            ? "absolute right-8 bottom-3 z-10"
            : "absolute right-8 bottom-3 z-10"
        }`}
      >
        <RaisedHand attendeeId={props.attendeeId} externalId={props.nameID} />
      </div>

      <div className="flex-1 flex justify-center items-center">
        <div className=" w-full h-full">
          {props.videoTildId === undefined ? (
            <></>
          ) : (
            <RemoteVideo
              tileId={props.videoTildId}
              className={`rounded relative bg-slate-800  remote-video ${
                attendeeDetailItems && attendeeDetailItems?.user_id
              }`}
              id={`remotevideo-${props.videoTildId}`}
              key={props.videoTildId}
              name={attendeeDetailItems && attendeeDetailItems?.full_name}
            />
          )}

          <div className=" flex w-full h-full justify-center items-center @container/imageWrapper">
            <div className=" max-w-full whitespace-nowrap">
              {!videoEnabled && (
                <>
                  {attendeeDetailItems?.picture &&
                  attendeeDetailItems?.picture !== "" ? (
                    <div>
                      <img
                        src={attendeeDetailItems && attendeeDetailItems.picture}
                        alt={
                          attendeeDetailItems && attendeeDetailItems.full_name
                        }
                        className="w-[50px] h-[50px] @[300px]/imageWrapper:w-[100px] @[300px]/imageWrapper:h-[100px]  rounded-full m-auto object-cover"
                      />
                    </div>
                  ) : (
                    <div className=" bg-cs-grey-800 @[230px]/meetingCard:w-[80px] @[230px]/meetingCard:h-[80px]  rounded-full flex justify-center items-center text-cs-grey-55 font-semibold  m-auto @[100px]/meetingCard:w-[40px] @[100px]/meetingCard:h-[40px] @[100px]/meetingCard:text-xl @[230px]/meetingCard:text-[28px] uppercase">
                      {attendeeDetailItems &&
                        getRemoteInitials(
                          attendeeDetailItems &&
                            (attendeeDetailItems?.full_name as string)
                        )}
                    </div>
                  )}
                </>
              )}

              {!videoEnabled && (
                <h3 className=" font-medium text-cs-grey-50 text-center @[100px]/meetingCard:mt-0 @[230px]/meetingCard:mt-2 capitalize @[100px]/meetingCard:text-xs @[230px]/meetingCard:text-base overflow-hidden text-ellipsis">
                  {attendeeDetailItems && attendeeDetailItems?.full_name}
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          videoEnabled ? "absolute right-4 bottom-4 z-10" : "flex justify-end"
        }`}
      >
        <div className="@[100px]/meetingCard:py-0 @[230px]/meetingCard:p-[6px]">
          <Image src={dottedLine} alt="" className=" w-4 h-4" />
        </div>
      </div>
    </div>
  );
});
