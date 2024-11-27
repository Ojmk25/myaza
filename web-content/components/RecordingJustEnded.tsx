import { useAppContext } from "@/context/StoreContext";
import { useEffect, useState } from "react";

const RecordingJustEnded = () => {
  const { appState, setAppState } = useAppContext();
  const { meetingAttendees, recordingJustStopped } = appState.sessionState;

  const recordingHostName = meetingAttendees.find(
    (user) => user.user_id === recordingJustStopped.externaluserId
  );

  useEffect(() => {
    // Set a timeout when the component loads
    const timeoutId = setTimeout(() => {
      setAppState((prevState) => ({
        ...prevState,
        sessionState: {
          ...prevState.sessionState,
          recordingJustStopped: { externaluserId: "", value: false },
        },
      }));
    }, 2000);

    // Cleanup function to clear the timeout when the component unmounts
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  return (
    <div className=" flex items-center p-1 rounded mx-2 bg-[#FAF0FF] px-4 border border-solid border-[#391487] backdrop-blur-2xl md:w-fit md:pr-10">
      <div className=" text-cs-grey-dark font-medium metro-medium text-sm md:text-base">
        {recordingHostName?.full_name} has ended the recording
      </div>
    </div>
  );
};

export default RecordingJustEnded;
