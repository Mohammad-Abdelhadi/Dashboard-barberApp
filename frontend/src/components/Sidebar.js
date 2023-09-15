// packages
import React from "react";

// css
import "./sidebar.css";

// image
// import logo from "../../assets/images/logo.png";
import Board from "./Board";

// icons
import { PathIcons } from "../utils/PathIcons";

const Sidebar = () => {
  return (
    <div className="continuer-sidebar">
      {/* logo /}
      <img src={logo} alt="logo" className="logo-sidebar" />

      {/ sidebar boards */}
      <ul className="menu-items mt-5">
        <Board link={"/"} title={"Dashboard"} icon={PathIcons.home} />
        <Board
          link={"/PendingAppointments"}
          title={"Pending"}
          icon={PathIcons.PendingAppointments}
        />

        <Board
          link={"/AllAppointments"}
          title={"Appointments"}
          icon={PathIcons.AllAppointments}
        />
        <Board
          link={"/LiveAppointments"}
          title={"Live "}
          icon={PathIcons.LiveAppointments}
        />
      </ul>
    </div>
  );
};

export default Sidebar;
