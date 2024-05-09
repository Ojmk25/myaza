'use client'

import { Video, VideoSlash } from "iconsax-react"
import { useState } from "react";

export const ToggleVideoButton = ({ toggleVideo }: { toggleVideo: () => {} }) => {

  const [video, setVideo] = useState(true)
  const handleClick = () => {
    setVideo(!video)
    toggleVideo()
  }

  return (
    <>
      <div className="text-center cursor-pointer" onClick={handleClick}>
        <div className={`p-2 md:p-3 ${video ? "bg-cs-purple-650" : "bg-[#E1C6FF4D]"} rounded-md max-w-12 mx-auto`}>
          {video ? (
            <Video size="24" color="#FAFAFA" className="mx-auto" />
          ) : (
            <VideoSlash size="24" color="#5E29B7" className="mx-auto" />
          )}

        </div>
        <h6 className=" text-cs-grey-100 font-medium text-xs">Video</h6>
      </div>
    </>
  )
}