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

  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center z-10">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-[192px]">
        <div className="flex justify-between items-center mb-3">
          {/* <div className="text-sm text-gray-600">
            {formatTime(start)} - {formatTime(end)}
          </div> */}
          <div className="items-center gap-1 text-xs text-purple-700 hidden md:flex">
            <Clock size="16" color="#7e22ce" /> {formatTime(start)} -{" "}
            {formatTime(end)}
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
          className="ml-6 w-[103px] h-8 bg-cs-purple-650 text-[#F9FAFC] text-xs font-semibold rounded-lg hover:bg-purple-700 transition-colors"
        >
          Create Session
        </button>
      </div>
    </div>
  );
}
