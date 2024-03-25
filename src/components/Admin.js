import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { useHistory } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

function RoomManagement() {
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axiosInstance.get("/api/list-rooms/");
      setRooms(response.data);
    } catch (error) {
      setError("An error occurred while fetching rooms.");
    }
  };

  const handleAddRoom = async () => {
    try {
      await axiosInstance.post("/api/add-room/", { name, capacity });
      fetchRooms();
      setName("");
      setCapacity("");
    } catch (error) {
      setError("An error occurred while adding the room.");
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      await axiosInstance.delete(`/api/delete-room/${id}/`);
      fetchRooms();
    } catch (error) {
      setError("An error occurred while deleting the room.");
    }
  };


  const handleRoomDetail = (id) => {
    if (id) {
      history.push(`/get-room/${id}`);
    } else {
      console.error("Invalid room id:", id);
    }
  };

  return (
    <div className="container">
      <h2>Room Management</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          className="form-control mt-2"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        <button
          onClick={handleAddRoom}
          className="btn btn-primary mt-2"
          disabled={!name || !capacity}
        >
          Add Room
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.id}</td>
              <td>{room.name}</td>
              <td>{room.capacity}</td>
              <td>
                <button
                  onClick={() => handleDeleteRoom(room.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleRoomDetail(room.id)}
                  className="btn btn-primary btn-sm ml-2"
                >
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RoomManagement;
