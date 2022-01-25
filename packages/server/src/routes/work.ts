import express from 'express';
import { checkToken } from '../controllers/checkToken';

import { startTaskController } from '../controllers/work/startTaskController';
import { pauseTaskController } from '../controllers/work/pauseTaskController';
import { resumeTaskController } from '../controllers/work/resumeTaskController';
import { endTaskController } from '../controllers/work/endTaskController';

import { startTask } from '../models/work/startTask';
import { pauseTask } from '../models/work/pauseTask';
import { resumeTask } from '../models/work/resumeTask';
import { endTask } from '../models/work/endTask';
import { getUserCurrentTask } from '../models/work/getUserCurrentTask';

export const workRouter = express.Router();

workRouter.use(express.json());

workRouter.post('/start', checkToken, startTaskController, startTask);
workRouter.put('/pause', checkToken, pauseTaskController, pauseTask);
workRouter.post('/resume', checkToken, resumeTaskController, resumeTask);
workRouter.post('/end', checkToken, endTaskController, endTask);
workRouter.get('/currentTask', checkToken, getUserCurrentTask);
