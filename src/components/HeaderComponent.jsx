import React, { Component } from 'react';
import AdminLoginModal from './AdminLoginModal';
import { Modal } from "react-bootstrap";

import AuthenticationService from './authentication/AuthenticationService';

import {
    useLocation,
    useNavigate,
    useParams
  } from "react-router-dom";

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }
class HeaderComponent extends Component {

    constructor() {
        super();
        this.state = {
            showAdminLogin: false,
            isAdminLogin: AuthenticationService.isAdminLoggedIn(),
            isUserLogin: AuthenticationService.isUserLoggedIn()
        };
    }

    handleClose = (a) => this.setState({ showAdminLogin: false });
    handleShow = (a) => this.setState({ showAdminLogin: true });
    handleLogin = () => {
        this.setState({ showAdminLogin: false });
        this.setState({ isAdminLogin: AuthenticationService.isAdminLoggedIn() });
        this.setState({ isUserLogin: AuthenticationService.isUserLoggedIn() });

        this.props.navigate('/adminDashboard');
    };
    logout = () => {
        AuthenticationService.logoutUser();
        AuthenticationService.logoutAdmin();
        // AuthenticationService.refreshJwtAuthenticationService();
        this.setState({ isAdminLogin: AuthenticationService.isAdminLoggedIn() });
        this.props.navigate('/adminDashboard');
    }
    componentDidMount() {
        this.setState({

            isAdminLogin: AuthenticationService.isAdminLoggedIn(),
            isUserLogin: AuthenticationService.isUserLoggedIn()
        });
    }
    componentWillUpdate() {
        if (this.state.isAdminLogin != AuthenticationService.isAdminLoggedIn() || this.state.isUserLogin != AuthenticationService.isUserLoggedIn())
            this.setState({

                isAdminLogin: AuthenticationService.isAdminLoggedIn(),
                isUserLogin: AuthenticationService.isUserLoggedIn()
            });

    }

    render() {

        return (
            <header>

                <Modal show={this.state.showAdminLogin} onHide={this.handleClose} onLogin={() => { this.handleClose() }}>
                    {!this.state.isAdminLogin && <AdminLoginModal onLogin={() => { this.handleLogin() }} />}
                </Modal>

                <nav class="navbar navbar-dark navbar-expand-sm fixed-top">
                    <div class="container">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#Navbar">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <a class="navbar-brand mr-auto" href="#"> TamilNadu E-Pass
                    Portal</a>
                        <div class="collapse navbar-collapse" id="Navbar">
                            <div class="col-12 col-sm-12"></div>
                            {!this.state.isAdminLogin && !this.state.isUserLogin && <button type='button' class="btn btn-success" onClick={this.handleShow}>Admin
                        Login</button>}
                            {(this.state.isAdminLogin || this.state.isUserLogin) && <button type='button' class="btn btn-success" onClick={() => { this.logout() }}>Logout</button>}
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

function HeaderComponentWithNavigate(props) {
    let navigate = useNavigate();
    return <HeaderComponent {...props} navigate={navigate} />
}
export default withRouter(HeaderComponentWithNavigate);