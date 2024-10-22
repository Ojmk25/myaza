import { useState, useEffect } from "react";
import { MeetingManager } from "amazon-chime-sdk-component-library-react";

const useVolumeIndicator = (
  meetingManager: MeetingManager,
  attendeeId: string
) => {
  const [audioState, setAudioState] = useState({
    volume: 0,
    mute: true,
    attendeeId,
  });

  useEffect(() => {
    const volumeIndicatorCallback = (
      attendeeId: string,
      volume: number | null,
      muted: boolean | null,
      signalStrength: number | null
    ) => {
      setAudioState({
        volume: volume || 0,
        mute: muted || false,
        attendeeId: attendeeId,
      });
    };

    meetingManager.audioVideo?.realtimeSubscribeToVolumeIndicator(
      attendeeId,
      volumeIndicatorCallback
    );

    return () => {
      meetingManager.audioVideo?.realtimeUnsubscribeFromVolumeIndicator(
        attendeeId
      );
    };
  }, [meetingManager, attendeeId]);

  return audioState;
};

export default useVolumeIndicator;
