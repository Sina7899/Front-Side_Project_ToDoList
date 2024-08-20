import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./pages/Login.jsx";
import { SignUp } from "./pages/Signup.jsx";
import { ToDoApp } from "./pages/ToDoApp.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/ToDoApp" element={<ToDoApp />} />
      </Routes>
    </Router>
  );
}

export default App;
