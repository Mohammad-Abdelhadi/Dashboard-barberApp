import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faHome,
  faUsers,
  faChartBar,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

// Style for sidebar
const sideIcon = {
  fontSize: "20px",
  display: "flex",
  width: "fit-content",
};

export class PathIcons {
  // Login icons ------------------------------
  static email = (<FontAwesomeIcon icon={faEnvelope} className="auth-icon" />);
  static password = (<FontAwesomeIcon icon={faLock} className="auth-icon" />);

  // Sidebar icons ------------------------------
  static home = (
    <FontAwesomeIcon icon={faHome} className="auth-icon" style={sideIcon} />
  );
  static PendingAppointments = (
    <FontAwesomeIcon icon={faUsers} className="auth-icon" style={sideIcon} />
  );
  static LiveAppointemnts = (
    <FontAwesomeIcon icon={faFile} className="auth-icon" style={sideIcon} />
  );
  static AllAppointments = (
    <FontAwesomeIcon icon={faUsers} className="auth-icon" style={sideIcon} />
  );

  static reports = (
    <FontAwesomeIcon icon={faFile} className="auth-icon" style={sideIcon} />
  );

  // ... other icons ...
}
