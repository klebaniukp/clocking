import { pauseTask } from '../../api';

export const pauseTaskService = async () => {
    try {
        const response = await pauseTask();

        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
};
