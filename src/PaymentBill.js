import React, { Component } from 'react';
import * as MUI from 'material-ui';
import './Trial.css';
import { Link } from 'react-router'
import payForm from './PayForm';

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

export default class PaymentBill extends Component {

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

    render() {
        return (
            <div>
                <MUI.Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <MUI.Tab className="paidTab" label="PAID BILL" value="a">
                       
                            <div className="formPayment">
                                <br/>
                                <h2 className="titleprop"> PAID BILLS </h2>
                                    <table>
                                        <tr>
                                            <th>Month</th>
                                            <th>Date Paid</th>
                                            <th>Status</th>
                                            <th>Locations</th>
                                            <th>Details</th>
                                        </tr>
                                        <tr>
                                            <td>June</td>
                                            <td>June 20, 2017</td>
                                            <td>Paid</td>
                                            <td>Al Sadd</td>
                                            <td> <MUI.RaisedButton primary={true} containerElement={<Link to="/BillDetails" />} label="Details" /></td>
                                        </tr>
                                        <tr>
                                            <td>June</td>
                                            <td>June 20, 2017</td>
                                            <td>Paid</td>
                                            <td>Al Sadd</td>
                                            <td> <MUI.RaisedButton primary={true} containerElement={<Link to="/BillDetails" />} label="Details" /></td>
                                        </tr>
                                        <tr>
                                            <td>June</td>
                                            <td>June 20, 2017</td>
                                            <td>Paid</td>
                                            <td>Al Sadd</td>
                                            <td> <MUI.RaisedButton primary={true} containerElement={<Link to="/BillDetails" />} label="Details" /></td>
                                        </tr>
                                    </table>
                                

                                <br />
                                <br />


                        </div>
                    </MUI.Tab>

                    <MUI.Tab className="unpaidBill" label="UNPAID BILL" value="b">
                        <div className="center">
                            <div className="formPayment">
                                <br/>
                                <h2 className="titleprop">UNPAID BILLS</h2>
                                <div className="billtable">
                                    <table>
                                        <tr>
                                            <th>Month</th>
                                            <th>Status</th>
                                            <th>Locations</th>
                                            <th>Pay</th>
                                            <th>Details</th>
                                        </tr>
                                        <tr>
                                            <td>June</td>
                                            <td>Unpaid</td>
                                            <td>Al Sadd</td>
                                            <td> <MUI.RaisedButton primary={true} containerElement={<Link to="/PayForm" />} label="Pay" /></td>
                                            <td> <MUI.RaisedButton primary={true} containerElement={<Link to="/BillDetails" />} label="Details" /></td>
                                        </tr>
                                        <tr>
                                            <td>June</td>
                                            <td>Unpaid</td>
                                            <td>Al Sadd</td>
                                            <td> <MUI.RaisedButton primary={true} containerElement={<Link to="/PayForm" />} label="Pay" /></td>
                                            <td> <MUI.RaisedButton primary={true} containerElement={<Link to="/BillDetails" />} label="Details" /></td>
                                        </tr>
                                        <tr>
                                            <td>June</td>
                                            <td>Unpaid</td>
                                            <td>Al Sadd</td>
                                            <td> <MUI.RaisedButton primary={true} containerElement={<Link to="/PayForm" />} label="Pay" /></td>
                                            <td> <MUI.RaisedButton primary={true} containerElement={<Link to="/BillDetails" />} label="Details" /></td>
                                        </tr>

                                    </table>


                                    <br />
                                    <br />
                                </div>
                            </div>
                        </div>

                    </MUI.Tab>
                </MUI.Tabs>
            </div>
        );
    }
}

