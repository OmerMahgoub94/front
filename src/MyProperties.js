import React, { Component } from 'react';
import './Property.css';
import * as MUI from 'material-ui';
import images from './images/Home.png';
import DB from './DB';


const unitsDB = new DB("/api/consumer_owner_unit");
const billDB = new DB("/api/bills");


export default class MyProperties extends Component {
    state = {
        userUnits: [],
        unitID: undefined,
        singleUnit: null,
        bills: []

    }

    componentWillMount() {
        unitsDB.allServiceForUser((data) => {
            this.setState({ userUnits: data })
            console.log("----------------data---------------", data)
        })
    }

    handleDetails = (Id) => {
        unitsDB.findOne(Id, (data) => this.setState({singleUnit: data}));
        this.setState({ unitID: Id });
        billDB.findAll((data) => this.setState({bills: data}))


    }

    render() {
        return (
            <div>
                <div className="wrapper">
                    <h2 className="titleprop"> My Properties </h2>
                    <div className="property1">
                        <table>
                            <tr>
                                <th><img src={images} alt="property" className="notification" /></th>
                                {/*<th>Details</th>*/}
                            </tr>
                            {this.state.userUnits.map(

                                (s) =>
                                    <div>
                                        <tr>
                                            <td>Name</td>
                                            <td>{s.owner.account.FirstName} {s.owner.account.LastName}</td>
                                        </tr>
                                        <tr>
                                            <td>Address</td>
                                            <td>St.{s.service.StreetNo}, Zone No. {s.service.ZoneNo}</td>
                                        </tr>
                                        <tr>
                                            <td>Type</td>
                                            <td>{s.service.ResidenceType}</td>
                                        </tr>
                                        <tr>
                                            <td>Property Description</td>
                                            <td>This property is getting rented</td>
                                        </tr>
                                        <tr>
                                            <td>Status</td>
                                            <td>{s.Status}</td>
                                        </tr>
                                        <tr>
                                            <td>Details</td>
                                            <td><MUI.RaisedButton primary={true} label="View Details" onClick={() => this.handleDetails(s.Id)} /></td>
                                        </tr>
                                        <tr>
                                            <td>Shift Service</td>
                                            <td><MUI.RaisedButton primary={true} label="Shift Service" /></td>
                                        </tr>

                                        <tr>
                                            <td>Remove Service</td>
                                            <td><MUI.RaisedButton primary={true} label="Remove Service" /></td>
                                        </tr>
                                    </div>
                            )}
                        </table>
                        <br />
                    </div>
                    {
                        this.state.unitID != undefined &&

                        <div className="propertiesDetail" >
                            <div className="title"><h2> Property Details </h2></div>
                            <div className="cont">
                                <div className="centerThis">
                                    <img src={images} alt="property" className="notification" />
                                    <br />
                                    <br />
                                    Owner name: <strong> {this.state.singleUnit.owner.account.FirstName} {this.state.singleUnit.owner.account.LastName} </strong>
                                    <br />
                                    <br />
                                    Address: St.{this.state.singleUnit.service.StreetNo}, Zone No. {this.state.singleUnit.service.ZoneNo} 
                                    
                                 <br />
                                    <br />
                                    Type: {this.state.singleUnit.Status}
                                <br />
                                    <br />
                                </div>

                                <div className="containerrr">
                                    <div className="box">
                                        <h3> Electricity number </h3>
                                        <br />
                                        <h1> 55689236536 </h1>
                                        <br />
                                    </div>

                                    <div className="box">
                                        <h3> My Last Month's Consumption </h3>
                                        <br />
                                        Current Reading: {this.state.bills[0].AmountUsed}
                                    <br />
                                        <br />
                                        Due Date: {this.state.bills[0].DueDate}
                                    <br />
                                        <br />
                                        Meter Usage: {this.state.bills[0].MeterReading}
                                    <br />
                                        <br />
                                        Rate: ** code here **
                                    <br />
                                    </div>

                                    <div className="box">
                                        <h3> My Last Month's Bill </h3>
                                        <br />
                                        <br />
                                        Current month: {this.state.bills[0].Period}
                                    <br />
                                        <br />
                                        Amount: {this.state.bills[0].Charge}
                                    <br />
                                        <br />
                                        <MUI.RaisedButton label="View My Bill" />
                                        <br />
                                    </div>
                                </div>

                            </div>
                        </div>

                    }

                </div>
            </div>
        );
    }
}

