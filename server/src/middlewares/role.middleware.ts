import type { Request, Response, NextFunction } from "express";

export const onlyAdmins = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.userRole === "user") {
      return res.status(403).json({
        success: false,
        message: "Admins are not allowed to access this resource",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authorization failed",
    });
  }
};