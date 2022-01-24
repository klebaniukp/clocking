import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { routes } from '../routes';
import { Navbar } from '../components/organisms/Navbar';
import { Clocking } from './Clocking';
import { TaskProgression } from './TaskProgression';
import { AdminTaskProgression } from './AdminTaskProgression';
import { Auth } from './Auth';
import { IUserData } from '../types';

export const Root = () => {
    const userData: IUserData = useSelector(
        (state: RootState) => state.userData,
    );

    const isUserAdmin = () => {
        if (userData._id === 'admin') {
            return (
                <Route
                    path={routes.adminTaskProgression}
                    component={AdminTaskProgression}
                />
            );
        } else {
            return (
                <Route
                    exact
                    path={routes.taskProgression}
                    component={TaskProgression}
                />
            );
        }
    };

    return (
        <BrowserRouter>
            <div>
                <Navbar />
                {userData.isUserLoggedIn ? (
                    <Switch>
                        {isUserAdmin()}
                        <Route
                            exact
                            path={routes.clocking}
                            component={Clocking}
                        />
                        <Route exact path={routes.auth} component={Auth} />
                    </Switch>
                ) : (
                    <Switch>
                        <Route exact path={routes.auth} component={Auth} />
                    </Switch>
                )}
            </div>
        </BrowserRouter>
    );
};
