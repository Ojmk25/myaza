export const getRemoteInitials = (input: string): string => {
  if (!input) {
    return "";
  }
  const words = input.split(" ");

  // Get the first letter of each word and join them into a single string
  const initials = words.map((word) => word.charAt(0)).join("");

  return initials;
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

export const validateMeetingIdString = (str: string) => {
  const hexPattern = /^[0-9a-fA-F]{8}$/;
  return hexPattern.test(str);
};
