import { createContext } from "react";

import { signUp_InRequest } from "../API/signUp_In.js";

const ToDoAppContexts = createContext({
  singInHandler: () => {},
  localStorage: {},
});

function ToDoAppContextsProvider({ children }) {
  function addToLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }

  function getFromLocalStorage(key) {
    return localStorage.getItem(key);
  }

  const removeToken = () => {
    localStorage.removeItem("JWT");
  };

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
          alert(response.request.response);
          return false;
        }
      })
      .catch((error) => {
        console.error("There was an error making the request:", error);
        return false;
      });
  }

  const toDoAppCtxValues = {
    singInHandler: singInHandler,
    localStorage: {
      add: addToLocalStorage,
      get: getFromLocalStorage,
      remove: removeToken,
    },
  };
  return (
    <ToDoAppContexts.Provider value={toDoAppCtxValues}>
      {children}
    </ToDoAppContexts.Provider>
  );
}

export { ToDoAppContextsProvider, ToDoAppContexts };
