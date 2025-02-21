import React,{useEffect, useState} from "react";
import Image from "next/image"
import landingPage from "@/public/assets/images/landingPage.png"
import signUpOne from "@/public/assets/images/signUpOne.png"
import signUpTwo from "@/public/assets/images/signUpTwo.png"
import signUpThree from "@/public/assets/images/signUpThree.png"
import signInOne from "@/public/assets/images/signInOne.png"
import signInTwo from "@/public/assets/images/signInTwo.png"
import troubleShootOne from "@/public/assets/images/troubleShootOne.png"
import troubleShootTwo from "@/public/assets/images/troubleShootTwo.png"
import createNewSession from "@/public/assets/images/createNewSession.png"
import turnOnOffCamera from "@/public/assets/images/turnOnOffCamera.png"
import emojiReaction from "@/public/assets/images/emojiReaction.png"
import Header from "@/components/Header";
import recordMeetingOne from "@/public/assets/images/recordMeetingOne.png"
import recordMeetingTwo from "@/public/assets/images/recordMeetingTwo.png"
import recordMeetingThree from "@/public/assets/images/recordMeetingThree.png"
import { useSessionStorage } from "@/hooks/useStorage";
import { IsAuthenticated,  } from "@/services/authService";
import verifyAccount from "@/public/assets/images/verifyAccount.png"
import Head from "next/head";
import TermsNav from "@/components/TermsNav";

