import { Request, Response } from 'express';
import { client as redisClient } from '../../redis/client';

interface IAdminTask {
    taskId: string;
}

export const taskProgression = async (req: Request, res: Response) => {
    try {
        const tasks: IAdminTask[] = res.locals.tasks;

        const taskProgression = tasks.map(async task => {
            const taskId = task.taskId;

            const taskProgression = await redisClient.lRange(taskId, 0, -1);

            const taskProgressionFormatted = taskProgression.map(
                taskProgression => {
                    taskProgression = JSON.parse(taskProgression);
                    return taskProgression;
                },
            );

            return {
                taskId: taskId,
                taskProgression: taskProgressionFormatted,
            };
        });

        const taskProgressionFormatted = await Promise.all(taskProgression);

        return res.status(200).json({
            taskProgression: taskProgressionFormatted,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: (error as Error).message });
    }
};
