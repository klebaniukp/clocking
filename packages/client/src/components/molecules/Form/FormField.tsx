import React from 'react';
import { FormInput } from '../../atoms/Input/FormInput';

export const FormField = (props: {
    value: string;
    inputType: string;
    name: string;
}) => {
    return (
        <div className='form-floating mb-3 w-50'>
            <FormInput name={props.name} inputType={props.inputType} />
            <label htmlFor={props.value}>{props.value}</label>
        </div>
    );
};
