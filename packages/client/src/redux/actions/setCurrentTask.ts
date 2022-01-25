import { ITask } from '../../types';

export const setCurrentTask =
    (timeStamps: ITask[]) =>
    (dispatch: (arg0: { type: string; payload: ITask[] }) => void) => {
        try {
            dispatch({
                type: 'SET_SHOW_PASSWORD',
                payload: timeStamps,
            });
        } catch (error) {
            console.log(error);
        }
    };
