"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const mongoose_1 = require("mongoose");
const food_category_1 = require("./food-category");
const food_1 = require("./food");
const food_order_1 = require("./food-order");
const PORT = 8001;
const app = (0, express_1.default)();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
app.use(express_1.default.json());
(0, dotenv_1.configDotenv)();
const connectMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (MONGODB_URI) {
        yield (0, mongoose_1.connect)(MONGODB_URI);
    }
});
connectMongoDB();
app.use("/food-category", food_category_1.foodCategoryRouter);
app.use("/food", food_1.foodRouter);
app.use("/food-order", food_order_1.foodOrderRouter);
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
