import { Request, Response } from "express";
const { verifyToken } = require("@clerk/backend");

export type CustomRequest = Request & {
  userId?: string;
  role: string;
};

export const auth = async (req: Request, res: Response, next: () => void) => {
  const token = res.get("authentication");
  try {
    const verified = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    const userId = verified.sub;
    const role = verified.metadata.role;

    res.locals.userId = userId;
    res.locals.role = role;

    next();
  } catch {
    res.json({ status: "Forbidden" });
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  if (res.locals.role !== "admin") {
    res.sendStatus(403);
    return;
  }
  next();
};
