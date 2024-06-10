export function processString(input: string): string {
  // Find the last comma
  const lastCommaIndex = input.lastIndexOf(',');
  if (lastCommaIndex === -1) {
    // If there's no comma, return the original string
    return input;
  }

  // Remove the substring after the last comma
  const stringWithoutLastPart = input.substring(0, lastCommaIndex);

  // Replace remaining commas with spaces
  const resultString = stringWithoutLastPart.replace(/,/g, ' ');

  return resultString;
}


export const getRemoteInitials = (input: string): string => {
  const words = input.split(' ');

  // Get the first letter of each word and join them into a single string
  const initials = words.map(word => word.charAt(0)).join('');

  return initials;
}

export function timeToUnixTimestamp(time: string): number {
  // Create a regex to parse the 24-hour time string
  const timeRegex = /^(\d{2}):(\d{2})$/;
  const match = time.match(timeRegex);

  if (!match) {
    throw new Error('Invalid time format');
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