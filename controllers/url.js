import { nanoid } from "nanoid";
import URLModel from "../models/url.js";

async function createNewShortUrl(req, res) {
  const urlId = nanoid(6);
  const { longUrl } = req.body;
  if (!longUrl) {
    return res.status(400).json({ message: "Url is required" });
  }
  await URLModel.create({ urlId, longUrl, analytics: [] });
  return res.status(201).json({ urlId });
}

async function getAnalytics(req, res) {
  const { urlId } = req.params;
  if (!urlId) {
    return res.status(500).json({ message: "url Id is required=" });
  }
  const doc = await URLModel.findOne({ urlId });
  return res.json({
    totalClicks: doc.analytics.length,
    analytics: doc.analytics,
  });
}
export { createNewShortUrl, getAnalytics };
