"use client"
import Image from "next/image";
import { Add, Copy, EmojiNormal, MicrophoneSlash1, RecordCircle, SearchNormal1, Send } from "iconsax-react";

import avatar from "@/public/assets/images/avatar.png"
import videoImg from "@/public/assets/images/video.png"
import activeVoice from '@/public/assets/images/activeVoice.svg'
import closeIconPurple from "@/public/assets/images/closeIconPurple.svg"
import raisedHand from '@/public/assets/images/raisedHand.svg'
import { RefObject, createRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import dottedLine from "@/public/assets/images/dottedLine.svg"
import { LocalVideo, VideoTileGrid, useLocalVideo, useToggleLocalMute, PreviewVideo, FeaturedRemoteVideos, VideoTile, RemoteVideo, useRemoteVideoTileState, useRosterState, useAttendeeStatus, useContentShareControls, ContentShare, useContentShareState, useAudioVideo, MeetingManager, RosterAttendeeType } from 'amazon-chime-sdk-component-library-react';
import { RemoteAttendeeCard } from "./RemoteAttendeeCard";
import { LocalAttendeeCard } from "./LocalAttendeeCard";
import { AttendeeListCard } from "./AttendeeListCard";
import { Message, DataMessage, DefaultRealtimeController, } from "amazon-chime-sdk-js";
import Chat from "./IncallMessage";
import copyTextToClipboard from "@/utils/clipBoard";
import { processString } from "@/utils/meetingFunctions";
import ShowVisualizer from "./ShowVisualizer";

type DynamicWidth = {
  width: number | string;
  maxWidth: number | string;
}
export default function MeetingSection({ attendeIDString, externalID, sideView, sideViewFunc, meetingManager }: { attendeIDString: string | null | undefined, externalID: string | null | undefined, sideView?: string, sideViewFunc: (value: string) => void, meetingManager: MeetingManager }) {
  const { roster } = useRosterState();
  const attendees = Object.values(roster);
  const { muted, toggleMute } = useToggleLocalMute();
  const { tiles, tileIdToAttendeeId, attendeeIdToTileId, size } = useRemoteVideoTileState();
  const { toggleContentShare } = useContentShareControls();
  const { isLocalUserSharing, tileId } = useContentShareState();
  const [meetingSideView, setMeetingSideView] = useState('meeting')
  const messageData = new DataMessage(Date.now(), "Test-Meeting", new Uint8Array(), "attendee", 'externalId')
  const messageChat = new Message('string', {}, 'I said')
  const audioVideo = useAudioVideo();
  const [chatMessages, setChatMessages] = useState<any>([]);
  const [someChat, setSomeChat] = useState('')
  const participantsRef = useRef<HTMLDivElement>(null)
  // const [sideView, setSideView] = useState('');
  const [tooltipMessage, setTooltipMessage] = useState('');
  const containerTileRef = useRef<HTMLDivElement>(null);
  const [dynamicWidth, setDynamicWidth] = useState<DynamicWidth>({ width: '', maxWidth: '' })
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [changingWidth, setChangingWidth] = useState<number>(0)

  useEffect(() => {
    // Function to update screenWidth state when the window is resized
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Initial width when component mounts
    setScreenWidth(window.innerWidth);

    // Add event listener to window resize event
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);





  const attendeeItems = attendees.map((attendee, i) => {
    const tilerId = attendeeIdToTileId[attendee.chimeAttendeeId]

    const { name, externalUserId } = attendee;

    if (i === 0) {
      return <LocalAttendeeCard key={attendee.chimeAttendeeId} attendeeId={attendee.chimeAttendeeId} name={externalUserId} videoTildId={tilerId} nameID={attendee.chimeAttendeeId} audioState={<ShowVisualizer meetingManager={meetingManager} attendee={attendee} />} widthProp={dynamicWidth.width} maxWidthProp={dynamicWidth.maxWidth} />
    } else {
      return <RemoteAttendeeCard key={attendee.chimeAttendeeId} attendeeId={attendee.chimeAttendeeId} name={externalUserId} videoTildId={tilerId} nameID={attendee.chimeAttendeeId} audioState={<ShowVisualizer meetingManager={meetingManager} attendee={attendee} />} widthProp={dynamicWidth.width} maxWidthProp={dynamicWidth.maxWidth} />
    }
  });


  // const AttendeeItemsList = ({ attendees }: { attendees: RosterAttendeeType[] }) => {
  //   return (
  //     <>
  //       {
  //         attendees.map((attendee, i) => {
  //           const tilerId = attendeeIdToTileId[attendee.chimeAttendeeId]
  //           const { name } = attendee;
  //           if (i === 0) {
  //             return <LocalAttendeeCard key={attendee.chimeAttendeeId} attendeeId={attendee.chimeAttendeeId} name={name} videoTildId={tilerId} nameID={attendee.chimeAttendeeId} audioState={<ShowVisualizer meetingManager={meetingManager} attendee={attendee} />} widthProp={dynamicWidth} />
  //           } else {
  //             return <RemoteAttendeeCard key={attendee.chimeAttendeeId} attendeeId={attendee.chimeAttendeeId} name={name} videoTildId={tilerId} nameID={attendee.chimeAttendeeId} audioState={<ShowVisualizer meetingManager={meetingManager} attendee={attendee} />} widthProp={dynamicWidth} />
  //           }
  //         })
  //       }
  //     </>
  //   )
  // };


  const handleCopyClick = (value: string) => {
    copyTextToClipboard(value,
      () => {
        setTooltipMessage('copied');
        setTimeout(() => setTooltipMessage(''), 2000);
      },
      () => {
        setTooltipMessage('Failed to copy!');
        setTimeout(() => setTooltipMessage(''), 2000);
      }
    );
  };


  // meetingManager.audioVideo!.realtimeSubscribeToVolumeIndicator(attendee.chimeAttendeeId,
  //   (attendeeId, volume, muted, signalStrength) => {
  //     if (volume !== null) {
  //       // `volume` is a value between 0 (silence) and 1 (loudest), scale as needed
  //       console.log(`Attendee ID: ${attendeeId}, Volume: ${volume}, muted: ${muted}, signalStrength: ${signalStrength}`);
  //       // Here you can update your audio level analyzer visualization
  //     }
  //   }
  // );



  useEffect(() => {
    if (containerTileRef.current && changingWidth <= 699) {
      if (attendees.length < 3) {
        setDynamicWidth({ width: '100%', maxWidth: '100%' })
      } else {
        setDynamicWidth({ width: '100%', maxWidth: 230 })
      }
    } else if (containerTileRef.current && changingWidth >= 700 || changingWidth <= 890) {
      if (attendees.length < 5) {
        setDynamicWidth({ width: '100%', maxWidth: '100%' })
      } else {
        setDynamicWidth({ width: '100%', maxWidth: 210 })
      }
    } else if (containerTileRef.current && changingWidth >= 891) {
      if (attendees.length < 4) {
        setDynamicWidth({ width: '100%', maxWidth: '100%' })
      } else {
        setDynamicWidth({ width: '100%', maxWidth: 300 })
      }
    }

  }, [containerTileRef.current?.offsetWidth, changingWidth])

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
  }, []);

  return (
    <div className="flex flex-4 overflow-hidden">
      {tileId && (
        <div className=" flex-5 bg-cs-black-200 px-10 py-5 rounded-[4px] mr-4">
          <div className=" h-full flex flex-col">
            <div className="flex gap-x-3 flex-2 items-center">
              {/* <div className="p-[4px] bg-cs-grey-50 rounded-lg"><RecordCircle size="24" color="#CB3A32" variant="Bulk" /></div>
              <div className=" text-cs-grey-50 font-normal">Conference is recorded</div>
              <div className=" w-[1px] bg-cs-grey-200 min-h-6"></div> */}
              <h3 className=" text-cs-grey-50 font-semibold "><span className=" capitalize">{processString(externalID as string)} </span>share screen</h3>
            </div>
            <div className="flex justify-center items-center rounded-lg overflow-hidden h-full">
              <div className=" min-h-[200px] w-full h-full rounded-lg min-w-[200px]" >
                <ContentShare nameplate={processString(externalID as string)} className=' rounded-lg relative bg-slate-800 min-h-[200px] [&>video]:object-cover capitalize' css="border: 1px solid" />
              </div>
            </div>
          </div>
        </div>
      )}


      <div className="flex-6 flex">
        <div className={`w-full @container/meetingTiles ${screenWidth < 1024 && sideView !== '' && tileId ? 'hidden' : ''}`} ref={containerTileRef}>
          <div className="w-full flex gap-4 h-full flex-4 flex-wrap justify-center" >
            {attendeeItems}
            {/* {testArray.map((array) =>
              <div className=" bg-black flex-4" style={{ width: dynamicWidth.width, maxWidth: dynamicWidth.maxWidth, minWidth: 200 }}></div>
            )} */}
          </div>
        </div>
        {/* @[300px]/meetingTiles:flex-row @[300px]/meetingTiles:flex-wrap */}
        {/* <div className="w-full @container/meetingTiles">
          <div className="w-full flex flex-col gap-4 h-full flex-4 @[300px]/meetingTiles:flex-row flex-wrap">
            <AttendeeItemsList attendees={attendees} />
          </div>
        </div> */}

        <div className='w-0 overflow-hidden transition-all @container/bigScreenSideCards' ref={participantsRef} style={sideView !== '' ? {
          width: participantsRef.current?.scrollWidth + "px",
          // height: participantsRef.current?.scrollHeight + "px",
          overflow: 'visible',
          flex: '1 1 50%',
          minWidth: screenWidth < 1025 ? 190 : 300,
          marginLeft: 16,
        } : {
          width: '0px',
          // height: '0px',
          overflow: 'hidden',
          flex: '1 1 0%',
          marginLeft: 0,
        }}>
          {sideView === 'Participants' && <div className={` h-full bg-cs-grey-50 border-solid border border-[#F1F1F1] rounded-[4px] px-2 @[300px]/bigScreenSideCards:px-4 pt-5 overflow-y-scroll no-scrollbar`}>
            <div className=" flex justify-between items-center">
              <h3 className=" text-cs-grey-dark font-medium @[300px]/bigScreenSideCards:text-2xl">Participants <span className=" text-cs-grey-100 font-medium text-sm @[300px]/bigScreenSideCards:text-base">({attendees.length})</span></h3>
              <Image src={closeIconPurple} alt="close-icon" onClick={() => sideViewFunc('')} className="cursor-pointer w-5 @[300px]/bigScreenSideCards:w-6" />
            </div>
            <div className=" relative mt-5 mb-3">
              <input type="text" name="" id="" className=" w-full border border-cs-grey-300 h-8 @[300px]/bigScreenSideCards:h-10 rounded-[10px] outline-none pl-7 @[300px]/bigScreenSideCards:pl-10 placeholder:text-sm placeholder:font-normal" placeholder="Search for participants" />
              <SearchNormal1 size="18" color="#898989" className=" absolute top-[7px] left-[10px] @[300px]/bigScreenSideCards:top-[12px] @[300px]/bigScreenSideCards:left-[14px] @[300px]/bigScreenSideCards:w-[18px] @[300px]/bigScreenSideCards:h-[18px]" />
            </div>

            <div className="">
              {attendees.map((attendee) => (
                <AttendeeListCard attendeeId={attendee.chimeAttendeeId} key={attendee.chimeAttendeeId} externalID={attendee.externalUserId} audioState={<ShowVisualizer meetingManager={meetingManager} attendee={attendee} />} />
              ))}

            </div>
          </div>}

          <div style={sideView === 'Chat' ?
            {
              width: '100%',
              height: '100%',
              overflow: 'visible',
            } : {
              width: '0',
              height: '0',
              overflow: 'hidden',
            }}>
            {externalID &&
              <Chat attendeeIDProp={attendeIDString} externalID={processString(externalID as string)} sideViewFunc={sideViewFunc} />}
          </div>

          {sideView === 'Conference Info' && <div className=" flex-6 bg-cs-grey-50 border-solid border border-[#F1F1F1] rounded-[4px] px-4 pt-5">
            <div className=" flex justify-between items-center">
              <h3 className=" text-cs-grey-dark font-medium @[300px]/bigScreenSideCards:text-2xl">Conference Info</h3>
              <Image src={closeIconPurple} alt="profile" onClick={() => sideViewFunc('')} className=" cursor-pointer w-5 @[300px]/bigScreenSideCards:w-6" />
            </div>
            <div className=" relative mt-7 mb-5">
              <h3 className=" text-cs-grey-dark font-medium @[300px]/bigScreenSideCards:text-xl">[Meeting Name]</h3>
              <p className=" text-xs @[300px]/bigScreenSideCards:text-sm text-cs-black-200 font-normal mb-4 mt-6">Invite others to join by copying the meting link and sharing it: </p>
            </div>
            <div className=" relative mt-7 mb-5">
              <input type="text" name="" id="" className=" w-full border border-[#F1F1F1] h-10 @[300px]/bigScreenSideCards:h-12 rounded-[10px] outline-none px-4 placeholder:text-sm placeholder:font-normal placeholder:text-cs-black-200" placeholder="xap-ert-olik" />
              <Copy size="18" color="#5E29B7" className=" absolute top-[14px] right-[14px] cursor-pointer" onClick={async () => handleCopyClick(`https://cecurecast.com/xap-ert-olik`)} />
              {tooltipMessage && <div className=" absolute text-xs text-cs-grey-50 p-2 bg-cs-purple-650 z-10 rounded">{tooltipMessage}</div>}
            </div>

            <button className="flex items-center text-cs-purple-650 font-bold py-2 px-3 @[300px]/bigScreenSideCards:py-3 @[300px]/bigScreenSideCards:px-4 border border-cs-purple-650 rounded-lg max-h-[52px]"><Add size="18" color="#5E29B7" /> Add participants</button>
          </div>
          }

        </div>


        {/* <div className=" bg-cs-black-200 flex-1 p-2 rounded flex flex-col sm:max-w-[352px]">
          <div className=" flex justify-end">
            <div className="p-[6px] bg-cs-grey-800 rounded-full"><MicrophoneSlash1 size="14" color="#FAFAFA" /></div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <div className="p-[6px]">
              <Image src={avatar} alt="" className=" max-w-[38px] max-h-[38px] rounded-full mx-auto" />
              <h5 className="text-cs-grey-50 text-xs">Marie Oju</h5>
            </div>
          </div>
          <div className=" flex justify-end">
            <div className="p-[6px]"><Image src={dottedLine} alt="" className=" w-3 h-3" /></div>
          </div>
        </div>

        <div className=" bg-cs-black-200 flex-1 p-2 rounded flex flex-col sm:max-w-[352px]">
          <div className=" flex justify-end">
            <div className="p-[6px] bg-cs-grey-800 rounded-full"><MicrophoneSlash1 size="14" color="#FAFAFA" /></div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <div className="p-[6px]">
              <div className=" bg-cs-grey-800 w-[38px] h-[38px] rounded-full mx-auto flex justify-center items-center text-cs-grey-50">MO</div>
              <h5 className="text-cs-grey-50 text-xs">Marie Ojuerer</h5>
            </div>
          </div>
          <div className=" flex justify-end">
            <div className="p-[6px]"><Image src={dottedLine} alt="" className=" w-3 h-3" /></div>
          </div>
        </div>

        More people in a meeting represented by numbers
        <div className=" bg-cs-black-200 flex-1 p-2 rounded flex flex-col sm:max-w-[352px] min-h-[132px]">
          <div className=" flex justify-end">
            <div className="p-[6px] bg-cs-grey-800 rounded-full"><MicrophoneSlash1 size="14" color="#FAFAFA" /></div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <div className=" bg-cs-grey-800 w-[38px] h-[38px] rounded-full flex justify-center items-center text-cs-grey-50">MO</div>
            <Image src={avatar} alt="" className=" max-w-[38px] max-h-[38px] rounded-full -translate-x-3" />
            <div className=" bg-cs-grey-800 w-[38px] h-[38px] rounded-full flex justify-center items-center text-cs-grey-50 text-[10px] -translate-x-6">+4</div>
          </div>
          <div className=" flex justify-end">
            <div className="p-[6px]"><Image src={dottedLine} alt="" className=" w-3 h-3" /></div>
          </div>
        </div> */}
      </div>
    </div>
  )
}






