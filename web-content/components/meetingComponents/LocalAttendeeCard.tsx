import { LocalVideo, RemoteVideo, useAttendeeStatus, useLocalVideo } from "amazon-chime-sdk-component-library-react";
import Image from "next/image";
import { MicrophoneSlash1, Microphone } from "iconsax-react";
import avatar from "@/public/assets/images/avatar.png"
import dottedLine from "@/public/assets/images/dottedLine.svg"
import { useEffect } from "react";
import { getNameAbbreviation } from "@/services/authService";
import { processString } from "@/utils/meetingFunctions";



export const LocalAttendeeCard = ({ name, attendeeId, videoTildId, nameID, audioState, widthProp, maxWidthProp }: { name: string | undefined, attendeeId: any, videoTildId: number, nameID: string, audioState: JSX.Element, widthProp: string | number, maxWidthProp: string | number }) => {
  const { isVideoEnabled } = useLocalVideo();

  const { videoEnabled, sharingContent, muted } = useAttendeeStatus(attendeeId);

  useEffect(() => { getNameAbbreviation() }, [])

  return (
    <div className={`wrapperDiv bg-cs-black-200 flex-1 ${isVideoEnabled ? "" : "p-3"} rounded flex flex-col relative overflow-hidden min-w-[190px]`} style={{ width: widthProp, maxWidth: maxWidthProp }}>
      <div className={` ${isVideoEnabled ? "absolute right-3 z-10 top-3" : "flex justify-end"}`}>
        {audioState}
      </div>

      <div className="flex-1 flex justify-center items-center">
        <div className=" w-full h-full " >
          <LocalVideo className=' rounded relative bg-slate-800 capitalize' nameplate={processString(name as string)} id={`remotevideo-${videoTildId}`} css=" relative" />

          <div className=" flex w-full h-full justify-center items-center @container/imageWrapper">
            <div>
              {!isVideoEnabled && (
                // <Image src={avatar} alt="" className=" max-w-[50px] @[300px]/imageWrapper:max-w-[100px] max-h-[297px] rounded-full m-auto" />
                <div className=" bg-cs-grey-800 @[150px]/imageWrapper:w-[80px] @[150px]/imageWrapper:h-[80px] @[600px]/imageWrapper:w-[150px] @[600px]/imageWrapper:h-[150px] rounded-full flex justify-center items-center text-cs-grey-55 font-semibold text-[28px] m-auto">{getNameAbbreviation()}</div>
              )}
              {/* w-[100px] h-[100px] max-w-[150px] max-h-[150px] */}

              {!isVideoEnabled && <h3 className=" font-medium text-cs-grey-50 text-center mt-2 capitalize">{processString(name as string)}</h3>}
            </div>
          </div>
        </div>
      </div>

      <div className={`${isVideoEnabled ? "absolute right-4 bottom-4 z-10" : "flex justify-end"}`}>
        <div className="p-[6px]"><Image src={dottedLine} alt="" className=" w-4 h-4" /></div>
      </div>
    </div>

  );

}