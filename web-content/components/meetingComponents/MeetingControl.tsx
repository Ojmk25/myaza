"use client";
import {
  Coffee,
  EmojiHappy,
  Messages1,
  Microphone,
  MicrophoneSlash1,
  Monitor,
  More,
  MoreCircle,
  ProfileAdd,
  RecordCircle,
  SearchNormal1,
  Video,
  VideoSlash,
} from "iconsax-react";
import Image from "next/image";
import { lazy, useEffect, useLayoutEffect, useRef, useState } from "react";
import DateTimeDisplay from "../../utils/getDate";
import {
  useContentShareControls,
  useContentShareState,
  useLocalVideo,
  MeetingManager,
  useAudioVideo,
  useMeetingStatus,
  useAttendeeStatus,
  useToggleLocalMute,
} from "amazon-chime-sdk-component-library-react";
import raisedHand from "@/public/assets/images/raisedHand.svg";
import raisedHandWhite from "@/public/assets/images/raisedHandWhite.svg";
import captureGray from "@/public/assets/images/captureGray.svg";

import { useRouter } from "next/router";
import { useAppContext } from "@/context/StoreContext";
import { useSessionStorage } from "@/hooks/useStorage";
import { useMeetingManager } from "amazon-chime-sdk-component-library-react";
import {
  endMeetingForAll,
  listAttendees,
  startRecording,
  stopRecording,
} from "@/services/meetingServices";
import { emojis } from "@/constants/emojis";
import ReactDOM from "react-dom/client";
// import * as LottiePlayer from "@lottiefiles/lottie-player";
import captureWhite from "@/public/assets/images/captureWhite.svg";
import capturePurple from "@/public/assets/images/capturePurple.svg";
import { getIdFromArn } from "@/utils/meetingFunctions";
import greenCheck from "@/public/assets/svgs/green-check.svg";

