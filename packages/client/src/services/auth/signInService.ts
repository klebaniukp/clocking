import { signIn } from '../../api';
import { IUserData } from '../../types';

export const signInService = async (formData: {
    email: string;
    password: string;
}) => {
    try {
        const res = await signIn(formData);

        const user: IUserData = {
            _id: res.data.user._id,
            email: res.data.user.email,
            firstname: res.data.user.firstname,
            lastname: res.data.user.lastname,
            isUserLoggedIn: true,
        };

        return user;
    } catch (error) {
        console.log(error);
    }
};
