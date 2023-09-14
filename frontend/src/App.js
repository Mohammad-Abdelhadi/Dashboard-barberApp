import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import User from "./pages/User";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import AllUsers from "./pages/AllUsers";
import Appointments from "./pages/Appointments";
// import Userss from "./pages/Userss";
import Userss from "./pages/Userss";
import AllAppointments from "./pages/Appointments/AllAppointments";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <div className="dashboardContent ">
          <div className="row">
            <div className="col-2 ">
              <AllUsers />
            </div>

            <div className="contant col-10   p-0">
              <Navbar />

              <Routes>
                <Route
                  path="/"
                  element={
                    user && user.role === "admin" ? (
                      <Home />
                    ) : user && user.role === "user" ? (
                      <User />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                <Route
                  path="/login"
                  element={!user ? <Login /> : <Navigate to="/" />}
                />
                <Route
                  path="/signup"
                  element={!user ? <Signup /> : <Navigate to="/" />}
                />
                <Route
                  path="/users"
                  // element={!user ? <Signup /> : <Navigate to="/users" />}
                  element={<AllUsers />}
                />

                <Route
                  path="/AllAppointments"
                  // element={!user ? <Signup /> : <Navigate to="/users" />}
                  element={<AllAppointments />}
                />
                <Route
                  path="/userss"
                  // element={!user ? <Signup /> : <Navigate to="/users" />}
                  element={<Userss />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
