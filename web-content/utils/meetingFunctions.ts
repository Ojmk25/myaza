export const getRemoteInitials = (input: string): string => {
  if (!input) {
    return "";
  }

  const words = input.split(" ");

  // Get the first letter of the first word and the first letter of the last word
  const firstInitial = words[0].charAt(0);
  const lastInitial = words[words.length - 1].charAt(0);

  return `${firstInitial}${lastInitial}`;
};

export function timeToUnixTimestamp(time: string): number {
  // Create a regex to parse the 24-hour time string
  const timeRegex = /^(\d{2}):(\d{2})$/;
  const match = time.match(timeRegex);

  if (!match) {
    throw new Error("Invalid time format");
  }

  // Extract hours and minutes
  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);

  // Get today's date
  const now = new Date();
  now.setHours(hours, minutes, 0, 0);

  // Return Unix timestamp
  return Math.floor(now.getTime() / 1000);
}

// export const validateMeetingIdString = (str: string) => {
//   const hexPattern = /^[0-9a-fA-F]{8}$/;
//   return hexPattern.test(str);
// };

export const validateMeetingIdString = (input: string) => {
  const hexPattern = /^[0-9a-fA-F]{8}$/;

  // Check if the input is a URL containing "/meet/hexPattern"
  const urlPattern = /\/meet\/([0-9a-fA-F]{8})/;

  if (input.includes("http") && input.includes("/meet/")) {
    // Try to extract the hex pattern from the URL
    const match = input.match(urlPattern);
    if (match && match[1]) {
      return hexPattern.test(match[1]);
    }
    return false;
  } else {
    // Validate the string directly as a meeting ID
    return hexPattern.test(input);
  }
};

export function getIdFromArn(arn: string) {
  if (!arn) return;
  // Split the string by the "/" character and return the last part
  const parts = arn.split("/");
  return parts[parts.length - 1];
}
