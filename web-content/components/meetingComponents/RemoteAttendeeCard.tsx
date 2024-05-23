'use client'
import { RemoteVideo, useAttendeeStatus, useLocalVideo, useRemoteVideoTileState } from "amazon-chime-sdk-component-library-react";
import Image from "next/image";
import avatar from "@/public/assets/images/avatar.png"
import dottedLine from "@/public/assets/images/dottedLine.svg"
import { useEffect } from "react";



export const RemoteAttendeeCard = ({ name, attendeeId, videoTildId, nameID, audioState, widthProp, maxWidthProp }: { name: string | undefined, attendeeId: any, videoTildId: number, nameID: string, audioState: JSX.Element, widthProp: string | number, maxWidthProp: string | number }) => {
  const { isVideoEnabled } = useLocalVideo();
  const { tiles, tileIdToAttendeeId, attendeeIdToTileId, size } = useRemoteVideoTileState();
  const { videoEnabled, sharingContent, muted } = useAttendeeStatus(nameID);

  return (
    <div className={`wrapperDiv bg-cs-black-200 flex-1 ${videoEnabled ? "" : "p-3"} rounded flex flex-col relative overflow-hidden min-w-[190px]`} style={{ width: widthProp, maxWidth: maxWidthProp }}>
      <div className={` ${videoEnabled ? "absolute right-0 z-10" : "flex justify-end"}`}>
        {audioState}
      </div>

      <div className="flex-1 flex justify-center items-center">
        <div className=" w-full h-full" >

          {videoTildId === undefined ? (
            <></>) : (

            <RemoteVideo tileId={videoTildId} className=' rounded relative bg-slate-800 [transform:rotateY(180deg)]' id={`remotevideo-${videoTildId}`} key={videoTildId} />

          )}

          <div className=" flex w-full h-full justify-center items-center @container/imageWrapper">
            <div>
              {!videoEnabled && <Image src={avatar} alt="" className=" max-w-[50px] max-h-[297px] @[300px]/imageWrapper:max-w-[100px] rounded-full m-auto" />}

              {videoEnabled && <h3 className=" font-medium text-cs-grey-50 text-center mt-2">{nameID}</h3>}
            </div>
          </div>
        </div>
      </div>
      <div className={`${videoEnabled ? "absolute right-4 bottom-4 z-10" : "flex justify-end"}`}>
        <div className="p-[6px]"><Image src={dottedLine} alt="" className=" w-4 h-4" /></div>
      </div>
    </div>

  );

}