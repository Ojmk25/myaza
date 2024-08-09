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

export const validateMeetingIdString = (str: string) => {
  const hexPattern = /^[0-9a-fA-F]{8}$/;
  return hexPattern.test(str);
};
