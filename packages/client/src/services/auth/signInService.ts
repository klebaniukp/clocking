import { signIn } from '../../api';
import { IUserModified } from '../../types';

export const signInService = (formData: {
    email: string;
    password: string;
}) => {
    signIn(formData)
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
