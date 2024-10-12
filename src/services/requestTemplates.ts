import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const defaultTimeout = 10000; //10 seconds

export const get = (url: string, headers: any, timeout?: number) => {
  if (!timeout) {
    timeout = defaultTimeout;
  }
  return axios.get(url, {
    headers: { ...headers },
    timeout: timeout,
  });
};

export const post = (
  url: string,
  headers: any,
  body: any,
  timeout?: number
) => {
  if (!timeout) {
    timeout = defaultTimeout;
  }
  return axios.post(url, body, {
    headers: { ...headers },
    timeout: timeout,
  });
};

export const deleteR = (
  url: string,
  headers: any,
  body?: any,
  timeout?: number
) => {
  if (!timeout) {
    timeout = defaultTimeout;
  }
  return axios.delete(url, {
    headers: { ...headers },
    timeout: timeout,
    data: body,
  });
};

export const patch = (
  url: string,
  headers: any,
  body: any,
  timeout?: number
) => {
  if (!timeout) {
    timeout = defaultTimeout;
  }
  return axios.patch(url, body, {
    headers: { ...headers },
    timeout: timeout,
  });
};

export function encodeCredentials(username: string, password: string) {
  const credentials = `${username}:${password}`;
  return btoa(credentials); // Base64 encode the credentials
}

export function saveCredentialsToCookie(
  username: string,
  password: string,
  csrfToken: string
) {
  const encodedCredentials = encodeCredentials(username, password);
  Cookies.set("credentials", encodedCredentials, { expires: 20, secure: true }); // Cookie expires in 7 days
  Cookies.set("csrftoken", csrfToken, { expires: 20, secure: true }); // Cookie expires in 7 days
}
