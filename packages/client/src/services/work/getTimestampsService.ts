import { userTaskProgression } from '../../api';

export const getTimestampsService = async () => {
    try {
        const response = await userTaskProgression();

        if (response.status === 201) return null;

        if (response.data.timeStamps.length === 0) return null;

        return response.data.timeStamps;
    } catch (error) {
        console.log(error);
    }
};
