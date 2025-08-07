import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import storeRouter from "./routes/storeRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import authRouter from "./routes/authRoutes.js";
import inventoryRouter from "./routes/inventroyRoute.js";  
import branchRouter from "./routes/branchRoute.js";  
import cookieParser from "cookie-parser";
import Admin from "./models/admin.js";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000","https://smart-stores-theta.vercel.app"],
    credentials: true,
  })
);

app.use("/auth", authRouter);
app.use("/stores", storeRouter);
app.use("/owner", ownerRouter);
app.use("/inventories", inventoryRouter);  
app.use("/branches", branchRouter); 


const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

console.log("CONNECTION_URL:", process.env.CONNECTION_URL);

if (!CONNECTION_URL) {
  console.error("CONNECTION_URL is not defined. Please check your .env file.");
  process.exit(1);
}
//signin problem solved
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, async () => {
      console.log(`Server Running on port ${PORT}`);

      let admin = await Admin.findOne();

      if (!admin) {
        const defaultEmail = "admin@gmail.com";
        const defaultPassword = "123";
        const hashedPassword = await hashPassword(defaultPassword);
  
        admin = new Admin({
          email: defaultEmail,
          password: hashedPassword,
        });
        await admin.save();
        console.log("Admin Created");
      }else{
        console.log("Admin already exist");
      }
  
    })
  )
  .catch((error) => console.log(error.message));
