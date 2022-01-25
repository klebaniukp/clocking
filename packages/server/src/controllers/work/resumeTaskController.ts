import { Request, Response, NextFunction } from 'express';
import { client as redisClient } from '../../redis/client';

export const resumeTaskController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const taskId: string = req.cookies.taskId;

        const currentTaskLastObj = await redisClient.lRange(taskId, -1, -1);

        if (currentTaskLastObj.length === 0) {
            return res.status(400).json({ message: 'No task to resume' });
        }

        const currentTaskLastObjParsed = JSON.parse(currentTaskLastObj[0]);

        if (currentTaskLastObjParsed.type === 'pause') return next();
        else
            return res
                .status(400)
                .json({ message: 'You have to pause started task first' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: (error as Error).message });
    }
};
