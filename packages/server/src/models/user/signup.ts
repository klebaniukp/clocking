import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
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

        if (!password.match(specialSigns))
            return res.status(400).json({
                error: 'Password must contain special signs',
            });

        if (password.length < 8)
            return res
                .status(400)
                .json({ error: 'Password must be at least 8 characters long' });

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
        const redisPayload = '{"taskId": "exampleId"}';
        await redisClient.lPush(id, redisPayload);

        return res
            .status(200)
            .clearCookie('token')
            .cookie('token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxAge: maxAge,
            })
            .json({ userObject });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: (error as Error).message });
    }
};
