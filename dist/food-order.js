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
exports.foodOrderRouter = void 0;
const express_1 = require("express");
const auth_1 = require("./middleware/auth");
const food_order_model_1 = require("./food-order-model");
exports.foodOrderRouter = (0, express_1.Router)();
exports.foodOrderRouter.post("/", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.userId;
    const { foodOrderItems, totalPrices, address } = req.body;
    const order = { user, foodOrderItems, totalPrices };
    const newOrder = yield food_order_model_1.FoodOrderModel.create(order);
    res.json(newOrder);
}));
exports.foodOrderRouter.get("/orders", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allOrders = yield food_order_model_1.FoodOrderModel.find({});
        res.json(allOrders);
    }
    catch (e) {
        res.send(e);
    }
}));
exports.foodOrderRouter.get("/my-order", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.userId;
        const myOrders = yield food_order_model_1.FoodOrderModel.find({
            user: user,
        });
        res.json(myOrders);
    }
    catch (e) {
        res.send(e);
    }
}));
exports.foodOrderRouter.put("/orders/:orderId", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const allOrders = yield food_order_model_1.FoodOrderModel.findByIdAndUpdate(req.params.orderId, { status });
        res.json(allOrders);
    }
    catch (e) {
        res.send(e);
    }
}));
