import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router'
import * as MUI from 'material-ui';
import './Trial.css';
import { Link } from 'react-router'
import DB from './DB'
import * as RR from 'react-router'


const ConsumerOwnerUnitDB = new DB("/api/consumer_owner_unit");
const accountDB = new DB("/api/accounts");
const ReqTypeDB = new DB("/api/request_type");
const RFS_DB = new DB("/api/request_of_service");
const DFS_DB = new DB("/api/disconnect_of_service");
const requestStaffAssignDB = new DB("/api/request_staff_assign");
const inspectionDB = new DB("/api/inspections");
const staffDB = new DB("/api/staffs");
const subStationsDB = new DB("/Substations");
const requestsForServicesDB = new DB("/api/request_of_service");
const billsDB = new DB("/api/bills");
const RSADB = new DB("/api/request_staff_assign");

export default class SingleApproval extends Component {
    state = {
        request_of_service: null,
        requestType: null,
        consumer: null,
        account: null,
        staff: [],
        selectedStaff: null,
        checkBox: false,
        substations: [],
        requests: [],
        minDistance: undefined,
        closest: -1,
        values: [],
        request: '',
        RSA: []
    }


    staffHaveThisRequest = () => {
        console.log("staff", sessionStorage.getItem('userName'));
                console.log("idddddd", sessionStorage.getItem('requestTypeID'));

        for(var i=0; i<this.state.RSA.length; i++){
            console.log("checking", this.state.RSA[i].staff.AccountUsername);
                        console.log("checking", this.state.RSA[i]);

            if(this.state.RSA[i].staff.AccountUsername === sessionStorage.getItem('userName').split('@')[0] && this.state.RSA[i].RequestTypeId == sessionStorage.getItem("requestTypeID") ){
                        return true;
            }
        }
        return false;
    }



    componentWillMount() {
        console.log("requestTypeID=", sessionStorage.getItem("requestTypeID"));
        //RFS_DB.findAll((data) => this.setState({ requests: data }));
        ReqTypeDB.findOne(sessionStorage.getItem("requestTypeID"), (data) => this.setState({ requestType: data }));

        staffDB.findAll((data) => this.setState({ staff: data }));
        RSADB.findAll((data) => this.setState({ RSA: data }));

        requestsForServicesDB.findOne(sessionStorage.getItem('requestTypeID'), (data) => this.setState({request: data}))

           console.log("loading all substations")

        subStationsDB.find((data) => this.setState({ substations: data }))
        requestsForServicesDB.find((data) => this.setState({ requests: data }))

    }

    handleInspectionCheckBox = () => {
        this.setState({ checkBox: !this.state.checkBox });
    }

    handleSearchResultStaff = (value) => {

        console.log("handleSearchResultStaff")
        console.log("Search word: " + value);
        var result = null;
        for (var i = 0; i < this.state.staff.length; i++) {
            var temp = this.state.staff[i];
            if (temp.Name.includes(value)) {
                result = temp;
            } else {
                console.log("shit! its not equal to " + temp.Name)
            }
        }

        console.log(result);

    }

    handleStaffNames = () => {
        console.log("yaaah staaf", this.state.staff)
        var result = [];
        for (var i = 0; i < this.state.staff.length; i++) {
            var temp = this.state.staff[i];
            result.push(temp.Name);
        }
        return result;

    }
    onNewRequest = (value) => {
        console.log("onNewRequest")
        console.log(value);
        for (var i = 0; i < this.state.staff.length; i++) {
            var temp = this.state.staff[i];
            if (temp.Name.includes(value)) {
                this.setState({ selectedStaff: temp });
            } else {
                console.log("shit! its not equal to " + temp.Name)
            }
        }
    };

    requestAnInspection = () => {
        var doc = document.querySelector('#date');
        //console.log(doc.value)
        //console.log(sessionStorage.getItem("requestTypeID"));
        inspectionDB.Create({
            "Description": "",
            "EstimatedAmount": "",
            "Status": "onGoing",
            "Date": doc.value,
            "RequestTypeId": sessionStorage.getItem("requestTypeID"),
            "StaffId": this.state.selectedStaff.Id

        })

    }

