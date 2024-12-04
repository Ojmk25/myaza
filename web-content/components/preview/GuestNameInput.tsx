import {
  MutableRefObject,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { AuthInput } from "../auth/AuthInput";
import { ValidateText } from "@/utils/Validators";
import {
  IsAuthenticated,
  getClientInfo,
  getNameAbbreviation,
} from "@/services/authService";
import { SubmitButton } from "../auth/SubmitButton";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/StoreContext";
import { useSessionStorage } from "@/hooks/useStorage";
import Image from "next/image";
import { usePathname } from "next/navigation";
import RecordingConsentPreviewModal from "../modals/RecordingConsentPreviewModal";
import ReactDOM from "react-dom";
import { InfoCircle } from "iconsax-react";
import { listAttendees } from "@/services/meetingServices";

export default function GuestNameInput({
  recordingConsentTextRef,
}: {
  recordingConsentTextRef: MutableRefObject<HTMLDivElement | null>;
}) {
  const [errMessage, setErrMessage] = useState({
    "First name": "",
    "Last name": "",
    link: "",
  });

  const [authData, setAuthData] = useState({
    "First name": "",
    "Last name": "",
    link: "",
  });
  const [activateButton, setActivateButton] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [openRecordingConsent, setOpenRecordingConsent] = useState(false);
  const { first_name, surname, picture } = getClientInfo();
  const navigate = useRouter();
  const { setAppState } = useAppContext();
  const [expressJoin, setExpressJoin] = useSessionStorage(
    "meetingJoiner",
    "yes"
  );
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  useEffect(() => {
    setLoggedIn(IsAuthenticated());
    getNameAbbreviation();
  }, []);

  useEffect(() => {
    // Call the function immediately when the screen loads
    checkIsRecording();

    //Call the function at 10 seconds intervaal
    const intervalId = setInterval(() => {
      checkIsRecording();
    }, 10000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const checkIsRecording = async () => {
    let allAttendees: any[] = []; // Array to hold all the attendees
    let nextToken: string | null = null;

    try {
      do {
        // Make the API call with the current next_token (or without it for the first call)
        const response = await listAttendees({
          meeting_id: `meeting_${localStorage.getItem("meetingLink")}`,
          next_token: nextToken, // Pass the token, if it's null, it will be ignored
        });

        if (response) {
          const { data } = response.data.body;

          // Merge current page of attendees with the allAttendees array
          allAttendees = [...allAttendees, ...data?.attendees];

          // Update the nextToken, which will control the loop
          nextToken = data?.next_token || null;
        }
      } while (nextToken !== null); // Continue while there is a next_token

      //check the array for the meeting recording bot
      const isUserRecording = allAttendees.some((user) =>
        user.user_id?.startsWith("aws:MediaPipeline")
      );
      setIsRecording(isUserRecording);
      // Return the complete array of attendees
      return allAttendees;
    } catch (error) {
      console.log("Error fetching attendees:", error);
      return []; // Return an empty array in case of an error
    }
  };

  const handleInput = (input: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = input.target;
    const addError = () => {
      setErrMessage((prevState) => ({
        ...prevState,
        [name]: `Invalid ${name}`,
      }));
    };
    const removeError = () => {
      setErrMessage((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    };

    if (!ValidateText(value)) {
      addError();
    } else {
      removeError();
    }

    if (input.target.value.length === 0) {
      setErrMessage((prevState) => ({
        ...prevState,
        [name]: `Enter your ${name}`,
      }));
    }

    setAuthData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (authData["First name"].length > 2 && authData["Last name"].length > 2) {
      setActivateButton(true);
    } else {
      setActivateButton(false);
    }
  }, [authData]);

  const handleRoute = () => {
    setAppState((prevState) => ({
      ...prevState,
      sessionState: {
        ...prevState.sessionState,
        guestFirstName: authData["First name"],
        guestLastName: authData["Last name"],
      },
    }));
    // sessionStorage.setItem("meetingJoiner", "no");
    setExpressJoin("yes");
    // window.history.replaceState(null, "", "/");
    // if (isRecording) {
    //   setOpenRecordingConsent(true);
    // } else {
    //   navigate.push(`/meet/${localStorage.getItem("meetingLink")}`);
    // }
    navigate.push(`/meet/${localStorage.getItem("meetingLink")}`);
  };

  return (
    <>
      {loggedIn !== null && (
        <div className="basis-full col-start-1 row-start-1">
          <h3 className=" text-2xl font-semibold text-cs-grey-dark mb-1 hidden md:block">
            Join Meeting
          </h3>
          <form className=" lg:max-w-[415px]">
            <div className={` ${loggedIn ? "hidden" : "block"}`}>
              <AuthInput
                label="First name"
                action={handleInput}
                errorMessage={errMessage["First name"]}
                inputName="First name"
                inputType="text"
                placeHolder="Henry"
                value={authData["First name"]}
              />
              <AuthInput
                label="Last name"
                action={handleInput}
                errorMessage={errMessage["Last name"]}
                inputName="Last name"
                inputType="text"
                placeHolder="Kalu"
                value={authData["Last name"]}
              />
            </div>
            <div
              className={` ${
                loggedIn ? "block" : "hidden"
              } flex gap-x-4 items-center mt-[48px]`}
            >
              {!picture ? (
                <div className=" bg-cs-grey-800 w-[38px] h-[38px] rounded-full flex justify-center items-center text-cs-grey-50">
                  {getNameAbbreviation()}
                </div>
              ) : (
                <Image
                  src={picture}
                  width={40}
                  height={40}
                  alt="logo"
                  className="rounded-full w-10 h-10 object-cover"
                />
              )}
              <p className=" text-cs-grey-dark font-medium">
                Signed in as {first_name} {surname}
              </p>
            </div>
            {loggedIn ? (
              <SubmitButton
                text="Join meeting"
                action={handleRoute}
                activate={true}
              />
            ) : (
              <SubmitButton
                text="Join meeting"
                action={handleRoute}
                activate={activateButton}
              />
            )}

            <p
              className={`${
                loggedIn ? "hidden" : "block"
              } text-center my-6 text-base font-semibold text-cs-grey-dark`}
            >
              Already have an account?{" "}
              <Link
                href={`/auth/login?prevpage=${lastSegment}`}
                className=" text-cs-purple-650"
              >
                Sign in
              </Link>
            </p>
          </form>
          {/* {openRecordingConsent && (
            <RecordingConsentPreviewModal
              onClose={() => {
                setOpenRecordingConsent(false);
              }}
              joinMeeting={() => {
                navigate.push(`/meet/${localStorage.getItem("meetingLink")}`);
              }}
            />
          )} */}

          {recordingConsentTextRef.current &&
            isRecording &&
            ReactDOM.createPortal(
              <div className=" my-6 text-cs-error-600 metro-medium flex items-center justify-center gap-x-2">
                <InfoCircle size="18" color="#cb3a32" />
                <p className=" font-medium text-sm md:text-base">
                  This meeting is being recorded
                </p>
              </div>,
              recordingConsentTextRef.current
            )}
        </div>
      )}
    </>
  );
}
