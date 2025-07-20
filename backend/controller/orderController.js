import Order from "../model/Order.js";

export const createOrder = async (req, res) => {
  const { isbn, quantity, price, image, addressId } = req.body;
  const userId = req.user.userId;
  try {
    const totalPrice = price * quantity;
    const order = new Order({
      userId,
      isbn,
      quantity,
      totalPrice,
      image,
      addressId,
    });
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    console.log(err);

    res.status(400).json({ message: "Failed to create order" });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate("isbn", "title image price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const cancelOrder = async (req, res) => {
  const { orderId, reason } = req.body;
  try {
    const order = await Order.findById(orderId);
    if (!order || order.status !== "Pending")
      return res.status(400).json({ message: "Cannot cancel" });

    order.status = "Cancelled";
    order.cancellationReason = reason;
    await order.save();

    res.json({ message: "Order cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error cancelling order" });
  }
};
