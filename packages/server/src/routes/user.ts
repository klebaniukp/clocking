import express from 'express';
import { signupController } from '../controllers/signupController';

import { signup } from '../models/signup';

export const userRouter = express.Router();

userRouter.use(express.json());

userRouter.put('/signup', signupController, signup);
