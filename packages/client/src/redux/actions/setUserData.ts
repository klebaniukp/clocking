import { IUserData } from '../../types';

export const setUserData =
    (userData: IUserData) =>
    (dispatch: (arg0: { type: string; payload: IUserData }) => void) => {
        try {
            dispatch({
                type: 'SET_USER_DATA',
                payload: userData,
            });
        } catch (error) {
            console.log(error);
        }
    };
