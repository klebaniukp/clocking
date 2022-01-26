import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { FormField } from '../../molecules/Form/FormField';
import { Submit } from '../../atoms/Button/Submit';
import { ShowPassword } from '../../molecules/Form/ShowPassword';
import { AuthSwitchButton } from '../../atoms/Button/AuthSwitchButton';
import { Card } from '../../atoms/Box/Card';
import { signInService } from '../../../services/auth/signInService';
import { useHistory } from 'react-router-dom';
import { IUserData } from '../../../types';

export const SignIn = ({
    value,
    setIsSignIn,
}: {
    value: string;
    setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const showPassword: boolean = useSelector(
        (state: RootState) => state.showPassword,
    );

    const userData: IUserData = useSelector(
        (state: RootState) => state.userData,
    );

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        const formData = {
            email: form.email.value,
            password: form.password.value,
        };

        signInService(formData).then(userData => {
            if (userData) {
                console.log(userData);
                dispatch({ type: 'SET_USER_DATA', payload: userData });
                if (userData._id === 'admin')
                    history.push('/adminTaskProgression');
                else history.push('/clocking');
            }
        });
    };

    return (
        <form id='signInForm' onSubmit={e => handleSignIn(e)}>
            <div
                className={`position-absolute w-75 d-flex align-items-center 
            justify-content-center card border-2 bg-light `}
                style={{
                    fontSize: 'large',
                    left: '50%',
                    top: '55%',
                    transform: 'translate(-50%, -50%)',
                }}>
                <Card value={'Login'} />

                <FormField
                    inputType={'email'}
                    value={'Email address'}
                    name={'email'}
                />
                {showPassword ? (
                    <FormField
                        value={'Password'}
                        inputType={'text'}
                        name={'password'}
                    />
                ) : (
                    <FormField
                        value={'Password'}
                        inputType={'password'}
                        name={'password'}
                    />
                )}

                <ShowPassword value={'Show password'} />
                <Submit value={'Submit'} />
                <p>Don't have an account yet? Click the button down below</p>
                <AuthSwitchButton
                    value={value}
                    setIsSignIn={setIsSignIn}
                    isSignIn={true}
                />
            </div>
        </form>
    );
};
