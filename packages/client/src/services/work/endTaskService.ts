import { endTask } from '../../api';

export const endTaskService = async () => {
    try {
        const response = await endTask();

        return response.data;
    } catch (err) {
        console.log(err);
    }
};
