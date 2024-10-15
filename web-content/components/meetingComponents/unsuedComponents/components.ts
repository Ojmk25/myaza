// This is the part where people who are in a meting are shown

//         {/* People shown in a meeting */}
//         <div className="flex-6 grid pl-6 gap-4">
//           <div className=" bg-cs-black-200 flex-1 p-2 rounded flex flex-col sm:max-w-[352px]">
//             <div className=" flex justify-end">
//               <div className="p-[6px] bg-cs-grey-800 rounded-full"><MicrophoneSlash1 size="14" color="#FAFAFA" /></div>
//             </div>
//             <div className="flex-1 flex justify-center items-center">
//               <div className="p-[6px]">
//                 <Image src={avatar} alt="" className=" max-w-[38px] max-h-[38px] rounded-full mx-auto" />
//                 <h5 className="text-cs-grey-50 text-xs">Marie Oju</h5>
//               </div>
//             </div>
//             <div className=" flex justify-end">
//               <div className="p-[6px]"><Image src={dottedLine} alt="" className=" w-3 h-3" /></div>
//             </div>
//           </div>
//           <div className=" bg-cs-black-200 flex-1 p-2 rounded flex flex-col sm:max-w-[352px]">
//             <div className=" flex justify-end">
//               <div className="p-[6px] bg-cs-grey-800 rounded-full"><MicrophoneSlash1 size="14" color="#FAFAFA" /></div>
//             </div>
//             <div className="flex-1 flex justify-center items-center">
//               <div className="p-[6px]">
//                 <div className=" bg-cs-grey-800 w-[38px] h-[38px] rounded-full mx-auto flex justify-center items-center text-cs-grey-50">MO</div>
//                 <h5 className="text-cs-grey-50 text-xs">Marie Oju</h5>
//               </div>
//             </div>
//             <div className=" flex justify-end">
//               <div className="p-[6px]"><Image src={dottedLine} alt="" className=" w-3 h-3" /></div>
//             </div>
//           </div>
//           {/* More people in a meeting represented by numbers */}
//           {/* <div className=" bg-cs-black-200 flex-1 p-2 rounded flex flex-col sm:max-w-[352px] min-h-[132px]">
//             <div className=" flex justify-end">
//               <div className="p-[6px] bg-cs-grey-800 rounded-full"><MicrophoneSlash1 size="14" color="#FAFAFA" /></div>
//             </div>
//             <div className="flex-1 flex justify-center items-center">
//               <div className=" bg-cs-grey-800 w-[38px] h-[38px] rounded-full flex justify-center items-center text-cs-grey-50">MO</div>
//               <Image src={avatar} alt="" className=" max-w-[38px] max-h-[38px] rounded-full -translate-x-3" />
//               <div className=" bg-cs-grey-800 w-[38px] h-[38px] rounded-full flex justify-center items-center text-cs-grey-50 text-[10px] -translate-x-6">+4</div>
//             </div>
//             <div className=" flex justify-end">
//               <div className="p-[6px]"><Image src={dottedLine} alt="" className=" w-3 h-3" /></div>
//             </div>
//           </div> */}

//           {/* video */}
//           <div className=" bg-cs-black-200 flex-1 rounded flex flex-col sm:max-w-[352px] h-[132px] relative">
//             {/* <div className=" flex justify-end"> */}
//             <div className="p-[6px] bg-[#fafafa71] rounded-full absolute top-[10px] right-[10px]"><MicrophoneSlash1 size="14" color="#080808" /></div>
//             {/* </div> */}
//             {/* <div className="flex-1 flex justify-center items-center">
//               <div className=" bg-cs-grey-800 w-[38px] h-[38px] rounded-full flex justify-center items-center text-cs-grey-50">MO</div>
//               <Image src={avatar} alt="" className=" max-w-[38px] max-h-[38px] rounded-full -translate-x-3" />
//               <div className=" bg-cs-grey-800 w-[38px] h-[38px] rounded-full flex justify-center items-center text-cs-grey-50 text-[10px] -translate-x-6">+4</div>
//             </div> */}
//             {/* <div className=" flex justify-end"> */}
//             <div className="p-[6px] bg-[#655D5DB2] rounded-full absolute bottom-[10px] right-[10px]"><Image src={dottedLine} alt="" className=" w-3 h-3" /></div>
//             {/* </div> */}
//             <Image src={avatar} alt="" className="h-full w-full rounded" />
//           </div>
//         </div>

