import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    urlId: {
      type: String,
      required: true,
      unique: true,
    },
    longUrl: {
      type: String,
      required: true,
    },
    analytics: [
      {
        clickTime: { type: Number },
        ipAddress: { type: String },
        deviceInfo: { type: Object },
      },
    ],
  },
  { timestamps: true }
);

const URLModel = mongoose.model("url", urlSchema);

export default URLModel;
