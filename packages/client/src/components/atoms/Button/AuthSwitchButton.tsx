import React from 'react';
import { useDispatch } from 'react-redux';

export const AuthSwitchButton = (props: {
    value: string;
    setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
    isSignIn: boolean;
}) => {
    const dispatch = useDispatch();

    return (
        <button
            type='button'
            className='btn btn-link m-3'
            onClick={() => {
                props.setIsSignIn(!props.isSignIn);
                dispatch({ type: 'SET_IS_SHOW_PASSWORD', payload: false });
            }}>
            {props.value}
        </button>
    );
};
