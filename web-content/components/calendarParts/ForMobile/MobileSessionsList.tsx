import { format, isSameDay } from "date-fns"
import { Calendar } from "lucide-react"
import type { Event } from "@/types/calendar"

interface MobileSessionsListProps {
  selectedDate: Date
  events: Event[]
}

export default function MobileSessionsList({ selectedDate, events }: MobileSessionsListProps) {
  const filteredEvents = events.filter((event) => isSameDay(event.start_time, selectedDate))

  if (filteredEvents.length === 0) {
    return <div className="text-center text-gray-500 py-8">No sessions scheduled for this day</div>
  }

  return (
    <div className="space-y-4">
      {filteredEvents.map((event) => (
        <div key={event.meeting_id} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{event.meeting_name}</h4>
            <p className="text-sm text-gray-600">{format(event.start_time, "EEE, h:mm aaa")}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

