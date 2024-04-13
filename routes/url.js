import express from "express";
import {
  createNewShortUrl,
  getAnalytics,
  deleteUrl,
  getAllUrls,
} from "../controllers/url.js";

const router = express.Router();

router.post("/", createNewShortUrl);
router.delete("/:urlId", deleteUrl);
router.get("/analytics/:urlId", getAnalytics);
router.get("/all/:userId", getAllUrls);
export default router;
