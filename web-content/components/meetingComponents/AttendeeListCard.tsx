"use client";
import { getRemoteInitials } from "@/utils/meetingFunctions";
import RaisedHand from "./RaisedHand";
import { useAppContext } from "@/context/StoreContext";
import Image from "next/image";
import {
  useActiveSpeakersState,
  useAttendeeAudioStatus,
  useAttendeeStatus,
} from "amazon-chime-sdk-component-library-react";
// import { VisualizerComp } from "./MeetingCardAudio";
import { useEffect, useRef, useState } from "react";
import { MicrophoneSlash1 } from "iconsax-react";
import ShowVisualizer from "./ShowVisualizer";

export const AttendeeListCard = ({
  attendeeId,
  externalID,
  audioState,
}: {
  attendeeId: string;
  externalID: any;
  audioState: JSX.Element;
}) => {
  const { appState } = useAppContext();
  const { meetingAttendees } = appState.sessionState;
  const attendeeDetailItems = meetingAttendees.find(
    (att) => att.user_id === externalID
  );
  // const attendeeDetailItems = Array.isArray(meetingAttendees)
  //   ? meetingAttendees.find((att) => att.user_id === externalID)
  //   : null; // Return null or handle the case where it's not an array

  const { videoEnabled, sharingContent, muted } = useAttendeeStatus(attendeeId);
  const { muted: anotherStatusMute, signalStrength } =
    useAttendeeAudioStatus(attendeeId);
  const activeSpeakers = useActiveSpeakersState();

  console.log(
    externalID,
    meetingAttendees,
    appState.sessionState,
    "video status is",
    videoEnabled,
    "content sharing is",
    sharingContent,
    "the audio status of the user",
    anotherStatusMute,
    activeSpeakers
  );

  const targetRef = useRef<HTMLDivElement | null>(null);
  const [localAudio, setLocalAudio] = useState<boolean>();

  useEffect(() => {
    const targetElement = targetRef.current;

    if (!targetElement) return;

    // Function to call when class changes
    const onClassChange = () => {
      // Call any function here when class changes
      if (targetElement.className.includes("active")) {
        setLocalAudio(false);
      } else {
        setLocalAudio(true);
      }
    };

    // Set up the MutationObserver
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          onClassChange(); // Call function when class changes
        }
      }
    });

    // Start observing the target element for class changes
    observer.observe(targetElement, {
      attributes: true, // Observe attribute changes
      attributeFilter: ["class"], // Specifically observe the 'class' attribute
    });

    // Clean up the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  const AudioComp = () => {
    return (
      <>
        {localAudio || localAudio === undefined ? (
          <div
            className={`flex justify-center items-end p-[6px] bg-transparent rounded-full w-[30px] h-[30px]`}
          >
            <MicrophoneSlash1 size="18" color="#5E29B7" />
          </div>
        ) : (
          <div className="flex justify-center items-center p-[6px] bg-[#6c3ec2] rounded-full w-[30px] h-[30px] gap-x-[2px]">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="bar bg-cs-grey-50 transition-all"
                style={{ width: "4px", height: "3px" }}
              />
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className=" flex justify-between items-center py-3 border-b border-solid border-b-[#EFEDED]">
      <div className=" flex items-center gap-x-2 overflow-hidden max-w-full whitespace-nowrap">
        {attendeeDetailItems?.picture && attendeeDetailItems?.picture !== "" ? (
          <Image
            src={attendeeDetailItems.picture}
            alt={attendeeDetailItems.full_name}
            width={32}
            height={32}
            className=" rounded-full w-8 h-8 min-w-8 object-cover"
          />
        ) : (
          <div className=" bg-cs-grey-800 w-[30px] h-[30px] min-w-[30px] rounded-full flex justify-center items-center text-cs-grey-50 uppercase text-sm">
            {getRemoteInitials(attendeeDetailItems?.full_name as string)}
          </div>
        )}

        <h4 className=" text-cs-grey-dark font-medium text-sm overflow-hidden text-ellipsis capitalize">
          {externalID && (attendeeDetailItems?.full_name as string)}
        </h4>
      </div>
      <div className=" flex items-center gap-x-1">
        <RaisedHand
          attendeeId={attendeeId}
          noBackground
          externalId={externalID}
        />
        <div className={`external-visualizer-${attendeeId}`} ref={targetRef}>
          {/* <AudioComp /> */}
          <ShowVisualizer
            chimeAttendeeId={attendeeId}
            externalUserId={externalID}
            noBackground
          />
        </div>
      </div>
    </div>
  );
};

// {
//   "statusCode": 200,
//   "body": {
//       "status": "Success",
//       "message": "Successfully fetched attendees",
//       "data": {
//           "attendees": [
//               {
//                   "user_id": "ext_user_Andrew_Sisipenzi_ba",
//                   "full_name": "Andrew Sisipenzi",
//                   "picture": null
//               },
//               {
//                   "user_id": "user_1fcfda80-1286-441a-b63a-0d36972cb886",
//                   "full_name": "Abidemi Ogedengbe",
//                   "picture": "https://dw97yo6s8re7n.cloudfront.net/profile-pictures/user_1fcfda80-1286-441a-b63a-0d36972cb886/22e8a544-1724240063.png"
//               },
//               {
//                   "user_id": "ext_user_solomon_ebigwei_3e",
//                   "full_name": "solomon ebigwei",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Andrew_Sisipenzi_39",
//                   "full_name": "Andrew Sisipenzi",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Emmanuel_Okororie_59",
//                   "full_name": "Emmanuel Okororie",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Dasola_Dasola_80",
//                   "full_name": "Dasola Dasola",
//                   "picture": null
//               },
//               {
//                   "user_id": "user_1e6916c4-788e-4560-8969-fcd6b049a989",
//                   "full_name": "Tosin Tomori",
//                   "picture": "https://dw97yo6s8re7n.cloudfront.net/profile-pictures/user_1e6916c4-788e-4560-8969-fcd6b049a989/4db6abf3-1728998860.jpeg"
//               },
//               {
//                   "user_id": "ext_user_Emmanuel_Second_62",
//                   "full_name": "Emmanuel Second",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Andrew_Sisipenzi_6b",
//                   "full_name": "Andrew Sisipenzi",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Omolomo_Tpain_d9",
//                   "full_name": "Omolomo Tpain",
//                   "picture": null
//               },
//               {
//                   "user_id": "user_4536ba13-2ad7-45aa-b126-f60d0ab94583",
//                   "full_name": "Emmanuel Kalu",
//                   "picture": "https://dw97yo6s8re7n.cloudfront.net/profile-pictures/user_4536ba13-2ad7-45aa-b126-f60d0ab94583/2d7811f9-1724241178.jpeg"
//               },
//               {
//                   "user_id": "ext_user_Andrew_Sisipenzi_18",
//                   "full_name": "Andrew Sisipenzi",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Abiola_Ajayi_09",
//                   "full_name": "Abiola Ajayi",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Drew_Six_4b",
//                   "full_name": "Drew Six",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Opeyemi_Ajayi_51",
//                   "full_name": "Opeyemi Ajayi",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Dasola_Dasola_5a",
//                   "full_name": "Dasola Dasola",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Abiola_Ajayi_93",
//                   "full_name": "Abiola Ajayi",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Bolarinwa_Akinjo_65",
//                   "full_name": "Bolarinwa Akinjo",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Adeola_Adekola_39",
//                   "full_name": "Adeola Adekola",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Qazeem_Adeniyi_de",
//                   "full_name": "Qazeem Adeniyi",
//                   "picture": null
//               }
//           ],
//           "next_token": "eyJAQHRva2VuIjoiZXlKcFpDSTZleUp6SWpvaVlqVm1PR0V6WkRndE1tWTJNeTFsWVRjNExXRTROMkl0WldVeVpHSTJZMlE1T1RJMEluMHNJbU5wWkNJNmV5SnpJam9pTTJWbVltTTVORGd0TmpVNFpTMDBPREF4TFdFek1USXRaV0kyTmpOaU5Ea3lOekV6SW4xOSJ9"
//       }
//   }
// }

// {
//   "statusCode": 200,
//   "body": {
//       "status": "Success",
//       "message": "Successfully fetched attendees",
//       "data": {
//           "attendees": [
//               {
//                   "user_id": "ext_user_Chinenye_Florence_1b",
//                   "full_name": "Chinenye Florence",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Nenye_Florence_ef",
//                   "full_name": "Nenye Florence",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Godbless_Agbedeyi_34",
//                   "full_name": "Godbless Agbedeyi",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Kehinde_Alagbe_c4",
//                   "full_name": "Kehinde Alagbe",
//                   "picture": null
//               }
//           ],
//           "next_token": null
//       }
//   }
// }

// {
//   "statusCode": 200,
//   "body": {
//       "status": "Success",
//       "message": "Successfully fetched attendees",
//       "data": {
//           "attendees": [
//               {
//                   "user_id": "ext_user_Qazeem_Adeniyi_de",
//                   "full_name": "Qazeem Adeniyi",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Chinenye_Florence_1b",
//                   "full_name": "Chinenye Florence",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Nenye_Florence_ef",
//                   "full_name": "Nenye Florence",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Godbless_Agbedeyi_34",
//                   "full_name": "Godbless Agbedeyi",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Kehinde_Alagbe_c4",
//                   "full_name": "Kehinde Alagbe",
//                   "picture": null
//               }
//           ],
//           "next_token": null
//       }
//   }
// }

// 0
// :
// {user_id: 'ext_user_Andrew_Sisipenzi_ba', full_name: 'Andrew Sisipenzi', picture: null}
// 1
// :
// {user_id: 'user_1fcfda80-1286-441a-b63a-0d36972cb886', full_name: 'Abidemi Ogedengbe', picture: 'https://dw97yo6s8re7n.cloudfront.net/profile-pictu…86-441a-b63a-0d36972cb886/22e8a544-1724240063.png'}
// 2
// :
// {user_id: 'ext_user_Kenny_Alagbe_fa', full_name: 'Kenny Alagbe', picture: null}
// 3
// :
// {user_id: 'ext_user_solomon_ebigwei_3e', full_name: 'solomon ebigwei', picture: null}
// 4
// :
// {user_id: 'ext_user_Andrew_Sisipenzi_39', full_name: 'Andrew Sisipenzi', picture: null}
// 5
// :
// {user_id: 'ext_user_Emmanuel_Okororie_59', full_name: 'Emmanuel Okororie', picture: null}
// 6
// :
// {user_id: 'ext_user_Dasola_Dasola_80', full_name: 'Dasola Dasola', picture: null}
// 7
// :
// {user_id: 'user_1e6916c4-788e-4560-8969-fcd6b049a989', full_name: 'Tosin Tomori', picture: 'https://dw97yo6s8re7n.cloudfront.net/profile-pictu…e-4560-8969-fcd6b049a989/4db6abf3-1728998860.jpeg'}
// 8
// :
// {user_id: 'ext_user_Emmanuel_Second_62', full_name: 'Emmanuel Second', picture: null}
// 9
// :
// {user_id: 'ext_user_Andrew_Sisipenzi_6b', full_name: 'Andrew Sisipenzi', picture: null}
// 10
// :
// {user_id: 'ext_user_Omolomo_Tpain_d9', full_name: 'Omolomo Tpain', picture: null}
// 11
// :
// {user_id: 'user_4536ba13-2ad7-45aa-b126-f60d0ab94583', full_name: 'Emmanuel Kalu', picture: 'https://dw97yo6s8re7n.cloudfront.net/profile-pictu…7-45aa-b126-f60d0ab94583/2d7811f9-1724241178.jpeg'}
// 12
// :
// {user_id: 'ext_user_Andrew_Sisipenzi_18', full_name: 'Andrew Sisipenzi', picture: null}
// 13
// :
// {user_id: 'ext_user_Abiola_Ajayi_09', full_name: 'Abiola Ajayi', picture: null}
// 14
// :
// {user_id: 'ext_user_Drew_Six_4b', full_name: 'Drew Six', picture: null}
// 15
// :
// {user_id: 'ext_user_Opeyemi_Ajayi_51', full_name: 'Opeyemi Ajayi', picture: null}
// 16
// :
// {user_id: 'ext_user_Dasola_Dasola_5a', full_name: 'Dasola Dasola', picture: null}
// 17
// :
// {user_id: 'ext_user_Abiola_Ajayi_93', full_name: 'Abiola Ajayi', picture: null}
// 18
// :
// {user_id: 'ext_user_Bolarinwa_Akinjo_65', full_name: 'Bolarinwa Akinjo', picture: null}
// 19
// :
// {user_id: 'ext_user_Adeola_Adekola_39', full_name: 'Adeola Adekola', picture: null}

// 0
// :
// {user_id: 'ext_user_Qazeem_Adeniyi_de', full_name: 'Qazeem Adeniyi', picture: null}
// 1
// :
// {user_id: 'ext_user_Chinenye_Florence_1b', full_name: 'Chinenye Florence', picture: null}
// 2
// :
// {user_id: 'ext_user_Nenye_Florence_ef', full_name: 'Nenye Florence', picture: null}
// 3
// :
// {user_id: 'ext_user_Godbless_Agbedeyi_34', full_name: 'Godbless Agbedeyi', picture: null}
// 4
// :
// {user_id: 'ext_user_Kehinde_Alagbe_c4', full_name: 'Kehinde Alagbe', picture: null}

// {
//   "statusCode": 200,
//   "body": {
//       "status": "Success",
//       "message": "Successfully fetched attendees",
//       "data": {
//           "attendees": [
//               {
//                   "user_id": "ext_user_Qazeem_Adeniyi_de",
//                   "full_name": "Qazeem Adeniyi",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Chinenye_Florence_1b",
//                   "full_name": "Chinenye Florence",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_solomon_ebigwei_b8",
//                   "full_name": "solomon ebigwei",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Nenye_Florence_ef",
//                   "full_name": "Nenye Florence",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Godbless_Agbedeyi_34",
//                   "full_name": "Godbless Agbedeyi",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Kehinde_Alagbe_c4",
//                   "full_name": "Kehinde Alagbe",
//                   "picture": null
//               },
//               {
//                   "user_id": "ext_user_Olusola_Ijimade_f7",
//                   "full_name": "Olusola Ijimade",
//                   "picture": null
//               }
//           ],
//           "next_token": null
//       }
//   }
// }

// 0
// :
// {user_id: 'ext_user_Adeola_Adekola_39', full_name: 'Adeola Adekola', picture: null}
// 1
// :
// {user_id: 'ext_user_Qazeem_Adeniyi_de', full_name: 'Qazeem Adeniyi', picture: null}
// 2
// :
// {user_id: 'ext_user_Chinenye_Florence_1b', full_name: 'Chinenye Florence', picture: null}
// 3
// :
// {user_id: 'ext_user_solomon_ebigwei_b8', full_name: 'solomon ebigwei', picture: null}
// 4
// :
// {user_id: 'ext_user_Nenye_Florence_ef', full_name: 'Nenye Florence', picture: null}
// 5
// :
// {user_id: 'ext_user_Godbless_Agbedeyi_34', full_name: 'Godbless Agbedeyi', picture: null}
// 6
// :
// {user_id: 'ext_user_Kehinde_Alagbe_c4', full_name: 'Kehinde Alagbe', picture: null}
// 7
// :
// {user_id: 'ext_user_Olusola_Ijimade_f7', full_name: 'Olusola Ijimade', picture: null}

// // sessionState.meetingAttendees is not iterable is the error that occured when the host ended the meeting
