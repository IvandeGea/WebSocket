import { Request, Response, NextFunction } from "express";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const userIdCookie = req.cookies.userId;

  if (userIdCookie) {

    return next();
  }
  res.redirect('http://localhost:5173');
};
