import { apiBase, getApiPath } from "@/config";
import axios, { AxiosRequestConfig } from "axios";
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const refreshTokenUrl = getApiPath("open", "refresh-token");

axios.interceptors.response.use(null, (err) => {
  const expectedError = err.response && err.response.status >= 400;
  if (!expectedError) {
    // console.log(err);
    console.error("An unexpected error occurred");
  }
  return Promise.reject(err);
});

const apiAxios = axios.create({
  baseURL: apiBase,
  headers: {
    "Content-Type": "application/json",
    // crossDomain: true,
  },
});

apiAxios.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem("cecureStreamAcToken");
    if (accessToken) {
      const parsedAccessToken = JSON.parse(accessToken);
      request.headers["Authorization"] = parsedAccessToken;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// apiAxios.interceptors.response.use(
//   async (response) => response, // Directly return successful responses.
//   async (error) => {
//     console.log(error);

//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
//       try {
//         const refreshToken = localStorage.getItem("cecureStreamRefToken"); // Retrieve the stored refresh token.
//         // Make a request to your auth server to refresh the token.
//         const response = await axios.post(refreshTokenUrl, {
//           refreshToken,
//         });
//         // const { access_token, refreshToken: newRefreshToken } = response.data;
//         const { access_token } = response.data;
//         // Store the new access and refresh tokens.
//         localStorage.setItem("cecureStreamAcToken", access_token);
//         // localStorage.setItem('refreshToken', newRefreshToken);
//         // Update the authorization header with the new access token.
//         apiAxios.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${access_token}`;
//         return apiAxios(originalRequest); // Retry the original request with the new access token.
//       } catch (refreshError) {
//         // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
//         console.error("Token refresh failed:", refreshError);
//         localStorage.removeItem("cecureStreamAuthToken");
//         localStorage.removeItem("cecureStreamAcToken");
//         localStorage.removeItem("cecureStreamRefToken");
//         // localStorage.removeItem('refreshToken');
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error); // For all other errors, return the error as is.
//   }
// );

export const apiCall = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  api: apiAxios,
};

// Function to get the access token expiration time
export const getTokenExpirationTime = () => {
  const token = global?.window?.localStorage?.getItem("cecureStreamAcToken");
  if (!token || token === undefined) return null;

  const tokenParts = token.split(".");
  if (tokenParts.length !== 3) return null; // Ensure token has three parts

  try {
    const payload = JSON.parse(atob(tokenParts[1]));
    return payload.exp * 1000; // Convert to milliseconds
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

// Function to refresh the access token
export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("cecureStreamRefToken");
    if (refreshToken) {
      const parsedAccessToken = JSON.parse(refreshToken);
      const response = await apiCall.post(refreshTokenUrl, {
        refresh_token: parsedAccessToken,
      });
      const { access_token } = response?.data.body.data;
      localStorage.setItem("cecureStreamAcToken", JSON.stringify(access_token));
      // localStorage.setItem("cecureStreamAcToken", access_token);
      sessionStorage.setItem("cecureStreamAcToken", access_token);
      console.log("Token refreshed successfully");
    }
  } catch (error) {
    console.error("Failed to refresh token", error);
    // Handle token refresh failure, e.g., redirect to login
    localStorage.removeItem("cecureStreamAcToken");
    localStorage.removeItem("cecureStreamRefToken");
    localStorage.removeItem("cecureStreamAuthToken");
    window.location.href = "/auth/login";
  }
};

// Function to check and refresh the token if necessary
const checkAndRefreshToken = () => {
  const tokenExpirationTime = getTokenExpirationTime();
  const now = Date.now();
  // Refresh the token if it expires within the next hour (3600000 ms)
  if (tokenExpirationTime && tokenExpirationTime < now + 3600000) {
    refreshToken();
  }
};

// Set up an interval to check the token every hour (3600000 ms)
setInterval(checkAndRefreshToken, 3600000);

// Optionally, call the checkAndRefreshToken function once at the start

setTimeout(checkAndRefreshToken, 2000);