export default function MeetingControl({
  bgColor,
  onOpen,
  sideView,
  sideViewFunc,
  meetingManager,
  attendeIDString,
  meetingDetails,
  externalID,
  startTranscriptionProp,
  stopTranscriptionProp,
  transcriptionStatus,
}: {
  bgColor: boolean;
  onOpen: () => void;
  sideView?: string;
  sideViewFunc: (value: string) => void;
  meetingManager: MeetingManager;
  attendeIDString: string | null | undefined;
  meetingDetails: any;
  externalID: string | null | undefined;
  startTranscriptionProp: () => void;
  stopTranscriptionProp: () => void;
  transcriptionStatus: boolean;
}) {
  const currentTimeRef = useRef<HTMLDivElement>(null);
  const { isVideoEnabled, toggleVideo } = useLocalVideo();
  const { toggleContentShare } = useContentShareControls();
  const { isLocalUserSharing } = useContentShareState();
  const [otherViews, setOtherViews] = useState<string[]>([]);
  const navigate = useRouter();
  const audioVideo = useAudioVideo();
  const [raiseHandAdded, setRaiseHandAdded] = useState(false);
  const [videoStatus] = useSessionStorage("videoStatus", "no");
  const [audioStatus] = useSessionStorage("audioStatus", "no");
  const [setupDone, setSetupDone] = useState(false);
  const { appState, setAppState } = useAppContext();
  const hasRunRef = useRef(false);
  const raiseHandSoundRef = useRef<HTMLAudioElement>(null);
  const { muted, toggleMute } = useToggleLocalMute();
  const router = useRouter();
  const [mediaPipeLineId, setMediaPipelineId] = useState("");
  const [expressJoin, setExpressJoin] = useSessionStorage(
    "meetingJoiner",
    "no"
  );
  const [localMeetingAttendees, setLocalMeetingAttendees] = useSessionStorage(
    "meetingAttendess",
    ""
  );
  const [miniroster, setMiniRoster] = useState<string[]>([]);
  const [prevLength, setPrevLength] = useState(0);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  useEffect(() => {
    if (otherViews.includes("Raise-Hand")) {
      setRaiseHandAdded(true);
    } else {
      setRaiseHandAdded(false);
    }
  }, [otherViews]);

  useEffect(() => {
    if (raiseHandAdded) {
      const timeout = setTimeout(() => {
        setOtherViews((prevOtherViews) =>
          prevOtherViews.filter((item) => item !== "Raise-Hand")
        );
        setRaiseHandAdded(false); // Reset the state after removing "Raise-Hand"
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [raiseHandAdded]);

  useEffect(() => {
    const updateCurrentTime = () => {
      const displayDate = DateTimeDisplay;
      const { hours, minutes, ampm } = displayDate();
      if (currentTimeRef.current !== null) {
        currentTimeRef.current.textContent = `${
          hours < 10 ? "0" + hours : hours
        }:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
      }
    };
    // Update the time initially
    updateCurrentTime();

    // Update the time every minute
    const intervalId = setInterval(updateCurrentTime, 1000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleLocalSideView = (value: string) => {
    if (value === sideView) {
      sideViewFunc("");
    } else {
      sideViewFunc(value);
    }
  };

  const handleOtherViews = (value: string) => {
    setOtherViews((prevOtherViews) => {
      if (prevOtherViews.includes(value)) {
        return prevOtherViews.filter((item) => item !== value);
      } else {
        return [...prevOtherViews, value];
      }
    });
  };

  const sendRaiseHand = (
    timestamp: string,
    attendee: string,
    externalUserID: string
  ) => {
    handleOtherViews("Raise-Hand");
    let timestampVar = timestamp;
    let attendeeVar = attendee;
    let raiseHandExternalUserID = externalUserID;
    if (otherViews.includes("Raise-Hand")) {
      timestampVar = "";
      attendeeVar = "";
      raiseHandExternalUserID = externalUserID;
    }

    // Update local state immediately
    setAppState((prevState) => ({
      ...prevState,
      sessionState: {
        ...prevState.sessionState,
        raisedHand: {
          timestamp: timestampVar,
          message: attendee,
          externalUserID: raiseHandExternalUserID,
        },
      },
    }));

    // Check if audioVideo is available
    if (!audioVideo) return;
    const message = JSON.stringify({
      timestamp: timestampVar,
      message: attendee,
      externalUserID: raiseHandExternalUserID,
    });

    // Send the message
    audioVideo.realtimeSendDataMessage("raise-hand", message);
  };

  const handleLeaveMeeting = async () => {
    if (meetingManager) {
      meetingManager.leave().then(() => {
        meetingManager.meetingSession?.audioVideo.stopVideoInput();
        meetingManager.meetingSession?.audioVideo.stopLocalVideoTile();
        meetingManager.meetingSession?.audioVideo.stop();
        meetingManager.audioVideo?.stop();
        navigate.push("/");
      });
    }
  };

  // meetingEnded
  // const observer = {
  //   eventDidReceive(name, attributes) {
  //     // Handle a meeting event.
  //   }
  // }

  // meetingSession.eventController.addObserver(observer);

  // eventDidReceive(name, attributes) {
  //   switch (name) {
  //     case 'audioInputFailed':
  //       console.error(`Failed to choose microphone: ${attributes.audioInputErrorMessage} in `, attributes);
  //       break;
  //     case 'videoInputFailed':
  //       console.error(`Failed to choose camera: ${attributes.videoInputErrorMessage} in `, attributes);
  //       break;
  //     case 'meetingStartFailed':
  //       console.error(`Failed to start a meeting: ${attributes.meetingErrorMessage} in `, attributes);
  //       break;
  //     case 'meetingFailed':
  //       console.error(`Failed during a meeting: ${attributes.meetingErrorMessage} in `, attributes);
  //       break;
  //     default:
  //       break;
  // }

  const handleEndMeeting = async () => {
    try {
      await endMeetingForAll({
        chime_meeting_id: meetingDetails?.meeting_info?.MeetingId,
      });
    } catch (error) {
      console.log(error);
    }

    if (meetingManager) {
      meetingManager.leave().then(() => {
        meetingManager.meetingSession?.audioVideo.stopVideoInput();
        meetingManager.meetingSession?.audioVideo.stopLocalVideoTile();
        meetingManager.meetingSession?.audioVideo.stop();
        meetingManager.audioVideo?.stop();
        navigate.push("/").then(() => window.location.reload());
      });
    }
  };

  useEffect(() => {
    if (!audioVideo) {
      return;
    }

    // Callback function to handle attendee presence changes
    const handleAttendeePresence = async (
      attendeeId: string,
      present: boolean
    ) => {
      if (present) {
        audioVideo.addObserver({
          videoTileDidUpdate: (tileState) => {
            const attendeeId = tileState.boundAttendeeId;
            tileState.active
              ? setAppState((prevState) => {
                  const updatedAudioState =
                    prevState.sessionState.audioState.map((item) =>
                      item.attendeeId === `${attendeeId}`
                        ? {
                            ...item,
                            video: true, // Update video status only
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
                })
              : setAppState((prevState) => {
                  const updatedAudioState =
                    prevState.sessionState.audioState.map((item) =>
                      item.attendeeId === `${attendeeId}`
                        ? {
                            ...item,
                            video: false, // Update video status only
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
          },
        });

        if (raiseHandSoundRef.current)
          raiseHandSoundRef.current.src = "/assets/sounds/ding-126626.mp3";
        raiseHandSoundRef.current?.play();
        if (!setupDone && !hasRunRef.current) {
          hasRunRef.current = true;
          const cameraOn = videoStatus === "yes";
          const microphoneOn = audioStatus === "yes";
          if (cameraOn && !isVideoEnabled) {
            toggleVideo();
          }

          if (!microphoneOn) {
            // toggleMute();
            meetingManager.meetingSession?.audioVideo.realtimeMuteLocalAudio();
          }

          setSetupDone(true);
        }
        // await getAttendeesList(router.query.link as string);

        setMiniRoster((prevRoster) => [...prevRoster, attendeeId]); // Add attendee to roster
      } else {
        setAppState((prevState) => {
          const updatedAudioState = prevState.sessionState.audioState.filter(
            (item) => item.attendeeId !== attendeeId
          );

          return {
            ...prevState,
            sessionState: {
              ...prevState.sessionState,
              audioState: updatedAudioState,
            },
          };
        });
        // Remove attendee from the roster
        setMiniRoster((prevRoster) =>
          prevRoster.filter((attendee) => attendee !== attendeeId)
        );
      }
    };

    // Subscribe to attendee presence changes
    audioVideo.realtimeSubscribeToAttendeeIdPresence(handleAttendeePresence);

    // Cleanup function to unsubscribe from attendee presence changes
    return () => {
      audioVideo.realtimeUnsubscribeToAttendeeIdPresence(
        handleAttendeePresence
      );
    };
  }, [audioVideo, router.isReady]);

  useEffect(() => {
    const updateRoster = async () => {
      if (miniroster.length > prevLength) {
        await getAttendeesList(router.query.link as string);
      }
    };
    updateRoster();
    setPrevLength(miniroster.length); // Update previous length
  }, [miniroster.length]);

  function updateSessionStorageArray(key: string, newArray: any[]) {
    // Check if the item exists in session storage
    const storedData = sessionStorage.getItem(key);

    let updatedArray: any[];

    if (storedData) {
      // Parse the existing array from session storage
      const parsedArray = JSON.parse(storedData);

      // Merge the arrays
      const mergedArray = [...parsedArray, ...newArray];

      // Remove duplicates by filtering the array (assuming you want to remove exact duplicates)
      updatedArray = mergedArray.filter(
        (item, index, self) =>
          self.findIndex((i) => JSON.stringify(i) === JSON.stringify(item)) ===
          index
      );
    } else {
      // If the item doesn't exist, just use the new array
      updatedArray = newArray;
    }

    // Save the updated array back to session storage
    sessionStorage.setItem(key, JSON.stringify(updatedArray));
  }

  const getAttendeesList = async (meetingId: string) => {
    let allAttendees: any[] = []; // Array to hold all the attendees
    let nextToken: string | null = null;

    try {
      do {
        // Make the API call with the current next_token (or without it for the first call)
        const response = await listAttendees({
          meeting_id: meetingId,
          next_token: nextToken, // Pass the token, if it's null, it will be ignored
        });

        if (response) {
          const { data } = response.data.body;

          // Merge current page of attendees with the allAttendees array
          allAttendees = [...allAttendees, ...data?.attendees];

          // Update the nextToken, which will control the loop
          nextToken = data?.next_token || null;

          console.log(data?.attendees, data?.next_token);
        }
      } while (nextToken !== null); // Continue while there is a next_token
      setAppState((prevState) => ({
        ...prevState,
        sessionState: {
          ...prevState.sessionState,
          meetingAttendees: allAttendees,
        },
      }));

      // Return the complete array of attendees
      return allAttendees;
    } catch (error) {
      console.log("Error fetching attendees:", error);
      return []; // Return an empty array in case of an error
    }
  };

  // ("Missing required body field: media_pipeline_arn, which must be a str");

  const handleStartRecording = async () => {
    try {
      const data = await startRecording({
        meeting_id: meetingDetails?.meeting_info?.ExternalMeetingId,
      });
      setMediaPipelineId(data?.data?.body?.data?.MediaPipelineArn);
      broadCastRecording(true);
      handleOtherViews("Record");
    } catch (error) {
      console.log(error);
    }
  };
  const handleStopRecording = async () => {
    try {
      const data = await stopRecording({
        meeting_id: meetingDetails?.meeting_info?.ExternalMeetingId,
        // "Missing required body field: media_pipeline_arn, which must be a str"
        //@ts-ignore
        // user_id: "",
        // media_pipeline_arn:
        //   "arn:aws:chime:us-east-1:165553610930:media-pipeline/06601acf-ac26-4436-9ae1-31a21e241725",
        media_pipeline_arn: mediaPipeLineId,
        media_pipeline_id: getIdFromArn(mediaPipeLineId) as string,
        // media_pipeline_id: "06601acf-ac26-4436-9ae1-31a21e241725",
        // "MediaPipelineArn": "arn:aws:chime:us-east-1:165553610930:media-pipeline/06601acf-ac26-4436-9ae1-31a21e241725"
      });
      if (data?.data.statusCode === 200) {
        broadCastRecording(false);
        handleOtherViews("Record");
        setMediaPipelineId("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Cleanup the audio when the component unmounts
    if (
      appState.sessionState.raisedHand.message !== "" &&
      appState.sessionState.raisedHand.timestamp !== "" &&
      raiseHandSoundRef.current
    ) {
      raiseHandSoundRef.current.src =
        "/assets/sounds/message-incoming-2-199577.mp3";
      raiseHandSoundRef.current.play();
    }
    return () => {
      if (raiseHandSoundRef.current) {
        raiseHandSoundRef.current.pause();
      }
    };
  }, [appState.sessionState.raisedHand.timestamp, audioVideo]);

  const sendReaction = (
    sender: string,
    emoji: string,
    externalUserID: string,
    lottiecode: string
  ) => {
    // Update local state immediately
    setAppState((prevState) => ({
      ...prevState,
      sessionState: {
        ...prevState.sessionState,
        reaction: {
          message: emoji,
          sender: sender,
          senderExternalId: externalUserID,
          lottieCode: lottiecode,
        },
      },
    }));

    // Check if audioVideo is available
    if (!audioVideo) return;

    // Create and send the message
    const message = JSON.stringify({
      sender: sender,
      emoji: emoji,
      senderExternalId: externalUserID,
      lottieCode: lottiecode,
    });

    meetingManager.audioVideo?.realtimeSendDataMessage("reaction", message);
  };

  const broadCastRecording = (value: boolean) => {
    // Update local state immediately
    setAppState((prevState) => ({
      ...prevState,
      sessionState: {
        ...prevState.sessionState,
        recordMeeeting: value,
      },
    }));

    // Check if audioVideo is available
    if (!audioVideo) return;

    // Create and send the message
    const message = JSON.stringify(value);

    meetingManager.audioVideo?.realtimeSendDataMessage("recording", message);
  };

  useEffect(() => {
    if (!audioVideo) return;

    const handleDataMessage = (dataMessage: {
      data: AllowSharedBufferSource | undefined;
    }) => {
      const message = new TextDecoder().decode(dataMessage.data);
      const parsedMessage = JSON.parse(message);

      setAppState((prevState) => ({
        ...prevState,
        sessionState: {
          ...prevState.sessionState,
          recordMeeeting: parsedMessage,
        },
      }));
    };

    audioVideo?.realtimeSubscribeToReceiveDataMessage(
      "recording",
      handleDataMessage
    );

    return () => {
      audioVideo?.realtimeUnsubscribeFromReceiveDataMessage("recording");
    };
  }, [audioVideo]);

  useEffect(() => {
    const emojis = document.querySelectorAll<HTMLButtonElement>(".emoji-list");
    const container = document.querySelector<HTMLDivElement>(".meetingScreen");
    if (!container || emojis.length === 0) return;

    const handleEmojiClick = () => {
      const lottieEl = document.createElement("div");
      lottieEl.classList.add("emoji-animate");
      const root = ReactDOM.createRoot(lottieEl);
      // const attendeeDetailItems = appState.sessionState.meetingAttendees.find(
      //   (att) => att.user_id === appState.sessionState.reaction.senderExternalId
      // );
      const attendeeDetailItems = Array.isArray(
        appState.sessionState.meetingAttendees
      )
        ? appState.sessionState.meetingAttendees.find(
            (att) =>
              att.user_id === appState.sessionState.reaction.senderExternalId
          )
        : null; // Return null or handle the case where it's not an array
      function getRandomNumber(): number {
        const numbers = [0, 150, 300];
        const randomIndex = Math.floor(Math.random() * numbers.length);
        return numbers[randomIndex];
      }

      root.render(
        <div className=" flex flex-col justify-center items-center">
          {appState.sessionState.reaction.lottieCode &&
            appState.sessionState.reaction.senderExternalId && (
              <div>
                <div>
                  <lottie-player
                    id={`${appState.sessionState.reaction.lottieCode}`}
                    autoplay
                    loop={false}
                    mode="normal"
                    src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${appState.sessionState.reaction.lottieCode}/lottie.json`}
                    style={{ width: "30px", height: "30px", margin: "auto" }}
                  />
                </div>
                <div className="text-cs-grey-50 rounded-lg text-xs font-medium px-2 py-1 bg-cs-purple-650 mt-2">
                  {attendeeDetailItems?.full_name}
                </div>
              </div>
            )}
        </div>
      );
      container.appendChild(lottieEl);

      // Get dynamic positions
      const { bottom, top, width } = container.getBoundingClientRect();

      const lottieAnimation = lottieEl.animate(
        [
          {
            // transform: `translate(${left}px, ${bottom}px)`,

            transform: `translate(${getRandomNumber()}px, ${bottom - 180}px)`,
            opacity: 1,
          },
          {
            // transform: `translate(${width / 2}px, ${top}px)`,

            transform: `translate(${getRandomNumber()}px, ${top - 200}px)`,
            opacity: 0.6,
          },
        ],
        {
          duration: 7000,
          easing: "cubic-bezier(.47,.48,.44,.86)",
        }
      );
      // Remove element once finished animating
      lottieAnimation.onfinish = () => lottieEl.remove();
    };
    handleEmojiClick();
    // }, [appState.sessionState.reaction, audioVideo]);
  }, [appState.sessionState.reaction]);

  useEffect(() => {
    if (!audioVideo) return;

    const handleDataMessage = (dataMessage: {
      data: AllowSharedBufferSource | undefined;
    }) => {
      const message = new TextDecoder().decode(dataMessage.data);
      const parsedMessage = JSON.parse(message);

      setAppState((prevState) => ({
        ...prevState,
        sessionState: {
          ...prevState.sessionState,
          reaction: {
            sender: parsedMessage.sender,
            message: parsedMessage.emoji,
            senderExternalId: parsedMessage.senderExternalId,
            lottieCode: parsedMessage.lottieCode,
          },
        },
      }));
    };

    audioVideo?.realtimeSubscribeToReceiveDataMessage(
      "reaction",
      handleDataMessage
    );

    return () => {
      audioVideo?.realtimeUnsubscribeFromReceiveDataMessage("reaction");
    };
  }, [audioVideo]);

  useLayoutEffect(() => {
    return () => {
      // setAppState((prevState) => ({
      //   ...prevState,
      //   sessionState: {
      //     ...prevState.sessionState,
      //     raisedHand: {
      //       timestamp: timestampVar,
      //       message: attendee,
      //       externalUserID: raiseHandExternalUserID,
      //     },
      //   },
      // }));
      setAppState((prevState) => ({
        ...prevState,
        sessionState: {
          ...prevState.sessionState,
          raisedHand: {
            timestamp: "",
            message: "",
            externalUserID: "",
          },
          reaction: {
            sender: "",
            message: "",
            senderExternalId: "",
            lottieCode: "",
          },
        },
      }));
      setExpressJoin("no");
      updateSessionStorageArray("meetingAttendees", []);
    };
  }, []);

  return (
    <>
      <div className="hidden md:flex justify-between items-center px-2 py-4 bg-cs-grey-45 border-t border-solid border-t-cs-grey-55 metro-medium">
        <div className="flex gap-x-2 lg:gap-x-3 flex-2">
          <div
            className="hidden lg:block text-cs-grey-800 font-normal text-base lg:text-[20px]"
            ref={currentTimeRef}
          ></div>
          <div className="hidden lg:block w-[1px] bg-cs-grey-200"></div>
          <h3 className=" text-cs-grey-800 font-normal text-base lg:text-[20px]">
            {appState.sessionState.sessionName}
          </h3>
        </div>

        <div className="flex justify-center flex-3">
          <div className=" flex gap-x-3 lg:gap-x-6">
            <div className="text-center cursor-pointer" onClick={toggleMute}>
              <div
                className={`p-3 ${
                  muted ? "bg-[#E1C6FF4D]" : "bg-cs-purple-650"
                } rounded-md max-w-12 relative`}
              >
                {muted ? (
                  <MicrophoneSlash1
                    size="24"
                    color="#5E29B7"
                    className="mx-auto max-w-5"
                  />
                ) : (
                  <Microphone
                    size="24"
                    color="#FAFAFA"
                    className="mx-auto max-w-5"
                  />
                )}
                {!muted && (
                  <MoreCircle
                    size="24"
                    color="#5E29B7"
                    className="mx-auto rounded-full absolute -top-[5px] -right-[10px]"
                    style={{ fill: "#ffffff" }}
                  />
                )}
              </div>
              <h6 className=" text-cs-grey-100 font-medium text-xs">
                {muted ? "Unmute" : "Mute"}
              </h6>
            </div>

            <div className="text-center cursor-pointer" onClick={toggleVideo}>
              <div
                className={`p-3 ${
                  isVideoEnabled ? "bg-cs-purple-650" : "bg-[#E1C6FF4D]"
                } rounded-md max-w-12 mx-auto`}
              >
                {isVideoEnabled ? (
                  <Video
                    size="24"
                    color="#FAFAFA"
                    className="mx-auto max-w-5"
                  />
                ) : (
                  <VideoSlash
                    size="24"
                    color="#5E29B7"
                    className="mx-auto max-w-5"
                  />
                )}
              </div>
              <h6 className=" text-cs-grey-100 font-medium text-xs">Video</h6>
            </div>

            <div
              className="text-center cursor-pointer"
              onClick={() => toggleContentShare()}
            >
              <div
                className={`p-3 ${
                  isLocalUserSharing ? "bg-cs-purple-650" : "bg-[#E1C6FF4D]"
                } rounded-md max-w-12 mx-auto`}
              >
                <Monitor
                  size="24"
                  color={isLocalUserSharing ? "#FAFAFA" : "#5E29B7"}
                  className="mx-auto max-w-5"
                />
              </div>
              <h6 className=" text-cs-grey-100 font-medium text-xs">Share</h6>
            </div>

            {meetingDetails?.meeting_info?.MeetingHostId === externalID &&
              externalID && (
                <div
                  className="text-center cursor-pointer"
                  onClick={() => {
                    if (mediaPipeLineId === "") {
                      handleStartRecording();
                    } else {
                      handleStopRecording();
                    }
                  }}
                >
                  <div
                    className={`p-3 rounded-md max-w-12 mx-auto ${
                      otherViews.includes("Record")
                        ? "bg-[#5E29B7]"
                        : "bg-[#E1C6FF4D]"
                    }`}
                  >
                    <RecordCircle
                      size="24"
                      color={
                        otherViews.includes("Record") ? "#FAFAFA" : "#5E29B7"
                      }
                      // color="#5E29B7"
                      // color="#e1c6ff"
                      className="mx-auto max-w-5"
                    />
                  </div>
                  <h6 className=" text-cs-grey-100 font-medium text-xs">
                    Record
                  </h6>
                  {/* <h6 className=" text-[#e1c6ff] font-medium text-xs">Record</h6> */}
                </div>
              )}

            <div className=" relative">
              <div
                className="text-center cursor-pointer "
                onClick={() => handleOtherViews("React")}
              >
                <div
                  className={`p-3 ${
                    otherViews.includes("React")
                      ? "bg-[#5E29B7]"
                      : "bg-[#E1C6FF4D]"
                  } rounded-md max-w-12  mx-auto`}
                >
                  {otherViews.includes("React") ? (
                    <EmojiHappy
                      size="24"
                      color="#FAFAFA"
                      className="mx-auto max-w-5"
                    />
                  ) : (
                    <EmojiHappy
                      size="24"
                      color="#5E29B7"
                      className="mx-auto max-w-5"
                    />
                  )}
                </div>
                <h6 className=" text-cs-grey-100 font-medium text-xs">React</h6>
              </div>
              <div
                className={`  absolute left-[-145px] top-[-56px] bg-[#A3A3A3CC] shadow-xl shadow-[#0000001C] rounded-[10px] w-0 overflow-hidden -z-10 ${
                  otherViews.includes("React") && "w-auto overflow-visible z-10"
                }`}
              >
                <div className=" relative py-2 px-4 flex gap-x-4 emoji-list">
                  {emojis.map((emoji) => (
                    <div key={emoji.alt}>
                      <Image
                        src={emoji.emoji}
                        alt={emoji.alt}
                        width={18}
                        height={18}
                        className="min-w-6 max-w-5 cursor-pointer emoji"
                        onClick={() =>
                          sendReaction(
                            attendeIDString as string,
                            emoji.emoji,
                            externalID as string,
                            emoji.lottieCode
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="text-center cursor-pointer"
              onClick={() =>
                sendRaiseHand(
                  new Date().toLocaleString(),
                  attendeIDString as string,
                  externalID as string
                )
              }
            >
              <div
                className={`p-3 rounded-md max-w-12 mx-auto ${
                  otherViews.includes("Raise-Hand")
                    ? "bg-[#5E29B7]"
                    : "bg-[#E1C6FF4D]"
                }`}
              >
                <Image
                  src={
                    otherViews.includes("Raise-Hand")
                      ? raisedHandWhite
                      : raisedHand
                  }
                  alt="hand"
                  width={18}
                  height={18}
                  className="min-w-6 max-w-5"
                />
              </div>
              <h6 className=" text-cs-grey-100 font-medium text-xs">
                Raise hand
              </h6>
            </div>

            {meetingDetails?.meeting_info?.MeetingHostId === externalID &&
            externalID ? (
              <div className=" bg-cs-red text-center rounded-lg py-3 px-5 text-white font-bold text-sm h-fit cursor-pointer group relative min-w-[86px] transition-all hover:bg-[#E1C6FF4D] text-nowrap">
                <span className="group-hover:hidden transition-all">End</span>
                <span className="hidden group-hover:inline transition-all text-cs-grey-800">
                  Cancel
                </span>

                <div className="bg-white absolute hidden group-hover:block shadow-1xl bottom-11 -right-2 py-3 px-4 rounded-lg z-10">
                  <div
                    className=" text-cs-grey-50 bg-cs-red text-sm font-semibold py-3 px-4 rounded-lg mb-2"
                    onClick={handleEndMeeting}
                  >
                    End meeting for all
                  </div>
                  <div
                    className=" text-cs-grey-800 text-sm font-semibold py-3 px-4 rounded-lg hover:bg-[#E1C6FF4D]"
                    onClick={handleLeaveMeeting}
                  >
                    Leave meeting
                  </div>
                </div>
              </div>
            ) : (
              // <div
              //   className=" bg-cs-red text-center rounded-lg py-3 px-5 text-white font-bold text-sm h-fit cursor-pointer"
              //   onClick={handleLeaveMeeting}
              // >
              //   <span>End</span>
              // </div>
              <div
                className=" bg-cs-red text-center rounded-lg py-3 px-5 text-white font-bold text-sm h-fit cursor-pointer"
                onClick={handleLeaveMeeting}
              >
                <span>End</span>
              </div>
            )}
          </div>
        </div>

        <div className=" flex gap-x-4 lg:gap-x-6 flex-2 justify-end cursor-pointer">
          <div
            className="text-center relative"
            onClick={() => {
              // setOpenCaption(!openCaption);
              handleLocalSideView("Caption");
            }}
          >
            {sideView === "Caption" && (
              <div
                className=" absolute border border-solid border-cs-grey-50 rounded-[10px] shadow-1xl bg-cs-grey-light pt-4 pl-3 pr-1 bottom-24 -left-[50px]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className=" relative">
                  <div className=" relative">
                    <SearchNormal1
                      size="16"
                      color="#677489"
                      className=" absolute top-[32%] left-[5%]"
                    />
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Search for language"
                      className=" placeholder:text-sm placeholder:text-cs-slate-400 metro-light border border-cs-slate-300 outline-none rounded-md block py-[12px] pl-[43px] pr-[6px] text-left"
                    />
                  </div>
                  <div
                    className=" text-left text-cs-grey-dark metro-light my-4 flex gap-x-2"
                    onClick={stopTranscriptionProp}
                  >
                    <button>Off</button>
                    {!transcriptionStatus && (
                      <Image
                        src={greenCheck}
                        alt="hand"
                        width={12}
                        height={8}
                      />
                    )}
                  </div>
                  <div
                    className=" text-left text-cs-grey-dark metro-light my-4 flex gap-x-2"
                    onClick={startTranscriptionProp}
                  >
                    <button>English (Auto-generated)</button>
                    {transcriptionStatus && (
                      <Image
                        src={greenCheck}
                        alt="hand"
                        width={12}
                        height={8}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
            <div
              className={`p-3 ${
                sideView === "Caption" ? "bg-[#5E29B7]" : "bg-[#E1C6FF4D]"
              } rounded-md max-w-12  mx-auto`}
            >
              <Image
                src={sideView === "Caption" ? captureWhite : capturePurple}
                // src={captureGray}
                alt="hand"
                width={18}
                height={18}
                className="min-w-6 max-w-5 h-6"
              />
            </div>
            <h6 className=" text-cs-grey-100 font-medium text-xs">Caption</h6>
            {/*<h6 className=" text-[#e1c6ff] font-medium text-xs">Caption</h6> */}
          </div>

          <div
            className="text-center cursor-pointer"
            onClick={() => handleLocalSideView("Participants")}
          >
            <div
              className={`p-3 ${
                sideView === "Participants" ? "bg-[#5E29B7]" : "bg-[#E1C6FF4D]"
              } rounded-md max-w-12  mx-auto`}
            >
              {sideView === "Participants" ? (
                <ProfileAdd
                  size="24"
                  color="#FAFAFA"
                  className="mx-auto max-w-5"
                />
              ) : (
                <ProfileAdd
                  size="24"
                  color="#5E29B7"
                  className="mx-auto max-w-5"
                />
              )}
            </div>
            <h6 className=" text-cs-grey-100 font-medium text-xs">
              Participants
            </h6>
          </div>

          <div
            className="text-center cursor-pointer"
            onClick={() => handleLocalSideView("Chat")}
          >
            <div
              className={`p-3 ${
                sideView === "Chat" ? "bg-[#5E29B7]" : "bg-[#E1C6FF4D]"
              } rounded-md max-w-12  mx-auto`}
            >
              {sideView === "Chat" ? (
                <Messages1
                  size="24"
                  color="#FAFAFA"
                  className="mx-auto max-w-5"
                />
              ) : (
                <Messages1
                  size="24"
                  color="#5E29B7"
                  className="mx-auto max-w-5"
                />
              )}
            </div>
            <h6 className=" text-cs-grey-100 font-medium text-xs">Chat</h6>
          </div>

          <div className="text-center">
            <div className="p-3 bg-[#E1C6FF4D] rounded-md max-w-12 mx-auto">
              {/* <Coffee size="24" color="#5E29B7" className="mx-auto max-w-5" /> */}
              <Coffee size="24" color="#e1c6ff" className="mx-auto max-w-5" />
            </div>
            {/* <h6 className=" text-cs-grey-100 font-medium text-xs">Activity</h6> */}
            <h6 className=" text-[#e1c6ff] font-medium text-xs">Activity</h6>
          </div>
        </div>
      </div>

      {/* Small screen controls */}
      <div className=" md:hidden py-4 relative bg-cs-grey-45 border-t border-solid border-t-cs-grey-55 metro-medium">
        <div className="px-4 sm:px-24">
          <div className=" flex justify-between ">
            <div className="text-center cursor-pointer" onClick={toggleMute}>
              <div
                className={`p-3 ${
                  muted ? "bg-[#E1C6FF4D]" : "bg-cs-purple-650"
                } rounded-md max-w-12 relative`}
              >
                {muted ? (
                  <MicrophoneSlash1
                    size="18"
                    color="#5E29B7"
                    className="mx-auto"
                  />
                ) : (
                  <Microphone size="18" color="#FAFAFA" className="mx-auto" />
                )}
                {!muted && (
                  <MoreCircle
                    size="18"
                    color="#5E29B7"
                    className="mx-auto rounded-full absolute -top-[5px] -right-[10px]"
                    style={{ fill: "#ffffff" }}
                  />
                )}
              </div>
            </div>

            <div className="text-center cursor-pointer" onClick={toggleVideo}>
              <div
                className={`p-3 ${
                  isVideoEnabled ? "bg-cs-purple-650" : "bg-[#E1C6FF4D]"
                } rounded-md max-w-12 mx-auto`}
              >
                {isVideoEnabled ? (
                  <Video size="18" color="#FAFAFA" className="mx-auto" />
                ) : (
                  <VideoSlash size="18" color="#5E29B7" className="mx-auto" />
                )}
              </div>
            </div>

            <div className="text-center cursor-pointer relative">
              <div
                className={`p-3 ${
                  otherViews.includes("React")
                    ? "bg-[#5E29B7]"
                    : "bg-[#E1C6FF4D]"
                } rounded-md max-w-12 mx-auto`}
                onClick={() => handleOtherViews("React")}
              >
                {otherViews.includes("React") ? (
                  <EmojiHappy size="18" color="#FAFAFA" className="mx-auto" />
                ) : (
                  <EmojiHappy size="18" color="#5E29B7" className="mx-auto" />
                )}
              </div>
            </div>
            <div
              className={`absolute left-0 right-0 top-[-56px] flex justify-center overflow-x-hidden px-6 ${
                otherViews.includes("React") ? " " : "-z-10"
              }`}
            >
              <div
                className={` ${
                  otherViews.includes("React") ? "w-fit" : "w-0 overflow-hidden"
                } bg-[#A3A3A3CC] shadow-xl shadow-[#0000001C] rounded-[10px] relative  overflow-x-scroll no-scrollbar`}
              >
                <div className=" relative py-2 px-4 flex gap-x-4 emoji-list">
                  {emojis.map((emoji) => (
                    <div key={emoji.alt}>
                      <Image
                        src={emoji.emoji}
                        alt={emoji.alt}
                        width={18}
                        height={18}
                        className="min-w-6 max-w-5 cursor-pointer emoji"
                        onClick={() =>
                          sendReaction(
                            attendeIDString as string,
                            emoji.emoji,
                            externalID as string,
                            emoji.lottieCode
                          )
                        }
                        key={emoji.alt}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="text-center cursor-pointer"
              onClick={() =>
                sendRaiseHand(
                  new Date().toLocaleString(),
                  attendeIDString as string,
                  externalID as string
                )
              }
            >
              <div
                className={`p-3 rounded-md max-w-12 mx-auto ${
                  otherViews.includes("Raise-Hand")
                    ? "bg-[#5E29B7]"
                    : "bg-[#E1C6FF4D]"
                }`}
              >
                <Image
                  src={
                    otherViews.includes("Raise-Hand")
                      ? raisedHandWhite
                      : raisedHand
                  }
                  alt="hand"
                  width={18}
                  height={18}
                  className="min-w-4"
                />
              </div>
            </div>

            <div
              className="text-center cursor-pointer"
              onClick={() => handleOtherViews("mobile-drawer")}
            >
              <div className={`p-3 bg-[#E1C6FF4D] rounded-md max-w-12 mx-auto`}>
                <More
                  size="18"
                  color="#5E29B7"
                  className="mx-auto"
                  style={{ transform: "rotate(90deg)", fill: "#5E29B7" }}
                />
              </div>
            </div>

            {otherViews.includes("mobile-drawer") && (
              <div className="fixed inset-0 z-10 overflow-y-auto modal no-scrollbar">
                <div className="flex items-end min-h-screen">
                  <div
                    className="fixed inset-0 transition-opacity bg-cs-modal-100 cursor-pointer"
                    onClick={() =>
                      setOtherViews((prevOtherViews) =>
                        prevOtherViews.filter(
                          (item) => item !== "mobile-drawer"
                        )
                      )
                    }
                  ></div>
                  <div className=" transition-all transform w-full">
                    <div className=" bg-white rounded-t-2xl px-6 py-6">
                      <div className="grid grid-cols-2 gap-x-12 justify-between gap-y-6">
                        <div
                          className="text-center max-w-[215px]"
                          // onClick={() => toggleContentShare()}
                        >
                          <div
                            className={`p-3 ${
                              isLocalUserSharing ? "bg-cs-purple-650" : ""
                            }  rounded flex items-center gap-x-3 border border-solid border-cs-grey-55 justify-center`}
                          >
                            <Monitor
                              size="24"
                              // color={isLocalUserSharing ? "#FAFAFA" : "#333333"}
                              color="#e1c6ff"
                              className="max-w-5"
                            />
                            {/* <h6
                              className={` font-medium text-xs ${
                                isLocalUserSharing
                                  ? "text-cs-grey-50"
                                  : "text-cs-grey-dark"
                              }`}
                            >
                              Share screen
                            </h6> */}
                            <h6
                              className={` font-medium text-xs text-[#e1c6ff]`}
                            >
                              Share screen
                            </h6>
                          </div>
                        </div>

                        {meetingDetails?.meeting_info?.MeetingHostId ===
                          externalID &&
                          externalID && (
                            <div
                              className="text-center max-w-[215px] cursor-pointer"
                              onClick={() => {
                                if (mediaPipeLineId === "") {
                                  handleStartRecording();
                                } else {
                                  handleStopRecording();
                                }
                              }}
                            >
                              <div
                                className={`p-3 ${
                                  otherViews.includes("Record")
                                    ? "bg-cs-purple-650"
                                    : ""
                                }  rounded flex items-center gap-x-3 border border-solid border-cs-grey-55 justify-center`}
                              >
                                <RecordCircle
                                  size="24"
                                  color={
                                    otherViews.includes("Record")
                                      ? "#FAFAFA"
                                      : "#333333"
                                  }
                                  // color="#e1c6ff"
                                  className="max-w-5"
                                />
                                <h6
                                  className={` ${
                                    otherViews.includes("Record")
                                      ? "text-cs-grey-50"
                                      : "text-cs-grey-dark"
                                  } font-medium text-xs`}
                                >
                                  {otherViews.includes("Record")
                                    ? "Stop recording"
                                    : "Record"}
                                </h6>
                                {/* <h6 className=" text-[#e1c6ff] font-medium text-xs">
                              Record
                            </h6> */}
                              </div>
                            </div>
                          )}

                        <div
                          className="text-center cursor-pointer max-w-[215px]"
                          onClick={() => handleLocalSideView("Chat")}
                        >
                          <div
                            className={`p-3 ${
                              sideView === "Chat" ? "bg-cs-purple-650" : ""
                            }  rounded flex items-center gap-x-3 border border-solid border-cs-grey-55 justify-center`}
                          >
                            <Messages1
                              size="24"
                              color={
                                sideView === "Chat" ? "#FAFAFA" : "#333333"
                              }
                              className="max-w-5"
                            />
                            <h6
                              className={`font-medium text-xs ${
                                sideView === "Chat"
                                  ? "text-cs-grey-50"
                                  : "text-cs-grey-dark"
                              }`}
                            >
                              Chat
                            </h6>
                          </div>
                        </div>

                        <div
                          className="text-center cursor-pointer max-w-[215px]"
                          onClick={() => handleLocalSideView("Participants")}
                        >
                          <div
                            className={`p-3 ${
                              sideView === "Participants"
                                ? "bg-cs-purple-650"
                                : ""
                            }  rounded flex items-center gap-x-3 border border-solid border-cs-grey-55 justify-center`}
                          >
                            <ProfileAdd
                              size="24"
                              color={
                                sideView === "Participants"
                                  ? "#FAFAFA"
                                  : "#333333"
                              }
                              className="max-w-5"
                            />
                            <h6
                              className={` ${
                                sideView === "Participants"
                                  ? "text-cs-grey-50"
                                  : "text-cs-grey-dark"
                              }  font-medium text-xs `}
                            >
                              Participants
                            </h6>
                          </div>
                        </div>

                        <div
                          className="text-center max-w-[215px] cursor-pointer"
                          onClick={() => handleLocalSideView("Caption")}
                        >
                          <div
                            className={`p-3 ${
                              sideView === "Caption" ? "bg-cs-purple-650" : ""
                            }  rounded flex items-center gap-x-3 border border-solid border-cs-grey-55 justify-center`}
                          >
                            <ProfileAdd
                              size="24"
                              color={
                                sideView === "Caption" ? "#FAFAFA" : "#333333"
                              }
                              // color="#e1c6ff"
                              className="max-w-5"
                            />
                            <h6
                              className={` ${
                                sideView === "Caption"
                                  ? "text-cs-grey-50"
                                  : "text-cs-grey-dark"
                              }  font-medium text-xs `}
                            >
                              Caption
                            </h6>
                            {/* <h6 className=" text-[#e1c6ff] font-medium text-xs">
                              Caption
                            </h6> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {meetingDetails?.meeting_info?.MeetingHostId === externalID &&
            externalID ? (
              <>
                <div className=" bg-cs-red text-center rounded-lg py-3 px-5 text-white font-bold text-sm h-fit cursor-pointer group relative min-w-[86px] transition-all hover:bg-[#E1C6FF4D] text-nowrap">
                  <span className="group-hover:hidden transition-all">End</span>
                  <span className="hidden group-hover:inline transition-all text-cs-grey-800">
                    Cancel
                  </span>

                  <div className="bg-white absolute hidden group-hover:block shadow-1xl bottom-11 -right-2 py-3 px-4 rounded-lg z-10">
                    <div
                      className=" text-cs-grey-50 bg-cs-red text-sm font-semibold py-3 px-4 rounded-lg mb-2"
                      onClick={handleEndMeeting}
                    >
                      End meeting for all
                    </div>
                    <div
                      className=" text-cs-grey-800 text-sm font-semibold py-3 px-4 rounded-lg hover:bg-[#E1C6FF4D]"
                      onClick={handleLeaveMeeting}
                    >
                      Leave meeting
                    </div>
                  </div>
                </div>
                {/* <div
                  className=" bg-cs-red text-center rounded-lg py-3 px-5 text-white font-bold text-sm h-fit cursor-pointer"
                  onClick={handleLeaveMeeting}
                >
                  <span>End</span>
                </div> */}
              </>
            ) : (
              <div
                className=" bg-cs-red text-center rounded-lg py-3 px-5 text-white font-bold text-sm h-fit cursor-pointer"
                onClick={handleLeaveMeeting}
              >
                <span>End</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <audio ref={raiseHandSoundRef}>
        <source src="" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
}
