
import React, { Component } from 'react';
import { Modal, Button } from "react-bootstrap";

import { BrowserRouter as Router, HashHistory, Route, Switch, Link } from 'react-router-dom';
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

class AdminLoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: 'pradeep',
            password: 'password@123',
            hasLoginFailed: false,
            showFailureMessage: false,
        };

    }

    handleChange = (event) => { this.setState({ [event.target.name]: event.target.value }) };
    loginClicked = () => {

        AuthenticationService.executeJwtAuthenticationService(this.state.userName, this.state.password)
            .then((res) => {
                AuthenticationService.registerSuccessfulLoginAdmin("admin", res.data.token); 
                // AuthenticationService.registerSuccessfulLoginAdmin(this.state.userName, this.state.password);
                this.props.onLogin();

            })
            .catch(() => {
                this.setState({
                    showFailureMessage: false,
                    hasLoginFailed: true
                });
            });




    };

    render() {
        return (
            <>

                <Modal.Header closeButton>
                    <Modal.Title>Admin Login</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div class="col-12 col-md-12">
                        <form role="form">
                            {this.state.hasLoginFailed && <div class="container bg-warning text-center">Invalid Password/Userid</div>}

                            <div class="form-group">
                                <div class="form-group row">
                                    <label for="firstname" class="col-md-3">User Id</label>
                                    <input type="text" onChange={this.handleChange} value={this.state.userName} class="form-control col-md-8" id="userName" name="userName"
                                        placeholder="User id"></input>
                                </div>
                                <div class="form-group row">
                                    <label for="firstname" class="col-md-3">Password</label>
                                    <input type="password" onChange={this.handleChange} value={this.state.password} class="form-control col-md-8" id="password"
                                        name="password" placeholder="Password"></input>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={this.loginClicked}>Login</Button>
                </Modal.Footer>

            </>
        );
    }
}
export default withRouter(AdminLoginModal);