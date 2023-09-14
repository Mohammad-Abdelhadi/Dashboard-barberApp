import React, { useEffect, useState, useMemo } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import AddNewUser from "./AddNewUser";
import { useLogout } from "../hooks/useLogout";
// import "./style.css";
import AllUsers from "./AllUsers";
import Userss from "./Userss";

const Home = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://barberapp.onrender.com/api/user/", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const jsonData = await response.json();
      setUserData(jsonData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const deleteUser = (_id) => {
    fetch(`https://barberapp.onrender.com/api/user/delete/${_id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.deletedUser) {
          setUserData((values) => values.filter((item) => item._id !== _id));

          if (user && user._id === _id) {
            logout();
          }
        } else {
          console.log("User not found");
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);

  // Use useMemo to memoize filtered data
  const filteredData = useMemo(() => {
    return userData.filter(
      (user) =>
        user.email.includes(searchTerm) || user.role.includes(searchTerm)
    );
  }, [userData, searchTerm]);

  // Calculate the indexes for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="home">
      <div className="user-list">
        <h2>User List ({filteredData.length})</h2>
        <input
          type="text"
          placeholder="Search by name or role"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <table className="table table-dark">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id} className="user">
                <td>{user._id}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => deleteUser(user._id)}>Delete</button>
                  <button
                    style={{ backgroundColor: "#1aac83", marginLeft: "10px" }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <table class="table table-striped table-bordered">
          <thead style={{ textAlign: "center" }}>
            <tr>
              <th>User ID</th>
              <th>Email</th>
              <th>password</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {currentUsers.map((user) => (
              <tr key={user._id} className="user">
                <td>{user._id}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="btn btn-danger "
                  >
                    Delete
                  </button>
                  <button className="btn btn-primary m-2">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="pagination">
          {Array.from({
            length: Math.ceil(filteredData.length / usersPerPage),
          }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <AddNewUser />
    </div>
  );
};

export default Home;
