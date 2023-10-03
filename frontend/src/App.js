import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import AllAppointments from "./pages/Appointments/AllAppointments";
import User from "./pages/User";
import LiveAppointments from "./pages/Appointments/LiveAppointments";
import PendingAppointments from "./pages/Appointments/PendingAppointments";
import Sidebar from "./components/Sidebar";

function App() {
  const { user } = useAuthContext();
 
  return (
    <div className="App">
      <BrowserRouter>
        <div className="dashboardContent">
          <div className="row p-0 m-0">
          {user && user.role === "admin" && (
              <div className="col-2">
                <Sidebar />
              </div>
            )}

            <div className={`content col-${user ? "10" : "12"} p-0`}>
              <Navbar />

              <Routes>
              <Route
  path="/"
  element={
    user ? (
      user.role === "admin" ? (
        <Home />
      ) : (
        <Navigate to="/error" />
      )
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
                  path="/PendingAppointments"
                  element={
                    user ? <PendingAppointments /> : <Navigate to="/signup" />
                  }
                />
                <Route
                  path="/LiveAppointments"
                  element={
                    user ? <LiveAppointments /> : <Navigate to="/signup" />
                  }
                />
                <Route
                  path="/AllAppointments"
                  element={
                    user ? <AllAppointments /> : <Navigate to="/signup" />
                  }
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
