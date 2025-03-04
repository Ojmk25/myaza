"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Event, User } from "../../types/calendar";
import { getColorForUser } from "@/utils/colors";
import { timeToUnixTimestamp } from "@/utils/meetingFunctions";
import moment from "moment-timezone";
import {
  createScheduleMeeting,
  updateMeeting,
} from "@/services/meetingServices";
import LoadingScreen from "@/components/modals/LoadingScreen";
import { formatDate } from "@/lib/utils";
import { getCurrentClientData } from "@/services/authService";
import { useAuth } from "@frontegg/nextjs";

interface CreateEventModalProps {
  initialDate?: {
    start: Date;
    end: Date;
  } | null;
  event?: Event | null;
  initialAttendees?: User[];
  onClose: () => void;
  use24Hour: boolean;
}

export default function CreateEventModal({
  initialDate,
  event,
  initialAttendees = [],
  onClose,
  use24Hour,
}: CreateEventModalProps) {
  const timeZone = moment.tz.guess(true);
  const loggedInUser = getCurrentClientData();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [attendees, setAttendees] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user  } = useAuth();

  useEffect(() => {
    if (event) {
      setTitle(event.meeting_name);
      setDate(event.start_time.toISOString().split("T")[0]);
      setStartTime(formatTime(event.start_time));
      setEndTime(formatTime(event.end_time));
      setAttendees(event.attendees.map((a) => ({id: Date.now().toString(), email:a.email, name: "" })) as User[]);
    } else if (initialDate) {
      setDate(initialDate.start.toISOString().split("T")[0]);
      setStartTime(formatTime(initialDate.start));
      setEndTime(formatTime(initialDate.end));
      setAttendees(initialAttendees);
    } else {
      const now = new Date();
      setDate(now.toISOString().split("T")[0]);
      setStartTime(formatTime(now));
      setEndTime(formatTime(new Date(now.getTime() + 3600000)));
      setAttendees(initialAttendees);
    }
  }, [event, initialDate, initialAttendees]);

  const formatTime = (date: Date): string => {
    if (use24Hour) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } else {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
  };

  const onSubmitFn = (e: React.FormEvent) => {
    e.preventDefault();
    schduleMeetingFn();
  };

  const schduleMeetingFn = async () => {
    setLoading(true);
    try {
      const dt = {
        meeting_name: title,
        meeting_date: formatDate(date),
        start_time: timeToUnixTimestamp(startTime),
        end_time: timeToUnixTimestamp(endTime),
        timezone: timeZone,
        attendees: attendees.map((a) => a.email),
      };
      const data = await createScheduleMeeting(dt);

      if (data?.data.statusCode === 200) {
        typeof window !== "undefined" && window.location.reload();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      onClose();
    }
  };
  const editSchduledMeetingFn = async () => {
    setLoading(true);
    try {
      const dt = {
        meeting_id: event?.meeting_id,
        meeting_name: title,
        meeting_date: formatDate(date),
        start_time: timeToUnixTimestamp(startTime),
        end_time: timeToUnixTimestamp(endTime),
        timezone: timeZone,
        attendees: attendees.map((a) => a.email),
      };
      // const data = await updateMeeting(dt, loggedInUser?.token);
      const data = await updateMeeting(dt,  user?.accessToken as string);
      console.log("check create res", data?.data.statusCode);
      if (data?.data.statusCode === 200) {
        typeof window !== "undefined" && window.location.reload()
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      onClose();
    }
  };
  const addAttendeeFn = () => {
    if (email && !attendees.some((a) => a.email === email)) {
      setAttendees([
        ...attendees,
        { id: Date.now().toString(), email, name: email.split("@")[0] },
      ]);
      setEmail("");
    }
  };

  const onEmailKeyPressFn = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addAttendeeFn();
    }
  };

  const removeAttendee = (emailToRemove: string) => {
    setAttendees(attendees.filter((a) => a.email !== emailToRemove));
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start md:items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
            <h2 className="text-2xl font-semibold">
              {event ? "Edit meeting" : "Schedule meeting"}
            </h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={onSubmitFn} className="p-4 space-y-4">
            <div>
              <label className="text-sm font-medium text-cs-grey-100">
                Meeting Name
              </label>
              <input
                type="text"
                value={title}
                placeholder="Enter meeting name"
                onChange={(e) => setTitle(e.target.value)}
                className="h-[48px] px-[16px] py-[13px] border-cs-grey-300 border rounded-[10px] w-full placeholder:text-[#A4ABB7] placeholder:text-sm outline-nonew-full p-2 focus:outline-none focus:ring-1 focus:ring-purple-600"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-cs-grey-100">
                Meeting Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-[48px] px-[16px] py-[13px] border-cs-grey-300 border rounded-[10px] w-full placeholder:text-[#A4ABB7] placeholder:text-sm outline-nonew-full p-2 focus:outline-none focus:ring-1 focus:ring-purple-600"
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-cs-grey-100">
                  Start Time
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="h-[48px] px-[16px] py-[13px] border-cs-grey-300 border rounded-[10px] w-full placeholder:text-[#A4ABB7] placeholder:text-sm outline-nonew-full p-2 focus:outline-none focus:ring-1 focus:ring-purple-600"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-cs-grey-100">
                  End Time
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="h-[48px] px-[16px] py-[13px] border-cs-grey-300 border rounded-[10px] w-full placeholder:text-[#A4ABB7] placeholder:text-sm outline-nonew-full p-2 focus:outline-none focus:ring-1 focus:ring-purple-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-cs-grey-100">
                Add People
              </label>
              <div className="flex gap-6">
                <div className="w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={onEmailKeyPressFn}
                    placeholder="example@mail.com"
                    className="h-[48px] px-[16px] py-[13px] border-cs-grey-300 border rounded-[10px] w-full placeholder:text-[#A4ABB7] placeholder:text-sm outline-nonew-full p-2 focus:outline-none focus:ring-1 focus:ring-purple-600"
                  />
                  <span className="py-2 text-xs text-cs-grey-500 font-normal">
                    Add their email and press ENTER
                  </span>
                </div>
                <button
                  type="button"
                  onClick={addAttendeeFn}
                  className="w-[81px] h-12 flex items-center justify-center bg-white border border-purple-600 text-purple-600 rounded-[10px] hover:bg-purple-700 hover:text-white whitespace-nowrap"
                >
                  Add
                </button>
              </div>
            </div>

            {attendees.length > 0 && (
              <div className="space-y-2">
                {attendees.map((attendee, index) => (
                  <div
                    key={attendee.email}
                    className={`flex items-center justify-between p-2 rounded ${
                      getColorForUser(index).bg
                    }`}
                  >
                    <span className="text-sm truncate">{attendee.email}</span>
                    <button
                      type="button"
                      onClick={() => removeAttendee(attendee.email)}
                      className="text-gray-500 hover:text-red-500 ml-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-6 pt-12">
              <button
                type="button"
                onClick={onClose}
                className="w-[146px] h-12 bg-[#FAF0FF] flex items-center justify-center text-gray-700 text-sm font-bold hover:bg-gray-100 rounded-[10px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-[146px] h-12 flex items-center justify-center bg-cs-purple-650 text-white font-bold rounded-[10px] hover:bg-purple-700"
              >
                {loading ? (
                  <span>Loading...</span>
                ) : (
                  <span>{event ? "Update" : "Create"}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
