import React, { Component } from 'react';
import './Trial.css';
import { Link } from 'react-router'
import * as MUI from 'material-ui';
import DB from './DB';
import * as RR from 'react-router';




const billDB = new DB("/api/bills");
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default class Bill extends Component {
    state = {
        bills: []

    }

    componentWillMount() {
        billDB.findAll((data) => {
            this.setState({bills: data})
            console.log("----------------data---------------", data)
        })
    }


    showDate = (dateString) => {
        var dt = new Date(dateString);
        //console.log(dt.getMonth());
        return dt;

    }

    render() {
        return (

            <div>
                <h2 className="titleprop">My Bill</h2>
                <div className="billtable">
                    <table>
                        <tr>
                            <th>Period</th>
                            <th>Amount</th>
                            <th>Due Date</th>
                            <th></th>
                        </tr>
                        {this.state.bills.map(
                            (s) =>
                                <tr>
                                    {/*<td>{months[this.showDate(s.IssuedDate).getMonth()]} add the months array</td>*/}
                                    <td>{s.Period}</td>
                                    <td>{s.Charge}</td>
                                    <td>{s.DueDate}</td>
                                    <td> <MUI.RaisedButton label="DETAILS"  containerElement={<RR.Link to={{ pathname: `BillDetails`, query: { id: s.Id } }} />} /> 
                                    </td>
                                </tr>
                        )}
                    </table>
                </div>
            </div>


        );
    }
}

