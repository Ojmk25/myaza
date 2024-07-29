import { jwtDecode } from "jwt-decode";
import { getApiPath } from "../config";
import * as http from "@/services/httpServices";

const apiLogIn = getApiPath("open", "login");
const apiSignUp = getApiPath("open", "sign-up");
const apiConfirmSignUp = getApiPath("open", "confirm-sign-up");
const uploadMedia = getApiPath("core", "upload-media");
const updateUser = getApiPath("core", "update-user");

const apiResendCode = getApiPath("open", "resend-verify-code");
const apiForgotPassword = getApiPath("open", "forgot-password");
const apiResetPassword = getApiPath("open", "confirm-forgot-password");

export interface UploadMediaPayload {
  media_type: string | undefined;
}

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UpdateUserPayload {
  given_name?: string;
  family_name?: string;
  email?: string;
  picture?: string;
}
export interface ConfirmPayload {
  email: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}

export interface ConfirmSignUpPayload {
  email: string;
  code: number | string;
  newPassword?: string;
}

export interface ConfirmNewSignUpPayload {
  user_name: string | null | undefined;
  code: number | string;
}

export interface ChangePasssword {
  previous_password: string;
  proposed_password: string;
  access_token: string;
}

export interface ConfirmNewSignUpResponse {
  data: {
    statusCode: number;
    body: {
      status: string;
      message: string;
      data: {};
    };
  };
}

export interface SigninResponse {
  data: {
    statusCode: number;
    body: {
      status: string;
      message: string;
      data: {
        id_token: string;
        refresh_token: string;
        access_token: string;
        expires_in: string;
        token_type: string;
      };
    };
  };
}

export interface ForgotPAsswordUserDetailsProps {
  email: string;
}

export interface ResetPAsswordUserDetailsProps {
  email: string;
  code: string;
  password: string;
}

// local auth set and get
export const getCurrentClientData = () => {
  let clientData;
  let token;
  let customer_id;
  let username;
  let brand_name;
  let first_name;
  let surname;

  const authToken = sessionStorage.getItem("cecureStreamAuthToken");

  try {
    if (authToken) {
      const parsedAuthToken = JSON.parse(authToken);
      clientData = parsedAuthToken?.uData;
      token = parsedAuthToken?.askBettyAcToken;

      if (clientData) {
        customer_id = clientData["cognito:customer_id"];
        username = clientData["cognito:username"];
        brand_name =
          clientData["custom:brand_name"] || clientData["custom:company_name"];
        first_name = clientData.given_name;
        surname = clientData.family_name;
      }
    }
  } catch (error) {
    // Handle the JSON parsing error
    console.error("Error parsing JSON:", error);
  }

  return {
    clientData,
    token,
    brand_name,
    customer_id,
    username,
    first_name,
    surname,
  };
};

// isAuth
export const IsAuthenticated = () => {
  if (
    localStorage.getItem("cecureStreamAuthToken") ||
    sessionStorage.getItem("cecureStreamAuthToken")
  ) {
    try {
      const token =
        JSON.parse(localStorage.getItem("cecureStreamAuthToken") || "")[
          "cecureStreamAcToken"
        ] ||
        JSON.parse(sessionStorage.getItem("cecureStreamAuthToken") || "")[
          "cecureStreamAcToken"
        ];
      if (token) return true;
    } catch (error) {}
  }
  return false;
};

