import { combineReducers } from '@reduxjs/toolkit';
import { setUserDataReducer as userData } from './setUserDataReducer';
import { setShowPassword as showPassword } from './setShowPasswordReducer';

export const reducers = combineReducers({
    userData,
    showPassword,
});
