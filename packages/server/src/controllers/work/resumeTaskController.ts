import { Request, Response, NextFunction } from 'express';
import { client as redisClient } from '../../redis/client';

export const resumeTaskController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userId = res.locals.id;

        const userLastTasks = await redisClient.lRange(userId, 0, 0);

        const userLastTaskId = JSON.parse(userLastTasks[0]).taskId;

        const lastTimestamp = await redisClient.lRange(userLastTaskId, -1, -1);

        if (JSON.parse(lastTimestamp[0]).type === 'pause') next();
        else
            return res
                .status(400)
                .json({ message: 'You have to pause started task first' });
                
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: (error as Error).message });
    }
};
