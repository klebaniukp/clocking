import express from 'express';
import { checkToken } from '../controllers/checkToken';

import { pauseTaskController } from '../controllers/work/pauseTaskController';
import { endTaskController } from '../controllers/work/endTaskController';

import { startTask } from '../models/work/startTask';
import { pauseTask } from '../models/work/pauseTask';
import { endTask } from '../models/work/endTask';

export const workRouter = express.Router();

workRouter.use(express.json());

workRouter.post('/start', checkToken, startTask);
workRouter.post('/pause', checkToken, pauseTaskController, pauseTask);
workRouter.post('/end', checkToken, endTaskController, endTask);
