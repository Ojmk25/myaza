"use client";
import {
  ContentShare,
  LocalVideo,
  RemoteVideo,
  useAttendeeStatus,
  useAudioVideo,
  useContentShareControls,
  useContentShareState,
  useLocalVideo,
  useMeetingManager,
  useRemoteVideoTileState,
  useRosterState,
  useToggleLocalMute,
  VideoTile,
  VideoTileGrid,
} from "amazon-chime-sdk-component-library-react";
import {
  MeetingSessionConfiguration,
  VideoTileState,
} from "amazon-chime-sdk-js";
import MeetingSection from "@/components/meetingComponents/MeetingSection";
import MeetingControl from "@/components/meetingComponents/MeetingControl";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ArrowLeft, Coffee, InfoCircle, Setting2 } from "iconsax-react";
import ShareScreen from "@/components/modals/ShareScreen";
import Settings from "@/components/modals/Settings";
import { useRouter } from "next/router";
import { joinMeetingFnc } from "@/services/meetingServices";
import { decodeJwt, getFullName } from "@/services/authService";
import Link from "next/link";
import Image from "next/image";
import cecureStream from "@/public/assets/images/cecurestream.svg";
import cecureStreamSmall from "@/public/assets/images/cecureStreamSmall.svg";
import { SuccessSlideIn } from "../SuccessSlideIn";
import { FailureSlideIn } from "../FailureSlideIn";
import LoadingScreen from "../modals/LoadingScreen";
import { useAppContext } from "@/context/StoreContext";

