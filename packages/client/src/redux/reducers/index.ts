import { combineReducers } from '@reduxjs/toolkit';
import { setUserDataReducer as userData } from './setUserDataReducer';
import { setShowPassword as showPassword } from './setShowPasswordReducer';
import { setCurrentTaskReducer as currentTask } from './setCurrentTaskReducer';

export const reducers = combineReducers({
    userData,
    showPassword,
    currentTask,
});
