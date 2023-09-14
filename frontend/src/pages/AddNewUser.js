import React, { useState } from "react";

const AddNewUser = () => {
  const [email, setEmail] = useState("test1@test.com");
  const [password, setPassword] = useState("aA12345678#");
  const [role, setRole] = useState("user");

  const handleForm = async (e) => {
    e.preventDefault();

    // Call the register function with email, password, and role
    await registerUser(email, password, role);

    // Clear form fields
    // setEmail("");
    // setPassword("");
    // setRole("");
  };

  const registerUser = async (email, password, role) => {
    try {
      // Call your API endpoint to register the user
      const response = await fetch("https://barberapp.onrender.com/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (response.ok) {
        // You should define a function here that fetches the user data
        // and updates the state accordingly (similar to the Home component).
        // For example:
        fetchUsers();
        console.log("User registered successfully!");
      } else {
        console.error("Error registering user");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddNewUser;
