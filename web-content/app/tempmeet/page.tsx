// "use client"
// import React, { useState, useEffect } from 'react';
// import {
//   DefaultDeviceController,
//   ConsoleLogger,
//   DefaultMeetingSession,
//   MeetingSessionConfiguration,
// } from 'amazon-chime-sdk-js';
// import { AudioInputControl, AudioOutputControl, ControlBar, ControlBarButton, DeviceLabels, Phone, VideoInputControl, useMeetingManager } from 'amazon-chime-sdk-component-library-react';

// const MeetingComponent = () => {
//   const [meetingSession, setMeetingSession] = useState<DefaultMeetingSession | null>(null);
//   const [videoElementSelf, setVideoElementSelf] = useState<HTMLVideoElement | null>(null);

//   const meetingManager = useMeetingManager();

//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://dibxzaa24vvschnzknjn7m65pe0dvnlh.lambda-url.us-east-1.on.aws/',
//         {
//           mode: 'cors',
//         });

//       const data = await response.json();

//       document.getElementById("meetingId")!.textContent = data.MeetingId;
//       document.getElementById("attendeeId")!.textContent = data.AttendeeId;
//       document.getElementById("externalMeetingId")!.textContent = data.ExternalMeetingId;
//       const meetingSessionConfiguration = new MeetingSessionConfiguration(data.Meeting, data.Attendee);
//       const logger = new ConsoleLogger("MyLogger");
//       const deviceController = new DefaultDeviceController(logger);

//       // Create a `MeetingSession` using `join()` function with the `MeetingSessionConfiguration`
//       await meetingManager.join(meetingSessionConfiguration);
//       meetingManager.invokeDeviceProvider(DeviceLabels.AudioAndVideo);

//       const session = new DefaultMeetingSession(meetingSessionConfiguration, logger, deviceController);
//       console.log("meetingSession ", session);
//       setMeetingSession(session);
//       // const options = {
//       //   deviceLabels: DeviceLabels.Video,
//       // };
//       // At this point you could let users setup their devices, or by default
//       // the SDK will select the first device in the list for the kind indicated
//       // by `deviceLabels` (the default value is DeviceLabels.AudioAndVideo)
//       //...

//       // Start the `MeetingSession` to join the meeting
//       await meetingManager.start();


//       const videoElement = document.getElementById('videoElement');
//       console.log('Before binding video element:', videoElement);
//       // meetingManager.audioVideo.bindVideoElement(videoElement);
//       await initLocalDevices(session);
//     } catch (error) {
//       console.error("An exception occurred:", error);
//     }
//   };




//   console.log(videoElementSelf);

//   const initLocalDevices = async (meetingSession: any) => {
//     // Initialize local devices
//     try {
//       // Get video input devices
//       const videoInputs = await meetingSession.audioVideo.listVideoInputDevices();
//       console.log("video inputs ", videoInputs);
//       // Handle video inputs
//       // ... similar to the original code

//       // Get audio input devices
//       const audioInputs = await meetingSession.audioVideo.listAudioInputDevices();
//       console.log("audio inputs ", audioInputs);
//       // Handle audio inputs
//       // ... similar to the original code
//       await meetingSession.audioVideo.chooseVideoInputDevice(videoInputs[0].deviceId);

//       await meetingSession.audioVideo.startVideoInput(videoInputs[0].deviceId);
//       // Start video preview
//       await meetingSession.audioVideo.startVideoPreviewForVideoInput(videoElementSelf);
//     } catch (error) {
//       console.error("Error initializing local devices:", error);
//     }
//   };

//   // const getMeetingInfo = async (meetingId) => {
//   //   // Fetch meeting info from server
//   //   const options = {
//   //     method: "GET",
//   //     cache: 'no-cache',
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //   };
//   //   const baseURL = window.location.href.split("apps")[0];
//   //   const apiUrl = baseURL + "meetingInfo";
//   //   const response = await fetch(apiUrl + "?m=" + meetingId, options);
//   //   return await response.json();
//   // };

