import React, { useState } from "react";
import axiosInstance from "../axios";
import "bootstrap/dist/css/bootstrap.min.css";

function BookRoom({ room, startTime, endTime, onBook }) {
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const roomId = room;
      const formattedStartTime = startTime.replace("AM", "").replace("PM", "").replace("T", " ").replace(/, /g, "-");
      const formattedEndTime = endTime.replace("AM", "").replace("PM", "").replace("T", " ").replace(/, /g, "-");
      const token = localStorage.getItem("access_token");
      
      const response = await axiosInstance.post(
        "/api/book-room/",
        {
          room: {
            id: roomId
          },
          number_of_people: numberOfPeople,
          start_time: formattedStartTime,
          end_time: formattedEndTime
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response && response.data && response.data.message) {
        setSuccessMessage(response.data.message);
      } else {
        setSuccessMessage("Room booked successfully");
      }
      
      setErrorMessage("");
      onBook();
    } catch (error) {
      console.error("Backend Error:", error);
      
      setErrorMessage(error.response?.data?.message || "An error occurred while booking the room.");
      
      setSuccessMessage("");
    }
  };

  return (
    <div className="container">
      <h2>Book Room</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Number of People:</label>
          <input
            type="number"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Book
        </button>
      </form>
      {successMessage && <p className="text-success">{successMessage}</p>}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </div>
  );
}

export default BookRoom;
