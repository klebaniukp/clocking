import { startTask } from '../../api';

export const startTaskService = async (formData: { description: string }) => {
    try {
        const response = await startTask(formData);

        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
};
