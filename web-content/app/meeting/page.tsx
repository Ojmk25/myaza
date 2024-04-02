// "use client"
// import { useEffect, useRef, useState } from "react";
// import { AudioInputControl, AudioOutputControl, DeviceLabels, MeetingManager, useMeetingManager, VideoInputControl, VideoTileGrid, } from 'amazon-chime-sdk-component-library-react';
// import Image from "next/image";
// import { Coffee, EmojiHappy, InfoCircle, Messages1, MicrophoneSlash1, Monitor, ProfileAdd, RecordCircle, Setting2, VideoSlash } from "iconsax-react";

// import avatar from "@/public/assets/images/avatar.png"
// import dottedLine from "@/public/assets/images/dottedLine.svg"


// // import { setInterval } from "timers";
// import DateTimeDisplay from "../utils/getDate";
// import MeetingControl from "../components/meetingComponents/MeetingControl";
// import MeetingSection from "../components/meetingComponents/MeetingSection";
// import ShareScreen from "../components/modals/ShareScreen";
// import Settings from "../components/modals/Settings";
// import { MeetingSessionConfiguration } from "amazon-chime-sdk-js";
// import ReactDOM from "react-dom";
// import VideoTile from "../components/meetingComponents/VideoTile";





// export default function Home() {
//   const currentTimeRef = useRef<HTMLDivElement>(null);
//   const [showModal, setShowModal] = useState("");
//   const videRef = useRef<HTMLDivElement>(null)
//   const tdRef = useRef<HTMLTableDataCellElement>(null);
//   const trRef = useRef<HTMLTableRowElement>(null);
//   const newVideoRef = useRef<HTMLVideoElement>(null);
//   const [tiler, setTiler] = useState<any>()
//   // Array to hold videRef instances
//   const videRefs = useRef<Array<React.MutableRefObject<HTMLElement | null>>>([]);
//   const lineRefs = useRef([]);

//   const meetingManager = useMeetingManager();

//   // useEffect(() => {
//   //   init()
//   // }, [])

//   async function init() {
//     try {
//       const response = await fetch('https://dibxzaa24vvschnzknjn7m65pe0dvnlh.lambda-url.us-east-1.on.aws/',
//         {
//           mode: 'cors',
//         });

//       const data = await response.json();
//       const meetingSessionConfiguration = new MeetingSessionConfiguration(data.Meeting, data.Attendee);

//       // Create a `MeetingSession` using `join()` function with the `MeetingSessionConfiguration`
//       await meetingManager.join(meetingSessionConfiguration);
//       meetingManager.invokeDeviceProvider(DeviceLabels.AudioAndVideo);

//       // Start the `MeetingSession` to join the meeting
//       await meetingManager.start();

//       const videoElement = videRef.current as HTMLVideoElement;

//       meetingManager.audioVideo?.startVideoPreviewForVideoInput(videoElement);
//       // meetingManager.audioVideo.bindVideoElement(videoElement);

//       // joinMeeting()
//       // meetingManager.meetingSession.audioVideo.deviceController.activeDevices['video'].stream
//     } catch (error) {
//       console.error("An exception occurred:", error);
//       // Handle the exception here
//     }

//     // await initLocalDevices();
//   }




//   const handleShowModal = (type: string) => {
//     setShowModal(type);
//     document.body.classList.add('overflow-hidden');
//   };

//   const handleCloseModal = () => {
//     setShowModal("");
//     document.body.classList.remove('overflow-hidden');
//   };

//   useEffect(() => {
//     const updateCurrentTime = () => {
//       const displayDate = DateTimeDisplay;
//       const { hours, minutes, ampm } = displayDate();
//       if (currentTimeRef.current !== null) {
//         currentTimeRef.current.textContent = `${hours < 10 ? ('0' + hours) : hours}:${minutes < 10 ? ('0' + minutes) : minutes} ${ampm}`;
//       }

//     };
//     // Update the time initially
//     updateCurrentTime()

//     // Update the time every minute 
//     const intervalId = setInterval(updateCurrentTime, 60000);

//     // Clear the interval when the component unmounts
//     return () => {
//       clearInterval(intervalId);
//     };
//   }, []);


//   async function startMeeting() {
//     try {
//       const response = await fetch('https://dibxzaa24vvschnzknjn7m65pe0dvnlh.lambda-url.us-east-1.on.aws/',
//         {
//           mode: 'cors',
//         });

//       const data = await response.json();
//       //configure meeting seesion
//       const meetingSessionConfiguration = new MeetingSessionConfiguration(data.Meeting, data.Attendee);

