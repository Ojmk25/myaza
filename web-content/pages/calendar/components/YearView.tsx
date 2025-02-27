import type { Event } from "../types/calendar"
import TimeSlotPreview from "./TimeSlotPreview"
import { useState } from "react"

interface YearViewProps {
  currentDate: Date
  events: Event[]
  onTimeSlotClick: (time: Date) => void
}

export default function YearView({ currentDate, events, onTimeSlotClick }: YearViewProps) {
  const [previewSlot, setPreviewSlot] = useState<{
    start: Date
    end: Date
    monthIndex: number
    dayIndex: number
  } | null>(null)

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const handleDayClick = (year: number, month: number, day: number, monthIndex: number, dayIndex: number) => {
    const startDate = new Date(year, month, day, 9, 0, 0) // Set default start time to 9:00 AM
    const endDate = new Date(startDate)
    endDate.setHours(10, 0, 0, 0) // Set default end time to 10:00 AM

    setPreviewSlot({
      start: startDate,
      end: endDate,
      monthIndex,
      dayIndex,
    })
  }

  const handleCreateClick = (start: Date) => {
    onTimeSlotClick(start)
    setPreviewSlot(null)
  }

  return (
    <div className="flex-1 overflow-hidden p-4 pb-32">
      <div className="grid grid-cols-3 gap-4">
        {months.map((month, monthIndex) => (
          <div key={month} className="border rounded-lg p-2">
            <h3 className="text-center font-semibold mb-2">{month}</h3>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                <div key={day} className="text-center font-semibold text-gray-500">
                  {day}
                </div>
              ))}
              {Array.from({ length: getDaysInMonth(currentDate.getFullYear(), monthIndex) }).map((_, dayIndex) => {
                const date = new Date(currentDate.getFullYear(), monthIndex, dayIndex + 1)
                const hasEvents = events.some(
                  (event) =>
                    event.start_time.toDateString() === date.toDateString() ||
                    event.end_time.toDateString() === date.toDateString(),
                )
                return (
                  <div
                    key={dayIndex}
                    className={`text-center p-1 ${hasEvents ? "bg-purple-100 rounded" : ""} relative`}
                    onClick={() =>
                      handleDayClick(currentDate.getFullYear(), monthIndex, dayIndex + 1, monthIndex, dayIndex)
                    }
                  >
                    {dayIndex + 1}
                    {previewSlot && previewSlot.monthIndex === monthIndex && previewSlot.dayIndex === dayIndex && (
                      <TimeSlotPreview
                        start={previewSlot.start}
                        end={previewSlot.end}
                        onClose={() => setPreviewSlot(null)}
                        onCreateClick={() => handleCreateClick(previewSlot.start)}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
