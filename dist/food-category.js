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
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodCategoryRouter = void 0;
const express_1 = require("express");
const models_1 = require("./models");
exports.foodCategoryRouter = (0, express_1.Router)();
exports.foodCategoryRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryName } = req.body;
    const newItem = yield models_1.FoodCategoryModel.create({
        categoryName,
    });
    res.send({ message: "New food category created successfully", newItem });
}));
exports.foodCategoryRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { categoryName } = req.body;
    const UpdatedCategory = yield models_1.FoodCategoryModel.findByIdAndUpdate(id, { categoryName }, { new: true });
    if (UpdatedCategory) {
        res.json({
            message: "A food category updated successfully",
            UpdatedCategory,
        });
    }
}));
exports.foodCategoryRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const DeletedCategory = yield models_1.FoodCategoryModel.findByIdAndDelete(id);
    if (DeletedCategory) {
        res.json({
            message: "A food category deleted successfully",
            DeletedCategory,
        });
    }
}));
exports.foodCategoryRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const SearchedCategory = yield models_1.FoodCategoryModel.find({ _id: id });
    if (SearchedCategory) {
        res.json(SearchedCategory[0]);
    }
}));
exports.foodCategoryRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield models_1.FoodCategoryModel.find();
    res.json(data);
}));
