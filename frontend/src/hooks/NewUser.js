import { useState } from "react";

export const NewUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (email, password, role) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "https://barberapp.onrender.com/api/user/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage

      // update loading state
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
