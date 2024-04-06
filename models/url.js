import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    urlId: {
      type: String,
      required: true,
      unique: true,
    },
    longUrl: {
      type: String,
      required: true,
    },
    analytics: [{ clickTime: { type: Number } }],
  },
  { timestamps: true }
);

const URLModel = mongoose.model("url", urlSchema);

export default URLModel;