//   const joinMeeting = async () => {
//     // Join the meeting
//     // Implementation similar to the original code
//   };

//   return (
//     <div>
//       <h1 className='mb-8'>Working meeting</h1>
//       <button onClick={fetchData} className='mb-8'>Join meeting</button>
//       {/* DOM elements for displaying meeting info */}

//       <ControlBar layout="undocked-vertical" showLabels>
//         <AudioInputControl />
//         <AudioOutputControl />
//         <VideoInputControl />
//         <ControlBarButton
//           icon={<Phone />}
//           onClick={() => { }}
//           label="End"
//         />
//       </ControlBar>
//       <div id="meetingId"></div>
//       <div id="attendeeId"></div>
//       <div id="externalMeetingId"></div>

//       {/* DOM element for self video */}
//       <video id="video-tile-self" ref={videoElement => setVideoElementSelf(videoElement)}></video>

//       {/* Other JSX for meeting controls */}
//       {/* ... */}
//     </div>
//   );
// };

// export default MeetingComponent;










// This is the final js-client.js file for My Amazon Chime JavaScript SDK Meeting Demo App (v1.0.0)
/*global fetch*/
/*global ChimeSDK*/
// "use client"
// import { DeviceLabels, useLocalVideo, useMeetingManager } from "amazon-chime-sdk-component-library-react";
// import { MeetingSessionConfiguration } from "amazon-chime-sdk-js";
// import { useEffect } from "react";

// export default function Momo() {
//   const meetingManager = useMeetingManager();
//   const { isVideoEnabled, setIsVideoEnabled } = useLocalVideo()

//   const videoElementSelf = document.getElementById("video-tile-self") as HTMLVideoElement;

//   useEffect(() => {
//     init()
//   }, [])


//   async function init() {
//     try {
//       const response = await fetch('https://dibxzaa24vvschnzknjn7m65pe0dvnlh.lambda-url.us-east-1.on.aws/',
//         {
//           mode: 'cors',
//         });

//       const data = await response.json();


//       document.getElementById("meetingId").textContent = data.Meeting.MeetingId;
//       document.getElementById("attendeeId").textContent = data.Attendee.AttendeeId;
//       document.getElementById("externalMeetingId").textContent = data.Attendee.ExternalMeetingId;
//       const meetingSessionConfiguration = new MeetingSessionConfiguration(data.Meeting, data.Attendee);

//       // Create a `MeetingSession` using `join()` function with the `MeetingSessionConfiguration`
//       await meetingManager.join(meetingSessionConfiguration);
//       meetingManager.invokeDeviceProvider(DeviceLabels.AudioAndVideo);

//       // Start the `MeetingSession` to join the meeting
//       await meetingManager.start();

//       const videoElement: HTMLVideoElement = document.getElementById('videoElement') as HTMLVideoElement;
//       console.log('Before binding video element:', videoElement);
//       meetingManager.audioVideo?.startVideoPreviewForVideoInput(videoElement);
//       // meetingManager.audioVideo.bindVideoElement(videoElement);

//       joinMeeting()
//       // meetingManager.meetingSession.audioVideo.deviceController.activeDevices['video'].stream
//     } catch (error) {
//       console.error("An exception occurred:", error);
//       // Handle the exception here
//     }

//     await initLocalDevices();
//   }

//   async function initLocalDevices() {
//     // retreiving and setting devices (camera, mic, speaker) 
//     try {
//       // camera
//       const videoInputs = await meetingManager.audioVideo?.listVideoInputDevices();
//       console.log("video inputs ", videoInputs);
//       const list = document.getElementById("video-input");
//       for (let i = 0; i < videoInputs!.length; i++) {
//         const option = document.createElement("option");
//         list?.appendChild(option);
//         option.text = videoInputs![i].label || "Audio-in \${i + 1}";
//         option.value = videoInputs![i].deviceId;
//       }
//       list?.addEventListener("change", async () => {
//         console.log("video input device is changed");
//         try {
//           await meetingManager.audioVideo?.startVideoInput(list.value);
//         } catch (e) {
//           console.log("error changing video input to ", list.value);
//         }
//       });
//       if (!list!.firstElementChild) {
//         const option = document.createElement("option");
//         option.text = "Device selection unavailable";
//         list!.appendChild(option);
//       }

