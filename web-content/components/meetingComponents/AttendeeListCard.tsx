import { getRemoteInitials, processString } from "@/utils/meetingFunctions";
import RaisedHand from "./RaisedHand";

export const AttendeeListCard = ({
  attendeeId,
  externalID,
  audioState,
}: {
  attendeeId: string;
  externalID: any;
  audioState: JSX.Element;
}) => {
  return (
    <div className=" flex justify-between items-center py-3 border-b border-solid border-b-[#EFEDED]">
      <div className=" flex items-center gap-x-2 overflow-hidden max-w-full whitespace-nowrap">
        {/* <Image src={avatar} alt="profile" className=" rounded-full w-8 h-8 object-cover" /> */}
        <div className=" bg-cs-grey-800 w-[30px] h-[30px] min-w-[30px] rounded-full flex justify-center items-center text-cs-grey-50 uppercase">
          {getRemoteInitials(processString(externalID))}
        </div>
        <h4 className=" text-cs-grey-dark font-medium text-sm overflow-hidden text-ellipsis capitalize">
          {externalID && processString(externalID)}
        </h4>
      </div>
      <div className=" flex items-center gap-x-1">
        <RaisedHand attendeeId={attendeeId} />
        {audioState}
      </div>
    </div>
  );
};
