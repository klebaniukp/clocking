import React from 'react';
import { Link } from 'react-router-dom';

export const DropdownItem = (props: { value: string; path: string }) => {
    return (
        <li>
            <Link to={props.path} className={'dropdown-item'}>
                {props.value}
            </Link>
        </li>
    );
};
