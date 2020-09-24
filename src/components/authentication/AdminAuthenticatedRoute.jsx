import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import AuthenticationService from './AuthenticationService';


class AdminAuthenticatedRoute extends Component {
    render() {
        if (AuthenticationService.isAdminLoggedIn()) {
            return <Route {...this.props} />
        }
        else {
            return <Redirect to="/login" />
        }
    }
}
export default AdminAuthenticatedRoute;