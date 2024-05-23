import { getApiPath } from '../config'
import * as http from './httpServices'

const apiWaitlistService = getApiPath('open/user', 'wait-list-sub')

export interface WaitlistServicePayload {
  listType: string
  firstName?: string
  email: string
}
export const waitlistService = async (
  data: WaitlistServicePayload,
  token: string
) => {
  try {
    return await http.apiCall.post(apiWaitlistService, data, {
      headers: {
        Authorization: token,
      },
    })
  } catch (error) {
    return error
  }
}