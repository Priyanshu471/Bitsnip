import { nanoid } from "nanoid";
import URLModel from "../models/url.js";
import { getTimeStamp } from "../utils/timestamp.js";
import { getLocation } from "../utils/ipAddress.js";
import linkPreview from "linkpreview-for-node";
import { getPreviewData } from "../utils/getPreview.js";

async function createNewShortUrl(req, res) {
  console.log("Recieved request to create new short url");
  const urlId = nanoid(process.env.ID_LENGTH || 6);
  const { longUrl, userId } = req.body;
  console.log("longUrl", longUrl, "userId", userId);
  if (!longUrl || !userId) {
    return res.status(400).json({ message: "Url and UserId is required" });
  }
  await URLModel.create({ userId, urlId, longUrl, analytics: [] });
  return res.status(201).json({ urlId });
}

async function deleteUrl(req, res) {
  console.log("Recieved request to delete url");
  const { urlId } = req.params;
  if (!urlId) {
    return res.status(400).json({ message: "urlId is required" });
  }
  try {
    const doc = await URLModel.findOneAndDelete({ urlId });
    if (doc !== null) return res.json({ message: "Deleted successfully" });
    else return res.status(404).json({ message: "Not Found in database" });
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
  try {
    let { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const docs = await URLModel.find({ userId }).lean();

    const urls = await Promise.all(
      docs.map(async (doc) => {
        const previewData = await getPreviewData({ longUrl: doc.longUrl });
        return {
          urlId: doc.urlId,
          longUrl: doc.longUrl,
          previewData: previewData,
        };
      })
    );
    return res.status(200).json({
      urls,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching the URLs" });
  }
}

async function getPreview(req, res) {
  const { url } = req.params;
  if (!url) {
    return res.status(400).json({ message: "url is required" });
  }
  try {
    const previewData = await linkPreview(url);
    return res.status(200).json({ previewData });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching preview data" });
  }
}

export { createNewShortUrl, deleteUrl, getAnalytics, getAllUrls, getPreview };
