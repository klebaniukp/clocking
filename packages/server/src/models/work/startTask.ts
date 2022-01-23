import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { client as redisClient } from '../../redis/client';

export const startTask = async (req: Request, res: Response) => {
    try {
        const { description } = req.body;

        const id = res.locals.id;
        const taskId = uuidv4();

        const currentDate = new Date();

        const dateFormat = `${currentDate.getFullYear()}-${
            currentDate.getMonth() + 1
        }-${currentDate.getDate()}`;

        const timeFormat = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

        const redisUserPayload = JSON.stringify({
            taskId: taskId,
            description: description,
        });

        await redisClient.lPush(id, redisUserPayload);

        const redisTimestampPayload = JSON.stringify({
            date: dateFormat,
            time: timeFormat,
        });

        await redisClient.rPush(taskId, redisTimestampPayload);

        return res
            .status(200)
            .json({ message: 'Work started' })
            .cookie('taskId', taskId, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: (error as Error).message });
    }
};
