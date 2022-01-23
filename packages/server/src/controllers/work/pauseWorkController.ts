import { Request, Response, NextFunction } from 'express';
import { client as redisClient } from '../../redis/client';

export const pauseWorkController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const taskId: string = req.cookies.taskId;

        const currentTask = await redisClient.lRange(taskId, 0, -1);

        if (currentTask.length === 0) {
            return res.status(400).json({
                error: 'No task to pause',
            });
        }

        res.locals.taskId = taskId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: (error as Error).message });
    }
};
