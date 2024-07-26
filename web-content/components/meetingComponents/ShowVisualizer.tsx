import {
  MeetingManager,
  RosterAttendeeType,
} from "amazon-chime-sdk-component-library-react";
import { MicrophoneSlash1 } from "iconsax-react";
import { useEffect, useState } from "react";

const ShowVisualizer = ({
  attendee,
  meetingManager,
  noBackground,
}: {
  attendee: RosterAttendeeType;
  meetingManager: MeetingManager;
  noBackground?: boolean;
}) => {
  const [audioState, setAudioState] = useState<{
    attendeeId: string;
    volume: number;
    mute: boolean | null;
    signalStrength: number | null;
  }>({
    attendeeId: "",
    volume: 0,
    mute: true,
    signalStrength: 0,
  });

  useEffect(() => {
    const volumeIndicatorCallback = (
      attendeeId: string,
      volume: number | null,
      muted: boolean | null,
      signalStrength: number | null
    ) => {
      setAudioState({
        attendeeId: attendeeId,
        volume: volume || 0,
        mute: muted,
        signalStrength: signalStrength || 0,
      });
    };

    meetingManager.audioVideo?.realtimeSubscribeToVolumeIndicator(
      attendee.chimeAttendeeId,
      volumeIndicatorCallback
    );

    return () => {
      meetingManager.audioVideo?.realtimeUnsubscribeFromVolumeIndicator(
        attendee.chimeAttendeeId
      );
    };
  }, [meetingManager, attendee, audioState.signalStrength]);

  const visualizerStyle = (factor: number) => ({
    height: `${Math.max(3, audioState.volume * factor)}px`,
    width: "4px",
  });

  const audioVisualizer = (
    <>
      {audioState.mute ? (
        <div
          className={`flex justify-center items-end p-[6px] ${
            noBackground ? " bg-transparent" : "bg-[#333333]"
          } rounded-full  w-[30px] h-[30px]`}
        >
          <MicrophoneSlash1
            size="18"
            color={noBackground ? "#5E29B7" : "#FAFAFA"}
          />
          {/* absolute top-[10px] right-[10px] */}
        </div>
      ) : (
        // absolute top-[10px] right-[10px]
        <div className="flex justify-center items-center p-[6px] bg-[#6c3ec2] rounded-full  w-[30px] h-[30px] gap-x-[2px]">
          <div style={visualizerStyle(6)} className="bg-cs-grey-50"></div>
          <div style={visualizerStyle(15)} className="bg-cs-grey-50"></div>
          <div style={visualizerStyle(25)} className="bg-cs-grey-50"></div>
          <div style={visualizerStyle(15)} className="bg-cs-grey-50"></div>
          <div style={visualizerStyle(6)} className="bg-cs-grey-50"></div>
        </div>
      )}
    </>
  );

  return <div>{audioVisualizer}</div>;
};

export default ShowVisualizer;