//       await meetingManager.join(meetingSessionConfiguration);
//       meetingManager.invokeDeviceProvider(DeviceLabels.AudioAndVideo);
//       // Initialize Audio Video
//       const audioInputs = await meetingManager.audioVideo?.listAudioInputDevices();
//       const videoInputs = await meetingManager.audioVideo?.listVideoInputDevices();

//       if (audioInputs && videoInputs != null) {
//         await meetingManager.audioVideo?.startAudioInput(audioInputs[0].deviceId);
//         await meetingManager.audioVideo?.startVideoInput(videoInputs[0].deviceId);
//       }

//       const observer = {
//         // Tile State changed, so let's examine it.
//         videoTileDidUpdate: (tileState: any) => {
//           // if no attendeeId bound to tile, ignore it return
//           if (!tileState.boundAttendeeId) {
//             return;
//           }
//           //There is an attendee Id against the tile, and it's a valid meeting session, then update tiles view
//           if (!(meetingManager === null)) {
//             updateTiles(meetingManager);
//           }
//         },
//       };

//       // const eventObserver = {
//       //   // Check for events of interest for eg. Meeting End.
//       //   eventDidReceive(name:any, attributes:any) {
//       //     switch (name) {
//       //       case 'meetingEnded':
//       //         cleanup();
//       //         console.log("NOTE: Meeting Ended", attributes);
//       //         break;
//       //       case 'meetingReconnected':
//       //         console.log('NOTE: Meeting Reconnected...');
//       //         break;
//       //   }
//       //   }
//       // }

//       // Add observers for the meeting session
//       meetingManager.audioVideo?.addObserver(observer);
//       meetingManager.audioVideo?.realtimeSubscribeToAttendeeIdPresence(attendeeObserver);
//       // meetingManager.eventController?.addObserver(eventObserver);

//       const audioOutputElement = document.getElementById("meeting-audio") as HTMLAudioElement;
//       await meetingManager.audioVideo?.bindAudioElement(audioOutputElement);
//       await meetingManager.audioVideo?.start();
//       await meetingManager.audioVideo?.startLocalVideoTile();

//     } catch (error) {
//       console.error("An exception occurred:", error);
//       // Handle the exception here
//     }
//   }

//   function updateTiles(meetingSession: any) {
//     const tiles = meetingSession.audioVideo?.getAllVideoTiles();
//     setTiler(tiles);
//     console.log(tiles)
//     tiles.forEach((tile: any, i: any) => {
//       let tileId = tile.tileState.tileId
//       var divElement = document.getElementById("div-" + tileId);
//       if (!divElement) {

//         // Create divElement. Give it a unique id and name
//         // divElement = document.createElement("div");
//         // divElement.id = "div-" + + tileId;
//         // divElement.setAttribute("name", "div-" + tile.tileState.boundAttendeeId);
//         // divElement.style.display = "inline-block";
//         // divElement.style.padding = "5px";

//         // Create videoElement. Give it a unique id
//         let videoElement;
//         videoElement = document.createElement("video");
//         videoElement.id = "video-" + tileId;
//         videoElement.setAttribute("name", "video-" + tile.tileState.boundAttendeeId);
//         videoElement.style.width = "100%"
//         videoElement.style.height = "auto"
//         // videoElement.controls = true;

//         // // Create 'p' element for user name to display above video tile.
//         // let tileUserName, boundExtUserId;
//         // tileUserName = document.createElement("p");
//         // tileUserName.style.color = "blueviolet";
//         // boundExtUserId = tile.tileState.boundExternalUserId
//         // tileUserName.textContent = boundExtUserId.substring(0, boundExtUserId.indexOf("#"));

//         // // Append appropriately
//         // divElement.append(tileUserName);
//         // divElement.append(videoElement);
//         // document.getElementById("video-list")?.append(divElement);
//         let videEle = <VideoTile videoElement={videoElement} />

//         ReactDOM.render(videEle, document.getElementById("video-list"))
//         // videRef.current?.append(<VideoTile videoElement={videoElement} />);
//         meetingSession.audioVideo.bindVideoElement(
//           tileId,
//           videoElement
//         );

//       }
//     })
//   }

//   const attendees: any = new Set();

//   function attendeeObserver(attendeeId: any, present: any, externalUserId: any, dropped: any, posInFrame: any) {
//     console.log(attendeeId, present, externalUserId, dropped, posInFrame);
//     //Get Attendee User Name from externalUserId where it was set while joining meeting
//     let attendeeUserName = externalUserId.substring(0, externalUserId.indexOf("#"));

//     // If attendee 'present' is true, add to attendees set.
//     if (present) {
//       attendees.add(attendeeUserName);
//     }
//     else {
//       // Attendee no longer 'present', remove the attendee display div with video tile
//       const elements = document.getElementsByName("div-" + attendeeId);
//       elements[0].remove();