//       if (videoInputs![0] && videoInputs![0].deviceId != "") {
//         await meetingManager.audioVideo?.chooseVideoInputQuality(960, 540, 15);
//         await meetingManager.audioVideo?.setVideoMaxBandwidthKbps(1400);
//         await meetingManager.audioVideo?.startVideoInput(videoInputs![0].deviceId);
//         const qualitySetting = await meetingManager.audioVideo?.getVideoInputQualitySettings();
//         console.log("video quality publishing is ", qualitySetting);
//       } else {
//         await meetingManager.audioVideo?.stopVideoInput();
//         console.log("empty set for chooseVideoInputDevice");
//       }

//       // microphone
//       const audioInputs = await meetingManager.audioVideo?.listAudioInputDevices();
//       console.log("audio inputs ", audioInputs);
//       if (audioInputs![0] && audioInputs![0].deviceId != "") {
//         await meetingManager.audioVideo?.startAudioInput(audioInputs![0].deviceId);
//       } else if (audioInputs![0] && audioInputs![0].groupId != "") {
//         await meetingManager.audioVideo?.startAudioInput(audioInputs![0].groupId);
//       } else {
//         await meetingManager.audioVideo?.startAudioInput(null);
//         console.log("empty set for chooseAudioInputDevice");
//       }

//     } catch (err) {
//       // handle error - unable to acquire video or audio device perhaps due to permissions blocking or chromium bug on retrieving device label
//       // see setupDeviceLabelTrigger() on https://github.com/aws/amazon-chime-sdk-js/blob/main/demos/browser/app/meetingV2/meetingV2.ts
//       console.log("Try Catch Error - unable to acquire device - ", err);
//     }

//     // start video preview
//     await meetingManager.audioVideo?.startVideoPreviewForVideoInput(videoElementSelf);

//   }

//   // // Note: Pressing the Join button multiple times will create multiple attendees

//   async function joinMeeting() {
//     // stop video preview before connecting to meeting
//     await meetingManager.audioVideo?.stopVideoPreviewForVideoInput(videoElementSelf);
//     document.getElementById("selfViewLabel").textContent = "Self View";
//     document.getElementById("join").disabled = true;

//     const audioOutputElement = document.getElementById("audio") as HTMLAudioElement;
//     try {
//       await meetingManager.audioVideo?.bindAudioElement(audioOutputElement);
//     } catch (e) {
//       console.log("Failed to bindAudioElement ", e);
//     }

//     const observer = {
//       audioVideoDidStart: () => {
//         console.log("audioVideoDidStart fired");
//         meetingManager.audioVideo?.startLocalVideoTile();
//       },
//       videoTileDidUpdate: (tileState) => {
//         console.log("videoTileDidUpdate fired", tileState);
//         if (!tileState.boundAttendeeId) {
//           return;
//         }
//         if (tileState.localTile) {
//           meetingManager.audioVideo?.bindVideoElement(
//             tileState.tileId,
//             videoElementSelf
//           );
//           console.log("local tile");
//         } else {

//           if (!document.getElementById(tileState.tileId)) {
//             var trs = document.querySelectorAll("#remoteVidTbl tr");
//             var tr = trs[trs.length - 1];
//             if (tr.querySelectorAll("td").length >= 2) {
//               const tr_node = document.createElement("tr");
//               tr_node.style.width = "100%";
//               document.getElementById("remoteVidTbl")?.appendChild(tr_node);
//               tr = tr_node;
//             }

