import { resumeTask } from '../../api';

export const resumeTaskService = async () => {
    try {
        const response = await resumeTask();

        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
};
