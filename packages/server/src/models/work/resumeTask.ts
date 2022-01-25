import { Request, Response, NextFunction } from 'express';
import { client as redisClient } from '../../redis/client';

export const resumeTask = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.id;

        const userLastTasks = await redisClient.lRange(userId, 0, 0);
        const lastTaskId = JSON.parse(userLastTasks[0]).taskId;

        const currentDate = new Date();

        const dateFormat = `${currentDate.getFullYear()}-${
            currentDate.getMonth() + 1
        }-${currentDate.getDate()}`;

        const timeFormat = `${currentDate.getHours()}
        :${currentDate.getMinutes()}
        :${currentDate.getSeconds()}`;

        const redisUserPayload = JSON.stringify({
            date: dateFormat,
            time: timeFormat,
            type: 'resume',
        });

        await redisClient.rPush(lastTaskId, redisUserPayload);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: (err as Error).message });
    }
};
