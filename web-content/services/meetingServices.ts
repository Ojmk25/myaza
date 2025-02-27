import { getApiPath } from "@/config";
import * as http from "@/services/httpServices";
import { headers } from "next/headers";
import { IsAuthenticated } from "./authService";

const apiInstantMeeting = getApiPath("meeting", "instant-meeting");
const apiScheduleMeeting = getApiPath("meeting", "schedule-meeting");
const apiJoinMeeting = getApiPath("meeting", "join-meeting");
const apiStartTranscription = getApiPath("meeting", "start-transcription");
const apiStopTranscription = getApiPath("meeting", "stop-transcription");
const listAttendeesPath = getApiPath("meeting", "list-attendees");
const checkMeetingPath = getApiPath("meeting", "get-meeting");
const endMeetingPath = getApiPath("meeting", "end-call");
const startRecordingPath = getApiPath("meeting", "start-recording");
const stopRecordingPath = getApiPath("meeting", "stop-recording");
const apiListUserMeetings = getApiPath("meeting", "list-meetings");
const apiGetCalendarSettings = getApiPath("core", "get-user-settings");
const apiUpdateCalendarSettings = getApiPath("core", "update-user-settings");

export interface TranscriptionPayload {
  meeting_id: string;
  attendee_id: string;
}

export interface StopTranscriptionPayload {
  meeting_id: string;
  attendee_id: string;
}

export interface StopRecordingPayload {
  // meeting_id: string;
  media_pipeline_arn: string;
  media_pipeline_id: string;
}

// media_pipeline_arn: string;
// media_pipeline_id: string; for stoprecording

export interface GetMeetingPayload {
  meeting_id: string;
}

export interface EndMeetingPayload {
  meeting_id: string;
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

export const stopTranscription = async (data: StopTranscriptionPayload) => {
  try {
    return await http.apiCall.post(apiStopTranscription, data);
  } catch (error) {
    console.log(error);
  }
};

export const getMeeting = async (data: GetMeetingPayload) => {
  try {
    return await http.apiCall.post(checkMeetingPath, data);
  } catch (error) {
    console.log(error);
  }
};

export const endMeetingForAll = async (data: EndMeetingPayload) => {
  try {
    return await http.apiCall.api.post(endMeetingPath, data);
  } catch (error) {
    console.log(error);
  }
};

export const startRecording = async (data: GetMeetingPayload) => {
  try {
    return await http.apiCall.api.post(startRecordingPath, data);
  } catch (error) {
    console.log(error);
  }
};

export const stopRecording = async (data: StopRecordingPayload) => {
  try {
    return await http.apiCall.api.post(stopRecordingPath, data);
  } catch (error) {
    console.log(error);
  }
};

export const listUserMeetings = async (data: any, token: string) => {
  // const token = localStorage.getItem("cecureStreamAcToken");
  try {
    return await http.apiCall.post(apiListUserMeetings, data, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getCalendarSettings = async (data: any, token: string) => {
  try {
    return await http.apiCall.post(apiGetCalendarSettings, data, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updateCalendarSettings = async (data: any, token: string) => {
  try {
    return await http.apiCall.post(apiUpdateCalendarSettings, data, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
