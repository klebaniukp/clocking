import { Request, Response, NextFunction } from 'express';
import { client as redisClient } from '../../redis/client';

export const taskProgressionControler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userId = res.locals.id;

        if (userId !== 'admin')
            return res.status(400).json({
                error: 'You are not admin',
            });

        let tasks = await redisClient.lRange('admin', 0, -1);

        if (tasks.length === 0)
            return res.status(400).json({
                error: 'No tasks to show',
            });

        tasks = tasks.map(task => {
            task = JSON.parse(task);
            return task;
        });

        res.locals.tasks = tasks;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: (error as Error).message });
    }
};
