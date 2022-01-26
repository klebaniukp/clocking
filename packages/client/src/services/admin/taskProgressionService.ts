import { adminTaskProgression } from '../../api';

export const taskProgressionService = async () => {
    try {
        const response = await adminTaskProgression();

        console.log(response.data.taskProgression);

        return response.data.taskProgression;
    } catch (error) {
        console.log(error);
    }
};
