import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container-fluid bg-light h-100 d-flex justify-content-end p-1">
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button className="btn btn-danger m-2" onClick={handleClick}>
                Log out
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