// <div className=" flex flex-4">


// {/* participants
// <div className=" flex-6 ml-6 bg-cs-grey-50 border-solid border border-[#F1F1F1] rounded-[4px] px-4 pt-5">
//   <div className=" flex justify-between items-center">
//     <h3 className=" text-cs-grey-dark font-medium text-2xl">Participants <span className=" text-cs-grey-100 font-medium text-base">(12)</span></h3>
//     <Image src={closeIconPurple} alt="profile" />
//   </div>
//   <div className=" relative mt-7 mb-5">
//     <input type="text" name="" id="" className=" w-full border border-cs-grey-300 h-12 rounded-[10px] outline-none pl-12 placeholder:text-sm placeholder:font-normal" placeholder="Search for participants" />
//     <SearchNormal1 size="20" color="#898989" className=" absolute top-[14px] left-[14px]" />
//   </div>
//   <div>
//     <div className=" flex justify-between items-center py-3 border-b border-solid border-b-[#EFEDED]">
//       <div className=" flex items-center gap-x-2">
//         <Image src={avatar} alt="profile" className=" rounded-full w-6 h-6 object-cover" />
//         <h4 className=" text-cs-grey-dark font-medium text-sm">Olami Anula</h4>
//       </div>
//       <div>
//         <Image src={activeVoice} alt="profile" />
//       </div>
//     </div>

