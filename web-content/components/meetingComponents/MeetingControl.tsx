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
  Video,
  VideoSlash,
} from "iconsax-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import DateTimeDisplay from "../../utils/getDate";
import {
  useContentShareControls,
  useContentShareState,
  useLocalVideo,
  useToggleLocalMute,
  MeetingManager,
  useAudioVideo,
} from "amazon-chime-sdk-component-library-react";
import raisedHand from "@/public/assets/images/raisedHand.svg";
import raisedHandWhite from "@/public/assets/images/raisedHandWhite.svg";
import joySvg from "@/public/assets/images/Joy.svg";
import redHeartSvg from "@/public/assets/images/Red Heart.svg";
import partyPopSvg from "@/public/assets/images/Party Popper.svg";
import clappingSvg from "@/public/assets/images/Clapping Hands.svg";
import smirkSvg from "@/public/assets/images/Smirking With Starry Eyes.svg";
import smileTearSvg from "@/public/assets/images/Smiling face with tear.svg";
import thumbsDownSvg from "@/public/assets/images/Thumbs Down.svg";
import horrorSvg from "@/public/assets/images/Horror-stricken face.svg";
import captureWhite from "@/public/assets/images/captureWhite.svg";
import capturePurple from "@/public/assets/images/capturePurple.svg";
import captureGray from "@/public/assets/images/captureGray.svg";

import { useRouter } from "next/router";
import { useAppContext } from "@/context/StoreContext";
import { useSessionStorage } from "@/hooks/useStorage";
import { useMeetingManager } from "amazon-chime-sdk-component-library-react";
// import image from require(`../../public/assets/images/Joy.svg`)

const image = require(`../../public/assets/images/Joy.svg`);

const emojis = [
  { emoji: joySvg, alt: "joy", url: image },
  {
    emoji: redHeartSvg,
    alt: "red-heart",
    url: "@/public/assets/images/Red Heart.svg",
  },
  {
    emoji: partyPopSvg,
    alt: "party-popper",
    url: "@/public/assets/images/Party Popper.svg",
  },
  {
    emoji: clappingSvg,
    alt: "clapping-hands",
    url: "@/public/assets/images/Clapping Hands.svg",
  },
  {
    emoji: smirkSvg,
    alt: "smirk",
    url: "@/public/assets/images/Smirking With Starry Eyes.svg",
  },
  {
    emoji: smileTearSvg,
    alt: "smile-tear",
    url: "@/public/assets/images/Smiling face with tear.svg",
  },
  {
    emoji: thumbsDownSvg,
    alt: "thumbs-down",
    url: "@/public/assets/images/Thumbs Down.svg",
  },
  {
    emoji: horrorSvg,
    alt: "horrified-face",
    url: "@/public/assets/images/Horror-stricken face.svg",
  },
];

