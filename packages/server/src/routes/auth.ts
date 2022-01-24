import express from 'express';
import { signupController } from '../controllers/user/signupController';
import { signinController } from '../controllers/user/signinController';

import { signup } from '../models/user/signup';
import { signin } from '../models/user/signin';

export const authRouter = express.Router();

authRouter.use(express.json());

authRouter.put('/signup', signupController, signup);
authRouter.post('/signin', signinController, signin);
