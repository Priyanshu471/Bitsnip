import express from "express";
import {
  createNewShortUrl,
  getAnalytics,
  deleteUrl,
  getAllUrls,
  getPreview,
} from "../controllers/url.js";

const router = express.Router();

router.post("/", createNewShortUrl);
router.get("/preview/:url", getPreview);
router.delete("/delete/:urlId", deleteUrl);
router.get("/analytics/:urlId", getAnalytics);
router.get("/all/:userId", getAllUrls);
export default router;
