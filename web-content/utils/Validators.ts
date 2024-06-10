
export const ValidateEmail = (email: string) => {
  if (!email && email.length >= 4) return false
  // let regex = /^\w+([\W]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  let regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
  return regex.test(email)
}
/**
 * Validates if the input string meets the following criteria:
 * - At least 8 characters long
 * - Contains at least one special character
 * - Contains at least one capital letter
 * - Contains at least one number
 * 
 * @param input - The string to validate
 * @returns A boolean indicating whether the input meets the criteria
 */
export const ValidatePassword = (input: string): boolean => {
  const lengthRegex = /.{8,}/; // At least 8 characters
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/; // At least one special character
  const capitalLetterRegex = /[A-Z]/; // At least one capital letter
  const numberRegex = /[0-9]/; // At least one number

  return lengthRegex.test(input) &&
    specialCharRegex.test(input) &&
    capitalLetterRegex.test(input) &&
    numberRegex.test(input);
}



export const ValidateText = (text: string) => {
  if (text && text.length >= 3) {
    return text;
  }
  return false;
};


/**
 * Validates if the input string matches the pattern 'pub-ldj-ftsg'.
 * @param str - The string to validate.
 * @returns `true` if the string matches the pattern, otherwise `false`.
 */
export const ValidateLink = (str: string): boolean => {
  // Define the regular expression pattern
  const pattern = /^[a-z]{3}-[a-z]{3}-[a-z]{4}$/i;

  // Test the string against the pattern
  return pattern.test(str);
}


/**
 * Checks if all values in an object are true.
 * @param obj - The object to check.
 * @returns `true` if all values are true, otherwise `false`.
 */
export const activateButton = (obj: Record<string, boolean>): boolean => {
  return Object.values(obj).every(value => value === true);
}


export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-z]{8}-[0-9a-z]{4}-[1-5][0-9a-z]{3}-[89ab][0-9a-z]{3}-[0-9a-z]{12}$/i;
  // /^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/i
  return uuidRegex.test(uuid);
}

export function extractAfterLastSlashOrFull(input: string): string {
  const lastSlashIndex = input.lastIndexOf('/');
  if (lastSlashIndex !== -1) {
    return input.substring(lastSlashIndex + 1);
  }
  return input;
}




//  const fetchData = async () => {
//   try {
//     const response = await fetch('https://dibxzaa24vvschnzknjn7m65pe0dvnlh.lambda-url.us-east-1.on.aws/',
//       {
//         mode: 'cors',
//         // headers: {
//         //   'Access-Control-Allow-Origin': '*'
//         // }
//       });

//     const data = await response.json();
//     console.log(response.status);
//     console.log(data);

//     const meetingSessionConfiguration = new MeetingSessionConfiguration(data.Meeting, data.Attendee);

//     // Create a `MeetingSession` using `join()` function with the `MeetingSessionConfiguration`
//     await meetingManager.join(meetingSessionConfiguration);

//     // At this point you could let users setup their devices, or by default
//     // the SDK will select the first device in the list for the kind indicated
//     // by `deviceLabels` (the default value is DeviceLabels.AudioAndVideo)
//     //...

//     // Start the `MeetingSession` to join the meeting
//     await meetingManager.start();
//   } catch (error) {
//     console.error("An exception occurred:", error);
//     // Handle the exception here
//   }
// };