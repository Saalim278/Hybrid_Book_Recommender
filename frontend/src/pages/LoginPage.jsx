import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BookSto } from "../Context";
import axios from "axios";

const LoginPage = () => {
  const { loca, saveCredentials } = useContext(BookSto);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const showError = (msg) => {
    setError(true);
    setErrorMsg(msg);
  };
  const hideError = () => {
    if (error) {
      setError(false);
      setErrorMsg("");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const jso = { email, password };
    axios
      .post(`${loca}/auth/login`, jso)
      .then((result) => {
        saveCredentials(result.data);
        hideError();
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 400) {
          showError(err.response.data.message);
        } else {
          showError("Something went wrong");
        }
      });
    // Add real login logic here
  };

  return (
    <div className="container py-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">🔐 Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        {error && (
          <div class="alert alert-danger" role="alert">
            {errorMsg}
          </div>
        )}
        <button className="btn btn-primary w-100">Login</button>
      </form>
      <div className="d-flex align-items-center mt-4 justify-content-center">
        Don't have account?{" "}
        <NavLink onClick={() => navigate("/register")}>Register now</NavLink>
      </div>
    </div>
  );
};

export default LoginPage;
