import { Request, Response } from 'express';
import { client as redisClient } from '../../redis/client';

export const endTask = async (req: Request, res: Response) => {
    try {
        const id = res.locals.id;
        const taskId = req.cookies.taskId;

        const userLastTask = await redisClient.lRange(id, 0, 0);

        if (userLastTask.length === 0)
            return res.status(200).json({ message: 'No task' });

        const taskDescription = JSON.parse(userLastTask[0]).description;

        const currentDate = new Date();

        const dateFormat = `${currentDate.getFullYear()}-${
            currentDate.getMonth() + 1
        }-${currentDate.getDate()}`;

        const timeFormat = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

        const redisTimestampPayload = JSON.stringify({
            date: dateFormat,
            time: timeFormat,
            makerId: id,
            type: 'end',
        });

        await redisClient.rPush(taskId, redisTimestampPayload);
        const taskTimeStamps = await redisClient.lRange(
            JSON.parse(userLastTask[0]).taskId,
            0,
            -1,
        );

        const taskTimeStampsParsed = taskTimeStamps.map(taskTimeStamp => {
            const timeStampParsed = JSON.parse(taskTimeStamp);

            return {
                date: timeStampParsed.date,
                time: timeStampParsed.time,
                makerId: timeStampParsed.makerId,
                type: timeStampParsed.type,
            };
        });

        return res.status(200).json({
            message: 'Work ended',
            description: taskDescription,
            timeStamps: taskTimeStampsParsed,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: (error as Error).message });
    }
};
