import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { routes } from '../routes';
import { Navbar } from '../components/organisms/Navbar/Navbar';
import { Clocking } from './Clocking';
import { TaskProgression } from './TaskProgression';
import { AdminTaskProgression } from './AdminTaskProgression';
import { Auth } from './Auth';
import { getUserDataService } from '../services/user/getUserDataService';
import { IUserData } from '../types';

export const Root = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        getUserDataService().then(userData => {
            if (userData) {
                console.log(userData);
                dispatch({ type: 'SET_USER_DATA', payload: userData });
            }
        });
    }, []);

    const userData: IUserData = useSelector(
        (state: RootState) => state.userData,
    );

    const isUserAdmin = () => {
        if (userData._id === 'admin') {
            return (
                <>
                    <Route exact path={routes.home}>
                        <Redirect to={routes.adminTaskProgression} />
                    </Route>
                    <Route
                        path={routes.adminTaskProgression}
                        component={AdminTaskProgression}
                    />
                </>
            );
        } else {
            return (
                <>
                    <Route exact path={routes.home}>
                        <Redirect to={routes.clocking} />
                    </Route>
                    <Route
                        exact
                        path={routes.taskProgression}
                        component={TaskProgression}
                    />
                </>
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
                        <Route exact path={routes.home}>
                            <Redirect to={routes.auth} />
                        </Route>

                        <Route exact path={routes.auth} component={Auth} />
                    </Switch>
                )}
            </div>
        </BrowserRouter>
    );
};
