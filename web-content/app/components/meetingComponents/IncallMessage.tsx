// "use client"
// import React, { useContext, useEffect, useState } from 'react';
// import getChimeContext from '../context/getChimeContext';
// import useRoster from '../hooks/useRoster';


// const sendMessage = async (topic: string, data: any) => {
//   await new Promise<void>((resolve) => {
//     setTimeout(() => {
//       const payload = {
//         ...data,
//         attendeeId: this.attendeeId || '',
//         name: this.rosterName || '',
//       };
//       if (this.audioVideo) {
//         this.audioVideo.realtimeSendDataMessage(
//           topic,
//           payload,
//           ChimeSdkWrapper.DATA_MESSAGE_LIFETIME_MS
//         );
//       }
//       this.publishMessageUpdate(
//         new DataMessage(
//           Date.now(),
//           topic,
//           new TextEncoder().encode(payload),
//           this.meetingSession.configuration.credentials.attendeeId || '',
//           this.meetingSession.configuration.credentials.externalUserId || ''
//         )
//       );
//       resolve();
//     }, 0);
//   });
// };


// export default function RosterCompoment(props) {
//   const { realTimeRequestAttendees, leaveMeeting } = props;
//   const chime = useContext(getChimeContext());
//   const roster = useRoster();
//   const [videoAttendees, setVideoAttendees] = useState(new Set());
//   const [isVideo, setIsVideo] = useState(false);

//   const realtimeSubscribeToReceiveDataMessage = async () => {
//     chime.audioVideo &&
//       (await chime.audioVideo.realtimeSubscribeToReceiveDataMessage(chime.attendeeId, async (data) => {
//         const receivedData = (data && data.json()) || {};
//         const { type, name } = receivedData || {};
//         if ((type === 'UNMUTE' || type === 'VIDEO-ENABLE')) {
//           return;
//         }
//         if (type === 'UNMUTE') {
//           chime.audioVideo && (await chime.audioVideo.realtimeUnmuteLocalAudio());
//         } else if (type === 'MUTE') {
//           chime.audioVideo && (await chime.audioVideo.realtimeMuteLocalAudio());
//         } else if (type === 'KICK') {
//           await new Promise((resolve) => setTimeout(resolve, 200));
//           await chime.chooseVideoInputDevice(null);
//           chime.audioVideo && (await chime.audioVideo.stopContentShare());
//           chime.audioVideo && (await chime.audioVideo.stop());
//           if (leaveMeeting) leaveMeeting(); // You can call leave meeting function here to kick any user
//         } else if (type === 'VIDEO-DISABLE') {
//           chime.audioVideo && (await chime.audioVideo.stopLocalVideoTile());
//         } else if (type === 'VIDEO-ENABLE') {
//           await chime.chooseVideoInputDevice(chime.currentVideoInputDevice);
//         chime.audioVideo && (await chime.audioVideo.startLocalVideoTile());
//         } 
//       }));
//   };

//   useEffect(() => {
//     realtimeSubscribeToReceiveDataMessage();
//     const tileIds = {};
//     const realTimeVideoAttendees = new Set();
//     const removeTileId = (tileId) => {
//       const removedAttendeeId = tileIds[tileId];
//       delete tileIds[tileId];
//       realTimeVideoAttendees.delete(removedAttendeeId);
//       setVideoAttendees(new Set(realTimeVideoAttendees));
//     };

//     chime.audioVideo &&
//       chime.audioVideo.addObserver({
//         videoTileDidUpdate: (tileState) => {
//           if (!tileState.boundAttendeeId || tileState.isContent || !tileState.tileId) {
//             return;
//           }

//           if (tileState.active) {
//             tileIds[tileState.tileId] = tileState.boundAttendeeId;
//             realTimeVideoAttendees.add(tileState.boundAttendeeId);
//             setVideoAttendees(new Set(realTimeVideoAttendees));
//           } else {
//             removeTileId(tileState.tileId);
//           }
//         },
//         videoTileWasRemoved: (tileId) => {
//           removeTileId(tileId);
//         },
//       });
//   }, []);

//   let attendeeIds;
//   if (chime.meetingSession && roster) {
//     attendeeIds = Object.keys(roster).filter((attendeeId) => !!roster[attendeeId].name);
//   }

//   return (
//     <div>
//       <div className="roster">
//         {attendeeIds &&
//           attendeeIds.map((attendeeId) => {
//             const rosterAttendee = roster[attendeeId];
//             return (
//               <div key={attendeeId} className="attendee">
//                 <div className="name">{rosterAttendee.name}</div>
//                 { realTimeRequestAttendees && realTimeRequestAttendees.has(attendeeId) && (
//                   <div className="">
//                     <a
//                       className="cursor"
//                       onClick={() => {
//                         realTimeRequestAttendees.delete(attendeeId);
//                         chime.sendMessage(attendeeId, {
//                           type: 'ADMIT',
//                         });
//                       }}
//                     >
//                       Answer
//                     </a>
//                   </div>
//                 )}

