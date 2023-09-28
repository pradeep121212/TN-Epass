import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate, Link } from 'react-router-dom';


import AuthenticationService from './components/authentication/AuthenticationService';

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

function UserAuthenticatedRouteFun({children}){
  if (AuthenticationService.isUserLoggedIn()) {
    return children;
}
else {
    return <Navigate to="/login" />
}
  
}

function AdminAuthenticatedRouteFun({children}){
  if (AuthenticationService.isAdminLoggedIn()) {
    return children;
}
else {
    return <Navigate to="/login" />
}
  
}

class App extends Component {

 

  render() {
    return (
      <div className="App">
        <Router>
          <>
            <HeaderComponent />
            <Routes>
              <Route path="/admin" exact element={<AdminLoginModal/>} />

              <Route path="/" exact element={<LoginPageComponent/>} />
              <Route path="/login" element={<LoginPageComponent/>} />
              <Route path="/userDashboard" exact element={<UserAuthenticatedRouteFun><UserDashboard/></UserAuthenticatedRouteFun>} />
              <Route path="/userDashboard/applyPass" element={<UserAuthenticatedRouteFun><ApplyFormComponent/></UserAuthenticatedRouteFun>} />

              <Route path="/adminDashboard" exact element={<AdminAuthenticatedRouteFun><AdminDashboard/></AdminAuthenticatedRouteFun>} />
              <Route path="/adminDashboard/View/:id" element={<AdminAuthenticatedRouteFun><AdminViewComponent/></AdminAuthenticatedRouteFun>} />
              <Route element={<ErrorComponent/>} />
            </Routes>

          </>
        </Router>



      </div>
    );
  }
}

export default App;