//             const td_node = document.createElement("td");
//             tr.appendChild(td_node);

//             const vid_node = document.createElement("video");
//             vid_node.id = tileState.tileId;
//             vid_node.style.height = "auto";
//             vid_node.style.width = "100%";
//             td_node.appendChild(vid_node);
//           }
//           const videoElementNew = document.getElementById(tileState.tileId) as HTMLVideoElement;
//           meetingManager.audioVideo?.bindVideoElement(
//             tileState.tileId,
//             videoElementNew
//           );
//         }
//       },
//       videoTileWasRemoved: (tileId) => {
//         const videoElementRemoved = document.getElementById(tileId);
//         videoElementRemoved?.remove();
//       },
//       // audioVideoDidStop: async (sessionStatus) => {
//       //   await meetingSession.audioVideo.stopAudioInput();

//       //   // Or use the destroy API to call stopAudioInput and stopVideoInput.
//       //   meetingManager.deviceController.destroy();
//       // },
//     };

//     const buttonMute = document.getElementById("mic-muted");
//     buttonMute.checked = false;
//     buttonMute.addEventListener("change", function () {
//       if (buttonMute.checked) {
//         meetingManager.audioVideo?.realtimeMuteLocalAudio();
//         console.log("mic is muted");
//       } else {
//         meetingManager.audioVideo?.realtimeUnmuteLocalAudio();
//         console.log("mic is unmuted");
//       }
//     });
//     meetingManager.audioVideo?.addObserver(observer);
//     meetingManager.audioVideo?.start();
//     meetingManager.audioVideo?.stopLocalVideoTile();
//   }


//   return (
//     <>
//       <table style={{ height: '20%' }}>
//         <tbody>
//           <tr>
//             <td width="30%">
//               <div>
//                 <button id="join" onClick={joinMeeting}>Click to join meeting!</button>
//                 <div id="deviceOptions">
//                   <div>
//                     <label htmlFor="video-input block">Camera : </label>
//                     <select id="video-input" className="custom-select" style={{ width: '50%' }}></select>
//                   </div>
//                   <label htmlFor="mic-muted block">Mute mic : </label>
//                   <input id="mic-muted" className="custom_select" type="checkbox" />
//                 </div>
//               </div>
//             </td>
//             <td width="30%">
//               <div className="menu">
//                 <div>
//                   <b>Meeting Information</b><br />
//                   ExternalMeetingId : <label id="externalMeetingId" style={{ width: '50%' }}></label><br />
//                   MeetingId : <label id="meetingId" style={{ width: '50%' }}></label><br />
//                   AttendeeId : <label id="attendeeId" style={{ width: '50%' }}></label><br />
//                 </div>
//               </div>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <hr />
//       <div id="video-section">
//         <table style={{ height: '80%' }}>
//           <tbody>
//             <tr style={{ height: '10%' }}>
//               <th id="selfViewLabel" width="50%">Preview</th>
//               <th width="50%">Remote Video</th>
//             </tr>
//             <tr style={{ height: '90%' }}>
//               <td height="40%" valign="top">
//                 <div id="video-tile">
//                   <video id="video-tile-self" src="" width="100%" height="100%"></video>
//                 </div>
//               </td>
//               <td height="40%">
//                 <table id="remoteVidTbl" style={{ width: '100%', height: '100%' }}>
//                   <tbody>
//                     <tr style={{ width: '100%' }}></tr>
//                   </tbody>
//                 </table>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <audio id="audio" crossOrigin="anonymous" autoPlay></audio>
//       </div>
//       <script type="text/javascript" src="js-client.js"></script>
//     </>
//   )
// }



















// "use client"
// import { useEffect, useState } from 'react';
// import {
//   useMeetingManager,
//   useLocalVideo,
//   DeviceLabels
// } from 'amazon-chime-sdk-component-library-react';
// import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';

