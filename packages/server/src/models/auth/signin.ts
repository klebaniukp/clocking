import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signin = async (req: Request, res: Response) => {
    try {
        const secret = process.env.JWT_SECRET_TOKEN as string;
        const maxAge = 1000 * 60 * 60;

        const { password } = req.body;

        const user = res.locals.user;

        if (user._id === 'admin') {
            if (password === user.password) {
                const token = jwt.sign(
                    { _id: user._id, isAdmin: true },
                    secret,
                    {
                        expiresIn: maxAge,
                    },
                );

                return res
                    .status(200)
                    .clearCookie('token')
                    .cookie('token', token, {
                        httpOnly: true,
                        sameSite: 'none',
                        secure: true,
                        maxAge: maxAge,
                    })
                    .json({
                        user: {
                            _id: user._id,
                            email: user.email,
                            firstname: user.firstname,
                            lastname: user.lastname,
                        },
                    });
            } else
                return res.status(400).json({
                    error: 'Invalid password',
                });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect)
            return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ email: user.email, id: user._id }, secret, {
            expiresIn: '60m',
        });

        const userModified = {
            _id: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
        };

        console.log('succes');
        return res
            .status(200)
            .clearCookie('token')
            .cookie('token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxAge: maxAge,
            })
            .json({ userModified });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: (error as Error).message });
    }
};
