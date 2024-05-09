"use client"
import Image from 'next/image';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useAudioVideo } from 'amazon-chime-sdk-component-library-react';
import closeIconPurple from "@/public/assets/images/closeIconPurple.svg";
import avatar from "@/public/assets/images/avatar.png";
import { EmojiNormal, Send } from "iconsax-react";
import { AppCtx, StoreContext } from '@/pages/context/StoreContext';
import { timeSince } from '@/pages/utils/formatTime';


const Chat = ({ attendeeIDProp, sideViewFunc }: { attendeeIDProp: string | null | undefined, sideViewFunc: (value: string) => void }) => {
  const [messages, setMessages] = useState<{ sender: string; attendeeId: string; message: string, timeStamp: Date }[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const audioVideo = useAudioVideo();
  const { appState, setAppState } = useContext(AppCtx);
  const chatScroll = useRef<HTMLDivElement>(null)
  const [lastClicked, setLastClicked] = useState<Date | null>(null);
  const [timeAgo, setTimeAgo] = useState<string>('');



  useEffect(() => {
    if (!audioVideo) return;

    audioVideo.realtimeSubscribeToReceiveDataMessage('chat', (dataMessage) => {
      const message = new TextDecoder().decode(dataMessage.data);
      const sender = dataMessage.senderAttendeeId === attendeeIDProp ? 'Local User' : 'Remote Attendee';
      setMessages(prevMessages => [...prevMessages, { sender, attendeeId: dataMessage.senderAttendeeId, message, timeStamp: new Date }]);

      // setAppState(
      //   prevState => ({
      //     ...prevState,
      //     sessionState: {
      //       ...prevState.sessionState,
      //       incallMessages: [...prevState.sessionState.incallMessages, { sender, attendeeId: dataMessage.senderAttendeeId, message }],
      //     }
      //   }));
    });


    return () => {
      audioVideo.realtimeUnsubscribeFromReceiveDataMessage('chat');
    };
  }, [audioVideo, attendeeIDProp]);


  const sendMessage = () => {
    if (!audioVideo || !inputMessage.trim()) return;

    audioVideo.realtimeSendDataMessage('chat', new TextEncoder().encode(inputMessage));

    setMessages(prevMessages => [...prevMessages, { sender: 'Local User', attendeeId: attendeeIDProp || '', message: inputMessage, timeStamp: new Date }]);
    setInputMessage('');

    // setAppState(
    //   prevState => ({
    //     ...prevState,
    //     sessionState: {
    //       ...prevState.sessionState,
    //       incallMessages: [...prevState.sessionState.incallMessages, { sender: 'Local User', attendeeId: attendeeIDProp || '', message: inputMessage }],
    //     }
    //   }));

  };

  const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage()
      event.preventDefault();
    }
  };

  useEffect(() => {
    chatScroll.current!.scrollTop = chatScroll.current!.scrollHeight;

  }, [messages])




  return (
    <div className='h-full'>
      <div className=" flex-6 ml-6 bg-cs-grey-50 border-solid border border-[#F1F1F1] rounded-[4px] px-4 pt-5 h-full">
        <div className=" flex flex-col justify-between h-full">
          <div className=" flex justify-between items-center">
            <h3 className=" text-cs-grey-dark font-medium text-2xl">Chat</h3>
            <Image src={closeIconPurple} alt="profile" className=' cursor-pointer' onClick={() => sideViewFunc('')} />
          </div>

          <div className='flex flex-col overflow-y-scroll h-full no-scrollbar' ref={chatScroll}>
            {messages.map((message, index) => (
              <div className=' align-bottom' key={index}>{message.sender === 'Local User' ? (
                <div className=" py-1">
                  <div className=" flex justify-end gap-x-1 items-center">
                    <h4 className=" text-cs-grey-dark font-medium text-xs">{message.sender}</h4>
                    <Image src={avatar} alt="profile" className=" rounded-full w-5 h-5 object-cover" />
                  </div>
                  <h5 className=" text-xs font-normal text-cs-grey-800 text-right">{message.message}</h5>
                </div>
              ) : (
                <div className=" flex py-1 gap-x-1" key={index}>
                  <Image src={avatar} alt="profile" className=" rounded-full w-5 h-5 object-cover" />
                  <div>
                    <div className=" flex items-center gap-x-2 mt-[3px]">
                      <h4 className=" text-cs-grey-dark font-medium text-xs">{message.sender}</h4>
                      <div className=" w-[5px] h-[5px] bg-[#333333] rounded-full"></div>
                      <h6 className=" text-cs-grey-500 text-[9px] font-normal">{timeSince(message.timeStamp)}</h6>
                    </div>
                    <h5 className=" text-xs font-normal text-cs-grey-800">{message.message}</h5>
                  </div>
                </div>
              )}</div>
            ))}
          </div>

          <div className=" flex gap-x-2 border-solid border-t-[1px] border-cs-grey-55 py-4">
            <input type="text" name="" id="" className=" w-full border border-cs-grey-55 h-12 rounded-[10px] outline-none px-4 placeholder:text-sm placeholder:font-normal placeholder:text-cs-grey-dark" placeholder="Hello Everyone 👋" value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)} onKeyDown={handleEnterKeyPress} />
            <div className="text-center cursor-pointer">
              <div className="p-3 bg-[#E1C6FF4D] rounded-md max-w-12 mx-auto">
                <EmojiNormal size="24" color="#5E29B7" className="mx-auto" />
              </div>
            </div>
            <div className="text-center cursor-pointer" onClick={sendMessage}>
              <div className="p-3 bg-[#E1C6FF4D] rounded-md max-w-12 mx-auto">
                <Send size="24" color="#5E29B7" className="mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
