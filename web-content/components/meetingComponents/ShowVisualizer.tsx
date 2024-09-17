import { useEffect, useRef, useState } from "react";
import { MicrophoneSlash1 } from "iconsax-react";
import {
  RosterAttendeeType,
  MeetingManager,
  useMeetingManager,
  useAttendeeStatus,
} from "amazon-chime-sdk-component-library-react";
import ReactDOM from "react-dom/client";
import { useAppContext } from "@/context/StoreContext";

const ShowVisualizer = ({
  chimeAttendeeId,
  meetingManager,
  noBackground,
}: {
  chimeAttendeeId: string;
  meetingManager: MeetingManager;
  noBackground?: boolean;
}) => {
  const { appState, setAppState } = useAppContext();
  const meetingM = useMeetingManager();
  const volumeRef = useRef(0);
  const muteRef = useRef(true);
  const [localMute, setLocalMute] = useState(true);
  const sideVisualizerContainerRef = useRef(false);
  const { videoEnabled, sharingContent, muted } =
    useAttendeeStatus(chimeAttendeeId);

  const sideVisualizer = document.querySelector<HTMLDivElement>(
    `.external-visualizer-${chimeAttendeeId}`
  ) as HTMLDivElement;

  useEffect(() => {
    const volumeIndicatorCallback = (
      attendeeId: string,
      volume: number | null,
      muted: boolean | null
    ) => {
      if (attendeeId === chimeAttendeeId) {
        volumeRef.current = volume || 0;
        muteRef.current = muted || false;
        // updateVisualizer();
        // updateExternalVisualizer();
        // setLocalMute(muted as boolean);
        setLocalMute(muteRef.current);

        updateVisualizerTest();
        updateExternalVisualizerTest();
      }
    };

    const updateVisualizer = () => {
      const factor = [6, 15, 25, 15, 6]; // Visualizer bar height factors
      const visualizerBars = document.querySelectorAll(
        `.visualizer-${chimeAttendeeId} .bar`
      );

      if (visualizerBars) {
        visualizerBars.forEach((bar, index) => {
          const barElement = bar as HTMLElement;

          barElement.style.height = `${Math.max(
            3,
            volumeRef.current * factor[index]
          )}px`;
        });
      }

      // const getAllVisualizerContainer = document.querySelectorAll(
      //   `.visualizer-${chimeAttendeeId}`
      // );
    };

    const updateVisualizerTest = () => {
      const factor = [6, 15, 25, 15, 6]; // Visualizer bar height factors
      const visualizerBars = document.querySelectorAll(
        `.visualizer-${chimeAttendeeId}`
      );

      visualizerBars.forEach((item) => {
        const conte = item.querySelectorAll(".bar");
        if (conte) {
          conte.forEach((bar, index) => {
            const barElement = bar as HTMLElement;

            barElement.style.height = `${Math.max(
              3,
              volumeRef.current * factor[index]
            )}px`;
          });
        }
      });
    };

    const updateExternalVisualizerTest = () => {
      const factor = [6, 15, 25, 15, 6]; // Visualizer bar height factors
      const visualizerBars = document.querySelectorAll(
        `.external-visualizer-${chimeAttendeeId}`
      );

      visualizerBars.forEach((item) => {
        const conte = item.querySelectorAll(".bar");
        muteRef.current
          ? item.classList.remove("active")
          : item.classList.add("active");
        if (conte) {
          conte.forEach((bar, index) => {
            const barElement = bar as HTMLElement;

            barElement.style.height = `${Math.max(
              3,
              volumeRef.current * factor[index]
            )}px`;
          });
        }
      });
    };

    const updateExternalVisualizer = () => {
      const factor = [6, 15, 25, 15, 6]; // Visualizer bar height factors
      const visualizerBars = document.querySelectorAll(
        `.external-visualizer-${chimeAttendeeId} .bar`
      );

      if (visualizerBars) {
        visualizerBars.forEach((bar, index) => {
          const barElement = bar as HTMLElement;

          barElement.style.height = `${Math.max(
            3,
            volumeRef.current * factor[index]
          )}px`;
        });
      }
    };

    meetingM.audioVideo?.realtimeSubscribeToVolumeIndicator(
      chimeAttendeeId,
      volumeIndicatorCallback
    );

    return () => {
      meetingM.audioVideo?.realtimeUnsubscribeFromVolumeIndicator(
        chimeAttendeeId
      );
    };
  }, [meetingM, chimeAttendeeId, muted, muteRef.current]);

  console.log(chimeAttendeeId, localMute);

  return (
    <div className={`visualizer-${chimeAttendeeId}`}>
      {localMute ? (
        <div
          className={`flex justify-center items-end p-[6px] ${
            noBackground ? "bg-transparent" : "bg-[#333333]"
          } rounded-full w-[30px] h-[30px]`}
        >
          <MicrophoneSlash1
            size="18"
            color={noBackground ? "#5E29B7" : "#FAFAFA"}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center p-[6px] bg-[#6c3ec2] rounded-full w-[30px] h-[30px] gap-x-[2px]">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="bar bg-cs-grey-50 transition-all test"
              style={{ width: "4px", height: "3px" }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowVisualizer;
// Working
