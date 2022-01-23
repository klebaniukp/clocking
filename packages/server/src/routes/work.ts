import express from 'express';
import { checkToken } from '../models/checkToken';

export const workRouter = express.Router();

workRouter.use(express.json());
