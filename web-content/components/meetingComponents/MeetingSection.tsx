"use client";
import Image from "next/image";
import closeIconPurple from "@/public/assets/images/closeIconPurple.svg";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  useToggleLocalMute,
  useRemoteVideoTileState,
  useRosterState,
  useContentShareControls,
  ContentShare,
  useContentShareState,
  useAudioVideo,
  MeetingManager,
  useMeetingManager,
} from "amazon-chime-sdk-component-library-react";
import { RemoteAttendeeCard } from "./RemoteAttendeeCard";
import { LocalAttendeeCard } from "./LocalAttendeeCard";
import {
  Message,
  DataMessage,
  DefaultRealtimeController,
  TranscriptEvent,
  TranscriptionStatus,
  Transcript,
} from "amazon-chime-sdk-js";
import Chat from "./IncallMessage";
import { getRemoteInitials, processString } from "@/utils/meetingFunctions";
import ShowVisualizer from "./ShowVisualizer";
import capturePurple from "@/public/assets/images/capturePurple.svg";
import Participants from "./Participants";
import Conference from "./Conference";
import { listAttendees, startTranscription } from "@/services/meetingServices";
import { useAppContext } from "@/context/StoreContext";

const testMeetingParticipants = [1, 2, 3, 4, 5, 6, 7, 8, 9];

type DynamicWidth = {
  width: number | string;
  maxWidth: number | string;
};

