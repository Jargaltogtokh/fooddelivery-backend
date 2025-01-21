import express, { Request, Response, Router } from "express";
import { Schema, model, connect, Types } from "mongoose";
import { FoodModel } from "./models";

export const foodRouter = Router();

foodRouter.post("/", async (req: Request, res: Response) => {
  const { name, categoryId, price, image, ingredients } = req.body;
  const newItem = await FoodModel.create({
    name,
    categoryId,
    price,
    image,
    ingredients,
  });

  res.send({ message: "New food is created", newItem });
});

foodRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const UpdatedFood = await FoodModel.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );
  if (UpdatedFood) {
    res.json({
      message: "A food is updated successfully",
      UpdatedFood,
    });
  }
});

foodRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const DeletedFood = await FoodModel.findByIdAndDelete(id);
  if (DeletedFood) {
    res.json({
      message: "A food is deleted",
      DeletedFood,
    });
  }
});

foodRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const SearchedFood = await FoodModel.find({ _id: id });
  if (SearchedFood) {
    res.json(SearchedFood);
  }
});

foodRouter.get("/", async (req: Request, res: Response) => {
  const { category } = req.query;

  const filter = category
    ? {
        categoryId: category,
      }
    : {};

  console.log(filter);

  const data = await FoodModel.find(filter);

  console.log(data);
  res.json(data);
});
