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
exports.foodRouter = void 0;
const express_1 = require("express");
const models_1 = require("./models");
exports.foodRouter = (0, express_1.Router)();
exports.foodRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, categoryId, price, image, ingredients } = req.body;
    const newItem = yield models_1.FoodModel.create({
        name,
        categoryId,
        price,
        image,
        ingredients,
    });
    res.send({ message: "New food is created", newItem });
}));
exports.foodRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const newFood = req.body;
    const UpdatedFood = yield models_1.FoodModel.findByIdAndUpdate(id, newFood, {
        new: true,
    });
    if (UpdatedFood) {
        res.json({
            message: "A food is updated successfully",
            UpdatedFood,
        });
    }
}));
exports.foodRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const DeletedFood = yield models_1.FoodModel.findByIdAndDelete(id);
    if (DeletedFood) {
        res.json({
            message: "A food is deleted",
            DeletedFood,
        });
    }
}));
exports.foodRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const SearchedFood = yield models_1.FoodModel.find({ _id: id });
    if (SearchedFood) {
        res.json(SearchedFood);
    }
}));
exports.foodRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.query;
    const filter = category
        ? {
            categoryId: category,
        }
        : {};
    console.log(filter);
    const data = yield models_1.FoodModel.find(filter);
    console.log(data);
    res.json(data);
}));
