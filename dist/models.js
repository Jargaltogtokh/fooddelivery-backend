"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodModel = exports.FoodCategoryModel = void 0;
const mongoose_1 = require("mongoose");
const FOOD_CATEGORY_SCHEMA = new mongoose_1.Schema({
    categoryName: String,
}, { timestamps: true });
exports.FoodCategoryModel = (0, mongoose_1.model)("FoodCategory", FOOD_CATEGORY_SCHEMA, "food-category");
const FOOD_SCHEMA = new mongoose_1.Schema({
    name: String,
    price: Number,
    image: String,
    ingredients: String,
    categoryId: { type: mongoose_1.Schema.Types.ObjectId, ref: exports.FoodCategoryModel },
}, { timestamps: true });
exports.FoodModel = mongoose_1.models["Food"] || (0, mongoose_1.model)("Food", FOOD_SCHEMA);
