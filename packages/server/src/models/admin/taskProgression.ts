import { Request, Response } from 'express';
import { client as redisClient } from '../../redis/client';
import { UserModel } from '../../mongo/User';
import { ITaskClient } from '../../types/types';

interface IAdminTask {
    taskId: string;
    makerId: string;
    description: string;
}

export const taskProgression = async (req: Request, res: Response) => {
    try {
        const tasks: IAdminTask[] = res.locals.tasks;

        const taskProgression = tasks.map(async task => {
            const taskId = task.taskId;
            const makerId = task.makerId;
            const description = task.description;

            const maker = await UserModel.findById(makerId);

            if (!maker) {
                throw new Error('Maker not found');
            }

            const makerEmail = maker.email;

            const taskProgression = await redisClient.lRange(taskId, 0, -1);

            const taskProgressionFormatted = taskProgression.map(
                taskProgression => {
                    const taskFormated = JSON.parse(taskProgression);

                    const returnal = {
                        date: taskFormated.date,
                        time: taskFormated.time,
                        type: taskFormated.type,
                        makerId: makerId,
                    };

                    return returnal;
                },
            );

            return {
                taskId: taskId,
                maker: makerEmail,
                description: description,
                taskProgression: taskProgressionFormatted,
            };
        });

        const taskProgressionResolved = await Promise.all(taskProgression);

        return res.status(200).json({
            taskProgression: taskProgressionResolved,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: (error as Error).message });
    }
};