const TermsofEngage = () => {
  const [expressJoin, setExpressJoin] = useSessionStorage(
    "meetingJoiner",
    "yes"
  );
const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  const onboarding = React.useRef(null);
  const createSessionSection = React.useRef(null);
  const startingMeetingSection = React.useRef(null);
  const switchCameraSection = React.useRef(null);
  const manageCameraSection = React.useRef(null);
  const tipSection = React.useRef(null);
  const emojiReactionSection = React.useRef(null);
  const trobleshootingSection = React.useRef(null);
  const accessingAccountSection = React.useRef(null);
  const signInSection = React.useRef(null);
  const firstTimerSetup = React.useRef(null);
  const creatingAccountSection = React.useRef(null);
  const signUpDection = React.useRef(null);
  const gettingStartedSection = React.useRef(null);
  const usingEmojiSection = React.useRef(null);
  const recordMeetingSection = React.useRef(null);
  const switchRecordingSection = React.useRef(null);
  const accessRecordingSection = React.useRef(null);
  const noteSection = React.useRef(null);
  const profileEditSection = React.useRef(null);
  const updateProfileSection = React.useRef(null);
  const scrollDown = ( ref: any) => {
    const offset = 106; // Adjust this value as needed
    const targetPosition =
      ref?.current.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setLoggedIn(IsAuthenticated());
  }, []);
  return (
    <>
          <Head>
        <title>User guide</title>
        <meta name="description" content="Web video conferencing tool" />
      </Head>
      {
        loggedIn !== null &&
        <>
        <div className="pt-4">
      <Header />

      </div>
      <div>
     

        <section className=" md:pb-[177px] px-2">
       
              <h1 className="text-center mt-4 font-bold text-xl lg:text-5xl text-[#080808]"> User Guide for CecureStream</h1>
              <p className=" text-xl text-center my-4 leading-[26px] text-cs-purple-500 px-2 ">
                  Last Updated January, 2025
              </p>
                            <TermsNav/>
              
          <div className="container mx-auto md:flex">

            <div className="md:w-[30%] hidden lg:block pl-6">
              <div className="sticky top-[15%]">
                <div className="h-[400px] overflow-y-auto px-[10px] ">
                  <div className="mb-6  md:w-full text-cs-grey-700 text-base  font-normal">
                    <div className="mb-[28px] ">
                      <div
                        className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                        onClick={() => scrollDown(onboarding)}
                      >
                        1{" "}
                        <span className="ml-[5px]">Onboarding</span>
                      </div>
                      <div className="ml-[24px] mt-[20px] flex gap-[20px] flex-col">
                        <div
                          className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                          onClick={() => scrollDown(gettingStartedSection)}
                        >
                          <span className="ml-[5px]">Getting Started</span>
                        </div>
                        <div
                          className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                          onClick={() => scrollDown(firstTimerSetup)}
                        >
                          <span className="ml-[5px]">First-Timer Setup</span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-[28px] ">
                      <div
                        className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                        onClick={() => scrollDown(signUpDection)}
                      >
                        2<span className="ml-[5px]">Sign Up</span>
                      </div>
                      <div className="ml-[24px] mt-[20px] flex gap-[20px] flex-col">

                        <div
                          className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                          onClick={() => scrollDown(creatingAccountSection)}
                        >

                          <span className="ml-[5px]">Creating Your Account</span>
                        </div>

                      </div>
                    </div>
                    <div className="mb-[28px] ">
                      <div
                        className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                        onClick={() => scrollDown(signInSection)}
                      >
                        3{" "}
                        <span className="ml-[5px]">
                          Sign in
                        </span>
                      </div>
                      <div className="ml-[24px] mt-[20px] flex gap-[20px] flex-col">
                        <div
                          className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                          onClick={() => scrollDown(accessingAccountSection)}
                        >
                          <span className="ml-[5px]">
                            Accessing Your Account

                          </span>
                        </div>
                        <div
                          className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                          onClick={() => scrollDown(trobleshootingSection)}
                        >
                          <span className="ml-[5px]">
                            {" "}
                            Troubleshooting
                          </span>
                        </div>

                      </div>
                    </div>
                    <div className="mb-[28px] ">
                      <div
                        className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                        onClick={() => scrollDown(createSessionSection)}
                      >
                        4{" "}
                        <span className="ml-[5px]">
                          Create a New Session
                        </span>
                      </div>
                      <div className="ml-[24px] mt-[20px] flex gap-[20px] flex-col">
                        <div
                          className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                          onClick={() => scrollDown(startingMeetingSection)}
                        >
                          <span className="ml-[5px]">Starting and Joining Meetings
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-[28px] ">
                      <div
                        className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                        onClick={() => scrollDown(switchCameraSection)}
                      >
                        5 <span className="ml-[5px]">Turn On and Off Camera and Microphone
                        </span>
                      </div>
                      <div className="ml-[24px] mt-[20px] flex gap-[20px] flex-col">
                        <div
                          className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                          onClick={() => scrollDown(manageCameraSection)}
                        >
                          <span className="ml-[5px]">Managing Camera and Mic
                          </span>
                        </div>
                        <div
                          className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                          onClick={() => scrollDown(tipSection)}
                        >
                          Tips                          
                        </div>

                      </div>
                    </div>
                    <div className="mb-[28px] ">
                      <div
                        className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                        onClick={() => scrollDown(emojiReactionSection)}
                      >
                        6<span className="ml-[5px]"> Emoji Reactions</span>
                      </div>

                      <div className="ml-[24px] mt-[20px] flex gap-[20px] flex-col">
                        <div
                          className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                          onClick={() => scrollDown(usingEmojiSection)}
                        >

                          <span className="ml-[5px]">Using Emoji   </span>
                        </div>

                      </div>
                    </div>
                    <div className="mb-[28px] ">
                      <div
                        className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                        onClick={() => scrollDown(recordMeetingSection)}
                      >
                        7{" "}
                        <span className="ml-[5px]">
                          Recording Meetings
                        </span>
                      </div>
                      <div className="ml-[24px] mt-[20px] flex gap-[20px] flex-col">
                        <div
                          className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                          onClick={() => scrollDown(switchRecordingSection)}
                        >
                          <span className="ml-[5px]">
                            Starting and Stopping a Recording
                          </span>
                        </div>
                        <div
                          className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                          onClick={() => scrollDown(accessRecordingSection)}
                        >
                          <span className="ml-[5px]">Accessing Recordings
                          </span>
                        </div>
                        <div
                          className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                          onClick={() => scrollDown(noteSection)}
                        >
                          <span className="ml-[5px]">
                            Note                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-[28px] ">
                      <div
                        className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                        onClick={() => scrollDown(profileEditSection)}
                      >
                        8{" "}
                        <span className="ml-[5px]">
                          Profile Edit
                        </span>
                      </div>
                      <div className="ml-[24px] mt-[20px] flex gap-[20px] flex-col">
                        <div
                          className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                          onClick={() => scrollDown(updateProfileSection)}
                        >
                          <span className="ml-[5px]"> Updating Your Profile
                          </span>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

                <div className="lg:w-[70%] w-full lg:ml-[79px]  lg:mt-0 mb-[60px] lg:mb-0">
                     <div className="bg-gray-50">
          <section className="text-cs-grey-800">
            <p className="text-lg my-4  text-cs-grey-800 px-2 ">
                 Welcome to CecureStream! This guide will walk you through the key features, from onboarding to utilizing for effective communication and collaboration. </p>
                
          </section>
        </div>

              <div className="mt-[40px]">
                <div className=" ">
                  <div>
                    <span
                      className="text-cs-grey-800 text-xl font-bold"
                      ref={onboarding}
                    >
                      1.<span className="ml-[5px] font-bold">Onboarding</span>
                    </span>
                  </div>
                  <div className="mt-[15px] ml-6" ref={gettingStartedSection}>
                    <span className="ml-[8px] font-semibold text-cs-grey-800 text-base font-lota leading-relaxed">
                      Getting Started
                    </span>
                  </div>
                </div>
                <div className="mt-[15px] ml-6">
                  <p className="ml-[8px] text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                    Visit our official webapp <a className="text-cs-purple-500" href="https://cecurestream.com/" target="_blank" rel="noopener noreferrer">https://cecurestream.com/</a>
                  </p>
                </div>
                <div className="mt-[10px] ml-6">
                  <Image src={landingPage} width={0} height={0} alt="Cecure stream landing Page" className="w-9/12" />
                </div>
                <div className="mt-[15px] ml-6" ref={firstTimerSetup}>
                  <p className="ml-[8px] mb-6 text-cs-grey-800 text-base font-bold font-lota leading-relaxed">
                    First-Time Setup
                  </p>
                  <ul className="pl-8">
                    <li className="mb-3 list-disc pl-[8px]">Ensure your device’s camera and microphone permissions are enabled.</li>
                    <li className="list-disc pl-[8px]">Test your internet connection and audio/video settings for a seamless experience.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-[40px]">
                <div className=" ">
                  <div ref={signUpDection}>
                    <span className="text-cs-grey-800 text-xl font-bold">
                      2
                      <span className="ml-[5px] font-bold">Sign Up</span>
                    </span>
                  </div>

                </div>

                <div className="mt-[15px] ml-6" ref={creatingAccountSection}>

                  <p className="ml-[5px] mb-4 font-semibold">Creating Your Account: </p>
                  <ul className="pl-8">
                    <li className="list-decimal mb-3">
                      Click on the <span className="font-bold">Sign-Up</span>  button on the homepage.</li>
                    <li className="mb-3 list-decimal">Fill in the required details:
                      <ul className="pl-3">
                        <li className="my-3 list-disc">First Name</li>
                        <li className="mb-3 list-disc">Last Name</li>
                        <li className="mb-3 list-disc">Email Address</li>
                        <li className="list-disc">Password (ensure it meets the security requirements)
                        </li>
                      </ul>
                    </li>
                    <li className="mb-3 list-decimal">Click on sign up
                    </li>
                    <li className="mb-3 list-decimal">Verify your account by inputting the OTP sent to your email address</li>
                    <li className="list-decimal">Once verified, log in to start using the platform.</li>
                  </ul>
                  <div className="mt-[15px]">
                    <Image src={signUpOne} width={0} height={0} alt="Cecure stream landing Page" className="mb-2" />
                    <Image src={signUpTwo} width={0} height={0} alt="Cecure stream landing Page" className="mb-2" />
                    <Image src={verifyAccount} width={0} height={0} alt="Cecure stream landing Page" className="mb-2" />

                        <Image src={signUpThree} width={0} height={0} alt="Cecure stream landing Page" />
                    
                  </div>
                </div>


              </div>

              <div className="mt-[40px]">
                <div className=" ">
                  <div ref={signInSection}>
                    <span className="text-cs-grey-800 text-xl font-bold">
                      3
                      <span className="ml-[5px] font-bold">
                        Sign in
                      </span>
                    </span>
                  </div>
                  <div className="mt-[15px] ml-6" ref={accessingAccountSection}>
                    <p className="ml-[5px] font-semibold mb-4">Accessing Your Account
                    </p>
                    <ul className="pl-[5px] mb-3">
                      <ol className="list-decimal mb-3">Click on the <span className="font-bold">Sign-in</span> button on the homepage.
                      </ol>
                      <ol className="list-decimal mb-3">Enter your registered email and password.
                      </ol>
                      <ol className="list-decimal mb-3">Optionally, enable the <span className="font-bold">Remember Me</span> checkbox for quicker access next time.
                      </ol>
                      <ol className="list-decimal mb-2">Click <span className="font-bold"> Login</span> to enter your dashboard.
                      </ol>
                    </ul>
                    <div className="mt-[15px]">
                      <Image src={signInOne} width={0} height={0} alt="Cecure stream landing Page" className="mb-2" />
                      <Image src={signInTwo} width={0} height={0} alt="Cecure stream landing Page" className="mb-2" />
                    </div>
                  </div>
                </div>

                <div className="mt-[15px] ml-6" ref={trobleshootingSection}>

                  <p className="ml-[5px] font-semibold mb-3">Troubleshooting </p>
                  <ul className="pl-8 mb-4">
                    <li className="mb-3 list-disc">If you forget your password, click on <span className="font-bold">Forgot Password?</span>  to reset it.
                    </li>
                    <li className="list-disc">Follow the instructions sent to your email to regain access.
                    </li>
                  </ul>
                  <div className="mt-[15px]">
                    <Image src={troubleShootOne} width={0} height={0} alt="Cecure stream landing Page" className="mb-2" />
                    <Image src={troubleShootTwo} width={0} height={0} alt="Cecure stream landing Page" className="mb-2" />
                  </div>
                </div>
              </div>
              <div className="mt-[40px]">
                <div className=" ">
                  <div ref={createSessionSection}>
                    <span className="text-cs-grey-800 text-xl font-bold">
                      4
                      <span className="ml-[5px]">
                        Create a New Session

                      </span>
                    </span>
                  </div>
                  <div className="mt-[15px] ml-6" ref={startingMeetingSection}>
                    <p className="ml-[5px] font-semibold mb-4">
                      Starting and Joining Meetings
                    </p>
                    <ul className="pl-[5px] mb-4">
                      <li className="mb-3 list-disc"><span className="font-bold">Start an Instant Meeting:</span> Click the <span className="font-bold">Create New Session</span> button and select <span className="font-bold">Instant Meeting</span> to begin a meeting immediately.
                      </li>
                      <li className="mb-3 list-disc"><span className="font-bold">Schedule for Later:</span> Choose <span className="font-bold">Schedule for Later,</span> set the date, time, and other details, then send invites to participants.
                      </li>
                      <li className=" list-disc"><span className="font-bold">Join an Ongoing Session:</span>  Input a meeting link or meeting ID in the <span className="font-bold">Join</span> field and click <span className="font-bold">Join</span> to enter an existing session.
                      </li>
                    </ul>
                    <div className="mt-[15px]">
                      <Image src={createNewSession} width={0} height={0} alt="Cecure stream create new session" className="mb-2" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[40px]">
                <div className=" " ref={switchCameraSection}>
                  <div>
                    <span className="text-cs-grey-800 text-xl  font-bold">
                      5
                      <span className="ml-[5px] font-bold">Turn On and Off Camera and Microphone</span>
                    </span>
                  </div>
                  <div className="mt-[15px] ml-6" ref={manageCameraSection}>
                    <p className="text-cs-grey-800 text-base ml-[5px] mb-3 font-semibold font-lotar leading-relaxed">
                      Managing Camera and Mic
                    </p>
                    <ul className="ml-[15px] mb-3">
                      <li className="mb-3 list-disc"><span className="font-bold">Turning On/Off Camera:</span> Click the camera icon on the toolbar during a meeting. A slash through the icon indicates it is off.
                      </li>
                      <li className="mb-3 list-disc"> <span className="font-bold">Turning On/Off Microphone: </span>  Click the microphone icon. A slash through the icon indicates it is muted.
                      </li>

                    </ul>

                  </div>
                </div>
                <div className="mt-[15px] ml-6" ref={tipSection}>
                  <p className="text-cs-grey-800 ml-[5px] first-letter:text-base font-semibold font-lotar leading-relaxed">

                    Tips                  </p>
                  <ul className="ml-[15px] mb-3">
                    <li className="mb-2 list-disc ml-[8px] text-cs-grey-800 text-base font-light font-lota leading-relaxed">Always mute your microphone when not speaking to reduce background noise.
                    </li>
                    <li className="mb-2 list-disc ml-[8px] text-cs-grey-800 text-base font-light font-lota leading-relaxed">Check your video frame before turning on the camera for a professional appearance.

                    </li>

                  </ul>
                  <div className="mt-[15px]">
                    <Image src={turnOnOffCamera} width={0} height={0} alt="Cecure stream create new session" className="mb-2" />
                  </div>

                </div>

              </div>
              <div className="mt-[40px]">
                <div className=" " ref={emojiReactionSection}>
                  <div>
                    <span className="text-cs-grey-800 text-xl font-bold">
                      6
                      <span className="ml-[5px] font-bold">Emoji Reactions</span>
                    </span>
                  </div>
                  <div className="mt-[15px] ml-6" ref={usingEmojiSection}>
                    <p className="text-cs-grey-800 ml-[5px] mb-3 text-base font-semibold font-lotar leading-relaxed">

                      Using Emoji
                    </p>
                    <ul className="mb-2 pl-3">
                      <li className="mb-2 list-disc">Access the emoji panel by clicking the React button in the toolbar.
                      </li>
                      <li className="mb-2 list-disc">Select from a variety of emojis (e.g., thumbs up, clapping, laughing) to express yourself non-verbally during meetings.
                      </li>
                      <li className="mb-2 list-disc">Reactions will briefly appear on your video tile or name tag.
                      </li>

                    </ul>
                    <div className="mt-[15px] ml-6">
                      <Image src={emojiReaction} width={0} height={0} alt="Cecure stream emoji reaction" className="mb-2" />
                    </div>
                  </div>

                </div>
              </div>

              <div className="mt-[40px]">
                <div className=" " ref={recordMeetingSection}>
                  <div>
                    <span className="text-cs-grey-800 text-xl font-bold">
                      7
                      <span className="ml-[5px] font-bold">
                        Recording Meetings
                      </span>
                    </span>
                  </div>
                  <div className="mt-[15px] ml-6 mb-4" ref={switchRecordingSection}>
                    <p className="text-cs-grey-800 ml-[5px] mb-3 text-base font-semibold font-lotar leading-relaxed">
                      Starting and Stopping a Recording
                    </p>
                    <ul className="mb-2 pl-6">
                      <li className="mb-3 list-decimal">Click the <span className="font-bold">Record</span>  button on the toolbar to start recording.
                      </li>
                      <li className="mb-3 list-decimal">A notification will inform all participants that the meeting is being recorded.
                      </li>
                      <li className="mb-2 list-decimal">To stop recording, click the <span className="font-bold"> Stop Recording</span> button.
                      </li>

                    </ul>
                  </div>

                  <div className="mt-[15px] ml-6" ref={accessRecordingSection}>
                    <p className="text-cs-grey-800 ml-[5px] mb-3 text-base font-semibold font-lotar leading-relaxed">

                      Accessing Recordings
                    </p>
                    <ul className="mb-4 pl-6">
                      <li className="mb-3 list-disc">Recordings will be saved to your account’s  <span className="font-bold">Recordings</span>  section or sent to your registered email, depending on your settings.
                      </li>
                      <li className="mb-2 list-disc">Ensure you have storage available for recordings.
                      </li>

                    </ul>
                    <div className="mt-8">
                      <Image src={recordMeetingOne} width={0} height={0} alt="Cecure stream emoji reaction" className="mb-2" />
                      <Image src={recordMeetingTwo} width={0} height={0} alt="Cecure stream emoji reaction" className="mb-2" />
                      <Image src={recordMeetingThree} width={0} height={0} alt="Cecure stream emoji reaction" className="mb-2" />

                    </div>
                  </div>
                  <div ref={noteSection} className="mt-[15px] ml-12">
                    <p className="text-cs-grey-800 mb-3 text-base font-semibold font-lotar leading-relaxed">
                      Note                    </p>
                    <ul className="mb-2 pl-3">
                      <li className="list-disc">Inform participants before starting a recording to ensure compliance with privacy guidelines.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-[40px]">
                <div className=" " ref={profileEditSection}>
                  <div>
                    <span className="text-cs-grey-800 text-xl font-bold">
                      8
                      <span className="ml-[5px]">
                        Profile Edit:{" "}
                      </span>
                    </span>
                  </div>
                  <div className="mt-[15px] ml-6" ref={updateProfileSection}>
                    <p className="text-cs-grey-800 ml-[5px] mb-4 text-base font-semibold font-lotar leading-relaxed">
                      Updating Your Profile
                    </p>
                    <ul className="mb-2 pl-5">
                      <li className="mb-3 list-decimal">Go to your account by clicking on your profile picture or name in the top-right corner.
                      </li>
                      <li className="mb-3 list-decimal">Select Edit Profile.
                      </li>
                      <li className="mb-3 list-decimal">
                        Update your details:

                        <ul className="my-3 pl-4">
                          <li className="list-disc mb-2">Change Image
                          </li>
                          <li className="list-disc mb-2">First and last name
                          </li>
                          <li className="list-disc mb-2">Email Address
                          </li>

                        </ul>
                      </li>
                      <li className="mb-2 list-decimal">Click <span className="font-bold">Save Changes</span>  to apply updates.
                      </li>

                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
        </>
      }
    </>
  );
}
export default TermsofEngage