export default function TempMeeting({
  param,
}: {
  param: string | string[] | undefined;
}) {
  const meetingManager = useMeetingManager();
  const { roster } = useRosterState();
  const attendees = Object.values(roster);
  const [showModal, setShowModal] = useState("");
  const { tiles, tileIdToAttendeeId, attendeeIdToTileId, size } =
    useRemoteVideoTileState();
  const { muted, toggleMute } = useToggleLocalMute();
  const { isVideoEnabled, toggleVideo } = useLocalVideo();
  const [sideView, setSideView] = useState("");
  const router = useRouter();
  const [meetingDetails, setMeetDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successRes, setSuccessRes] = useState<any>();
  const [openModal, setOpenModal] = useState(false);
  const audioVideo = useAudioVideo();
  const [emoji, setEmoji] = useState<any>("");
  const [inputMessage, setInputMessage] = useState({ sender: "", emoji: "" });
  const { appState, setAppState } = useAppContext();
  const [raisedHand, setRaisedHand] = useState("");

  const handleShowModal = (type: string) => {
    setShowModal(type);
    document.body.classList.add("overflow-hidden");
  };

  const handleCloseModal = () => {
    setShowModal("");
    document.body.classList.remove("overflow-hidden");
  };

  const handleSideView = (value: string) => {
    setSideView(value);
  };

  const handleConference = (value: string) => {
    if (value === sideView) {
      setSideView("");
    } else {
      setSideView(value);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      const { query } = router;

      const { first_name, surname, user_id } = getFullName();

      const meetingPayload = {
        meeting_id: query.link,
        first_name: first_name || appState.sessionState.guestFirstName,
        last_name: surname || appState.sessionState.guestLastName,
        user_id: user_id || appState.sessionState.guestFirstName,
      };
      const handleJoinMeeting = async () => {
        const clearAll = () => {
          setLoading(false);
          setTimeout(() => {
            setSuccessRes("");
            setOpenModal(false);
          }, 2000);
        };
        setLoading(true);
        try {
          const response = await joinMeetingFnc(meetingPayload);

          setSuccessRes(response?.data);
          setMeetDetails(response?.data.body.meeting_info);
          // setTimeout(() => {
          //   response?.data && response?.data?.data?.statusCode !== 200 && router.push("/");
          // }, 2000)
          const meetingSessionConfiguration = new MeetingSessionConfiguration(
            response?.data.body.data.meeting_info,
            response?.data.body.data.attendee_info
          );
          await meetingManager.join(meetingSessionConfiguration);
          await meetingManager.start();
        } catch (error) {
          console.log(error);
          setLoading(true);
          setOpenModal(true);
        } finally {
          clearAll();
        }
      };

      handleJoinMeeting();
    }
  }, [router.isReady, router.asPath]);

  useLayoutEffect(() => {
    return () => {
      // if (meetingManager !== null) {
      // sessionStorage.setItem("meetingJoiner", "yes")
      meetingManager.audioVideo?.stop();
      // }
    };
  }, []);

  const sendReaction = (sender: string, emoji: string) => {
    // Update local state immediately
    setAppState((prevState) => ({
      ...prevState,
      sessionState: {
        ...prevState.sessionState,
        reaction: { message: emoji, sender: sender },
      },
    }));

    // Check if audioVideo is available
    if (!audioVideo) return;

    // Create and send the message
    const message = JSON.stringify({ sender: sender, emoji: emoji });

    meetingManager.audioVideo?.realtimeSendDataMessage("reaction", message);
  };

  const sendRaiseHand = (timestamp: string, attendee: string) => {
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

  console.log(
    meetingManager.meetingSessionConfiguration?.credentials?.externalUserId
  );

  return (
    <div className="w-full flex items-center flex-col">
      <div className="max-auto w-full max-w-[1280px]">
        <main className=" flex flex-col h-dvh relative">
          <div className="md:hidden px-6">
            <div className="flex  justify-between items-center py-4 bg-[#FEFDFF] border-solid border-b border-b-[#FAFAFA]">
              <Link href={"/"} className=" md:hidden">
                <Image src={cecureStreamSmall} alt="logo" />
              </Link>

              <div className="flex justify-between gap-x-2 items-center">
                <div
                  className={` ${
                    sideView === "Conference Info"
                      ? "bg-[#5E29B7]"
                      : "bg-[#E1C6FF4D]"
                  } p-[10px] rounded-lg items-center cursor-pointer`}
                  onClick={() => handleConference("Conference Info")}
                >
                  {sideView === "Conference Info" ? (
                    <InfoCircle
                      size="18"
                      color="#FAFAFA"
                      className="mx-auto max-w-5"
                    />
                  ) : (
                    <InfoCircle
                      size="18"
                      color="#5E29B7"
                      className="mx-auto max-w-5"
                    />
                  )}
                </div>
                <div
                  className="bg-[#E1C6FF4D] p-[10px] rounded-lg flex justify-center items-center cursor-pointer"
                  onClick={() => handleShowModal("settings")}
                >
                  <Setting2
                    size="18"
                    color="#5E29B7"
                    className="mx-auto max-w-5"
                  />
                </div>

                <div className="bg-[#E1C6FF4D] p-[10px] rounded-lg flex justify-center items-center cursor-pointer">
                  <Coffee
                    size="18"
                    color="#5E29B7"
                    className="mx-auto max-w-5"
                  />
                </div>
              </div>
            </div>
            <div className=" flex gap-x-2 items-center">
              <ArrowLeft size="18" color="#080808" className="" />
              <h2>AWS Conference</h2>
            </div>
          </div>

          <div className=" hidden md:flex justify-between items-center py-4 px-6">
            <Link href={"/"} className="hidden md:block">
              <Image src={cecureStream} alt="logo" />
            </Link>

            <div className="flex justify-between gap-x-4 items-center">
              <div
                className={` flex ${
                  sideView === "Conference Info"
                    ? "bg-[#5E29B7]"
                    : "bg-[#E1C6FF4D]"
                } py-[10px] px-[10px] gap-x-[10px] rounded-lg items-center cursor-pointer`}
                onClick={() => handleConference("Conference Info")}
              >
                {sideView === "Conference Info" ? (
                  <InfoCircle size="20" color="#FAFAFA" className="mx-auto" />
                ) : (
                  <InfoCircle size="20" color="#5E29B7" className="mx-auto" />
                )}
                <div
                  className={`${
                    sideView === "Conference Info"
                      ? "text-cs-grey-50"
                      : "text-cs-purple-650"
                  } font-semibold`}
                >
                  Conference Info
                </div>
              </div>
              <div
                className="bg-[#E1C6FF4D] p-[10px] rounded-lg flex justify-center items-center cursor-pointer"
                onClick={() => handleShowModal("settings")}
              >
                <Setting2 size="20" color="#5E29B7" />
              </div>
            </div>
          </div>

          {/* grid px-20 gap-x-16 items-center grid-cols-2 */}
          {/* <button onClick={joinMeeting}>join</button> */}
          <MeetingSection
            attendeIDString={
              meetingManager.meetingSessionConfiguration?.credentials
                ?.attendeeId
            }
            externalID={
              meetingManager.meetingSessionConfiguration?.credentials
                ?.externalUserId
            }
            sideView={sideView}
            sideViewFunc={handleSideView}
            meetingManager={meetingManager}
            emoji={inputMessage}
          />

          <MeetingControl
            bgColor
            onOpen={() => handleShowModal("shareScreen")}
            sideViewFunc={handleSideView}
            sideView={sideView}
            meetingManager={meetingManager}
            attendeIDString={
              meetingManager.meetingSessionConfiguration?.credentials
                ?.attendeeId
            }
            sendEmoji={sendReaction}
          />
          {showModal === "shareScreen" && (
            <ShareScreen onClose={handleCloseModal} />
          )}
          {showModal === "settings" && <Settings onClose={handleCloseModal} />}
          {/* <SuccessSlideIn openModal={openModal} response={successRes && successRes?.statusCode === 200} successActionResponse={successRes && successRes?.message} closeModal={() => { }} /> */}
          <FailureSlideIn
            openModal={openModal}
            response={successRes && successRes?.statusCode !== 200}
            errResponse={successRes && successRes?.body.message}
            closeModal={() => {}}
          />
          {loading && <LoadingScreen />}
        </main>
      </div>
    </div>
  );
}
