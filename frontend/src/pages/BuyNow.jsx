import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BookSto } from "../Context";
import { Button, Modal } from "react-bootstrap";

export default function BuyNow() {
  const { loca, token, defaultAddresses, addresses } = useContext(BookSto);
  const locData = useLocation().state;
  const [order, setOrder] = useState(null);
  const [selectedAddresses, setSelectedAddress] = useState();
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const price = 399;
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

  useEffect(() => {
    if (locData) {
      setOrder(locData.book);
      setSelectedAddress(defaultAddresses);
    }
  }, [locData, defaultAddresses]);

  const increment = () => quantity < 10 && setQuantity((prev) => prev + 1);
  const decrement = () =>
    quantity > 0 && setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const total = (price * quantity).toFixed(2);

  const buyNow = () => {
    const jso = {
      isbn: order.isbn,
      image: order.coverImage,
      quantity,
      price,
      addressId: selectedAddresses._id,
    };
    axios
      .post(`${loca}/order`, jso, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        hideError();
        navigate("/my-orders");
      })
      .catch((err) => {
        console.log(err);
        showError("Something went wrong");
      });
  };

  const handleChangeAddress = () => {
    setShowModal(true);
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };
  const onHide = () => {
    setShowModal(false);
  };

  if (order) {
    return (
      <div className="container py-5">
        <h2 className="mb-4">🧾 Order Summary</h2>

        {/* Address Section */}
        <div className="card shadow-sm p-3 mb-4">
          <h5>📍 Delivery Address</h5>
          {selectedAddresses ? (
            <div className="mb-3">
              <p className="mb-1 fw-bold">{selectedAddresses.fullName}</p>
              <p className="mb-1">{selectedAddresses.email}</p>
              <p className="mb-1">
                {selectedAddresses.address}, {selectedAddresses.city},{" "}
                {selectedAddresses.state} - {selectedAddresses.pincode}
              </p>
              <p className="mb-1">{selectedAddresses.country}</p>
              <p className="mb-1">📞 {selectedAddresses.phone}</p>
              <button
                className="btn btn-link p-0"
                onClick={handleChangeAddress}
              >
                Change Address
              </button>
            </div>
          ) : (
            <div>
              <p>No address selected.</p>
              <button
                className="btn btn-primary btn-sm"
                onClick={handleChangeAddress}
              >
                Select Address
              </button>
            </div>
          )}
        </div>

        <div className="card shadow-sm p-3">
          <div className="row">
            <div className="col-md-3">
              <img
                src={order.coverImage}
                alt={order.title}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-9">
              <h4>{order.title}</h4>
              <p className="text-muted">by {order.author}</p>
              <div className="d-flex align-items-center mb-3">
                <strong className="me-3">Quantity:</strong>
                <div className="input-group" style={{ width: "120px" }}>
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={decrement}
                  >
                    −
                  </button>
                  <input
                    type="text"
                    className="form-control text-center"
                    value={quantity}
                    readOnly
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={increment}
                  >
                    +
                  </button>
                </div>
              </div>
              <p>Price: ₹{price.toFixed(2)}</p>
              <hr />
              <h5>Total: ₹{total}</h5>
              {error && (
                <div class="alert alert-danger" role="alert">
                  {errorMsg}
                </div>
              )}
              <button className="btn btn-success mt-3" onClick={buyNow}>
                Place Order
              </button>
            </div>
          </div>
        </div>

        <Modal show={showModal} onHide={onHide} centered>
          <Modal.Header closeButton>
            <Modal.Title>Select Delivery Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {addresses.length === 0 ? (
              <p>No saved addresses found.</p>
            ) : (
              <div className="list-group">
                {addresses.map((addr) => (
                  <button
                    key={addr._id}
                    className="list-group-item list-group-item-action"
                    onClick={() => {
                      handleSelectAddress(addr);
                      onHide();
                    }}
                  >
                    <div className="fw-bold">{addr.fullName}</div>
                    <div>{addr.email}</div>
                    <div>
                      {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                    </div>
                    <div>{addr.country}</div>
                    <div>📞 {addr.phone}</div>
                  </button>
                ))}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
