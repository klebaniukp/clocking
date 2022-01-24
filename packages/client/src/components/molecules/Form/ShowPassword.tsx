import React from 'react';
import { CheckBox } from '../../atoms/Input/CheckBox';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';

export const ShowPassword = (props: { value: string }) => {
    const isShowPassword: boolean = useSelector(
        (state: RootState) => state.showPassword,
    );
    const dispatch = useDispatch();
    return (
        <div className='form-check'>
            <div
                onClick={() => {
                    dispatch({
                        type: 'SET_SHOW_PASSWORD',
                        payload: !isShowPassword,
                    });
                }}>
                <CheckBox />
            </div>
            <label className='form-check-label' htmlFor='showPassword'>
                {props.value}
            </label>
        </div>
    );
};
