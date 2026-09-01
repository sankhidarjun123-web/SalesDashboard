import Sale from "../models/Sales.model.js";
import type { Response, Request } from "express";
import UserModel from "../models/User.model.js";

export const getTotalSalesPerCategory = async (req: Request, res: Response) => {

    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.userRole === "user") {
        return res.status(400).json({ message: "Only admins can view" });
    }
    try {
        const sales = await Sale.aggregate([
            {
                $match: {
                    status: "shipped",
                },
            },
            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: "$amount",
                    },
                },
            },
            {
                $sort: {
                    total: -1,
                },
            },
        ]);

        return res.status(200).json({
            success: true,
            message: "Total sales per category fetched successfully",
            data: sales,
        });
    } catch (error) {
        console.error("Aggregation error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch sales analytics",
        });
    }
};

export const assignSales = async (
    req: Request,
    res: Response
) => {
    const userId = req.userId;
    const userRole = req.userRole;

    // Authentication check
    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    // Only admins can assign sales
    if (userRole !== "admin") {
        return res.status(403).json({
            message: "Only admins can assign sales",
        });
    }

    try {
        const {
            title,
            category,
            amount,
            customerName,
            customerEmail,
            assignedUserId,
        } = req.body;

        // Validation
        if (
            !title ||
            !category ||
            !amount ||
            !customerName ||
            !customerEmail ||
            !assignedUserId
        ) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Check whether assigned user exists
        const assignedUser = await UserModel.findById(
            assignedUserId
        );

        if (!assignedUser) {
            return res.status(404).json({
                message: "Assigned user not found",
            });
        }

        // Prevent assigning a sale to another admin
        if (assignedUser.role !== "user") {
            return res.status(400).json({
                message: "Sales can only be assigned to users",
            });
        }

        // Create sale
        const sale = await Sale.create({
            title,
            category,
            amount,
            customerName,
            customerEmail,

            // Admin who assigned the sale
            assignedBy: userId,

            // User who will process the sale
            assignedTo: assignedUserId,

            status: "pending",
        });

        return res.status(201).json({
            success: true,
            message: "Sale assigned successfully",
            sale,
        });

    } catch (err) {
        console.error("Assign sale error:", err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const updateSales = async (
  req: Request,
  res: Response
) => {
  const userId = req.userId;
  const userRole = req.userRole;

  const { completed } = req.body;
  const { saleId } = req.params;

  // Authentication check
  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  // Admins cannot update user sales
  if (userRole === "admin") {
    return res.status(403).json({
      message: "Admins are not allowed to update sales",
    });
  }

  // Validate completed
  if (typeof completed !== "boolean") {
    return res.status(400).json({
      message: "Completed must be a boolean value",
    });
  }

  try {
    // Find sale
    const sale = await Sale.findById(saleId);

    if (!sale) {
      return res.status(404).json({
        message: "Sale not found",
      });
    }

    // Ensure the sale belongs to the logged-in user
    if (sale.assignedTo.toString() !== userId) {
      return res.status(403).json({
        message: "You are not authorized to update this sale",
      });
    }

    // Prevent updating an already completed sale
    if (sale.status !== "pending") {
      return res.status(400).json({
        message: "This sale has already been processed",
      });
    }

    // Update status
    sale.status = completed ? "shipped" : "cancelled";

    // Optional: save completion time
    if (completed) {
      sale.shippedAt = new Date();
    }

    await sale.save();

    return res.status(200).json({
      success: true,
      message: "Sale updated successfully",
      sale,
    });

  } catch (err) {
    console.error("Update sale error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getUserSales = async (
  req: Request,
  res: Response
) => {
  const userId = req.userId;
  const userRole = req.userRole;

  // Check authentication
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  // Prevent admins from accessing user sales
  if (userRole === "admin") {
    return res.status(403).json({
      success: false,
      message: "Admins are not allowed to access user sales",
    });
  }

  try {
    // Get sales assigned to the logged-in user
    const sales = await Sale.find({
      assignedTo: userId,
    })
      .populate("assignedBy", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "User sales fetched successfully",
      sales,
    });

  } catch (err) {
    console.error("Get user sales error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};