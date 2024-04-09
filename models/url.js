import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
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
      },
    ],
  },
  { timestamps: true }
);

const URLModel = mongoose.model("url", urlSchema);

export default URLModel;
