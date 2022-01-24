import express from 'express';
import { userData } from '../controllers/user/userData';

import { checkToken } from '../controllers/checkToken';
import { logout } from '../models/user/logout';

export const userRouter = express.Router();

userRouter.use(express.json());

// userRouter.put('/signup', signupController, signup);
// userRouter.post('/signin', signinController, signin);
userRouter.get('/userData', checkToken, userData);
userRouter.delete('/logout', checkToken, logout);
