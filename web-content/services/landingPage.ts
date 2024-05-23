import { getApiPath } from "@/config";
import * as http from "./httpServices";

const awesRapidRamp = getApiPath("open", "/aws-rapid-ramp-credit");
const awsWellArchitected = getApiPath("open", "/aws-well-architected-review");
const awesReseller = getApiPath("open", "/aws-reseller");

// export const awesRapidRampApi = async (data) => {
//   try {
//     return await http.apiCall.post(`${awesRapidRamp}`, data);
//   } catch (error) {
//     return error.message;
//   }
// };
