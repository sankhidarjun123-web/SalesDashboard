import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.model.js';


const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {

    const tokenHeaderKey: string = process.env.TOKEN_HEADER_KEY as string;
    const secretKey: string = process.env.SECRET_KEY as string;

    try {

        const authHeader = req.headers[tokenHeaderKey] as string;

        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1];

        if(!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const verify = jwt.verify(token, secretKey) as {
            userId: string;
        };

        if (!verify) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        const userRole = await UserModel.findById(verify.userId).select("role").lean();

        if(!userRole) {
            return res.status(404).json({ message: "User not found" });
        }

        req.userId = verify.userId as string;
        req.userRole = userRole.role;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
}

export default authMiddleware;