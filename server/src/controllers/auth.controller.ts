import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { RegisterBody, LoginBody } from '../types/auth.type.js'
import bycrypt from 'bcrypt';
import UserModel from '../models/User.model.js';

export const login = async (req: Request, res: Response) => {

    const { email, password }: LoginBody = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password ' });
        }

        const isMatch = await bycrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY as string, { expiresIn: '1h' });

        user.isLoggedIn = true;
        await user.save();

        return res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}


export const register = async (req: Request, res: Response) => {


    const { name, email, password, confirmPassword, role }: RegisterBody = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bycrypt.hash(password, 12);

        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}


export const logout = async (req: Request, res: Response) => {

    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isLoggedIn = false;
        await user.save();

        return res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}