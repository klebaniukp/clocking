import React from 'react';

export const DropdownButton = () => {
    return (
        <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNavDarkDropdown'
            aria-controls='navbarNavDarkDropdown'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
        </button>
    );
};
