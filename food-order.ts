import { Request, Response, Router } from "express";
import { auth, CustomRequest } from "./middleware/auth";
import { FoodOrderModel } from "./food-order-model";

export const foodOrderRouter = Router();

foodOrderRouter.post("/", auth, async (req: CustomRequest, res: Response) => {
  const user = req.userId;
  const { foodOrderItems, totalPrices } = req.body;

  const order = { user, foodOrderItems, totalPrices };
  const newOrder = await FoodOrderModel.create(order);
  res.json(newOrder);
});
