import MeetingPage from "@/components/meetingComponents/MeetingPage";
import LoadingScreen from "@/components/modals/LoadingScreen";
import { useSessionStorage } from "@/hooks/useStorage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Meet = () => {
  const router = useRouter();
  const [updateRoute, setUpdateRoute] = useState("");
  const [expressJoin, setExpressJoin] = useSessionStorage(
    "meetingJoiner",
    "no"
  );

  console.log(expressJoin);

  let joinStatus;
  useEffect(() => {
    if (router.isReady) {
      localStorage.setItem("meetingLink", router.query.link as string);
      setUpdateRoute(expressJoin);
      expressJoin === "no" && router.push("/preview");
    }
  }, [router.isReady, router.asPath]);

  useEffect(() => {
    // Push the state for the back button navigation
    history.pushState(null, "", router.asPath);

    const handlePopState = () => {
      router.replace("/");
    };

    window.addEventListener("popstate", handlePopState);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  if (updateRoute !== "" && updateRoute === "yes") {
    return <MeetingPage param={router.query.link} />;
  } else {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }
};

export default Meet;
