import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
  isToday,
} from "date-fns"
import type { Event } from "@/types/calendar"

interface MobileCalendarGridProps {
  currentDate: Date
  selectedDate: Date
  onSelectDate: (date: Date) => void
  events: Event[]
}

export default function MobileCalendarGrid({
  currentDate,
  selectedDate,
  onSelectDate,
  events,
}: MobileCalendarGridProps) {
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(monthStart)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 })
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const hasEvents = (date: Date) => {
    return events.some((event) => isSameDay(event.start_time, date))
  }

  return (
    <div className="px-4">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {["Mo", "Tu", "We", "Th", "Fr", "Sat", "Su"].map((day) => (
          <div key={day} className="text-center text-sm text-gray-600">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-y-2">
        {days.map((day) => {
          const isSelected = isSameDay(day, selectedDate)
          const isCurrentMonth = day.getMonth() === currentDate.getMonth()
          const hasEventDot = hasEvents(day)

          return (
            <button
              key={day.toISOString()}
              onClick={() => onSelectDate(day)}
              className={`
                relative flex items-center justify-center h-10 w-10 mx-auto rounded-full
                ${isSelected ? "bg-purple-600 text-white" : ""}
                ${!isCurrentMonth ? "text-gray-400" : ""}
                ${isToday(day) && !isSelected ? "bg-purple-100 text-purple-600" : ""}
              `}
            >
              <span>{format(day, "d")}</span>
              {hasEventDot && !isSelected && <div className="absolute bottom-1 w-1 h-1 bg-purple-600 rounded-full" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

