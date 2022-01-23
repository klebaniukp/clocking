import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRouter } from './routes/user';
import { workRouter } from './routes/work';
import { client as redisClient } from './redis/client';

dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL as string;
const PORT = process.env.PORT || 8000;

const app = express();

app.set('trust proxy', 1);

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
// app.use(cookieParser());

const origin =
    process.env.NODE_ENV === 'production'
        ? process.env.CLIENT_URL
        : 'http://localhost:3000';

app.use(
    cors({
        credentials: true,
        origin,
    }),
);

app.use('/user', userRouter);
app.use('/work', workRouter);

mongoose
    .connect(CONNECTION_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Running on: http://localhost:${PORT}`);
            (async () => {
                await redisClient.connect();

                redisClient.on('error', (err: string) =>
                    console.log('Redis Client Error', err),
                );
            })();
        });
    })
    .catch(error => console.log(`${error} did not connect`));
