import express from 'express';
import { signupController } from '../controllers/auth/signupController';
import { signinController } from '../controllers/auth/signinController';

import { signup } from '../models/auth/signup';
import { signin } from '../models/auth/signin';

export const authRouter = express.Router();

authRouter.use(express.json());

authRouter.post('/signup', signupController, signup);
authRouter.post('/signin', signinController, signin);
