import dynamic from "next/dynamic";
import { useRouter } from "next/router"
import TempMeeting from "../components/meetingComponents/TempMeeting";

const PreviewComponent = dynamic(() => import('@/components/preview/PreviewComponent'), {
  ssr: false
})
export default function Link() {
  const router = useRouter()
  console.log(router.query.link);

  return <>
    {router.query.link === 'preview' && <PreviewComponent />}
    {router.query.link === 'meeting' && <TempMeeting />}
  </>
}

