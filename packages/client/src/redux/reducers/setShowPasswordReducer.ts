export const setShowPassword = (
    state: boolean,
    action: { type: string; payload: boolean },
) => {
    try {
        switch (action.type) {
            case 'SET_SHOW_PASSWORD':
                return action.payload;
            default:
                return false;
        }
    } catch (error) {
        console.log(error);
    }
};
