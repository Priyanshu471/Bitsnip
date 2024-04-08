import express from "express";
import { config } from "dotenv";
import cors from "cors";
import urlRouter from "./routes/url.js";
import URLModel from "./models/url.js";
import connectDb from "./database/connect.js";
config();

export const app = express();
connectDb();
const PORT = process.env.PORT || 5000;

// middlewares and cors
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://bit-snip.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/url", urlRouter);
app.get("/:urlId", async (req, res) => {
  const urlId = req.params.urlId;
  const doc = await URLModel.findOneAndUpdate(
    {
      urlId,
    },
    {
      $push: {
        analytics: {
          clickTime: Date.now(),
        },
      },
    }
  );
  res.redirect(doc.longUrl);
});

app.listen(PORT, () => {
  console.log(`Server is working on port : ${process.env.PORT}`);
});
