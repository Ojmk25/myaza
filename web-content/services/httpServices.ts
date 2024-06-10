import axios from "axios";

axios.interceptors.response.use(null, (err) => {
  const expectedError = err.response && err.response.status >= 400;
  if (!expectedError) {
    console.log(err);
    console.error("An unexpected error occurred");
  }
  return Promise.reject(err);
});

const apiAxios = (url: string) => {
  axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
      crossDomain: true,
    },
  });
};


// const accessToken = () => {
//   const authToken = localStorage.getItem('cecureStreamAuthToken')
//   if (authToken) {
//     const parsedAuthToken = JSON.parse(authToken)
//     return parsedAuthToken?.cecureStreamAcToken
//   }

// }



// const axiosInstance = axios.create({
//   baseURL: 'https://api.dev.cecurecast.com',
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: accessToken(),
//   },
//   // other configurations
// })

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.log('call the refresh token api here')
//       console.log(error)
//       // Handle 401 error, e.g., redirect to login or refresh token
//     }
//     return Promise.reject(error)
//   },
// )

// export default axiosInstance


export const apiCall = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  api: apiAxios,
};


// export async function fetchUserData() {
//   try {
//     const response = await axiosInstance.post("/meeting/v1/instant-meeting", {});
//     console.log('User Data:', response.data);
//   } catch (error) {
//     console.error('An error occurred:', error.message);
//     // Here, you might handle errors coming from the backend
//   }
// }
