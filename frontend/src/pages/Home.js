import React, { useEffect, useState, useMemo } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import AddNewUser from "./AddNewUser";
import { useLogout } from "../hooks/useLogout";
import "./style.css";
const Home = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  // Create a state variable to track whether the Add User modal is open
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  // Function to open the Add User modal
  const usersPerPage = 5;

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

  const editUser = (user) => {
    setEditingUser(user);
    const modal = document.querySelector(".edit-user-modal");
    if (modal) {
      modal.classList.add("active");
    }
  };

  const saveEditedUser = async () => {
    try {
      const response = await fetch(
        `https://barberapp.onrender.com/api/user/updateuserinfo/${editingUser._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            email: editingUser.email,
            password: editingUser.password,
            role: editingUser.role,
          }),
        }
      );
      const updatedUserData = await response.json();
      setUserData((prevUserData) =>
        prevUserData.map((user) =>
          user._id === updatedUserData.user._id ? updatedUserData.user : user
        )
      );
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user data:", error);
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
  }, [user,userData]);

  const filteredData = useMemo(() => {
    return userData.filter(
      (user) =>
        user.email.includes(searchTerm) || user.role.includes(searchTerm)
    );
  }, [userData, searchTerm]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleAddButtonClick = () => {
    setIsAddUserModalOpen(true);
  };

  const handleCloseButtonClick = () => {
    console.log("onCloseButtonClick() called");
    setIsAddUserModalOpen(false);
  };

  return (
    <div className="home">
      <div className="user-list">
        <div className="d-flex justify-content-between p-3">
          <h2>User List ({filteredData.length})</h2>
          <button className="btn btn-success" onClick={handleAddButtonClick}>
            + Add New User
          </button>
          {isAddUserModalOpen && (
            <AddNewUser onClose={handleCloseButtonClick} />
          )}
        </div>
        <input
          type="text"
          placeholder="Search by name or role"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table className="table table-striped table-bordered">
          <thead style={{ textAlign: "center" }}>
            <tr>
              <th>User ID</th>
              <th>Email</th>
              <th>Appointments</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {currentUsers.map((user) => (
              <tr key={user._id} className="user">
                <td>{user._id}</td>
                <td>{user.email}</td>
                <td>{user.appointments.length}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="btn btn-danger "
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => editUser(user)} // Set the user for editing
                    className="btn btn-primary m-2"
                  >
                    Edit
                  </button>
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

      {/* Conditionally render the Add User modal */}

      {editingUser && (
        
        <div className={`edit-user-modal ${editingUser ? "active" : ""}`}>
          <h3>Edit User</h3>
          <label>Email:</label>
          <input
            type="text"
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
          />
          <label>Password:</label>
          <input
            type="password"
            value={editingUser.password}
            onChange={(e) =>
              setEditingUser({ ...editingUser, password: e.target.value })
            }
          />
          <label>Role:</label>
          <input
            type="text"
            value={editingUser.role}
            onChange={(e) =>
              setEditingUser({ ...editingUser, role: e.target.value })
            }
          />
          <button className="btn btn-success ml-2" onClick={saveEditedUser}>
            Save
          </button>
          <button
            className="btn btn-danger m-2 justify-content-end align-items-end"
            onClick={() => {
              setEditingUser(null);
              const modal = document.querySelector(".edit-user-modal");
              if (modal) {
                modal.classList.remove("active");
              }
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
