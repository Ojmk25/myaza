"use client";

import type React from "react";

import { ChevronDown, Search, Plus, X } from "lucide-react";
import type { Event, User } from "../../../types/calendar";
import { useEffect, useState, useRef, SetStateAction, Dispatch } from "react";
import { AddSquare, Calendar, Clock, Edit, Trash } from "iconsax-react";
import { getColorForUser } from "@/utils/colors";
import { listUserMeetings } from "@/services/meetingServices";
import { getCurrentClientData } from "@/services/authService";

interface SidebarProps {
  onCreateSession: () => void;
  isOpen: boolean;
  onClose: () => void;
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
  onEditEvent?: (event: Event) => void;
  onDeleteEvent?: (eventId: string) => void;
  onCreateMeeting: (attendees: User[]) => void;
}

function useCountdown(targetDate: Date | null) {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const timerId = useRef<number | null>(null);

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft(null);
      return;
    }

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft("Starting now");
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      if (hours > 0) {
        setTimeLeft(`Starts in ${hours}h ${minutes}m`);
      } else if (minutes > 0) {
        setTimeLeft(`Starts in ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(`Starts in ${seconds}s`);
      }
    };

    calculateTimeLeft();
    timerId.current = window.setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, [targetDate]);

  return timeLeft;
}

export default function Sidebar({
  onCreateSession,
  isOpen,
  onClose,
  events,
  setEvents,
  onEditEvent,
  onDeleteEvent,
  onCreateMeeting,
}: SidebarProps) {
  const loggedInUser = getCurrentClientData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAttendees, setSelectedAttendees] = useState<User[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [countdownValues, setCountdownValues] = useState<{
    [eventId: string]: string | null;
  }>({});

  useEffect(() => {
    const getUpcomingEvents = () => {
      const now = new Date();
      return events
        .filter((event) => event.start_time > now)
        .sort((a, b) => a.start_time.getTime() - b.start_time.getTime());
    };

    const upcoming = getUpcomingEvents();
    setUpcomingEvents(upcoming);

    const countdownTimers: { [eventId: string]: string | null } = {};
    upcoming.forEach((event) => {
      countdownTimers[event.id] = null;
    });
    setCountdownValues(countdownTimers);
  }, [events]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newCountdownValues: { [eventId: string]: string | null } = {};
      upcomingEvents.forEach((event) => {
        const now = new Date();
        const difference = event.start_time.getTime() - now.getTime();

        if (difference <= 0) {
          newCountdownValues[event.id] = "Starting now";
        } else {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          if (hours > 0) {
            newCountdownValues[event.id] = `Starts in ${hours}h ${minutes}m`;
          } else if (minutes > 0) {
            newCountdownValues[event.id] = `Starts in ${minutes}m ${seconds}s`;
          } else {
            newCountdownValues[event.id] = `Starts in ${seconds}s`;
          }
        }
      });
      setCountdownValues(newCountdownValues);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [upcomingEvents]);

  const formatEventDate = (date: Date) => {
    return date.toLocaleString("default", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const onInputChangeFn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onInputKeyPressFn = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      e.preventDefault();
      addAttendeeFn(searchTerm.trim());
      setSearchTerm("");
    }
  };

  const addAttendeeFn = (email: string) => {
    if (email && !selectedAttendees.some((a) => a.email === email)) {
      const newAttendee: User = {
        id: Date.now().toString(),
        email: email,
        name: email.split("@")[0],
        color: `${getColorForUser(selectedAttendees.length).bg} ${
          getColorForUser(selectedAttendees.length).border
        }`,
      };

      setSelectedAttendees([...selectedAttendees, newAttendee]);
      loadMeetingsFn(email, newAttendee.color as string);
    }
  };

  const removeAttendeeFn = (email: string) => {
    setSelectedAttendees(selectedAttendees.filter((a) => a.email !== email));
    setEvents(events.filter((itm) => itm.user_email !== email));
  };

  const createMeetingFn = () => {
    onCreateMeeting(selectedAttendees);
    // setSelectedAttendees([]);
  };

  const loadMeetingsFn = async (email: string, color: string) => {
    try {
      const data = await listUserMeetings({ email: email }, loggedInUser.token);

      if (data?.data.statusCode === 200) {
        const meetings = data?.data.body.data.map((meeting: any) => {
          return {
            ...meeting,
            // id: meeting.meeting_id,
            // title: meeting.meeting_name,
            start_time: new Date(meeting.start_time * 1000),
            end_time: new Date(meeting.end_time * 1000),
            cardColor: color,
            user_email: email,
          };
        });

        const newEvent = [...events, ...meetings];
        console.log("newEvent", newEvent);

        meetings.length > 0 && setEvents(newEvent);

        console.log("new_____Attendee", events);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed md:static inset-y-0 left-0 w-80 bg-white transform transition-transform duration-300 ease-in-out z-50 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="space-y-6 flex-1 overflow-auto">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Upcoming sessions</h2>
                <ChevronDown className="w-4 h-4" />
              </div>
              {upcomingEvents.filter((itm) => !itm.user_email).length > 0 ? (
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="w-full flex items-start gap-1"
                    >
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#EAD6FF]">
                        <Calendar size="20" color="#7133CF" />
                      </div>

                      <div className="flex flex-col pr-3 pt-0 bg-gray-50 rounded-lg">
                        <div className="font-semibold text-xs text-[#4C1E9F]">
                          {event.title}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size="16" color="#494949" />
                          <span className="text-xs font-normal text-cs-err">
                            {formatEventDate(event.start_time)} -{" "}
                            {formatEventDate(event.end_time)}
                          </span>
                        </div>
                        {isToday(event.start_time) && (
                          <div className="text-xs text-cs-error-600 mt-1 font-medium">
                            {countdownValues[event.id]}
                          </div>
                        )}
                        <div className="flex flex-row items-center justify-between mt-2">
                          <button className="flex items-center justify-center w-[69px] h-8 text-sm text-purple-500 font-bold border border-purple-500 rounded-md hover:bg-purple-50">
                            Join
                          </button>
                          <div
                            style={{
                              border: "1px solid #CACACA",
                            }}
                            className="w-[72px] h-9 bg-white flex items-center justify-between border border-[#CACACA] rounded-lg"
                          >
                            <button
                              onClick={() => onEditEvent?.(event)}
                              className="w-1/2 h-full border-r flex items-center justify-center hover:bg-gray-100 hover:rounded-l-lg"
                            >
                              <Edit size="16" color="#667085" />
                            </button>
                            <button
                              onClick={() => onDeleteEvent?.(event.meeting_id)}
                              className="w-1/2 h-full flex items-center justify-center hover:bg-gray-100 hover:rounded-l-lg"
                            >
                              <Trash size="16" color="#667085" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-sm text-gray-500">
                  <p>No upcoming sessions</p>
                  <button
                    className="text-purple-600 hover:underline mt-1"
                    onClick={onCreateSession}
                  >
                    Create session
                  </button>
                </div>
              )}
            </div>

            <div>
              <h2 className="font-semibold mb-4">Search people</h2>
              {selectedAttendees.length > 0 && (
                <button
                  onClick={createMeetingFn}
                  className="w-[102px] h-8 mb-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  Create <AddSquare size="15" color="#FAF0FF" />
                </button>
              )}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Type email and press Enter"
                  value={searchTerm}
                  onChange={onInputChangeFn}
                  onKeyPress={onInputKeyPressFn}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:border-cs-purple-650"
                />
              </div>
              {selectedAttendees.length > 0 && (
                <div className="mt-4 space-y-2">
                  {selectedAttendees.map((attendee, index) => (
                    <div
                      key={attendee.id}
                      className={`p-2 rounded-lg flex justify-between items-center ${
                        getColorForUser(index).bg
                      } ${getColorForUser(index).border}`}
                    >
                      <div>
                        {/* <p className="text-sm font-medium">{attendee.name}</p> */}
                        <p className="text-xs text-gray-600">
                          {attendee.email}
                        </p>
                      </div>
                      <button
                        onClick={() => removeAttendeeFn(attendee.email)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
