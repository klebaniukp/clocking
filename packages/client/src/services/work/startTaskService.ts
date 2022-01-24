import { startTask } from '../../api';

export const startTaskService = (formData: { taskId: string }) => {
    startTask(formData)
        .then(res => {
            if (res.status === 200) return true;

            return false;
        })
        .catch((err: string) => {
            console.log(err);
        });
};
