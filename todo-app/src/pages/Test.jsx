import { useContext } from "react";
import { TestContext } from "../store/Test-Context.jsx";

export default function Test() {
  const testCnx = useContext(TestContext);

  return (
    <>
      <div>Test</div>
      <button onClick={() => console.log(testCnx)}>TA</button>
    </>
  );
}