//     <div className=" flex justify-between items-center py-3 border-b border-solid border-b-[#EFEDED]">
//       <div className=" flex items-center gap-x-2">
//         <Image src={avatar} alt="profile" className=" rounded-full w-6 h-6 object-cover" />
//         <h4 className=" text-cs-grey-dark font-medium text-sm">Olami Anula</h4>
//       </div>
//       <div>
//         <MicrophoneSlash1 size="24" color="#5E29B7" />
//       </div>
//     </div>

//     <div className=" flex justify-between items-center py-3 border-b border-solid border-b-[#EFEDED]">
//       <div className=" flex items-center gap-x-2">
//         <Image src={avatar} alt="profile" className=" rounded-full w-6 h-6 object-cover" />
//         <h4 className=" text-cs-grey-dark font-medium text-sm">Olami Anula</h4>
//       </div>
//       <div className=" flex gap-x-2">
//         <Image src={raisedHand} alt="raisedHand" />
//         <MicrophoneSlash1 size="24" color="#5E29B7" />
//       </div>
//     </div>
//   </div>
// </div> */}


// {/* chats
// <div className=" flex-6 ml-6 bg-cs-grey-50 border-solid border border-[#F1F1F1] rounded-[4px] px-4 pt-5">


//   <div className=" flex flex-col justify-between h-full">

