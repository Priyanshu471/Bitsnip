import express from "express";
import { createNewShortUrl, getAnalytics } from "../controllers/url.js";

const router = express.Router();

router.post("/", createNewShortUrl);
router.get("/analytics/:urlId", getAnalytics);
export default router;
