// import {
//   LocalVideo,
//   useAttendeeStatus,
//   useLocalVideo,
//   MeetingManager,
// } from "amazon-chime-sdk-component-library-react";
// import Image from "next/image";
// import dottedLine from "@/public/assets/images/dottedLine.svg";
// import { useEffect, useRef } from "react";
// import { getNameAbbreviation } from "@/services/authService";
// import { getRemoteInitials } from "@/utils/meetingFunctions";
// import ReactionEmoji from "./ReactionEmoji";
// import { useAppContext } from "@/context/StoreContext";
// import RaisedHand from "./RaisedHand";

import { forwardRef } from "react";

// // import MeetingCardAudio from "./MeetingCardAudio";

// type AtteendeeDetailsProp = {
//   full_name: string;
//   picture?: string;
//   user_id?: string;
// };

// export const LocalAttendeeCard = ({
//   name,
//   attendeeId,
//   videoTildId,
//   nameID,
//   audioState,
//   meetingManager,
//   sideView,
// }: // attendeeDetails,
// {
//   name: string | undefined;
//   attendeeId: any;
//   videoTildId: number;
//   nameID: string;
//   audioState: JSX.Element;
//   meetingManager?: MeetingManager;
//   sideView: string | undefined;
//   // attendeeDetails: AtteendeeDetailsProp | undefined;
// }) => {
//   const { isVideoEnabled } = useLocalVideo();
//   const { appState, setAppState } = useAppContext();
//   const { videoEnabled, sharingContent, muted } = useAttendeeStatus(attendeeId);

//   useEffect(() => {
//     getNameAbbreviation();
//   }, [appState.sessionState.meetingAttendees, sideView, meetingManager, muted]);
//   const attendeeDetailItems = appState.sessionState.meetingAttendees.find(
//     (att) => att.user_id === nameID
//   );
//   const elementRef = useRef<HTMLDivElement | null>(null);

//   return (
//     <div
//       className={`wrapperDiv bg-cs-black-200 flex-1 h-full w-full ${
//         isVideoEnabled ? "" : "p-3"
//       } rounded flex flex-col relative overflow-hidden `}
//       ref={elementRef}
//     >
//       <div
//         className={` ${
//           isVideoEnabled ? "absolute right-3 z-10 top-3" : "flex justify-end"
//         }`}
//       >
//         {audioState}
//       </div>
//       <div className={` ${isVideoEnabled ? "left-3 top-3" : ""} z-10 absolute`}>
//         <ReactionEmoji attendeeId={attendeeId} />
//       </div>
//       <div
//         className={` ${
//           isVideoEnabled ? "right-8 bottom-3" : "right-8 bottom-3"
//         } z-10 absolute`}
//       >
//         <RaisedHand attendeeId={attendeeId} />
//       </div>
//       <div className="flex-1 flex justify-center items-center">
//         <div className=" w-full h-full ">
//           <LocalVideo
//             className=" rounded relative bg-slate-800 capitalize localVideo"
//             nameplate={attendeeDetailItems?.full_name}
//             id={`localvideo-${videoTildId}`}
//             css=" relative"
//           />

//           <div className=" flex w-full h-full justify-center items-center @container/imageWrapper">
//             <div className=" max-w-full whitespace-nowrap">
//               {!isVideoEnabled && (
//                 <>
//                   {attendeeDetailItems?.picture &&
//                   attendeeDetailItems?.picture !== "" ? (
//                     <div>
//                       {/* <Image
//                         src={`${attendeeDetails.picture}`}
//                         alt=""
//                         // width={50}
//                         // height={50}