//     <div>
//       <div className=" flex justify-between items-center">
//         <h3 className=" text-cs-grey-dark font-medium text-2xl">Chat</h3>
//         <Image src={closeIconPurple} alt="profile" />
//       </div>

//       <div className=" flex py-3 gap-x-1">
//         <Image src={avatar} alt="profile" className=" rounded-full w-6 h-6 object-cover" />
//         <div>
//           <div className=" flex items-center gap-x-2 mt-[3px]">
//             <h4 className=" text-cs-grey-dark font-medium text-sm">Olami Anula</h4>
//             <div className=" w-[4px] h-[5px] bg-[#333333] rounded-full"></div>
//             <h6 className=" text-cs-grey-500 text-[9px] font-normal">57min ago</h6>
//           </div>
//           <h5 className=" text-xs font-normal text-cs-grey-800">Can I get a certification?</h5>
//         </div>
//       </div>

//       <div className=" flex py-3 gap-x-1">
//         <Image src={avatar} alt="profile" className=" rounded-full w-6 h-6 object-cover" />
//         <div>
//           <div className=" flex items-center gap-x-2 mt-[3px]">
//             <h4 className=" text-cs-grey-dark font-medium text-sm">Olami Anula</h4>
//             <div className=" w-[4px] h-[5px] bg-[#333333] rounded-full"></div>
//             <h6 className=" text-cs-grey-500 text-[9px] font-normal">57min ago</h6>
//           </div>
//           <h5 className=" text-xs font-normal text-cs-grey-800">Can I get a certification?</h5>
//         </div>
//       </div>

