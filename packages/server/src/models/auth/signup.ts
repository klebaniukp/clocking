import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { passwordSchema } from '../../Password/PasswordSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../mongo/User';
import { client as redisClient } from '../../redis/client';

export const signup = async (req: Request, res: Response) => {
    try {
        const secret = process.env.JWT_SECRET_TOKEN as string;
        const specialSigns = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const maxAge = 1000 * 60 * 60;

        const { email, firstname, lastname, password } = req.body;

        if (!passwordSchema.validate(password)) {
            return res.status(400).json({
                message:
                    'Invalid password, check length, capital letters and number appearance',
            });
        }

        if (!specialSigns.test(password)) {
            console.log(password);
            return res.status(400).json({
                message: 'Invalid password, provide special sign',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const id = uuidv4();

        const userObject = {
            _id: id,
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: hashedPassword,
        };

        await UserModel.create(userObject);

        const token = jwt.sign(
            { email: userObject.email, id: userObject._id },
            secret,
            { expiresIn: '60m' },
        );

        const taskId = uuidv4();

        const currentDate = new Date();

        const dateFormat = `${currentDate.getFullYear()}-${
            currentDate.getMonth() + 1
        }-${currentDate.getDate()}`;

        const timeFormat = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

        const redisUserPayload = JSON.stringify({
            taskId: taskId,
            description: 'description',
        });

        await redisClient.lPush(id, redisUserPayload);

        const redisTimestampPayload = JSON.stringify({
            date: dateFormat,
            time: timeFormat,
            makerId: id,
            type: 'end',
        });

        await redisClient.rPush(taskId, redisTimestampPayload);

        const task = {
            taskId: taskId,
        };

        //every task is pushed to admin field
        const redisTaskPayload = JSON.stringify(task);

        await redisClient.lPush('admin', redisTaskPayload);

        const userModified = {
            _id: userObject._id,
            email: userObject.email,
            firstname: userObject.firstname,
            lastname: userObject.lastname,
        };

        return res
            .status(200)
            .clearCookie('token')
            .cookie('token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxAge: maxAge,
            })
            .json({ user: userModified });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: (error as Error).message });
    }
};
