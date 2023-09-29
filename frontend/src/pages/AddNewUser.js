import React, { useState } from "react";
import Modal from "react-modal";
import "./style.css";
import { useSignup } from "../hooks/useSignup";
import { NewUser } from "../hooks/NewUser";

const AddNewUser = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [successMessage, setSuccessMessage] = useState(null); // Add success message state
  const { signup, error, isLoading } = NewUser();

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, role);
      setSuccessMessage("User added successfully!");
      setEmail("");
      setPassword("");
      setRole("");
    } catch (error) {
      isLoading(true);
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Add New User Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "500px",
          height: "360px",
          margin: "auto",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <div className="modal-header">
        <h3>Add New User</h3>
        <button
          type="button"
          className="close btn btn-danger"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
      <div className="modal-body">
        {/* Display success message if available */}
        {successMessage && !error && (
          <div className="success-message">{successMessage}</div>
        )}

        <form onSubmit={handleForm}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button className="w-100" disabled={isLoading}>
            Add New User
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddNewUser;
