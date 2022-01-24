import { pauseTask } from '../../api';

export const pauseTaskService = (formData: { taskId: string }) => {
    pauseTask(formData)
        .then(res => {
            if (res.status === 200) return true;

            return false;
        })
        .catch((err: string) => {
            console.log(err);
        });
};