//                         layout="fill"
//                       /> */}
//                       <img
//                         src={attendeeDetailItems.picture}
//                         alt={attendeeDetailItems.full_name}
//                         className="w-[50px] h-[50px] @[300px]/imageWrapper:w-[100px] @[300px]/imageWrapper:h-[100px]  rounded-full m-auto object-cover"
//                       />
//                     </div>
//                   ) : (
//                     <div className=" bg-cs-grey-800 @[230px]/meetingCard:w-[80px] @[230px]/meetingCard:h-[80px]  rounded-full flex justify-center items-center text-cs-grey-55 font-semibold  m-auto @[100px]/meetingCard:w-[40px] @[100px]/meetingCard:h-[40px] @[100px]/meetingCard:text-xl @[230px]/meetingCard:text-[28px] uppercase">
//                       {attendeeDetailItems &&
//                         getRemoteInitials(
//                           attendeeDetailItems &&
//                             (attendeeDetailItems?.full_name as string)
//                         )}
//                       {/* {attendeeDetails?.full_name as string} */}
//                     </div>
//                   )}
//                 </>
//               )}
//               {/* w-[100px] h-[100px] max-w-[150px] max-h-[150px] */}

//               {!isVideoEnabled && (
//                 <h3 className=" font-medium text-cs-grey-50 text-center @[100px]/meetingCard:mt-0 @[230px]/meetingCard:mt-2 capitalize @[100px]/meetingCard:text-xs @[230px]/meetingCard:text-base overflow-hidden text-ellipsis">
//                   {attendeeDetailItems?.full_name}
//                 </h3>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div
//         className={`${
//           isVideoEnabled ? "absolute right-4 bottom-4 z-10" : "flex justify-end"
//         }`}
//       >
//         <div className=" @[100px]/meetingCard:py-0 @[230px]/meetingCard:p-[6px]">
//           <Image src={dottedLine} alt="" className=" w-4 h-4" />
//         </div>
//       </div>
//     </div>
//   );
// };

import {
  LocalVideo,
  useAttendeeStatus,
  useLocalVideo,
  MeetingManager,
} from "amazon-chime-sdk-component-library-react";
import Image from "next/image";
import dottedLine from "@/public/assets/images/dottedLine.svg";
import { useEffect, useRef } from "react";
import { getNameAbbreviation } from "@/services/authService";
import { getRemoteInitials } from "@/utils/meetingFunctions";
import ReactionEmoji from "./ReactionEmoji";
import { useAppContext } from "@/context/StoreContext";
import RaisedHand from "./RaisedHand";
import ShowVisualizer from "./ShowVisualizer";
import { stringify } from "querystring";
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
  }
>(function LocalAttendeeCard(props, ref) {
  const { isVideoEnabled } = useLocalVideo();
  const { appState, setAppState } = useAppContext();
  const { videoEnabled, sharingContent, muted } = useAttendeeStatus(
    props.attendeeId
  );

  useEffect(() => {
    getNameAbbreviation();
  }, [appState.sessionState.meetingAttendees, props.sideView, props.meetingManager, muted]);
  useEffect(() => {
    setAppState((prevState) => ({
      ...prevState,
      sessionState: {
        ...prevState.sessionState,
        audioState: [
          ...prevState.sessionState.audioState,
          {
            volume: 0,
            mute: muted,
            attendeeId: `${props.attendeeId}${Date.now()}`,
          },
        ],
      },
    }));
  }, [videoEnabled, muted]);
  const attendeeDetailItems = appState.sessionState.meetingAttendees.find(
    (att) => att.user_id === props.nameID
  );

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
        {/* {props.audioState} */}

        <ShowVisualizer
          chimeAttendeeId={props.attendeeId}
          meetingManager={props.meetingManager as MeetingManager}
        />
      </div>
      <div className={` ${isVideoEnabled ? "left-3 top-3" : ""} z-10 absolute`}>
        <ReactionEmoji attendeeId={props.attendeeId} />
      </div>
      <div
        className={` ${
          isVideoEnabled ? "right-8 bottom-3" : "right-8 bottom-3"
        } z-10 absolute`}
      >
        <RaisedHand attendeeId={props.attendeeId} />
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
                      {/* <Image
                        src={`${attendeeDetails.picture}`}
                        alt=""
                        // width={50}
                        // height={50}

                        layout="fill"
                      /> */}
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
                            (attendeeDetailItems?.full_name as string)
                        )}
                      {/* {attendeeDetails?.full_name as string} */}
                    </div>
                  )}
                </>
              )}
              {/* w-[100px] h-[100px] max-w-[150px] max-h-[150px] */}

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
