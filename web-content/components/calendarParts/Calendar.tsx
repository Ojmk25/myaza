"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Settings } from "lucide-react";
import type { Event, User } from "../../types/calendar";
import Sidebar from "./Sidebar";
import WeekView from "./WeekView";
import DayView from "./DayView";
import CreateEventModal from "./CreateEventModal";
import MobileNav from "./MobileNav";
import MonthView from "./MonthView";
import YearView from "./YearView";
import FloatingActionButton from "./FloatingActionButton";
import SettingsModal from "./SettingsModal";
import {
  createInstantMeeting,
  getCalendarSettings,
  listUserMeetings,
} from "@/services/meetingServices";
import { extractAfterLastSlashOrFull } from "@/utils/Validators";
import { useRouter } from "next/router";
import { Add, Calendar as CalendarIcon } from "iconsax-react";
import { getCurrentClientData } from "@/services/authService";
import LoadingScreen from "@/components/modals/LoadingScreen";

type CalendarView = "day" | "week" | "month" | "year";

// Default events
// const defaultEvents: Event[] = [
//   {
//     id: "meeting_cb3ca374",
//     title: "Test",
//     start: new Date(1740643860 * 1000),
//     end: new Date(1740649440 * 1000),
//     attendees: [
//       { id: "1", email: "jonathanadebola@gmail.com", name: "Jonathan Adebola" },
//     ],
//     meetingLink: "dev.cecurestream.com/meet/cb3ca374",
//     meetingType: "scheduled",
//     privacy: "private",
//     hostId: "user_f55aa7df-c97d-46db-98e1-880252ff060b",
//     recording: "no",
//     timezone: "Africa/Lagos",
//     duration: 5580,
//     num_attendees: 1,
//   },
//   {
//     id: "meeting_927db01f",
//     title: "Test Meeting",
//     start: new Date(1740654000 * 1000),
//     end: new Date(1740661200 * 1000),
//     attendees: [
//       { id: "1", email: "jonathanadebola@gmail.com", name: "Jonathan Adebola" },
//     ],
//     meetingLink: "dev.cecurestream.com/meet/927db01f",
//     meetingType: "scheduled",
//     privacy: "private",
//     hostId: "user_f55aa7df-c97d-46db-98e1-880252ff060b",
//     recording: "no",
//     timezone: "Africa/Lagos",
//     duration: 7200,
//     num_attendees: 1,
//   },
//   {
//     id: "meeting_fc8dd30a",
//     title: "Test Meeting",
//     start: new Date(1740649080 * 1000),
//     end: new Date(1740652920 * 1000),
//     attendees: [
//       { id: "1", email: "jonathanadebola@gmail.com", name: "Jonathan Adebola" },
//     ],
//     meetingLink: "dev.cecurestream.com/meet/fc8dd30a",
//     meetingType: "scheduled",
//     privacy: "private",
//     hostId: "user_f55aa7df-c97d-46db-98e1-880252ff060b",
//     recording: "no",
//     timezone: "Africa/Lagos",
//     duration: 3840,
//     num_attendees: 1,
//   },
// ];

// Calendar settings from API
const calendarSettings = {
  language: "en-GB",
  country: "NG",
  use24Hour: false,
  timezone: "GMT+1",
  videoEnabled: true,
  soundEnabled: true,
};

