import { getApiPathNoVersion } from "@/config";
import * as http from "./httpServices";

const apiRegisterForCourse = getApiPathNoVersion(
  "open",
  "/register-training-course"
);
const apiRegisterRestart = getApiPathNoVersion(
  "open",
  "/aws-restart-registration"
);
const apiRegisterPartners = getApiPathNoVersion(
  "open",
  "/aws-restart-partners"
);




// export const clickStreamApi = async (data) => {
//   const clickDate = new Date();

//   const clickTime = `${clickDate.getFullYear()}-${clickDate.getMonth() + 1
//     }-${clickDate.getDate()} ${clickDate.getHours()}:${clickDate.getMinutes()}`;

//   const encoded = btoa(JSON.stringify({ ...data, clickTime: clickTime }));

//   try {
//     return await http.apiCall.post(
//       "https://api.cecurepractice.link/clickstream",
//       {
//         StreamName: "demo-stream",
//         Data: encoded,
//         PartitionKey: uuidv4(),
//       }
//     );
//   } catch (error) {
//     return error.message;
//   }
// };



//Get CorporateTrainingCourse
// export const GetCorporateCourseApi = async (id) => {
//   try {
//     return await http.apiCall.get(
//       `${apiGetCourse}?provider=CORPORATE&course_id=${id}`
//     );
//   } catch (error) {
//     return error.message;
//   }
// };

// // List CorporateTrainingCourse
// export const ListCorporateCourseApi = async (params = "") => {
//   try {
//     const response =
//       params === ""
//         ? await http.apiCall.get(`${apiListCourses}?provider=CORPORATE`)
//         : await http.apiCall.get(
//           `${apiListCourses}?provider=CORPORATE${params}`
//         );
//     return response;
//   } catch (error) {
//     return error.message;
//   }
// };


// // Register for Course
// export const registerForCourse = async (data) => {
//   /***
//    * {
//   "Program": "AWS", # AWS, ZERO, CORPORATE
//   "Course": "AWS Cloud Practitioner Essentials",
//   "Cost": "$150",
//   "FirstName": "john",
//   "LastName": "doe",
//   "Email": "john.doe@cecureintel.com"
//   }
//    */
//   try {
//     return await http.apiCall.post(`${apiRegisterForCourse}`, data);
//   } catch (error) {
//     return error.message;
//   }
// };


