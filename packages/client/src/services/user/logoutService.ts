import { logout } from '../../api';

export const logoutService = () => {
    logout()
        .then(res => {
            if (res.status === 200) return true;

            return false;
        })
        .catch((err: string) => {
            console.log(err);
        });
};
