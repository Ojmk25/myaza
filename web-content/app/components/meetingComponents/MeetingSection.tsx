"use client"
import Image from "next/image";
import { Add, Copy, EmojiNormal, MicrophoneSlash1, RecordCircle, SearchNormal1, Send } from "iconsax-react";

import avatar from "@/public/assets/images/avatar.png"
import videoImg from "@/public/assets/images/video.png"
import activeVoice from '@/public/assets/images/activeVoice.svg'
import closeIconPurple from "@/public/assets/images/closeIconPurple.svg"
import raisedHand from '@/public/assets/images/raisedHand.svg'
import { RefObject, createRef, useEffect, useRef, useState } from "react";
import dottedLine from "@/public/assets/images/dottedLine.svg"
import { LocalVideo, VideoTileGrid, useLocalVideo, useToggleLocalMute, PreviewVideo, FeaturedRemoteVideos, VideoTile, RemoteVideo, useRemoteVideoTileState, useRosterState, useAttendeeStatus, useContentShareControls, ContentShare, useContentShareState, useAudioVideo } from 'amazon-chime-sdk-component-library-react';
import { RemoteAttendeeCard } from "./RemoteAttendeeCard";
import { LocalAttendeeCard } from "./LocalAttendeeCard";
import { AttendeeListCard } from "./AttendeeListCard";
import { Message, DataMessage, DefaultRealtimeController } from "amazon-chime-sdk-js";
import Chat from "./IncallMessage";


