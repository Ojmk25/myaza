import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as AWS from "aws-sdk/global";
import * as Chime from "aws-sdk/clients/chime";
import {
  ConsoleLogger,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  MeetingSessionConfiguration,
  DefaultActiveSpeakerPolicy,
  MessagingSessionConfiguration,
  DefaultMessagingSession,
} from "amazon-chime-sdk-js";

export default function App() {
  const [joining, setJoining] = useState<string>("");
  const [hadFinishedApplication, setFinishedApplication] = useState<boolean>(false);
  const [meetingSession, setMeetingSession] = useState<DefaultMeetingSession | null>(null);
  const [hasStartedMediaInputs, setStartedMediaInputs] = useState<boolean>(false);

  const handleJoin = (joiningFormData: { room: string }) => {
    setJoining(joiningFormData.room);
    createMeetingSession(joiningFormData)
      .then((it) => setMeetingSession(it))
      .catch(() => setJoining(""));
  };

  useEffect(() => {
    if (!meetingSession) {
      return;
    }

    const setupInput = async ({ audioId, videoId }: { audioId: string | null; videoId: string | null }) => {
      if (!audioId || !videoId) {
        throw new Error("No video nor audio input detected.");
      }

      if (audioId) {
        const audioInputDevices = await meetingSession.audioVideo.listAudioInputDevices();

        if (audioInputDevices.length) {
          await meetingSession.audioVideo.startAudioInput(audioId);
        }
      }

      if (videoId) {
        const videoInputDevices = await meetingSession.audioVideo.listVideoInputDevices();

        if (videoInputDevices.length) {
          const defaultVideoId = videoInputDevices[0].deviceId;
          await meetingSession.audioVideo.startVideoInput(
            videoId === "default" ? defaultVideoId : videoId
          );
          setStartedMediaInputs(true);
        }
      }
    };

    setupInput({ audioId: "default", videoId: "default" }).then(() => {
      const observer = {
        audioInputMuteStateChanged: (device: MediaDeviceInfo, muted: boolean) => {
          console.warn(
            "Device",
            device,
            muted ? "is muted in hardware" : "is not muted"
          );
        },
      };

      meetingSession.audioVideo.addDeviceChangeObserver(observer);

      meetingSession.audioVideo.start();

      const activeSpeakerCallback = (attendeeIds: string[]) => {
        if (!attendeeIds || !attendeeIds.length) {
          return;
        }

        const mostActiveAttendeeId = attendeeIds[0];
        const mostActiveAttendeeElement = document.getElementById(
          `video-${mostActiveAttendeeId}`
        );
        copyStreamToPinnedVideo(mostActiveAttendeeElement);
      };

      meetingSession.audioVideo.subscribeToActiveSpeakerDetector(
        new DefaultActiveSpeakerPolicy(),
        activeSpeakerCallback
      );
    });
  }, [meetingSession]);

  const isInSession = !!(meetingSession && hasStartedMediaInputs);

  return (
    <div>
      {/* Your JSX content */}
    </div>
  );
}

async function createMeetingSession({ room }: { room: string }) {
  const params = new URLSearchParams([["room", room]]);
  const meetingSessionResponse = await axios.get(
    "/chime-integration/meeting-session",
    {
      params,
    }
  );

  const { meetingResponse, attendeeResponse } = meetingSessionResponse.data;
  const configuration = new MeetingSessionConfiguration(
    meetingResponse,
    attendeeResponse
  );
  const meetingSession = new DefaultMeetingSession(
    configuration,
    new ConsoleLogger("Logger", LogLevel.INFO),
    new DefaultDeviceController(new ConsoleLogger("DeviceController", LogLevel.INFO))
  );

  const messagingSessionResponse = await axios.get(
    `/chime-integration/messaging-session/${meetingResponse.Meeting.MeetingId}`
  );
  const {
    msgChannelMembershipResponse,
    endpointResponse,
    accessKeyId,
    secretAccessKey,
    region,
  } = messagingSessionResponse.data;
  const chime = new Chime({
    region,
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      // sessionToken: "sessionToken"
    },
  });
  const messagingConfiguration = new MessagingSessionConfiguration(
    msgChannelMembershipResponse.Member.Arn,
    meetingResponse.Meeting.MeetingId,
    endpointResponse.Endpoint.Url,
    chime,
    AWS
  );
  window.messagingConfiguration = messagingConfiguration;
  const messagingSession = new DefaultMessagingSession(
    messagingConfiguration,
    new ConsoleLogger("Logger", LogLevel.INFO)
  );
  messagingSession.addObserver({
    messagingSessionDidStart: () => {
      console.log("Messaging Connection started!");
    },
    messagingSessionDidReceiveMessage: (message) => {
      console.log("Messaging Connection received message", message);
    },
  });
  window.messagingSession = messagingSession;

  window.sendMessage = async function sendMessage(content: string) {
    return await axios.post("/chime-integration/message", {
      channelMembership: msgChannelMembershipResponse,
      content,
    });
  };

  window.meetingSession = meetingSession;
  messagingSession.start();
  return meetingSession;
}

// Other components...

function copyStreamToPinnedVideo(
  originatingVideoElement: HTMLVideoElement | null,
  pinnedVideoElement: HTMLVideoElement = document.getElementById("video-pinned") as HTMLVideoElement
) {
  if (!originatingVideoElement || !originatingVideoElement.srcObject) {
    console.error(
      "Invalid originating video element/stream",
      originatingVideoElement
    );
    return;
  }

  if (!pinnedVideoElement) {
    console.error("Invalid pinned video element", pinnedVideoElement);
    return;
  }

  if (pinnedVideoElement.srcObject === originatingVideoElement.srcObject) {
    return;
  }

  pinnedVideoElement.muted = true;
  pinnedVideoElement.volume = 0;
  pinnedVideoElement.setAttributeNode(document.createAttribute("autoplay"));
  pinnedVideoElement.setAttributeNode(document.createAttribute("playsinline"));
  pinnedVideoElement.srcObject = originatingVideoElement.srcObject;
}
