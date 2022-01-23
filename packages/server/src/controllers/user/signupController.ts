import express, { Request, Response, NextFunction } from 'express';
import { UserModel } from '../../mongo/User';

export const signupController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(400).json({
                error: 'User already exists',
            });
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: (error as Error).message });
    }
};
