import { Request, Response, NextFunction } from 'express';
import { client as redisClient } from '../../redis/client';

export const endTaskController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const id = res.locals.id;

        const lastTask = await redisClient.lRange(id, 0, 0); //last task object

        if (lastTask.length === 0) return next();

        const lastTaskId = JSON.parse(lastTask[0]).taskId; //last task id

        const taskExtended = await redisClient.lRange(lastTaskId, 0, -1);

        if (taskExtended.length === 0) return next();

        const lastTimestamp = JSON.parse(
            taskExtended[taskExtended.length - 1],
        ).type;

        if (
            lastTimestamp === 'pause' ||
            lastTimestamp === 'start' ||
            lastTimestamp === 'resume'
        )
            return next();
        else {
            return res
                .status(400)
                .json({
                    message: 'You have to start some task first to end it',
                });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: (error as Error).message });
    }
};
