import Signup from "./Auth/Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Auth/Login";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoutes from "./Routes/PublicRoutes";
import ForgotPassword from "./Auth/ForgotPassword";
import UpdateProfile from "./Auth/UpdateProfile";
import Dashboard from "./ClientServices/Dashboard";
import AddContact from "./ClientServices/AddContact";
import ContactList from "./ClientServices/ContactList";
import EditContact from "./ClientServices/EditContact";
import NotFound from "./Routes/404";
import Home from "./ClientServices/Home";

function App() {
  return (
    <div style={{ backgroundColor: "#818181", fontFamily: "Poppins" }}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              path="/profile"
              element={<PrivateRoute Component={Dashboard} toNav="login" />}
            />
            <Route
              path="/signup"
              element={<PublicRoutes Component={Signup} toNav="profile" />}
            />
            <Route
              path="/login"
              element={<PublicRoutes Component={Login} toNav="profile" />}
            />
            <Route
              path="/forgot-password"
              element={
                <PublicRoutes
                  Component={ForgotPassword}
                  toNav="update-profile"
                />
              }
            />
            <Route
              path="/update-profile"
              element={<PrivateRoute Component={UpdateProfile} toNav="login" />}
            />
            <Route
              path="/new-contact"
              element={<PrivateRoute Component={AddContact} toNav="login" />}
            />
            <Route
              path="/contact-list"
              element={<PrivateRoute Component={ContactList} toNav="login" />}
            />
            <Route
              path="/edit-contact/:id"
              element={<PrivateRoute Component={EditContact} toNav="login" />}
            />
            <Route
              path="/404"
              element={<PrivateRoute Component={NotFound} toNav="login" />}
            />
            <Route path="*" element={<Navigate replace to="/404" />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
