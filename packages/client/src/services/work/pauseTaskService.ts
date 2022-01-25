import { pauseTask } from '../../api';

export const pauseTaskService = async (formData: { description: string }) => {
    try {
        const response = await pauseTask(formData);

        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
};
