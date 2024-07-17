import { apiBase, getApiPath } from "@/config";
import axios from "axios";

const refreshTokenUrl = getApiPath("core", "refresh-token");

axios.interceptors.response.use(null, (err) => {
  const expectedError = err.response && err.response.status >= 400;
  if (!expectedError) {
    console.log(err);
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

apiAxios.interceptors.response.use(
  (response) => response, // Directly return successful responses.
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        const refreshToken = localStorage.getItem("cecureStreamRefToken"); // Retrieve the stored refresh token.
        // Make a request to your auth server to refresh the token.
        const response = await axios.post(refreshTokenUrl, {
          refreshToken,
        });
        // const { access_token, refreshToken: newRefreshToken } = response.data;
        const { access_token } = response.data;
        // Store the new access and refresh tokens.
        localStorage.setItem("cecureStreamAcToken", access_token);
        // localStorage.setItem('refreshToken', newRefreshToken);
        // Update the authorization header with the new access token.
        apiAxios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;
        return apiAxios(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("cecureStreamAuthToken");
        localStorage.removeItem("cecureStreamAcToken");
        localStorage.removeItem("cecureStreamRefToken");
        // localStorage.removeItem('refreshToken');
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  }
);

export const apiCall = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  api: apiAxios,
};
