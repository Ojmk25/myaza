export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  color?: string
}

export interface Event {
  id: string
  title: string
  start_time: Date
  end_time: Date
  host_id: string
  meeting_id: string
  meeting_link: string
  meeting_name: string
  meeting_type: string
  num_attendees: number
  privacy: string
  recording: string
  timezone: string
  duration: number
  attendees: User[] | string[]
  cardColor?: string
  user_email?:string
}

export interface TimeSlot {
  time: Date
  events: Event[]
}

