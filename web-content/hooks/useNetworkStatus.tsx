// import { useEffect, useState } from "react";

import { useAttendeeStatus } from "amazon-chime-sdk-component-library-react";
import { Discover } from "iconsax-react";
import { useEffect, useState } from "react";

// const useNetworkInformation = () => {
//   const [networkState, setNetworkState] = useState({
//     isOnline: navigator.onLine,
//     effectiveType: "",
//     downlink: 0,
//     rtt: 0,
//   });

//   useEffect(() => {
//     const updateNetState = () => {
//       const connection = navigator;
//       if (connection) {
//         setNetworkState({
//           isOnline: navigator.onLine,
//           effectiveType: connection.effectiveType,
//           downlink: connection.downlink,
//           rtt: connection.rtt,
//         });
//       }
//     };
//     window.addEventListener("load", updateNetState);
//     window.addEventListener("online", updateNetState);
//     window.addEventListener("offline", updateNetState);

//     return () => {
//       window.removeEventListener("load", updateNetState);
//       window.removeEventListener("online", updateNetState);
//       window.removeEventListener("offline", updateNetState);
//     };
//   }, []);

//   return networkState;
// };

// export default useNetworkInformation;

// Custom hook to get the status of an attendee
// const useCustomAttendeeStatus = (attendeeId: string) => {
//   const { videoEnabled, sharingContent, muted } = useAttendeeStatus(attendeeId); // Use the original hook
//   const [status, setStatus] = useState({ video: false, audio: false });

//   useEffect(() => {
//     // Update the status whenever the attendee status changes
//     setStatus({
//       video: videoEnabled || sharingContent,
//       audio: !muted,
//     });
//   }, [videoEnabled, sharingContent, muted]);

//   // return <>status</>  ; // Return the combined status
//   // return <>{status}</>;
//   console.log(status);
// };

// export default useCustomAttendeeStatus;
