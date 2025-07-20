import Address from "../model/Address.js";

// GET all addresses
export const getAddress = async (req, res) => {
  const userId = req.user.userId;
  const addresses = await Address.find({ userId }).sort({ createdAt: -1 });
  res.json(addresses);
};

// POST create new address
export const createAddress = async (req, res) => {
  try {
    const jso = req.body;
    jso.userId = req.user.userId;

    const addressCount = await Address.countDocuments({ userId: jso.userId });
    if (addressCount === 0) {
      jso.isDefault = true;
    }

    const newAddress = new Address(jso);
    const saved = await newAddress.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const updated = await Address.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Address not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE address
export const deleteAdress = async (req, res) => {
  try {
    const deleted = await Address.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Address not found" });
    res.json({ message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
