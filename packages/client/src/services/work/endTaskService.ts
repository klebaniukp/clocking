import { endTask } from '../../api';

export const endTaskService = (formData: { taskId: string }) => {
    endTask(formData)
        .then(res => {
            if (res.status === 200) return true;

            return false;
        })
        .catch((err: string) => {
            console.log(err);
        });
};
