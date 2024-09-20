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

export function getSubdomain(host: string) {
  // Split the hostname into parts in array
  const hostnameParts = host.split(".");
  // If the hostname has more than two parts, take out "www" if it's in the array return the first part (the subdomain)
  if (hostnameParts.length > 3) {
    const filterOut = hostnameParts.filter((item) => item !== "www");
    console.log(filterOut);
    return filterOut[0];
  }

  // If there is no subdomain, return an empty string
  return "";
}

export const getApiBaseURL = () => {
  let apiUrl = "https://api.dev.cecurestream.com";

  if (typeof window !== "undefined") {
    sessionStorage.setItem("cecurestream_meetingJoiner", "no");
    const host = window.location.host;
    const subDomain = getSubdomain(host);

    // if (!host.includes("localhost") && !host.includes("dev")) {
    //   apiUrl = "https://api.cecurestream.com";
    //   if (host.includes("test")) {
    //     apiUrl = "https://api.test.cecurestream.com";
    //   }
    //   if (host.includes("pprod")) {
    //     apiUrl = "https://api.pprod.cecurestream.com";
    //   }
    // }

    if (!host.includes("localhost")) {
      apiUrl = "https://api.cecurestream.com";
      if (subDomain !== "") {
        apiUrl = `https://api.${getSubdomain(host)}.cecurestream.com`;
      }
    }
  }

  return apiUrl;
};
