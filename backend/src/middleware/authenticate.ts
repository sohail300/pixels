import { Request, Response, NextFunction } from "express";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
