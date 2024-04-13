import { nanoid } from "nanoid";
import URLModel from "../models/url.js";
import { getTimeStamp } from "../utils/timestamp.js";
import { getLocation } from "../utils/ipAddress.js";

async function createNewShortUrl(req, res) {
  const urlId = nanoid(process.env.ID_LENGTH || 6);
  const { longUrl, userId } = req.body;
  if (!longUrl || !userId) {
    return res.status(400).json({ message: "Url and UserId is required" });
  }
  await URLModel.create({ userId, urlId, longUrl, analytics: [] });
  return res.status(201).json({ urlId });
}

async function deleteUrl(req, res) {
  const { urlId } = req.params;
  if (!urlId) {
    return res.status(400).json({ message: "urlId is required" });
  }
  try {
    await URLModel.findOneAndDelete({ urlId });
    return res.status(204).json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting url" });
  }
}

async function getAnalytics(req, res) {
  const { urlId } = req.params;
  if (!urlId) {
    return res.status(500).json({ message: "url Id is required=" });
  }
  const doc = await URLModel.findOne({ urlId });
  const epoch = doc.analytics.map((item) => item.clickTime);
  const ipAddresses = doc.analytics.map((item) => item.ipAddress);

  const allTimestamps = getTimeStamp(epoch);
  const alllocations = await getLocation([...new Set(ipAddresses)]);

  return res.json({
    totalClicks: doc.analytics.length,
    ipAddresses: [...new Set(ipAddresses)],
    allTimestamps: allTimestamps,
    alllocations: alllocations,
  });
}

async function getAllUrls(req, res) {
  let { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }
  console.log(userId);
  const docs = await URLModel.find({ userId });
  const urls = docs.map((doc) => ({
    urlId: doc.urlId,
    longUrl: doc.longUrl,
  }));
  return res.status(200).json({
    urls,
  });
}

export { createNewShortUrl, deleteUrl, getAnalytics, getAllUrls };
