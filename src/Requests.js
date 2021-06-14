import React, { Component } from 'react';
import * as MUI from 'material-ui';
import './Trial.css';
import { Link } from 'react-router'
import payForm from './PayForm';
import DB from './DB';
import * as RR from 'react-router';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,

    },
    slide: {
        padding: 10,

    },
};

const ConsumerOwnerUnitDB = new DB("/api/consumer_owner_unit");
const accountDB = new DB("/api/accounts");
const ReqTypeDB = new DB("/api/request_type");
const RFS_DB = new DB("/api/request_of_service");
const DFS_DB = new DB("/api/disconnect_of_service");
const requestStaffAssignDB = new DB("/api/request_staff_assign");
const inspectionDB = new DB("/api/inspections");
const staffDB = new DB("/api/staffs");


export default class SingleApproval extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    state = {
        requests: [],
        loggedInUserRequests: [],
        open: false,
        loggedInUser: null
    }

    componentWillMount() {

        ReqTypeDB.findAll((data) => this.setState({ requests: data }));
        ReqTypeDB.findAllRequestsForUser((data) => this.setState({ loggedInUserRequests: data }));

        console.log("7aboobtk before");
        // accountDB.findOne(
        //     sessionStorage.getItem("userName"),
        //     (dataa) => this.setState({ loggedInUser: dataa }));

        console.log("7aboobtk after");

    }

    assignCase = (requestTypeId) => {

        console.log("assignCase with requestTypeID: " + requestTypeId);
        requestStaffAssignDB.Create({
            Status: "Under_User",
            DateTime: new Date(),
            RequestTypeId: requestTypeId
        })
        console.log()
        //this.showAlert();

    }

    showDetails = (Id) => {
        console.log("showDetails");
        sessionStorage.setItem("requestTypeID", Id)
        RR.browserHistory.push("/SingleApproval");

    }

    render() {
                console.log("zaaaaq ownerrrrrrrr ", this.state.requests)

        console.log("zaaaaq",  this.state.loggedInUserRequests)
        return (
            <div>
                <MUI.Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <MUI.Tab className="paidTab" label="ALL REQUESTS" value="a">
                        {
                            this.state.requests !== undefined &&

                            <div className="requestContainer">
                                <div className="formPayment">
                                    <br />
                                    <h2 className="titleprop"> All Requests </h2>
                                    <table>
                                        <tr>
                                            <th>Type Of Request</th>
                                            <th>Date and Time of Request</th>
                                            <th>The Unit Status</th>
                                            <th>Owner Name</th>
                                            <th>Owner Contact No.</th>
                                            <th>Functions</th>

                                        </tr>
                                        {this.state.requests.map(
                                            (s) =>
                                                <tr key={s.Id}>
                                                    <td>{s.Type}</td>
                                                    <td>{s.DateTimeRequest}</td>
                                                    <td>{s.Status}</td>
                                                    <td>{s.consumerownerunit.owner.account.FirstName} {s.consumerownerunit.owner.account.LastName} </td>
                                                    <td>{s.consumerownerunit.owner.account.Phone}</td>
                                                    <td>

                                                        <MUI.RaisedButton label="Details" onClick={() => this.showDetails(s.Id)} />
                                                        <br />
                                                        <MUI.RaisedButton label="Take" onClick={() => this.assignCase(s.Id)} />

                                                    </td>
                                                </tr >
                                        )
                                        }

                                    </table>
                                    <br />
                                    <br />

                                </div>
                            </div>
                        }

                    </MUI.Tab>

                    <MUI.Tab className="unpaidBill" label="MY REQUESTS" value="b">
                        {
                            this.state.loggedInUserRequests !== undefined  &&
                            <div className="center">
                                <div className="requestContainer">
                                    <div className="formPayment">
                                        <br />
                                        <h2 className="titleprop">MY Requests</h2>
                                        <div className="billtable">

                                            <table>
                                                <tr>
                                                    <th>Type Of Request</th>
                                                    <th>Date and Time of Request</th>
                                                    <th>The Unit Status</th>
                                                    <th>Owner Name</th>
                                                    <th>Owner Contact No.</th>
                                                    <th>Functions</th>
                                                </tr>
                                                {this.state.loggedInUserRequests.map(
                                                    (s) =>
                                                        <tr key={s.Id}>
                                                            <td>{s.Type}</td>
                                                            <td>{s.DateTimeRequest}</td>
                                                            <td>{s.Status}</td>
                                                            <td>{s.consumerownerunit.owner.account.FirstName} {s.consumerownerunit.owner.account.LastName} </td>
                                                            <td>{s.consumerownerunit.owner.account.Phone}</td>
                                                            <td>

                                                                <MUI.RaisedButton label="Details" onClick={() => this.showDetails(s.Id)} />
                                                                
                                                            </td>
                                                        </tr >
                                                )
                                                }

                                            </table>

                                            <br />
                                            <br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </MUI.Tab>
                </MUI.Tabs>
            </div>
        );
    }
}

