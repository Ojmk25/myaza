
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