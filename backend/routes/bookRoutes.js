import express from "express";
import { getRecommendation } from "../controller/bookController.js";
const router = express.Router();


router.get("/recommend/:isbn", getRecommendation);

export default router;
