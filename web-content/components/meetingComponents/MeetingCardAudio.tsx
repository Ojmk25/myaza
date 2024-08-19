import { MicrophoneSlash1 } from "iconsax-react";
import { useAppContext } from "@/context/StoreContext";

export const VisualizerComp = ({
  attendeeId,
  noBackground,
}: {
  attendeeId: string;
  noBackground?: boolean;
}) => {
  const { appState } = useAppContext();
  const extractedAudioState = appState.sessionState.audioState.find(
    (audio) => audio.attendeeId === attendeeId
  );
  const visualizerStyle = (factor: number) => {
    if (!extractedAudioState) return;
    return {
      height: `${Math.max(3, extractedAudioState?.volume * factor)}px`,
      width: "4px",
    };
  };

  const audioVisualizer = (
    <>
      {extractedAudioState?.mute ? (
        <div
          className={`flex justify-center items-end p-[6px] ${
            noBackground ? " bg-transparent" : "bg-[#333333]"
          } rounded-full  w-[30px] h-[30px]`}
        >
          <MicrophoneSlash1
            size="18"
            color={noBackground ? "#5E29B7" : "#FAFAFA"}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center p-[6px] bg-[#6c3ec2] rounded-full  w-[30px] h-[30px] gap-x-[2px]">
          <div style={visualizerStyle(6)} className="bg-cs-grey-50"></div>
          <div style={visualizerStyle(15)} className="bg-cs-grey-50"></div>
          <div style={visualizerStyle(25)} className="bg-cs-grey-50"></div>
          <div style={visualizerStyle(15)} className="bg-cs-grey-50"></div>
          <div style={visualizerStyle(6)} className="bg-cs-grey-50"></div>
        </div>
      )}
    </>
  );

  return <div>{audioVisualizer}</div>;
};
