import { endTask } from '../../api';

export const endTaskService = async (formData: { taskId: string }) => {
    try {
        const response = await endTask(formData);

        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
};
