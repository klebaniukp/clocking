import React from 'react';

export const DropdownTitle = (props: { value: string }) => {
    return (
        <a
            className='nav-link dropdown-toggle'
            href=''
            id='navbarDarkDropdownMenuLink'
            role='button'
            data-bs-toggle='dropdown'
            aria-expanded='false'>
            {props.value}
        </a>
    );
};