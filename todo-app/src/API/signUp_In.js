import { post } from "./api.js";

import { addToLocalStorage, userInfoAddToLS } from "../local-Storage.js";

function signUp_InRequest(route, userData) {
  const singUp_InResponse = post(route, userData);
  return singUp_InResponse;
}

function singInHandler(signInRoute, userSignInData) {
  return signUp_InRequest(signInRoute, userSignInData)
    .then((response) => {
      if (response.status === 200) {
        console.log("Request was successful:", response.data);
        const token = response.data.jwt;
        addToLocalStorage("JWT", token);
        return true;
      } else {
        console.log("Request was not successful:", response);
        if (
          response.request.response === "" ||
          response.request.response === undefined
        ) {
          alert("Timeout, Please Try Again");
        } else {
          alert(response.request.response);
        }
        return false;
      }
    })
    .catch((error) => {
      console.error("There was an error making the request:", error);
      return false;
    });
}

function signUpHandler(
  signUpRoute,
  userSingUpData,
  signInRoute,
  userSingInData
) {
  return signUp_InRequest(signUpRoute, userSingUpData)
    .then((response) => {
      if (response.status === 201) {
        userInfoAddToLS(
          userSingUpData.firstName,
          userSingUpData.lastName,
          userSingUpData.username
        );
        console.log("Request was successful:", response.data);
        singInHandler(signInRoute, userSingInData);
        return true;
      } else {
        console.log("Request was not successful:", response);
        if (
          response.request.response === "" ||
          response.request.response === undefined
        ) {
          alert("Timeout, Please Try Again");
        } else {
          alert(response.request.response);
        }
        return false;
      }
    })
    .catch((error) => {
      console.error("There was an error making the request:", error);
    });
}

export { singInHandler, signUpHandler };
