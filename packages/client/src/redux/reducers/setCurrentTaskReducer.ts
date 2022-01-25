import { ITask } from '../../types';

export const setCurrentTaskReducer = (
    state: ITask[],
    action: { type: string; payload: ITask[] },
) => {
    try {
        switch (action.type) {
            case 'SET_CURRENT_TASK':
                return action.payload;
            default:
                if (state) return state;
                else
                    return [
                        {
                            date: '',
                            time: '',
                            makerId: '',
                            type: '',
                        },
                    ];
        }
    } catch (error) {
        console.log(error);
    }
};
