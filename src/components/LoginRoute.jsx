import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import AuthenticationService from './authentication/AuthenticationService';
import { Navigate } from "react-router-dom";



class LoginRoute extends Component {
    render() {
        if (!AuthenticationService.isAdminLoggedIn() && !AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props} />

        }
        else if (AuthenticationService.isAdminLoggedIn()) {
            return <Navigate to="/adminDashboard" />

        }
        else {
            return <Navigate to="/userDashboard" />

        }
    }
}
export default LoginRoute;