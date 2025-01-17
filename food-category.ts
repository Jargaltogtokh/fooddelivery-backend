import express, { Request, Response, Router } from "express";
import { FoodCategoryModel } from "./models";

export const foodCategoryRouter = Router();

foodCategoryRouter.post("/", async (req: Request, res: Response) => {
  const { categoryName } = req.body;
  const newItem = await FoodCategoryModel.create({
    categoryName,
  });

  res.send({ message: "New food category created successfully", newItem });
});

foodCategoryRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { categoryName } = req.body;

  const UpdatedCategory = await FoodCategoryModel.findByIdAndUpdate(
    id,
    { categoryName },
    { new: true }
  );
  if (UpdatedCategory) {
    res.json({
      message: "A food category updated successfully",
      UpdatedCategory,
    });
  }
});

foodCategoryRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const DeletedCategory = await FoodCategoryModel.findByIdAndDelete(id);
  if (DeletedCategory) {
    res.json({
      message: "A food category deleted successfully",
      DeletedCategory,
    });
  }
});

foodCategoryRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const SearchedCategory = await FoodCategoryModel.find({ _id: id });
  if (SearchedCategory) {
    res.json(SearchedCategory[0]);
  }
});

foodCategoryRouter.get("/", async (req: Request, res: Response) => {
  const data = await FoodCategoryModel.find();
  res.json(data);
});
