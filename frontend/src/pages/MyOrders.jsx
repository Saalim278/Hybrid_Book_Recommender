import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form, Card, Tabs, Tab } from "react-bootstrap";
import axios from "axios";
import { BookSto } from "../Context";

const MyOrders = () => {
  const { userDetails, token, loca } = useContext(BookSto);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pending");

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${loca}/order/user/${userDetails.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

  const submitCancellation = async () => {
    try {
      await axios.post(
        `${loca}/order/cancel`,
        {
          orderId: selectedOrderId,
          reason: cancelReason,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShowModal(false);
      setCancelReason("");
      fetchOrders(); // refresh
    } catch (err) {
      console.error("Cancellation failed:", err);
    }
  };
  const filteredOrders = orders.filter(
    (order) => order.status === statusFilter
  );
  return (
    <div className="container mt-4">
      <h2>My Orders</h2>

      <Tabs
        activeKey={statusFilter}
        onSelect={(k) => setStatusFilter(k)}
        className="mb-4"
        justify
      >
        <Tab eventKey="Pending" title="🆕 New Orders" />
        <Tab eventKey="Delivered" title="✅ Delivered" />
        <Tab eventKey="Cancelled" title="❌ Cancelled" />
      </Tabs>

      {orders.length > 0 ? (
        <>
          {filteredOrders.length === 0 ? (
            <p
              className="container d-flex justify-content-center align-items-center"
              style={{
                minHeight: "80vh",
              }}
            >
              No {statusFilter.toLowerCase()} orders found.
            </p>
          ) : (
            <div className="row">
              {filteredOrders.map((order) => (
                <div className="col-md-4 mb-4" key={order._id}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={order.image}
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title>{order.title}</Card.Title>
                      <Card.Text>
                        Price: ₹{order.totalPrice / order.quantity}
                        <br />
                        Quantity: {order.quantity}
                        <br />
                        Total: ₹{order.totalPrice}
                        <br />
                        Status: <strong>{order.status}</strong>
                        <br />
                        Ordered: {new Date(order.createdAt).toLocaleString()}
                      </Card.Text>
                      {order.status !== "Cancelled" && (
                        <Button
                          variant="danger"
                          onClick={() => handleCancelClick(order._id)}
                        >
                          Cancel Order
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{
            minHeight: "80vh",
          }}
        >
          <p className="text-secondary">No orders found</p>
        </div>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="cancelReason">
              <Form.Label>Select a reason for cancellation</Form.Label>
              <Form.Control
                as="select"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              >
                <option value="">-- Select reason --</option>
                <option>Changed my mind</option>
                <option>Found a better price elsewhere</option>
                <option>Order placed by mistake</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={submitCancellation}
            disabled={!cancelReason}
          >
            Submit Cancellation
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyOrders;
