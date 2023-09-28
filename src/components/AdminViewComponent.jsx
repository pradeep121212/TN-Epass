import React, { Component } from 'react';
import EPassDataService from '../api/EPassDataService';
import AuthenticationService from './authentication/AuthenticationService';
import { Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
//import {  } from "react-router-dom";
const data = { createdAt: "Monday", status: "pending", numberOfPassengers: "3", vehicleType: "Bike", vehicleNo: "TN09AQ7743", toAddressLine1: "line 1", toAddressLine2: "Line2", fromAddressLine1: "line 1", fromAddressLine2: "Line2", fromDistrict: "Chennai", toDistrict: "Sivagangai", reason: "Stranded in a new place", passengers: [{ name: 'pradeep', age: 21, aadhar: 865726279191 }, { name: 'pradeep', age: 21, aadhar: 865726279191 }] }
    ;

class AdminViewComponent extends Component {
    constructor() {
        super();
        this.state = {
            data: data,
            p1Document: null,
            marriageDocument: null
        };
    }
    componentDidMount() {
        EPassDataService.findPassById(this.props.params.id)
            .then(
                (response) => {
                    console.log(response.data);
                    this.setState({ data: response.data });
                    console.log(response.data);
                    EPassDataService.viewImage(response.data.p1DocumentId)
                        .then((res) => {
                            this.setState({ p1Document: res.data });
                        });

                    EPassDataService.viewImage(response.data.marriageDocumentId)
                        .then((re) => {
                            console.log(re)
                            this.setState({ marriageDocument: re.data });
                        })

                })
            .catch(
                () => {
                    AuthenticationService.logoutAdmin();
                    this.props.navigate('/adminDashboard');

                }
            );
    }
    render() {
        let data = this.state.data;
        const changeStatus = (status) => {
            EPassDataService.updateStatus(this.props.params.id, status)
                .then(() =>  this.props.navigate(`/adminDashboard/`))
        }
        return (
            <body>
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
                                    <div class="form-group row justify-content-center">
                                        <h5>{data['reason']}</h5>
                                    </div>
                                </div>

                            </div>
                            <div class="form-group row justify-content-center">
                                <div class="form-group col-12 col-sm-4">
                                    <div class="row  justify-content-center">
                                        <h3>From Address</h3>
                                    </div>
                                    <div class="form-group row justify-content-center">
                                        <div class="form-group">
                                            <span>{data.fromAddress1} </span>
                                        </div>
                                    </div>
                                    <div class="form-group row justify-content-center">
                                        <div class="form-group">

                                            <span>{data.fromAddress2}</span>
                                        </div>
                                    </div>
                                    <div class="form-group row justify-content-center">

                                        <h5>{data.fromDistrict}</h5>

                                    </div>
                                </div>
                                <div class="form-group col-12 col-sm-4">
                                    <div class="row  justify-content-center">
                                        <h3>To Address</h3>
                                    </div>
                                    <div class="form-group row justify-content-center">
                                        <div class="form-group">

                                            <span>{data.toAddress1} </span>
                                        </div>
                                    </div>
                                    <div class="form-group row justify-content-center">
                                        <div class="form-group">

                                            <span>{data.toAddress2} </span>
                                        </div>
                                    </div>
                                    <div class="form-group row justify-content-center">

                                        <h5>{data.toDistrict}</h5>

                                    </div>
                                </div>
                                <div class="form-group col-12 col-sm-4">
                                    <div class="row  justify-content-center">
                                        <h3>Vehicle Details</h3>
                                    </div>
                                    <div class="form-group row justify-content-center">
                                        <div class="form-group mt-3">

                                            <h4>{data.vehicleType} </h4>
                                        </div>
                                    </div>
                                    <div class="form-group row justify-content-center">
                                        <div class="form-group">

                                            <span>(max passengers :{data.numberOfPassengers}) </span>
                                        </div>
                                    </div>
                                    <div class="form-group row justify-content-center">

                                        <h5>{data.vehicleNo}</h5>

                                    </div>
                                </div>



                            </div>
                        </div>


                        <div class="row justify-content-center">
                            <h2>Passenger Details</h2>
                        </div>
                        <div class="form-group row justify-content-center">

                            {/* <div class="form-group col-12 col-md-12"> */}
                            {/* <div class="row justify-content-center"> */}

                            {/* <div class="row">
                                    <div id="passengerList"> */}

                            {
                                data.passengers.map((passenger, index) => <div >

                                    <div class="form-group col-12 col-sm-12 ">

                                        <div class="card" style={{ width: "20rem" }}>

                                            <div class="card-body">

                                                <h4 class="text-center">Passenger {index + 1}</h4>

                                                <div class="form-group row justify-content-center">
                                                    <label for="firstname" class="col-md-4 mt-2">
                                                        <h6>Name</h6>
                                                    </label>
                                                    <span type="name" class="col-md-6 " id="name1" name="name1"
                                                        placeholder="Name">{passenger.name}</span>
                                                </div>

                                                <div class="form-group row justify-content-center">
                                                    <label for="firstname" class="col-md-4 mt-2">
                                                        <h6>Age</h6>
                                                    </label>
                                                    <span type="name" class="col-md-6" id="name1" name="name1"
                                                        placeholder="Name">{passenger.age}</span>
                                                </div>

                                                <div class="form-group row justify-content-center">
                                                    <label for="firstname" class="col-md-4 mt-2">
                                                        <h6>Aadhar No</h6>
                                                    </label>
                                                    <span type="name" class="col-md-6" id="name1" name="name1"
                                                        placeholder="Name">{passenger.aadhar}</span>
                                                </div>



                                            </div>
                                        </div>


                                    </div>


                                </div>)}
                            {/* </div>
                                </div> */}




                            {/* </div> */}
                        </div>

                        <div class="row justify-content-center p-3">
                            <div class="col-12 col-sm-3 p-3 align-self-center">
                                <img src={`data:image/png;base64,${this.state.p1Document}`}
                                    alt="Passenger-1 Document"
                                    onClick={() => { console.log("Image Clicked") }}
                                    className="img-thumbnail mt-2"
                                    height={500}
                                    width={500} />
                                <h6 class="text-center">Passenger 1 Id Proof</h6>
                            </div>
                            {this.state.marriageDocument &&

                                <div class="col-12 col-sm-3 p-3 align-self-center">
                                    <img src={`data:image/png;base64,${this.state.marriageDocument}`}
                                        alt="Passenger-1 Document"
                                        onClick={() => { console.log("Image Clicked") }}
                                        className="img-thumbnail mt-2"
                                        height={500}
                                        width={500} />
                                    <h6 class="text-center">Marriage Proof</h6>
                                </div>

                            }
                        </div>



                        <div class="row  justify-content-center p-3">

                            < div class="p-3">
                                <button onClick={() => { changeStatus("Approved") }} name="assign" value="approved"
                                    class="btn btn-primary btn-lg pl-2 pr-2 bg-success">
                                    <div class="p-3">Approve</div>
                                </button>
                            </div>


                            < div class="p-3">
                                <button onClick={() => { changeStatus("Rejected") }} name="assign" value="rejected"
                                    class="btn btn-primary btn-lg pl-2 pr-2 bg-danger">
                                    <div class="p-3">Reject</div>
                                </button>
                            </div>

                        </div>



                    </div>
                </div>
            </body >
        );
    }
}
function AdminViewComponentWithNavigate(props) {
    let navigate = useNavigate();
    let params = useParams();
    return <AdminViewComponent {...props} navigate={navigate} params={params} />
}
export default AdminViewComponentWithNavigate;