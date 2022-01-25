import { endTask } from '../../api';

export const endTaskService = async () => {
    try {
        const response = await endTask();

        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
};