export default function MeetingSection({ attendeIDString, externalID }: { attendeIDString: string | null | undefined, externalID: string | null | undefined }) {
  const { roster } = useRosterState();
  const attendees = Object.values(roster);
  const { muted, toggleMute } = useToggleLocalMute();
  const { tiles, tileIdToAttendeeId, attendeeIdToTileId, size } = useRemoteVideoTileState();
  const { toggleContentShare } = useContentShareControls();
  const { isLocalUserSharing } = useContentShareState();
  const [meetingSideView, setMeetingSideView] = useState('meeting')
  const messageData = new DataMessage(Date.now(), "Test-Meeting", new Uint8Array(), "attendee", 'externalId')
  const messageChat = new Message('string', {}, 'I said')
  const audioVideo = useAudioVideo();
  const [chatMessages, setChatMessages] = useState<any>([]);
  const [someChat, setSomeChat] = useState('')


  const attendeeItems = attendees.map((attendee, i) => {
    const tilerId = attendeeIdToTileId[attendee.chimeAttendeeId]

    const { name } = attendee;
    // return <AttendeeCard key={id} attendeeId={id} name={name} videoTildId={tilerId} nameID={attendee.chimeAttendeeId} />;
    if (i === 0) {
      return <LocalAttendeeCard key={attendee.chimeAttendeeId} attendeeId={attendee.chimeAttendeeId} name={name} videoTildId={tilerId} nameID={attendee.chimeAttendeeId} />
    } else {
      return <RemoteAttendeeCard key={attendee.chimeAttendeeId} attendeeId={attendee.chimeAttendeeId} name={name} videoTildId={tilerId} nameID={attendee.chimeAttendeeId} />
    }
  });

  const toggleContentShareCustom = () => {
    console.log(muted)

    // const mediaStream = await navigator.mediaDevices.getDisplayMedia({
    //   video: true,
    //   audio: true,
    // });
    // await toggleContentShare(mediaStream);

  };

  // useEffect(() => {
  //   if (!audioVideo) return;

  // Function to send a message

  // new TextEncoder().encode(message)
  // Function to handle incoming messages
  const handleIncomingMessage = (data: DataMessage) => {
    const messagePayload = JSON.parse(data.text());

    setChatMessages((prevMessages: any[]) => [...prevMessages, messagePayload]);

  };

  // const dataMess: DataMessage = {
  //   timestampMs: Number(new Date()), // Replace with sender's name or identifier
  //   topic: 'chat',
  //   data: new TextEncoder().encode("Text message"),
  //   senderAttendeeId: 'hhdhd',
  //   senderExternalUserId: 'bdbdbd',
  // }
  // const checkMessages = () => {
  //   // console.log(JSON.parse(Buffer.from(dataMess.data).toString('utf8')));

  //   audioVideo?.realtimeSubscribeToReceiveDataMessage('chat', () => handleIncomingMessage(dataMess))

  // }
  // Set up WebSocket for real-time messaging
  // audioVideo?.realtimeSubscribeToReceiveDataMessage('chat', handleIncomingMessage);

  // return () => {
  //   audioVideo.realtimeUnsubscribeFromReceiveDataMessage('chat');
  // };
  // }, [audioVideo]);

  // Event handler for sending messages
  // const handleSendMessage = (event: any) => {

  //   if (event.key === 'Enter') {
  //     const messageInput = event.target.value.trim();
  //     if (messageInput !== '') {
  //       sendMessage(messageInput);
  //       event.target.value = ''; // Clear input field after sending
  //     }
  //   }
  // };

  // const realtimeSubscribeToReceiveDataMessage = async () => {
  audioVideo &&
    (audioVideo.realtimeSubscribeToReceiveDataMessage('topic', async (data) => {
      const receivedData = (data && data.json()) || {};
      console.log(typeof receivedData);
      console.log("If it works");


      // const { type, name } = receivedData || {};
      // if ((type === 'UNMUTE' || type === 'VIDEO-ENABLE')) {
      //   return;
      // }
    }));
  // };

  const handleSendMessage = (event: any) => {
    setSomeChat(event)

  };

  const sendMessageNew = async (topic: string, data: any) => {
    await new Promise<void>((resolve) => {
      // setTimeout(() => {
      const payload = {
        ...data,
        attendeeId: attendeIDString || '',
        name: "rosterName" || '',
      };
      if (audioVideo) {
        audioVideo.realtimeSendDataMessage(
          topic,
          new TextEncoder().encode(payload),
          // ChimeSdkWrapper.DATA_MESSAGE_LIFETIME_MS
        );
      }
      const publishMessageUpdate = (
        new DataMessage(
          Date.now(),
          topic,
          new TextEncoder().encode(payload),
          attendeIDString || '',
          externalID || ''
        )
      );
      resolve();
      // }, 5000);
    });
  };


  return (
    <div className="flex flex-4">


      <div className=" flex-5 bg-cs-black-200 px-10 py-5 rounded-[4px]">
        <div className=" h-full flex flex-col">
          <div className="flex gap-x-3 flex-2 items-center">
            {/* <div className="p-[4px] bg-cs-grey-50 rounded-lg"><RecordCircle size="24" color="#CB3A32" variant="Bulk" /></div>
          <div className=" text-cs-grey-50 font-normal">Conference is recorded</div>
          <div className=" w-[1px] bg-cs-grey-200 min-h-6"></div> */}
            <h3 className=" text-cs-grey-50 font-semibold ">Anthony Femi</h3>
          </div>
          <div className="flex justify-center items-center rounded-lg overflow-hidden h-full">
            <div className=" min-h-[200px] w-full h-full rounded-lg min-w-[200px]" >
              <ContentShare nameplate="Content share" className=' rounded-lg relative bg-slate-800 min-h-[200px] [&>video]:object-cover' css="border: 1px solid" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-6 grid pl-6 gap-4">
        {meetingSideView === "some" && (
          <div className=" flex gap-8 h-full">
            {attendeeItems}
          </div>)}

        <div className=" flex-6 ml-6 bg-cs-grey-50 border-solid border border-[#F1F1F1] rounded-[4px] px-4 pt-5">
          <div className=" flex justify-between items-center">
            <h3 className=" text-cs-grey-dark font-medium text-2xl">Participants <span className=" text-cs-grey-100 font-medium text-base">({attendees.length})</span></h3>
            <Image src={closeIconPurple} alt="close-icon" />
            <input
              type="text"
              placeholder="Type your message here..."
              onChange={handleSendMessage}
            />
            <button onClick={() => sendMessageNew('topic', someChat)}>check message</button>
          </div>
          <div className=" relative mt-7 mb-5">
            <input type="text" name="" id="" className=" w-full border border-cs-grey-300 h-12 rounded-[10px] outline-none pl-12 placeholder:text-sm placeholder:font-normal" placeholder="Search for participants" />
            <SearchNormal1 size="20" color="#898989" className=" absolute top-[14px] left-[14px]" />
            <Chat attendeeIDProp={attendeIDString} />
          </div>
          <div>
            {attendees.map((attendee) => (
              <AttendeeListCard attendeeId={attendee.chimeAttendeeId} key={attendee.chimeAttendeeId} />
            ))}
            {/* {chatMessages.map((message, index) => (
              <div key={index}>
                {`[${message.timestamp}] ${message.sender}: ${message.content}`}
              </div>
            ))} */}


            {/* <div className=" flex justify-between items-center py-3 border-b border-solid border-b-[#EFEDED]">
              <div className=" flex items-center gap-x-2">
                <Image src={avatar} alt="profile" className=" rounded-full w-6 h-6 object-cover" />
                <h4 className=" text-cs-grey-dark font-medium text-sm">Olami Anula</h4>
              </div>
              <div>
                <MicrophoneSlash1 size="24" color="#5E29B7" />
              </div>
            </div> */}

            {/* <div className=" flex justify-between items-center py-3 border-b border-solid border-b-[#EFEDED]">
              <div className=" flex items-center gap-x-2">
                <Image src={avatar} alt="profile" className=" rounded-full w-6 h-6 object-cover" />
                <h4 className=" text-cs-grey-dark font-medium text-sm">Olami Anula</h4>
              </div>
              <div className=" flex gap-x-2">
                <Image src={raisedHand} alt="raisedHand" />
                <MicrophoneSlash1 size="24" color="#5E29B7" />
              </div>
            </div> */}
          </div>
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