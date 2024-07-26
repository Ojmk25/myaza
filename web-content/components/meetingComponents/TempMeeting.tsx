"use client";
import {
  useAudioVideo,
  useLocalVideo,
  useMeetingManager,
  useRemoteVideoTileState,
  useRosterState,
  useToggleLocalMute,
  DeviceLabels,
} from "amazon-chime-sdk-component-library-react";
import {
  ConsoleLogger,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
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
import { joinMeetingFnc, listAttendees } from "@/services/meetingServices";
import {
  decodeJwt,
  getClientInfo,
  IsAuthenticated,
} from "@/services/authService";
import Link from "next/link";
import Image from "next/image";
import cecureStream from "@/public/assets/images/cecurestream.svg";
import cecureStreamSmall from "@/public/assets/images/cecureStreamSmall.svg";
import { SuccessSlideIn } from "../SuccessSlideIn";
import { FailureSlideIn } from "../FailureSlideIn";
import LoadingScreen from "../modals/LoadingScreen";
import { useAppContext } from "@/context/StoreContext";
import { useSessionStorage } from "@/hooks/useStorage";

type AtteendeeDetailsProp = {
  full_name: string;
  picture?: string;
  user_id?: string;
};

export default function TempMeeting({
  param,
}: {
  param: string | string[] | undefined;
}) {
  const meetingManager = useMeetingManager();
  const [showModal, setShowModal] = useState("");
  const { tiles, tileIdToAttendeeId, attendeeIdToTileId, size } =
    useRemoteVideoTileState();
  const { muted, toggleMute } = useToggleLocalMute();
  const { isVideoEnabled, toggleVideo } = useLocalVideo();
  const [sideView, setSideView] = useState("");
  const router = useRouter();
  const [meetingDetails, setMeetingDetails] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [successRes, setSuccessRes] = useState<any>();
  const [openModal, setOpenModal] = useState(false);
  const audioVideo = useAudioVideo();
  const [inputMessage, setInputMessage] = useState({ sender: "", emoji: "" });
  const { appState, setAppState } = useAppContext();

  const [attendeeDetails, setAttendeeDetails] = useState<
    AtteendeeDetailsProp[]
  >([]);
  const { roster } = useRosterState();
  const attendees = Object.values(roster);

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

  console.log(meetingDetails);

  useEffect(() => {
    const handleAttendee = async () => {
      const attend: AtteendeeDetailsProp[] = await getAttendeesList(
        router.query.link as string
      );
      setAppState((prevState) => ({
        ...prevState,
        sessionState: {
          ...prevState.sessionState,
          sessionLink: window.location.href,
          meetingAttendees: attend,
        },
      }));
    };
    handleAttendee();
  }, [attendees.length]);

  useEffect(() => {
    if (router.isReady) {
      const { query } = router;

      const { first_name, surname, user_id } = getClientInfo();
      const meetingPayload = {
        meeting_id: query.link,
        first_name: first_name || appState.sessionState.guestFirstName,
        last_name: surname || appState.sessionState.guestLastName,
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
          const { meeting_info, attendee_info, meeting_name } =
            response?.data.body.data;

          const attend: AtteendeeDetailsProp[] = await getAttendeesList(
            query.link as string
          );

          // setTimeout(() => {
          //   response?.data && response?.data?.data?.statusCode !== 200 && router.push("/");
          // }, 2000)
          setAppState((prevState) => ({
            ...prevState,
            sessionState: {
              ...prevState.sessionState,
              sessionLink: window.location.href,
              meetingAttendees: attend,
              sessionName: meeting_name,
            },
          }));
          console.log(attend);

          setAttendeeDetails(attend);
          setSuccessRes(response?.data);
          setMeetingDetails(response?.data.body.data);
          console.log(response?.data.body.data.meeting_info);

          const meetingSessionConfiguration = new MeetingSessionConfiguration(
            meeting_info,
            attendee_info
          );
          const logger = new ConsoleLogger("ChimeMeetingLogs", LogLevel.INFO);
          const deviceController = new DefaultDeviceController(logger);
          const meetingSession = new DefaultMeetingSession(
            meetingSessionConfiguration,
            logger,
            deviceController
          );
          // console.log(meetingSession);

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
      // joinMeeting();
    }
  }, [router.isReady, router.asPath]);

  const getAttendeesList = async (meetingId: string) => {
    try {
      const response = await listAttendees({
        meeting_id: meetingId,
      });
      if (response) {
        const { data } = response.data.body;
        const attendee = response.data.body;
        // setAttendeeDetails(data);
        // console.log(data);
        // console.log(attendeeDetails);
        // console.log(attendee);
        return data;
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    const { query } = router;
    getAttendeesList(query.link as string);
    const handleAudioVideoDidStart = async () => {
      console.log("User has joined the meeting");
      console.log("User has joined the meeting");
      console.log("User has joined the meeting");
      console.log("User has joined the meeting");
      return await getAttendeesList(query.link as string);
    };
    meetingManager?.audioVideo?.addObserver({
      audioVideoDidStart: handleAudioVideoDidStart,
    });

    return () => {
      meetingManager?.audioVideo?.removeObserver({
        audioVideoDidStart: handleAudioVideoDidStart,
      });
    };
  }, [
    meetingManager.audioVideo,
    // attendeeDetails,
    // router.isReady,
    // router.asPath,
    // appState.sessionState.meetingAttendees,
  ]);

  //   useEffect(() => {
  //   const audioVideo = meetingM?.audioVideo;

  //   if (audioVideo) {
  //     const handleAudioVideoDidStart = async () => {
  //       console.log("User has joined the meeting");
  //       await getAttendeesList();
  //     };

  //     audioVideo.addObserver({
  //       audioVideoDidStart: handleAudioVideoDidStart,
  //     });

  //     return () => {
  //       audioVideo.removeObserver({
  //         audioVideoDidStart: handleAudioVideoDidStart,
  //       });
  //     };
  //   }
  // }, [meetingM]);

  useEffect(() => {
    const handleAttendeePresence = async (attendeeId: any, present: any) => {
      if (present) {
        console.log(
          `User with attendee ID: ${attendeeId} has joined the meeting.`
        );
      } else {
        console.log(
          `User with attendee ID: ${attendeeId} has left the meeting.`
        );
      }
      return await getAttendeesList(router.query.link as string);
    };

    meetingManager?.audioVideo?.realtimeSubscribeToAttendeeIdPresence(
      handleAttendeePresence
    );

    // Clean up the subscription when the component is unmounted
    return () => {
      meetingManager.audioVideo?.realtimeUnsubscribeToAttendeeIdPresence(
        handleAttendeePresence
      );
    };
  }, [meetingManager]);

  useLayoutEffect(() => {
    return () => {
      // if (meetingManager !== null) {
      // sessionStorage.setItem("meetingJoiner", "yes")
      meetingManager.audioVideo?.stop();
      meetingManager.leave();
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

  return (
    <div className="w-full flex items-center flex-col">
      <div className="max-auto w-full ">
        <main className=" flex flex-col px-6 h-dvh w-full relative">
          <div className="md:hidden px-4">
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
              <h2>{meetingDetails && meetingDetails.meeting_name}</h2>
            </div>
          </div>

          <div className=" hidden md:flex justify-between items-center py-4 ">
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
            meetingId={
              meetingManager.meetingSessionConfiguration?.meetingId as string
            }
            attendeeDetailPass={attendeeDetails}
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
            meetingName={meetingDetails && meetingDetails.meeting_name}
          />
          {showModal === "shareScreen" && (
            <ShareScreen onClose={handleCloseModal} />
          )}
          {showModal === "settings" && <Settings onClose={handleCloseModal} />}
          {/* <SuccessSlideIn openModal={openModal} response={successRes && successRes?.statusCode === 200} successActionResponse={successRes && successRes?.message} closeModal={() => { }} /> */}
          {/* <FailureSlideIn
            openModal={openModal}
            response={successRes && successRes?.statusCode !== 200}
            errResponse={successRes && successRes?.body.message}
            closeModal={() => {}}
          /> */}
          {loading && <LoadingScreen />}
        </main>
      </div>
    </div>
  );
}
