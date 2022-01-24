import { getTaskProgression } from '../../api';

export const taskProgressionService = () => {
    getTaskProgression()
        .then(res => {
            return res;
        })
        .catch((err: string) => {
            console.log(err);
        });
};
