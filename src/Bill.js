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

        if(sessionStorage.getItem("userName") == ""){
            RR.browserHistory.push("/")
        } else {

        
        billDB.findAll((data) => {
            this.setState({bills: data})
            console.log("----------------data---------------", data)
        })
    }
    }

    componentDidMount(){
        // console.log("mountedddddd")
        
        console.log("username is ", sessionStorage.getItem("userName"))
    }


    showDate = (dateString) => {
        var dt = new Date(dateString);
        //console.log(dt.getMonth());
        return dt;

    }

    render() {
        return (


            <div>
                           { sessionStorage.getItem("userName") !== "omer@test.com" ? <h2> Please login to view your bills <br/> Account --> Login </h2> : 
                            
                        
<div>
                <h2 className="titleprop">My Bills</h2>
                <div className="billtable">
                    <table>
                        <tr>
                            <th>Period</th>
                            <th>Amount</th>
                            <th>Due Date</th>
                            <th></th>
                        </tr>
                        
                           
                                <tr>
                                    {/*<td>{months[this.showDate(s.IssuedDate).getMonth()]} add the months array</td>*/}
                                    <td>January 18th, 2020</td>
                                    <td>{480}</td>
                                    <td>February 17th, 2020</td>
                                    <td> <MUI.RaisedButton label="DETAILS"  containerElement={<RR.Link to={{ pathname: `BillDetails`, query: { id: 1254 } }} />} /> 
                                    </td>
                                </tr>


                                <tr>
                                    {/*<td>{months[this.showDate(s.IssuedDate).getMonth()]} add the months array</td>*/}
                                    <td>February 18th, 2020</td>
                                    <td>{770}</td>
                                    <td>March 17th, 2020</td>
                                    <td> <MUI.RaisedButton label="DETAILS"  containerElement={<RR.Link to={{ pathname: `BillDetails`, query: { id: 1722 } }} />} /> 
                                    </td>
                                </tr>
                        
                    </table>
                </div>
                </div>
                }
             
            </div>


        );
    }
}

