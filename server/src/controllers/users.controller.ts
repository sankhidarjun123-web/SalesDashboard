import type { Request, Response } from "express";
import UserModel from "../models/User.model.js";
import Sale from "../models/Sales.model.js";

export const getAdminInfo = async (
  req: Request,
  res: Response
) => {
  const userId = req.userId;
  const userRole = req.userRole;
  const { adminId } = req.params;

  // Authentication check
  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  // Check admin ID
  if (!adminId) {
    return res.status(400).json({
      message: "Admin id is required",
    });
  }

  // Only the logged-in admin can access their dashboard
  if (userId !== adminId || userRole === "user") {
    return res.status(403).json({
      message: "You cannot view this page",
    });
  }

  try {
    // Fetch the admin information
    const admin = await UserModel.findOne({
      _id: adminId,
      role: "admin",
    }).select("-password");

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    // Fetch all users with role = "user"
    const users = await UserModel.find({
      role: "user",
    }).select("-password");

    return res.status(200).json({
      success: true,
      message: "Admin information fetched successfully",

      admin,

      users,
    });

  } catch (err) {
    console.error("Get admin info error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getUserInfo = async (
  req: Request,
  res: Response
) => {
  const userId = req.userId;
  const userRole = req.userRole;
  const { usersId } = req.params;

  // Authentication check
  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  // Check user ID
  if (!usersId) {
    return res.status(400).json({
      message: "Admin id is required",
    });
  }

  try {

    const user = await UserModel.findById(usersId).select("-password").lean();

    if (!user) {
      return res.status(400).json({ message: "Bad Request: User cannot be found" });
    }

    if (userId !== usersId && userRole !== "admin") {
      return res.status(403).json({ message: "Forbidden: Only admins or account holders can view" });
    }

    const sales = await Sale.find({
      assignedTo: usersId
    }).lean();

    res.status(200).json(
      {
        message: "user information fetched",
        userInfo: user,
        sales: sales
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
