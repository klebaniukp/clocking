import { combineReducers } from '@reduxjs/toolkit';
import { setUserDataReducer as setUserData } from './setUserDataReducer';

export const reducers = combineReducers({
    setUserData,
});