// <div className=" flex-5 bg-cs-black-200 px-10 py-5 rounded-[4px]">
// <div className="flex gap-x-3 flex-2 items-center mb-4">
//   <div className="p-[4px] bg-cs-grey-50 rounded-lg"><RecordCircle size="24" color="#CB3A32" variant="Bulk" /></div>
//   <div className=" text-cs-grey-50 font-normal">Conference is recorded</div>
//   <div className=" w-[1px] bg-cs-grey-200 min-h-6"></div>
//   <h3 className=" text-cs-grey-50 font-semibold ">Anthony Femi</h3>
// </div>
// <div className=" flex">
//   <Image src={videoImg} alt="" className=" max-w-full max-h-[297px]" />
//   {/* <video src="" className=" w-full max-h-[297px] block" ref={videoRef}></video> */}
//   <div className=" relative" ref={videoRef}>
//   </div>
// </div>
// </div>

// const showMeeting = async () => {
//   if (videRef.current !== null) {
//     meetingManager.audioVideo?.stopVideoPreviewForVideoInput(videRef.current);
//   }
//   // document.getElementById("selfViewLabel").textContent = "Self View";
//   // document.getElementById("join").disabled = true;

//   // const audioOutputElement = document.getElementById("audio") as HTMLAudioElement;
//   // try {
//   //   await meetingManager.audioVideo?.bindAudioElement(audioOutputElement);
//   // } catch (e) {
//   //   console.log("Failed to bindAudioElement ", e);
//   // }
//   const videoInputs = await meetingManager.audioVideo?.listVideoInputDevices();
//   await meetingManager.audioVideo?.startVideoInput(videoInputs![0].deviceId);

//   meetingManager.audioVideo!.startLocalVideoTile()
//   console.log(meetingManager.audioVideo!.getAllRemoteVideoTiles())
//   const observer = {
//     audioVideoDidStart: () => {
//       console.log("audioVideoDidStart fired");
//       meetingManager.audioVideo?.startLocalVideoTile();
//     },
//     videoTileDidUpdate: (tileState: any) => {
//       console.log("videoTileDidUpdate fired", tileState);
//       if (!tileState.boundAttendeeId) {
//         return;
//       }
//       if (tileState.localTile) {
//         meetingManager.audioVideo?.bindVideoElement(
//           tileState.tileId,
//           videRef.current as HTMLVideoElement,
//         );
//         console.log("local tile");
//       } else {

//         let videoElementNew = document.getElementById(tileState.tileId);
//         if (!videoElementNew) {

//           videoElementNew = newVideoRef.current;
//           // const tdRef = useRef<HTMLTableDataCellElement>(null);
//           // const trRef = useRef<HTMLTableRowElement>(null);

//           if (tdRef.current?.childNodes.length! >= 2) {
//             const tr_node = document.createElement("tr");
//             tr_node.style.width = "100%";
//             trRef.current?.appendChild(tr_node);
//           }

//           const td_node = document.createElement("td");
//           tdRef.current?.appendChild(td_node);

//           const vid_node = document.createElement("video");
//           vid_node.id = tileState.tileId;
//           vid_node.style.height = "auto";
//           vid_node.style.width = "100%";
//           td_node.appendChild(vid_node);

//           const videoElementNews = document.getElementById(tileState.tileId) as HTMLVideoElement;
//           meetingManager.audioVideo?.bindVideoElement(
//             tileState.tileId,
//             videoElementNew as HTMLVideoElement
//           );
//         }
//       }
//     },
//     videoTileWasRemoved: (tileId: any) => {
//       const videoElementRemoved = document.getElementById(tileId);
//       videoElementRemoved?.remove();
//     },
//     // audioVideoDidStop: async (sessionStatus) => {
//     //   await meetingSession.audioVideo.stopAudioInput();

//     //   // Or use the destroy API to call stopAudioInput and stopVideoInput.
//     //   meetingManager.deviceController.destroy();
//     // },
//   };

