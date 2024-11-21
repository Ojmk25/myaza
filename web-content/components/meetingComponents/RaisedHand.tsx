"use client";
import { useAppContext } from "@/context/StoreContext";
import Image from "next/image";
import raisedHandWhite from "@/public/assets/images/raisedHandWhite.svg";
import raisedHandPurple from "@/public/assets/images/raisedHand.svg";

const RaisedHand = ({
  attendeeId,
  noBackground,
  externalId,
}: {
  attendeeId: any;
  noBackground?: boolean;
  externalId: any;
}) => {
  const { appState } = useAppContext();

  const raisedHandEntry = appState.sessionState.raisedHand.filter(
    (item) => item.externalUserID === externalId
  );

  return (
    <>
      {raisedHandEntry.length > 0 && (
        <div
          className={` rounded-md w-fit mx-auto ${
            noBackground ? "" : "bg-[#5E29B7] p-2"
          }`}
        >
          <Image
            src={noBackground ? raisedHandPurple : raisedHandWhite}
            alt="raised-hand"
            width={16}
            height={16}
            className="min-w-4 max-w-4"
          />
        </div>
      )}
    </>
  );
};

export default RaisedHand;
