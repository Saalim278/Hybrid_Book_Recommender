import express from "express";
import { recommed, recommendByAuthor, recommendByTitle } from "../controller/recommendationController.js";

const router = express.Router();
router.get("/:isbn", recommed);
router.get("/title/:title", recommendByTitle);
router.get("/author/:author", recommendByAuthor);

export default router;
