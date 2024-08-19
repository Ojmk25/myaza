// import { useEffect, useState } from "react";

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
