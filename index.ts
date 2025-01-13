import express, { Request, Response } from "express";
import { configDotenv } from "dotenv";
import { MongoClient } from "mongodb";

const PORT = 8001;
const app = express();
app.use(express.json());

configDotenv();
const URI = process.env.MONGODB_URI;

console.log(URI);
//1. Connect to MongoDB

export const connectToTB= async ()+> {}

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello from backend");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
