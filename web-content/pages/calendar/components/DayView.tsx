"use client";

import type { Event } from "../types/calendar";
import TimezoneSelect from "./TimezoneSelect";
import TimeSlotPreview from "./TimeSlotPreview";
import { useEffect, useState } from "react";
import { Clock } from "iconsax-react";

interface DayViewProps {
  currentDate: Date;
  events: Event[];
  onTimeSlotClick: (time: Date) => void;
  use24Hour: boolean;
  defaultTimezone?: string;
}

export default function DayView({
  currentDate,
  events,
  onTimeSlotClick,
  use24Hour,
  defaultTimezone,
}: DayViewProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const [timezone, setTimezone] = useState("GMT+1");
  const [previewSlot, setPreviewSlot] = useState<{
    start: Date;
    end: Date;
    hourIndex: number;
  } | null>(null);

  useEffect(() => {
    if (defaultTimezone) {
      setTimezone(defaultTimezone);
    }
  }, [defaultTimezone]);

  const getDayEvents = () => {
    return events.filter(
      (event) => event.start_time.toDateString() === currentDate.toDateString()
    );
  };

  const handleTimeSlotClick = (hour: number) => {
    const date = new Date(currentDate);
    date.setHours(hour);
    const endDate = new Date(date);
    endDate.setHours(hour + 1);

    setPreviewSlot({
      start: date,
      end: endDate,
      hourIndex: hour,
    });
  };

  const handleCreateClick = (start: Date) => {
    onTimeSlotClick(start);
    setPreviewSlot(null);
  };

  const formatHour = (hour: number): string => {
    if (use24Hour) {
      return `${hour.toString().padStart(2, "0")}:00`;
    } else {
      const period = hour < 12 ? "AM" : "PM";
      const displayHour = hour % 12 || 12;
      return `${displayHour}:00 ${period}`;
    }
  };

  return (
    <div className="flex-1 overflow-hidden pb-32">
      <div className="sticky top-0 z-20 bg-white border-b border-solid border-gray-200">
        <div className="flex items-center">
          <div className="w-20">
            <TimezoneSelect value={timezone} onChange={setTimezone} />
          </div>
          <div className="flex-1 p-4">
            <h2 className="text-xs text-[#812DEE] font-medium">
              {currentDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </h2>
          </div>
        </div>
      </div>

      <div className="relative flex flex-1">
        <div className="w-20 flex-shrink-0 border-r border-solid border-gray-200">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-16 text-right pr-4 text-sm text-gray-500 border-b border-solid border-gray-200"
            >
              {formatHour(hour)}
            </div>
          ))}
        </div>

        <div className="flex-1 relative">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-16 border-b border-solid border-gray-200 hover:bg-gray-50 cursor-pointer relative"
              onClick={() => handleTimeSlotClick(hour)}
            >
              {previewSlot && previewSlot.hourIndex === hour && (
                <TimeSlotPreview
                  start={previewSlot.start}
                  end={previewSlot.end}
                  onClose={() => setPreviewSlot(null)}
                  onCreateClick={() => handleCreateClick(previewSlot.start)}
                />
              )}
            </div>
          ))}

          {/* Events */}
          {getDayEvents().map((event) => (
            <div
              key={event.meeting_id}
              className={`absolute border-l-4 border-solid rounded-lg p-2 overflow-hidden ml-2  ${
                event.cardColor
                  ? event.cardColor
                  : "bg-purple-100 border-purple-300"
              }`}
              style={{
                top: `${
                  event.start_time.getHours() * 64 +
                  Math.floor((event.start_time.getMinutes() / 60) * 64)
                }px`,
                height: `${
                  ((event.end_time.getTime() - event.start_time.getTime()) /
                    (1000 * 60 * 60)) *
                  64
                }px`,
                left: "0",
                right: "1rem",
              }}
            >
              <div className="text-sm font-semibold text-cs-purple-650">
                {event.meeting_name}
              </div>
              <div className="flex items-center gap-1 text-xs text-purple-700">
                <Clock size="16" color="#7e22ce" />{" "}
                <span>
                  {event.start_time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: !use24Hour,
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