//       <div className=" flex py-3 gap-x-1">
//         <Image src={avatar} alt="profile" className=" rounded-full w-6 h-6 object-cover" />
//         <div>
//           <div className=" flex items-center gap-x-2 mt-[3px]">
//             <h4 className=" text-cs-grey-dark font-medium text-sm">Olami Anula</h4>
//             <div className=" w-[4px] h-[5px] bg-[#333333] rounded-full"></div>
//             <h6 className=" text-cs-grey-500 text-[9px] font-normal">57min ago</h6>
//           </div>
//           <h5 className=" text-xs font-normal text-cs-grey-800">Can I get a certification?</h5>
//         </div>
//       </div>

//       <div className=" py-3">
//         <div className=" flex justify-end gap-x-1 items-center">
//           <h4 className=" text-cs-grey-dark font-medium text-sm">Olami Anula</h4>
//           <Image src={avatar} alt="profile" className=" rounded-full w-6 h-6 object-cover" />
//         </div>
//         <h5 className=" text-xs font-normal text-cs-grey-800 text-right">Can I get a certification?</h5>
//       </div>
//     </div>

//     <div className=" flex gap-x-2 border-solid border-t-[1px] border-cs-grey-55 py-4">
//       <input type="text" name="" id="" className=" w-full border border-cs-grey-55 h-12 rounded-[10px] outline-none px-4 placeholder:text-sm placeholder:font-normal placeholder:text-cs-grey-dark" placeholder="Hello Everyone 👋" />
//       <div className="text-center cursor-pointer">
//         <div className="p-3 bg-[#E1C6FF4D] rounded-md max-w-12 mx-auto">
//           <EmojiNormal size="24" color="#5E29B7" className="mx-auto" />
//         </div>
//       </div>
//       <div className="text-center cursor-pointer">
//         <div className="p-3 bg-[#E1C6FF4D] rounded-md max-w-12 mx-auto">
//           <Send size="24" color="#5E29B7" className="mx-auto" />
//         </div>
//       </div>
//     </div>
//   </div>
// </div> */}

