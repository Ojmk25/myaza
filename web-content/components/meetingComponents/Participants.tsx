import Image from "next/image";
import {
  MeetingManager,
  RosterAttendeeType,
} from "amazon-chime-sdk-component-library-react";
import closeIconPurple from "@/public/assets/images/closeIconPurple.svg";
import { AttendeeListCard } from "./AttendeeListCard";
import { useAppContext } from "@/context/StoreContext";
import { useEffect } from "react";

const Participants = ({
  attendees,
  sideViewFunc,
  meetingManager,
}: {
  attendees: RosterAttendeeType[];
  sideViewFunc: (value: string) => void;
  meetingManager: MeetingManager;
}) => {
  const { appState } = useAppContext();

  return (
    <div
      className={` h-full bg-cs-grey-50 border-solid border border-[#F1F1F1] rounded-[4px] px-2 @[300px]/bigScreenSideCards:px-4 pt-5 overflow-y-scroll no-scrollbar`}
    >
      <div className=" flex justify-between items-center">
        <h3 className=" text-cs-grey-dark font-medium @[300px]/bigScreenSideCards:text-2xl">
          Participants{" "}
          <span className=" text-cs-grey-100 font-medium text-sm @[300px]/bigScreenSideCards:text-base">
            ({attendees.length})
          </span>
        </h3>
        <Image
          src={closeIconPurple}
          alt="close-icon"
          onClick={() => sideViewFunc("")}
          className="cursor-pointer w-5 @[300px]/bigScreenSideCards:w-6"
        />
      </div>
      {/* <div className=" relative mt-5 mb-3">
        <input
          type="text"
          name=""
          id=""
          className=" w-full border border-cs-grey-300 h-8 @[300px]/bigScreenSideCards:h-10 rounded-[10px] outline-none pl-7 @[300px]/bigScreenSideCards:pl-10 placeholder:text-sm placeholder:font-normal"
          placeholder="Search for participants"
        />
        <SearchNormal1
          size="18"
          color="#898989"
          className=" absolute top-[7px] left-[10px] @[300px]/bigScreenSideCards:top-[12px] @[300px]/bigScreenSideCards:left-[14px] @[300px]/bigScreenSideCards:w-[18px] @[300px]/bigScreenSideCards:h-[18px]"
        />
      </div> */}

      <div className="">
        {attendees.map((attendee) => (
          <AttendeeListCard
            attendeeId={attendee.chimeAttendeeId}
            key={attendee.chimeAttendeeId}
            externalID={attendee.externalUserId}
            audioState={
              // <></>
              // <ShowVisualizer
              //   meetingManager={meetingManager}
              //   attendeeId={attendee.chimeAttendeeId}
              //   noBackground={true}
              // />
              // <VisualizerComp
              //   attendeeId={attendee.chimeAttendeeId}
              //   noBackground
              // />
              <></>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Participants;