//   // const buttonMute = document.getElementById("mic-muted");
//   // buttonMute.checked = false;
//   // buttonMute.addEventListener("change", function () {
//   //   if (buttonMute.checked) {
//   //     meetingManager.audioVideo?.realtimeMuteLocalAudio();
//   //     console.log("mic is muted");
//   //   } else {
//   //     meetingManager.audioVideo?.realtimeUnmuteLocalAudio();
//   //     console.log("mic is unmuted");
//   //   }
//   // }
//   // );

//   meetingManager.audioVideo?.start();
//   meetingManager.audioVideo?.addObserver(observer);
//   // meetingManager.audioVideo?.stopLocalVideoTile();

// }

// const showMeeting = async () => {
//   meetingManager.audioVideo?.stopVideoPreviewForVideoInput(videRef.current as HTMLVideoElement);

//   // const audioOutputElement = document.getElementById("audio") as HTMLAudioElement;
//   // try {
//   //   await meetingManager.audioVideo?.bindAudioElement(audioOutputElement);
//   // } catch (e) {
//   //   console.log("Failed to bindAudioElement ", e);
//   // }

//   const observer = {
//     audioVideoDidStart: () => {
//       console.log("audioVideoDidStart fired");
//       meetingManager.audioVideo?.startLocalVideoTile();
//     },
//     videoTileDidUpdate: (tileState: any) => {
//       console.log("videoTileDidUpdate fired", tileState);
//       if (!tileState.boundAttendeeId) {
//         return;
//       }
//       if (tileState.localTile) {
//         meetingManager.audioVideo?.bindVideoElement(
//           tileState.tileId,
//           videRef.current as HTMLVideoElement,
//         );
//         console.log("local tile");
//       } else {

//         let videoElementNew = document.getElementById(tileState.tileId);
//         if (!videoElementNew) {

//           videoElementNew = newVideoRef.current;
//           // const tdRef = useRef<HTMLTableDataCellElement>(null);
//           // const trRef = useRef<HTMLTableRowElement>(null);

//           if (tdRef.current?.childNodes.length! >= 2) {
//             const tr_node = document.createElement("tr");
//             tr_node.style.width = "100%";
//             trRef.current?.appendChild(tr_node);
//           }

//           const td_node = document.createElement("td");
//           tdRef.current?.appendChild(td_node);

//           const vid_node = document.createElement("video");
//           vid_node.id = tileState.tileId;
//           vid_node.style.height = "auto";
//           vid_node.style.width = "100%";
//           td_node.appendChild(vid_node);

//           const videoElementNews = document.getElementById(tileState.tileId) as HTMLVideoElement;
//           meetingManager.audioVideo?.bindVideoElement(
//             tileState.tileId,
//             videoElementNew as HTMLVideoElement
//           );
//         }
//       }
//     },
//     videoTileWasRemoved: (tileId: any) => {
//       const videoElementRemoved = document.getElementById(tileId);
//       videoElementRemoved?.remove();
//     },
//     audioVideoDidStop: async (sessionStatus) => {
//       await meetingSession.audioVideo.stopAudioInput();

//       // Or use the destroy API to call stopAudioInput and stopVideoInput.
//       // meetingManager.deviceController.destroy();
//     },
//   };

//   meetingManager.audioVideo?.start();
//   meetingManager.audioVideo?.addObserver(observer);
//   meetingManager.audioVideo?.stopLocalVideoTile();

// }

// function calculateElementSize(
//   containerWidth,
//   containerHeight,
//   numElements,
//   targetAspectRatio
// ) {
//   // 1. Calculate the container aspect ratio
//   const containerAspectRatio = containerWidth / containerHeight;

//   // 2. Determine number of rows and columns
//   let columns = Math.ceil(Math.sqrt(numElements)); // Approximate number of columns
//   let rows = Math.ceil(numElements / columns); // Calculate number of rows

//   // 3. Calculate max available width and height for each element
//   let maxElementWidth = containerWidth / columns;
//   let maxElementHeight = containerHeight / rows;

//   // 4. Adjust based on the target aspect ratio
//   if (maxElementWidth / maxElementHeight > targetAspectRatio) {
//     // If the width is too wide for the aspect ratio, limit by height
//     maxElementWidth = maxElementHeight * targetAspectRatio;
//   } else {
//     // Otherwise, limit by width
//     maxElementHeight = maxElementWidth / targetAspectRatio;
//   }

