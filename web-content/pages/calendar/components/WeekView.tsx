"use client";

import type { Event } from "../../../types/calendar";
import TimezoneSelect from "./TimezoneSelect";
import TimeSlotPreview from "./TimeSlotPreview";
import { useState, useEffect } from "react";
import { Clock } from "iconsax-react";

interface WeekViewProps {
  currentDate: Date;
  events: Event[];
  onTimeSlotClick: (time: Date) => void;
  use24Hour: boolean;
  defaultTimezone?: string;
}

export default function WeekView({
  currentDate,
  events,
  onTimeSlotClick,
  use24Hour,
  defaultTimezone,
}: WeekViewProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  const shortDays = ["M", "T", "W", "T", "F", "S", "S"];
  const [timezone, setTimezone] = useState("GMT+1");
  const [isMobile, setIsMobile] = useState(false);
  const [previewSlot, setPreviewSlot] = useState<{
    start: Date;
    end: Date;
    dayIndex: number;
    hourIndex: number;
  } | null>(null);

  useEffect(() => {
    if (defaultTimezone) {
      setTimezone(defaultTimezone);
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, [defaultTimezone]);

  const getWeekDates = () => {
    const dates = [];
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay() + 1);

    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();
  const today = new Date();

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const handleTimeSlotClick = (date: Date, hour: number, dayIndex: number) => {
    const newDate = new Date(date);
    newDate.setHours(hour);
    const endDate = new Date(newDate);
    endDate.setHours(hour + 1);

    setPreviewSlot({
      start: newDate,
      end: endDate,
      dayIndex,
      hourIndex: hour,
    });
  };

  const handleCreateClick = (start: Date) => {
    onTimeSlotClick(start);
    setPreviewSlot(null);
  };

  const formatHour = (hour: number) => {
    if (use24Hour) {
      return hour.toString().padStart(2, "0") + ":00";
    } else {
      const period = hour < 12 ? "AM" : "PM";
      const displayHour = hour % 12 || 12;
      return `${displayHour}:00 ${period}`;
    }
  };

  return (
    <div className="flex-1 overflow-hidden pb-32">
      <div className="sticky top-0 z-10 bg-white border-b border-solid border-gray-200">
        <div className="flex items-center">
          <div className="w-12 md:w-20">
            <TimezoneSelect value={timezone} onChange={setTimezone} />
          </div>
          {weekDates.map((date, i) => (
            <div
              key={i}
              className={`flex-1 text-xs text-center py-2 md:py-4
                ${isToday(date) ? "bg-purple-50" : ""} ${
                isToday(date) ? "text-purple-600" : "text-gray-900"
              }`}
            >
              <div className="text-sm font-medium">
                {date.getDate()} {days[i]}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex flex-1">
        <div className="w-12 md:w-20 flex-shrink-0 border-r border-solid border-gray-200">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-16 text-right pr-2 md:pr-4 text-xs md:text-sm text-gray-500 border-b border-solid border-gray-200"
            >
              {formatHour(hour)}
            </div>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-7">
          {weekDates.map((date, dayIndex) => (
            <div
              key={dayIndex}
              className={`border-r border-solid border-gray-200 
                ${isToday(date) ? "bg-purple-50" : ""}`}
            >
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="h-16 border-b border-r border-solid border-gray-200 hover:bg-gray-50 cursor-pointer relative"
                  onClick={() => handleTimeSlotClick(date, hour, dayIndex)}
                >
                  {previewSlot &&
                    previewSlot.dayIndex === dayIndex &&
                    previewSlot.hourIndex === hour && (
                      <TimeSlotPreview
                        start={previewSlot.start}
                        end={previewSlot.end}
                        onClose={() => setPreviewSlot(null)}
                        onCreateClick={() =>
                          handleCreateClick(previewSlot.start)
                        }
                      />
                    )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Events */}
        <div className="absolute inset-0 pointer-events-none">
          {events.map((event) => (
            <div
              key={event.meeting_id}
              className={`absolute border-l-4 border-solid rounded-lg p-1 md:p-2 overflow-hidden ${
                event.cardColor
                  ? event.cardColor
                  : "bg-purple-100 border-[#C99CFF]"
              }`}
              style={{
                left: `calc(${
                  ((event.start_time.getDay() + 6) % 7) * (100 / 7)
                }% + ${isMobile ? "3rem" : "5rem"} - 1px)`,
                top: `${
                  event.start_time.getHours() * 64 +
                  Math.floor((event.start_time.getMinutes() / 60) * 64)
                }px`,
                width: `calc(${100 / 7}% - 8px)`,
                height: `${
                  ((event.end_time.getTime() - event.start_time.getTime()) /
                    (1000 * 60 * 60)) *
                  64
                }px`,
              }}
            >
              <div className="text-xs md:text-sm font-semibold text-cs-purple-650 truncate">
                {event.meeting_name}
              </div>
              <div className="items-center gap-1 text-xs text-purple-700 hidden md:flex">
                <Clock size="16" color="#7e22ce" />{" "}
                {event.start_time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: !use24Hour,
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
