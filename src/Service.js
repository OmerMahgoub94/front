import React, { Component } from 'react';
import * as MUI from 'material-ui';
import './Trial.css';
import DB from './DB';
import * as RR from 'react-router'


const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
        floatingLabelFocusStyle: {
            color: "red"

        }

    },

    customWidth: {
        width: 200,
    },

    slide: {
        padding: 10,
    },

    block: {
        maxWidth: 250,
    },
    radioButton: {
        display: 'inline-block',
        width: '150px',
        marginLeft: '10px'
    },
};

const accountDB = new DB("/api/accounts");
const RFS_DB = new DB("/api/services/RFS");
const DFS_DB = new DB("/api/services/DFS");
const servicesDB = new DB("/api/services");




export default class Service extends Component {

    state = {
        loggedAccount: '',
        userUnits: [],
        zoneNo: '',
        streetNo: '',
        typeOfResidence: '',
        buildingNo: '',
        villaNo: '',
        apartmentNo: '',
        serviceType: '',
        numOfPeople: "",
        electricalHeat: false,
        electricalCars: false,
        poolHeating: false,
        rValue: '',
        showDetails: false,
        description: '',
        disconnectionType: '',
    }


    componentWillMount() {
        console.log(sessionStorage.getItem("userName"));
        accountDB.findOne(sessionStorage.getItem("userName").split('@')[0], (data) => this.setState({ loggedAccount: data }));
        servicesDB.allServiceForUser((data) => this.setState({ userUnits: data }));

    };


    handleZoneNo = (event) => {
        this.setState({ zoneNo: event.target.value })
    }

    handleStreetNo = (event) => {
        this.setState({ streetNo: event.target.value })
    }

    handleTypeOfResidence = (event) => {
        this.setState({ typeOfResidence: event.target.value })
    }

    handleBuildingNo = (event) => {
        this.setState({ buildingNo: event.target.value })
    }

    handleVillaNo = (event) => {
        this.setState({ villaNo: event.target.value })
    }

    handleApartmentNo = (event) => {
        this.setState({ apartmentNo: event.target.value })
    }

    handleServiceType = (event) => {
        this.setState({ serviceType: event.target.value })
    }

    handleNumOfPeople = (event) => {
        this.setState({ numOfPeople: event.target.value })
    }

    handleElectricalHeat = (event) => {
        this.setState({ electricalHeat: event.target.value })
    }

    handleElectricalCars = (event) => {
        this.setState({ electricalCars: event.target.value })
    }

    handlePoolHeating = (event) => {
        this.setState({ poolHeating: event.target.value })
    }

    handleRValue = (event) => {
        this.setState({ rValue: event.target.value })
    }

    handleSumbitRFS = () => {
        console.log("----------------handleSumbitRFS--------------------");
        // var villa= this.state.typeOfResidence =="Villa";
        // var residential= this.state.serviceType =="Residential";

        RFS_DB.Create(
            {
                "service": {
                    "StartDate": new Date(),
                    "ZoneNo": this.state.zoneNo,
                    "StreetNo": this.state.streetNo,
                    "ResidenceType": this.state.typeOfResidence,
                    "BuildingNo": this.state.buildingNo,
                    "AptNo": this.state.apartmentNo,
                    "VillaNo": this.state.villaNo,
                    "ServiceType": this.state.serviceType,
                    "Longitude": "N/A",
                    "Latitude": "N/A"
                },
                "request": {
                    "NumOfPeople": this.state.numOfPeople,
                    "ElectricalHeat": this.state.ElectricalHeat,
                    "ElectricalCars": this.state.electricalCars,
                    "PoolHeating": this.state.poolHeating,
                    "RValue": this.state.rValue,
                    "Date": new Date(),
                    "NumOfRooms": this.state.NumOfRooms,
                }
            }
        )
        console.log("----------------/handleSumbitRFS--------------------");

        RR.borwserHistory.push('/')
    }



    //------------------------------------------------------------DFS Functions----------------------------------------------------------//

    handleDescription = (event) => {
        this.setState({ description: event.target.value });
    }

