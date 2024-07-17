/**
 * Gets the domain so as to determine the environment.
 * @returns `string` if windows object is available, otherwise `false`.
 */

export const subDomain = (): string | null => {
  /***
   * Returns SubDomains off the URL
   */
  if (typeof window !== "undefined") {
    console.log(window.location.host);
    sessionStorage.setItem("cecurestream_meetingJoiner", "no");

    const hostname = window.location.hostname;
    return hostname.split(".")[0];
  } else {
    console.log("window still undefined");
  }
  return null;
};
