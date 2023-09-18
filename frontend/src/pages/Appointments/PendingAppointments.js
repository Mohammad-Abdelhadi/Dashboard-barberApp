import React, { useEffect, useState } from "react";

const PendingAppointments = () => {
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
              const updatedAppointments = user.appointments.map(
                (appointment) => {
                  if (appointment._id === appointmentId) {
                    appointment.status = newStatus;
                  }
                  return appointment;
                }
              );
              return { ...user, appointments: updatedAppointments };
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
      <h2>Pending Appointments</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Barber Name</th>
              <th>Services</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) =>
              user.appointments.map((appointment) => {
                if (appointment.status === "pending") {
                  return (
                    <tr key={appointment._id}>
                      <td>{appointment.barber.name}</td>
                      <td>
                        <ul>
                          {appointment.services.map((service) => (
                            <li key={service.name}>
                              {service.name} - ${service.price}
                              <p>{`${service.time} Min`}</p>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>
                       {appointment.date}
                      </td>
                      <td>{appointment.status}</td>
                      <td>
                        <button
                          className="btn btn-success m-2"
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
                          className="btn btn-danger "
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
                      </td>
                    </tr>
                  );
                } else {
                  return null; // Skip rendering appointments with other statuses
                }
              })
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingAppointments;
