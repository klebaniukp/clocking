import express from 'express';
import { signupController } from '../controllers/signupController';
import { signinController } from '../controllers/signinController';

import { signup } from '../models/signup';
import { signin } from '../models/signin';

export const userRouter = express.Router();

userRouter.use(express.json());

userRouter.put('/signup', signupController, signup);

userRouter.post('/signin', signinController, signin);
