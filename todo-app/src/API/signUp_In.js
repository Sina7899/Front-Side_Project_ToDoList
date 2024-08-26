import { post } from "./api.js";

function signUp_InRequest(route, userData) {
  const singUp_InResponse = post(route, userData);
  return singUp_InResponse;
}

export { signUp_InRequest };