//   // return ` max-w-[${maxElementWidth}px] max-h-[${maxElementHeight}px]`;
//   return maxElementWidth;
// }

// function calculateElementHeight(
//   containerWidth,
//   containerHeight,
//   numElements,
//   targetAspectRatio
// ) {
//   // 1. Calculate the container aspect ratio
//   const containerAspectRatio = containerWidth / containerHeight;

//   // 2. Determine number of rows and columns
//   let columns = Math.ceil(Math.sqrt(numElements)); // Approximate number of columns
//   let rows = Math.ceil(numElements / columns); // Calculate number of rows

//   // 3. Calculate max available width and height for each element
//   let maxElementWidth = containerWidth / columns;
//   let maxElementHeight = containerHeight / rows;

//   // 4. Adjust based on the target aspect ratio
//   if (maxElementWidth / maxElementHeight > targetAspectRatio) {
//     // If the width is too wide for the aspect ratio, limit by height
//     maxElementWidth = maxElementHeight * targetAspectRatio;
//   } else {
//     // Otherwise, limit by width
//     maxElementHeight = maxElementWidth / targetAspectRatio;
//   }

//   // return ` max-w-[${maxElementWidth}px] max-h-[${maxElementHeight}px]`;
//   return maxElementHeight;
// }

// import { listAttendees } from "@/services/meetingServices";
// import {
//   MeetingManager,
//   useAttendeeStatus,
//   useAudioVideo,
//   useRemoteVideoTileState,
//   useRosterState,
//   RosterAttendee,
// } from "amazon-chime-sdk-component-library-react";
// import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/router";
// import { LocalAttendeeCard } from "./LocalAttendeeCard";
// import { RemoteAttendeeCard } from "./RemoteAttendeeCard";
// // import useCustomAttendeeStatus from "@/hooks/useNetworkStatus";
// import { stat } from "fs";
// import { useAppContext } from "@/context/StoreContext";

// const AttendeeStatus = ({ attendeeId }: { attendeeId: string }) => {
//   const { videoEnabled, sharingContent, muted } = useAttendeeStatus(attendeeId);
//   return { video: videoEnabled || sharingContent, audio: !muted };
// };

// type DynamicWidth = {
//   width: number | string;
//   maxWidth: number | string;
// };

// type AtteendeeDetailsProp = {
//   full_name: string;
//   picture?: string;
//   user_id?: string;
// };
// function MeetingTiles({
//   attendeIDString,
//   externalID,
//   sideView,
//   sideViewFunc,
//   meetingManager,
//   emoji,
//   meetingId,
//   attendeeDetailPass,
// }: {
//   attendeIDString: string | null | undefined;
//   externalID: string | null | undefined;
//   sideView?: string;
//   sideViewFunc: (value: string) => void;
//   meetingManager: MeetingManager;
//   emoji: any;
//   meetingId: string | null;
//   attendeeDetailPass: AtteendeeDetailsProp[];
// }) {
//   const { roster } = useRosterState();
//   const attendees = Object.values(roster);
//   const audioVideo = useAudioVideo();
//   const router = useRouter();
//   const bigContainerTileRef = useRef<HTMLDivElement>(null);
//   const containerTileRef = useRef<HTMLDivElement>(null);
//   const [screenWidth, setScreenWidth] = useState<number>(0);
//   const [changingWidth, setChangingWidth] = useState<number>(0);
//   const [dynamicWidth, setDynamicWidth] = useState<DynamicWidth>({
//     width: "",
//     maxWidth: "",
//   });
//   const [bigContainerWidth, setBigContainerWidth] = useState(0);
//   const [bigContainerHeight, setBigContainerHeight] = useState(0);
//   const [displayCards, setDisplayCards] = useState<number>();
//   const [sessionPeople, setSessionPeople] = useState<
//     { full_name: ""; picture: ""; user_id: "" }[]
//   >([]);
//   const { tiles, tileIdToAttendeeId, attendeeIdToTileId, size } =
//     useRemoteVideoTileState();
//   const { appState, setAppState } = useAppContext();
//   // const [rosterArray, setRosterArray] = useState<any[]>([]);

