import axios from "axios";
import qs from "qs";

export const URLS = {
  baseURL: "localhost:3000",
};

async function request(method, url, data = {}, token) {
  let headers = {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    authorization: `Bearer ${token}`,
  };
  let config = {
    baseURL: URLS.baseURL,
    url,
    method,
    timeout: 10000,
    crossDomain: true,
    headers,
  };
  if (method.toLowerCase() === "get") {
    config.params = data;
    config.paramsSerializer = (params) =>
      qs.stringify(params, { arrayFormat: "brackets" });
  }

  if (
    method.toLowerCase() === "post" ||
    method.toLowerCase() === "put" ||
    method.toLowerCase() === "delete"
  ) {
    config.data = data;
  }

  return axios(config).then(
    (response) => {
      //  console.log('API RESPONSE :', response);
      return response;
    },
    (error) => {
      // console.log("API ERROR OF REQUEST : ", error);
      return error;
    }
  );
}

export function get(url, params = {}, token) {
  return request("get", url, params, token);
}

export function post(url, data = {}, token) {
  return request("post", url, data, token);
}

export function put(url, data = {}, token) {
  return request("put", url, data, token);
}

export function Delete(url, data = {}, token) {
  return request("delete", url, data, token);
}
