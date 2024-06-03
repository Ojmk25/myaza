import { getApiPath } from "@/config"
import * as http from "@/services/httpServices"

const apiInstantMeeting = getApiPath('meeting/', 'instant-meeting')
const apiScheduleMeeting = getApiPath('meeting/', 'schedule-meeting')

export const setInstantMeeting = (meetingID: string, meetingData: any) => {
  sessionStorage.setItem(meetingID, JSON.stringify(meetingData))
}

export const createInstantMeeting = async (data: any) => {
  const authToken = sessionStorage.getItem('cecureStreamAuthToken')
  try {
    if (authToken) {
      const parsedAuthToken = JSON.parse(authToken)
      const accessToken = parsedAuthToken?.cecureStreamAcToken
      return await http.apiCall.post(apiInstantMeeting, data, {
        headers: {
          Authorization: accessToken,
        },
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export const createScheduleMeeting = async (data: any) => {
  const authToken = sessionStorage.getItem('cecureStreamAuthToken')
  try {
    if (authToken) {
      const parsedAuthToken = JSON.parse(authToken)
      const accessToken = parsedAuthToken?.cecureStreamAcToken
      return await http.apiCall.post(apiScheduleMeeting, data, {
        headers: {
          Authorization: accessToken,
        },
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export function timeToUnixTimestamp(time: string): number {
  // Create a regex to parse the 24-hour time string
  const timeRegex = /^(\d{2}):(\d{2})$/;
  const match = time.match(timeRegex);

  if (!match) {
    throw new Error('Invalid time format');
  }

  // Extract hours and minutes
  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);

  // Get today's date
  const now = new Date();
  now.setHours(hours, minutes, 0, 0);
  console.log(Math.floor(now.getTime() / 1000));

  // Return Unix timestamp
  return Math.floor(now.getTime() / 1000);
}