import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BookSto } from "../Context";
import { Button, Modal } from "react-bootstrap";

export default function Address() {
  const { loca, token, addresses, fetchUserAddress } = useContext(BookSto);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [addressId, setAddressId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    // setAddresses(addresses.filter((addr) => addr.id !== id));
    axios
      .get(`${loca}/address/delete/${addressId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        handleClose();
        fetchUserAddress(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEdit = (address) => {
    navigate("/update-address", {
      state: {
        address,
      },
    });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4">My Addresses</h3>
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate("/new-address");
          }}
        >
          New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="alert alert-info">
          No addresses found.{" "}
          <span
            className="text-decoration-underline cursor-pointer"
            onClick={() => {
              navigate("/new-address");
            }}
          >
            Add your shipping address.
          </span>
        </div>
      ) : (
        <div className="row">
          {addresses.map((addr) => (
            <div className="col-md-6 mb-4" key={addr._id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{addr.fullName}</h5>
                  <p className="card-text mb-1">
                    {addr.address}, {addr.city}, {addr.state}, {addr.zip}
                  </p>
                  <p className="card-text mb-1">{addr.country}</p>
                  <p className="card-text mb-1">
                    <strong>Phone:</strong> {addr.phone}
                  </p>
                  <p className="card-text">
                    <strong>Email:</strong> {addr.email}
                  </p>
                  {addr.isDefault ? (
                    <span class="badge text-bg-secondary">Default</span>
                  ) : (
                    <button
                      className="btn btn-danger btn-sm me-2"
                      // onClick={() => handleDelete(addr._id)}
                      onClick={() => {
                        setAddressId(addr._id);
                        handleShow();
                      }}
                    >
                      Delete
                    </button>
                  )}
                  <button
                    className="btn btn-warning btn-sm mx-2"
                    onClick={() => handleEdit(addr)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <h3 className="text-center mt-2">Sure to delete this address?</h3>
        </Modal.Body>
        <Modal.Footer className="border-0 mt-0 pt-0">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
