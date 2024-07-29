import { subDomain } from "@/utils/getDomain";

export const init = () => {
  localStorage.removeItem("regPath");
};
export let apiBase = process.env.API_BASE_URL;

const VERSION = "v1";

const subdomain = subDomain();

const ENV_CECURESTREAM = "env-cecure-stream";

export const envFn = (): string | null => {
  let environment;
  if (subdomain?.includes("dev.")) {
    environment = "dev";
  } else if (subdomain?.includes("test.")) {
    environment = "test";
  } else if (subdomain === "cecurestream.com") {
    environment = "prod";
  } else if (subdomain?.includes("pprod.")) {
    environment = "pprod";
  } else {
    environment = "localhost"; // Fallback to localhost for any other cases
  }

  if (typeof window !== "undefined") {
    sessionStorage.setItem(ENV_CECURESTREAM, environment);
  }
  return environment;
};

export const env = envFn();
const updateApiBase = () => {
  switch (env) {
    case "dev":
      apiBase = "https://api.dev.cecurestream.com";
      break;
    case "test":
      apiBase = "https://api.test.cecurestream.com";
      break;
    case "localhost":
      apiBase = "https://api.dev.cecurestream.com"; // Adjust port if necessary
      break;
    case "pprod":
      apiBase = "https://pprod.cecurestream.com";
      break;
    case "prod":
      apiBase = "https://cecurestream.com";
      break;
    default:
      apiBase = "https://cecurestream.com"; // Default to production if nothing else matches
  }
};

updateApiBase();

export const getApiPath = (pathRoot: string, path: string) => {
  return `${apiBase}/${pathRoot}/${VERSION}/${path}`;
};
export const getApiPathNoVersion = (pathRoot: string, path: string) => {
  return `${apiBase}/${pathRoot}${path}`;
};

// export const mediaRoot = mediaBase

// export const envVariable = {
//   environment: process.NODE_ENV,
//   envVar: import.meta.env.API_KEY,
// }
export const getApiPathNoVersionNoPath = (pathRoot: string) => {
  return `${apiBase}/${pathRoot}`;
};

export const updateSignUpUser = (email: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("signUpUser", email);
    localStorage.setItem("signUpUser", email);
  }
};

export const getSignUpUser = (): string | null | undefined => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("signUpUser");
  }
};