//   const [rosterArray, setRosterArray] = useState<any[]>([]); // State to hold the updated roster array

//   function updateSessionStorageArray(key: string, newArray: any[]) {
//     // Check if the item exists in session storage
//     const storedData = sessionStorage.getItem(key);

//     let updatedArray: any[];

//     if (storedData) {
//       // Parse the existing array from session storage
//       const parsedArray = JSON.parse(storedData);

//       // Merge the arrays
//       const mergedArray = [...parsedArray, ...newArray];

//       // Remove duplicates by filtering the array (assuming you want to remove exact duplicates)
//       updatedArray = mergedArray.filter(
//         (item, index, self) =>
//           self.findIndex((i) => JSON.stringify(i) === JSON.stringify(item)) ===
//           index
//       );
//     } else {
//       // If the item doesn't exist, just use the new array
//       updatedArray = newArray;
//     }

//     // Save the updated array back to session storage
//     sessionStorage.setItem(key, JSON.stringify(updatedArray));
//   }

//   const getAttendeesList = async (meetingId: string) => {
//     try {
//       const response = await listAttendees({
//         meeting_id: meetingId,
//       });
//       if (response) {
//         const { data } = response.data.body;
//         updateSessionStorageArray("meetingAttendees", data);
//         const sessionAttendee = sessionStorage.getItem("meetingAttendees");
//         if (sessionAttendee) {
//           const parsed = JSON.parse(sessionAttendee);
//           setSessionPeople(parsed);
//         }

//         console.log(data);
//         const attendee = response.data.body;
//         // setAppState((prevState) => ({
//         //   ...prevState,
//         //   sessionState: {
//         //     ...prevState.sessionState,
//         //     meetingAttendees: data,
//         //   },
//         // }));
//         return data;
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//     }
//   };
//   useEffect(() => {
//     if (!audioVideo) {
//       return;
//     }

//     // Callback function to handle attendee presence changes
//     const handleAttendeePresence = async (
//       attendeeId: string,
//       present: boolean
//     ) => {
//       if (present) {
//         console.log(`Attendee ${attendeeId} joined the meeting`);
//         await getAttendeesList(router.query.link as string);

//         // audioVideo.addObserver({
//         //   videoTileDidUpdate: (tileState) => {
//         //     const attendeeId = tileState.boundAttendeeId;
//         //     console.log(
//         //       `Attendee ${attendeeId} has video ${
//         //         tileState.active ? "enabled" : "disabled"
//         //       }`
//         //     );
//         //     tileState.active
//         //       ? setAppState((prevState) => ({
//         //           ...prevState,
//         //           sessionState: {
//         //             ...prevState.sessionState,
//         //             audioState: [
//         //               ...prevState.sessionState.audioState,
//         //               {
//         //                 volume: 0,
//         //                 mute: muted,
//         //                 attendeeId: `${attendeeId}`,
//         //               },
//         //             ],
//         //           },
//         //         }))
//         //       : setAppState((prevState) => {
//         //           // Filter out the attendee if they already exist
//         //           const filteredAudioState =
//         //             prevState.sessionState.audioState.filter(
//         //               (audio) => audio.attendeeId !== attendeeId
//         //             );

//         //           // Return updated state with the new attendee added
//         //           return {
//         //             ...prevState,
//         //             sessionState: {
//         //               ...prevState.sessionState,
//         //               audioState: [
//         //                 ...filteredAudioState, // Keep existing ones without the matching attendeeId
//         //               ],
//         //             },
//         //           };
//         //         });
//         //   },
//         // });
//       } else {
//         console.log(`Attendee ${attendeeId} left the meeting ${present}`);
//         setAppState((prevState) => {
//           const updatedAudioState = prevState.sessionState.audioState.filter(
//             (item) => item.attendeeId !== attendeeId
//           );

//           return {
//             ...prevState,
//             sessionState: {
//               ...prevState.sessionState,
//               audioState: updatedAudioState,
//             },
//           };
//         });
//       }
//     };

//     // Subscribe to attendee presence changes
//     audioVideo.realtimeSubscribeToAttendeeIdPresence(handleAttendeePresence);

