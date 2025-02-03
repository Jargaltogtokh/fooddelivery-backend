import { Request, Response, Router } from "express";
import { auth, CustomRequest, isAdmin } from "./middleware/auth";
import { FoodOrderModel } from "./food-order-model";

export const foodOrderRouter = Router();

foodOrderRouter.post("/", auth, async (req: Request, res: Response) => {
  const user = res.locals.userId;
  const { foodOrderItems, totalPrices, address } = req.body;

  const order = { user, foodOrderItems, totalPrices };
  const newOrder = await FoodOrderModel.create(order);
  res.json(newOrder);
});

foodOrderRouter.get(
  "/orders",
  auth,
  isAdmin,
  async (req: Request, res: Response) => {
    try {
      const allOrders = await FoodOrderModel.find({});

      res.json(allOrders);
    } catch (e) {
      res.send(e);
    }
  }
);

foodOrderRouter.get("/my-order", auth, async (req: Request, res: Response) => {
  try {
    const user = res.locals.userId;
    const myOrders = await FoodOrderModel.find({
      user: user,
    });

    res.json(myOrders);
  } catch (e) {
    res.send(e);
  }
});

foodOrderRouter.put(
  "/orders/:orderId",
  auth,
  isAdmin,
  async (req: Request, res: Response) => {
    try {
      const { status } = req.body;
      const allOrders = await FoodOrderModel.findByIdAndUpdate(
        req.params.orderId,
        { status }
      );

      res.json(allOrders);
    } catch (e) {
      res.send(e);
    }
  }
);
