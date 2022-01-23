import { Request, Response } from 'express';
import { UserModel } from '../../mongo/User';

export const userData = async (req: Request, res: Response) => {
    try {
        const id = res.locals.id;
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(401).json({ message: 'No user found' });
        }

        const userModifiedObject = {
            _id: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
        };

        return res.status(200).json({ userModifiedObject });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: (error as Error).message });
    }
};
