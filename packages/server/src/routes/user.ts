import express from 'express';
import { signupController } from '../controllers/user/signupController';
import { signinController } from '../controllers/user/signinController';
import { userData } from '../controllers/user/userData';

import { signup } from '../models/user/signup';
import { signin } from '../models/user/signin';
import { checkToken } from '../models/checkToken';
import { logout } from '../models/user/logout';

export const userRouter = express.Router();

userRouter.use(express.json());

userRouter.put('/signup', signupController, signup);
userRouter.post('/signin', signinController, signin);
userRouter.get('/userData', checkToken, userData);
userRouter.delete('/logout', checkToken, logout);
