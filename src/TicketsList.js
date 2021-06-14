import React, { Component } from 'react';
import * as MUI from 'material-ui';
import './Trial.css';
import { Link } from 'react-router'
import payForm from './PayForm';
import DB from './DB';

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



export default class TicketsList extends Component {

    state = {
    tickets: []
}

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
                    <MUI.Tab className="paidTab" label="Report Tickets" value="a">

                        <div className="requestContainer">
                            <div className="formPayment">
                                <br />
                                <h2 className="titleprop"> All Reoprt Tickets </h2>
                                <table>
                                    <tr>
                                        <th>Type</th>
                                        <th>Title</th>
                                        <th>Date</th>
                                        <th>Status</th>


                                    </tr>
                                    <tr>
                                        <td>Question</td>
                                        <td>8am</td>
                                        <td>Available</td>
                                        <td>Monique</td>

                                        <td> <MUI.RaisedButton  containerElement={<Link to="/TicketsDetails" />} primary={true} label="Details" /></td>

                                    </tr>

                                </table>
                                <br />
                                <br />

                            </div>
                        </div>
                    </MUI.Tab>

                    <MUI.Tab className="unpaidBill" label="Questions Tickets" value="b">
                        <div className="center">
                            <div className="requestContainer">
                                <div className="formPayment">
                                    <br />
                                    <h2 className="titleprop">Questions</h2>
                                    <div className="billtable">

                                        <table>
                                            <tr>
                                                <th>Type</th>
                                                <th>Title</th>
                                                <th>Text</th>
                                                <th>Date</th>
                                                <th>Status</th>
                                             
                                            </tr>
                                            <tr>
                                                <td>Type here</td>
                                                <td>Date Time here</td>
                                                <td>Satus here</td>
                                                <td>Owner Here</td>
                                               
                                               
                                                <td><MUI.RaisedButton containerElement={<Link to="/TicketsDetails" />} primary={true} label="Details" /></td>
                                            </tr>

                                        </table>

                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MUI.Tab>
                </MUI.Tabs>
            </div>
        );
    }
}

