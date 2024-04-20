import express from "express";
import { config } from "dotenv";
import cors from "cors";
import urlRouter from "./routes/url.js";
import URLModel from "./models/url.js";
import connectDb from "./database/connect.js";
import { getIp } from "./utils/ipAddress.js";
import linkPreview from "linkpreview-for-node";
import { getDeviceInfo } from "./utils/deviceInfo.js";

config();

export const app = express();
connectDb();
const PORT = process.env.PORT || 5000;

// middlewares and cors
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/url", urlRouter);
app.post("/preview", async (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) {
    return res.status(400).json({ message: "url is required for preview" });
  }

  try {
    const data = await linkPreview(longUrl);
    const { title, description, image, url } = data;

    if (!title && !description && !image && !url) {
      title = "No title available";
      description = "No description available";
      image = "";
      url = longUrl;
      return res
        .status(404)
        .json({ message: "No preview available for this URL" });
    }

    return res.status(200).json({ title, description, image, url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error fetching preview",
      title: "",
      description: "",
      image: "",
      url: "",
    });
  }
});
app.get("/:urlId", async (req, res) => {
  const urlId = req.params.urlId;

  const ipAddress = getIp(req);
  const deviceInfo = getDeviceInfo(req);
  console.log(deviceInfo);
  const doc = await URLModel.findOneAndUpdate(
    {
      urlId,
    },
    {
      $push: {
        analytics: {
          clickTime: Date.now(),
          ipAddress,
          deviceInfo,
        },
      },
    }
  );

  if (doc) {
    res.redirect(doc.longUrl);
  } else {
    res.status(404).json({ error: "URL not found" });
  }
});
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./public" });
});

app.listen(PORT, () => {
  console.log(`Server is working on port : ${process.env.PORT}`);
});