// {/* <div className=" flex-6 ml-6 bg-cs-grey-50 border-solid border border-[#F1F1F1] rounded-[4px] px-4 pt-5">
//   <div className=" flex justify-between items-center">
//     <h3 className=" text-cs-grey-dark font-medium text-2xl">Conference Info</h3>
//     <Image src={closeIconPurple} alt="profile" />
//   </div>
//   <div className=" relative mt-7 mb-5">
//     <h3 className=" text-cs-grey-dark font-medium text-xl">[Meeting Name]</h3>
//     <p className=" text-sm text-cs-black-200 font-normal mb-4 mt-6">Invite others to join by copying the meting link and sharing it: </p>
//   </div>
//   <div className=" relative mt-7 mb-5">
//     <input type="text" name="" id="" className=" w-full border border-[#F1F1F1] h-12 rounded-[10px] outline-none px-4 placeholder:text-sm placeholder:font-normal placeholder:text-cs-black-200" placeholder="xap-ert-olik" />
//     <Copy size="20" color="#5E29B7" className=" absolute top-[14px] right-[14px]" />
//   </div>
//   <button className="flex items-center text-cs-purple-650 font-bold py-5 px-4 border border-cs-purple-650 rounded-lg max-h-[52px]"><Add size="22" color="#5E29B7" /> Add participants</button>

// </div> */}

// </div>



// others on the list of participants
// {/* <div className=" flex justify-between items-center py-3 border-b border-solid border-b-[#EFEDED]">
// <div className=" flex items-center gap-x-2">
//   <Image src={avatar} alt="profile" className=" rounded-full w-6 h-6 object-cover" />
//   <h4 className=" text-cs-grey-dark font-medium text-sm">Olami Anula</h4>
// </div>
// <div>
//   <MicrophoneSlash1 size="24" color="#5E29B7" />
// </div>
// </div>

// <div className=" flex justify-between items-center py-3 border-b border-solid border-b-[#EFEDED]">
// <div className=" flex items-center gap-x-2">
//   <Image src={avatar} alt="profile" className=" rounded-full w-6 h-6 object-cover" />
//   <h4 className=" text-cs-grey-dark font-medium text-sm">Olami Anula</h4>
// </div>
// <div className=" flex gap-x-2">
//   <Image src={raisedHand} alt="raisedHand" />
//   <MicrophoneSlash1 size="24" color="#5E29B7" />
// </div>
// </div> */}