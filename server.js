import { app } from "./app.js";
import connectDb from "./database/connect.js";

connectDb();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is working on port : ${process.env.PORT}`);
});
