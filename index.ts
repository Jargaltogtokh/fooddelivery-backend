import express, { Request, Response } from "express";
import { configDotenv } from "dotenv";
import { MongoClient } from "mongodb";
import { Schema, model, connect } from "mongoose";
import { deepStrictEqual } from "assert";

const PORT = 8001;
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

configDotenv();

const connectMongoDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (MONGODB_URI) {
    await connect(MONGODB_URI);
  }
};

connectMongoDB();

app.use("/food-category/", foodCategoryRouter);
app.use("/food/", foodRouter);

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

// app.post("/food-category/create", async (req: Request, res: Response) => {
//   const { categoryName } = req.body;
//   const newItem = await FoodCategoryModel.create({
//     categoryName,
//   });

//   res.send({ message: "New food category created successfully", newItem });
// });

// app.put("/food-category/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { categoryName } = req.body;

//   const UpdatedCategory = await FoodCategoryModel.findByIdAndUpdate(
//     id,
//     { categoryName },
//     { new: true }
//   );
//   if (UpdatedCategory) {
//     res.json({
//       message: "A food category updated successfully",
//       UpdatedCategory,
//     });
//   }
// });

// app.delete("/food-category/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const DeletedCategory = await FoodCategoryModel.findByIdAndDelete(id);
//   if (DeletedCategory) {
//     res.json({
//       message: "A food category deleted successfully",
//       DeletedCategory,
//     });
//   }
// });

// app.get("/food-category/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const SearchedCategory = await FoodCategoryModel.find({ _id: id });
//   if (SearchedCategory) {
//     res.json(SearchedCategory);
//   }
// });

// app.get("/food-category/", async (req: Request, res: Response) => {
//   const data = await FoodCategoryModel.find();
//   res.json(data);
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
