import { createContext } from "react";

const LoginContext = createContext({});

function LoginContextProvider({ children }) {
  const LoginCtxValues = {};
  return (
    <LoginContext.Provider value={LoginCtxValues}>
      {children}
    </LoginContext.Provider>
  );
}

export { LoginContextProvider };
