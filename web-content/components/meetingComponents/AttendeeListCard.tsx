import { getRemoteInitials } from "@/utils/meetingFunctions";
import RaisedHand from "./RaisedHand";
import { useAppContext } from "@/context/StoreContext";
import Image from "next/image";

export const AttendeeListCard = ({
  attendeeId,
  externalID,
  audioState,
}: {
  attendeeId: string;
  externalID: any;
  audioState: JSX.Element;
}) => {
  const { appState } = useAppContext();
  const { meetingAttendees } = appState.sessionState;
  const attendeeDetailItems = meetingAttendees.find(
    (att) => att.user_id === externalID
  );

  return (
    <div className=" flex justify-between items-center py-3 border-b border-solid border-b-[#EFEDED]">
      <div className=" flex items-center gap-x-2 overflow-hidden max-w-full whitespace-nowrap">
        {attendeeDetailItems?.picture && attendeeDetailItems?.picture !== "" ? (
          <Image
            src={attendeeDetailItems.picture}
            alt={attendeeDetailItems.full_name}
            width={32}
            height={32}
            className=" rounded-full w-8 h-8 min-w-8 object-cover"
          />
        ) : (
          <div className=" bg-cs-grey-800 w-[30px] h-[30px] min-w-[30px] rounded-full flex justify-center items-center text-cs-grey-50 uppercase">
            {getRemoteInitials(attendeeDetailItems?.full_name as string)}
          </div>
        )}

        <h4 className=" text-cs-grey-dark font-medium text-sm overflow-hidden text-ellipsis capitalize">
          {externalID && (attendeeDetailItems?.full_name as string)}
        </h4>
      </div>
      <div className=" flex items-center gap-x-1">
        <RaisedHand attendeeId={attendeeId} noBackground />
        {audioState}
      </div>
    </div>
  );
};
