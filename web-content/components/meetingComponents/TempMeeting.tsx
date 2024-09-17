"use client";
import {
  useAudioVideo,
  useMeetingManager,
  useMeetingStatus,
  useRosterState,
} from "amazon-chime-sdk-component-library-react";
import {
  AudioVideoObserver,
  ConnectionHealthData,
  ConsoleLogger,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  MeetingSessionConfiguration,
} from "amazon-chime-sdk-js";
import MeetingSection from "@/components/meetingComponents/MeetingSection";
import MeetingControl from "@/components/meetingComponents/MeetingControl";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Coffee,
  InfoCircle,
  MessageQuestion,
  Setting2,
} from "iconsax-react";
import ShareScreen from "@/components/modals/ShareScreen";
import Settings from "@/components/modals/Settings";
import { useRouter } from "next/router";
import { joinMeetingFnc, listAttendees } from "@/services/meetingServices";
import { getClientInfo } from "@/services/authService";
import Link from "next/link";
import Image from "next/image";
import cecureStream from "@/public/assets/images/cecurestream.svg";
import cecureStreamSmall from "@/public/assets/images/cecureStreamSmall.svg";
import { SuccessSlideIn } from "../SuccessSlideIn";
import { FailureSlideIn } from "../FailureSlideIn";
import LoadingScreen from "../modals/LoadingScreen";
import { useAppContext } from "@/context/StoreContext";
import EndedMeetingModal from "../modals/EndedMeeting";

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
  const [sideView, setSideView] = useState("");
  const router = useRouter();
  const [meetingDetails, setMeetingDetails] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [successRes, setSuccessRes] = useState<any>();
  const [openModal, setOpenModal] = useState(false);
  const audioVideo = useAudioVideo();
  const [inputMessage, setInputMessage] = useState({ sender: "", emoji: "" });
  const { appState, setAppState } = useAppContext();
  const hasRunRef = useRef(false);
  const bigScreenWidgetRef = useRef<HTMLDivElement>(null);
  const smallScreenWidgetRef = useRef<HTMLDivElement>(null);
  const [meetingSession, setMeetingSession] =
    useState<DefaultMeetingSession | null>(null);
  const [dynamicElementId, setDynamicElementId] =
    useState<string>("localvideo-1");

  const [attendeeDetails, setAttendeeDetails] = useState<
    AtteendeeDetailsProp[]
  >([]);
  const { roster } = useRosterState();
  const attendees = Object.values(roster);
  const [noNetwork, setNoNetwork] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number>();
  const meetingStatus = useMeetingStatus();
  const endeMeetingRef = useRef(false);
  const [hostExternalId, setHostExternalId] = useState<string>("");

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
    // Function to update screenWidth state when the window is resized
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Initial width when component mounts
    setScreenWidth(window.innerWidth);
    handleResize();
    // Add event listener to window resize event
    window.addEventListener("resize", handleResize);
    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (router.isReady && !hasRunRef.current) {
      hasRunRef.current = true;
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

          // const attend: AtteendeeDetailsProp[] = await getAttendeesList(
          //   query.link as string
          // );

          setTimeout(() => {
            response?.data &&
              response?.data?.statusCode !== 200 &&
              router.push("/");
          }, 2000);
          setAppState((prevState) => ({
            ...prevState,
            sessionState: {
              ...prevState.sessionState,
              sessionLink: window.location.href,
              // meetingAttendees: attend,
              sessionName: meeting_name,
            },
          }));
          // setAttendeeDetails(attend);
          setSuccessRes(response?.data);
          setMeetingDetails(response?.data.body.data);

          const logger = new ConsoleLogger("MyLogger", LogLevel.INFO);
          const deviceController = new DefaultDeviceController(logger);

          const meetingSessionConfiguration = new MeetingSessionConfiguration(
            meeting_info,
            attendee_info
          );
          const meetingSession = new DefaultMeetingSession(
            meetingSessionConfiguration,
            logger,
            deviceController
          );

          setMeetingSession(meetingSession);
          await meetingManager.join(meetingSessionConfiguration);
          await meetingManager.start();
          setHostExternalId(
            meetingManager.meetingSessionConfiguration?.credentials
              ?.externalUserId as string
          );
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

  const checkStatus = () => {
    const handleLeaveMeeting = async () => {
      if (meetingManager) {
        meetingManager.leave().then(() => {
          meetingManager.meetingSession?.audioVideo.stopVideoInput();
          meetingManager.meetingSession?.audioVideo.stopLocalVideoTile();
          meetingManager.meetingSession?.audioVideo.stop();
          meetingManager.audioVideo?.stop();
          // router.push("/").then(() => window.location.reload());
        });
      }
    };
    if (
      meetingStatus === 3 &&
      hostExternalId !== meetingDetails?.meeting_info?.MeetingHostId
    ) {
      endeMeetingRef.current = true;
      handleLeaveMeeting();
    }
    return "";
  };

  useLayoutEffect(() => {
    return () => {
      const videoContainer = document.getElementById(
        "localvideo-1"
      ) as HTMLDivElement;

      if (videoContainer) {
        const videoElement = videoContainer.querySelector<HTMLVideoElement>(
          "video"
        ) as HTMLVideoElement;

        if (videoElement) {
          meetingManager.meetingSession?.audioVideo.stopVideoInput();
          meetingManager.meetingSession?.audioVideo.stopLocalVideoTile();
          meetingManager.meetingSession?.audioVideo.stopVideoPreviewForVideoInput(
            videoElement
          );
          meetingManager.meetingSession?.audioVideo.stop();
        }
      }
    };
  }, []);

  useLayoutEffect(() => {
    return () => {
      const videoContainer = document.getElementById(
        dynamicElementId
      ) as HTMLDivElement;

      if (videoContainer) {
        const videoElement =
          videoContainer.querySelector<HTMLVideoElement>("video");

        if (videoElement) {
          meetingManager.meetingSession?.audioVideo.stopVideoInput();
          meetingManager.meetingSession?.audioVideo.stopLocalVideoTile();
          meetingManager.meetingSession?.audioVideo.stopVideoPreviewForVideoInput(
            videoElement
          );
          meetingManager.meetingSession?.audioVideo.stop();
        }
      }
    };
  }, [meetingSession]);

  // useEffect(() => {
  //   const handleElement = () => {
  //     const parentElement = document.getElementById(dynamicElementId);
  //     if (parentElement) {
  //       const videoElement =
  //         parentElement.querySelector<HTMLVideoElement>("video");
  //       if (videoElement) {
  //         // Perform any operations with the dynamically added video element
  //         // videoElement.play(); // Example operation
  //         console.log("Video element found and played:");
  //       } else {
  //         console.log("Video element not found");
  //       }
  //     } else {
  //       console.log("Parent element not found");
  //     }
  //   };

  //   if (meetingSession) {
  //     const observer = new MutationObserver(() => {
  //       handleElement();
  //     });

  //     observer.observe(document.body, { childList: true, subtree: true });

  //     // Cleanup observer on component unmount
  //     return () => observer.disconnect();
  //   }
  // }, [meetingSession, dynamicElementId]);

  useEffect(() => {
    const callback: MutationCallback = (mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          const scriptElement = document.querySelector("#atlwdg-trigger");
          if (scriptElement) {
            handleScriptLoaded();
            observer.disconnect(); // Stop observing once the script is found
            break;
          }
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect(); // Clean up the observer when the component unmounts
    };
  }, [screenWidth]);

  const handleScriptLoaded = () => {
    const widgetElement = document.querySelector(
      "#atlwdg-trigger"
    ) as HTMLElement;
    widgetElement?.classList.add("opacity-0", "inset-0", "absolute");

    if (widgetElement) {
      widgetElement.style.position = "absolute";
      widgetElement.style.inset = "0";
      widgetElement.style.width = "100%";
    }

    if (widgetElement?.parentNode) {
      widgetElement.parentNode.removeChild(widgetElement);
    }
    if (screenWidth && screenWidth > 767) {
      if (widgetElement)
        bigScreenWidgetRef.current?.append(widgetElement as Node);
    } else {
      if (widgetElement)
        smallScreenWidgetRef.current?.append(widgetElement as Node);
    }
  };

  useEffect(() => {
    const observer: AudioVideoObserver = {
      connectionHealthDidChange: (
        connectionHealthData: ConnectionHealthData
      ) => {
        const missedPongsThreshold = 10;
        if (
          connectionHealthData.consecutiveMissedPongs >= missedPongsThreshold
        ) {
          setNoNetwork(true);
        } else {
          setNoNetwork(false);
        }
      },
    };
    meetingManager?.audioVideo?.addObserver(observer);

    return () => {
      meetingManager?.audioVideo?.removeObserver(observer);
    };
  }, [meetingManager.audioVideo]);

  return (
    <div className="w-full flex items-center flex-col">
      <div className="max-auto w-full ">
        <main className=" flex flex-col md:px-6 h-dvh w-full relative meetingScreen">
          {/* header for small screen */}
          <div className="md:hidden px-4">
            <div className="flex  justify-between items-center py-4 bg-[#FEFDFF] border-solid border-b border-b-[#FAFAFA]">
              <Image src={cecureStreamSmall} alt="logo" />

              <div className="flex justify-between gap-x-2 items-center">
                <div
                  ref={smallScreenWidgetRef}
                  className=" w-fit relative overflow-hidden"
                >
                  <div className="bg-cs-purple-650 p-[10px] rounded-lg flex items-center cursor-pointer">
                    <MessageQuestion size="18" color="#FAF0FF" />
                  </div>
                </div>
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
            <div
              className=" flex gap-x-2 items-center cursor-pointer"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size="18" color="#080808" className="" />
              <h2>{meetingDetails && meetingDetails.meeting_name}</h2>
            </div>
          </div>

          {/* header for big screen */}
          <div className=" hidden md:flex justify-between items-center py-4 ">
            <Image src={cecureStream} alt="logo" />
            {checkStatus()}
            <div className="flex justify-between gap-x-4 items-center">
              <div ref={bigScreenWidgetRef} className=" w-fit relative">
                <div className="bg-cs-purple-650 text-cs-grey-60-light p-[10px] rounded-lg font-semibold flex items-center gap-x-2 cursor-pointer">
                  <MessageQuestion size="20" color="#FAF0FF" />
                  <p>Feedback?</p>
                </div>
              </div>

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
            meetingDetails={meetingDetails}
            externalID={
              meetingManager.meetingSessionConfiguration?.credentials
                ?.externalUserId
            }
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
          {noNetwork && <LoadingScreen />}
          {endeMeetingRef.current && <EndedMeetingModal />}
        </main>
      </div>
    </div>
  );
}
