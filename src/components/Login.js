import React, { useState } from "react";
import axiosInstance from "../axios";
import "bootstrap/dist/css/bootstrap.min.css";

function TokenObtain() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [tokenData, setTokenData] = useState({
    refresh: localStorage.getItem("refresh_token") || null,
    access: localStorage.getItem("access_token") || null,
  });
  const [loginMessage, setLoginMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/api/token/", loginData);
      if (response.status === 200) {
        const { refresh, access } = response.data;
        localStorage.setItem("refresh_token", refresh);
        localStorage.setItem("access_token", access);
        setTokenData({ refresh, access });
        setLoginMessage("Login successful!");
        setTimeout(() => {
          setLoginMessage("");
        }, 5000);
      } else {
        setTokenData({
          refresh: null,
          access: null,
        });
        setLoginMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setTokenData({
        refresh: null,
        access: null,
      });
      setLoginMessage("Login failed. Please try again later.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="login-container col-md-4">
        <h2>Login</h2>
        <div className="row">
          <div className="col-md-12 mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <button className="btn btn-primary w-100" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
        {loginMessage && (
          <p className={tokenData.access ? "success" : "error"}>
            {loginMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default TokenObtain;
