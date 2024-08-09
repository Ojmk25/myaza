"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useAudioVideo } from "amazon-chime-sdk-component-library-react";
import closeIconPurple from "@/public/assets/images/closeIconPurple.svg";
import avatar from "@/public/assets/images/avatar.png";
import { EmojiNormal, Send } from "iconsax-react";
import { AppCtx, StoreContext } from "@/context/StoreContext";
import { timeSince } from "@/utils/formatTime";
import { getRemoteInitials } from "@/utils/meetingFunctions";

const Chat = ({
  attendeeIDProp,
  externalID,
  sideViewFunc,
}: {
  attendeeIDProp: string | null | undefined;
  externalID: string;
  sideViewFunc: (value: string) => void;
}) => {
  const [messages, setMessages] = useState<
    {
      sender: string;
      attendeeId: string;
      message: string;
      timeStamp: Date;
      externalID: string;
    }[]
  >([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const audioVideo = useAudioVideo();
  const { appState, setAppState } = useContext(AppCtx);
  const chatScroll = useRef<HTMLDivElement>(null);
  const [lastClicked, setLastClicked] = useState<Date | null>(null);
  const [timeAgo, setTimeAgo] = useState<string>("");
  const { meetingAttendees } = appState.sessionState;

  useEffect(() => {
    if (!audioVideo) return;

    audioVideo.realtimeSubscribeToReceiveDataMessage("chat", (dataMessage) => {
      const message = new TextDecoder().decode(dataMessage.data);
      const sender =
        dataMessage.senderAttendeeId === attendeeIDProp
          ? "Local User"
          : "Remote Attendee";
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender,
          attendeeId: dataMessage.senderAttendeeId,
          message,
          timeStamp: new Date(),
          externalID: dataMessage.senderExternalUserId,
        },
      ]);
    });

    return () => {
      audioVideo.realtimeUnsubscribeFromReceiveDataMessage("chat");
    };
  }, [audioVideo]);

  const sendMessage = () => {
    if (!audioVideo || !inputMessage.trim()) return;

    audioVideo.realtimeSendDataMessage(
      "chat",
      new TextEncoder().encode(inputMessage)
    );

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: "Local User",
        attendeeId: attendeeIDProp || "",
        message: inputMessage,
        timeStamp: new Date(),
        externalID,
      },
    ]);
    setInputMessage("");
  };

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      sendMessage();
      event.preventDefault();
    }
  };

  useEffect(() => {
    chatScroll.current!.scrollTop = chatScroll.current!.scrollHeight;
  }, [messages]);

  const returName = (string: any) => {
    const details = appState.sessionState.meetingAttendees.find(
      (att) => att.user_id === string
    );

    return details;
  };

  return (
    <div className="h-full metro-medium">
      <div className=" flex-6 bg-cs-grey-50 border-solid border border-[#F1F1F1] rounded-[4px] px-2 @[300px]/bigScreenSideCards:px-4 pt-5 h-full">
        <div className=" flex flex-col justify-between h-full">
          <div className=" flex justify-between items-center">
            <h3 className=" text-cs-grey-dark font-medium @[300px]/bigScreenSideCards:text-2xl">
              Chat
            </h3>
            <Image
              src={closeIconPurple}
              alt="profile"
              className=" cursor-pointer w-5 @[300px]/bigScreenSideCards:w-6"
              onClick={() => sideViewFunc("")}
            />
          </div>

          <div
            className="flex flex-col overflow-y-scroll h-full no-scrollbar"
            ref={chatScroll}
          >
            {messages.map((message, index) => (
              <div className=" align-bottom" key={index}>
                {message.sender === "Local User" ? (
                  <div className=" py-2">
                    <div className=" flex justify-end gap-x-1 items-center mb-[3px]">
                      <h4 className=" text-cs-grey-dark font-medium text-xs capitalize metro-medium">
                        {returName(message.externalID)?.full_name}
                      </h4>
                      {/* <Image src={avatar} alt="profile" className=" rounded-full w-5 h-5 object-cover" /> */}
                      {/* <div className=" bg-cs-grey-800 w-5 h-5 rounded-full flex justify-center items-center text-cs-grey-50 uppercase text-[10px] min-w-5">
                        {getRemoteInitials(
                          returName(message.externalID)?.full_name as string
                        )}
                      </div> */}
                      {returName(message.externalID)?.picture &&
                      returName(message.externalID)?.picture !== "" ? (
                        <Image
                          src={returName(message.externalID)?.picture as string}
                          alt={
                            returName(message.externalID)?.full_name as string
                          }
                          width={20}
                          height={20}
                          className=" rounded-full w-5 h-5 min-w-5 object-cover"
                        />
                      ) : (
                        <div className=" bg-cs-grey-800 w-5 h-5 rounded-full flex justify-center items-center text-cs-grey-50 uppercase text-[10px] min-w-5">
                          {getRemoteInitials(
                            returName(message.externalID)?.full_name as string
                          )}
                        </div>
                      )}
                    </div>
                    <p className=" text-xs font-normal text-cs-grey-800 text-right pr-6 metro-light">
                      {message.message}
                    </p>
                  </div>
                ) : (
                  <div className=" flex py-2 gap-x-1" key={index}>
                    {returName(message.externalID)?.picture &&
                    returName(message.externalID)?.picture !== "" ? (
                      <Image
                        src={returName(message.externalID)?.picture as string}
                        alt={returName(message.externalID)?.full_name as string}
                        width={20}
                        height={20}
                        className=" rounded-full w-5 h-5 min-w-5 object-cover"
                      />
                    ) : (
                      <div className=" bg-cs-grey-800 w-5 h-5 rounded-full flex justify-center items-center text-cs-grey-50 uppercase text-[10px] min-w-5">
                        {getRemoteInitials(
                          returName(message.externalID)?.full_name as string
                        )}
                      </div>
                    )}
                    {/* <Image src={avatar} alt="profile" className=" rounded-full w-5 h-5 object-cover" />
                    <div className=" bg-cs-grey-800 w-5 h-5 rounded-full flex justify-center items-center text-cs-grey-50 uppercase text-[10px] min-w-5">
                      {getRemoteInitials(
                        returName(message.externalID)?.full_name as string
                      )}
                    </div> */}
                    <div>
                      <div className=" flex items-center gap-x-2 mt-[3px] ">
                        <h4 className=" text-cs-grey-dark font-medium text-xs capitalize ">
                          {returName(message.externalID)?.full_name}
                        </h4>
                        <div className=" w-[5px] h-[5px] bg-[#333333] rounded-full"></div>
                        <h6 className=" text-cs-grey-500 text-[9px] font-normal">
                          {timeSince(message.timeStamp)}
                        </h6>
                      </div>
                      <p className=" text-xs font-normal text-cs-grey-800 mb-[5px] metro-light">
                        {message.message}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className=" flex gap-x-2 border-solid border-t-[1px] border-cs-grey-55 py-4 items-center">
            <input
              type="text"
              name=""
              id=""
              className=" w-full border border-cs-grey-55 h-8 @[300px]/bigScreenSideCards:h-10 rounded-[10px] outline-none px-2 @[300px]/bigScreenSideCards:px-4 placeholder:text-sm placeholder:font-normal 
              placeholder:text-[#0808085b] metro-light
              "
              placeholder="Hello Everyone 👋"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleEnterKeyPress}
            />
            <div className="text-center cursor-pointer">
              <div className="p-2 @[300px]/bigScreenSideCards:p-3 bg-[#E1C6FF4D] rounded-md max-w-12 mx-auto">
                <EmojiNormal size="14" color="#5E29B7" className="mx-auto" />
              </div>
            </div>
            <div className="text-center cursor-pointer" onClick={sendMessage}>
              <div className="p-2 @[300px]/bigScreenSideCards:p-3 bg-[#E1C6FF4D] rounded-md max-w-12 mx-auto">
                <Send
                  size="14"
                  color="#5E29B7"
                  className="mx-auto"
                  variant="Bold"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
