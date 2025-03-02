import { Clock } from "iconsax-react";
import type { Event } from "../../../types/calendar";
import TimeSlotPreview from "./TimeSlotPreview";
import { useState } from "react";

interface MonthViewProps {
  currentDate: Date;
  events: Event[];
  onTimeSlotClick: (time: Date) => void;
}

export default function MonthView({
  currentDate,
  events,
  onTimeSlotClick,
}: MonthViewProps) {
  const [previewSlot, setPreviewSlot] = useState<{
    start: Date;
    end: Date;
    dayIndex: number;
  } | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];
    // Add days from previous month
    const firstDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    for (let i = firstDayOfWeek; i > 0; i--) {
      const date = new Date(year, month, -i + 1);
      days.push({ date, isPreviousMonth: true });
    }

    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isPreviousMonth: false });
    }

    // Add days from next month
    const remainingDays = 42 - days.length; // Always show 6 weeks
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isPreviousMonth: true });
    }

    return days;
  };

  const formatEventTime = (date: Date) => {
    return date
      .toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) => event.start_time.toDateString() === date.toDateString()
    );
  };

  const isToday = (date: Date) => {
    return date.toDateString() === new Date().toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === currentDate.toDateString();
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const handleDayClick = (date: Date, dayIndex: number) => {
    const startDate = new Date(date);
    startDate.setHours(9, 0, 0, 0); // Set default start time to 9:00 AM
    const endDate = new Date(startDate);
    endDate.setHours(10, 0, 0, 0); // Set default end time to 10:00 AM

    setPreviewSlot({
      start: startDate,
      end: endDate,
      dayIndex,
    });
  };

  const handleCreateClick = (start: Date) => {
    onTimeSlotClick(start);
    setPreviewSlot(null);
  };

  return (
    <div className="flex-1 overflow-hidden p-4 pb-32">
      <div className={`grid grid-cols-7 gap-px bg-gray-200`}>
        {/* Week day headers */}
        {weekDays.map((day) => (
          <div
            key={day}
            className="bg-white p-2 text-center text-sm font-medium text-gray-600"
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map(({ date, isPreviousMonth }, index) => (
          <div
            key={index}
            className={`min-h-[120px] ${isToday(date) ? "bg-purple-100 text-white" : "bg-white"} p-2 ${
              isPreviousMonth ? "text-gray-400" : "text-gray-900"
            } ${isSelected(date) ? "bg-purple-100" : ""}`}
            onClick={() => handleDayClick(date, index)}
          >
            <div
              className={`inline-flex items-center justify-center w-7 h-7 rounded-full
                ${isToday(date) ? "bg-purple-600 text-white" : ""}
                `}
            >
              {date.getDate()}
            </div>
            <div className="space-y-1 mt-1">
              {getEventsForDate(date).map((event, eventIndex) => (
                <div
                  key={eventIndex}
                  className="text-xs font-semibold text-cs-purple-650 truncate"
                >
                  <span className="text-sm font-semibold text-cs-purple-650">{event.meeting_name}</span>
                  <div className="items-center gap-1 text-xs text-purple-700 hidden md:flex">
                    <Clock size="16" color="#7e22ce" />{" "}
                    {formatEventTime(event.start_time)} -{" "}
                    {formatEventTime(event.end_time)}
                  </div>
                </div>
              ))}
            </div>
            {previewSlot && previewSlot.dayIndex === index && (
              <TimeSlotPreview
                start={previewSlot.start}
                end={previewSlot.end}
                onClose={() => setPreviewSlot(null)}
                onCreateClick={() => handleCreateClick(previewSlot.start)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
