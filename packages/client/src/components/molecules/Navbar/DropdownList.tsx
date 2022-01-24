import React from 'react';
import { DropdownItem as Item } from '../../atoms/Navbar/DropdownItem';
import { DropdownTitle } from '../../atoms/Navbar/DropdownTitle';

export const DropdownList = () => {
    return (
        <div className='collapse navbar-collapse' id='navbarNavDarkDropdown'>
            <ul className='navbar-nav'>
                <li className='nav-item dropdown'>
                    <DropdownTitle value={'Navigation'} />
                    <ul
                        className='dropdown-menu dropdown-menu-dark'
                        aria-labelledby='navbarDarkDropdownMenuLink'>
                        <Item value={'Main'} path={'/'} />
                        <Item value={'Login'} path={'/Auth'} />
                        <Item value={'User Info'} path={'/Profile'} />
                        <Item value={'Friends'} path={'/friends'} />
                    </ul>
                </li>
            </ul>
        </div>
    );
};
