import { useAppContext } from "@/context/StoreContext";
import { useEffect, useRef, useState } from "react";

const RaisedHandQueue = () => {
  const { appState } = useAppContext();
  const { raisedHand } = appState.sessionState;
  const previousRaisedHandLength = useRef<number>(0);
  const [displayQueue, setDisplayQueue] = useState(false);

  useEffect(() => {
    const currentRaisedHandLength = raisedHand.length;
    if (currentRaisedHandLength > previousRaisedHandLength.current) {
      setDisplayQueue(true);
    }
    const timerId = setTimeout(() => {
      setDisplayQueue(false);
    }, 10000);
    // Update the ref to the current length
    previousRaisedHandLength.current = currentRaisedHandLength;
    return () => {
      clearTimeout(timerId);
    };
  }, [raisedHand]);

  if (raisedHand.length !== 0 && raisedHand.length < 2 && displayQueue) {
    return (
      <div className=" absolute bottom-0 z-40 text-cs-purple-650 bg-[#e1c6ff] p-2 max-w-80 rounded-lg">
        {appState.sessionState.raisedHand.map((item) => (
          <p className=" inline-block text-sm" key={item.externalUserID}>
            <span className=" capitalize">
              {Array.isArray(appState.sessionState.meetingAttendees)
                ? appState.sessionState.meetingAttendees.find(
                    (att) => att.user_id === item.externalUserID
                  )?.full_name
                : ""}
            </span>{" "}
            raised hand
          </p>
        ))}
      </div>
    );
  } else if (raisedHand.length > 1) {
    return (
      <div className=" absolute bottom-0 z-40 text-cs-purple-650 bg-[#e1c6ff] p-2 max-w-80 rounded-lg test2 text-sm">
        <span>
          {
            appState.sessionState.meetingAttendees.find(
              (att) =>
                att.user_id ===
                appState.sessionState.raisedHand[0]?.externalUserID
            )?.full_name
          }
        </span>{" "}
        and {raisedHand.length - 1} other{`${raisedHand.length > 2 ? "s" : ""}`}{" "}
        raised hands
      </div>
    );
  }
};

export default RaisedHandQueue;
