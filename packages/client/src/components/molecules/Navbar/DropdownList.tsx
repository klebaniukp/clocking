import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { DropdownItem as Item } from '../../atoms/Navbar/DropdownItem';
import { DropdownTitle } from '../../atoms/Navbar/DropdownTitle';
import { IUserData } from '../../../types';

export const DropdownList = () => {
    const userData: IUserData = useSelector(
        (state: RootState) => state.userData,
    );

    const renderForAdmin = () => {
        if (userData._id === 'admin') {
            return (
                <Item value='Task Progression' path={'/adminTaskProgression'} />
            );
        } else {
            return (
                <Item value='Task Progression' path={'/adminTaskProgression'} />
            );
        }
    };

    return (
        <div className='collapse navbar-collapse' id='navbarNavDarkDropdown'>
            <ul className='navbar-nav'>
                <li className='nav-item dropdown'>
                    <DropdownTitle value={'Navigation'} />
                    <ul
                        className='dropdown-menu dropdown-menu-dark'
                        aria-labelledby='navbarDarkDropdownMenuLink'>
                        <Item value={'Clocking'} path={'/clocking'} />
                        <Item value={'Login'} path={'/auth'} />
                        {renderForAdmin()}
                    </ul>
                </li>
            </ul>
        </div>
    );
};
