import { getApiPath } from "@/config";
import * as http from "@/services/httpServices";
import { headers } from "next/headers";
import { IsAuthenticated } from "./authService";

const apiInstantMeeting = getApiPath("meeting", "instant-meeting");
const apiScheduleMeeting = getApiPath("meeting", "schedule-meeting");
const apiJoinMeeting = getApiPath("meeting", "join-meeting");
const apiStartTranscription = getApiPath("meeting", "start-transcription");
const listAttendeesPath = getApiPath("meeting", "list-attendees");

export interface TranscriptionPayload {
  meeting_id: string;
  attendee_id: string;
}

export const setInstantMeeting = (meetingID: string, meetingData: any) => {
  sessionStorage.setItem(meetingID, JSON.stringify(meetingData));
};

export const createInstantMeeting = async (data: any) => {
  const token = localStorage.getItem("cecureStreamAcToken");
  try {
    if (token) {
      return await http.apiCall.api.post(apiInstantMeeting, data, {
        headers: {
          Authorization: token,
        },
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const joinMeetingAuth = async (data: any) => {
  const accessToken = localStorage.getItem("cecureStreamAcToken");
  try {
    if (accessToken) {
      return await http.apiCall.api.post(apiJoinMeeting, data, {
        headers: {
          Authorization: accessToken,
        },
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const listAttendees = async (data: any) => {
  // const token = localStorage.getItem("cecureStreamAcToken");
  try {
    // if (token) {
    return await http.apiCall.post(listAttendeesPath, data);
    // }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// export const createInstantMeeting = async (data: any) => {
//   const authToken = localStorage.getItem("cecureStreamAuthToken");
//   try {
//     if (true) {
//       const parsedAuthToken = JSON.parse(authToken as string);
//       const accessToken = parsedAuthToken?.cecureStreamAcToken;
//       return await http.apiCall.api.post(
//         apiInstantMeeting,
//         data,

//         {
//           headers: {
//             Authorization: accessToken,
//           },
//         }
//       );
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const createScheduleMeeting = async (data: any) => {
  const token = localStorage.getItem("cecureStreamAcToken");
  try {
    if (token) {
      return await http.apiCall.api.post(apiScheduleMeeting, data, {
        headers: {
          Authorization: token,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const joinMeetingFnc = async (data: any) => {
  try {
    const meetingData = IsAuthenticated()
      ? await joinMeetingAuth(data)
      : await http.apiCall.post(apiJoinMeeting, data);
    return meetingData;
  } catch (error) {
    console.log(error);
  }
};

export const startTranscription = async (data: TranscriptionPayload) => {
  try {
    return await http.apiCall.post(apiStartTranscription, data);
  } catch (error) {
    console.log(error);
  }
};
