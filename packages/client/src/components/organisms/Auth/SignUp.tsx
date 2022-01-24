import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { FormField } from '../../molecules/Form/FormField';
import { Submit } from '../../atoms/Button/Submit';
import { ShowPassword } from '../../molecules/Form/ShowPassword';
import { AuthSwitchButton } from '../../atoms/Button/AuthSwitchButton';
import { Card } from '../../atoms/Box/Card';
import { signUpService } from '../../../services/auth/signUpService';
import { useHistory } from 'react-router-dom';

export const SignUp = ({
    value,
    setIsSignIn,
}: {
    value: string;
    setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const showPassword: boolean = useSelector(
        (state: RootState) => state.showPassword,
    );

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (
            form !== null &&
            form.firstname !== null &&
            form.lastname !== null &&
            form.email !== null &&
            form.password !== null &&
            passwordCheck(form)
        ) {
            const formData = {
                email: form.email.value,
                firstname: form.firstname.value,
                lastname: form.lastname.value,
                password: form.password.value,
            };
            console.log(formData);

            signUpService(formData).then(userData => {
                if (userData) {
                    dispatch({ type: 'SET_USER_DATA', payload: userData });
                    history.push('/clocking');
                }
            });
        } else {
            alert('Fill all the fields correctly');
        }
    };

    const passwordCheck = (form: HTMLFormElement) => {
        const password = form.password.value;
        const repeatedPassword = form.confirmPassword.value;

        if (password === repeatedPassword) return true;

        return false;
    };

    return (
        <form
            onSubmit={e => {
                handleSignUp(e);
            }}>
            <div
                className={`position-absolute w-75 d-flex align-items-center 
                justify-content-center card border-2 bg-light `}
                style={{
                    fontSize: 'large',
                    left: '50%',
                    top: '55%',
                    transform: 'translate(-50%, -50%)',
                }}>
                <Card value={'Register'} />
                <FormField
                    inputType={'email'}
                    value={'Email address'}
                    name={'email'}
                />
                <FormField
                    inputType={'text'}
                    value={'Name'}
                    name={'firstname'}
                />
                <FormField
                    inputType={'text'}
                    value={'Last Name'}
                    name={'lastname'}
                />

                {showPassword ? (
                    <>
                        <FormField
                            value={'Password'}
                            inputType={'text'}
                            name={'password'}
                        />
                        <FormField
                            value={'Repeat Password'}
                            inputType={'text'}
                            name={'confirmPassword'}
                        />
                    </>
                ) : (
                    <>
                        <FormField
                            value={'Password'}
                            inputType={'password'}
                            name={'password'}
                        />
                        <FormField
                            value={'Repeat Password'}
                            inputType={'password'}
                            name={'confirmPassword'}
                        />
                    </>
                )}

                <ShowPassword value={'Show password'} />
                <Submit value={'Submit'} />
                <p>Already have an account? Click the button down below</p>
                <AuthSwitchButton
                    value={value}
                    setIsSignIn={setIsSignIn}
                    isSignIn={false}
                />
            </div>
        </form>
    );
};