//                   <a
//                     className="cursor"
//                     onClick={() => {
//                       chime.sendMessage(attendeeId, {
//                         type: 'KICK',
//                       });
//                     }}
//                   >
//                     Remove
//                   </a>

//                 {videoAttendees && (
//                   <div className="video">
//                     <a
//                       className="cursor"
//                       onClick={() => {

//                           chime.sendMessage(attendeeId, {
//                             type: videoAttendees.has(attendeeId) ? 'VIDEO-DISABLE' : 'VIDEO-ENABLE',
//                           });

//                         }
//                       }}
//                     >
//                       {videoAttendees.has(attendeeId) ? (
//                         <i className="fa fa-video-camera" />
//                       ) : (
//                         <i className="camera-icon-muted" />
//                       )}
//                     </a>
//                   </div>
//                 )}
//                 {typeof rosterAttendee.muted === 'boolean' && (
//                   <div className="muted">
//                     <a
//                       className="cursor"
//                       onClick={() => {
//                           chime.sendMessage(attendeeId, {
//                             type: rosterAttendee.muted ? 'UNMUTE' : 'MUTE',
//                           });
//                       }}
//                     >
//                       {rosterAttendee.muted ? (
//                         <i className="fa fa-microphone-slash" />
//                       ) : (
//                         <i
//                           className={cx(
//                             'fa fa-microphone',
//                             { 'active-speaker': rosterAttendee.active },
//                             {
//                               'weak-signal': rosterAttendee.signalStrength && rosterAttendee.signalStrength < 50,
//                             },
//                           )}
//                         />
//                       )}
//                     </a>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   );
// }















// "use client"
// import React, { useState, useEffect } from 'react';
// import { useAudioVideo } from 'amazon-chime-sdk-component-library-react';

// const Chat: React.FC = () => {
//   const [messages, setMessages] = useState<string[]>([]);
//   const [inputMessage, setInputMessage] = useState<string>('');
//   const audioVideo = useAudioVideo();

//   useEffect(() => {
//     if (!audioVideo) return;

//     // Subscribe to receive chat messages
//     audioVideo.realtimeSubscribeToReceiveDataMessage('chat', (dataMessage) => {
//       const message = new TextDecoder().decode(dataMessage.data);
//       setMessages(prevMessages => [...prevMessages, message]);
//     });

//     return () => {
//       // Unsubscribe from chat messages when component unmounts
//       audioVideo.realtimeUnsubscribeFromReceiveDataMessage('chat');
//     };
//   }, [audioVideo]);

//   const sendMessage = () => {
//     if (!audioVideo || !inputMessage.trim()) return;

//     // Send message to other participants
//     audioVideo.realtimeSendDataMessage('chat', new TextEncoder().encode(inputMessage));

//     // Add sent message to the chat UI
//     setMessages(prevMessages => [...prevMessages, inputMessage]);
//     setInputMessage('');
//   };

//   return (
//     <div>
//       <div>
//         {messages.map((message, index) => (
//           <div key={index}>{message}</div>
//         ))}
//       </div>
//       <div>
//         <input
//           type="text"
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Chat;



"use client"
import React, { useState, useEffect } from 'react';
import { useAudioVideo } from 'amazon-chime-sdk-component-library-react';

const Chat = ({ attendeeIDProp }: { attendeeIDProp: string | null | undefined }) => {
  const [messages, setMessages] = useState<{ sender: string; attendeeId: string; message: string }[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const audioVideo = useAudioVideo();

  console.log(messages);

  useEffect(() => {
    if (!audioVideo) return;

    audioVideo.realtimeSubscribeToReceiveDataMessage('chat', (dataMessage) => {
      const message = new TextDecoder().decode(dataMessage.data);
      const sender = dataMessage.senderAttendeeId === attendeeIDProp ? 'Local User' : 'Remote Attendee';
      setMessages(prevMessages => [...prevMessages, { sender, attendeeId: dataMessage.senderAttendeeId, message }]);
    });

    return () => {
      audioVideo.realtimeUnsubscribeFromReceiveDataMessage('chat');
    };
  }, [audioVideo, , attendeeIDProp]);

  const sendMessage = () => {
    if (!audioVideo || !inputMessage.trim()) return;

    audioVideo.realtimeSendDataMessage('chat', new TextEncoder().encode(inputMessage));
    setMessages(prevMessages => [...prevMessages, { sender: 'Local User', attendeeId: attendeeIDProp || '', message: inputMessage }]);
    setInputMessage('');
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index} style={{ textAlign: message.sender === 'Local User' ? 'right' : 'left' }}>
            <span>{message.sender}: </span>{message.message}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;

