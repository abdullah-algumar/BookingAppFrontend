import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { useHistory, useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

function RoomDetail() {
  const [room, setRoom] = useState(null);
  const [newName, setNewName] = useState("");
  const [newCapacity, setNewCapacity] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    fetchRoomDetail();
  }, [id]);

  const fetchRoomDetail = async () => {
    try {
      const response = await axiosInstance.get(`/api/get-room/${id}/`);
      setRoom(response.data);
      setNewName(response.data.name);
      setNewCapacity(response.data.capacity);
    } catch (error) {
      setError("An error occurred while fetching room details.");
    }
  };

  const handleUpdateRoom = async () => {
    try {
      await axiosInstance.put(`/api/update-room/${id}/`, {
        name: newName,
        capacity: newCapacity
      });
      fetchRoomDetail();
      setError("");
    } catch (error) {
      setError("An error occurred while updating the room.");
    }
  };

  return (
    <div className="container">
      <h2>Room Detail</h2>
      {error && <p className="text-danger">{error}</p>}
      {room ? (
        <div>
          <p>ID: {room.id}</p>
          <p>Name: {room.name}</p>
          <p>Capacity: {room.capacity}</p>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              type="number"
              className="form-control mt-2"
              value={newCapacity}
              onChange={(e) => setNewCapacity(e.target.value)}
            />
            <button
              onClick={handleUpdateRoom}
              className="btn btn-primary mt-2"
            >
              Update Room
            </button>
            <button
              onClick={() => history.push("/admin")}
              className="btn btn-secondary mt-2 ml-2"
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default RoomDetail;