export default function MeetingControl({
  bgColor,
  onOpen,
  sideView,
  sideViewFunc,
  meetingManager,
  attendeIDString,
  sendEmoji,
  meetingName,
}: {
  bgColor: boolean;
  onOpen: () => void;
  sideView?: string;
  sideViewFunc: (value: string) => void;
  meetingManager: MeetingManager;
  attendeIDString: string | null | undefined;
  sendEmoji: (sender: string, emoji: string) => void;
  meetingName: any;
}) {
  const currentTimeRef = useRef<HTMLDivElement>(null);
  const { muted, toggleMute } = useToggleLocalMute();
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

  useEffect(() => {
    if (otherViews.includes("Raise-Hand")) {
      setRaiseHandAdded(true);
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

  const sendRaiseHand = (timestamp: string, attendee: string) => {
    handleOtherViews("Raise-Hand");
    // Update local state immediately
    setAppState((prevState) => ({
      ...prevState,
      sessionState: {
        ...prevState.sessionState,
        raisedHand: { timestamp: timestamp, message: attendee },
      },
    }));

    // Check if audioVideo is available
    if (!audioVideo) return;
    const message = JSON.stringify({ timestamp: timestamp, message: attendee });

    // Send the message
    audioVideo.realtimeSendDataMessage("raise-hand", message);
  };

  const handleEndMeeting = async () => {
    // await meetingManager.stopVideoInputDevice();
    // meetingManager.audioVideo?.stopLocalVideoTile();
    // meetingManager.audioVideo?.stopVideoInput();
    // meetingManager.audioVideo?.stop();

    // meetingManager.audioVideo?.stopVideoPreviewForVideoInput
    // meetingManager.audioVideo?.stopLocalVideoTile()
    // meetingManager.audioVideo?.stopVideoPreviewForVideoInput()
    // meetingManager.audioVideo?.stop();
    // navigate.push("/");
    if (meetingManager) {
      meetingManager.leave().then(() => {
        meetingManager.meetingSession?.audioVideo.stopVideoInput();
        meetingManager.meetingSession?.audioVideo.stopLocalVideoTile();
        // meetingManager.meetingSession?.audioVideo.stopVideoPreviewForVideoInput(
        //   videoElement
        // );
        meetingManager.meetingSession?.audioVideo.stop();
        // router.reload();
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
    const handleAttendeePresence = (attendeeId: string, present: boolean) => {
      if (present) {
        console.log(`Attendee ${attendeeId} joined the meeting`);
        if (!setupDone && !hasRunRef.current) {
          hasRunRef.current = true;
          const cameraOn = videoStatus === "yes";
          const microphoneOn = audioStatus === "yes";
          if (cameraOn && !isVideoEnabled) {
            toggleVideo();
          }

          if (!microphoneOn && !muted) {
            toggleMute();
          }

          setSetupDone(true);

          console.log(videoStatus);
          console.log(audioStatus, microphoneOn, "This is microphone");
          console.log(setupDone);
          console.log(muted);
          console.log(isVideoEnabled);
        }
      } else {
        console.log(`Attendee ${attendeeId} left the meeting ${present}`);
        console.log(`Attendee ${attendeeId} left the meeting ${present}`);
        console.log(`Attendee ${attendeeId} left the meeting ${present}`);
        console.log(`Attendee ${attendeeId} left the meeting ${present}`);
        console.log(`Attendee ${attendeeId} left the meeting ${present}`);
        console.log(`Attendee ${attendeeId} left the meeting ${present}`);
        console.log(`Attendee ${attendeeId} left the meeting ${present}`);
        console.log(`Attendee ${attendeeId} left the meeting ${present}`);
        console.log(`Attendee ${attendeeId} left the meeting ${present}`);
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
  }, [audioVideo]);

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

            <div className="text-center">
              <div className="p-3 bg-[#E1C6FF4D] rounded-md max-w-12 mx-auto">
                <RecordCircle
                  size="24"
                  // color="#5E29B7"
                  color="#e1c6ff"
                  className="mx-auto max-w-5"
                />
              </div>
              {/* <h6 className=" text-cs-grey-100 font-medium text-xs">Record</h6> */}
              <h6 className=" text-[#e1c6ff] font-medium text-xs">Record</h6>
            </div>

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
              {otherViews.includes("React") && (
                <div className=" absolute left-[-145px] top-[-56px] bg-[#A3A3A3CC] shadow-xl shadow-[#0000001C] rounded-[10px]">
                  <div className=" relative py-2 px-4 flex gap-x-4">
                    {emojis.map((emoji) => (
                      <Image
                        src={emoji.emoji}
                        alt={emoji.alt}
                        width={18}
                        height={18}
                        className="min-w-6 max-w-5 cursor-pointer"
                        onClick={() =>
                          sendEmoji(attendeIDString as string, emoji.emoji)
                        }
                        key={emoji.alt}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              className="text-center cursor-pointer"
              onClick={() =>
                sendRaiseHand(
                  new Date().toLocaleString(),
                  attendeIDString as string
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

            <div
              className=" bg-cs-red text-center rounded-lg py-3 px-5 text-white font-bold text-sm h-fit cursor-pointer"
              onClick={handleEndMeeting}
            >
              <span>End</span>
            </div>
          </div>
        </div>

        <div className=" flex gap-x-4 lg:gap-x-6 flex-2 justify-end">
          <div
            className="text-center"
            // onClick={() => handleLocalSideView("Caption")}
          >
            <div
              className={`p-3 ${
                sideView === "Caption" ? "bg-[#5E29B7]" : "bg-[#E1C6FF4D]"
              } rounded-md max-w-12  mx-auto`}
            >
              <Image
                // src={sideView === "Caption" ? captureWhite : capturePurple}
                src={captureGray}
                alt="hand"
                width={18}
                height={18}
                className="min-w-6 max-w-5 h-6"
              />
            </div>
            {/* <h6 className=" text-cs-grey-100 font-medium text-xs">Caption</h6> */}
            <h6 className=" text-[#e1c6ff] font-medium text-xs">Caption</h6>
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
            {otherViews.includes("React") && (
              <div className="absolute left-0 right-0 top-[-56px] flex justify-center overflow-x-hidden px-6">
                <div className="  bg-[#A3A3A3CC] shadow-xl shadow-[#0000001C] rounded-[10px] relative w-fit overflow-x-scroll no-scrollbar">
                  <div className=" relative py-2 px-4 flex gap-x-4">
                    {emojis.map((emoji) => (
                      <Image
                        src={emoji.emoji}
                        alt={emoji.alt}
                        width={18}
                        height={18}
                        className="min-w-6 max-w-5 cursor-pointer"
                        onClick={() =>
                          sendEmoji(attendeIDString as string, emoji.emoji)
                        }
                        key={emoji.alt}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div
              className="text-center cursor-pointer"
              onClick={() =>
                sendRaiseHand(
                  new Date().toLocaleString(),
                  attendeIDString as string
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

                        <div className="text-center max-w-[215px]">
                          <div
                            className={`p-3 ${
                              isLocalUserSharing ? "bg-cs-purple-650" : ""
                            }  rounded flex items-center gap-x-3 border border-solid border-cs-grey-55 justify-center`}
                          >
                            <RecordCircle
                              size="24"
                              // color={isLocalUserSharing ? "#FAFAFA" : "#333333"}
                              color="#e1c6ff"
                              className="max-w-5"
                            />
                            {/* <h6 className=" text-cs-grey-dark font-medium text-xs">
                              {isLocalUserSharing ? "Stop recording" : "Record"}
                            </h6> */}
                            <h6 className=" text-[#e1c6ff] font-medium text-xs">
                              Record
                            </h6>
                          </div>
                        </div>

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
                          className="text-center max-w-[215px]"
                          // onClick={() => handleLocalSideView("Caption")}
                        >
                          <div
                            className={`p-3 ${
                              sideView === "Caption" ? "bg-cs-purple-650" : ""
                            }  rounded flex items-center gap-x-3 border border-solid border-cs-grey-55 justify-center`}
                          >
                            <ProfileAdd
                              size="24"
                              // color={
                              //   sideView === "Caption" ? "#FAFAFA" : "#333333"
                              // }
                              color="#e1c6ff"
                              className="max-w-5"
                            />
                            {/* <h6
                              className={` ${
                                sideView === "Caption"
                                  ? "text-cs-grey-50"
                                  : "text-cs-grey-dark"
                              }  font-medium text-xs `}
                            >
                              Caption
                            </h6> */}
                            <h6 className=" text-[#e1c6ff] font-medium text-xs">
                              Caption
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div
              className=" bg-cs-red text-center rounded-lg py-3 px-5 text-white font-bold text-sm h-fit cursor-pointer"
              onClick={handleEndMeeting}
            >
              <span>End</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
