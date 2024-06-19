"use client"
import { Coffee, EmojiHappy, InfoCircle, Messages1, Microphone, MicrophoneSlash1, Monitor, More, MoreCircle, ProfileAdd, RecordCircle, Setting2, Video, VideoSlash } from "iconsax-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import DateTimeDisplay from "../../utils/getDate";
import { useContentShareControls, useContentShareState, useLocalVideo, useToggleLocalMute, MeetingManager, useAudioVideo } from "amazon-chime-sdk-component-library-react";
import raisedHand from '@/public/assets/images/raisedHand.svg'
import raisedHandWhite from "@/public/assets/images/raisedHandWhite.svg"
import joySvg from '@/public/assets/images/Joy.svg'
import redHeartSvg from '@/public/assets/images/Red Heart.svg'
import partyPopSvg from '@/public/assets/images/Party Popper.svg'
import clappingSvg from '@/public/assets/images/Clapping Hands.svg'
import smirkSvg from '@/public/assets/images/Smirking With Starry Eyes.svg'
import smileTearSvg from '@/public/assets/images/Smiling face with tear.svg'
import thumbsDownSvg from '@/public/assets/images/Thumbs Down.svg'
import horrorSvg from '@/public/assets/images/Horror-stricken face.svg'
import captureWhite from "@/public/assets/images/captureWhite.svg"
import capturePurple from "@/public/assets/images/capturePurple.svg"

import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/StoreContext";
// import image from require(`../../public/assets/images/Joy.svg`)

const image = require(`../../public/assets/images/Joy.svg`)

const emojis = [
  { emoji: joySvg, alt: 'joy', url: image }, { emoji: redHeartSvg, alt: 'red-heart', url: '@/public/assets/images/Red Heart.svg' }, { emoji: partyPopSvg, alt: 'party-popper', url: '@/public/assets/images/Party Popper.svg' }, { emoji: clappingSvg, alt: 'clapping-hands', url: '@/public/assets/images/Clapping Hands.svg' }, { emoji: smirkSvg, alt: 'smirk', url: '@/public/assets/images/Smirking With Starry Eyes.svg' }, { emoji: smileTearSvg, alt: 'smile-tear', url: '@/public/assets/images/Smiling face with tear.svg' }, { emoji: thumbsDownSvg, alt: 'thumbs-down', url: '@/public/assets/images/Thumbs Down.svg' }, { emoji: horrorSvg, alt: 'horrified-face', url: '@/public/assets/images/Horror-stricken face.svg' }
]

