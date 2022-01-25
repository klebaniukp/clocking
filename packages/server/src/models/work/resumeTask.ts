import { Request, Response } from 'express';
import { client as redisClient } from '../../redis/client';

export const resumeTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.cookies.taskId;
        const id = res.locals.id;

        const currentDate = new Date();

        const dateFormat = `${currentDate.getFullYear()}-${
            currentDate.getMonth() + 1
        }-${currentDate.getDate()}`;

        const timeFormat = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

        const redisUserPayload = JSON.stringify({
            date: dateFormat,
            time: timeFormat,
            makerId: id,
            type: 'resume',
        });

        await redisClient.rPush(taskId, redisUserPayload);

        return res.status(200).json({ message: 'Task resumed' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: (err as Error).message });
    }
};