//       // For screen share attendeeId comes with #content suffix.
//       // Do not remove user from attendees if this is screen share closure update
//       if (!(attendeeId.indexOf("#content") >= 0)) {
//         attendees.delete(attendeeUserName);
//       }
//     }
//     console.log(attendeeId, posInFrame, externalUserId, dropped, present, 'ateendeeNwaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

//     refreshAttendeesDisplay();
//   };
//   console.log(attendees);

//   function refreshAttendeesDisplay() {
//     //Create list of attendees from attendees set, and then display.
//     let attendeeStr = "";
//     for (const item of attendees) {
//       attendeeStr = attendeeStr + item + " | ";
//     }
//     attendeeStr = attendeeStr.slice(0, -3);

//     // document.getElementById("Attendees")!.innerText = attendeeStr;
//   }

//   return (
//     <main className="px-6 flex flex-col h-dvh relative">
//       <div className="flex justify-between items-center py-4">
//         <div className="flex gap-x-1 items-center">
//           <h1 className=" text-3xl text-cs-purple-650 font-bold">CecureStream</h1>
//           <div className=" text-xs text-cs-grey-700 font-medium border-[0.5px] border-cs-grey-700 py-[2px] px-2 rounded-lg">Beta</div>
//         </div>
//         <div className="flex justify-between gap-x-4 items-center">
//           <div className=" flex bg-[#E1C6FF4D] py-[10px] px-[10px] gap-x-[10px] rounded-lg items-center cursor-pointer">
//             <InfoCircle size="20" color="#5E29B7" />
//             <div className="text-cs-purple-650 font-semibold">Conference Info</div>
//           </div>
//           <div className="bg-[#E1C6FF4D] p-[10px] rounded-lg flex justify-center items-center cursor-pointer" onClick={() => handleShowModal("settings")}><Setting2 size="20" color="#5E29B7" /></div>
//         </div>
//       </div>

//       <div>
//         <audio style={{ display: 'none' }} id="meeting-audio"></audio>
//         <button type="button" onClick={startMeeting}>Start Meeting</button>
//         <div id="video-list"></div>
//       </div>

//       {/* grid px-20 gap-x-16 items-center grid-cols-2 */}
//       <MeetingSection />
//       <div id="remoteVidTbl">
//         <main>
//           <div ref={trRef}>
//             <section ref={tdRef}></section>
//           </div>
//         </main>
//       </div>
//       <MeetingControl bgColor onOpen={() => handleShowModal("shareScreen")} />
//       {showModal === "shareScreen" && <ShareScreen onClose={handleCloseModal} />}
//       {showModal === "settings" && <Settings onClose={handleCloseModal} />}
//     </main>
//   );
// }

'use client'
import { LocalVideo, RemoteVideo, useAttendeeStatus, useLocalVideo, useMeetingManager, useRemoteVideoTileState, useRosterState, useToggleLocalMute, VideoTile, VideoTileGrid } from "amazon-chime-sdk-component-library-react";
import { MeetingSessionConfiguration, VideoTileState } from "amazon-chime-sdk-js";
import MeetingSection from "../components/meetingComponents/MeetingSection";
import MeetingControl from "../components/meetingComponents/MeetingControl";
import { useState } from "react";
import { InfoCircle, Setting2 } from "iconsax-react";
import ShareScreen from "../components/modals/ShareScreen";
import Settings from "../components/modals/Settings";