export default function MeetingControl({
  bgColor, onOpen, sideView, sideViewFunc, meetingManager, attendeIDString, sendEmoji,
}: {
  bgColor: boolean, onOpen: () => void,
  sideView?: string, sideViewFunc: (value: string) => void,
  meetingManager: MeetingManager
  attendeIDString: string | null | undefined
  sendEmoji: (sender: string, emoji: string) => void
}) {
  const currentTimeRef = useRef<HTMLDivElement>(null);
  const [changeBg, setChangeBg] = useState(true)
  const { muted, toggleMute } = useToggleLocalMute();
  const { isVideoEnabled, toggleVideo } = useLocalVideo();
  const { toggleContentShare } = useContentShareControls();
  const { isLocalUserSharing } = useContentShareState();
  const [localSideView, setLocalSideView] = useState('');
  const [toggleSideView, setToggleSideView] = useState(false);
  const [otherViews, setOtherViews] = useState<string[]>([])
  const navigate = useRouter()
  const meetingSessionRef = useRef(null);
  const audioVideo = useAudioVideo();
  const [raiseHandAdded, setRaiseHandAdded] = useState(false);

  const { setAppState } = useAppContext();

  useEffect(() => {
    if (otherViews.includes('Raise-Hand')) {
      setRaiseHandAdded(true);
    }
  }, [otherViews]);

  useEffect(() => {
    if (raiseHandAdded) {
      const timeout = setTimeout(() => {
        setOtherViews(prevOtherViews => prevOtherViews.filter(item => item !== 'Raise-Hand'));
        setRaiseHandAdded(false); // Reset the state after removing "Raise-Hand"
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [raiseHandAdded]);


  useEffect(() => {
    const updateCurrentTime = () => {
      const displayDate = DateTimeDisplay;
      const { hours, minutes, ampm } = displayDate();
      if (currentTimeRef.current !== null) {
        currentTimeRef.current.textContent = `${hours < 10 ? ('0' + hours) : hours}:${minutes < 10 ? ('0' + minutes) : minutes} ${ampm}`;
      }

    };
    // Update the time initially
    updateCurrentTime()

    // Update the time every minute 
    const intervalId = setInterval(updateCurrentTime, 60000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  const handleLocalSideView = (value: string) => {
    if (value === sideView) {
      sideViewFunc('')
    } else {
      sideViewFunc(value)
    }
  }

  const handleOtherViews = (value: string) => {
    setOtherViews(prevOtherViews => {
      if (prevOtherViews.includes(value)) {
        return prevOtherViews.filter(item => item !== value);
      } else {
        return [...prevOtherViews, value];
      }
    });
  }

  const sendRaiseHand = (timestamp: string, attendee: string) => {
    handleOtherViews('Raise-Hand')
    // Update local state immediately
    setAppState((prevState) => ({
      ...prevState,
      sessionState: {
        ...prevState.sessionState,
        raisedHand: { timestamp: timestamp, message: attendee },
      },
    }));

    // Check if audioVideo is available
    if (!audioVideo) return;
    const message = JSON.stringify({ timestamp: timestamp, message: attendee });

    // Send the message
    audioVideo.realtimeSendDataMessage('raise-hand', (message));
  };

  const handleEndMeeting = () => {
    meetingManager.audioVideo?.stop();
    navigate.push('/')
  }




  return (
    <>
      <div className="hidden md:flex justify-between items-center py-4 px-6 bg-cs-grey-45 border-t border-solid border-t-cs-grey-55">
        <div className="flex gap-x-2 lg:gap-x-3 flex-2">
          <div className="hidden lg:block text-cs-grey-800 font-normal text-base lg:text-[20px]" ref={currentTimeRef}></div>
          <div className="hidden lg:block w-[1px] bg-cs-grey-200"></div>
          <h3 className=" text-cs-grey-800 font-normal text-base lg:text-[20px]">AWS Conference</h3>
        </div>

        <div className="flex justify-center flex-3">
          <div className=" flex gap-x-3 lg:gap-x-6">
            <div className="text-center cursor-pointer" onClick={toggleMute}>
              <div className={`p-3 ${muted ? "bg-[#E1C6FF4D]" : "bg-cs-purple-650"} rounded-md max-w-12 relative`}>
                {muted ? (
                  <MicrophoneSlash1 size="24" color="#5E29B7" className="mx-auto max-w-5" />
                ) : (
                  <Microphone size="24" color="#FAFAFA" className="mx-auto max-w-5" />
                )}
                {!muted && <MoreCircle size="24" color="#5E29B7" className="mx-auto rounded-full absolute -top-[5px] -right-[10px]" style={{ fill: "#ffffff" }} />}
              </div>
              <h6 className=" text-cs-grey-100 font-medium text-xs">{muted ? "Unmute" : "Mute"}</h6>
            </div>

            <div className="text-center cursor-pointer" onClick={toggleVideo}>
              <div className={`p-3 ${isVideoEnabled ? "bg-cs-purple-650" : "bg-[#E1C6FF4D]"} rounded-md max-w-12 mx-auto`}>
                {isVideoEnabled ? (
                  <Video size="24" color="#FAFAFA" className="mx-auto max-w-5" />
                ) : (
                  <VideoSlash size="24" color="#5E29B7" className="mx-auto max-w-5" />
                )}

              </div>
              <h6 className=" text-cs-grey-100 font-medium text-xs">Video</h6>
            </div>

            <div className="text-center cursor-pointer" onClick={() => toggleContentShare()}>
              <div className={`p-3 ${isLocalUserSharing ? "bg-cs-purple-650" : "bg-[#E1C6FF4D]"} rounded-md max-w-12 mx-auto`}>
                <Monitor size="24" color={isLocalUserSharing ? "#FAFAFA" : "#5E29B7"} className="mx-auto max-w-5" />
              </div>
              <h6 className=" text-cs-grey-100 font-medium text-xs">Share</h6>
            </div>

            <div className="text-center cursor-pointer">
              <div className="p-3 bg-[#E1C6FF4D] rounded-md max-w-12 mx-auto">
                <RecordCircle size="24" color="#5E29B7" className="mx-auto max-w-5" />
              </div>
              <h6 className=" text-cs-grey-100 font-medium text-xs">Record</h6>
            </div>

            <div className=" relative">
              <div className="text-center cursor-pointer " onClick={() => handleOtherViews('React')}>
                <div className={`p-3 ${otherViews.includes('React') ? 'bg-[#5E29B7]' : 'bg-[#E1C6FF4D]'} rounded-md max-w-12  mx-auto`}>
                  {otherViews.includes('React') ? (
                    <EmojiHappy size="24" color="#FAFAFA" className="mx-auto max-w-5" />
                  ) : (
                    <EmojiHappy size="24" color="#5E29B7" className="mx-auto max-w-5" />
                  )}
                </div>
                <h6 className=" text-cs-grey-100 font-medium text-xs">React</h6>
              </div>
              {otherViews.includes('React') && (
                <div className=" absolute left-[-145px] top-[-56px] bg-[#A3A3A3CC] shadow-xl shadow-[#0000001C] rounded-[10px]">
                  <div className=" relative py-2 px-4 flex gap-x-4">
                    {emojis.map(emoji => <Image src={emoji.emoji} alt={emoji.alt} width={18} height={18} className="min-w-6 max-w-5 cursor-pointer" onClick={() => sendEmoji(attendeIDString as string, emoji.emoji)} key={emoji.alt} />)}
                  </div>
                </div>
              )}
            </div>

            <div className="text-center cursor-pointer" onClick={() => sendRaiseHand(new Date().toLocaleString(), attendeIDString as string)}>
              <div className={`p-3 rounded-md max-w-12 mx-auto ${otherViews.includes('Raise-Hand') ? 'bg-[#5E29B7]' : 'bg-[#E1C6FF4D]'}`}>
                <Image src={otherViews.includes('Raise-Hand') ? raisedHandWhite : raisedHand} alt="hand" width={18} height={18} className="min-w-6 max-w-5" />
              </div>
              <h6 className=" text-cs-grey-100 font-medium text-xs">Raise hand</h6>
            </div>

            <div className=" bg-cs-red text-center rounded-lg py-3 px-5 text-white font-bold text-sm h-fit cursor-pointer" onClick={handleEndMeeting}>
              <span>End</span>
            </div>
          </div>
        </div>

        <div className=" flex gap-x-4 lg:gap-x-6 flex-2 justify-end">
          <div className="text-center cursor-pointer" onClick={() => handleLocalSideView('Caption')}>
            <div className={`p-3 ${sideView === 'Caption' ? 'bg-[#5E29B7]' : 'bg-[#E1C6FF4D]'} rounded-md max-w-12  mx-auto`}>
              <Image src={sideView === 'Caption' ? captureWhite : capturePurple} alt="hand" width={18} height={18} className="min-w-6 max-w-5 h-6" />
            </div>
            <h6 className=" text-cs-grey-100 font-medium text-xs">Caption</h6>
          </div>

          <div className="text-center cursor-pointer" onClick={() => handleLocalSideView('Participants')}>
            <div className={`p-3 ${sideView === 'Participants' ? 'bg-[#5E29B7]' : 'bg-[#E1C6FF4D]'} rounded-md max-w-12  mx-auto`}>
              {sideView === 'Participants' ? (
                <ProfileAdd size="24" color="#FAFAFA" className="mx-auto max-w-5" />
              ) : (
                <ProfileAdd size="24" color="#5E29B7" className="mx-auto max-w-5" />
              )}
            </div>
            <h6 className=" text-cs-grey-100 font-medium text-xs">Participants</h6>
          </div>

          <div className="text-center cursor-pointer" onClick={() => handleLocalSideView('Chat')}>
            <div className={`p-3 ${sideView === 'Chat' ? 'bg-[#5E29B7]' : 'bg-[#E1C6FF4D]'} rounded-md max-w-12  mx-auto`}>
              {sideView === 'Chat' ? (
                <Messages1 size="24" color="#FAFAFA" className="mx-auto max-w-5" />
              ) : (
                <Messages1 size="24" color="#5E29B7" className="mx-auto max-w-5" />
              )}
            </div>
            <h6 className=" text-cs-grey-100 font-medium text-xs">Chat</h6>
          </div>

          <div className="text-center">
            <div className="p-3 bg-[#E1C6FF4D] rounded-md max-w-12 mx-auto">
              <Coffee size="24" color="#5E29B7" className="mx-auto max-w-5" />
            </div>
            <h6 className=" text-cs-grey-100 font-medium text-xs">Activity</h6>
          </div>
        </div>
      </div>

      <div className=" md:hidden py-4">
        <div className="px-6 sm:px-24">
          <div className=" flex justify-between ">
            <div className="text-center cursor-pointer" onClick={toggleMute}>
              <div className={`p-3 ${muted ? "bg-[#E1C6FF4D]" : "bg-cs-purple-650"} rounded-md max-w-12 relative`}>
                {muted ? (
                  <MicrophoneSlash1 size="18" color="#5E29B7" className="mx-auto" />
                ) : (
                  <Microphone size="18" color="#FAFAFA" className="mx-auto" />
                )}
                {!muted && <MoreCircle size="18" color="#5E29B7" className="mx-auto rounded-full absolute -top-[5px] -right-[10px]" style={{ fill: "#ffffff" }} />}
              </div>
            </div>

            <div className="text-center cursor-pointer" onClick={toggleVideo}>
              <div className={`p-3 ${isVideoEnabled ? "bg-cs-purple-650" : "bg-[#E1C6FF4D]"} rounded-md max-w-12 mx-auto`}>
                {isVideoEnabled ? (
                  <Video size="18" color="#FAFAFA" className="mx-auto" />
                ) : (
                  <VideoSlash size="18" color="#5E29B7" className="mx-auto" />
                )}

              </div>
            </div>

            <div className="text-center cursor-pointer">
              <div className="p-3 bg-[#E1C6FF4D] rounded-md max-w-12 mx-auto">
                <EmojiHappy size="18" color="#5E29B7" className="mx-auto" />
              </div>
            </div>

            <div className="text-center cursor-pointer">
              <div className="p-3 bg-[#E1C6FF4D] rounded-md max-w-12 mx-auto">
                <Image src={raisedHand} alt="hand" width={18} height={18} className="min-w-4" />
              </div>
            </div>

            <div className="text-center cursor-pointer">
              <div className="p-3 bg-[#E1C6FF4D] rounded-md max-w-12 mx-auto">
                <More size="18" color="#5E29B7" className="mx-auto" style={{ transform: 'rotate(90deg)', fill: '#5E29B7' }} />
              </div>
            </div>

            <div className=" bg-cs-red text-center rounded-lg py-3 px-5 text-white font-bold text-sm h-fit cursor-pointer">
              <span>End</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
