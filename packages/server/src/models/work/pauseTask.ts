import { Request, Response } from 'express';
import { client as redisClient } from '../../redis/client';

export const pauseTask = async (req: Request, res: Response) => {
    try {
        const taskId: string = res.locals.taskId;

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
            type: 'pause',
        });

        await redisClient.rPush(taskId, redisUserPayload);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: (error as Error).message });
    }
};
