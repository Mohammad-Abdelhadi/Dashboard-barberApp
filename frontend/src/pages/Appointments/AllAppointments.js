import React, { useEffect, useState } from "react";

const AllAppointments = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://barberapp.onrender.com/api/user/getallappoinemnts")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Update the state with the fetched data
          setUserData(data);
        } else {
          console.error("Invalid data format:", data);
        }
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  // Function to handle accepting or canceling an appointment
  const handleStatusUpdate = (userId, appointmentId, newStatus) => {
    // Make an API call to update the status of the appointment
    fetch(
      `https://barberapp.onrender.com/api/user/updateAppointmentStatus/${userId}/${appointmentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newStatus }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Appointment status updated successfully") {
          // Update the state to reflect the updated appointment status
          setUserData((prevUserData) => {
            const updatedUserData = prevUserData.map((user) => {
              if (user.userId === userId) {
                const updatedAppointments = user.appointments.map(
                  (appointment) => {
                    if (appointment._id === appointmentId) {
                      appointment.status = newStatus;
                    }
                    return appointment;
                  }
                );
                return { ...user, appointments: updatedAppointments };
              }
              return user;
            });
            return updatedUserData;
          });
        } else {
          console.error("Error updating appointment status:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating appointment status:", error);
      });
  };

  return (
    <div>
      <h2>Appointments</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-dark">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Appointments</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>
                  {user.appointments.length === 0 ? (
                    <p>There are no appointments</p>
                  ) : (
                    <ul>
                      {user.appointments.map((appointment) => (
                        <li key={appointment._id}>
                          {appointment.barberName && (
                            <p>Barber Name: {appointment.barberName}</p>
                          )}
                          {appointment.services && (
                            <p>
                              Services: {JSON.stringify(appointment.services)}
                            </p>
                          )}
                          {appointment.time && <p>Time: {appointment.time}</p>}
                          {appointment.status && (
                            <p>Status: {appointment.status}</p>
                          )}
                          {/* Display additional appointment details here */}
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
                <td>
                  {user.appointments.map((appointment) => (
                    <div key={appointment._id}>
                      {appointment.status === "pending" && (
                        <>
                          <button
                            className="btn btn-success"
                            onClick={() =>
                              handleStatusUpdate(
                                user.userId,
                                appointment._id,
                                "accepted"
                              )
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              handleStatusUpdate(
                                user.userId,
                                appointment._id,
                                "rejected"
                              )
                            }
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllAppointments;
