"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Search, Settings, Plus } from "lucide-react"
import { format, addMonths, subMonths } from "date-fns"
import MobileCalendarGrid from "./MobileCalendarGrid"
import MobileSessionsList from "./MobileSessionsList"
import SettingsModal from "../SettingsModal"
import CreateEventModal from "../CreateEventModal"
import type { Event } from "@/types/calendar"
import LoadingScreen from "@/components/modals/LoadingScreen"
import { listUserMeetings } from "@/services/meetingServices"
import { getCurrentClientData } from "@/services/authService"
import { Video } from "iconsax-react"
import { useRouter } from "next/navigation"

export default function MobileCalendar() {
  const loggedInUser = getCurrentClientData()
  const navigate = useRouter()

  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(direction === "next" ? addMonths(currentDate, 1) : subMonths(currentDate, 1))
  }

  useEffect(() => {
    if (!loggedInUser.token) {
      navigate.push("/")
    } else {
      loadMeetingsFn()
    }
  }, [loggedInUser.token, navigate]) // Added dependencies

  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(new Date())
  }

  // Sample events - replace with your actual events data
  // const events: Event[] = [
  //   {
  //     id: "1",
  //     title: "Session Name goes here",
  //     start_time: new Date(2024, 8, 6, 17, 0),
  //     end_time: new Date(2024, 8, 6, 18, 0),
  //     meeting_id: "123",
  //     meeting_name: "Session Name goes here",
  //     meeting_type: "scheduled",
  //     meeting_link: "",
  //     host_id: "",
  //     privacy: "private",
  //     recording: "no",
  //     timezone: "GMT+1",
  //     duration: 60,
  //     num_attendees: 1,
  //     attendees: [],
  //   },
  //   // Add more events as needed
  // ]

  const loadMeetingsFn = async () => {
    setLoading(true)
    try {
      const data = await listUserMeetings({ email: loggedInUser.clientData.email }, loggedInUser.token)

      if (data?.data.statusCode === 200) {
        const meetings = data?.data.body.data.map((meeting: any) => {
          return {
            ...meeting,
            // id: meeting.meeting_id,
            // title: meeting.meeting_name,
            start_time: new Date(meeting.start_time * 1000),
            end_time: new Date(meeting.end_time * 1000),
            // attendees: meeting.attendees,
            // meetingLink: meeting.meeting_link,
            // meetingType: meeting.meeting_type,
            // privacy: meeting.privacy,
            // hostId: meeting.host_id,
            // recording: meeting.recording,
            // timezone: meeting.timezone,
            // duration: meeting.duration,
            // num_attendees: meeting.num_attendees,
          }
        })
        setEvents(meetings)
        console.log("user meetings response", meetings)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-semibold">Calendar</h1>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full text-purple-600"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-4 mb-4">
        <button
          onClick={goToToday}
          className="px-4 py-2 text-sm font-medium bg-white rounded-full border hover:bg-gray-50"
        >
          Today
        </button>
        <button onClick={() => setIsSettingsOpen(true)} className="p-2 hover:bg-gray-100 rounded-full">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between px-4 mb-4">
        <button onClick={() => navigateMonth("prev")} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-base font-medium">{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={() => navigateMonth("next")} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar Grid */}
      <MobileCalendarGrid
        currentDate={currentDate}
        selectedDate={selectedDate}
        onSelectDate={(date) => {
          setSelectedDate(date)
          setIsCreateModalOpen(true)
        }}
        events={events}
      />

      {/* Sessions List */}
      <div className="px-4 mt-6">
        <h3 className="text-lg font-semibold mb-4">Sessions</h3>
        <MobileSessionsList selectedDate={selectedDate} events={events} />
      </div>

      {/* New Session Button */}
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="h-10 w-[89px] fixed bottom-16 right-6 flex items-center justify-center gap-1 border border-solid border-cs-purple-500 bg-purple-100 text-base text-cs-purple-500 rounded-lg font-semibold shadow-lg"
      >
        <Video size="16" color="#7133cf" className="font-semibold" />
        <span className="mr-2">New</span>
      </button>

      {/* Reuse existing modals */}
      {isSettingsOpen && <SettingsModal open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />}

      {isCreateModalOpen && (
        <CreateEventModal
          initialDate={{
            start: new Date(selectedDate.setHours(new Date().getHours(), new Date().getMinutes())),
            end: new Date(selectedDate.setHours(new Date().getHours() + 1, new Date().getMinutes())),
          }}
          onClose={() => setIsCreateModalOpen(false)}
          use24Hour={false}
        />
      )}
      {loading && <LoadingScreen />}
    </div>
  )
}