//     // Cleanup function to unsubscribe from attendee presence changes
//     return () => {
//       audioVideo.realtimeUnsubscribeToAttendeeIdPresence(
//         handleAttendeePresence
//       );
//     };
//   }, [audioVideo, router.isReady]);

//   console.log(appState.sessionState.audioState);

//   useEffect(() => {
//     if (containerTileRef.current && changingWidth <= 699) {
//       if (attendees.length < 3) {
//         setDynamicWidth({ width: "100%", maxWidth: "100%" });
//       } else {
//         setDynamicWidth({ width: "100%", maxWidth: 230 });
//       }
//     } else if (
//       (containerTileRef.current && changingWidth >= 700) ||
//       changingWidth <= 890
//     ) {
//       if (attendees.length < 5) {
//         setDynamicWidth({ width: "100%", maxWidth: "100%" });
//       } else {
//         setDynamicWidth({ width: "100%", maxWidth: 210 });
//       }
//     } else if (containerTileRef.current && changingWidth >= 891) {
//       if (attendees.length < 4) {
//         setDynamicWidth({ width: "100%", maxWidth: "100%" });
//       } else {
//         setDynamicWidth({ width: "100%", maxWidth: 300 });
//       }
//     }
//   }, [containerTileRef.current?.offsetWidth, changingWidth]);

//   useEffect(() => {
//     const resizeObserver = new ResizeObserver((entries) => {
//       for (let entry of entries) {
//         if (entry.target === containerTileRef.current) {
//           setChangingWidth(entry.contentRect.width);
//         }
//       }
//     });

//     if (containerTileRef.current) {
//       resizeObserver.observe(containerTileRef.current);
//     }

//     return () => {
//       if (containerTileRef.current) {
//         resizeObserver.unobserve(containerTileRef.current);
//       }
//     };
//   }, [sideView]);

//   useEffect(() => {
//     setBigContainerWidth(bigContainerTileRef?.current?.clientWidth as number);
//     setBigContainerHeight(bigContainerTileRef?.current?.clientHeight as number);
//     const audioVideo = meetingManager.audioVideo;
//     // if (audioVideo?.transcriptionController) {
//     //   audioVideo.transcriptionController.subscribeToTranscriptEvent(
//     //     (transcriptEvent: Transcript | TranscriptionStatus) => {
//     //       console.log(transcriptEvent);
//     //     }
//     //   );
//     // }

//     const resizeObserver = new ResizeObserver((entries) => {
//       for (let entry of entries) {
//         if (entry.target === bigContainerTileRef.current) {
//           // setChangingWidth(entry.contentRect.width);
//           // console.log(entry.contentRect.width);
//           setBigContainerWidth(entry.contentRect.width);
//           setBigContainerHeight(entry.contentRect.height);
//           if (entry.contentRect.width < 300) {
//             setDisplayCards(3);
//           } else if (
//             entry.contentRect.width > 300 &&
//             entry.contentRect.width < 645
//           ) {
//             setDisplayCards(4);
//           } else {
//             setDisplayCards(8);
//           }
//         }
//       }
//     });

//     if (bigContainerTileRef.current) {
//       resizeObserver.observe(bigContainerTileRef.current);
//     }

//     return () => {
//       if (bigContainerTileRef.current) {
//         resizeObserver.unobserve(bigContainerTileRef.current);
//       }
//     };
//   }, [sideView]);
//   console.log(attendees, sessionPeople);

//   useEffect(() => {
//     setAppState((prevState) => {
//       // Extract the attendee IDs from the roster array
//       const rosterAttendeeIds = attendees.map(
//         (attendee) => attendee.chimeAttendeeId
//       );
//       // Filter the audioState array to only include attendees present in the roster
//       const updatedAudioState = prevState.sessionState.audioState.filter(
//         (item) => rosterAttendeeIds.includes(item.attendeeId)
//       );
//       return {
//         ...prevState,
//         sessionState: {
//           ...prevState.sessionState,
//           audioState: updatedAudioState,
//         },
//       };
//     });
//   }, [attendees.length]);

//   useEffect(() => {
//     const sortedAttendees = appState.sessionState.audioState.sort((a, b) => {
//       // Always prioritize attendeeId "1121"
//       if (a.attendeeId === attendeIDString) return -1;
//       if (b.attendeeId === attendeIDString) return 1;

