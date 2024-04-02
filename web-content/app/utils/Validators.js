import { MeetingSessionConfiguration } from "amazon-chime-sdk-js";




export const ValidateEmail = (email) => {
  if (!email && email.length >= 4) return false
  // let regex = /^\w+([\W]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  let regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
  return regex.test(email)
}

export const ValidatePassword = (password) => {
  if (password && password.length >= 4) {
    return password;
  }
  return false;
};

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