import { Request, Response, NextFunction } from 'express';
import { client as redisClient } from '../../redis/client';

export const resumeTaskController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const taskId: string = req.cookies.taskId;

        const currentTask = await redisClient.lRange(taskId, 0, -1);

        const userLastTaskId = JSON.parse(currentTask[0]).taskId;

        const lastTimestamp = await redisClient.lRange(userLastTaskId, -1, -1);

        res.locals.taskId = taskId;

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
