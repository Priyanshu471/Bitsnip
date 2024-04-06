import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.LOCAL_MONGO_URI);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

export default connectDb;
