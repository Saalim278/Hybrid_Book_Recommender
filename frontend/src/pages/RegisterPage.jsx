import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BookSto } from "../Context";
import axios from "axios";

const RegisterPage = () => {
  const { loca, saveCredentials } = useContext(BookSto);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
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

  const handleRegister = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    axios
      .post(`${loca}/auth/register`, form)
      .then((result) => {
        console.log(result);
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
    // Add actual registration logic here
  };

  return (
    <div className="container py-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">📝 Register</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>
        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            required
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
          />
        </div>
        {error && (
          <div class="alert alert-danger" role="alert">
            {errorMsg}
          </div>
        )}
        <button className="btn btn-success w-100">Register</button>
      </form>
      <div className="d-flex align-items-center mt-4 justify-content-center">
        Already have account?{" "}
        <NavLink onClick={() => navigate("/login")}>Login</NavLink>
      </div>
    </div>
  );
};

export default RegisterPage;
