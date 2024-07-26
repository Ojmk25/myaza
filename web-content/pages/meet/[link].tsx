import TempMeeting from "@/components/meetingComponents/TempMeeting";
import LoadingScreen from "@/components/modals/LoadingScreen";
import { useSessionStorage } from "@/hooks/useStorage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Meet = () => {
  const router = useRouter();
  const [updateRoute, setUpdateRoute] = useState("");
  const [expressJoin, setExpressJoin] = useSessionStorage("meetingJoiner", "");

  let joinStatus;
  useEffect(() => {
    if (router.isReady) {
      localStorage.setItem("meetingLink", router.query.link as string);
      setUpdateRoute(expressJoin);
      expressJoin === "no" && router.push("/preview");
    }
  }, [router.isReady, router.asPath]);

  if (updateRoute !== "" && updateRoute === "yes") {
    return <TempMeeting param={router.query.link} />;
  } else {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }
};

export default Meet;
