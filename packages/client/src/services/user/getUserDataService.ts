import { getUser } from '../../api';
import { IUserModified } from '../../types';

export const getUserDataService = async (req: any, res: any) => {
    getUser()
        .then(res => {
            const userModified: IUserModified = {
                _id: res.data._id,
                email: res.data.email,
                firstname: res.data.firstname,
                lastname: res.data.lastname,
            };

            return userModified;
        })
        .catch((err: string) => {
            console.log(err);
        });
};
