'use client'
import { ContentShare, LocalVideo, RemoteVideo, useAttendeeStatus, useContentShareControls, useContentShareState, useLocalVideo, useMeetingManager, useRemoteVideoTileState, useRosterState, useToggleLocalMute, VideoTile, VideoTileGrid } from "amazon-chime-sdk-component-library-react";
import { MeetingSessionConfiguration, VideoTileState } from "amazon-chime-sdk-js";
import MeetingSection from "../components/meetingComponents/MeetingSection";
import MeetingControl from "../components/meetingComponents/MeetingControl";
import { useState } from "react";
import { ArrowLeft, Coffee, InfoCircle, Setting2 } from "iconsax-react";
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
  const [sideView, setSideView] = useState('');




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


  const handleSideView = (value: string) => {
    setSideView(value)
  }

  const handleConference = (value: string) => {
    if (value === sideView) {
      setSideView('')
    } else {
      setSideView(value)
    }
  }


  return (
    <>
      <main className="px-6 flex flex-col h-dvh relative">
        <div className="md:hidden ">
          <div className="flex  justify-between items-center py-4 bg-[#FEFDFF] border-solid border-b border-b-[#FAFAFA]">
            <div className="flex gap-x-1 items-center">
              <h1 className=" text-base text-cs-purple-650 font-bold">CecureStream</h1>
              <div className=" text-xs text-cs-grey-700 font-medium border-[0.5px] border-solid border-cs-grey-700 py-[2px] px-2 rounded-lg">Beta</div>
            </div>

            <div className="flex justify-between gap-x-2 items-center">
              <div className={` ${sideView === 'Conference Info' ? 'bg-[#5E29B7]' : 'bg-[#E1C6FF4D]'} p-[10px] rounded-lg items-center cursor-pointer`} onClick={() => handleConference('Conference Info')}>
                {sideView === 'Conference Info' ? (
                  <InfoCircle size="22" color="#FAFAFA" className="mx-auto max-w-5" />
                ) : (
                  <InfoCircle size="22" color="#5E29B7" className="mx-auto max-w-5" />
                )}
              </div>
              <div className="bg-[#E1C6FF4D] p-[10px] rounded-lg flex justify-center items-center cursor-pointer" onClick={() => handleShowModal("settings")}><Setting2 size="20" color="#5E29B7" className="mx-auto max-w-5" /></div>

              <div className="bg-[#E1C6FF4D] p-[10px] rounded-lg flex justify-center items-center cursor-pointer">
                <Coffee size="20" color="#5E29B7" className="mx-auto max-w-5" />
              </div>
            </div>
          </div>
          <div className=" flex gap-x-2 items-center">
            <ArrowLeft size="20" color="#080808" className="" />
            <h2>AWS Conference</h2>
          </div>

        </div>

        <div className=" hidden md:flex justify-between items-center py-4">
          <div className="flex gap-x-1 items-center">
            <h1 className=" text-3xl text-cs-purple-650 font-bold">CecureStream</h1>
            <div className=" text-xs text-cs-grey-700 font-medium border-[0.5px] border-solid border-cs-grey-700 py-[2px] px-2 rounded-lg">Beta</div>
          </div>

          <div className="flex justify-between gap-x-4 items-center">
            <div className={` flex ${sideView === 'Conference Info' ? 'bg-[#5E29B7]' : 'bg-[#E1C6FF4D]'} py-[10px] px-[10px] gap-x-[10px] rounded-lg items-center cursor-pointer`} onClick={() => handleConference('Conference Info')}>
              {sideView === 'Conference Info' ? (
                <InfoCircle size="24" color="#FAFAFA" className="mx-auto" />
              ) : (
                <InfoCircle size="24" color="#5E29B7" className="mx-auto" />
              )}
              <div className={`${sideView === 'Conference Info' ? 'text-cs-grey-50' : 'text-cs-purple-650'} font-semibold`}>Conference Info</div>
            </div>
            <div className="bg-[#E1C6FF4D] p-[10px] rounded-lg flex justify-center items-center cursor-pointer" onClick={() => handleShowModal("settings")}><Setting2 size="20" color="#5E29B7" /></div>
          </div>
        </div>

        {/* grid px-20 gap-x-16 items-center grid-cols-2 */}

        <button onClick={joinMeeting}>Join meeting</button>

        <MeetingSection
          attendeIDString={meetingManager.meetingSessionConfiguration?.credentials?.attendeeId}
          externalID={meetingManager.meetingSessionConfiguration?.credentials?.externalUserId}
          sideView={sideView}
          sideViewFunc={handleSideView}
          meetingManager={meetingManager}
        />

        <MeetingControl bgColor onOpen={() => handleShowModal("shareScreen")} sideViewFunc={handleSideView} sideView={sideView} />
        {showModal === "shareScreen" && <ShareScreen onClose={handleCloseModal} />}
        {showModal === "settings" && <Settings onClose={handleCloseModal} />}
      </main>
    </>
  )
}

