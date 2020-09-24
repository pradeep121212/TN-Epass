
import React, { Component } from 'react';
import { Modal, Button } from "react-bootstrap";
import AuthenticationService from './authentication/AuthenticationService';

class UserLoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { elapsed: 99999 };
        // this.loginClicked = this.loginClicked.bind(this);
        this.handleGenerate = this.handleGenerate.bind(this);
        this.tick = this.tick.bind(this);
    }
    handleGenerate() {
        this.setState({ endTime: new Date().getTime() + (1 * 60 * 1000) });
        console.log(new Date().getTime());
        this.props.generateOtp(this.state.mobileNo);
        this.timer = setInterval(this.tick, 1000);
    }
    tick() {
        console.log(this.state.endTime);
        if (this.state.elapsed <= 1000) {
            this.props.resetState();
        }
        this.setState({ elapsed: this.state.endTime - new Date().getTime() });

    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    startTimer() {
        this.timer = setInterval(this.tick, 1000);
    }

    handleNumber = (event) => { if (!this.props.prevState.otpGenerated) this.setState({ mobileNo: event.target.value }) };

    handleOtp = (event) => { this.setState({ otp: event.target.value }) };


    render() {
        var elapsed = 0;
        if (this.props.prevState.otpGenerated) {
            elapsed = Math.round(this.state.elapsed / 100);

            //   seconds = (elapsed / 10).toFixed(1);

        }
        return (
            <>

                <div class="col-12 col-sm-5 align-self-center">
                    <div class="card">
                        <div class="card-body">

                            {this.props.prevState.invalidOtp && <div class="container bg-warning text-center">Invalid OTP</div>}
                            <div class="row justify-content-center">
                                <h1>User Login </h1>
                            </div>

                            <div class="form-group">
                                <label>Mobile No</label>
                                <input type="number" name="mobileNo" onChange={this.handleNumber} value={this.state.mobileNo} class="form-control" placeholder="(+91)" />
                            </div>

                            {this.props.prevState.otpGenerated && <div class="form-group">
                                <label>OTP</label>
                                <input type="password" onChange={this.handleOtp} value={this.state.otp} class="form-control" placeholder="Enter password" />
                            </div>}

                            {!this.props.prevState.otpGenerated && <div class="row  justify-content-center">
                                <button onClick={() => this.handleGenerate()} class="btn btn-primary btn-lg">Generate OTP</button>
                            </div>}

                            {this.props.prevState.otpGenerated && !this.props.otpVerified && <><div class="row  justify-content-center">
                                <button onClick={() => this.props.validateOtp(this.state.otp)} class="btn btn-primary btn-lg">Verify</button>

                            </div>
                                <div class="container text-center"><a>
                                    You have {Math.floor(this.state.elapsed / 60000)} minutes and {Math.floor(this.state.elapsed / 1000) % 60} seconds
                  </a></div>
                                <div class="container text-center"> <a onClick={this.props.resetState} href="">Try a different Number</a></div>
                            </>

                            }
                            {this.props.otpVerified && <a>Logging You In ...</a>}

                        </div>
                    </div>

                </div>

            </>
        );
    }
}


export default UserLoginComponent;