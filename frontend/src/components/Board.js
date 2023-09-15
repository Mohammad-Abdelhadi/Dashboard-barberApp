import React from "react";
import { Link, useLocation } from "react-router-dom";

// css
import "bootstrap/dist/css/bootstrap.min.css";
import "./sidebar.css";

const Board = ({ link, icon, title }) => {
  const location = useLocation(); // Get the current location

  return (
    <li className={location.pathname === link ? "active-item" : ""}>
      <Link to={link} className="board-link mb-4 d-flex align-content-center">
        <span className="icon-board me-4">{icon}</span>
        <span className="title-board">{title}</span>
      </Link>
    </li>
  );
};

export default Board;