//       // Sort based on video or audio being true for other attendees
//       const aHasMedia = a.video || !a.mute;
//       const bHasMedia = b.video || !b.mute;

//       return aHasMedia === bHasMedia ? 0 : aHasMedia ? -1 : 1;
//     });
//     setRosterArray(sortedAttendees);
//   }, [appState.sessionState.audioState]);

//   return (
//     <>
//       {sessionPeople &&
//         rosterArray.map((attendee, i) => {
//           // const tilerId = attendeeIdToTileId[attendee.chimeAttendeeId];
//           // const { externalUserId } = attendee;
//           const tilerId = attendeeIdToTileId[attendee.attendeeId];
//           // const { externalUserId } = attendee;

//           // <div>
//           //   {
//           //     sessionPeople.find((att) => att.user_id === attendee.externalUserId)
//           //       ?.full_name
//           //   }{" "}
//           //   is the one on meeting
//           // </div>

//           if (i === 0) {
//             return (
//               <>
//                 <LocalAttendeeCard
//                   key={i}
//                   attendeeId={attendee.attendeeId}
//                   // ref={(el: any) => (tileRefs.current[i] = el)}
//                   name={attendee.attendeeId}
//                   videoTildId={1}
//                   nameID={attendee.attendeeId as string}
//                   // audioState={
//                   //   <ShowVisualizer
//                   //     attendee={attendee}
//                   //     meetingManager={meetingManager}
//                   //     // attendeeId={attendee.chimeAttendeeId}
//                   //     // audioVideo={audioVideo}
//                   //   />
//                   //   // <AudioVisualizerContainer
//                   //   //   attendee={attendee}
//                   //   //   meetingManager={meetingM}
//                   //   // />
//                   // }
//                   // attendeeDetails={attendeeDetailItems}
//                   //     sessionPeople.find((att) => att.user_id === attendee.externalUserId)
//                   // ?.full_name
//                   userOject={sessionPeople.find(
//                     (att) => att.user_id === attendee.attendeeId
//                   )}
//                   meetingManager={meetingManager}
//                   sideView={sideView}
//                 />
//                 <span>{attendee.attendeeId}</span>
//               </>
//             );
//           } else {
//             return (
//               // <RemoteAttendeeCard
//               //   key={attendee.chimeAttendeeId}
//               //   attendeeId={attendee.chimeAttendeeId}
//               //   // ref={(el: any) => (tileRefs.current[i] = el)}
//               //   name={externalUserId}
//               //   videoTildId={tilerId}
//               //   nameID={attendee.externalUserId as string}
//               //   // audioState={
//               //   //   <ShowVisualizer
//               //   //     attendee={attendee}
//               //   //     meetingManager={meetingManager}
//               //   //   />
//               //   //   // <AudioVisualizerContainer
//               //   //   //   attendee={attendee}
//               //   //   //   meetingManager={meetingM}
//               //   //   // />
//               //   // }
//               //   userOject={sessionPeople.find(
//               //     (att) => att.user_id === attendee.externalUserId
//               //   )}
//               //   sideView={sideView}
//               //   // attendeeDetails={attendeeDetailItems}
//               // />
//               <>
//                 <RemoteAttendeeCard
//                   key={attendee.attendeeId}
//                   attendeeId={attendee.attendeeId}
//                   // ref={(el: any) => (tileRefs.current[i] = el)}
//                   name={attendee.attendeeId}
//                   videoTildId={tilerId}
//                   nameID={attendee.attendeeId as string}
//                   // audioState={
//                   //   <ShowVisualizer
//                   //     attendee={attendee}
//                   //     meetingManager={meetingManager}
//                   //   />
//                   //   // <AudioVisualizerContainer
//                   //   //   attendee={attendee}
//                   //   //   meetingManager={meetingM}
//                   //   // />
//                   // }
//                   userOject={sessionPeople.find(
//                     (att) => att.user_id === attendee.attendeeId
//                   )}
//                   sideView={sideView}
//                   // attendeeDetails={attendeeDetailItems}
//                 />
//                 <span>{attendee.attendeeId}</span>
//               </>
//             );
//           }
//         })}
//     </>
//   );
// }
// // {item.full_name}
// export default MeetingTiles;
