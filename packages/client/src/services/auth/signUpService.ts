import { signUp } from '../../api';
import { IUserData } from '../../types';

export const signUpService = async (formData: {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}) => {
    try {
        const res = await signUp(formData);

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
