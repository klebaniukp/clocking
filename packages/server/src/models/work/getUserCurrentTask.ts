import { Request, Response } from 'express';
import { client as redisClient } from '../../redis/client';

export const getUserCurrentTask = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.id;

        const userLastTask = await redisClient.lRange(userId, 0, 0);

        if (userLastTask.length === 0)
            return res.status(200).json({ message: 'No task' });

        const taskDescription = JSON.parse(userLastTask[0]).description;
        const taskTimeStamps = await redisClient.lRange(userLastTask[0], 0, -1);

        const taskTimeStampsParsed = taskTimeStamps.map(taskTimeStamp => {
            const timeStampParsed = JSON.parse(taskTimeStamp);

            console.log(timeStampParsed);

            return {
                date: timeStampParsed.date,
                time: timeStampParsed.time,
                makerId: timeStampParsed.makerId,
                type: timeStampParsed.type,
            };
        });

        if (taskTimeStamps.length === 0) {
            return res.status(200).json({
                message: 'No task found',
            });
        }

        if (
            taskTimeStampsParsed[taskTimeStampsParsed.length - 1].type === 'end'
        ) {
            return res.status(200).json({
                message: 'No started task',
            });
        }

        return res.status(200).json({
            description: taskDescription,
            timeStamps: taskTimeStampsParsed,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: (error as Error).message });
    }
};
