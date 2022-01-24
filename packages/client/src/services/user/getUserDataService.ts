import { getUser } from '../../api';
import { IUserData } from '../../types';

export const getUserDataService = async () => {
    try {
        const res = await getUser();

        const userModified: IUserData = {
            _id: res.data.user._id,
            email: res.data.user.email,
            firstname: res.data.user.firstname,
            lastname: res.data.user.lastname,
            isUserLoggedIn: true,
        };

        return userModified;
    } catch (error) {
        console.log(error);
    }
};
