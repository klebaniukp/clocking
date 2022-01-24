import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const checkToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const secret = process.env.JWT_SECRET_TOKEN as string;
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        if (!jwt.verify(token, secret))
            return res.status(401).json({ message: 'Invalid token' });

        const decoded = jwt.decode(token) as JwtPayload;

        res.locals.id = decoded._id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: (error as Error).message });
    }
};