// const Momo = () => {
//   const meetingManager = useMeetingManager();
//   const { isVideoEnabled, setIsVideoEnabled } = useLocalVideo();
//   const [meetingData, setMeetingData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://dibxzaa24vvschnzknjn7m65pe0dvnlh.lambda-url.us-east-1.on.aws/', {
//           mode: 'cors',
//         });
//         const data = await response.json();
//         setMeetingData(data);
//       } catch (error) {
//         console.error('An exception occurred:', error);
//         // Handle the exception here
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (!meetingData) return;

//     const initMeeting = async () => {
//       const { Meeting, Attendee } = meetingData;
//       document.getElementById('meetingId').textContent = Meeting.MeetingId;
//       document.getElementById('attendeeId').textContent = Attendee.AttendeeId;
//       document.getElementById('externalMeetingId').textContent = Attendee.ExternalMeetingId;

//       const meetingSessionConfiguration = new MeetingSessionConfiguration(Meeting, Attendee);
//       await meetingManager.join(meetingSessionConfiguration);
//       meetingManager.invokeDeviceProvider(DeviceLabels.AudioAndVideo);
//       await meetingManager.start();
//       await initLocalDevices();
//     };

//     initMeeting();
//   }, [meetingData]);

//   const initLocalDevices = async () => {
//     try {
//       const videoInputs = await meetingManager.audioVideo?.listVideoInputDevices();
//       // Rest of the code for initializing local devices...
//     } catch (err) {
//       console.log('Error initializing local devices:', err);
//     }
//   };

//   const joinMeeting = async () => {
//     try {
//       await meetingManager.audioVideo?.stopVideoPreviewForVideoInput();
//       document.getElementById('selfViewLabel').textContent = 'Self View';
//       document.getElementById('join').disabled = true;
//       const audioOutputElement = document.getElementById('audio');
//       await meetingManager.audioVideo?.bindAudioElement(audioOutputElement);
//       // Rest of the code for joining meeting...
//     } catch (error) {
//       console.error('Error joining meeting:', error);
//     }
//   };

//   return (
//     <>
//       <table style={{ height: '20%' }}>
//         <tbody>
//           <tr>
//             <td width="30%">
//               <div>
//                 <button id="join" onClick={joinMeeting}>Click to join meeting!</button>
//                 <div id="deviceOptions">
//                   <div>
//                     <label htmlFor="video-input block">Camera : </label>
//                     <select id="video-input" className="custom-select" style={{ width: '50%' }}></select>
//                   </div>
//                   <label htmlFor="mic-muted block">Mute mic : </label>
//                   <input id="mic-muted" className="custom_select" type="checkbox" />
//                 </div>
//               </div>
//             </td>
//             <td width="30%">
//               <div className="menu">
//                 <div>
//                   <b>Meeting Information</b><br />
//                   ExternalMeetingId : <label id="externalMeetingId" style={{ width: '50%' }}></label><br />
//                   MeetingId : <label id="meetingId" style={{ width: '50%' }}></label><br />
//                   AttendeeId : <label id="attendeeId" style={{ width: '50%' }}></label><br />
//                 </div>
//               </div>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <hr />
//       <div id="video-section">
//         <table style={{ height: '80%' }}>
//           <tbody>
//             <tr style={{ height: '10%' }}>
//               <th id="selfViewLabel" width="50%">Preview</th>
//               <th width="50%">Remote Video</th>
//             </tr>
//             <tr style={{ height: '90%' }}>
//               <td height="40%" valign="top">
//                 <div id="video-tile">
//                   <video id="video-tile-self" src="" width="100%" height="100%"></video>
//                 </div>
//               </td>
//               <td height="40%">
//                 <table id="remoteVidTbl" style={{ width: '100%', height: '100%' }}>
//                   <tbody>
//                     <tr style={{ width: '100%' }}></tr>
//                   </tbody>
//                 </table>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <audio id="audio" crossOrigin="anonymous" autoPlay></audio>
//       </div>
//     </>
//   );
// };

// export default Momo;
