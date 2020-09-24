import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import AuthenticationService from './authentication/AuthenticationService';



class LoginRoute extends Component {
    render() {
        if (!AuthenticationService.isAdminLoggedIn() && !AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props} />

        }
        else if (AuthenticationService.isAdminLoggedIn()) {
            return <Redirect to="/adminDashboard" />

        }
        else {
            return <Redirect to="/userDashboard" />

        }
    }
}
export default LoginRoute;