   approveRequest = () => {
       console.log("requests", this.state.requests)
        console.log("approving your request... please wait a moment")
        var id = 0;
        var request = this.state.requests[id].requesttype.consumerownerunit.service;

        console.log("real", this.state.request)
        console.log(this.state.requests[id]);
        // 49.698507, -54.186532
        // var consumerLong = this.state.requests[id].request_type.consumer_owner_unit.service.Longitude;
        // var consumerLat = this.state.requests[id].request_type.consumer_owner_unit.service.Latitude;
        var consumerLong = request.Longitude;
        var consumerLat = request.Latitude;
        console.log("your location: " + consumerLong + ", " + consumerLat);
        // console.log(this.state.substations)
        console.log("all substations locations")
        var closest = this.state.substations[0].SubstationId;
        var minDistance = 999999;

        var distance;


        console.log("distnace ", minDistance);
        for (var i = 0; i < this.state.substations.length; i++) {
            console.log("Sub " + i + ":'\tLatitude: " + this.state.substations[i].latitude + "\tLongitude: " + this.state.substations[i].longitude)
            this.getDistance(consumerLat, consumerLong, this.state.substations[i].latitude, this.state.substations[i].longitude, (data) => {
                distance = data;
                console.log("checking " + distance + " with " + minDistance)
                if (distance < minDistance) {
                    console.log("okey, we're putting this " + distance + " which is substation " + i)
                    // minDistance = distance;
                    minDistance = distance;

                    this.setState({ minDistance: data })

                    // console.log("closest = " + data + "\tSub: ", i)
                }
                this.state.values.push(distance);
            }

            )

            console.log("closest = " + this.state.minDistance + "\tSub: ", i)


        }

      
    }

     
    getDistance = async (consLat, consLong, subLat, subLong, action) => {
        try {
            var url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" +
                consLat + "," + consLong + "&destinations=" + subLat + "," + + subLong + "&mode=walking&key=AIzaSyASDQ1Yy1O3xVdOl-l2M0howZIXeDvmck0";
            var response = await fetch(url);
            var data = await response.json();
            console.log("fetched from: " + url)
            var distance = data.rows[0].elements[0].distance.value;

            // this.setState({distance: distance})
            action(distance)
            // return distance;

        } catch (e) {
            console.log("Erorr message", e);
        }
    }
    

    approveRequestReal = () => {
        console.log("shortest distance == " + this.state.minDistance);
        console.log("values", this.state.values)
        var values = this.state.values;
        var index = -1;
        for (var i = 0; i < values.length; i++) {
            if (values[i] === this.state.minDistance) {
                index = i;
            }
        }

        console.log("nearest substation is " + index);



        requestsForServicesDB.ApproveRequest({ "requestId": sessionStorage.getItem('requestTypeID'), "substationId": this.state.substations[index].SubstationId });



        // console.log("so the nearest substation is " + this.state.closest)
    }

       generateBills = () => {
        console.log("generating bills now...")
        billsDB.GenerateBills();
    }

    monthlyConsumption = () => {
        billsDB.MonthlyConsumption();
    }



    render() {
        return (
            this.state.requestType ?
                <div>
                    <h1> Request Info </h1>

                    <h2> Consumer Info </h2>

                    Full Name:  {this.state.requestType.consumerownerunit.owner.account.FirstName} {this.state.requestType.consumerownerunit.owner.account.LastName}
                    <br /> Email: {this.state.requestType.consumerownerunit.owner.account.Email}
                    <br /> Contact Number: {this.state.requestType.consumerownerunit.owner.account.Phone}

                    <h2> Address Info for the Requested Service </h2>

                    <br /> Zone No. {this.state.requestType.consumerownerunit.service.ZoneNo}
                    <br /> Street No. {this.state.requestType.consumerownerunit.service.StreetNo}
                    <br /> Residence Type: {this.state.requestType.consumerownerunit.service.Residence}
                    <br /> Villa No. {this.state.requestType.consumerownerunit.service.VillaNo}
                    <br /> Building No. {this.state.requestType.consumerownerunit.service.BuildingNo}
                    <br /> Apartment No. {this.state.requestType.consumerownerunit.service.AptNo}

                    <h2> Inspection info </h2>
                    <MUI.Checkbox label="Assign an Inspection"  onCheck={() => this.handleInspectionCheckBox()} />
                    {
                        this.state.checkBox ?
                            <div>
                                <br /> <MUI.DatePicker hintText="Portrait Dialog" id='date' />
                                <MUI.AutoComplete hintText="Type Inspector's Name"
                                    dataSource={this.handleStaffNames()} onUpdateInput={this.handleSearchResultStaff}
                                    onNewRequest={this.onNewRequest}
                                />


                                <MUI.RaisedButton label="Assign an Inspection" onClick={() => this.requestAnInspection()} />
                            </div>
                            :
                            <div> </div>
                    }
                    <br />
                    <br />
                    <br />
                                                                        {console.log("result------------------------------------",this.staffHaveThisRequest())}

                    {this.staffHaveThisRequest() && 
                    <div>

                    <MUI.RaisedButton label="Approve Request" onClick={() => this.approveRequest(sessionStorage.getItem("requestTypeID"))} />
                      <MUI.RaisedButton label="Approve Request - Real" primary={true} onClick={this.approveRequestReal} />
</div>
                    }
                     
                </div>
                : null
        )
    }
}