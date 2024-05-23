import Image from "next/image"
import avatar from "@/public/assets/images/avatar.png"
import activeVoice from '@/public/assets/images/activeVoice.svg'
import { useAttendeeStatus } from "amazon-chime-sdk-component-library-react";
import { MicrophoneSlash1 } from "iconsax-react";


export const AttendeeListCard = ({ attendeeId }: { attendeeId: string }) => {
  const { videoEnabled, sharingContent, muted } = useAttendeeStatus(attendeeId);

  return (
    <div className=" flex justify-between items-center py-3 border-b border-solid border-b-[#EFEDED]">
      <div className=" flex items-center gap-x-2 overflow-hidden max-w-full whitespace-nowrap">
        <Image src={avatar} alt="profile" className=" rounded-full w-6 h-6 object-cover" />
        <h4 className=" text-cs-grey-dark font-medium text-sm overflow-hidden text-ellipsis">{attendeeId}</h4>
      </div>
      <div>
        {muted ? (<MicrophoneSlash1 size="18" color="#5E29B7" />) : (<Image src={activeVoice} alt="profile" />)}
      </div>
    </div>
  )
}