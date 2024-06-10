import { getApiPath } from "@/config"
import * as http from "@/services/httpServices"

const apiInstantMeeting = getApiPath('meeting/', 'instant-meeting')
const apiScheduleMeeting = getApiPath('meeting/', 'schedule-meeting')
const apiJoinMeeting = getApiPath('meeting/', 'join-meeting')

export const setInstantMeeting = (meetingID: string, meetingData: any) => {
  sessionStorage.setItem(meetingID, JSON.stringify(meetingData))
}

export const createInstantMeeting = async (data: any) => {
  const authToken = localStorage.getItem('cecureStreamAuthToken')
  try {

    if (true) {
      const parsedAuthToken = JSON.parse(authToken as string)
      const accessToken = parsedAuthToken?.cecureStreamAcToken
      return await http.apiCall.post(apiInstantMeeting, data,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      )

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


export const joinMeetingFnc = async (data: any) => {
  // const authToken = sessionStorage.getItem('cecureStreamAuthToken')
  try {
    // if (authToken) {
    // const parsedAuthToken = JSON.parse(authToken)
    // const accessToken = parsedAuthToken?.cecureStreamAcToken
    // const meetingData = await http.apiCall.post(apiJoinMeeting, data, {
    //   headers: {
    //     Authorization: accessToken,
    //   },
    // })
    const meetingData = await http.apiCall.post(apiJoinMeeting, data)

    return meetingData
    // }
  } catch (error) {
    console.log(error)
  }
}