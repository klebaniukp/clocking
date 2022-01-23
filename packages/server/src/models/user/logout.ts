import { Request, Response } from 'express';

export const logout = async (req: Request, res: Response) => {
    try {
        return res
            .status(200)
            .clearCookie('token')
            .json({ message: 'Logged out' });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};
