import express from 'express';
import { checkToken } from '../controllers/checkToken';

import { taskProgressionControler } from '../controllers/admin/taskProgressionControler';

import { taskProgression } from '../models/admin/taskProgression';

export const adminRouter = express.Router();

adminRouter.use(express.json());

adminRouter.get(
    '/taskProgression',
    checkToken,
    taskProgressionControler,
    taskProgression,
);
