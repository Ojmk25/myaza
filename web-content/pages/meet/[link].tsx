import TempMeeting from "@/components/meetingComponents/TempMeeting"
import LoadingScreen from "@/components/modals/LoadingScreen"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"


const Meet = () => {
  const router = useRouter()
  const [update, setUpdate] = useState('')
  let joinStatus
  useEffect(() => {
    if (router.isReady) {
      joinStatus = sessionStorage.getItem("meetingJoiner")
      joinStatus === 'yes' && router.push('/preview')
      localStorage.setItem("meetingLink", router.query.link as string)
      setUpdate(joinStatus as string)
    }
  }, [router.isReady, router.asPath])

  if (update === 'no') {
    return (
      <TempMeeting param={router.query.link} />
    )
  } else {
    return (
      <>
        <LoadingScreen />
      </>
    )
  }

}

export default Meet;