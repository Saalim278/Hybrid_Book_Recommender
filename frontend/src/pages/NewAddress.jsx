import React, { useState } from "react";
import { useContext } from "react";
import { BookSto } from "../Context";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function NewAddress() {
  const { loca, token, fetchUserAddress } = useContext(BookSto);
  const buyData = useLocation().state;
  console.log(buyData);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    isDefault: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${loca}/address/insert`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        fetchUserAddress(token);
        if (buyData) {
          navigate("/buynow", {
            state: {
              book: buyData.book,
            },
          });
        } else {
          navigate("/my-address");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // You can now send this data to your backend or handle it as needed
  };
  return (
    <div className="container my-4 border p-3 rounded shadow-sm">
      <form className="" onSubmit={handleSubmit}>
        <h4 className="mb-4 text-center">Shipping Address</h4>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address (Optional)</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Street Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">State/Province</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Pin Code</label>
            <input
              type="text"
              className="form-control"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label">Country</label>
          <input
            type="text"
            className="form-control"
            name="country"
            value={formData.country}
            onChange={handleChange}
            disabled
          />
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="checkDefault"
            value={formData.isDefault}
            onChange={() => {
              setFormData({ ...formData, isDefault: !formData.isDefault });
            }}
          />
          <label class="form-check-label" for="checkDefault">
            Default Address
          </label>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
