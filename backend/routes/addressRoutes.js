import express from "express";
import {
  createAddress,
  deleteAdress,
  getAddress,
  updateAddress,
} from "../controller/addressController.js";

const router = express.Router();

// GET all addresses
router.get("/fetch", getAddress);

// POST create new address
router.post("/insert", createAddress);

// PUT update address
router.post("/update", updateAddress);

// DELETE address
router.get("/delete/:id", deleteAdress);

export default router;