export const getNameAbbreviation = () => {
  let clientData;
  let first_name;
  let surname;
  let initials;

  if (
    localStorage.getItem("cecureStreamAuthToken") ||
    sessionStorage.getItem("cecureStreamAuthToken")
  ) {
    try {
      const token =
        JSON.parse(localStorage.getItem("cecureStreamAuthToken") || "") ||
        JSON.parse(sessionStorage.getItem("cecureStreamAuthToken") || "");
      if (token) {
        clientData = token?.uData;
        first_name = clientData.given_name;
        surname = clientData.family_name;
        initials =
          first_name.charAt(0).toUpperCase() + surname.charAt(0).toUpperCase();
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }

  return initials;
};

export const getClientInfo = () => {
  let clientData;
  let first_name;
  let surname;
  let user_id;
  let email;
  let picture;

  if (
    localStorage.getItem("cecureStreamAuthToken") ||
    sessionStorage.getItem("cecureStreamAuthToken")
  ) {
    try {
      const token =
        JSON.parse(localStorage.getItem("cecureStreamAuthToken") || "") ||
        JSON.parse(sessionStorage.getItem("cecureStreamAuthToken") || "");
      if (token) {
        clientData = token?.uData;
        first_name = (clientData.given_name.charAt(0).toUpperCase() +
          clientData.given_name.slice(1)) as string;
        surname = (clientData.family_name.charAt(0).toUpperCase() +
          clientData.family_name.slice(1)) as string;
        user_id = clientData["cognito:username"];
        email = clientData.email as string;
        picture =
          (clientData.picture as string) && (clientData.picture as string);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }

  return { first_name, surname, user_id, email, picture };
};

export const sessionExpired = () => {
  sessionStorage.setItem("cecure-stream-session-expired", `${true}`);
  // window.location.reload()
};
// registerUser
export const registerUser = async (data: RegisterPayload): Promise<any> => {
  try {
    return await http.apiCall.post(apiSignUp, data);
  } catch (error) {
    return error;
  }
};

export const confirmSignUpOpt = async (
  data: ConfirmNewSignUpPayload
): Promise<ConfirmNewSignUpResponse> => {
  try {
    return await http.apiCall.post(apiConfirmSignUp, data);
  } catch (error: any) {
    return error;
  }
};
// Forgot Password
export const forgotPassword = async (
  data: ForgotPAsswordUserDetailsProps
): Promise<any> => {
  try {
    return await http.apiCall.post(apiForgotPassword, data);
  } catch (error) {
    return error;
  }
};

export const resetPassword = async (
  data: ResetPAsswordUserDetailsProps
): Promise<any> => {
  try {
    return await http.apiCall.post(apiResetPassword, data);
  } catch (error) {
    return error;
  }
};

// export const changePassword = async (data: ChangePasssword) => {
//   try {
//     return await http.apiCall.post(apiChangePassword, data)
//   } catch (error) {
//     return error
//   }
// }

// Confirm forgot Password
// export const confirmForgotPassword = async (data: ConfirmSignUpPayload) => {
//   try {
//     return await http.apiCall.post(apiConfirmForgotPassword, data)
//   } catch (error) {
//     return error
//   }
// }
// Resend Verification
// Adjust the resendVerificationOTP function to accept an object with an email property

export const resendVerificationOTP = async (
  data: ConfirmPayload
): Promise<any> => {
  try {
    return await http.apiCall.post(apiResendCode, data);
  } catch (error) {
    return error;
  }
};

export const uploadMediaFnc = async (
  data: UploadMediaPayload
): Promise<any> => {
  try {
    return await http.apiCall.api.post(uploadMedia, data);
  } catch (error) {
    return error;
  }
};

export const uploadImageFile = async (url: string, data: any): Promise<any> => {
  const accessToken = localStorage.getItem("cecureStreamAcToken");
  try {
    return http.apiCall.put(url, data);
  } catch (error) {
    return error;
  }
};

export const updateUserFnc = async (data: UpdateUserPayload): Promise<any> => {
  try {
    const user = await http.apiCall.api.post(updateUser, data);
    if (user && localStorage.getItem("cecureStreamAuthToken")) {
      const clientData = JSON.parse(
        localStorage.getItem("cecureStreamAuthToken") || ""
      );
      const updatedClientData = {
        ...clientData,
        uData: {
          ...clientData.uData,
          ...data,
        },
      };
      localStorage.setItem(
        "cecureStreamAuthToken",
        JSON.stringify(updatedClientData)
      );
    }
    return user;
  } catch (error) {
    return error;
  }
};

// loginUser
export const loginUser = async (data: LoginPayload): Promise<any> => {
  try {
    const { data: res } = await http.apiCall.post(apiLogIn, data);
    let cecureStreamAuth;
    if (res.statusCode === 200) {
      const cecureStreamAcToken = res.body.data.access_token;
      const cecureStreamIdToken = res.body.data.id_token;
      const cecureStreamRefToken = res.body.data.refresh_token;
      const cecureStreamTokenDuration = res.body.data.expires_in;
      cecureStreamAuth = {
        cecureStreamAcToken,
        cecureStreamIdToken,
        cecureStreamRefToken,
        cecureStreamTokenDuration,
        uData: decodeJwt(cecureStreamIdToken),
      };
      sessionStorage.setItem(
        "cecureStreamAuthToken",
        JSON.stringify(cecureStreamAuth)
      );
      localStorage.setItem(
        "cecureStreamAuthToken",
        JSON.stringify(cecureStreamAuth)
      );
      localStorage.setItem(
        "cecureStreamAcToken",
        JSON.stringify(cecureStreamAcToken)
      );
      localStorage.setItem(
        "cecureStreamRefToken",
        JSON.stringify(cecureStreamRefToken)
      );
    }
    return {
      response: res,
      // error: res.body?.message.error,
      // success: res.body?.message.success,
      // message: res.body?.message.message,
      data: { ...cecureStreamAuth },
    };
  } catch (error) {
    return error;
  }
};

// decodeFunc
export const decodeJwt = (jwt: string) => {
  return jwtDecode(jwt);
};

// LogOutUser
export const logOutUser = () => {
  // sessionStorage.removeItem('askBetty-smActive')
  sessionStorage.removeItem("cecureStreamAuthToken");
  // sessionStorage.removeItem('env-askBetty')
  // sessionStorage.removeItem('abDep')
  localStorage.removeItem("cecureStreamAuthToken");
  // localStorage.removeItem('askBetty-smActive')
  // localStorage.removeItem('regPath')
  // localStorage.removeItem('askBetty-acUser')
  // localStorage.removeItem('auth_ab')
  // localStorage.removeItem('auth_data')
  clearCacheData();
};

const clearCacheData = () => {
  caches.keys().then((names) => {
    names.forEach((name) => {
      caches.delete(name);
    });
  });
};

// export const getUserLocation = async (accessToken: string) => {
//   try {
//     return await http.apiCall.post(apiGetUserLocation, {
//       headers: {
//         Authorization: accessToken,
//       },
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }
/** 
// GetUser ***********************
export const getUserData = async (data: any) => {
  try {
    return await http.apiCall.post(apiGetUserData, data, {
      headers: {
        Authorization: data?.accessToken,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export const checkUsernameApi = async (data: any) => {
  try {
    return await http.apiCall.post(apiGetUsername, data)
  } catch (error) {
    console.log(error)
  }
}
*/
