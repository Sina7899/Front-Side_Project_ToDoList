import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./pages/Login.jsx";
import { SignUp } from "./pages/Signup.jsx";
import { ToDoApp } from "./pages/ToDoApp.jsx";
import Test from "./pages/Test.jsx";

import { ToDoAppContextsProvider } from "./store/ToDo_App-context.jsx";

function App() {
  return (
    <ToDoAppContextsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/Login" />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/ToDoApp" element={<ToDoApp />} />
          <>
            <Route path="/Test" element={<Test />} />
          </>
        </Routes>
      </Router>
    </ToDoAppContextsProvider>
  );
}

export default App;
