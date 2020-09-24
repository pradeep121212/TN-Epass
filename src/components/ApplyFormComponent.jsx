import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AuthenticationService from './authentication/AuthenticationService';
import EPassDataService from '../api/EPassDataService';
import moment from 'moment';

const districts = [
    "Select",
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kanchipuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi (Tuticorin)",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar"

];

class Thumb extends React.Component {
    state = {
        loading: false,
        thumb: undefined,
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.file) { return; }

        this.setState({ loading: true }, () => {
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState({ loading: false, thumb: reader.result });
            };

            reader.readAsDataURL(nextProps.file);
        });
    }

    render() {
        const { file } = this.props;
        const { loading, thumb } = this.state;

        if (!file) { return null; }

        if (loading) { return <p>loading...</p>; }

        return (<img src={thumb}
            alt={file.name}
            className="img-thumbnail mt-2"
            height={200}
            width={200} />);
    }
}

class ApplyFormComponent extends Component {
    constructor() {
        super();
        this.state = { passengers: 1, passengerType: "1 Bike", p1document: null, marriagedocument: null };
    }

    render() {

        this.uploadDocument = (event, name) => {
            const fd = new FormData();
            const thumbName = event.currentTarget.files[0];
            fd.append('file', event.currentTarget.files[0], "blabla");
            EPassDataService.postImage(fd)
                .then((res) => {
                    if (name === 'p1') {
                        this.setState({ p1document: res.data });
                        this.setState({ p1documentName: thumbName });

                    }
                    else {
                        this.setState({ marriagedocument: res.data });
                        this.setState({ marriagedocumentName: thumbName });

                    }
                });
        }

        const changePassengers = (value) => {

            this.setState({ passengerType: value.target.value });
            let maxPassengers = parseInt(`${value.target.value}`.split(" ")[0]);
            this.setState({ passengers: maxPassengers });
            console.log(value.target.value);
        }
        let passengerItems = [];
        for (var i = 0; i < this.state.passengers; i++) {
            passengerItems.push(
                <div key={`passenger${i + 1}`} class="col-12 p-5 col-sm-5 align-self-center">
                    <div class="card">
                        <div class="card-body">

                            <div class="row justify-content-center">
                                <h5 class="p-2 md-2">Passenger {i + 1}</h5>
                            </div>

                            <div class="form-group row justify-content-center">
                                <label for="firstname" class="col-md-3 mt-2">
                                    <h6>Name</h6>
                                </label>
                                <Field type="name" class="form-control col-md-6" name={`name${i + 1}`}
                                    placeholder="Name"></Field>
                            </div>

                            <div class="form-group row justify-content-center">
                                <label for="firstname" class="col-md-3 mt-2">
                                    <h6>Age</h6>
                                </label>
                                <Field type="number" class="form-control col-md-6" name={`age${i + 1}`}
                                    placeholder="Age"></Field>
                            </div>

                            <div class="form-group row justify-content-center">
                                <label for="firstname" class="col-md-3 mt-2">
                                    <h6>Aadhar No</h6>
                                </label>
                                <Field type="number" class="form-control col-md-6" name={`aadhar${i + 1}`}
                                    placeholder="Aadhar"></Field>
                            </div>



                        </div>
                    </div>

                </div>
            );
        }

        console.log(passengerItems);

        this.onSubmit = (values) => {

            console.log(this.state.p1document);
            console.log(values);

            var passengers = [];
            for (var i = 0; i < this.state.passengers; i++) {
                passengers.push({
                    name: values[`name${i + 1}`],
                    age: values[`age${i + 1}`],
                    aadhar: values[`aadhar${i + 1}`]

                });
            }

            // const pass = {
            //     reason: values.reason,
            //     createdAt: new Date(),
            //     id: -1,
            //     mobileNo: AuthenticationService.getLoggedInMobileNo(),
            //     status: "Pending",
            //     numberOfPassengers: this.state.passengers,
            //     fromDistrict: values.fromDistrict,
            //     fromAddress1: values.fromAddress1,
            //     fromAddress2: values.fromAddress2,
            //     toDistrict: values.toDistrict,
            //     toAddress1: values.toAddress1,
            //     toAddress2: values.toAddress2,
            //     vehicleNo: values.vehicleNo,
            //     vehicleType: this.state.passengerType.value,
            //     passengers: passengers
            // };
            EPassDataService.savePass({
                reason: values.reason,
                createdAt: moment(new Date()).format("YYYY-MM-DD"),
                mobileNo: AuthenticationService.getLoggedInMobileNo(),
                status: "Pending",
                numberOfPassengers: this.state.passengers,
                fromDistrict: values.fromDistrict,
                fromAddress1: values.fromAddress1,
                fromAddress2: values.fromAddress2,
                toDistrict: values.toDistrict,
                toAddress1: values.toAddress1,
                toAddress2: values.toAddress2,
                vehicleNo: values.vehicleNo,
                vehicleType: this.state.passengerType.value,
                passengers: passengers,
                p1DocumentId: this.state.p1document,
                marriageDocumentId: this.state.marriagedocument
            })
                .then((res) => {
                    console.log(res);
                    this.props.history.push('/userDashboard/');
                });


        }

        this.validate = (values) => {
            var element = document.getElementById("top");
            element.scrollIntoView();

            let errors = {};

            if (!values.fromAddress1 || !values.toAddress1) {
                errors.fromAddress1 = "Address is a must"
            }

            if (values.fromDistrict === values.toDistrict) {
                errors.fromDistrict = "From and to district cannot be the same.";
            }
            if (values.fromDistrict == "Select" || values.toDistrict == "Select") {
                errors.fromDistrict = "Select a district";
            }
            if (values.reason === "Marriage" && this.state.marriagedocumentName === null) {
                errors.reason = "For Marriage You Have To Provide The Marriage Invitation"
            }

            if (this.state.p1documentName === null) {
                errors.reason = "Provide A Proof Document Of Passenger 1"
            }

            if (!values.age1 || !values.aadhar1 || !values.name1) {
                errors.name1 = "Passenger 1 Details are mandatory"
            }
            if (!errors) {
                errors.general = "Make Sure All The Mandatory fields are filled"
            }
            if (!values.vehicleNo) {
                errors.vehicleNo = "Enter A vehicle Number"
            }



            return errors;
        }


        return (
            <div>
                <Formik
                    initialValues={{
                        reason: "Stranded in a new place",
                        toDistrict: "Select",
                        fromDistrict: "Select",
                        vehicleNo: "",
                        toAddress1: "",
                        fromAddress1: '',
                        name1: "",
                        general: "",

                        file: null

                    }}
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    validateOnBlur={false}
                    validateOnChange={false}
                // enableReinitialize={true}
                >

                    {
                        (props) => (
                            <Form>
                                <div id="top"></div>
                                <ErrorMessage name="fromDistrict" component="div" class="alert bg-warning"></ErrorMessage>

                                <ErrorMessage name="fromAddress1" component="div" class="alert bg-warning"></ErrorMessage>
                                <ErrorMessage name="vehicleNo" component="div" class="alert bg-warning"></ErrorMessage>

                                <ErrorMessage name="name1" component="div" class="alert bg-warning"></ErrorMessage>
                                <ErrorMessage name="reason" component="div" class="alert bg-warning"></ErrorMessage>
                                <ErrorMessage name="general" component="div" class="alert bg-warning"></ErrorMessage>



                                <div class="col-12 col-sm-12 align-self-center">
                                    <div class="card">
                                        <div class="card-body">


                                            <div class="row justify-content-center">
                                                <h1> </h1>
                                            </div>
                                            <div class="form-group row justify-content-center">
                                                <div class="form-group col-12 col-sm-5">
                                                    <div class="row  justify-content-center">
                                                        <h3>Reason</h3>
                                                    </div>
                                                    <select class="form-control" name="reason" onChange={(event) => { props.values.reason = event.target.value; this.setState({ isMarriage: event.target.value === "Marriage" }) }}>
                                                        <option value="Stranded in a new place">Stranded in a new place</option>
                                                        <option value="Marriage">Marriage</option>
                                                        <option value="Death">Death</option>
                                                        <option value="Government Duty">Government Duty</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <div class="form-group row justify-content-center">
                                                <div class="form-group col-12 col-sm-4">
                                                    <div class="row  justify-content-center">
                                                        <h3>Your Address</h3>
                                                    </div>
                                                    <fieldset class="form-group">

                                                        <Field type="address" className="form-control" name="fromAddress1"
                                                            placeholder="Address Line 1" />
                                                    </fieldset>
                                                    <div class="form-group">

                                                        <Field type="address" class="form-control" name="fromAddress2"
                                                            placeholder="Address Line 2" />
                                                    </div>
                                                    <div class="form-group row justify-content-center">
                                                        <label class="col-md-3 mt-2">
                                                            <h6>District</h6>
                                                        </label>
                                                        <div class="col-md-6">
                                                            <select class="form-control" name="fromDistrict" onChange={(event) => { props.values.fromDistrict = event.target.value }} >
                                                                {
                                                                    districts.map(
                                                                        dist =>
                                                                            <option key={dist} value={dist} >{dist}</option>
                                                                    )
                                                                }


                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group col-12 col-sm-4">
                                                    <div class="row  justify-content-center">
                                                        <h3>Destination Address</h3>
                                                    </div>
                                                    <div class="form-group">

                                                        <Field type="address" class="form-control" name="toAddress1"
                                                            placeholder="Address Line 1" />
                                                    </div>
                                                    <div class="form-group">

                                                        <Field type="address" class="form-control" name="toAddress2"
                                                            placeholder="Address Line 2" />
                                                    </div>
                                                    <div class="form-group row justify-content-center">
                                                        <label for="firstname" class="col-md-3 mt-2">
                                                            <h6>District</h6>
                                                        </label>
                                                        <div class="col-md-6">
                                                            <select class="form-control" name="toDistrict" onChange={(event) => { props.values.toDistrict = event.target.value }} >

                                                                {
                                                                    districts.map(
                                                                        dist =>
                                                                            <option key={dist} value={dist}>{dist}</option>
                                                                    )
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div class="form-group row justify-content-center">

                                            <div class="form-group col-12 col-sm-5">
                                                <div class="row justify-content-center">
                                                    <h2>Vehicle Details</h2>
                                                </div>
                                                <div class="form-group row justify-content-center">
                                                    <label for="firstname" class="col-md-3 mt-2">
                                                        <h6>Vehicle Type</h6>
                                                    </label>
                                                    <div class="col-md-6">
                                                        <select class="form-control" onChange={changePassengers} value={this.state.passengerType} name="vehicle">
                                                            <option value="1 Bike">Bike</option>
                                                            <option value="3 Car">Car</option>
                                                            <option value="5 Car-7-Seater">Car (7 seater)</option>
                                                            <option value="2 goods">Goods Vehicles</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group row justify-content-center">
                                                    <label for="firstname" class="col-md-3 mt-2">
                                                        <h6>Vehicle Number</h6>
                                                    </label>

                                                    <Field type="text" class="form-control col-md-6" name="vehicleNo"
                                                        placeholder="Vehicle No"></Field>

                                                </div>

                                            </div>
                                        </div>

                                        <div class="form-group row justify-content-center">

                                            <div class="form-group col-12 col-md-12">
                                                <div class="row justify-content-center">
                                                    <h2>Passenger Details</h2>
                                                </div>
                                                <div id="passengerList">
                                                    <div class="form-group row justify-content-center">

                                                        {
                                                            passengerItems

                                                        }

                                                    </div>
                                                </div>


                                                <div className="form-group">
                                                    <label ><h5>Passenger 1 Document For Verification</h5></label>
                                                    <input name="p1document" type="file" onChange={(event) => { this.uploadDocument(event, 'p1') }} className="form-control" />
                                                    <Thumb file={this.state.p1documentName} />
                                                </div>

                                                {this.state.isMarriage && <div className="form-group">
                                                    <label ><h5>Marriage Invitation</h5></label>
                                                    <input name="marriageDocument" type="file" onChange={(event) => {
                                                        this.uploadDocument(event, 'marriage');
                                                    }} className="form-control" />
                                                    <Thumb file={this.state.marriagedocumentName} />
                                                </div>}


                                            </div>
                                        </div>

                                        <div class="row  justify-content-center p-3">
                                            <button type="submit" class="btn btn-primary btn-lg pl-2 pr-2">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}

                </Formik>

            </div>
        );

    }


}

export default ApplyFormComponent;