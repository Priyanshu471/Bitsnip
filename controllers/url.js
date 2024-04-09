import { nanoid } from "nanoid";
import URLModel from "../models/url.js";
import { getTimeStamp } from "../utils/timestamp.js";
import { getLocation } from "../utils/ipAddress.js";

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
export { createNewShortUrl, getAnalytics };
