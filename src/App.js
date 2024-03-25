import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Register from "./components/Register";
import Login from "./components/Login";
import RoomList from './components/RoomList';
import BookRoom from './components/BookRoom';
import Admin from './components/Admin';
import RoomDetail from './components/RoomDetail';

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Booking System</h1>
        <nav>
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
            <li>
              <Link to="/available-rooms">Available Rooms List</Link>
            </li>
            <li>
              <Link to="/book-room">Booking Rooms</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/available-rooms">
            <RoomList />
          </Route>
          <Route path="/book-room">
            <BookRoom />
          </Route>
          <Route path="/get-room/:id">
            <RoomDetail />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;