import Image from "next/image";
import closeIconPurple from "@/public/assets/images/closeIconPurple.svg";
import { Add, Copy } from "iconsax-react";
import { useAppContext } from "@/context/StoreContext";

const Conference = ({
  sideViewFunc,
  uuid,
  handleCopyClick,
  tooltipMessage,
}: {
  sideViewFunc: (value: string) => void;
  uuid: string;
  handleCopyClick: () => Promise<void>;
  tooltipMessage: string;
}) => {
  const { appState } = useAppContext();
  return (
    <div className=" flex-6 bg-cs-grey-50 border-solid border border-[#F1F1F1] rounded-[4px] px-4 pt-5 h-full">
      <div className=" flex justify-between items-center">
        <h3 className=" text-cs-grey-dark font-medium @[300px]/bigScreenSideCards:text-2xl">
          Conference Info
        </h3>
        <Image
          src={closeIconPurple}
          alt="profile"
          onClick={() => sideViewFunc("")}
          className=" cursor-pointer w-5 @[300px]/bigScreenSideCards:w-6"
        />
      </div>
      <div className=" relative mt-7 mb-5">
        <h3 className=" text-cs-grey-dark font-medium @[300px]/bigScreenSideCards:text-xl">
          [{appState.sessionState.sessionName}]
        </h3>
        <p className=" text-xs @[300px]/bigScreenSideCards:text-sm text-cs-black-200 font-normal mb-4 mt-6">
          Invite others to join by copying the meting link and sharing it:{" "}
        </p>
      </div>
      <div className=" relative mt-7 mb-5">
        <input
          type="text"
          name=""
          id=""
          className=" w-full border border-[#F1F1F1] h-10 @[300px]/bigScreenSideCards:h-12 rounded-[10px] outline-none px-4 placeholder:text-sm placeholder:font-normal placeholder:text-cs-black-200"
          placeholder={uuid}
        />
        <Copy
          size="18"
          color="#5E29B7"
          className=" absolute top-[14px] right-[14px] cursor-pointer"
          onClick={handleCopyClick}
        />
        {tooltipMessage && (
          <div className=" absolute text-xs text-cs-grey-50 p-2 bg-cs-purple-650 z-10 rounded">
            {tooltipMessage}
          </div>
        )}
      </div>

      {/* <button className="flex items-center text-cs-purple-650 font-bold py-2 px-3 @[300px]/bigScreenSideCards:py-3 @[300px]/bigScreenSideCards:px-4 border border-cs-purple-650 rounded-lg max-h-[52px]">
        <Add size="18" color="#5E29B7" /> Add participants
      </button> */}
    </div>
  );
};

export default Conference;
