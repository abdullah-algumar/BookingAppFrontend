import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import "bootstrap/dist/css/bootstrap.min.css";
import BookRoom from "./BookRoom";

function AvailableRooms() {
  const [formData, setFormData] = useState({
    numberOfPeople: 0,
    startDateTime: "",
    endDateTime: ""
  });
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [error, setError] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formattedStartTime = formData.startDateTime.replace("T", " ");
      const formattedEndTime = formData.endDateTime.replace("T", " ");
      
      const response = await axiosInstance.get("/api/available-rooms/", {
        params: {
          numberOfPeople: formData.numberOfPeople,
          start_time: formattedStartTime,
          end_time: formattedEndTime
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      setAvailableRooms(response.data.availableRooms);
      setError("");
    } catch (error) {
      setAvailableRooms([]);
      setError("An error occurred while fetching available rooms.");
    }
  };

  return (
    <div className="container">
      <h2>Available Rooms</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Number of People:</label>
          <input
            type="number"
            name="numberOfPeople"
            value={formData.numberOfPeople}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Start Date and Time:</label>
          <input
            type="datetime-local"
            name="startDateTime"
            value={formData.startDateTime}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>End Date and Time:</label>
          <input
            type="datetime-local"
            name="endDateTime"
            value={formData.endDateTime}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {availableRooms.length > 0 && (
        <div>
          <h3>Available Rooms:</h3>
          <ul className="room-list">
            {availableRooms.map((room, index) => (
              <li key={index} className="room-item" onClick={() => handleSelectRoom(room)}>
                <strong>{room.room}</strong> - {new Date(room.between.start_time).toLocaleString()} to {new Date(room.between.end_time).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedRoom && (
        <BookRoom
          room={selectedRoom}
          startTime={formData.startDateTime}
          endTime={formData.endDateTime}
        />
      )}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default AvailableRooms;