    handleDisconnectionType = (event) => {
        this.setState({ disconnectionType: event.target.value });
    }

    //this is the disconnect fornservice code 
    handleDisconnect = (Id) => {
        console.log("handleDisconnect request with unit ID: ", Id);
        DFS_DB.Create({
            "Description": this.state.description,
            "Status": "Pending for Approval",
            "Type": this.state.disconnectionType,
            "DateTimeRequest": new Date(),
            "Consumer_Owner_Unit_Id": Id
        });

    };

    //------------------------------------------------------------DFS Functions----------------------------------------------------------//


    render() {
        return (


           true?
                <div>
                    <MUI.Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <MUI.Tab className="RequestTab" label="Request" value="a">

                            <div className="request">
                                <div className="wrapper">
                                    <h3> <p id="head"> REQUEST FOR SERVICE</p> </h3>
                                    <div className="left">
                                        Customer name: <label>{this.state.loggedAccount.LastName}, {this.state.loggedAccount.FirstName}</label>
                                        <br />
                                        Zone No.: <MUI.TextField value={this.state.zoneNo} onChange={this.handleZoneNo} hintText="Zone Number" floatingLabelText="Enter Zone Number" />
                                        <br />
                                        Street No.: <MUI.TextField value={this.state.streetNo} onChange={this.handleStreetNo} hintText="Street Number" floatingLabelText="Enter Street Number" />
                                        <br />
                                        <br />
                                        <br />
                                        Choose a type of Residence.:
                                         <br />
                                        <br />

                                        <MUI.RadioButtonGroup name="shipSpeed" defaultSelected="not_light" onChange={this.handleTypeOfResidence}>
                                            <MUI.RadioButton value="Villa" label="Villa" style={styles.radioButton} />
                                            <MUI.RadioButton value="Apartment" label="Apartment" style={styles.radioButton} />
                                        </MUI.RadioButtonGroup>

                                        {
                                            this.state.typeOfResidence == "Apartment" ?
                                                <div>
                                                    Building No.: <MUI.TextField value={this.state.buildingNo} onChange={this.handleBuildingNo} hintText="Building Number" floatingLabelText="Enter Building Number" />
                                                    <br />
                                                    Apartment No.: <MUI.TextField value={this.state.apartmentNo} onChange={this.handleApartmentNo} hintText="Apartment Number" floatingLabelText="Enter Apartment Number" />
                                                    <br />
                                                </div>
                                                :
                                                <div>
                                                    Villa No.: <MUI.TextField value={this.state.villaNo} onChange={this.handleVillaNo} hintText="Villa Number" floatingLabelText="Enter Villa Number" />
                                                    <br />
                                                </div>
                                        }


                                        <br />
                                    </div>


                                    <div className="right">
                                        Choose a Service type:
                                        <br />
                                        <br />
                                        <MUI.RadioButtonGroup name="shipSpeed" defaultSelected="not_light" onChange={this.handleServiceType}>
                                            <MUI.RadioButton value="Residential" label="Residential" style={styles.radioButton} />
                                            <MUI.RadioButton value="Industrial" label="Industrial" style={styles.radioButton} />
                                        </MUI.RadioButtonGroup>

                                        {
                                            this.state.serviceType == "Residential" ?
                                                <div>
                                                    Number of People: <MUI.TextField value={this.state.numOfPeople} onChange={this.handleNumOfPeople} hintText="Number Of People" floatingLabelText="Enter Number of People" />
                                                    <br />
                                                </div>
                                                :
                                                <div>
                                                </div>
                                        }
                                        <br />

                                        <br />
                                        Electrical Heat:
                                         <br />
                                        <br />
                                        <MUI.RadioButtonGroup name="shipSpeed" defaultSelected="not_light" onChange={this.handleElectricalHeat}>
                                            <MUI.RadioButton value={true} label="Yes" style={styles.radioButton} />
                                            <MUI.RadioButton value={false} label="No" style={styles.radioButton} />
                                        </MUI.RadioButtonGroup>
                                        <br />
                                        <br />
                                        Electrical Cars:
                                        <br />
                                        <br />
                                        <MUI.RadioButtonGroup name="shipSpeed" defaultSelected="not_light" onChange={this.handleElectricalCars}>
                                            <MUI.RadioButton value={true} label="Yes" style={styles.radioButton} />
                                            <MUI.RadioButton value={false} label="No" style={styles.radioButton} />
                                        </MUI.RadioButtonGroup>

                                        <br />
                                        <br />
                                        Pool heating:
                                        <br />
                                        <br />
                                        <MUI.RadioButtonGroup name="shipSpeed" defaultSelected="not_light" onChange={this.handlePoolHeating}>
                                            <MUI.RadioButton value={true} label="Yes" style={styles.radioButton} />
                                            <MUI.RadioButton value={false} label="No" style={styles.radioButton} />
                                        </MUI.RadioButtonGroup>
                                        <br />
                                        R-Value: <MUI.TextField value={this.state.rValue} onChange={this.handleRValue} hintText="R-Value" floatingLabelText="Enter R-Value" />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />

                                        <MUI.FlatButton label="Submit" onClick={this.handleSumbitRFS} />
                                    </div>
                                </div>
                            </div>

                        </MUI.Tab>


                        <MUI.Tab className="shiftServiceTab" label="Shift" value="b">
                            <div className="request">
                                <div className="wrapper">
                                    <h3> <p id="head"> SHIFT SERVICE </p> </h3>
                                    <div className="left">
                                        Customer name: <MUI.TextField floatingLabelFocusStyle={styles.floatingLabelFocusStyle} value={this.state.username} onChange={this.handleUsername} floatingLabelText="Enter your username" />
                                        <br />
                                        Zone No.: <MUI.TextField value={this.state.zonenumber} onChange={this.handleZonenumber} floatingLabelText="Enter zonenumber" />
                                        <br />
                                        Street No.: <MUI.TextField value={this.state.streetnumber} onChange={this.handleStreetnumber} floatingLabelText="Enter streetnumber" />
                                        <br />
                                        <br />
                                        <br />
                                        Choose a type of Residence.:
                                        <br />
                                        <br />
                                        <MUI.RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                                            <MUI.RadioButton
                                                value="villa"
                                                label="Villa"
                                                style={styles.radioButton}
                                            />
                                            <MUI.RadioButton
                                                value="apartment"
                                                label="Apartment"
                                                style={styles.radioButton}
                                            />
                                        </MUI.RadioButtonGroup>
                                        Building No.: <MUI.TextField value={this.state.buildingnumber} onChange={this.handleBuildingnumber} floatingLabelText="Enter buildingnumber" />
                                        <br />
                                        Villa No.: <MUI.TextField value={this.state.villanumber} onChange={this.handleVillanumber} floatingLabelText="Enter villanumber" />
                                        <br />
                                        Apartment No.: <MUI.TextField value={this.state.apartmentnumber} onChange={this.handleApartmentnumber} floatingLabelText="Enter apartmentnumber" />
                                        <br />
                                        <br />
                                    </div>
                                    <div className="right">
                                        Choose a Service type:
                                <br />
                                        <br />
                                        <MUI.RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                                            <MUI.RadioButton
                                                value="Residential"
                                                label="Residential"
                                                style={styles.radioButton}
                                            />
                                            <MUI.RadioButton
                                                value="Industrial"
                                                label="Industrial"
                                                style={styles.radioButton}
                                            />
                                        </MUI.RadioButtonGroup>

                                        <br />

                                        Number of People: <MUI.TextField value={this.state.apartmentnumber} onChange={this.handleApartmentnumber} floatingLabelText="Enter apartmentnumber" />
                                        <br />
                                        <br />
                                        Electrical Heat:
                                <br />
                                        <br />
                                        <MUI.RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                                            <MUI.RadioButton
                                                value="yes"
                                                label="Yes"
                                                style={styles.radioButton}
                                            />
                                            <MUI.RadioButton
                                                value="no"
                                                label="No"
                                                style={styles.radioButton}
                                            />
                                        </MUI.RadioButtonGroup>
                                        <br />
                                        <br />
                                        Electrical Cars:
                                <br />
                                        <br />
                                        <MUI.RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                                            <MUI.RadioButton
                                                value="yes"
                                                label="Yes"
                                                style={styles.radioButton}
                                            />
                                            <MUI.RadioButton
                                                value="no"
                                                label="No"
                                                style={styles.radioButton}
                                            />
                                        </MUI.RadioButtonGroup>

                                        <br />
                                        <br />
                                        Pool heating:
                                <br />
                                        <br />
                                        <MUI.RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                                            <MUI.RadioButton
                                                value="yes"
                                                label="Yes"
                                                style={styles.radioButton}
                                            />
                                            <MUI.RadioButton
                                                value="no"
                                                label="No"
                                                style={styles.radioButton}
                                            />
                                        </MUI.RadioButtonGroup>
                                        <br />
                                        R-Value: <MUI.TextField value={this.state.villanumber} onChange={this.handleVillanumber} floatingLabelText="Enter villanumber" />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />

                                        <MUI.RaisedButton label="Submit" primary={true} />
                                    </div>

                                </div>
                            </div>

                        </MUI.Tab>
                        <MUI.Tab className="DisconnectTab" label="Disconnect" value="b">
                            <div className="requestdisconnect">
                                <div className="wrapperdisconnect">
                                    <div className="containerdisconnect">
                                        <h3><p id="head">DISCONNECT/CHANGE SERVICE</p></h3>

                                        {
                                            !this.state.userUnits &&


                                            <div>

                                                <div className="">

                                                    Customer name: <label>{this.state.loggedAccount.LastName}, {this.state.loggedAccount.FirstName}</label>
                                                    <br />
                                                    <br />
                                                    Type of Disconnect:
                                <br />
                                                    <br />
                                                    Description: <MUI.TextField value={this.state.description} onChange={this.handleDescription} hintText="Description" floatingLabelText="Enter Description" />
                                                    <br />


                                                    <MUI.RadioButtonGroup name="shipSpeed" defaultSelected="not_light" onChange={this.handleDisconnectionType}>
                                                        <MUI.RadioButton value="Temporary" label="Temporary" style={styles.radioButton} />
                                                        <MUI.RadioButton value="Permanent" label="Permanent" style={styles.radioButton} />
                                                    </MUI.RadioButtonGroup>
                                                    <br />

                                                    Choose the service:
                                            <MUI.Table >

                                                        <MUI.TableHeader  >

                                                            <MUI.TableRow>
                                                                <MUI.TableHeaderColumn>Zone No.</MUI.TableHeaderColumn>
                                                                <MUI.TableHeaderColumn>StreetNo</MUI.TableHeaderColumn>
                                                                <MUI.TableHeaderColumn>ResidenceType</MUI.TableHeaderColumn>
                                                                <MUI.TableHeaderColumn>ServiceType</MUI.TableHeaderColumn>
                                                                <MUI.TableHeaderColumn>Functions</MUI.TableHeaderColumn>

                                                            </MUI.TableRow>

                                                        </MUI.TableHeader>

                                                        <MUI.TableBody>


                                                            {this.state.userUnits.map(
                                                                userUnit =>
                                                                    <MUI.TableRow key={userUnit.Id} >
                                                                        <MUI.TableRowColumn>{userUnit.service.ZoneNo}</MUI.TableRowColumn>

                                                                        <MUI.TableRowColumn> {userUnit.service.StreetNo}</MUI.TableRowColumn>

                                                                        <MUI.TableRowColumn>{userUnit.service.ResidenceType}</MUI.TableRowColumn>

                                                                        <MUI.TableRowColumn> {userUnit.service.ServiceType}</MUI.TableRowColumn>

                                                                        <MUI.TableRowColumn>
                                                                            <MUI.RaisedButton label="Disconnect" onClick={() => this.handleDisconnect(userUnit.Id)} />
                                                                        </MUI.TableRowColumn>

                                                                    </MUI.TableRow>

                                                            )}
                                                        </MUI.TableBody>
                                                    </MUI.Table>
                                                    <br />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </MUI.Tab>

                    </MUI.Tabs>
                    <br />
                </div>
                :
                <div> </div>
        );
    }
}

