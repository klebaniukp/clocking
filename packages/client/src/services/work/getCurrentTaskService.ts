import { userTaskProgression } from '../../api';

export const getCurrentTaskService = async () => {
    try {
        const response = await userTaskProgression();

        if (response.status === 201) return null;

        return response.data.description;
    } catch (error) {
        console.log(error);
    }
};
