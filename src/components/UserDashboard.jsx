import React, { Component } from 'react';
import EPassDataService from '../api/EPassDataService';
import AuthenticationService from './authentication/AuthenticationService';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { useNavigate } from 'react-router-dom';

const data = [
    { createdAt: "Monday", status: "pending", numberOfPassengers: "3", fromDistrict: "Chennai", toDistrict: "Sivagangai", reason: "Stranded in a new place" },
];
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',

    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        textAlign: 'center'

    }
});
class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    handleApplyPass = () => {
        this.props.navigate('/userDashboard/ApplyPass');
    }

    componentDidMount() {
        EPassDataService.fetchAllPassesByMobileNo("9003085016")
            .then((res) => {
                console.log(res);
                this.setState({ data: res.data });
            })
            .catch(
                () => {
                    AuthenticationService.logoutUser();
                    this.props.navigate('/adminDashboard');
                }
            );;
    }



    render() {
        let data = this.state.data;

        return (
            <body>

                <div class="row p-5 justify-content-center">
                    <div class="col-12 col-sm-2 justify-content-center">
                        <button class="btn btn-primary btn-lg" onClick={this.handleApplyPass}>Apply For A New Pass</button>
                    </div>
                </div>
                <div class="row p-5 justify-content-center">
                    <div class="card w-100">

                        <h3 class="card-header bg-success text-white ">
                            <span class="row p-2 justify-content-center">
                                Previousley Applied Passes
                </span>
                        </h3>
                        <div class="card-body">
                            {data.length == 0 && <h5 class="text-grey">
                                <span class="row p-6 justify-content-center">
                                    You haven't applied for any passes.
                        </span>
                            </h5>}

                            <div class="table-responsive">
                                <table class="table">

                                    <thead>
                                        <tr>

                                            <th scope="col">Date Of Application</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">No. Of Passengers</th>
                                            <th scope="col">From District</th>
                                            <th scope="col">To District</th>
                                            <th scope="col">Reason</th>
                                            <th></th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map(
                                            doc => <tr>
                                                <th>{`${doc['createdAt']}`.substring(0, 10)}</th>

                                                <td>{doc['status']}</td>
                                                <td>{doc['numberOfPassengers']}</td>
                                                <td>{doc['fromDistrict']}</td>
                                                <td>{doc['toDistrict']}</td>
                                                <td>{doc['reason']}</td>
                                                <td>
                                                    {doc['status'] == "Approved" && <div>
                                                        <PDFDownloadLink document={<MyDoc pass={doc} />} fileName="somename.pdf">
                                                            {({ loading }) => (loading ? 'Loading document...' : 'Download now!')}
                                                        </PDFDownloadLink>
                                                    </div>}
                                                </td>

                                            </tr>
                                        )}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </body>
        );
    }

}


class MyDoc extends Component {
    constructor(props) {
        super(props);
        var qr = require('qr-image');
        var qrPng = qr.image('I love QR!');
        // qrPng.pipe(require('fs').createWriteStream('i_love_qr.png'));

        // var svg_string = qr.imageSync('I love QR!');
        this.state = { qr_png: qr.imageSync(`${this.props.pass.id}`) };

    }
    componentDidMount() {
        console.log(this.state.qr_png);

    }
    render() {
        let pass = this.props.pass;
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>TamilNadu E-Pass Services</Text>
                    </View>
                    <View style={styles.section}>
                        <Text>Pass Approved.</Text>
                        <Text>Pass Valid for 2 days from {pass.createdAt.substring(0, 10)}</Text>

                    </View>
                    <View style={styles.section}>
                        <Text>Pass Id: {pass.id}</Text>

                        <Image src={this.state.qr_png} alt="images" />
                    </View>
                </Page>
            </Document>
        );
    }
}

function UserDashboardWithNavigate(props) {
    let navigate = useNavigate();
    return <UserDashboard {...props} navigate={navigate} />
}

export default UserDashboardWithNavigate;