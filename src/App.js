import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import './bootstrap.css';
import LoginPageComponent from './components/LoginPageComponent';
import HeaderComponent from './components/HeaderComponent';
import UserDashboard from './components/UserDashboard';
import ApplyFormComponent from './components/ApplyFormComponent';
import AdminDashboard from './components/AdminDashboard';
import AdminViewComponent from './components/AdminViewComponent';
import ErrorComponent from './components/ErrorComponent';
import AdminAuthenticatedRoute from './components/authentication/AdminAuthenticatedRoute';
import UserAuthenticatedRoute from './components/authentication/UserAuthenticatedRoute';
import AdminLoginModal from './components/AdminLoginModal';
import LoginRoute from './components/LoginRoute';

// import history from './components/history'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <>
            <HeaderComponent />
            <Switch>

              <LoginRoute path="/" exact component={LoginPageComponent} />
              <LoginRoute path="/login" component={LoginPageComponent} />
              <UserAuthenticatedRoute path="/userDashboard" exact component={UserDashboard} />
              <UserAuthenticatedRoute path="/userDashboard/applyPass" component={ApplyFormComponent} />

              <AdminAuthenticatedRoute path="/adminDashboard" exact component={AdminDashboard} />
              <AdminAuthenticatedRoute path="/adminDashboard/View/:id" component={AdminViewComponent} />
              <Route component={ErrorComponent} />

            </Switch>

          </>
        </Router>



      </div>
    );
  }
}

export default App;
