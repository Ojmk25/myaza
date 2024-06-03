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




// export const mer = {
//   MeetingDetails: { MeetingId: "c75aab3f-fd74-4eea-902b-5e6510222713", ExternalMeetingId: "055908c7", MediaRegion: "us-east-1", MediaPlacement: { AudioHostUrl: "36772ea61010347c4fc2fd44a30a3e96.k.m3.ue1.app.chime.aws:3478", AudioFallbackUrl: "wss://wss.k.m3.ue1.app.chime.aws:443/calls/c75aab3f-fd74-4eea-902b-5e6510222713", SignalingUrl: "wss://signal.m3.ue1.app.chime.aws/control/c75aab3f-fd74-4eea-902b-5e6510222713", TurnControlUrl: "https://2713.cell.us-east-1.meetings.chime.aws/v2/turn_sessions", ScreenDataUrl: "wss://bitpw.m3.ue1.app.chime.aws:443/v2/screen/c75aab3f-fd74-4eea-902b-5e6510222713", ScreenViewingUrl: "wss://bitpw.m3.ue1.app.chime.aws:443/ws/connect?passcode=null&viewer_uuid=null&X-BitHub-Call-Id=c75aab3f-fd74-4eea-902b-5e6510222713", ScreenSharingUrl: "wss://bitpw.m3.ue1.app.chime.aws:443/v2/screen/c75aab3f-fd74-4eea-902b-5e6510222713", "EventIngestionUrl": "https://data.svc.ue1.ingest.chime.aws/v1/client-events" }, TenantIds: [], MeetingArn: "arn:aws:chime:us-east-1:165553610930:meeting/c75aab3f-fd74-4eea-902b-5e6510222713", MeetingLink: "dev.cecurecast.com/055908c7" },
//   HostDetails: [{ ExternalUserId: "user_f7c91b2b-73a9-497e-9e2b-f7af5fb57853", AttendeeId: "f4f8ca3f-83b1-5104-cd18-32704ae36588", JoinToken: "ZjRmOGNhM2YtODNiMS01MTA0LWNkMTgtMzI3MDRhZTM2NTg4OmU0NjNjM2M0LWFkNjYtNGIzMS04YzYyLThiNjY2YTM0ZDk5Mw", Capabilities: { Audio: "SendReceive", "Video": "SendReceive", "Content": "SendReceive" } }, { Name: "Emmanuel Kalu" }]
// }

export const mer = {
  "statusCode": 200,
  "body": {
    "status": "Success",
    "message": "Instant meeting created",
    "data": {
      "MeetingDetails": {
        "MeetingId": "5c40a643-f840-4a7f-bbda-6088806d2713",
        "ExternalMeetingId": "b298bbb9",
        "MediaRegion": "us-east-1",
        "MediaPlacement": {
          "AudioHostUrl": "24dd21e3874380e604378112cb0ac0ba.k.m3.ue1.app.chime.aws:3478",
          "AudioFallbackUrl": "wss://wss.k.m3.ue1.app.chime.aws:443/calls/5c40a643-f840-4a7f-bbda-6088806d2713",
          "SignalingUrl": "wss://signal.m3.ue1.app.chime.aws/control/5c40a643-f840-4a7f-bbda-6088806d2713",
          "TurnControlUrl": "https://2713.cell.us-east-1.meetings.chime.aws/v2/turn_sessions",
          "ScreenDataUrl": "wss://bitpw.m3.ue1.app.chime.aws:443/v2/screen/5c40a643-f840-4a7f-bbda-6088806d2713",
          "ScreenViewingUrl": "wss://bitpw.m3.ue1.app.chime.aws:443/ws/connect?passcode=null&viewer_uuid=null&X-BitHub-Call-Id=5c40a643-f840-4a7f-bbda-6088806d2713",
          "ScreenSharingUrl": "wss://bitpw.m3.ue1.app.chime.aws:443/v2/screen/5c40a643-f840-4a7f-bbda-6088806d2713",
          "EventIngestionUrl": "https://data.svc.ue1.ingest.chime.aws/v1/client-events"
        },
        "TenantIds": [],
        "MeetingArn": "arn:aws:chime:us-east-1:165553610930:meeting/5c40a643-f840-4a7f-bbda-6088806d2713",
        "MeetingLink": "dev.cecurecast.com/b298bbb9"
      },
      "HostDetails": [
        {
          "ExternalUserId": "user_f7c91b2b-73a9-497e-9e2b-f7af5fb57853",
          "AttendeeId": "e158853b-9ec9-8fdd-8ce2-bc040de093da",
          "JoinToken": "ZTE1ODg1M2ItOWVjOS04ZmRkLThjZTItYmMwNDBkZTA5M2RhOjdmNWE1ZWU5LTdmNTEtNGE5MS1iMGVkLTU1MmQ5NThhY2MzMg",
          "Capabilities": {
            "Audio": "SendReceive",
            "Video": "SendReceive",
            "Content": "SendReceive"
          }
        },
        {
          "Name": "Emmanuel Kalu"
        }
      ]
    }
  }
}