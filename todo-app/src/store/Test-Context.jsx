import { createContext } from "react";

const test = {
  1: "test 1",
  2: {
    3: 3,
  },
};

const TestContext = createContext(test);

export { TestContext };
