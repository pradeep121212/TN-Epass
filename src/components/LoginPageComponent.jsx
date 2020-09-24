import React, { Component } from 'react';
import HeaderComponent from './HeaderComponent';
import UserLoginComponent from './UserLoginComponent';
import AuthenticationService from './authentication/AuthenticationService';
import OTPService from '../api/OTPService';



class LoginPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otpGenerated: false,
            otpVerified: true,
            invalidOtp: false,
            mobileNo: 0,
            otp: 0,
        };
        AuthenticationService.initialGuestLogin();
    }

    generateOtp = (mobileNo) => {
        console.log(this.props);
        OTPService.generateOTP(mobileNo)
            .then(
                (res) => {
                    this.setState({ otpGenerated: true, mobileNo: res.data.number, otp: res.data.otp });
                    console.log(res.data);
                }
            );
        // this.props.history.push(`/userDashboard/`);

        // AuthenticationService.registerSuccessfulLoginUser(mobileNo, password);

    }
    resetState = () => {
        this.setState({
            otpGenerated: false,
            otpVerified: true,
            invalidOtp: false,
            mobileNo: 0,
            otp: 0,
        });
    }

    validateOtp = (enteredOtp) => {
        console.log(this.props);
        OTPService.validateOTP(this.state.mobileNo, enteredOtp)
            .then(
                (res) => {
                    if (res.data == "SUCCESS") {

                        this.setState({ otpVerified: true, invalidOtp: false });

                        AuthenticationService.executeJwtAuthenticationService("dummy", "dummy")
                            .then((res) => {
                                console.log(res.data.token);
                                AuthenticationService.registerSuccessfulLoginUser(`${this.state.mobileNo}`, res.data.token);
                                this.props.history.push(`/userDashboard/`);

                            });

                    }
                    else {
                        this.setState({ invalidOtp: true });
                    }
                }
            );

    }

    render() {
        return (
            <>
                <div class="container">
                    <body>
                        <div class="row row-content justify-content-center">
                            <DosAndDonts />
                            <UserLoginComponent prevState={this.state} generateOtp={this.generateOtp} validateOtp={this.validateOtp} resetState={this.resetState} />
                        </div>
                    </body>
                </div>
            </>
        );
    }
}

function DosAndDonts() {
    return (<div class="col-12 col-sm-6 justify-content-center">
        <div class="row justify-content-center">
            <div class="card">
                <h3 class="card-header bg-success text-white ">Valid Reasons</h3>
                <div class="card-body">
                    <dl class="row justify-content-center">
                        <dt class="col-1">✔️</dt>
                        <dd class="col-11">I am stranded and i need to go to my home town</dd>
                        <dt class="col-1">✔️</dt>
                        <dd class="col-11">I want to attend my relative's marriage.(only blood relatives)</dd>
                        <dt class="col-1">✔️</dt>
                        <dd class="col-11">I am a Government official and i have an ongoing government work.</dd>
                        <dt class="col-1"> </dt>
                        <dd class="col-11"> </dd>
                        <dt class="col-2">Info:</dt>
                        <dd class="col-10">Activities like Agriculture, loading/unloading cargos, Plantation, and
                                essential goods supply does not require an E-Pass to travel between cities.</dd>

                    </dl>
                </div>
            </div>
            <h3> </h3>
            <h1> </h1>
            <h1> </h1>

            <div class="card">
                <h3 class="card-header bg-warning text-white ">Invalid Reasons</h3>
                <div class="card-body">
                    <dl class="row justify-content-center">
                        <dt class="col-1">X</dt>
                        <dd class="col-11">Visiting a friend's place</dd>
                        <dt class="col-1">X</dt>
                        <dd class="col-11">Marriage functions of distant relatives</dd>
                        <dt class="col-1">X</dt>
                        <dd class="col-11">Any application without proper credentials will also be rejected</dd>

                    </dl>
                </div>
            </div>
        </div>


    </div>
    );
}


export default LoginPageComponent; 