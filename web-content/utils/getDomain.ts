// /**
//  * Gets the domain so as to determine the environment.
//  * @returns `string` if windows object is available, otherwise `false`.
//  */

// export const subDomain = (): string | null => {
//   /***
//    * Returns SubDomains off the URL
//    */

//   if (typeof window !== "undefined") {
//     console.log(window.location.host);
//     sessionStorage.setItem("cecurestream_meetingJoiner", "no");

//     const hostname = window?.location.hostname;
//     console.log(hostname);
//     return hostname.split(".")[0];
//     hostname;
//   } else {
//     console.log("window still undefined");
//   }
//   return null;
// };

export const getApiBaseURL = () => {
  let apiUrl = "https://api.dev.cecurestream.com";

  if (typeof window !== "undefined") {
    sessionStorage.setItem("cecurestream_meetingJoiner", "no");
    const host = window.location.host;

    console.log(host, "host");

    if (!host.includes("localhost") && !host.includes("dev")) {
      apiUrl = "https://api.cecurestream.com";
    }
  }

  return apiUrl;
};
