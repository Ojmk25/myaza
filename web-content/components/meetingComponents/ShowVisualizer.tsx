import { useEffect, useRef, useState } from "react";
import { MicrophoneSlash1 } from "iconsax-react";
import {
  RosterAttendeeType,
  MeetingManager,
  useMeetingManager,
  useAttendeeStatus,
} from "amazon-chime-sdk-component-library-react";
import { useAppContext } from "@/context/StoreContext";

const ShowVisualizer = ({
  chimeAttendeeId,
  meetingManager,
  noBackground,
  externalUserId,
  side,
}: {
  chimeAttendeeId: string;
  meetingManager?: MeetingManager;
  noBackground?: boolean;
  externalUserId: string;
  side?: string;
}) => {
  const { appState, setAppState } = useAppContext();
  const meetingM = useMeetingManager();
  const volumeRef = useRef(0);
  const muteRef = useRef(true);
  const [localMute, setLocalMute] = useState<boolean>();
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
        setAppState((prevState) => {
          const existingAttendee = prevState.sessionState.audioState.find(
            (item) => item.attendeeId === `${attendeeId}`
          );

          // If attendee already exists, do not add a new one
          if (existingAttendee) {
            return prevState;
          }

          // Otherwise, add the new attendee
          return {
            ...prevState,
            sessionState: {
              ...prevState.sessionState,
              audioState: [
                ...prevState.sessionState.audioState,
                {
                  video: videoEnabled,
                  mute: muted,
                  attendeeId: `${attendeeId}`,
                  externalUserId: externalUserId,
                },
              ],
            },
          };
        });

        // updateVisualizer();
        // updateExternalVisualizer();
        // setLocalMute(muted as boolean);
        // setLocalMute(muteRef.current);
        if (muted) {
          setLocalMute(muted);
          setAppState((prevState) => {
            const updatedAudioState = prevState.sessionState.audioState.map(
              (item) =>
                item.attendeeId === `${attendeeId}`
                  ? {
                      ...item,
                      mute: muted, // Update mute status only
                    }
                  : item
            );

            return {
              ...prevState,
              sessionState: {
                ...prevState.sessionState,
                audioState: updatedAudioState,
              },
            };
          });
        } else if (muted === false) {
          setLocalMute(muted);
          setAppState((prevState) => {
            const updatedAudioState = prevState.sessionState.audioState.map(
              (item) =>
                item.attendeeId === `${attendeeId}`
                  ? {
                      ...item,
                      mute: muted, // Update mute status only
                    }
                  : item
            );

            return {
              ...prevState,
              sessionState: {
                ...prevState.sessionState,
                audioState: updatedAudioState,
              },
            };
          });
        }

        // updateVisualizerTest();
        // updateExternalVisualizerTest();
        updateTileVisualizer();
      }
    };

    const updateTileVisualizer = () => {
      const factor = [6, 15, 25, 15, 6]; // Visualizer bar height factors
      const visualizerBars = document.querySelectorAll(
        `.tileVisualizer-${chimeAttendeeId}`
      );
      // console.log(visualizerBars, volumeRef.current);

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

    const removeItem = (
      attendeeId: string,
      volume: number | null,
      muted: boolean | null
    ) => {
      console.log(
        attendeeId,
        volume,
        muted,
        "THIS PERSON JUST UNSUBSCRIBES OUT OF THE MEETING"
      );
    };

    return () => {
      meetingM.audioVideo?.realtimeUnsubscribeFromVolumeIndicator(
        chimeAttendeeId,
        removeItem
      );
    };
  }, [meetingM, chimeAttendeeId, muted, muteRef.current]);

  if (localMute === true || localMute === undefined) {
    return (
      <div className={`visualizer-${chimeAttendeeId}`}>
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
      </div>
    );
  } else {
    return (
      <div
        className={`flex justify-center items-center p-[6px] bg-[#6c3ec2] rounded-full w-[30px] h-[30px] gap-x-[2px] tileVisualizer-${chimeAttendeeId}`}
      >
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`bar bg-cs-grey-50 transition-all test ${side}`}
            style={{ width: "4px", height: "3px" }}
          />
        ))}
      </div>
    );
  }
};

export default ShowVisualizer;
// Working
