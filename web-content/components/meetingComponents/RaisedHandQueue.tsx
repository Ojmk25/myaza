import { useAppContext } from "@/context/StoreContext";
import { useEffect, useRef, useState } from "react";

interface AttendeeDetail {
  timestamp: string;
  message: string;
  externalUserID: string;
}

const RaisedHandQueue = () => {
  const { appState } = useAppContext();
  const [attendeeState, setAttendeeState] = useState<AttendeeDetail[]>([]);
  const timers = useRef<Map<string, NodeJS.Timeout>>(new Map()); // Map to store timers for each attendee

  useEffect(() => {
    const addOrUpdateAttendee = (newAttendee: AttendeeDetail) => {
      setAttendeeState((prevAttendees) => {
        // Check if the attendee with the same externalUserId already exists
        const attendeeExists = prevAttendees.some(
          (att) => att.externalUserID === newAttendee.externalUserID
        );

        if (newAttendee.timestamp === "") {
          // Remove attendee immediately if the timestamp is empty
          clearTimeout(timers.current.get(newAttendee.externalUserID)); // Clear any existing timer
          timers.current.delete(newAttendee.externalUserID); // Remove the timer from the map
          return prevAttendees.filter(
            (att) => att.externalUserID !== newAttendee.externalUserID
          );
        }

        if (!attendeeExists) {
          // Add the new attendee if it doesn't exist
          return [...prevAttendees, newAttendee];
        } else {
          // If attendee exists, update the attendee details
          return prevAttendees.map((att) =>
            att.externalUserID === newAttendee.externalUserID
              ? newAttendee
              : att
          );
        }
      });

      // If the timestamp is not empty, reset or start the timer for this attendee
      if (newAttendee.timestamp !== "") {
        // Clear any previous timer for this attendee
        if (timers.current.has(newAttendee.externalUserID)) {
          clearTimeout(timers.current.get(newAttendee.externalUserID)!);
        }

        // Set a new timer for 10 seconds
        const timer = setTimeout(() => {
          setAttendeeState((prevAttendees) =>
            prevAttendees.filter(
              (att) => att.externalUserID !== newAttendee.externalUserID
            )
          );
          timers.current.delete(newAttendee.externalUserID); // Remove the timer after completion
        }, 10000); // 10 seconds

        // Store the new timer
        timers.current.set(newAttendee.externalUserID, timer);
      }
    };

    // Call the function when attendeeDetailItems changes
    addOrUpdateAttendee(appState.sessionState.raisedHand);
  }, [appState.sessionState.raisedHand]);

  if (attendeeState.length !== 0 && attendeeState.length < 2) {
    return (
      <div className=" absolute bottom-0 z-40 text-cs-purple-650 bg-[#e1c6ff] p-2 max-w-80 rounded-lg">
        {attendeeState.map((item) => (
          <p className=" inline-block text-sm" key={item.externalUserID}>
            {Array.isArray(appState.sessionState.meetingAttendees)
              ? appState.sessionState.meetingAttendees.find(
                  (att) => att.user_id === item.externalUserID
                )?.full_name
              : ""}{" "}
            raised hand
          </p>
        ))}
      </div>
    );
  } else if (attendeeState.length > 1) {
    return (
      <div className=" absolute bottom-0 z-40 text-cs-purple-650 bg-[#e1c6ff] p-2 max-w-80 rounded-lg test2 text-sm">
        {
          appState.sessionState.meetingAttendees.find(
            (att) => att.user_id === attendeeState[0]?.externalUserID
          )?.full_name
        }{" "}
        and {attendeeState.length - 1} others raised hands
      </div>
    );
  }
};

export default RaisedHandQueue;
