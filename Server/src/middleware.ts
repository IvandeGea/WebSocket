import { Request, Response, NextFunction } from "express";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  // Verificar la presencia de la cookie de autenticación (por ejemplo, 'userId')
  const userIdCookie = req.cookies.userId;

  if (userIdCookie) {

    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};


  