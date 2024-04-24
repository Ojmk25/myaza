import { LocalVideo, RemoteVideo, useAttendeeStatus, useLocalVideo } from "amazon-chime-sdk-component-library-react";
import Image from "next/image";
import { MicrophoneSlash1 } from "iconsax-react";
import avatar from "@/public/assets/images/avatar.png"
import dottedLine from "@/public/assets/images/dottedLine.svg"



export const LocalAttendeeCard = ({ name, attendeeId, videoTildId, nameID }: { name: string | undefined, attendeeId: any, videoTildId: number, nameID: string }) => {
  const { isVideoEnabled } = useLocalVideo();

  const { videoEnabled, sharingContent, muted } = useAttendeeStatus(attendeeId);


  return (
    <div className={`wrapperDiv bg-cs-black-200 flex-1 ${isVideoEnabled ? "" : "p-4"} rounded flex flex-col relative overflow-hidden`}>
      <div className={` ${isVideoEnabled ? "absolute right-4 top-4 z-10" : "flex justify-end"}`}>
        <div className={`p-[6px] bg-cs-grey-800 rounded-full`}><MicrophoneSlash1 size="24" color="#FAFAFA" /></div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className=" min-h-[200px] w-full h-full" >
          {!isVideoEnabled && <Image src={avatar} alt="" className=" max-w-[297px] max-h-[297px] rounded-full m-auto" />}
          <LocalVideo className=' rounded relative bg-slate-800' nameplate={nameID} id={`remotevideo-${videoTildId}`} css=" relative" />
          {!isVideoEnabled && <h3 className=" font-medium text-cs-grey-50 text-center mt-2">{nameID}</h3>}
        </div>
      </div>
      <div className={`${isVideoEnabled ? "absolute right-4 bottom-4 z-10" : "flex justify-end"}`}>
        <div className="p-[6px]"><Image src={dottedLine} alt="" className=" w-6 h-6" /></div>
      </div>
    </div>

  );

}