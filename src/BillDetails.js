import React, { Component } from 'react';
import './Trial.css';
import * as MUI from 'material-ui';
import { Link } from 'react-router'
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


const billDB = new DB("/MonthlyConsumption")

export default class BillDetails extends Component {
    state = {
        bill: '',
        monthlyConsumption: ''
    }

    componentDidMount() {
        var id = location.search.split('=')[1];
        console.log("you sent " + id)

        var myBill = {
            "id": id, "period": "January 18th, 2020",
            "due date": "February 17th, 2020",
            "status": "Paid", "elecNum": 71195, "amount": 480
        };

        var myOtherBill = {"id": id, "period": "February 18th, 2020", 
        "due date": "March 17th, 2020", 
        "status": "Unpaid", "elecNum": 51854, "amount": 770
        }



        if (id == 1254) {
            this.setState({ bill: myBill })
        } 

        else if(id == 1722){
            this.setState({bill: myOtherBill})
        }
        // var id = location.query.id;
        //  console.log("you sent id " + this.id)
        // this.db.findOne(id, (data) => this.setState({ bill: data }))

        // billDB.findOne(id, (data) => this.setState({monthlyConsumption: data}, console.log("dataaaaaaaa consumption", data)))

    }



    db = new DB('/api/bills')


    render() {
        return (
            <div className="billing">

{ sessionStorage.getItem("userName") !== "omer@test.com" ? <h2> Please login to view your bills <br/> Account --> Login </h2> : 

                <div>
                    <div className="billBox1">
                        <h2 style={{"textAlign": "center"}}className="h1font" className="titleprop"> Bill Detials </h2>

                        <div className="monthcard">
                            <MUI.Avatar src={require
                                ('./images/calendar.png')}
                                size={100} />
                            <h2> {this.state.bill.period}</h2>
                        </div>
                        <br />
                        <div className="boxBillDetail">
                            <table>
                                <tr>
                                    <td>
                                        Owner Name:
                                    </td>
                                    <td>
                                        Omer Mahgoub
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Bill Number:
                                    </td>
                                    <td>
                                        {location.search.split('=')[1]}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Electricity Number:
                                    </td>
                                    <td>
                                        {this.state.bill.elecNum}
                                        {/* <span style={{ backgroundColor: 'red' }}>NOT AVAILABLE</span> */}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Address:
                                    </td>
                                    <td>
                                        Area 51, street 190, buidling 69
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Status:
                                    </td>
                                    <td>
                                        {this.state.bill.status == "Unpaid" ?
                                            <span style={{ backgroundColor: 'red', color: 'white' }}> {this.state.bill.status} </span>
                                            :
                                            <span style={{ backgroundColor: 'green', color: 'white' }}> {this.state.bill.status} </span>
                                        }
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className="billBox3">

                        <h2 className="h1font" className="titleprop"> Bill Summary </h2>
                        <div className="boxLeft">
                            <p> Amount usage: 21454</p>
                            <p> Issue Date: January 18th, 2020 </p>
                            <p> Due Date: February 17th, 2020</p>

                        </div>
                        <div className="boxRight">
                            <h3> Total Amount: {this.state.bill.amount} Q.R </h3>
                            {this.state.bill.status == "Paid" ?
                            <h4 style={{ backgroundColor: 'green', color: 'white' }}> You have already settled this bill </h4>
                            :
                            <span>
                            <h4> Please pay you bill by February 17th, 2020 </h4>
                            
                            <MUI.RaisedButton containerElement={<Link to={{ pathname: `PayForm`, query: { bill: 1722 } }} />} primary={true} label="Pay Now" />
                            </span>
                                    }
                            <br />
                            <br />

                           

                            <br />
                            <br />
                            <MUI.RaisedButton containerElement={<Link to="/Bill" />} primary={true} label="Back to My Bills" />
                        </div>
                    </div>
                </div>
    }
            </div>
        );
    }
}

