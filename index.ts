import express, { Request, Response } from "express";
import { configDotenv } from "dotenv";
import { MongoClient } from "mongodb";
import { Schema, model, connect } from "mongoose";

const PORT = 8001;
const app = express();
app.use(express.json());

configDotenv();

const connectMongoDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (MONGODB_URI) {
    await connect(MONGODB_URI);
  }
};

connectMongoDB();

const FOOD_CATEGORY_SCHEMA = new Schema(
  {
    categoryName: String,
  },
  { timestamps: true }
);

const FoodCategoryModel = model(
  "FoodCategory",
  FOOD_CATEGORY_SCHEMA,
  "food-category"
);

app.get("/", async (req: Request, res: Response) => {
  const FoodCategories = await FoodCategoryModel.find();
  res.json(FoodCategories);
});

app.get("/create", async (req: Request, res: Response) => {
  const newItem = await FoodCategoryModel.create({
    categoryName: "New Food Category created successfully.",
  });

  res.send({ message: "New Food Category created successfully", newItem });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
