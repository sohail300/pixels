import { Request, Response } from "express";

export const explore = async (req: Request, res: Response) => {
  res.json({
    explore: "explore",
  });
};

export const search = async (req: Request, res: Response) => {
  res.send("Search");
};

export const suggested = async (req: Request, res: Response) => {
  res.send("Suggested");
};

export const liked = async (req: Request, res: Response) => {
  res.send("Liked");
};
