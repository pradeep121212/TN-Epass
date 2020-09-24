import React, { Component } from 'react';
import EPassDataService from '../api/EPassDataService';
import AuthenticationService from './authentication/AuthenticationService';

const data = [
    { createdAt: "Monday", status: "pending", numberOfPassengers: "3", fromDistrict: "Chennai", toDistrict: "Sivagangai", reason: "Stranded in a new place" },
];



class AdminDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            viewOnlyPending: false,
        };
    }

    componentDidMount() {

        EPassDataService.fetchAllPasses()
            .then((response) => {
                this.setState({ data: response.data });
            })
            .catch(
                () => {
                    AuthenticationService.logoutAdmin();
                    this.props.history.push('/adminDashboard');

                }
            );

    }

    render() {

        const handleView = (id) => {
            this.props.history.push(`/adminDashboard/View/${id}`);

        }

        const handlePendingView = (value) => {
            //   console.log(value);
            if (this.state.viewOnlyPending) {
                //     console.log(this.state.data);
                this.setState({ viewOnlyPending: false });
            }
            else {
                this.setState({ viewOnlyPending: true });

            }

        }
        var data;
        if (this.state.viewOnlyPending) {
            data = this.state.data.filter((ele) => ele.status == "Pending");
        }
        else {
            data = this.state.data;

        }

        return (
            <body>


                <div class="row p-5 justify-content-center">
                    <div class="card w-100">

                        <h3 class="card-header bg-success text-white ">
                            <span>
                                <input
                                    name="isGoing"
                                    type="checkbox"
                                    checked={this.state.viewOnlyPending}
                                    onChange={handlePendingView} />
                                <a style={{ fontSize: "50%", padding: "10px" }}>Show only pending Passes</a>


                            </span>
                            <span class="row p-2 justify-content-center">
                                Applied Passes
                </span>
                        </h3>
                        <div class="card-body">
                            <dl class="">
                                {
                                    this.state.data.length == 0 && <h5 class="text-grey">
                                        <span class="row p-6 justify-content-center">
                                            No Passes Available
                        </span>
                                    </h5>}

                                {data.length != 0 && <div class="table-responsive">
                                    <table class="table">

                                        <thead>
                                            <tr>

                                                <th scope="col">Date Of Application</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">No. Of Passengers</th>
                                                <th scope="col">From District</th>
                                                <th scope="col">To District</th>
                                                <th scope="col">Reason</th>
                                                <th scope="col"></th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.map(
                                                    doc => <tr>
                                                        <th>{`${doc['createdAt']}`.substring(0, 10)}</th>

                                                        <td>{doc['status']}</td>
                                                        <td>{doc['numberOfPassengers']}</td>
                                                        <td>{doc['fromDistrict']}</td>
                                                        <td>{doc['toDistrict']}</td>
                                                        <td>{doc['reason']}</td>
                                                        <td>

                                                            <button class="btn bg-success btn-lg" name="id"
                                                                onClick={() => handleView(doc['id'])}>View</button>

                                                        </td>
                                                    </tr>
                                                )
                                            }


                                        </tbody>
                                    </table>

                                </div>}



                            </dl>
                        </div>
                    </div>
                </div>

            </body>
        );
    }

}

export default AdminDashboard;