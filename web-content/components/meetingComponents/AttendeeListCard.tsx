"use client";
import { getRemoteInitials } from "@/utils/meetingFunctions";
import RaisedHand from "./RaisedHand";
import { useAppContext } from "@/context/StoreContext";
import Image from "next/image";
import {
  useAttendeeAudioStatus,
  useAttendeeStatus,
} from "amazon-chime-sdk-component-library-react";
// import { VisualizerComp } from "./MeetingCardAudio";
import { useEffect, useRef, useState } from "react";
import { MicrophoneSlash1 } from "iconsax-react";

export const AttendeeListCard = ({
  attendeeId,
  externalID,
  audioState,
}: {
  attendeeId: string;
  externalID: any;
  audioState: JSX.Element;
}) => {
  const { appState } = useAppContext();
  const { meetingAttendees } = appState.sessionState;
  const attendeeDetailItems = meetingAttendees.find(
    (att) => att.user_id === externalID
  );

  const targetRef = useRef<HTMLDivElement | null>(null);
  const [localAudio, setLocalAudio] = useState<boolean>();

  useEffect(() => {
    const targetElement = targetRef.current;

    if (!targetElement) return;

    // Function to call when class changes
    const onClassChange = () => {
      // Call any function here when class changes
      if (targetElement.className.includes("active")) {
        setLocalAudio(false);
      } else {
        setLocalAudio(true);
      }
    };

    // Set up the MutationObserver
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          onClassChange(); // Call function when class changes
        }
      }
    });

    // Start observing the target element for class changes
    observer.observe(targetElement, {
      attributes: true, // Observe attribute changes
      attributeFilter: ["class"], // Specifically observe the 'class' attribute
    });

    // Clean up the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  const AudioComp = () => {
    return (
      <>
        {localAudio || localAudio === undefined ? (
          <div
            className={`flex justify-center items-end p-[6px] bg-transparent rounded-full w-[30px] h-[30px]`}
          >
            <MicrophoneSlash1 size="18" color="#5E29B7" />
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
    <div className=" flex justify-between items-center py-3 border-b border-solid border-b-[#EFEDED]">
      <div className=" flex items-center gap-x-2 overflow-hidden max-w-full whitespace-nowrap">
        {attendeeDetailItems?.picture && attendeeDetailItems?.picture !== "" ? (
          <Image
            src={attendeeDetailItems.picture}
            alt={attendeeDetailItems.full_name}
            width={32}
            height={32}
            className=" rounded-full w-8 h-8 min-w-8 object-cover"
          />
        ) : (
          <div className=" bg-cs-grey-800 w-[30px] h-[30px] min-w-[30px] rounded-full flex justify-center items-center text-cs-grey-50 uppercase text-sm">
            {getRemoteInitials(attendeeDetailItems?.full_name as string)}
          </div>
        )}

        <h4 className=" text-cs-grey-dark font-medium text-sm overflow-hidden text-ellipsis capitalize">
          {externalID && (attendeeDetailItems?.full_name as string)}
        </h4>
      </div>
      <div className=" flex items-center gap-x-1">
        <RaisedHand attendeeId={attendeeId} noBackground />
        <div className={`external-visualizer-${attendeeId}`} ref={targetRef}>
          <AudioComp />
        </div>
      </div>
    </div>
  );
};
