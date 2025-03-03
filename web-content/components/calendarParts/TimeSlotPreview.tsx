import { Clock } from "iconsax-react";
import { X } from "lucide-react";

interface TimeSlotPreviewProps {
  start: Date;
  end: Date;
  onClose: () => void;
  onCreateClick: () => void;
}

export default function TimeSlotPreview({
  start,
  end,
  onClose,
  onCreateClick,
}: TimeSlotPreviewProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  const isPastTime = new Date() > start;

  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center z-10">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-[192px]">
        <div className="flex justify-between items-center mb-3">
          {/* <div className="text-sm text-gray-600">
            {formatTime(start)} - {formatTime(end)}
          </div> */}
          <div
            className={`items-center gap-1 text-xs ${
              isPastTime ? "text-cs-grey-800" : "text-purple-700"
            }  hidden md:flex`}
          >
            {isPastTime ? (
              "TIme has passed"
            ) : (
              <>
                <Clock size="16" color="#7e22ce" /> {formatTime(start)} -{" "}
                {formatTime(end)}
              </>
            )}
          </div>
          <button
            onClick={() => {
              console.log("Close button clicked", start, end);

              setTimeout(() => {
                onClose();
              }, 100);
            }}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => {
            onCreateClick();
            onClose();
          }}
          className={` h-8 ${
            isPastTime
              ? "bg-white text-cs-purple-650 border-b border-solid border-cs-purple-650"
              : "w-[103px] ml-6 bg-cs-purple-650 text-[#F9FAFC] hover:bg-purple-700 rounded-lg"
          }  text-xs font-semibold transition-colors`}
        >
          {isPastTime ? "Still create session?" : "Create Session"}
        </button>
      </div>
    </div>
  );
}
