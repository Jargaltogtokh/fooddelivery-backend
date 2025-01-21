import { Schema, model, connect, models } from "mongoose";

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
    categoryId: { type: Schema.Types.ObjectId, ref: FoodCategoryModel },
  },
  { timestamps: true }
);

export const FoodModel = models["Food"] || model("Food", FOOD_SCHEMA);
