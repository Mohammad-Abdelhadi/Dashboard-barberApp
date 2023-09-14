import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { WorkoutsContextProvider } from './context/WorkoutContext'
import { AuthContextProvider } from './context/AuthContext'
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      {/* <WorkoutsContextProvider> */}
        <App />
      {/* </WorkoutsContextProvider> */}
    </AuthContextProvider>
  </React.StrictMode>
);