export default function Meeting() {
  const meetingManager = useMeetingManager();
  const { roster } = useRosterState();
  const attendees = Object.values(roster);
  const [showModal, setShowModal] = useState("");
  const { tiles, tileIdToAttendeeId, attendeeIdToTileId, size } = useRemoteVideoTileState();
  const { muted, toggleMute } = useToggleLocalMute();
  const { isVideoEnabled, toggleVideo } = useLocalVideo();


  const joinMeeting = async () => {
    // Fetch the meeting and attendee data from your server application
    const response = await fetch('https://dibxzaa24vvschnzknjn7m65pe0dvnlh.lambda-url.us-east-1.on.aws/',
      {
        mode: 'cors',
      });
    const data = await response.json();

    meetingManager.getAttendee = async (chimeAttendeeId: string, externalUserId?: string) => {
      const response = await fetch('/my-attendees-endpoint');
      const user = await response.json();
      console.log(user);

      return {
        name: user.name,
      }
    }



    // Initalize the `MeetingSessionConfiguration`
    const meetingSessionConfiguration = new MeetingSessionConfiguration(data.Meeting, data.Attendee);



    // Create a `MeetingSession` using `join()` function with the `MeetingSessionConfiguration`
    await meetingManager.join(meetingSessionConfiguration);

    // At this point you could let users setup their devices, or by default
    // the SDK will select the first device in the list for the kind indicated
    // by `deviceLabels` (the default value is DeviceLabels.AudioAndVideo)
    meetingManager.getAttendee(data.Attendee.AttendeeId, data.Meeting.ExternalMeetingId)

    // Start the `MeetingSession` to join the meeting
    await meetingManager.start();


  };
  const handleShowModal = (type: string) => {
    setShowModal(type);
    document.body.classList.add('overflow-hidden');
  };

  const handleCloseModal = () => {
    setShowModal("");
    document.body.classList.remove('overflow-hidden');
  };

  // const MyRosterCell = ({ name, attendeeId, tiler }) => {
  //   const { videoEnabled, sharingContent, muted } = useAttendeeStatus(attendeeId);

  //   return (
  //     <div>
  //       <div>{name}</div>
  //       <div>{attendeeId}</div>
  //       <div>{tiler}</div>
  //       <div>
  //         <button onClick={toggleVideo}>toggleVideo</button>
  //       </div>
  //       <div>
  //         <button onClick={toggleMute}>toggleMute</button>
  //       </div>
  //       <div>
  //         {muted ? "Muted" : "Not muted"}
  //       </div>
  //       <div>
  //         {sharingContent ? "Sharing" : "Not sharing"}
  //       </div>
  //       <div>
  //         {videoEnabled ? "VideoEnable" : "Video Disabled"}
  //       </div>
  //       <div>
  //         {isVideoEnabled ? "VideoEnable" : "Video Disabled"}
  //       </div>
  //       {tiler === undefined ? <LocalVideo className=' rounded relative border boder-solid border-purple-900 bg-slate-800 h-[500px] w-[500px]' /> : <RemoteVideo tileId={tiler} className=' rounded relative border boder-solid border-purple-900 bg-slate-800 h-[500px] w-[500px]' />}

  //     </div>
  //   );
  // }
  // console.log('roster', roster)
  // console.log('attendees', attendees)
  // console.log('tile:', tiles, "tileIdToAttendeeId:", tileIdToAttendeeId, "attendeeIdToTileId:", attendeeIdToTileId, "size:", size);

  // const MyMeetingRoster = () => {
  //   const { roster } = useRosterState();
  //   const attendees = Object.values(roster);

  //   const attendeeItems = attendees.map((attendee) => {
  //     console.log(attendee.chimeAttendeeId);
  //     const tilerId = attendeeIdToTileId[attendee.chimeAttendeeId]
  //     console.log(tilerId);

  //     const { id, name } = attendee;
  //     return <MyRosterCell key={id} attendeeId={id} name={name} tiler={tilerId} />;
  //   });

  //   return (
  //     <div className="my-roster">
  //       {attendeeItems}
  //     </div>
  //   )
  // }
  return (
    <>


      <main className="px-6 flex flex-col h-dvh relative">
        <div className="flex justify-between items-center py-4">
          <div className="flex gap-x-1 items-center">
            <h1 className=" text-3xl text-cs-purple-650 font-bold">CecureStream</h1>
            <div className=" text-xs text-cs-grey-700 font-medium border-[0.5px] border-cs-grey-700 py-[2px] px-2 rounded-lg">Beta</div>
          </div>
          <div className="flex justify-between gap-x-4 items-center">
            <div className=" flex bg-[#E1C6FF4D] py-[10px] px-[10px] gap-x-[10px] rounded-lg items-center cursor-pointer">
              <InfoCircle size="20" color="#5E29B7" />
              <div className="text-cs-purple-650 font-semibold">Conference Info</div>
            </div>
            <div className="bg-[#E1C6FF4D] p-[10px] rounded-lg flex justify-center items-center cursor-pointer" onClick={() => handleShowModal("settings")}><Setting2 size="20" color="#5E29B7" /></div>
          </div>
        </div>

        {/* <div>
        <audio style={{ display: 'none' }} id="meeting-audio"></audio>
       <button type="button" onClick={startMeeting}>Start Meeting</button>
        <div id="video-list"></div>
      </div> */}

        {/* grid px-20 gap-x-16 items-center grid-cols-2 */}
        {/* <MyMeetingRoster /> */}

        <button onClick={joinMeeting}>Join</button>
        <MeetingSection />


        <MeetingControl bgColor onOpen={() => handleShowModal("shareScreen")} />
        {showModal === "shareScreen" && <ShareScreen onClose={handleCloseModal} />}
        {showModal === "settings" && <Settings onClose={handleCloseModal} />}
      </main>
    </>
  )
}