export default function Calendar() {
  const loggedInUser = getCurrentClientData();
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadMeetings, setLoadMeetings] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Set to Monday of the current week
    return startOfWeek;
  });
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const [view, setView] = useState<CalendarView>("week");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [initialAttendees, setInitialAttendees] = useState<User[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState(calendarSettings);

  useEffect(() => {
    // API cal for fetching user meetings
    loadMeetingsFn();
    // API call for fetching calendar settings
    fetchCalendarSettings();
  }, []);

  const handleTimeSlotClick = (start: Date) => {
    const end = new Date(start);
    end.setHours(end.getHours() + 1);
    setSelectedTimeSlot({ start, end });
    setSelectedEvent(null);
    setInitialAttendees([]);
    setIsModalOpen(true);
  };

  const handleCreateEvent = (event: Event) => {
    setEvents([...events, event]);
    setIsModalOpen(false);
    setSelectedTimeSlot(null);
    setSelectedEvent(null);
    setInitialAttendees([]);
  };

  const handleEditEvent = (updatedEvent: Event) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setIsModalOpen(false);
    setSelectedEvent(null);
    setInitialAttendees([]);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const navigateCalendar = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    switch (view) {
      case "day":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
        break;
      case "week":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
        break;
      case "month":
        newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
        break;
      case "year":
        newDate.setFullYear(
          newDate.getFullYear() + (direction === "next" ? 1 : -1)
        );
        break;
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleViewChange = (newView: CalendarView) => {
    setView(newView);
  };

  const handleCreateMeeting = (attendees: User[]) => {
    setInitialAttendees(attendees);
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const startInstantMeetingFn = async () => {
    setLoading(true);
    try {
      const data = await createInstantMeeting({});

      if (data?.data.body && data?.data.body.status === "Success") {
        const extractedLink = extractAfterLastSlashOrFull(
          data?.data?.body?.data?.meeting_link
        );
        navigate.push(`/meet/${extractedLink}`);
      }

      // setInstantMeeting(data?.data.body.data.MeetingDetails.MeetingId as string, data?.data.body.data)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMeetingsFn = async () => {
    setLoadMeetings(true);
    try {
      const data = await listUserMeetings(
        { email: loggedInUser.clientData.email },
        loggedInUser.token
      );

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
          };
        });
        setEvents(meetings);
        console.log("user meetings response", meetings);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadMeetings(false);
    }
  };

  const fetchCalendarSettings = async () => {
    setLoadMeetings(true);
    // Fetch settings from your API
    
    try {
      const data = await getCalendarSettings({}, loggedInUser.token);
      console.log("calendar settings", data?.data.body.data);
      
      if (data?.data.statusCode === 200) {
        setSettings(data?.data.body.data);
      }
    } catch (error) {
      console.error(error);
    }finally{
      setLoadMeetings(false);
    }
  };
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <div className="w-80 flex-shrink-0 h-screen overflow-y-auto">
        <Sidebar
          onCreateSession={() => {
            setSelectedTimeSlot(null);
            setSelectedEvent(null);
            setInitialAttendees([]);
            setIsModalOpen(true);
          }}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          events={events}
          setEvents={setEvents}
          onEditEvent={(event) => {
            setSelectedEvent(event);
            setIsModalOpen(true);
          }}
          onDeleteEvent={handleDeleteEvent}
          onCreateMeeting={handleCreateMeeting}
        />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <MobileNav
          onOpenSidebar={() => setIsSidebarOpen(true)}
          currentDate={currentDate}
          onNavigate={navigateCalendar}
        />
        <div className="w-full h-[56px] flex justify-between items-center px-6 py-6">
          <h1 className="text-3xl font-semibold text-cs-black-200">Calendar</h1>
          <div className={`flex relative group z-50`}>
            <button
              disabled={loading}
              className="w-full h-12 md:w-[200px] text-cs-grey-50 bg-cs-purple-650 rounded-md py-2 px-4 font-bold max-h-[52px]"
            >
              {loading ? "Loading..." : "Create New Session"}
            </button>
            <div className="w-full absolute hidden group-hover:block top-12 shadow-2xl rounded-lg z-10 bg-white">
              <div
                className=" flex py-3 md:py-4 px-3 gap-x-2 hover:bg-cs-grey-55 rounded-t-lg cursor-pointer"
                onClick={startInstantMeetingFn}
              >
                <Add size={20} />
                <button className=" text-cs-grey-dark">Instant meeting</button>
              </div>
              <div
                className=" flex py-4 px-3 gap-x-2 hover:bg-cs-grey-55 rounded-b-lg cursor-pointer"
                onClick={() => {
                  setSelectedTimeSlot(null);
                  setSelectedEvent(null);
                  setInitialAttendees([]);
                  setIsModalOpen(true);
                }}
              >
                <CalendarIcon size={20} />
                <button className=" text-cs-grey-dark">
                  Schedule for later
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div
            style={{
              border: "1px solid #EAECF0",
            }}
            className="bg-white border border-[#EAECF0] rounded-xl shadow-sm"
          >
            <header className="sticky top-0 z-10 bg-white hidden md:flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <button
                  className="w-[76px] h-9 flex items-center justify-center text-sm font-semibold text-[#344054] hover:bg-gray-100 rounded-lg border border-[#CACACA]"
                  onClick={goToToday}
                >
                  Today
                </button>
                <div
                  style={{
                    border: "1px solid #CACACA",
                  }}
                  className="w-[72px] h-9 bg-white flex items-center justify-between border border-[#CACACA] rounded-lg"
                >
                  <button
                    className="w-1/2 h-full border-r flex items-center justify-center hover:bg-gray-100 hover:rounded-l-lg"
                    onClick={() => navigateCalendar("prev")}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    className="w-1/2 h-full flex items-center justify-center hover:bg-gray-100 hover:rounded-r-lg"
                    onClick={() => navigateCalendar("next")}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <h2 className="text-lg font-medium text-cs-grey-dark ">
                {currentDate.toLocaleString(settings.language, {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <div className="flex items-center space-x-4">
                <select
                  className="px-4 py-2 bg-white text-xs text-gray-900 font-semibold rounded-lg border border-[#CACACA] hover:bg-gray-100 focus:ring-0 focus:outline-none"
                  value={view}
                  onChange={(e) =>
                    handleViewChange(e.target.value as CalendarView)
                  }
                >
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                  {/* <option value="year">Year</option> */}
                </select>

                <button
                  className="p-2 hover:bg-gray-100 rounded-full"
                  onClick={() => setIsSettingsOpen(true)}
                >
                  <Settings className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto">
              {view === "day" && (
                <DayView
                  currentDate={currentDate}
                  events={events}
                  onTimeSlotClick={handleTimeSlotClick}
                  use24Hour={settings.use24Hour}
                  defaultTimezone={settings.timezone}
                />
              )}
              {view === "week" && (
                <WeekView
                  currentDate={currentDate}
                  events={events}
                  onTimeSlotClick={handleTimeSlotClick}
                  use24Hour={settings.use24Hour}
                  defaultTimezone={settings.timezone}
                />
              )}
              {view === "month" && (
                <MonthView
                  currentDate={currentDate}
                  events={events}
                  onTimeSlotClick={handleTimeSlotClick}
                />
              )}
              {view === "year" && (
                <YearView
                  currentDate={currentDate}
                  events={events}
                  onTimeSlotClick={handleTimeSlotClick}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <FloatingActionButton
        onClick={() => {
          setSelectedTimeSlot(null);
          setSelectedEvent(null);
          setInitialAttendees([]);
          setIsModalOpen(true);
        }}
      />
      {isModalOpen && (
        <CreateEventModal
          initialDate={selectedTimeSlot}
          event={selectedEvent}
          initialAttendees={initialAttendees}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEvent(null);
            setInitialAttendees([]);
          }}
          // onCreate={handleCreateEvent}
          // onEdit={handleEditEvent}
          use24Hour={settings.use24Hour}
        />
      )}
      <SettingsModal
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        defaultSettings={settings}
        // onSettingsChange={setSettings}
      />
      {loading || (loadMeetings && <LoadingScreen />)}
    </div>
  );
}