type AtteendeeDetailsProp = {
  full_name: string;
  picture?: string;
  user_id?: string;
};
export default function MeetingSection({
  attendeIDString,
  externalID,
  sideView,
  sideViewFunc,
  meetingManager,
  emoji,
  meetingId,
  attendeeDetailPass,
}: {
  attendeIDString: string | null | undefined;
  externalID: string | null | undefined;
  sideView?: string;
  sideViewFunc: (value: string) => void;
  meetingManager: MeetingManager;
  emoji: any;
  meetingId: string | null;
  attendeeDetailPass: AtteendeeDetailsProp[];
}) {
  const { roster } = useRosterState();
  const attendees = Object.values(roster);
  const { muted, toggleMute } = useToggleLocalMute();
  const { tiles, tileIdToAttendeeId, attendeeIdToTileId, size } =
    useRemoteVideoTileState();
  const { toggleContentShare } = useContentShareControls();
  const { isLocalUserSharing, tileId, sharingAttendeeId } =
    useContentShareState();
  const [meetingSideView, setMeetingSideView] = useState("meeting");
  const messageData = new DataMessage(
    Date.now(),
    "Test-Meeting",
    new Uint8Array(),
    "attendee",
    "externalId"
  );

  const messageChat = new Message("string", {}, "I said");
  const audioVideo = useAudioVideo();
  const [chatMessages, setChatMessages] = useState<any>([]);
  const [someChat, setSomeChat] = useState("");
  const participantsRef = useRef<HTMLDivElement>(null);
  // const [sideView, setSideView] = useState('');
  const [tooltipMessage, setTooltipMessage] = useState("");
  const bigContainerTileRef = useRef<HTMLDivElement>(null);
  const smallContainerTileRef = useRef<HTMLDivElement>(null);
  const [inviewSmallContainer, setInviewSmallContainer] = useState<
    number | null
  >(null);
  const [bigContainerWidth, setBigContainerWidth] = useState(0);
  const containerTileRef = useRef<HTMLDivElement>(null);
  const [dynamicWidth, setDynamicWidth] = useState<DynamicWidth>({
    width: "",
    maxWidth: "",
  });
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [changingWidth, setChangingWidth] = useState<number>(0);
  const [captionOn, setCaptionOn] = useState(false);
  const captionScroll = useRef<HTMLDivElement>(null);
  const [displayCards, setDisplayCards] = useState<number>();
  const [attendeeDetails, setAttendeeDetails] =
    useState<AtteendeeDetailsProp[]>(attendeeDetailPass);
  const meetingM = useMeetingManager();
  const { appState, setAppState } = useAppContext();

  useEffect(() => {
    const audioVideo = meetingM?.audioVideo;

    if (audioVideo) {
      // const handleAttendeePresence = (attendeeId: string, present: boolean) => {
      //   // if (present) {
      //   //   const presentEntry = presents.find(
      //   //     (present) => present.user_id === attendeeId
      //   //   );
      //   //   if (presentEntry) {
      //   //     const fullName = getAttendeeFullName(attendeeId);
      //   //     console.log(`Attendee ${fullName} has joined the meeting`);
      //   //     // Perform additional actions (e.g., make API calls, update UI)
      //   //   }
      //   // } else {
      //   //   console.log(`Attendee with id ${attendeeId} has left the meeting`);
      //   //   // Handle attendee leaving the meeting
      //   // }
      //   console.log("There is a presence");
      // };

      audioVideo.realtimeSubscribeToAttendeeIdPresence(
        (handleAttendeePresence) => {}
      );

      return () => {
        audioVideo.realtimeUnsubscribeToAttendeeIdPresence(
          (handleAttendeePresence) => {}
        );
      };
    }
  }, [meetingM]);

  useEffect(() => {
    // Function to update screenWidth state when the window is resized
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Initial width when component mounts
    setScreenWidth(window.innerWidth);

    // Add event listener to window resize event
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffect(() => {
  //   captionScroll.current!.scrollTop = captionScroll.current!.scrollHeight;
  // }, []);

  const transcriptionPayload = {
    meeting_id: meetingManager.meetingId as string,
    attendee_id: attendeIDString as string,
  };

  const handleSignUpSubmit = async () => {
    // setLoading(true)
    // const clearAll = () => {
    //   setLoading(false)
    //   setTimeout(() => {
    //     setSuccessRes("")
    //     setOpenModal(false)
    //   }, 2000)
    // }
    try {
      const data = await startTranscription(transcriptionPayload);
      // setCaptionOn(true);
      // setLoading(true)
      // setSuccessRes(data.data.body)
      // setOpenModal(true)
      // setTimeout(() => {
      //   updateSignUpUser(registerPayload.email)
      //   data.data.body.status === 'Success' && navigate.push("/auth/verify");
      // }, 3000)
      console.log(data);
    } catch (error) {
      // setLoading(true)
      console.log(error);
    } finally {
      // clearAll()
    }
  };

  const chunkArray = (array: any, size: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, size + i));
    }
    return chunks.slice(0, 3);
  };

  const chunkRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust this based on when you want the callback to be triggered
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const chunkIndex = chunkRefs.current.indexOf(
            entry.target as HTMLDivElement
          );
          setInviewSmallContainer(chunkIndex);
        }
      });
    }, options);

    chunkRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      chunkRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [inviewSmallContainer]);

  const attendeeItems = attendees.map((attendee, i) => {
    const tilerId = attendeeIdToTileId[attendee.chimeAttendeeId];
    const { externalUserId } = attendee;
    console.log(attendee.chimeAttendeeId);

    if (i === 0) {
      return (
        <LocalAttendeeCard
          key={i}
          attendeeId={attendee.chimeAttendeeId}
          name={externalUserId}
          videoTildId={1}
          nameID={attendee.externalUserId as string}
          audioState={
            <ShowVisualizer
              meetingManager={meetingManager}
              attendee={attendee}
            />
          }
          // attendeeDetails={attendeeDetailItems}
          meetingManager={meetingManager}
        />
      );
    } else {
      return (
        <RemoteAttendeeCard
          key={attendee.chimeAttendeeId}
          attendeeId={attendee.chimeAttendeeId}
          name={externalUserId}
          videoTildId={tilerId}
          nameID={attendee.externalUserId as string}
          audioState={
            <ShowVisualizer
              meetingManager={meetingManager}
              attendee={attendee}
            />
          }
          // attendeeDetails={attendeeDetailItems}
        />
      );
    }
  });

  const smallScreenTiles = chunkArray(attendeeItems, tileId ? 2 : 6);

  useEffect(() => {
    if (containerTileRef.current && changingWidth <= 699) {
      if (attendees.length < 3) {
        setDynamicWidth({ width: "100%", maxWidth: "100%" });
      } else {
        setDynamicWidth({ width: "100%", maxWidth: 230 });
      }
    } else if (
      (containerTileRef.current && changingWidth >= 700) ||
      changingWidth <= 890
    ) {
      if (attendees.length < 5) {
        setDynamicWidth({ width: "100%", maxWidth: "100%" });
      } else {
        setDynamicWidth({ width: "100%", maxWidth: 210 });
      }
    } else if (containerTileRef.current && changingWidth >= 891) {
      if (attendees.length < 4) {
        setDynamicWidth({ width: "100%", maxWidth: "100%" });
      } else {
        setDynamicWidth({ width: "100%", maxWidth: 300 });
      }
    }
  }, [containerTileRef.current?.offsetWidth, changingWidth]);

  const [uuid, setUuid] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const pathnameParts = url.pathname.split("/");
    const extractedUuid = pathnameParts[pathnameParts.length - 1];
    setUuid(extractedUuid);
  }, []);

  const handleCopyClick = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setTooltipMessage("copied");
      setTimeout(() => setTooltipMessage(""), 2000);
    } catch (err) {
      setTooltipMessage("Failed to copy!");
      setTimeout(() => setTooltipMessage(""), 2000);
    }
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === containerTileRef.current) {
          setChangingWidth(entry.contentRect.width);
        }
      }
    });

    if (containerTileRef.current) {
      resizeObserver.observe(containerTileRef.current);
    }

    return () => {
      if (containerTileRef.current) {
        resizeObserver.unobserve(containerTileRef.current);
      }
    };
  }, [sideView]);

  useEffect(() => {
    setBigContainerWidth(bigContainerTileRef?.current?.clientWidth as number);

    const audioVideo = meetingManager.audioVideo;
    if (audioVideo?.transcriptionController) {
      audioVideo.transcriptionController.subscribeToTranscriptEvent(
        (transcriptEvent: Transcript | TranscriptionStatus) => {
          console.log(transcriptEvent);
        }
      );
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === bigContainerTileRef.current) {
          // setChangingWidth(entry.contentRect.width);
          // console.log(entry.contentRect.width);
          setBigContainerWidth(entry.contentRect.width);
          if (entry.contentRect.width < 300) {
            setDisplayCards(3);
          } else if (
            entry.contentRect.width > 300 &&
            entry.contentRect.width < 645
          ) {
            setDisplayCards(4);
          } else {
            setDisplayCards(8);
          }
        }
      }
    });

    if (bigContainerTileRef.current) {
      resizeObserver.observe(bigContainerTileRef.current);
    }

    return () => {
      if (bigContainerTileRef.current) {
        resizeObserver.unobserve(bigContainerTileRef.current);
      }
    };
  }, [sideView]);

  let sharerAttendeeID = sharingAttendeeId?.split("#")[0];
  let sharingExternalID = attendees.find(
    (attendee) => attendee.chimeAttendeeId === sharerAttendeeID
  )?.externalUserId;

  const getClassNames = (length: number) => {
    if (length < 2) {
      if (bigContainerWidth < 300) {
        return "w-full h-1/2 p-2";
      }
      return "w-full h-full p-2";
    }
    if (length === 2) {
      if (bigContainerWidth < 300) {
        return "w-full h-1/2 p-2";
      }
      return "w-1/2 h-full p-2";
    }
    if (length === 3) {
      if (bigContainerWidth < 300) {
        return "w-full h-1/3 p-2";
      }
      if (bigContainerWidth < 645) {
        return "w-1/2 h-1/2 p-2";
      }
      return "w-1/3 h-full p-2";
    }
    if (length === 4) {
      if (bigContainerWidth < 300) {
        return "w-full h-1/3 p-2";
      }
      if (bigContainerWidth < 645) {
        return "w-1/2 h-1/2 p-2";
      }
      return "w-1/4 h-full p-2";
    }
    if (length > 4) {
      if (bigContainerWidth < 300) {
        return "w-full h-1/3 p-2";
      }
      if (bigContainerWidth < 645) {
        return "w-1/2 h-1/2 p-2";
      }
      return "w-1/4 h-1/2 p-2";
    }
  };

  const returName = (string: any) => {
    const details = appState.sessionState.meetingAttendees.find(
      (att) => att.user_id === string
    );
    return getRemoteInitials(details?.full_name as string);
  };

  return (
    <>
      <div className=" flex-4 overflow-hidden hidden md:flex metro-medium">
        {tileId && (
          <div className=" flex-5 bg-cs-black-200 px-10 py-5 rounded-[4px] mr-4">
            <div className=" h-full flex flex-col">
              <div className="flex gap-x-3 flex-2 items-center">
                {/* <div className="p-[4px] bg-cs-grey-50 rounded-lg"><RecordCircle size="24" color="#CB3A32" variant="Bulk" /></div>
              <div className=" text-cs-grey-50 font-normal">Conference is recorded</div>
              <div className=" w-[1px] bg-cs-grey-200 min-h-6"></div> */}
                <h3 className=" text-cs-grey-50 font-semibold ">
                  <span className=" capitalize">
                    {processString(sharingExternalID as string)}{" "}
                  </span>
                  share screen
                </h3>
              </div>
              <div className="flex justify-center items-center rounded-lg overflow-hidden h-full">
                <div className=" min-h-[200px] w-full h-full rounded-lg min-w-[200px]">
                  <ContentShare
                    nameplate={processString(externalID as string)}
                    className=" rounded-lg relative bg-slate-800 min-h-[200px] [&>video]:object-cover capitalize"
                    css="border: 1px solid"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex-6 flex">
          <div
            className={`w-full @container/meetingTiles  ${
              screenWidth < 1024 && sideView !== "" && tileId ? "hidden" : ""
            }`}
            ref={bigContainerTileRef}
          >
            {/* <div className="w-full flex gap-4 h-full flex-4 flex-wrap justify-center">
              {attendeeItems}
            </div> */}

            <div className="flex flex-wrap justify-center overflow-y-auto items-center w-full h-full">
              {attendeeItems
                .slice(
                  0,
                  displayCards &&
                    (attendeeItems.length > displayCards
                      ? displayCards - 1
                      : displayCards)
                )
                .map((item, index) => (
                  <div
                    key={index}
                    className={`${getClassNames(
                      attendeeItems.length
                    )} @container/meetingCard `}
                  >
                    {item}
                  </div>
                ))}
              {displayCards && attendeeItems.length > displayCards && (
                <div className={` ${getClassNames(attendeeItems.length)}`}>
                  <div
                    className={` bg-cs-black-200 flex-1 rounded flex h-full justify-center`}
                  >
                    {attendeeItems.length - (displayCards - 1) <= 2 ? (
                      <div className="flex-1 flex justify-center items-center mx-auto">
                        {attendees
                          .slice(displayCards - 2, attendeeItems.length)
                          .map((item, index) => (
                            <div
                              className=" bg-cs-grey-800 w-[38px] h-[38px] rounded-full flex justify-center items-center text-cs-grey-50 border-solid border-[0.5px] border-white -ml-2"
                              key={index}
                            >
                              {returName(item.externalUserId)}
                            </div>
                          ))}

                        {/* <Image
                          src={avatar}
                          alt=""
                          className=" max-w-[38px] max-h-[38px] rounded-full -ml-2"
                        /> */}
                      </div>
                    ) : (
                      <div className="flex-1 flex justify-center items-center mx-auto">
                        {/* <div className=" bg-cs-grey-800 w-[38px] h-[38px] rounded-full flex justify-center items-center text-cs-grey-50 border-solid border-[0.5px] border-white">
                          MO
                        </div>
                        <Image
                          src={avatar}
                          alt=""
                          className=" max-w-[38px] max-h-[38px] rounded-full -ml-2"
                        /> */}
                        {attendees
                          .slice(displayCards - 2, displayCards)
                          .map((item, index) => (
                            <div
                              className=" bg-cs-grey-800 w-[38px] h-[38px] rounded-full flex justify-center items-center text-cs-grey-50 border-solid border-[0.5px] border-white -ml-2"
                              key={index}
                            >
                              {/* {item.externalUserId} */}
                              {returName(item.externalUserId)}
                            </div>
                          ))}
                        <div className=" bg-cs-grey-800 w-[38px] h-[38px] rounded-full flex justify-center items-center text-cs-grey-50 text-[10px] -ml-2 border-solid border-[0.5px] border-white">
                          +{attendeeItems.length - (displayCards - 1)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* @[300px]/meetingTiles:flex-row @[300px]/meetingTiles:flex-wrap */}
          {/* <div className="w-full @container/meetingTiles">
          <div className="w-full flex flex-col gap-4 h-full flex-4 @[300px]/meetingTiles:flex-row flex-wrap">
            <AttendeeItemsList attendees={attendees} />
          </div>
        </div> */}

          <div
            className="w-0 overflow-hidden transition-all @container/bigScreenSideCards"
            ref={participantsRef}
            style={
              sideView !== ""
                ? {
                    width: participantsRef.current?.scrollWidth + "px",
                    // height: participantsRef.current?.scrollHeight + "px",
                    overflow: "visible",
                    flex: "1 1 50%",
                    minWidth: screenWidth < 1025 ? 190 : 300,
                    marginLeft: 16,
                  }
                : {
                    width: "0px",
                    // height: '0px',
                    overflow: "hidden",
                    flex: "1 1 0%",
                    marginLeft: 0,
                  }
            }
          >
            {sideView === "Participants" && (
              <Participants
                attendees={attendees}
                sideViewFunc={sideViewFunc}
                meetingManager={meetingManager}
              />
            )}

            <div
              style={
                sideView === "Chat"
                  ? {
                      width: "100%",
                      height: "100%",
                      overflow: "visible",
                    }
                  : {
                      width: "0",
                      height: "0",
                      overflow: "hidden",
                    }
              }
            >
              {externalID && (
                <Chat
                  attendeeIDProp={attendeIDString}
                  externalID={processString(externalID as string)}
                  sideViewFunc={sideViewFunc}
                />
              )}
            </div>

            <div
              style={
                sideView === "Caption"
                  ? {
                      width: "100%",
                      height: "100%",
                      overflow: "visible",
                    }
                  : {
                      width: "0",
                      height: "0",
                      overflow: "hidden",
                    }
              }
            >
              <div
                className={` h-full bg-cs-grey-50 border-solid border border-[#F1F1F1] rounded-[4px] px-2 @[300px]/bigScreenSideCards:px-4 pt-5 overflow-y-scroll no-scrollbar`}
              >
                <div className=" flex justify-between items-center">
                  <h3 className=" text-cs-grey-dark font-medium @[300px]/bigScreenSideCards:text-2xl">
                    Caption
                  </h3>
                  <Image
                    src={closeIconPurple}
                    alt="close-icon"
                    onClick={() => sideViewFunc("")}
                    className="cursor-pointer w-5 @[300px]/bigScreenSideCards:w-6"
                  />
                </div>

                {!captionOn && (
                  <div className="h-full flex justify-center items-center">
                    <div>
                      <div
                        className={`p-3 bg-[#E1C6FF4D] rounded-[15px] w-fit mx-auto bg-gradient-to-t from-[#E1C6FF33] to-[#E1C6FF4D]`}
                      >
                        <Image
                          src={capturePurple}
                          alt="hand"
                          width={20}
                          height={20}
                          className="min-w-8 max-w-8"
                        />
                      </div>
                      <h3 className=" font-medium text-lg text-cs-grey-dark my-3">
                        Captions are not enabled yet
                      </h3>
                      <div className="mx-auto w-fit">
                        <button
                          className=" text-cs-purple-650 font-bold text-sm rounded-[10px] border border-cs-grey-150 p-3"
                          onClick={handleSignUpSubmit}
                        >
                          Turn on caption
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {captionOn && (
                  <div
                    className="flex flex-col overflow-y-scroll h-full no-scrollbar"
                    ref={captionScroll}
                  >
                    {/* {messages.map((message, index) => ( */}
                    <div className=" align-bottom">
                      <div className=" flex py-1 gap-x-1">
                        {/* <Image src={avatar} alt="profile" className=" rounded-full w-5 h-5 object-cover" /> */}
                        <div className=" bg-cs-grey-800 w-6 h-6 min-w-6  rounded-full flex justify-center items-center text-cs-grey-50 text-xs uppercase">
                          {getRemoteInitials("Emmanue Kalu")}
                        </div>
                        <div>
                          <div className=" flex items-center gap-x-2 mt-[3px]">
                            <h4 className=" text-cs-grey-dark font-medium text-xs capitalize">
                              {processString("Emmanuel")}
                            </h4>
                          </div>
                          <p className=" text-xs font-normal text-cs-grey-800">
                            Lorem ipsum dolor sit amet consectetur. Vulputate
                            erat massa nunc ornare ornare orci. Tellus turpis
                            ipsum in in. Neque amet leo odio ut tortor odio
                            nulla tempor non. Et feugiat dictum neque nisi eget
                            nisi at nulla feugiat. Molestie bibendum cursus leo
                            egestas.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className=" align-bottom">
                      <div className=" flex py-1 gap-x-1">
                        {/* <Image src={avatar} alt="profile" className=" rounded-full w-5 h-5 object-cover" /> */}
                        <div className=" bg-cs-grey-800 w-6 h-6 min-w-6  rounded-full flex justify-center items-center text-cs-grey-50 text-xs uppercase">
                          {getRemoteInitials("Emmanue Kalu")}
                        </div>
                        <div>
                          <div className=" flex items-center gap-x-2 mt-[3px]">
                            <h4 className=" text-cs-grey-dark font-medium text-xs capitalize">
                              {processString("Emmanuel")}
                            </h4>
                          </div>
                          <p className=" text-xs font-normal text-cs-grey-800">
                            Lorem ipsum dolor sit amet consectetur. Vulputate
                            erat massa nunc ornare ornare orci. Tellus turpis
                            ipsum in in. Neque amet leo odio ut tortor odio
                            nulla tempor non. Et feugiat dictum neque nisi eget
                            nisi at nulla feugiat. Molestie bibendum cursus leo
                            egestas.
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* ))} */}
                  </div>
                )}
              </div>
            </div>

            {sideView === "Conference Info" && (
              <Conference
                sideViewFunc={sideViewFunc}
                uuid={uuid}
                handleCopyClick={handleCopyClick}
                tooltipMessage={tooltipMessage}
              />
            )}
          </div>
        </div>
      </div>

      {/* small screen */}
      <div className=" md:hidden h-full metro-medium">
        {tileId &&
          sideView === "" && ( //screen share
            <div className=" bg-cs-black-200 px-4 py-5 rounded-[4px]">
              <div className=" h-full flex flex-col">
                {/* <div className="flex gap-x-3 items-center mb-2">
                <div className="p-[4px] bg-cs-grey-50 rounded-lg">
                <RecordCircle size="24" color="#CB3A32" variant="Bulk" />
                </div>
                <div className=" text-cs-grey-50 font-normal">
                  Conference is recorded
                </div>
                <div className=" w-[1px] bg-cs-grey-200 min-h-6"></div>
                <h3 className=" text-cs-grey-50 font-semibold ">
                  <span className=" capitalize">
                    {processString(sharingExternalID as string)}{" "}
                  </span>
                </h3>
              </div> */}
                <div className="flex justify-center items-center rounded-lg overflow-hidden h-full">
                  <div className=" min-h-[200px] w-full h-full rounded-lg min-w-[200px]">
                    <ContentShare
                      nameplate={processString(externalID as string)}
                      className=" rounded-lg relative bg-slate-800 min-h-[200px] [&>video]:object-cover capitalize"
                      css="border: 1px solid"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

        {attendeeItems.length < 3 ? ( //meeting tiles
          <div
            className={`${sideView === "" ? "flex" : "hidden"} ${
              tileId ? "flex-row" : "flex-col h-full"
            }`}
          >
            {attendeeItems.map((chunk, index) => (
              <div
                className={` flex ${
                  tileId ? "w-1/2" : "h-full"
                } items-center justify-center @container/meetingCard p-2`}
                key={index}
              >
                {chunk}
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`${
              sideView === "" ? "flex" : "hidden"
            } overflow-auto snap-x no-scrollbar gap-x-4 ${
              tileId ? "h-1/2" : "h-full"
            }`}
            style={{ scrollSnapType: "x mandatory" }}
          >
            {smallScreenTiles.slice(0, 2).map((chunk, index) => (
              <div
                key={index}
                className={`min-w-full flex flex-wrap snap-start ${
                  tileId ? "h-1/2" : "h-full"
                }`}
                //@ts-ignore
                ref={(el) => (chunkRefs.current[index] = el)}
                id={`${index}`}
              >
                {chunk.map((item: any) => (
                  <div
                    key={item.id}
                    className={` ${
                      chunk.length < 2 ? "w-full" : "w-1/2"
                    } flex items-center justify-center @container/meetingCard p-2`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            ))}
            {smallScreenTiles[2] && (
              <div
                //@ts-ignore
                ref={(el: HTMLDivElement | null) => (chunkRefs.current[2] = el)}
                id="2"
                className={`min-w-full flex flex-wrap snap-start ${
                  tileId ? "h-1/2" : "h-full"
                }`}
              >
                {smallScreenTiles[2].length === 6
                  ? smallScreenTiles[2].slice(0, 5).map((item: any) => (
                      <div
                        key={item.id}
                        className={` ${
                          smallScreenTiles[2].length < 2 ? "w-full" : "w-1/2"
                        } flex items-center justify-center @container/meetingCard p-2`}
                      >
                        {item}
                      </div>
                    ))
                  : smallScreenTiles[2].map((item: any) => (
                      <div
                        key={item.id}
                        className={` ${
                          smallScreenTiles[2].length < 2 ? "w-full" : "w-1/2"
                        } flex items-center justify-center @container/meetingCard p-2`}
                      >
                        {item}
                      </div>
                    ))}
                {!tileId && attendeeItems.length >= 18 && (
                  <div className="flex-1 mx-auto p-2 ">
                    <div className=" flex justify-center items-center bg-cs-black-200 rounded h-full">
                      {/* <div className=" bg-cs-grey-800 w-[38px] h-[38px] rounded-full flex justify-center items-center text-cs-grey-50 border-solid border-[0.5px] border-white">
                          MO
                        </div>
                        <Image
                          src={avatar}
                          alt=""
                          className=" max-w-[38px] max-h-[38px] rounded-full -ml-2"
                        /> */}

                      <div className=" bg-cs-grey-800 w-[38px] h-[38px] rounded-full flex justify-center items-center text-cs-grey-50 text-[10px] border-solid border-[0.5px] border-white">
                        +{attendeeItems.length - 17}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div
          className="w-0 overflow-hidden transition-all @container/bigScreenSideCards p-2"
          style={
            sideView !== ""
              ? {
                  width: "100%",
                  overflow: "visible",
                  height: "100%",
                }
              : {
                  width: "0px",
                  overflow: "hidden",
                  height: "0",
                }
          }
        >
          {sideView === "Participants" && (
            <Participants
              attendees={attendees}
              sideViewFunc={sideViewFunc}
              meetingManager={meetingManager}
            />
          )}

          <div
            style={
              sideView === "Chat"
                ? {
                    width: "100%",
                    height: "100%",
                    overflow: "visible",
                  }
                : {
                    width: "0",
                    height: "0",
                    overflow: "hidden",
                  }
            }
          >
            {externalID && (
              <Chat
                attendeeIDProp={attendeIDString}
                externalID={processString(externalID as string)}
                sideViewFunc={sideViewFunc}
              />
            )}
          </div>

          <div
            style={
              sideView === "Caption"
                ? {
                    width: "100%",
                    height: "100%",
                    overflow: "visible",
                  }
                : {
                    width: "0",
                    height: "0",
                    overflow: "hidden",
                  }
            }
          >
            <div
              className={` h-full bg-cs-grey-50 border-solid border border-[#F1F1F1] rounded-[4px] px-2 @[300px]/bigScreenSideCards:px-4 pt-5 overflow-y-scroll no-scrollbar`}
            >
              <div className=" flex justify-between items-center">
                <h3 className=" text-cs-grey-dark font-medium @[300px]/bigScreenSideCards:text-2xl">
                  Caption
                </h3>
                <Image
                  src={closeIconPurple}
                  alt="close-icon"
                  onClick={() => sideViewFunc("")}
                  className="cursor-pointer w-5 @[300px]/bigScreenSideCards:w-6"
                />
              </div>

              {!captionOn && (
                <div className="h-full flex justify-center items-center">
                  <div>
                    <div
                      className={`p-3 bg-[#E1C6FF4D] rounded-[15px] w-fit mx-auto bg-gradient-to-t from-[#E1C6FF33] to-[#E1C6FF4D]`}
                    >
                      <Image
                        src={capturePurple}
                        alt="hand"
                        width={20}
                        height={20}
                        className="min-w-8 max-w-8"
                      />
                    </div>
                    <h3 className=" font-medium text-lg text-cs-grey-dark my-3">
                      Captions are not enabled yet
                    </h3>
                    <div className="mx-auto w-fit">
                      <button className=" text-cs-purple-650 font-bold text-sm rounded-[10px] border border-cs-grey-150 p-3">
                        Turn on caption
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {captionOn && (
                <div
                  className="flex flex-col overflow-y-scroll h-full no-scrollbar"
                  ref={captionScroll}
                >
                  {/* {messages.map((message, index) => ( */}
                  <div className=" align-bottom">
                    <div className=" flex py-1 gap-x-1">
                      {/* <Image src={avatar} alt="profile" className=" rounded-full w-5 h-5 object-cover" /> */}
                      <div className=" bg-cs-grey-800 w-6 h-6 min-w-6  rounded-full flex justify-center items-center text-cs-grey-50 text-xs uppercase">
                        {getRemoteInitials("Emmanue Kalu")}
                      </div>
                      <div>
                        <div className=" flex items-center gap-x-2 mt-[3px]">
                          <h4 className=" text-cs-grey-dark font-medium text-xs capitalize">
                            {processString("Emmanuel")}
                          </h4>
                        </div>
                        <p className=" text-xs font-normal text-cs-grey-800">
                          Lorem ipsum dolor sit amet consectetur. Vulputate erat
                          massa nunc ornare ornare orci. Tellus turpis ipsum in
                          in. Neque amet leo odio ut tortor odio nulla tempor
                          non. Et feugiat dictum neque nisi eget nisi at nulla
                          feugiat. Molestie bibendum cursus leo egestas.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className=" align-bottom">
                    <div className=" flex py-1 gap-x-1">
                      {/* <Image src={avatar} alt="profile" className=" rounded-full w-5 h-5 object-cover" /> */}
                      <div className=" bg-cs-grey-800 w-6 h-6 min-w-6  rounded-full flex justify-center items-center text-cs-grey-50 text-xs uppercase">
                        {getRemoteInitials("Emmanue Kalu")}
                      </div>
                      <div>
                        <div className=" flex items-center gap-x-2 mt-[3px]">
                          <h4 className=" text-cs-grey-dark font-medium text-xs capitalize">
                            {processString("Emmanuel")}
                          </h4>
                        </div>
                        <p className=" text-xs font-normal text-cs-grey-800">
                          Lorem ipsum dolor sit amet consectetur. Vulputate erat
                          massa nunc ornare ornare orci. Tellus turpis ipsum in
                          in. Neque amet leo odio ut tortor odio nulla tempor
                          non. Et feugiat dictum neque nisi eget nisi at nulla
                          feugiat. Molestie bibendum cursus leo egestas.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* ))} */}
                </div>
              )}
            </div>
          </div>

          {sideView === "Conference Info" && (
            <Conference
              sideViewFunc={sideViewFunc}
              uuid={uuid}
              handleCopyClick={handleCopyClick}
              tooltipMessage={tooltipMessage}
            />
          )}
        </div>
      </div>
      <div className="md:hidden flex justify-center gap-x-1 items-center my-1">
        {sideView === "" &&
          smallScreenTiles.map(
            (
              paginator,
              index //paginator
            ) => (
              <div
                key={index}
                className={`${
                  `${index}` === `${inviewSmallContainer}`
                    ? "bg-cs-purple-650"
                    : "bg-cs-grey-60"
                } h-[5px] w-[5px] rounded-full transition-all`}
              ></div>
            )
          )}
      </div>
    </>
  );
}
