import { getCurrentClientData } from "@/services/authService";
import { listUserMeetings } from "@/services/meetingServices";
import { Event } from "@/types/calendar";
import { Calendar } from "iconsax-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "@frontegg/nextjs";

const UpcomingEventSelfComponent = () => {
  const loggedInUser = getCurrentClientData();
  const { user } = useAuth();

  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    loadMeetingsFn();
  }, []);

  const formatEventDate = (date: Date) => {
    return date.toLocaleString("default", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getUpcomingEvents = (events: Event[]) => {
    const now = new Date();
    return events
      .filter((event) => event.start_time > now)
      .sort((a, b) => a.start_time.getTime() - b.start_time.getTime());
  };

  const loadMeetingsFn = async () => {
    try {
      const data = await listUserMeetings(
        { email: user?.email },
        user?.accessToken as string
      );

      if (data?.data.statusCode === 200) {
        const events = data?.data.body.data.map((meeting: any) => {
          return {
            ...meeting,
            start_time: new Date(meeting.start_time * 1000),
            end_time: new Date(meeting.end_time * 1000),
          };
        });
        const upcoming = getUpcomingEvents(events);
        setUpcomingEvents(upcoming);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex flex-col gap-4  bg-[#FCFCFD] border border-solid border-[#EAECF0] rounded-xl pt-2 px-3 md:p-4">
      <h2 className="text-sm text-[#1E1E1E] font-semibold">
        Upcoming sessions
      </h2>

      {upcomingEvents.length > 0 ? (
        <>
          {upcomingEvents.map((event) => (
            <div
              key={event.meeting_id}
              className="w-full h-12 bg-[#FAF9FC] border border-solid border-[#FAF0FF] flex items-center justify-start gap-4 md:gap-10"
            >
              <div className="flex items-center gap-1">
                <Calendar color="#494949" className="text-xs md:text-base" />
                <span className="text-sm md:text-base text-[#494949] font-normal">
                  {formatEventDate(event.start_time)} -{" "}
                  {formatEventDate(event.end_time)}
                </span>
              </div>
              <p className="text-cs-grey-800 text-xs md:text-base font-semibold">
                {event.meeting_name}
              </p>
            </div>
          ))}
          {upcomingEvents.length > 1 && (
            <button className="text-cs-purple-500 text-sm font-semibold">
              See more
            </button>
          )}
        </>
      ) : (
        <div className="text-center py-4 text-sm text-gray-500">
          <p>No upcoming sessions</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingEventSelfComponent;
