import { Schema, model, connect } from "mongoose";

const FOOD_CATEGORY_SCHEMA = new Schema(
  {
    categoryName: String,
  },
  { timestamps: true }
);

export const FoodCategoryModel = model(
  "FoodCategory",
  FOOD_CATEGORY_SCHEMA,
  "food-category"
);

const FOOD_SCHEMA = new Schema(
  {
    name: String,
    price: String,
    image: String,
    ingredients: String,
    categoryId: { type: String, required: true },
  },
  { timestamps: true }
);

export const FoodModel = model("Food", FOOD_SCHEMA);
