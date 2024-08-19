import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { extractAfterLastSlashOrFull } from "../utils/Validators";
import heroImage from "@/public/assets/images/errorHero.svg";

import LoadingScreen from "@/components/modals/LoadingScreen";
import { createInstantMeeting, getMeeting } from "@/services/meetingServices";
import Header from "@/components/Header";
// import { subDomain } from "@/utils/getDomain";
import { SuccessSlideIn } from "@/components/SuccessSlideIn";
import { FailureSlideIn } from "@/components/FailureSlideIn";
import { validateMeetingIdString } from "@/utils/meetingFunctions";
import { useSessionStorage } from "@/hooks/useStorage";
import Link from "next/link";

export default function ErrorPage() {
  const navigate = useRouter();
  const [linkData, setLinkData] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [errorColour, setErrorColour] = useState(false);
  const [showModal, setShowModal] = useState("");
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [meetingData, setMeetingData] = useState<any>();

  const [openModal, setOpenModal] = useState(false);
  const [expressJoin, setExpressJoin] = useSessionStorage(
    "meetingJoiner",
    "yes"
  );

  //shows loading screen, when you use navigate.push()
  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== navigate.asPath) {
        setLoading(true);
      }
    };
    const handleComplete = () => {
      setLoading(false);
    };

    navigate.events.on("routeChangeStart", handleStart);
    navigate.events.on("routeChangeComplete", handleComplete);
    navigate.events.on("routeChangeError", handleComplete);

    return () => {
      navigate.events.off("routeChangeStart", handleStart);
      navigate.events.off("routeChangeComplete", handleComplete);
      navigate.events.off("routeChangeError", handleComplete);
    };
  }, [navigate]);

  const handleInput = async (input: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = input.target;
    const extractedLink = extractAfterLastSlashOrFull(value);
    if (value.length === 0) {
      setErrorColour(true);
      setDisableButton(true);
      setErrMessage("Enter your link");
    } else if (!validateMeetingIdString(extractedLink)) {
      setErrorColour(true);
      setDisableButton(true);
      setErrMessage("Invalid meeting link");
    } else if (extractedLink.length === 8) {
      try {
        await getMeeting({ meeting_id: extractedLink }).then((data) => {
          if (data?.data.statusCode !== 200) {
            setErrorColour(true);
            setDisableButton(true);
            setErrMessage("Invalid meeting link");
          } else {
            setErrorColour(false);
            setDisableButton(false);
            setErrMessage("");
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrorColour(false);
      setDisableButton(false);
      setErrMessage("");
    }
    setLinkData(value);
  };

  const joinMeeting = (input: string) => {
    const extractedLink = extractAfterLastSlashOrFull(input);
    navigate.push(`/meet/${extractedLink}`);
  };

  return (
    <div className=" ">
      <main className=" pt-6 w-full flex items-center justify-center flex-col mx-auto ">
        <Header />

        <div className="flex justify-center items-center ">
          <div className="block lg:grid px-6 gap-x-16 items-center grid-cols-2  bg-cs-bg max-auto w-full max-w-[1392px]">
            <div className="basis-full">
              <h3 className="my-4 text-cs-purple-650 font-semibold text-sm md:text-base sm:text-center lg:text-left">
                404 error
              </h3>
              <h3 className=" text-[32px] md:text-[54px] text-cs-grey-dark leading-[44px] md:leading-[70px] sm:text-center lg:text-left font-semibold metro-medium">
                Oops! Page Not Found
              </h3>
              <p className=" text-cs-grey-100 text-base sm:text-center lg:text-left md:text-xl mt-4">
                Sorry, the page you are looking for doesn&lsquo;t exist or has
                been moved. We suggest you go back to homepage or join with a
                correct meeting link
              </p>

              <div className="flex justify-center flex-col md:flex-row gap-y-6 lg:justify-between mt-4 md:mt-8 relative">
                <div className={`flex relative`}>
                  <Link
                    href="/"
                    className="w-full h-12 md:w-[200px] text-cs-grey-50 bg-cs-purple-650 rounded-md py-2 px-4 font-bold max-h-[52px] flex justify-center items-center"
                  >
                    Back to homepage
                  </Link>
                </div>
                <div>
                  <div
                    className={`flex border ${
                      errorColour ? "border-cs-error-600" : " border-cs-grey-55"
                    }  rounded-md py-1 pr-1 pl-3 border-solid h-12`}
                  >
                    <input
                      type="text"
                      name="link"
                      id=""
                      placeholder="Meeting link E.g xap-ikl-eop"
                      className="flex-1 placeholder:text-cs-grey-200 md:min-w-60 outline-none self-center"
                      onChange={(e) => handleInput(e)}
                      value={linkData}
                    />
                    <button
                      className=" text-cs-purple-650 font-bold py-0 md:py-1 px-6 border border-cs-purple-650 rounded hover:text-white hover:bg-cs-purple-650"
                      onClick={() => joinMeeting(linkData)}
                      disabled={disableButton}
                    >
                      Join
                    </button>
                  </div>
                  <p className="text-sm text-cs-error-600 min-h-6">
                    {errMessage}
                  </p>
                </div>
              </div>
            </div>
            <div className="basis-full my-4 md:my-0 px-6 lg:px-0">
              <Image
                src={heroImage}
                alt="hero"
                className="w-full h-full max-h-[480px] aspect-auto"
              />
            </div>
          </div>
        </div>

        <SuccessSlideIn
          openModal={openModal}
          response={meetingData && meetingData?.data.statusCode === 200}
          successActionResponse={meetingData && meetingData?.data.body.message}
          closeModal={() => {}}
        />

        <FailureSlideIn
          openModal={openModal}
          response={meetingData && meetingData?.data.statusCode !== 200}
          errResponse={meetingData && meetingData?.data.body.message}
          closeModal={() => {}}
        />

        {loading && <LoadingScreen />}
      </main>
    </div>
  );
}
