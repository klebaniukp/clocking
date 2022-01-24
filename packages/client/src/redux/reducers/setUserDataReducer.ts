import { IUserData } from '../../types';

export const setUserDataReducer = (
    state: IUserData,
    action: { type: string; payload: IUserData },
) => {
    try {
        switch (action.type) {
            case 'SET_USER_DATA':
                return action.payload;
            case 'LOGOUT':
                return {
                    _id: 'x',
                    email: 'John@Doe.com',
                    firstname: 'John',
                    lastname: 'Doe',
                    isUserLoggedIn: false,
                };
            default:
                if (state) {
                    return state;
                } else {
                    return {
                        _id: 'x',
                        email: 'John@Doe.com',
                        firstname: 'John',
                        lastname: 'Doe',
                        isUserLoggedIn: false,
                    };
                }
        }
    } catch (error) {
        console.log(error);
    }
};
