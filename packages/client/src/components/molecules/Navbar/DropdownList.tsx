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
                <Item
                    value='Admin Task Progression'
                    path={'/adminTaskProgression'}
                />
            );
        } else {
            return <Item value='Task Progression' path={'/taskProgression'} />;
        }
    };

    const renderOnlyForLoggedIn = () => {
        if (userData.isUserLoggedIn) {
            return (
                <>
                    <Item value={'Clocking'} path={'/clocking'} />
                    {renderForAdmin()}
                </>
            );
        }
    };

    const renderOnlyForGuest = () => {
        if (!userData.isUserLoggedIn) {
            return <Item value={'Login'} path={'/auth'} />;
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
                        {renderOnlyForLoggedIn()}
                        {renderOnlyForGuest()}
                    </ul>
                </li>
            </ul>
        </div>
    );
};
